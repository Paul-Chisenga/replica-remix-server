import { Role } from "@prisma/client";
import { redirect, type LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { useEffect } from "react";
import { useTypedLoaderData } from "remix-typedjson";
import Footer from "~/components/footer/Footer";
import Header2 from "~/components/header/Header2";
import Topbar from "~/components/header/Topbar";
import { getUserSession } from "~/controllers/auth.server";
import useAuthContext from "~/hooks/useAuthContext";
import useCartContext from "~/hooks/useCartContext";
import prisma from "~/services/prisma.server";

const Layout = () => {
  const user = useTypedLoaderData();
  const authContext = useAuthContext();
  const cartContext = useCartContext();

  useEffect(() => {
    if (user) {
      // cartContext.updateCart(user.cartItems);
      authContext.saveSession({
        email: user.email,
        profileId: user.profileId,
        role: user.role,
      });
      cartContext.setCart(user.cartItems);
    } else {
      authContext.removeSession();
    }
  }, []);

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
        id: true,
        firstname: true,
        email: true,
      },
    });

    if (!user) {
      return redirect("/logout");
    }

    const cartItems =
      session.role === Role.CUSTOMER
        ? await prisma.cartItem.findMany({
            where: {
              customer: {
                profileId: user.id,
              },
            },
            include: {
              product: {
                include: {
                  pictures: true,
                },
              },
            },
          })
        : [];

    return {
      ...session,
      admin: session.role === Role.ADMIN,
      cartItems: cartItems.map((item) => ({
        product: item.product,
        count: item.count,
        price: item.price,
      })),
    };

    // const cartItems = await prisma.cartItem.count({
    //   where: {
    //     customer: {
    //       profileId: user.id,
    //     },
    //   },
    // });

    // return {
    //   name: user.firstname,
    //   email: user.email,
    //   admin: session.role === Role.ADMIN,
    //   cartItems,
    // };
  }
  return null;
}
