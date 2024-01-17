import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export const action = async ({ request }: ActionArgs) => {
  if (request.method !== "DELETE") {
    throw new Error("Bad request");
  }
  await requireUserSession(request, [Role.ADMIN]);
  try {
    await prisma.profile.deleteMany({
      where: {
        role: "CUSTOMER",
      },
    });
    return { success: true };
  } catch (error) {
    throw new Error("Something went wrong.");
  }
};
