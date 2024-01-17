import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export async function action({ request, params }: ActionArgs) {
  if (request.method !== "PATCH") {
    throw new Error("Bad Request");
  }

  await requireUserSession(request, [Role.CUSTOMER]);

  const { id } = params;
  try {
    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        count: { increment: 1 },
      },
    });
    return null;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
