import type { Order } from "@prisma/client";
import { OrderStatus } from "@prisma/client";
import { redirect } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import type { LoaderFunctionArgs } from "react-router";
import { useTypedLoaderData } from "remix-typedjson";
import prisma from "~/services/prisma.server";

export default function ComponentName() {
  const order = useTypedLoaderData<Order>();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="tw-rounded-md tw-p-10 box--shadow tw-max-w-screen-sm tw-mx-auto">
        <div className="tw-px-2 tw-text-sm tw-text-emerald-500 tw-font-jost">
          Your order has been received, and will be shipped very soon.
          <button
            type="button"
            className="tw-text-inherit tw-bg-transparent tw-underline"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            Check progress
          </button>
        </div>
        <br />
      </div>
    </div>
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: {
        id: params.orderId!,
      },
    });

    if (order.status !== OrderStatus.recieved) {
      return redirect(`/orders/${order.id}`);
    }

    return order;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
};
