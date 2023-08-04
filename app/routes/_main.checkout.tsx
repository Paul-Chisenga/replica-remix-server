/* eslint-disable jsx-a11y/anchor-is-valid */
import { Role } from "@prisma/client";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import Breadcrumb from "~/components/common/Breadcrumb";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";
import { randomNumber } from "~/utils/helpers";

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

function Checkout() {
  const items = useTypedLoaderData<typeof loader>();
  const cartTotal = items.reduce((prev, cur) => {
    const sum = cur.count * cur.product.prices[0];
    return prev + sum;
  }, 0);
  return (
    <>
      <Breadcrumb pageName="Checkout" pageTitle="Checkout" />
      <div className="checkout-section pt-120 pb-120">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="form-wrap box--shadow mb-30">
                <h4 className="title-25 mb-20">Billing Details</h4>
                <form>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-inner">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your first name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-inner">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Country / Region</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your country name"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Street Address</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="House and street name"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <select style={{ appearance: "none" }}>
                          <option>Town / City</option>
                          <option>Dhaka</option>
                          <option>Saidpur</option>
                          <option>Newyork</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <input
                          type="text"
                          name="fname"
                          placeholder="Post Code"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Additional Information</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your Phone Number"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email Address"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <input
                          type="text"
                          name="postcode"
                          placeholder="Post Code"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <textarea
                          name="message"
                          placeholder="Order Notes (Optional)"
                          rows={6}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="form-wrap box--shadow">
                <h4 className="title-25 mb-20">Ship to a Different Address?</h4>
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your first name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your last name"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <textarea
                          name="message"
                          placeholder="Order Notes (Optional)"
                          rows={3}
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <aside className="col-lg-5">
              <div className="added-product-summary mb-30">
                <h5 className="title-25 checkout-title">Order Summary</h5>
                <ul className="added-products">
                  {items.map((item) => (
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
                              ${item.product.prices[0]}
                            </span>
                          </strong>
                        </div>
                      </div>
                      {/* <div className="delete-btn">
                        <i className="bi bi-x-lg" />
                      </div> */}
                    </li>
                  ))}
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
              <form className="payment-form">
                <div className="payment-methods mb-50">
                  <div className="form-check payment-check d-flex flex-wrap tw-gap-4 tw-py-0 tw-my-0 align-items-center">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault3"
                      defaultChecked
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
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
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
                      name="flexRadioDefault"
                      id="flexRadioDefault3"
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
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                      I have read and agree to the website <br />
                      <a href="#">Terms and conditions</a>
                    </label>
                  </div>
                </div>
                <div className="place-order-btn">
                  <button type="submit" className="primary-btn8 lg--btn">
                    Place Order
                  </button>
                </div>
              </form>
            </aside>
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
    const cart = await prisma.cartItem.findMany({
      where: {
        customer: {
          profileId: session.profileId,
        },
      },
      include: {
        product: true,
      },
    });

    return cart;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
