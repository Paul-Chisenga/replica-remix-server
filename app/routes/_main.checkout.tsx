/* eslint-disable jsx-a11y/anchor-is-valid */
import { Role } from "@prisma/client";
import {
  type ActionArgs,
  type LoaderArgs,
  type V2_MetaFunction,
} from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import type { FC } from "react";
import { useContext, useEffect, useState } from "react";
import { useTypedLoaderData } from "remix-typedjson";
import MyForm from "~/components/Form/MyForm";
import Breadcrumb from "~/components/common/Breadcrumb";
import { CartContext } from "~/context/CartContext";
import { requireUserSession } from "~/controllers/auth.server";
import { sendEmail } from "~/services/email.server";
import prisma from "~/services/prisma.server";
import {
  hasErrors,
  invariantValidate,
  parseProductVariation,
  randomNumber,
  requiredFieldValidate,
} from "~/utils/helpers";
import type { MyObject } from "~/utils/types";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Payment - Replica restaurant" },
    {
      name: "description",
      content: "Find healthy and awesome food at replica!",
    },
  ];
};

const IMAGES = ["cart-01.png", "cart-02.png", "cart-03.png"];

const ShippingData: FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="tw-flex tw-items-center tw-gap-4">
    <div className="tw-font-jost tw-font-medium tw-text-dark tw-capitalize tw-text-sm">
      {label}
    </div>
    <h6>:</h6>
    <div className="tw-font-jost tw-font-normal tw-text-base">{value}</div>
  </div>
);

