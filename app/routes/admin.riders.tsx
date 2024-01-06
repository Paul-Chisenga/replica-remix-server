import { Role } from "@prisma/client";
import { LoaderArgs } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import DashboardPageHeader from "~/components/common/DashboardPageHeader";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";

export default function Riders() {
  const { riders } = useTypedLoaderData<typeof loader>();

  return (
    <>
      <DashboardPageHeader>Riders</DashboardPageHeader>
      <Link to={"create"} className="my-btn outline primary semi-rounded mb-20">
        Add rider
      </Link>
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
            {riders.map((rider) => (
              <tr key={rider.id}>
                <td data-label="Name">
                  {rider.profile.firstname + " " + rider.profile.lastname}
                </td>
                <td data-label="Email address">{rider.profile.email}</td>
                <td data-label="Phone">0{rider.profile.phone}</td>
                <td data-label="">
                  <Link
                    to={`${rider.id}/edit`}
                    className="button hover:tw-opacity-100"
                  >
                    Edit
                  </Link>
                  <button className="button tw-bg-red-500 hover:tw-opacity-100">
                    Delete
                  </button>
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
    const riders = await prisma.rider.findMany({ include: { profile: true } });

    return { riders };
  } catch (error) {
    throw new Error("Something went wrong.");
  }
};
