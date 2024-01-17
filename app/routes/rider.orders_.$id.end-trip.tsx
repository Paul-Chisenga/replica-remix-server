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
  const formData = await request.formData();

  const code = formData.get("code");
  if (!code) {
    return { error: "Verification code is required." };
  }

  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id: params.id! },
    });

    // check if code match
    // if (code !== order.verificationCode) {
    //   return { error: "Invalid verification code" };
    // }

    if (order.status === OrderStatus.shipping) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.delivered,
        },
      });

      return { success: true };
    } else if (order.status === OrderStatus.delivered) {
      return redirect("..");
    } else {
      return redirect("/rider/orders");
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
