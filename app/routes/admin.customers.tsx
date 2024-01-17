import { Role } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { useFetcher } from "react-router-dom";
import { useTypedLoaderData } from "remix-typedjson";
import DashboardPageHeader from "~/components/common/DashboardPageHeader";
import DualRingLoader from "~/components/indicators/DualRingLoader";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export default function Customers() {
  const { users } = useTypedLoaderData<typeof loader>();
  const fetcher = useFetcher();
  return (
    <>
      <DashboardPageHeader>Customers</DashboardPageHeader>
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
              <th>orders</th>
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
                <td data-label="Orders">0</td>
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
    const users = await prisma.customer.findMany({
      include: { profile: true },
    });

    return { users };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong.");
  }
};
