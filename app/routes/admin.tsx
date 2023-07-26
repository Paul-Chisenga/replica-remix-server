import { Role } from "@prisma/client";
import { redirect, type LoaderArgs } from "@remix-run/node";
import { NavLink, Outlet } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import AdminHeader from "~/components/header/AdminHeader";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

const Layout = () => {
  const user = useTypedLoaderData<typeof loader>();

  return (
    <div className="tw-h-screen tw-bg-gray-50 tw-overflow-y-auto">
      <AdminHeader user={user as any} />
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
                    to="menu"
                    className="nav-link tw-text-center"
                    id="breakfast-tab"
                    // data-bs-toggle="tab"
                    // data-bs-target="#breakfast"
                    // type="button"
                    role="tab"
                    // aria-controls="breakfast"
                    // aria-selected="true"
                  >
                    Menu
                  </NavLink>
                </li>
                <li className="nav-item" role="presentation">
                  <NavLink
                    to="products"
                    className="nav-link"
                    id="lunch-tab"
                    // data-bs-toggle="tab"
                    // data-bs-target="#lunch"
                    // type="button"
                    role="tab"
                    // aria-controls="lunch"
                    // aria-selected="false"
                  >
                    Product
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
  const session = await requireUserSession(request, [Role.ADMIN]);
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