function Checkout() {
  const { items, customer } = useTypedLoaderData<typeof loader>();
  const actionData = useActionData();

  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);

  const navigation = useNavigation();
  const cartContext = useContext(CartContext);

  const cartTotal = items.reduce((prev, cur) => {
    const sum = cur.count * cur.price;
    return prev + sum;
  }, 0);

  useEffect(() => {
    if (actionData && actionData.success) {
      cartContext.clearCart();
    }
  }, [actionData]);

  return (
    <>
      <Breadcrumb pageName="Checkout" pageTitle="Checkout" />
      <div className="checkout-section pt-120 pb-120">
        <div className="container">
          {actionData && actionData.success && (
            <div className="tw-text-cente tw-shadow tw-p-4 md:tw-p-8 tw-rounded box--shadow tw-rounded-tl-2xl tw-rounded-br-2xl tw-top-28 tw-z-30 tw-bg-primary tw-text-white tw-sticky tw-w-full">
              your order placed successfully,We will reach out to you shortly,
              redirecting...
            </div>
          )}
          <Form action="" method="POST">
            <div className="row g-4">
              <div className="col-lg-7">
                {!customer.shippingAddress && (
                  <>
                    <div className="form-wrap box--shadow mb-30">
                      <h4 className="title-25 mb-20">Shipping Address</h4>
                      <div className="row">
                        <div className="col-12">
                          <MyForm.Select.Wrapper
                            name="city"
                            required
                            errormessage={actionData?.errors?.city}
                          >
                            <MyForm.Select.Option value={""}>
                              City
                            </MyForm.Select.Option>
                            <MyForm.Select.Option value={"nairobi"}>
                              Nairobi
                            </MyForm.Select.Option>
                          </MyForm.Select.Wrapper>
                        </div>
                        <div className="col-12">
                          <MyForm.Select.Wrapper
                            name="town"
                            required
                            errormessage={actionData?.errors?.town}
                          >
                            <MyForm.Select.Option value={""}>
                              Town
                            </MyForm.Select.Option>
                            <MyForm.Select.Option value={"westlands"}>
                              Westland
                            </MyForm.Select.Option>
                            <MyForm.Select.Option value={"parkland"}>
                              Parkland
                            </MyForm.Select.Option>
                            <MyForm.Select.Option value={"karen"}>
                              Karen
                            </MyForm.Select.Option>
                            <MyForm.Select.Option value={"lavington"}>
                              Lanvington
                            </MyForm.Select.Option>
                          </MyForm.Select.Wrapper>
                        </div>
                        <div className="col-12">
                          <MyForm.Input
                            label="Street Address"
                            name="street"
                            placeholder="House and street name"
                            required
                            errormessage={actionData?.errors?.street}
                          />
                        </div>
                        <div className="col-12">
                          <MyForm.TextArea
                            name="message"
                            placeholder="Order Notes (Optional)"
                            rows={6}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {customer.shippingAddress && (
                  <div className="form-wrap box--shadow mb-30">
                    <h4 className="title-25 mb-20">Shipping Details</h4>
                    <ShippingData
                      label="Name"
                      value={
                        customer.shippingAddress.firstname +
                        " " +
                        customer.shippingAddress.lastname
                      }
                    />
                    <ShippingData
                      label="City"
                      value={customer.shippingAddress.city}
                    />
                    <ShippingData
                      label="Town"
                      value={customer.shippingAddress.town}
                    />
                    <ShippingData
                      label="Street Address"
                      value={customer.shippingAddress.street}
                    />
                    <ShippingData
                      label="Phone Number"
                      value={"0" + customer.shippingAddress.phone}
                    />
                    <ShippingData
                      label="Email Address"
                      value={customer.shippingAddress.email}
                    />
                    <br />
                    <div>
                      <MyForm.TextArea
                        name="message"
                        placeholder="Order Notes (Optional)"
                        rows={6}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                )}
                <input
                  type="hidden"
                  name="hadShippingAddress"
                  value={customer.shippingAddress ? "true" : "false"}
                />
                <input
                  type="hidden"
                  name="shipToDifferentAddress"
                  value={shipToDifferentAddress ? "true" : "false"}
                />
                {customer.shippingAddress && (
                  <>
                    <div className=" box--shadow px-4 tw-pt-1 tw-rounded">
                      <MyForm.Input
                        type="checkbox"
                        label="Ship to a Different Address?"
                        checked={shipToDifferentAddress}
                        onChange={(e) => {
                          setShipToDifferentAddress(e.target.checked);
                        }}
                        className="tw-mb-0"
                      />
                    </div>
                    {shipToDifferentAddress && (
                      <div className="form-wrap box--shadow">
                        <h4 className="title-25 mb-20">
                          Ship to a Different Address?
                        </h4>
                        <div className="row">
                          <div className="col-lg-6">
                            <MyForm.Input
                              label="First Name"
                              type="text"
                              name="ofirstname"
                              placeholder="First name"
                              required={shipToDifferentAddress}
                              errormessage={actionData?.errors?.ofirstname}
                            />
                          </div>
                          <div className="col-lg-6">
                            <MyForm.Input
                              label="Last Name"
                              type="text"
                              name="olastname"
                              placeholder="Last name"
                              required={shipToDifferentAddress}
                              errormessage={actionData?.errors?.olastname}
                            />
                          </div>
                          <div className="col-12">
                            <MyForm.Select.Wrapper
                              name="ocity"
                              required={shipToDifferentAddress}
                              errormessage={actionData?.errors?.ocity}
                            >
                              <MyForm.Select.Option value={""}>
                                City
                              </MyForm.Select.Option>
                              <MyForm.Select.Option value={"nairobi"}>
                                Nairobi
                              </MyForm.Select.Option>
                            </MyForm.Select.Wrapper>
                          </div>
                          <div className="col-12">
                            <div className="form-inner">
                              <MyForm.Select.Wrapper
                                name="otown"
                                required={shipToDifferentAddress}
                                errormessage={actionData?.errors?.otown}
                              >
                                <MyForm.Select.Option value={""}>
                                  Town
                                </MyForm.Select.Option>
                                <MyForm.Select.Option value={"westlands"}>
                                  Westland
                                </MyForm.Select.Option>
                                <MyForm.Select.Option value={"parkland"}>
                                  Parkland
                                </MyForm.Select.Option>
                                <MyForm.Select.Option value={"karen"}>
                                  Karen
                                </MyForm.Select.Option>
                                <MyForm.Select.Option value={"lavington"}>
                                  Lanvington
                                </MyForm.Select.Option>
                              </MyForm.Select.Wrapper>
                            </div>
                          </div>
                          <div className="col-12">
                            <MyForm.Input
                              label="Street Address"
                              type="text"
                              name="ostreet"
                              placeholder="House and street name"
                              required={shipToDifferentAddress}
                              errormessage={actionData?.errors?.ostreet}
                            />
                          </div>
                          <div className="col-12">
                            <MyForm.Input
                              label="Additional Information"
                              type="text"
                              name="ophone"
                              placeholder="Phone Number"
                              minLength={10}
                              maxLength={10}
                              required={shipToDifferentAddress}
                              errormessage={actionData?.errors?.ophone}
                            />
                          </div>
                          <div className="col-12">
                            <MyForm.Input
                              type="email"
                              name="oemail"
                              placeholder="Email Address"
                              required={shipToDifferentAddress}
                              errormessage={actionData?.errors?.oemail}
                            />
                          </div>

                          <div className="col-12">
                            <MyForm.TextArea
                              name="omessage"
                              placeholder="Order Notes (Optional)"
                              rows={6}
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <aside className="col-lg-5">
                <div className="added-product-summary mb-30">
                  <h5 className="title-25 checkout-title">Order Summary</h5>
                  <ul className="added-products">
                    {items.map((item) => {
                      const variationLabel = parseProductVariation(
                        item.product.prices,
                        item.price
                      );
                      return (
                        <li
                          key={item.id}
                          className="single-product d-flex justify-content-start"
                        >
                          <div className="product-img">
                            <img
                              src={"/images/bg/" + IMAGES[randomNumber(0, 2)]}
                              alt=""
                            />
                          </div>
                          <div className="product-info">
                            <h5 className="product-title tw-capitalize">
                              <Link to={`/shop/${item.productId}`}>
                                {item.product.title}
                                {variationLabel && ` ( ${variationLabel} ) `}
                              </Link>
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
                                  ${item.price}
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
                          <span>{cartTotal + 50 + 20 + 10}</span>
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
                    <div className="payment-form-bottom d-flex align-items-start">
                      <input type="checkbox" id="terms" required />
                      <label htmlFor="terms">
                        I have read and agree to the website <br />
                        <a href="#">Terms and conditions</a>
                      </label>
                    </div>
                  </div>
                  <div className="place-order-btn">
                    <button type="submit" className="primary-btn8 lg--btn">
                      {navigation.state !== "submitting"
                        ? " Place Order"
                        : "Submitting..."}
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </Form>
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
        product: true,
      },
    });

    return { customer, items };
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
  //
  if (
    !data.shipToDifferentAddress ||
    (data.shipToDifferentAddress !== "true" &&
      data.shipToDifferentAddress !== "false")
  ) {
    throw new Error("Invalid Request");
  }
  invariantValidate(data);

  //
  let fields: string[] = [];
  if (
    data.shipToDifferentAddress === "false" &&
    data.hasShippingAddress === "false"
  ) {
    fields = ["city", "town", "street"];
  }
  if (data.shipToDifferentAddress === "true") {
    fields = [
      "ofirstname",
      "olastname",
      "ocity",
      "otown",
      "ostreet",
      "ophone",
      "oemail",
    ];
  }

  const errors = requiredFieldValidate(data, fields);
  if (hasErrors(errors)) {
    return { errors };
  }
  try {
    await prisma.$transaction(
      async (tx) => {
        let customer = await tx.customer.findUniqueOrThrow({
          where: {
            profileId: session.profileId,
          },
          include: {
            profile: true,
          },
        });

        if (!customer.shippingAddress) {
          customer = await tx.customer.update({
            where: { id: customer.id },
            data: {
              shippingAddress: {
                firstname: customer.profile.firstname,
                lastname: customer.profile.lastname,
                country: "kenya",
                city: data.city.trim(),
                town: data.town.trim(),
                street: data.street.trim(),
                phone: customer.profile.phone,
                email: customer.profile.email,
              },
            },
            include: {
              profile: true,
            },
          });
        }

        const cart = await tx.cartItem.findMany({
          where: {
            customer: {
              id: customer.id,
            },
          },
          include: {
            product: true,
          },
        });

        const count = await tx.order.count();

        const order = await tx.order.create({
          data: {
            orderNo: count + 1,
            customer: {
              connect: {
                id: customer.id,
              },
            },
            items: {
              create: cart.map((item) => ({
                count: item.count,
                productId: item.productId,
                price: item.price,
              })),
            },
            shippingAddress: {
              firstname: data.ofirstname ?? customer.shippingAddress!.firstname,
              lastname: data.olastname ?? customer.shippingAddress!.lastname,
              country: "kenya",
              city: data.ocity ?? customer.shippingAddress!.city,
              town: data.otown ?? customer.shippingAddress!.town,
              phone: data.ophone
                ? +data.ophone
                : customer.shippingAddress!.phone,
              email: data.oemail ?? customer.shippingAddress!.email,
              street: data.ostreet ?? customer.shippingAddress!.street,
              order_notes: data.omessage ?? data.message ?? undefined,
            },
          },
          include: {
            items: {
              include: {
                product: {
                  include: {
                    pictures: true,
                  },
                },
              },
            },
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
        await sendEmail({
          to: {
            name: process.env.ADMIN_NAME as string,
            email: process.env.ADMIN_EMAIL as string,
          },
          subject: "REPLICA NEW ORDER",
          message: `
              <div style="margin-bottom: 3rem">
                <h2 style="margin-bottom: 1rem"><strong>Items</strong></h2>
                <h3 style="margin-bottom: 2rem"><strong>Total Amount : </strong>${order.items.reduce(
                  (prev, cur) => prev + cur.count * cur.price,
                  0
                )}</h3>
                <div>
                  ${(function () {
                    let items = "";
                    order.items.forEach((orderItem) => {
                      items += `
                      <div style="display: flex;flex-direction: row;gap: 1rem;padding: 0.5rem 1rem;border-radius: 0.375rem;margin-bottom: 1rem">
                        <img src="https://images.unsplash.com/photo-1682686581660-3693f0c588d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" alt="image" style="max-height: 3rem;border-radius: 0.25rem;margin-right: 1rem" />
                        <div>
                          <div style="text-transform: capitalize;">
                            <b>
                              ${
                                orderItem.product.title
                              } ${parseProductVariation(
                        orderItem.product.prices,
                        orderItem.price
                      )}
                            </b>
                          </div>
                          <div>Price : ${orderItem.price} ksh</div>
                          <div>No of items : ${orderItem.count}</div>
                        </div>
                      </div>
                          `;
                    });
                    return items;
                  })()}
                </div>
              </div>
              <div>
                <h2 style="margin-bottom: 2rem"><strong>Shipping Address</strong></h2>
                <li><strong>Firstname : </strong> ${
                  order.shippingAddress.firstname
                } </li>
                <li><strong>Lastname : </strong> ${
                  order.shippingAddress.lastname
                } </li>
                <li><strong>Email : </strong> ${
                  order.shippingAddress.email
                } </li>
                <li><strong>Phone : </strong> 0${
                  order.shippingAddress.phone
                } </li>
                <br />
                <li><strong>Location </strong></li>
                <br />
                <li><strong>City : </strong> ${order.shippingAddress.city} </li>
                <li><strong>Town : </strong> ${order.shippingAddress.town} </li>
                <li><strong>street : </strong> ${
                  order.shippingAddress.street
                } </li>
                <br />
                <li><strong>Order notes : </strong> <p>${
                  order.shippingAddress.order_notes
                } </p></li>
              </div>
            `,
        });

        // Sendmail to customer
        await sendEmail({
          to: {
            name: customer.profile.firstname,
            email: customer.profile.email,
          },
          subject: `Replica-${order.orderNo} confirmed`,
          message: `
                  <p>Hey ${
                    customer.profile.firstname
                  }, Thank you for your purchase on replica.</p>
                  <p>Your order has been confirmed successfully.</p>
                  <p>We will notify you as soon as possible.</p>
                  <br />
                  <div style="margin-bottom: 3rem">
                    <h2 style="margin-bottom: 1rem">This order contains the following items</h2>
                    <h3 style="margin-bottom: 2rem"><strong>Total Amount : </strong>${order.items.reduce(
                      (prev, cur) => prev + cur.count * cur.price,
                      0
                    )}</h3>
                    <div>
                      ${(function () {
                        let items = "";
                        order.items.forEach((orderItem) => {
                          items += `
                          <div style="display: flex;flex-direction: row;gap: 1rem;padding: 0.5rem 1rem;border-radius: 0.375rem;margin-bottom: 1rem">
                            <img src="https://images.unsplash.com/photo-1682686581660-3693f0c588d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" alt="image" style="max-height: 3rem;border-radius: 0.25rem;margin-right: 1rem" />
                            <div>
                              <div style="text-transform: capitalize;">
                                <b>
                                  ${
                                    orderItem.product.title
                                  } ${parseProductVariation(
                            orderItem.product.prices,
                            orderItem.price
                          )}
                                </b>
                              </div>
                              <div>Price : ${orderItem.price} ksh</div>
                              <div>No of items : ${orderItem.count}</div>
                            </div>
                          </div>
                              `;
                        });
                        return items;
                      })()}
                    </div>
                  </div>
                <div >
                  `,
        });
      },
      {
        timeout: 5 * 60 * 1000,
      }
    );

    return { success: true };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
