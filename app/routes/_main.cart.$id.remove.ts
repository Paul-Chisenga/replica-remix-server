import type { Prisma } from "@prisma/client";
import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export async function action({ request, params }: ActionArgs) {
  if (request.method !== "DELETE") {
    throw new Error("Bad Request");
  }

  const session = await requireUserSession(request, [Role.CUSTOMER]);

  const { id } = params;
  try {
    await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    const cartItemWhere: Prisma.CartItemWhereInput = {
      customer: {
        profileId: session.profileId,
      },
    };

    const count = await prisma.cartItem.count({
      where: cartItemWhere,
    });

    const items = await prisma.cartItem.findMany({
      where: cartItemWhere,
      include: {
        product: true,
      },
    });

    return { items, count };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
