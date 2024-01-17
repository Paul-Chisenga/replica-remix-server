import { Role } from "@prisma/client";
import type { ActionFunctionArgs } from "react-router";
import { requireUserSession } from "~/controllers/auth.server";
import { deleteFiles } from "~/services/files.server";
import prisma from "~/services/prisma.server";

export async function action({ request, params }: ActionFunctionArgs) {
  if (request.method !== "DELETE") {
    throw new Error("Bad request");
  }
  await requireUserSession(request, [Role.ADMIN]);
  try {
    const images = await prisma.attachment.findMany();
    await prisma.product.deleteMany();
    if (images.length > 0) {
      deleteFiles(images.map((item) => item.key)).catch(() => {});
    }
    return { success: true };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
