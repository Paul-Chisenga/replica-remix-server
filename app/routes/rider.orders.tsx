import { OrderStatus, Role } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import DashboardPageHeader from "~/components/common/DashboardPageHeader";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";
import { formatDateTime } from "~/utils/helpers";

export default function Oders() {
  const orders = useTypedLoaderData<typeof loader>();

  return (
    <div>
      <DashboardPageHeader>Orders</DashboardPageHeader>
      <div className="tw-space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`box--shadow tw-border-gray-200`}
            style={{ border: "1px solid" }}
          >
            <div className="tw-p-4">
              <span className="tw-inline-block tw-text-dark tw-font-jost tw-opacity-60 tw-font-light tw-text-sm tw-mb-3">
                {formatDateTime(order.createdAt)}
              </span>
              <h5 className="tw-capitalize tw-font-cormorant tw-text-2xl tw-font-black tw-leading-6 tw-text-dark tw-mb-4 ">
                {order.customer.profile.firstname +
                  " " +
                  order.customer.profile.lastname}
              </h5>
              <span className="tw-inline-block tw-text-dark tw-font-jost tw-opacity-90 tw-font-normal tw-text-sm ">
                +254 {order.customer.profile.phone}
              </span>
            </div>
            <div className="tw-px-4 tw-py-2 tw-flex tw-justify-between tw-items-center tw-gap-5 tw-bg-gray-100">
              <h6 className="tw-inline-block tw-text-dark tw-font-jost tw-ml-3 tw-opacity-60">
                {order.status}
              </h6>
              {order.status === OrderStatus.preparing && (
                <Link
                  to={order.id}
                  className="my-btn outline dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-arrow-right-circle"></i>
                  Open
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const loader = async ({ params, request }: LoaderArgs) => {
  const session = await requireUserSession(request, [Role.RIDER]);
  try {
    const orders = await prisma.order.findMany({
      where: {
        rider: {
          profileId: session.profileId,
        },
        status: OrderStatus.preparing,
      },
      include: {
        customer: {
          include: {
            profile: true,
          },
        },
      },
    });

    return orders;
  } catch (error) {
    // console.log(error);
    throw new Error("Something went wrong.");
  }
};
