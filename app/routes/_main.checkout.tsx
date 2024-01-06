/* eslint-disable jsx-a11y/anchor-is-valid */
import { Role } from "@prisma/client";
import {
  redirect,
  type ActionArgs,
  type LoaderArgs,
  type V2_MetaFunction,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import { useContext, useEffect } from "react";
import { useTypedLoaderData } from "remix-typedjson";
import Breadcrumb from "~/components/common/Breadcrumb";
import { CartContext } from "~/context/CartContext";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";
import {
  hasErrors,
  invariantValidate,
  parseProdImageUrl,
  requiredFieldValidate,
} from "~/utils/helpers";
import type { MyDistanceMatrix, MyObject, MyPlaceResult } from "~/utils/types";

import DeliveryAddress from "~/components/checkout/DeliveryAddress";
import MyForm from "~/components/Form/MyForm";
import DualRingLoader from "~/components/indicators/DualRingLoader";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Payment - Replica restaurant" },
    {
      name: "description",
      content: "Find healthy and awesome food at replica!",
    },
  ];
};

function Checkout() {
  const { items, customer, GOOGLE_MAPS_API_KEY } =
    useTypedLoaderData<typeof loader>();
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const cartContext = useContext(CartContext);

  const cartTotal = items.reduce((prev, cur) => {
    const sum = cur.count * cur.product.price;
    return prev + sum;
  }, 0);

  useEffect(() => {
    if (actionData && actionData.success) {
      cartContext.clearCart();
    }
  }, [actionData]);

  useEffect(() => {
    if (items.length <= 0) {
      navigate("/", { replace: true });
    }
  }, [items.length, navigate]);

  return (
    <>
      <Breadcrumb pageName="Checkout" pageTitle="Checkout" />
      <div className="checkout-section pt-120 pb-120">
        <div className="container">
          <div className="tw-max-w-screen-lg tw-mx-auto">
            <Form action="" method="POST">
              <div className="added-product-summary mb-30">
                <h5 className="title-25 checkout-title">Order Summary</h5>
                <ul className="added-products">
                  {items.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className="single-product d-flex justify-content-start"
                      >
                        <div className="product-img">
                          <img
                            src={parseProdImageUrl(item.product.images)}
                            alt=""
                            className="tw-object-cover tw-object-top tw-rounded"
                            style={{ width: 50, height: 70 }}
                          />
                        </div>
                        <div className="product-info tw-max-w-[50%]">
                          <h5 className="product-title">
                            <Link to={`/shop/${item.productId}`}>
                              {item.product.title}
                            </Link>
                            {item.choices.length > 0 && (
                              <div className="tw-text-sm">
                                <div>You chose :</div>
                                {item.choices.map((ch) => (
                                  <div
                                    key={ch.id}
                                    className="tw-flex tw-gap-1 md:tw-justify-center"
                                  >
                                    <span className="tw-font-medium tw-shrink-0">
                                      {ch.selector} -{" "}
                                    </span>
                                    <div className="tw-space-y-4">
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
                          </h5>
                          <div className="product-total d-flex align-items-center">
                            <div className="quantity">
                              <div className="quantity d-flex align-items-center">
                                <div className="quantity-nav nice-number d-flex align-items-center">
                                  <span style={{ margin: "0 8px" }}>
                                    {item.count}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <strong>
                              <i className="bi bi-x-lg px-2" />
                              <span className="product-price">
                                ksh{item.product.price}
                              </span>
                            </strong>
                          </div>
                        </div>
                        {/* <div className="delete-btn">
                      <i className="bi bi-x-lg" />
                    </div> */}
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* Map */}
              <div className="summery-card mb-30 tw-px-2 sm:tw-px-6">
                <DeliveryAddress
                  API_KEY={GOOGLE_MAPS_API_KEY}
                  userShippingAddress={customer.shippingAddress ?? undefined}
                  shippingAddressExtra={
                    customer.shippingAddress?.extraInfo ?? undefined
                  }
                />
              </div>
              <div className="summery-card mb-30 tw-px-2 sm:tw-px-6">
                <h1 className="tw-font-bold tw-text-lg mb-6 tw-text-dark">
                  Extra information
                </h1>
                <MyForm.TextArea
                  id="orderNote"
                  placeholder="Optional"
                  name="orderNote"
                  rows={3}
                />
              </div>
              <div className="summery-card cost-summery mb-30">
                <table className="table cost-summery-table">
                  <thead>
                    <tr>
                      <th>Subtotal</th>
                      <th>
                        <span className="tw-text-xs">ksh</span>
                        <span>{cartTotal}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="tax">
                      <td>Delivery cost</td>
                      <td>
                        <span className="tw-text-xs">ksh</span>
                        <span>{100}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="tax">Tax</td>
                      <td>
                        <span className="tw-text-xs">ksh</span>
                        <span>{10}</span>
                      </td>
                    </tr>

                    <tr>
                      <td>Total ( tax excl.)</td>
                      <td>
                        <span className="tw-text-xs">ksh</span>
                        <span>{50}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Total ( tax incl.)</td>
                      <td>
                        <span className="tw-text-xs">ksh</span>
                        <span>{20}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="summery-card total-cost mb-30">
                <table className="table cost-summery-table total-cost">
                  <thead>
                    <tr>
                      <th>Total</th>
                      <th>
                        <span className="tw-text-xs">ksh</span>
                        <span>{cartTotal + 50 + 20 + 10 + 100}</span>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="payment-form">
                <div className="payment-methods mb-50">
                  <div className="form-check payment-check d-flex flex-wrap tw-gap-4 tw-py-0 tw-my-0 align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="flexRadioDefault3"
                      defaultChecked
                      value="MPESA"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault3"
                    >
                      MPESA Payment
                    </label>
                    <img
                      src="/images/bg/mpesa.svg"
                      className="tw-h-16"
                      alt=""
                    />
                  </div>
                  <div className="form-check payment-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="flexRadioDefault2"
                      value="CASH"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Cash on delivery
                    </label>
                    <p className="para">Pay with cash upon delivery.</p>
                  </div>
                  <div className="form-check payment-check paypal d-flex flex-wrap align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="flexRadioDefault3"
                      value="VISA"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault3"
                    >
                      VISA Card
                    </label>
                    <img src="/images/bg/payonert.png" alt="" />
                  </div>
                  <div className="payment-form-bottom d-flex align-items-start -tw-ml-7">
                    <MyForm.Input
                      type={"checkbox"}
                      id="terms"
                      required
                      label={
                        <>
                          I have read and agree to the website <br />
                          <a href="#">Terms and conditions</a>
                        </>
                      }
                    />
                  </div>
                </div>
                {actionData &&
                  actionData.error &&
                  navigation.state === "idle" && (
                    <div
                      className=" tw-py-2 tw-px-6 tw-rounded tw-top-0 tw-border-red-300 mb-50 tw-bg-red-200"
                      style={{ border: "1px solid" }}
                    >
                      <span className="tw-text-base tw-text-red-600">
                        {actionData.error}
                      </span>
                    </div>
                  )}
                <div className="place-order-btn">
                  <button
                    type="submit"
                    className="primary-btn8 lg--btn"
                    disabled={navigation.state === "submitting"}
                  >
                    <span>Place Order</span>
                    {navigation.state === "submitting" && (
                      <DualRingLoader size={18} />
                    )}
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
export async function loader({ request }: LoaderArgs) {
  const session = await requireUserSession(request, [Role.CUSTOMER]);
  try {
    const customer = await prisma.customer.findUniqueOrThrow({
      where: {
        profileId: session.profileId,
      },
      include: {
        profile: true,
      },
    });

    const items = await prisma.cartItem.findMany({
      where: {
        customer: {
          profileId: session.profileId,
        },
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    return {
      customer,
      items,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY as string,
    };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export async function action({ request }: ActionArgs) {
  if (request.method !== "POST") {
    throw new Error("Bad Request");
  }
  const session = await requireUserSession(request, [Role.CUSTOMER]);
  const data = Object.fromEntries(await request.formData()) as MyObject<string>;

  invariantValidate(data);
  const errors = requiredFieldValidate(data, [
    "shippingAddress",
    "distanceMatrix",
  ]);
  if (hasErrors(errors)) {
    return { error: "Shipping address is required." };
  }

  const shippingAddress = JSON.parse(data.shippingAddress) as MyPlaceResult;
  const distanceMatrix = JSON.parse(data.distanceMatrix) as MyDistanceMatrix;
  const shippingAddressExtra = data.shippingAddressExtra;
  const orderNote = data.orderNode;
  if (
    !shippingAddress ||
    !shippingAddress.lat ||
    !shippingAddress.lng ||
    !shippingAddress.name ||
    !distanceMatrix ||
    !distanceMatrix.distance ||
    !distanceMatrix.duration
  ) {
    return { error: "Shipping address is required." };
  }

  try {
    const shippingAddressPayload = {
      lat: +shippingAddress.lat,
      lng: +shippingAddress.lng,
      name: shippingAddress.name,
      extraInfo: shippingAddressExtra ?? undefined,
    };
    await prisma.$transaction(
      async (tx) => {
        const customer = await tx.customer.update({
          where: {
            profileId: session.profileId,
          },
          data: {
            shippingAddress: shippingAddressPayload,
          },
          include: {
            profile: true,
          },
        });

        const cart = await tx.cartItem.findMany({
          where: {
            customer: {
              id: customer.id,
            },
          },
          include: {
            product: {
              include: {
                images: true,
                menuItem: true,
              },
            },
          },
        });

        const count = await tx.order.count();

        await tx.order.create({
          data: {
            orderNo: count + 1,
            items: cart.map((item) => ({
              product: {
                id: item.productId,
                name: item.product.title,
                description: item.product.description,
                price: item.product.price,
                choices: item.choices,
                imageUrl: item.product.images[0]?.key ?? "",
                meta: item.product.meta,
                menuItem: item.product.menuItem.title,
                menuCategory: item.product.menuItem.category,
              },
              count: item.count,
            })),
            customer: {
              id: customer.id,
              firstname: customer.profile.firstname,
              lastname: customer.profile.lastname,
              email: customer.profile.email,
              phone: customer.profile.phone,
              shippingAddress: customer.shippingAddress!,
            },
            meta: orderNote ? { orderNote } : undefined,
            deliveryCode: 3452,
          },
        });

        await tx.cartItem.deleteMany({
          where: {
            customer: {
              id: customer.id,
            },
          },
        });

        // Sendmail to admin

        // await sendEmail({
        //   to: {
        //     name: process.env.ADMIN_NAME as string,
        //     email: process.env.ADMIN_EMAIL as string,
        //   },
        //   subject: "REPLICA NEW ORDER",
        //   message: `
        //       <div style="margin-bottom: 3rem">
        //         <h2 style="margin-bottom: 1rem"><strong>Items</strong></h2>
        //         <h3 style="margin-bottom: 2rem"><strong>Total Amount : </strong>${order.items.reduce(
        //           (prev, cur) => prev + cur.count * cur.product.price,
        //           0
        //         )}</h3>
        //         <div>
        //           ${(function () {
        //             let items = "";
        //             order.items.forEach((orderItem) => {
        //               items += `
        //               <div style="display: flex;flex-direction: row;gap: 1rem;padding: 0.5rem 1rem;border-radius: 0.375rem;margin-bottom: 1rem">
        //                 <img src="https://images.unsplash.com/photo-1682686581660-3693f0c588d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" alt="image" style="max-height: 3rem;border-radius: 0.25rem;margin-right: 1rem" />
        //                 <div>
        //                   <div style="text-transform: capitalize;">
        //                     <b>
        //                       ${orderItem.product.name}
        //                     </b>
        //                   </div>
        //                   <div>Price : ${orderItem.product.price} ksh</div>
        //                   <div>No of items : ${orderItem.count}</div>
        //                 </div>
        //               </div>
        //                   `;
        //             });
        //             return items;
        //           })()}
        //         </div>
        //       </div>
        //       <div>

        //         <li><strong>Location </strong></li>
        //         <br />
        //         <li><strong>City : </strong> ${
        //           order.customer.shippingAddress.name
        //         } </li>
        //         <br />
        //         <li><strong>Order notes : </strong> <p>${
        //           (order.meta as Prisma.JsonObject).orderNote
        //         } </p></li>
        //       </div>
        //     `,
        // });

        // Sendmail to customer

        // await sendEmail({
        //   to: {
        //     name: customer.profile.firstname,
        //     email: customer.profile.email,
        //   },
        //   subject: `Replica-${order.orderNo} confirmed`,
        //   message: `
        //           <p>Hey ${
        //             customer.profile.firstname
        //           }, Thank you for your purchase on replica.</p>
        //           <p>Your order has been confirmed successfully.</p>
        //           <p>We will notify you as soon as possible.</p>
        //           <br />
        //           <div style="margin-bottom: 3rem">
        //             <h2 style="margin-bottom: 1rem">This order contains the following items</h2>
        //             <h3 style="margin-bottom: 2rem"><strong>Total Amount : </strong>${order.items.reduce(
        //               (prev, cur) => prev + cur.count * cur.product.price,
        //               0
        //             )}</h3>
        //             <div>
        //               ${(function () {
        //                 let items = "";
        //                 order.items.forEach((orderItem) => {
        //                   items += `
        //                   <div style="display: flex;flex-direction: row;gap: 1rem;padding: 0.5rem 1rem;border-radius: 0.375rem;margin-bottom: 1rem">
        //                     <img src="https://images.unsplash.com/photo-1682686581660-3693f0c588d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" alt="image" style="max-height: 3rem;border-radius: 0.25rem;margin-right: 1rem" />
        //                     <div>
        //                       <div style="text-transform: capitalize;">
        //                         <b>
        //                           ${orderItem.product.name}
        //                         </b>
        //                       </div>
        //                       <div>Price : ${orderItem.product.price} ksh</div>
        //                       <div>No of items : ${orderItem.count}</div>
        //                     </div>
        //                   </div>
        //                       `;
        //                 });
        //                 return items;
        //               })()}
        //             </div>
        //           </div>
        //         <div >
        //           `,
        // });
      },
      {
        timeout: 5 * 60 * 1000,
      }
    );

    return redirect("/orders");
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
