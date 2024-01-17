/* eslint-disable jsx-a11y/anchor-is-valid */
import { Role } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { useContext, useEffect } from "react";
import { useTypedFetcher, useTypedLoaderData } from "remix-typedjson";
import Breadcrumb from "~/components/common/Breadcrumb";
import { requireUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";
import { CartContext } from "~/context/CartContext";
import { parseProdImageUrl } from "~/utils/helpers";
import type { action } from "./_main.cart.$id.increment";
import LinkButton2 from "~/components/Button/LinkButton2";
import FullPageLoader from "~/components/indicators/FullPageLoader";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Cart - Replica restaurant" },
    {
      name: "description",
      content: "Find healthy and awesome food at replica!",
    },
  ];
};

function Cart() {
  const cart = useTypedLoaderData<typeof loader>();
  const fetcher = useTypedFetcher<typeof action>();
  const cartContext = useContext(CartContext);

  const cartTotal = cart.reduce((prev, cur) => {
    const sum = cur.count * cur.product.price;
    return prev + sum;
  }, 0);

  const increment = (itemId: string) => {
    fetcher.submit(null, {
      action: `${itemId}/increment`,
      method: "PATCH",
    });
  };

  const decrement = (itemId: string) => {
    fetcher.submit(null, {
      action: `${itemId}/decrement`,
      method: "PATCH",
    });
  };
  const handleDelete = (itemId: string) => {
    fetcher.submit(null, {
      action: `${itemId}/remove`,
      method: "DELETE",
    });
  };

  useEffect(() => {
    cartContext.updateCart(cart.length);
  }, [cart.length]);

  return (
    <>
      <Breadcrumb pageName="Cart" pageTitle="Cart" />
      <div className="cart-section pt-120 pb-120">
        <div className="container">
          {fetcher.state === "submitting" && <FullPageLoader />}
          {cart.length === 0 && (
            <div className="tw-p-5 tw-text-center">
              <p className="">There is nothing to see</p>
              <LinkButton2 to="/menu/lunch-dinner">Go shopping</LinkButton2>
            </div>
          )}
          {cart.length > 0 && (
            <>
              <div className="row">
                <div className="col-12">
                  <div className="table-wrapper">
                    <table className="eg-table table cart-table">
                      <thead>
                        <tr>
                          <th>Delete</th>
                          <th>Image</th>
                          <th>Food Name</th>
                          {/* <th>Unite Price</th> */}
                          <th>Price</th>
                          {/* <th>Discount Price</th> */}
                          <th>Quantity</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td data-label="Delete">
                                <div
                                  className="delete-icon"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <i className="bi bi-x" />
                                </div>
                              </td>
                              <td data-label="Image">
                                <img
                                  src={parseProdImageUrl(item.product.image)}
                                  alt=""
                                  className="tw-object-cover tw-object-top tw-rounded"
                                  style={{ width: 80, height: 70 }}
                                />
                              </td>
                              <td data-label="Food Name" className="tw-pl-8">
                                <Link
                                  to={`/shop/${item.productId}`}
                                  className="tw-text-xl"
                                >
                                  {item.product.title}
                                </Link>
                                {item.choices.length > 0 && (
                                  <div className="tw-text-sm   tw-text-left md:tw-text-center">
                                    You chose :
                                    {item.choices.map((ch) => (
                                      <div
                                        key={ch.id}
                                        className="tw-flex tw-gap-1 md:tw-justify-center"
                                      >
                                        <span className=" tw-shrink-0">
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
                              </td>
                              {/* <td data-label="Unite Price">
                                <del>
                                  <span className="tw-text-xs">ksh</span>
                                  <span>{item.product.price}</span>
                                </del>
                              </td> */}
                              {/* <td data-label="Discount Price">
                                <span className="tw-text-xs">ksh</span>
                                <span>{item.product.price}</span>
                              </td> */}
                              <td data-label="Price">
                                <span className="tw-text-xs">ksh</span>
                                <span>{item.product.price}</span>
                              </td>
                              <td data-label="Quantity">
                                <div className="quantity d-flex align-items-center">
                                  <div className="quantity-nav nice-number d-flex align-items-center">
                                    <button
                                      onClick={() => decrement(item.id)}
                                      type="button"
                                    >
                                      <i className="bi bi-dash"></i>
                                    </button>
                                    <div>{item.count}</div>
                                    <button
                                      onClick={() => increment(item.id)}
                                      type="button"
                                    >
                                      <i className="bi bi-plus"></i>
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td data-label="Subtotal">
                                <span className="tw-text-xs">ksh</span>
                                <span>{item.product.price * item.count}</span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row g-4">
                <div className="col-lg-4">
                  <div className="coupon-area">
                    <div className="cart-coupon-input">
                      <h5 className="coupon-title">Coupon Code</h5>
                      <form className="coupon-input d-flex align-items-center">
                        <input type="text" placeholder="Coupon Code" />
                        <button type="submit">Apply Code</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <table className="table total-table">
                    <thead>
                      <tr>
                        <th>Cart Totals</th>
                        <th />
                        <th>
                          <span className="tw-text-xs">ksh</span>
                          <span>{cartTotal}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Shipping</td>
                        <td>
                          <ul className="cost-list text-start">
                            <li>Shipping Fee</li>
                            <li>Total ( tax excl.)</li>
                            <li>Total ( tax incl.)</li>
                            <li>Taxes</li>
                            <li>
                              Shipping Enter your address to view shipping
                              options. <br /> <a href="#">Calculate shipping</a>
                            </li>
                          </ul>
                        </td>
                        <td>
                          <ul className="single-cost text-center">
                            <li>
                              <span className="tw-text-xs">ksh</span>
                              <span>100</span>
                            </li>
                            <li>
                              <span className="tw-text-xs">ksh</span>
                              <span>50</span>
                            </li>
                            <li></li>
                            <li>
                              <span className="tw-text-xs">ksh</span>
                              <span>20</span>
                            </li>
                            <li>
                              <span className="tw-text-xs">ksh</span>
                              <span>10</span>
                            </li>
                            <li>
                              <span className="tw-text-xs">ksh</span>
                              <span>10</span>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>Subtotal</td>
                        <td />
                        <td>{cartTotal + 100 + 50 + 20 + 10 + 10}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="cart-btn-group">
                    <Link to="/menu/lunch-dinner">
                      <a className="primary-btn3 btn-lg">
                        Continue to shopping
                      </a>
                    </Link>
                    <Link to="/checkout">
                      <a className="primary-btn3 btn-lg">Proceed to Checkout</a>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
export async function loader({ request }: LoaderArgs) {
  const session = await requireUserSession(request, [Role.CUSTOMER], "/cart");
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
