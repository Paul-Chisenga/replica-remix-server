import prisma from "~/services/prisma.server";

export const loader = async () => {
  await prisma.profile.delete({
    where: {
      email: "buna.conatct@gmail.com",
    },
  });

  return "cool";
};
