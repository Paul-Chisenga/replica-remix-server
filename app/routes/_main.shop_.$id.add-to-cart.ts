import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export async function action({ request, params }: ActionArgs) {
  if (request.method !== "POST") {
    throw new Error("Bad Request");
  }

  const session = await requireUserSession(request, [Role.CUSTOMER]);
  const { id } = params;
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
