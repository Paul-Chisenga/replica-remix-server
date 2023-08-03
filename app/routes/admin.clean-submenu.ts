import { Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export async function action({ request }: ActionArgs) {
  if (request.method !== "DELETE") {
    throw new Error("Bad Request");
  }
  await requireUserSession(request, [Role.ADMIN]);
  await prisma.subMenu.deleteMany();
  return redirect("/admin/products");
}
