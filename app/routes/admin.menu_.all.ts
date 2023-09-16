import { Role } from "@prisma/client";
import { redirect, type ActionArgs } from "@remix-run/node";
import { requireUserSession } from "~/controllers/auth.server";
import menuData from "~/data/menu.json";
import prisma from "~/services/prisma.server";

export async function action({ request }: ActionArgs) {
  if (request.method !== "POST") {
    throw new Error("Bad Request");
  }

  const session = await requireUserSession(request, [Role.ADMIN]);
  await prisma.$transaction(
    menuData.map((menu) =>
      prisma.menu.create({
        data: {
          title: menu.title,
          subtitle: menu.subtitle,
          category: menu.category as any,
          createdBy: {
            connect: {
              profileId: session.profileId,
            },
          },
        },
      })
    )
  );
  console.log("MENU MIGRATED");
  return redirect("/admin/menu");
}
