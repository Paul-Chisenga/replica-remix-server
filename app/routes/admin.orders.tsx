import { OrderStatus, Role } from "@prisma/client";
import { Link, Outlet } from "@remix-run/react";
import type { LoaderFunctionArgs } from "react-router";
import { useTypedLoaderData } from "remix-typedjson";
import UpdateOrderStatus from "~/components/admin-product/UpdateOrderStatus";
import DashboardPageHeader from "~/components/common/DashboardPageHeader";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";
import { formatDateTime } from "~/utils/helpers";

export default function ComponentName() {
  const orders = useTypedLoaderData<typeof loader>();

  return (
    <div className="tw-p-4">
      <DashboardPageHeader>Orders</DashboardPageHeader>
      <div className="table-wrapper">
        <table className="my-table admin-orders-table table">
          <thead>
            <tr>
              <th>Order No</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Rider</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr
                  key={order.id}
                  className="tw-bg-white tw-rounded-xl tw-overflow-hidden tw-border-gray-100"
                >
                  <td data-label={`orderNo : ${order.orderNo}`}>
                    <span className="tw-invisible">{order.orderNo}</span>
                  </td>
                  <td data-label="Date">{formatDateTime(order.createdAt)}</td>
                  <td data-label="Customer Details" className="">
                    <Link
                      to={`/admin/customers/${order.customer.id}`}
                      className="tw-text-xl tw-text-black"
                    >
                      {order.customer.firstname + " " + order.customer.lastname}
                    </Link>
                    <p>{order.customer.email}</p>
                    <p>0{order.customer.phone}</p>
                  </td>
                  <td data-label="Items" className="">
                    <div className="tw-space-y-6">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="tw-bg-gray-100 tw-py-2 tw-px-4 rounded"
                        >
                          <div className="tw-flex tw-flex-row-reverse tw-items-start tw-justify-between tw-gap-4 tw-mb-2">
                            <div>
                              <Link
                                to={`/shop/${item.product.id}`}
                                className="tw-text-xl tw-text-black"
                              >
                                {item.product.name}
                              </Link>
                              {item.product.choices.length > 0 && (
                                <div className="tw-text-sm tw-space-y-2">
                                  {item.product.choices.map((ch) => (
                                    <div
                                      key={ch.id}
                                      className="tw-flex sm:tw-gap-1 tw-justify-end tw-flex-wrap"
                                    >
                                      <span className="tw-shrink-0">
                                        {ch.selector} -{" "}
                                      </span>
                                      <div className="tw-space-y-4 tw-font-medium">
                                        {ch.options.map((option) => (
                                          <span key={option.id}>
                                            {option.label} (x{option.count})
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            {item.product.imageUrl && (
                              <img
                                src={`/product/${item.product.imageUrl}`}
                                alt=""
                                className="tw-rounded-md sm:tw-w-[120px] sm:tw-h-[100px] tw-w-[60px] tw-h-[50px]"
                              />
                            )}
                          </div>
                          <div className="product-total d-flex align-items-center">
                            <div className="quantity">
                              <div className="quantity d-flex align-items-center">
                                <div className=" nice-number d-flex align-items-center border tw-border-black/50 tw-p-4 tw-rounded-full tw-h-9 ">
                                  <span
                                    style={{ margin: "0 8px" }}
                                    className="tw-text-black"
                                  >
                                    {item.count}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <strong className="tw-ml-2 tw-flex tw-items-center">
                              <i className="bi bi-x-lg px-2 tw-text-xs tw-font-normal tw-text-black" />
                              <span className="tw-text-dark tw-font-normal tw-text-lg tw-font-jost">
                                <div className="tw-inline">ksh</div>
                                <div className="tw-inline">
                                  {item.product.price}
                                </div>
                              </span>
                            </strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td data-label="Rider Details" className="">
                    {order.rider ? (
                      <>
                        <Link
                          to={`/admin/customers/${order.customer.id}`}
                          className="tw-text-xl"
                        >
                          {order.rider.profile.firstname +
                            " " +
                            order.rider.profile.lastname}
                        </Link>
                        <p>{order.rider.profile.email}</p>
                        <p>0{order.rider.profile.phone}</p>
                      </>
                    ) : (
                      <Link
                        to={`${order.id}/assign-rider`}
                        className="button tw-bg-primary tw-drop-shadow-md hover:tw-text-white"
                      >
                        Assign
                      </Link>
                    )}
                  </td>
                  <td data-label="Status">
                    <span className="button tw-bg-yellow-500">
                      {order.status}
                    </span>
                    {order.status === OrderStatus.recieved && (
                      <UpdateOrderStatus orderId={order.id} />
                    )}
                  </td>
                  <td data-label="Total">
                    <span className="tw-text-xs">ksh</span>
                    <span className="tw-inline-block tw-text-black tw-text-xl tw-font-semibold">
                      {order.items.reduce(
                        (prev, cur) => prev + cur.count * cur.product.price,
                        0
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserSession(request, [Role.ADMIN]);
  try {
    const orders = await prisma.order.findMany({
      include: {
        rider: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
};
