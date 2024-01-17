import { Role } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { requireUserSession } from "~/controllers/auth.server";
import type { MyPlaceResult } from "~/utils/types";

export const action: ActionFunction = async ({ request, params }) => {
  if (request.method !== "POST") {
    throw new Error("Bad request");
  }
  await requireUserSession(request, [Role.RIDER]);
  const formData = (await request.json()) as { location: MyPlaceResult };
  console.log(formData);

  try {
    return { success: true };
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
