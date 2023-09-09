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

    let totalProductCartItems = 0;

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        productId_customerId_price: {
          productId: product.id,
          customerId: user.id,
          price: +price,
        },
      },
    });

    if (cartItem && cartItem.count > 0) {
      if (cartItem.count > 1) {
        const updatedCartItem = await prisma.cartItem.update({
          where: {
            id: cartItem.id,
          },
          data: {
            count: { decrement: 1 },
          },
        });
        totalProductCartItems = updatedCartItem.count;
      } else {
        await prisma.cartItem.delete({ where: { id: cartItem.id } });
      }
    } else if (cartItem) {
      totalProductCartItems = cartItem.count;
    }

    const totalUserCartItems = await prisma.cartItem.count({
      where: {
        customerId: user.id,
      },
    });

    return { totalProductCartItems, totalUserCartItems };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
