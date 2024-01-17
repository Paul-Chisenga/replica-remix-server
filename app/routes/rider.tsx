import { Role } from "@prisma/client";
import { redirect, type LoaderArgs } from "@remix-run/node";
import { NavLink, Outlet } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import RiderHeader from "~/components/header/RiderHeader";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

const Layout = () => {
  const user = useTypedLoaderData<typeof loader>();

  return (
    <div className="tw-h-screen tw-bg-gray-50 tw-overflow-y-auto">
      <RiderHeader user={user as any} />
      <div className="container tw-py-24 tw-mt-[50px]">
        <div className="menu2-area">
          <div className="">
            <div className="menu2-tab mb-70">
              <ul
                className="nav nav-tabs  tw-justify-start"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <NavLink
                    to="profile"
                    className="nav-link tw-text-center"
                    id="profile-tab"
                    role="tab"
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                  <NavLink
                    to="orders"
                    className="nav-link"
                    id="order-tab"
                    role="tab"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
export async function loader({ request }: LoaderArgs) {
  const session = await requireUserSession(request, [Role.RIDER]);
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

    return { name: user.firstname, email: user.email };
  }
  return null;
}
