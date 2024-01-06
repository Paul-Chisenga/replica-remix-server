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
      <div className="food-category-area tw-pt-40">
        <div className="tw-max-w-screen-2xl tw-mx-auto px-4">
          <div className="row g-4">
            <div className="col-lg-3">
              <div className="food-category-list tw-sticky tw-top-28">
                <h4 className="title">Admin dashboard</h4>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <NavLink to={"menu"} className={"nav-link"} id="menu-tab">
                      <span>Menu</span>
                      <span>
                        <i className="bi bi-arrow-right" />
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavLink
                      to={"products"}
                      className={"nav-link"}
                      id="menu-tab"
                    >
                      <span>Products</span>
                      <span>
                        <i className="bi bi-arrow-right" />
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavLink to={"admins"} className={"nav-link"} id="menu-tab">
                      <span>Admins</span>
                      <span>
                        <i className="bi bi-arrow-right" />
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavLink
                      to={"customers"}
                      className={"nav-link"}
                      id="menu-tab"
                    >
                      <span>Customers</span>
                      <span>
                        <i className="bi bi-arrow-right" />
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavLink to={"riders"} className={"nav-link"} id="menu-tab">
                      <span>Riders</span>
                      <span>
                        <i className="bi bi-arrow-right" />
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavLink to={"orders"} className={"nav-link"} id="menu-tab">
                      <span>Orders</span>
                      <span>
                        <i className="bi bi-arrow-right" />
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="tw-p-4">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
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
