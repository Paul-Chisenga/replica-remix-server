import { Role } from "@prisma/client";
import { redirect, type LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import Footer from "~/components/footer/Footer";
import Header2 from "~/components/header/Header2";
import Topbar from "~/components/header/Topbar";
import { getUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

const Layout = () => {
  const user = useTypedLoaderData<typeof loader>();
  return (
    <>
      <Topbar />
      <Header2 user={user as any} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

export async function loader({ request }: LoaderArgs) {
  const session = await getUserSession(request);
  if (session) {
    const user = await prisma.profile.findUnique({
      where: { id: session.profileId },
      select: {
        firstname: true,
        email: true,
      },
    });

    if (!user) {
      return redirect("/logout");
    }

    return {
      name: user.firstname,
      email: user.email,
      admin: session.role === Role.ADMIN,
    };
  }
  return null;
}
