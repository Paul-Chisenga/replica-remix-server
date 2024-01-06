import { OrderStatus, Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export const action = async ({ request, params }: ActionArgs) => {
  if (request.method !== "POST") {
    throw new Error("Bad request");
  }
  await requireUserSession(request, [Role.ADMIN]);

  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id: params.id! },
    });
    if (order.status === OrderStatus.recieved) {
      await prisma.order.update({
        where: { id: params.id! },
        data: {
          status: OrderStatus.preparing,
        },
      });
    }

    return { success: true };
  } catch (error: any) {
    throw new Error("Something went wrong.");
  }
};
