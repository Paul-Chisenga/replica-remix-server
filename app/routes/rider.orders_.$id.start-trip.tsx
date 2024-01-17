import { OrderStatus, Role } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requireUserSession } from "~/controllers/auth.server";
import { sendEmail } from "~/services/email.server";
import prisma from "~/services/prisma.server";
import { sendSMS } from "~/services/twilio.server";
import { generateVerificationCode } from "~/utils/helpers";

export const action: ActionFunction = async ({ request, params }) => {
  if (request.method !== "POST") {
    throw new Error("Bad request");
  }
  await requireUserSession(request, [Role.RIDER]);
  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: { id: params.id! },
      include: {
        customer: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (order.status === OrderStatus.preparing) {
      const code = generateVerificationCode();
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.shipping,
          verificationCode: code,
        },
      });
      sendSMS(
        `+254${+order.customer.profile.phone}`,
        `Your verification code for your order at REPLICA is ${code}`
      );
      sendEmail({
        to: {
          name: order.customer.profile.firstname,
          email: order.customer.profile.email,
        },
        subject: "ORDER VERIFICATION CODE",
        message: `Your verification code for your order at REPLICA is ${code}`,
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
