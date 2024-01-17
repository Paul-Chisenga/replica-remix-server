import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export async function action({ request, params }: ActionArgs) {
  if (request.method !== "DELETE") {
    throw new Error("Bad Request");
  }

  await requireUserSession(request, [Role.CUSTOMER]);

  const { id } = params;
  try {
    const item = await prisma.cartItem.findUnique({ where: { id } });

    if (item) {
      await prisma.cartItem.delete({
        where: {
          id,
        },
      });
    }
    return null;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
