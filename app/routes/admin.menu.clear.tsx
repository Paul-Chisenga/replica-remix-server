import { Role } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "DELETE") {
    throw new Error("Bad request");
  }
  await requireUserSession(request, [Role.ADMIN]);
  try {
    await prisma.menuItem.deleteMany();
    return { success: true };
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
