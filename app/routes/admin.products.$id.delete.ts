import { Role } from "@prisma/client";
import type { ActionFunctionArgs } from "react-router";
import { deleteProduct } from "~/controllers/admin.server";
import { requireUserSession } from "~/controllers/auth.server";

export async function action({ request, params }: ActionFunctionArgs) {
  if (request.method !== "DELETE") {
    throw new Error("Bad request");
  }
  const session = await requireUserSession(request, [Role.ADMIN]);
  try {
    await deleteProduct(session.profileId, params.id!);
    return { success: true };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
