import type { SelectedChoice, SelectedChoiceOption } from "@prisma/client";
import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import invariant from "invariant";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";
import type { HandledChoices } from "~/utils/types";

export async function action({ request, params }: ActionArgs) {
  if (request.method !== "POST") {
    throw new Error("Bad Request");
  }
  const { id } = params;
  const session = await requireUserSession(
    request,
    [Role.CUSTOMER],
    `/shop/${id}`
  );

  const formData = await request.formData();
  const choicesObj = formData.get("choices");

  invariant(typeof choicesObj === "string", "Fill in all required choices.");

  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id,
      },
    });
    const choices = JSON.parse(choicesObj) as HandledChoices;
    let valid = true;
    const prodChoices = product.choices;
    prodChoices.forEach((ch, idx) => {
      const isValid =
        choices[idx] &&
        ch.requiredOptions ===
          Object.values(choices[idx]).reduce(
            (prev, cur) => prev + cur.count,
            0
          );

      valid &&= isValid;
    });

    if (!valid) {
      throw new Error("Fill in all required choices");
    }

    const user = await prisma.customer.findUniqueOrThrow({
      where: {
        profileId: session.profileId,
      },
    });

    // COMPUTE USER CHOICES AGAINS PRODUCT CHOICES
    const handlesChoices: SelectedChoice[] = [];

    Object.entries(choices).forEach(([choiceId, options]) => {
      const pChoice = product.choices[+choiceId];
      if (!pChoice) {
        throw new Error("Wrong choice selection.");
      }
      const totalOptionsSelected = Object.values(options).reduce(
        (prev, cur) => prev + cur.count,
        0
      );

      // Check if user selected all required options for this choice
      if (pChoice.requiredOptions != totalOptionsSelected) {
        throw new Error("Wrong choice selections.");
      }

      const pOptions: SelectedChoiceOption[] = [];

      Object.entries(options).forEach(([optionId, option]) => {
        const pOption = pChoice.options[+optionId];
        if (!pOption) {
          throw new Error("Wrong choice selections.");
        }
        if (option.count > 0) {
          pOptions.push({ id: optionId, label: pOption, count: option.count });
        }
      });

      handlesChoices.push({
        id: choiceId,
        selector: pChoice.selector,
        options: pOptions,
      });
    });

    const updatedCartItem = await prisma.cartItem.upsert({
      where: {
        productId_customerId: {
          productId: product.id,
          customerId: user.id,
        },
      },
      update: {
        count: { increment: 1 },
      },
      create: {
        productId: product.id,
        customerId: user.id,
        count: 1,
        choices: handlesChoices,
      },
    });
    const totalUserCartItems = await prisma.cartItem.count({
      where: {
        customerId: user.id,
      },
    });

    return {
      totalUserCartItems,
      totalProductCartItems: updatedCartItem.count,
      choices: updatedCartItem.choices,
    };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
