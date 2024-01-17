import { Role } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { useFetcher } from "react-router-dom";
import { useTypedLoaderData } from "remix-typedjson";
import DashboardPageHeader from "~/components/common/DashboardPageHeader";
import DualRingLoader from "~/components/indicators/DualRingLoader";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export default function Admins() {
  const { users } = useTypedLoaderData<typeof loader>();
  const fetcher = useFetcher();
  return (
    <>
      <DashboardPageHeader>Administrators</DashboardPageHeader>
      <fetcher.Form action="clear" method="DELETE">
        <button className="my-btn text red semi-rounded mb-20">
          clear {fetcher.state === "submitting" && <DualRingLoader size={15} />}{" "}
        </button>
      </fetcher.Form>
      <div className="table-wrapper">
        <table className="my-table rider-table table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td data-label="Name">
                  {user.profile.firstname + " " + user.profile.lastname}
                </td>
                <td data-label="Email address">{user.profile.email}</td>
                <td data-label="Phone">0{user.profile.phone}</td>
                <td data-label="Delete">
                  <div
                    className="icon"
                    // onClick={() => handleDelete(item.id)}
                  >
                    <i className="bi bi-x" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Outlet />
    </>
  );
}

export const loader = async ({ request }: LoaderArgs) => {
  await requireUserSession(request, [Role.ADMIN]);
  try {
    const users = await prisma.admin.findMany({
      include: { profile: true },
    });

    return { users };
  } catch (error) {
    throw new Error("Something went wrong.");
  }
};
