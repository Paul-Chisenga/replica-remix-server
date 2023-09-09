import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import invariant from "invariant";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

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
  const price = formData.get("price");

  invariant(
    !!price && typeof price === "string",
    "Invalid request, price missing"
  );
  console.log(price);
  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const user = await prisma.customer.findUniqueOrThrow({
      where: {
        profileId: session.profileId,
      },
    });

    const updatedCartItem = await prisma.cartItem.upsert({
      where: {
        productId_customerId_price: {
          productId: product.id,
          customerId: user.id,
          price: +price,
        },
      },
      update: {
        count: { increment: 1 },
      },
      create: {
        productId: product.id,
        customerId: user.id,
        count: 1,
        price: +price,
      },
    });
    const totalUserCartItems = await prisma.cartItem.count({
      where: {
        customerId: user.id,
      },
    });

    return { totalUserCartItems, totalProductCartItems: updatedCartItem.count };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
