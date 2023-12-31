import { Role } from "@prisma/client";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useTypedLoaderData } from "remix-typedjson";
import LinkButton2 from "~/components/Button/LinkButton2";
import Breadcrumb from "~/components/common/Breadcrumb";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";
import { formatDate, randomNumber } from "~/utils/helpers";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Orders - Replica restaurant" },
    {
      name: "description",
      content: "Find health food at replica!",
    },
  ];
};

const IMAGES = ["cart-01.png", "cart-02.png", "cart-03.png"];

const Orders = () => {
  const orders = useTypedLoaderData<typeof loader>();

  return (
    <div>
      <Breadcrumb pageName="Orders" pageTitle="Orders" />
      <div className="faq-area pt-120 pb-120">
        <div className="container-fluid">
          <div className="row g-lg-5 gy-5">
            <div className="col-lg-5">
              <div className="faq-left-img">
                <img
                  className="img-fluid"
                  src="/images/bg/faq-big-img.png"
                  alt="faq-big-img"
                />
                <div className="sm-img">
                  <img
                    className="img-fluid"
                    src="/images/bg/faq-sm-img.png"
                    alt="faq-sm-img"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="section-title">
                <span>
                  <img
                    className="left-vec"
                    src="/images/icon/sub-title-vec.svg"
                    alt="sub-title-vec"
                  />
                  orders
                  <img
                    className="right-vec"
                    src="/images/icon/sub-title-vec.svg"
                    alt="sub-title-vec"
                  />
                </span>
                <h2>My orders</h2>
                {orders.length === 0 && (
                  <div className="tw-p-5">
                    <p className="">You have no orders yet</p>
                    <LinkButton2 to="/shop">Go shopping</LinkButton2>
                  </div>
                )}
                <div className="accordion" id="accordionExample">
                  {orders.map((order, idx) => (
                    <div key={order.id} className="accordion-item">
                      <h2 className="accordion-header" id={`heading${idx}`}>
                        <button
                          className="accordion-button collapsed tw-drop-shadow-sm tw-capitalize tw-py-1  border tw-border-emerald-100"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${idx}`}
                          aria-expanded="false"
                          aria-controls={`collapse${idx}`}
                        >
                          <div className="tw-flex tw-w-full tw-justify-between">
                            <div>
                              <div>Replica-{order.orderNo}</div>
                              <div className="tw-text-xs tw-font-jost tw-font-normal ">
                                No of items : {order.items.length}
                              </div>
                              <div className="tw-text-xs tw-font-jost tw-font-normal ">
                                {formatDate(order.createdAt)}
                              </div>
                            </div>
                            <div>
                              <span className="tw-text-dark tw-font-bold tw-lowercase tw-text-sm">
                                ksh
                              </span>
                              <span className="tw-text-dark tw-font-bold">
                                {order.items.reduce(
                                  (prev, cur) =>
                                    prev +
                                    cur.count * cur.product.prices[0].value,
                                  0
                                )}
                              </span>
                            </div>
                          </div>
                        </button>
                      </h2>
                      <div
                        id={`collapse${idx}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading${idx}`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body tw-pt-10 tw-px-2">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="tw-flex tw-items-center tw-mb-6 tw-relative border p-2 tw-border-[#eee] "
                            >
                              <div className="tw-pr-4 sm:tw-pr-6">
                                <img
                                  src={
                                    "/images/bg/" + IMAGES[randomNumber(0, 2)]
                                  }
                                  alt=""
                                  className="tw-min-w-[90px] tw-h-[100px] tw-object-cover"
                                />
                              </div>
                              <div className="product-info tw-flex-1 ">
                                <h5 className="tw-text-xl tw-items-start tw-flex tw-justify-between tw-leading-3 tw-font-black tw-font-cormorant tw-text-dark tw-transition-all tw-duration-300 tw-capitalize">
                                  <div>{item.product.title}</div>
                                  <div className="tw-text-2xl">
                                    {item.count * item.product.prices[0].value}
                                  </div>
                                </h5>
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
                                        {item.product.prices[0].value}
                                      </div>
                                    </span>
                                  </strong>
                                </div>
                              </div>
                              {/* <div className="tw-absolute tw-right-3 tw-h-9 tw-w-9 tw-leading-9 tw-rounded-full tw-bg-white tw-drop-shadow-sm tw-transition-all tw-ease-in-out tw-duration-300 tw-flex tw-items-center tw-justify-center tw-text-[#848484] tw-text-base hover:tw-bg-primary hover:tw-text-white">
                                <i className="bi bi-arrow-right"></i>
                              </div> */}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
export async function loader({ request }: LoaderArgs) {
  const session = await requireUserSession(request, [Role.CUSTOMER]);
  try {
    const orders = await prisma.order.findMany({
      where: {
        customer: {
          profileId: session.profileId,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    return orders;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
