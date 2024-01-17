import { OrderStatus, Role } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export const action: ActionFunction = async ({ request, params }) => {
  if (request.method !== "POST") {
    throw new Error("Bad request");
  }
  await requireUserSession(request, [Role.RIDER]);
  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id: params.id! },
    });

    if (order.status === OrderStatus.preparing) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.shipping,
        },
      });
      return { success: true };
    } else if (order.status === OrderStatus.shipping) {
      return redirect("");
    } else {
      return redirect("/rider/orders");
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
