import prisma from "~/services/prisma.server";

export async function getUsers() {
  return await prisma.user.findMany();
}
