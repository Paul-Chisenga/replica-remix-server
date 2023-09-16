import { Role } from "@prisma/client";
import { redirect, type ActionArgs } from "@remix-run/node";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export async function action({ request }: ActionArgs) {
  if (request.method !== "POST") {
    throw new Error("Bad Request");
  }

  await requireUserSession(request, [Role.ADMIN]);
  await prisma.menu.deleteMany();
  console.log("MENU DELETED");
  return redirect("/admin/menu");
}
