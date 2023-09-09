/* eslint-disable jsx-a11y/anchor-is-valid */
import { type LoaderArgs } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useTypedFetcher, useTypedLoaderData } from "remix-typedjson";
import Breadcrumb from "~/components/common/Breadcrumb";
import { getUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";
import { randomNumber } from "~/utils/helpers";
import type { action } from "./_main.cart.$id.increment";
import { ClipLoader } from "react-spinners";
import LinkButton2 from "~/components/Button/LinkButton2";
import useCartContext from "~/hooks/useCartContext";
import type { ContextCartItem } from "~/context/CartContext";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Cart - Replica restaurant" },
    {
      name: "description",
      content: "Find healthy and awesome food at replica!",
    },
  ];
};

const IMAGES = ["cart-01.png", "cart-02.png", "cart-03.png"];

function Cart() {
  const { cart, authenticated } = useTypedLoaderData<typeof loader>();
  const [items, setItems] = useState<ContextCartItem[]>([]);

  const fetcher = useTypedFetcher<typeof action>();
  const cartContext = useCartContext();

<<<<<<< HEAD
  const [cartTotal, setCartTotal] = useState(0);

  const increment = (prodId: string, price: number) => {
    const cartItem = items.find(
      (item) => item.product.id === prodId && item.price === price
=======
  const cartTotal = cart.reduce((prev, cur) => {
    const sum = cur.count * cur.price;
    return prev + sum;
  }, 0);

  const increment = (itemId: string, price: number) => {
    fetcher.submit(
      {
        price,
      },
      {
        action: `${itemId}/increment`,
        method: "POST",
      }
>>>>>>> e88ae82
    );

    if (!cartItem) return;

    cartContext.increment(cartItem.product, price);

    // fetcher.submit(
    //   {},
    //   {
    //     action: `${itemId}/increment`,
    //     method: "POST",
    //   }
    // );
  };

<<<<<<< HEAD
  const decrement = (prodId: string, price: number) => {
    const cartItem = items.find(
      (item) => item.product.id === prodId && item.price === price
=======
  const decrement = (itemId: string, price: number) => {
    fetcher.submit(
      {
        price,
      },
      {
        action: `${itemId}/decrement`,
        method: "POST",
      }
>>>>>>> e88ae82
    );

    if (!cartItem) return;

    cartContext.decrement(cartItem.product, price);
  };
<<<<<<< HEAD
  const handleDelete = (prodId: string, price: number) => {
    const cartItem = items.find(
      (item) => item.product.id === prodId && item.price === price
=======
  const handleDelete = (itemId: string, price: number) => {
    fetcher.submit(
      {
        price,
      },
      {
        action: `${itemId}/remove`,
        method: "DELETE",
      }
>>>>>>> e88ae82
    );

    if (!cartItem) return;

    cartContext.remove(cartItem.product, price);
  };

  // const increment = (itemId: string) => {
  //   fetcher.submit(
  //     {},
  //     {
  //       action: `${itemId}/increment`,
  //       method: "POST",
  //     }
  //   );
  // };

  // const decrement = (itemId: string) => {
  //   fetcher.submit(
  //     {},
  //     {
  //       action: `${itemId}/decrement`,
  //       method: "POST",
  //     }
  //   );
  // };
  // const handleDelete = (itemId: string) => {
  //   fetcher.submit(
  //     {},
  //     {
  //       action: `${itemId}/remove`,
  //       method: "DELETE",
  //     }
  //   );
  // };

  // compare cart from db and context
  useEffect(() => {
    if (authenticated) {
      cartContext.setCart(
        cart.map((item) => ({
          id: item.id,
          count: item.count,
          price: item.price,
          product: item.product,
        }))
      );
    }
  }, [cartContext]);

  useEffect(() => {
    setItems(cartContext.items);
  }, [cartContext.items]);

  // compute total
  useEffect(() => {
    const sum = items.reduce((prev, cur) => {
      const sum = cur.count * cur.product.prices[0].value;
      return prev + sum;
    }, 0);

    setCartTotal(sum);
  }, [items]);

  useEffect(() => {
    if (fetcher.data) {
      // cartContext.updateCart(fetcher.data.count);
      // setItems(fetcher.data.items);
    }
  }, [fetcher.data]);

  return (
    <>
      <Breadcrumb pageName="Cart" pageTitle="Cart" />
      <div className="cart-section pt-120 pb-120">
        <div className="container">
          {fetcher.state === "submitting" && (
            <div className="tw-fixed tw-inset-0 tw-z-10 tw-flex tw-items-center tw-justify-center tw-bg-white/5">
              <ClipLoader />
            </div>
          )}
          {items.length === 0 && (
            <div className="tw-p-5 tw-text-center">
              <p className="">There is nothing to see</p>
              <LinkButton2 to="/shop">Go shopping</LinkButton2>
            </div>
          )}
          {items.length > 0 && (
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
                          <th>Unite Price</th>
                          <th>Discount Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
<<<<<<< HEAD
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td data-label="Delete">
                              <div
                                className="delete-icon"
                                onClick={() =>
                                  handleDelete(item.product.id, item.price)
                                }
                              >
                                <i className="bi bi-x" />
                              </div>
                            </td>
                            <td data-label="Image">
                              <img
                                src={"/images/bg/" + IMAGES[randomNumber(0, 2)]}
                                alt=""
                              />
                            </td>
                            <td data-label="Food Name">
                              <Link
                                to={`/shop/${item.product.id}`}
                                className="tw-capitalize"
                              >
                                {item.product.title}
                              </Link>
                            </td>
                            <td data-label="Unite Price">
                              <del>
                                <span className="tw-text-xs">ksh</span>
                                <span>{item.price}</span>
                              </del>
                            </td>
                            <td data-label="Discount Price">
                              <span className="tw-text-xs">ksh</span>
                              <span>{item.price}</span>
                            </td>
                            <td data-label="Quantity">
                              <div className="quantity d-flex align-items-center">
                                <div className="quantity-nav nice-number d-flex align-items-center">
                                  <button
                                    onClick={() =>
                                      decrement(item.product.id, item.price)
                                    }
                                    type="button"
                                  >
                                    <i className="bi bi-dash"></i>
                                  </button>
                                  <div>{item.count}</div>
                                  <button
                                    onClick={() =>
                                      increment(item.product.id, item.price)
                                    }
                                    type="button"
                                  >
                                    <i className="bi bi-plus"></i>
                                  </button>
=======
                        {items.map((item) => {
                          let variationLabel = "";
                          const price = item.product.prices.find(
                            (price) => price.value === item.price
                          );

                          if (price && price.label !== "std") {
                            variationLabel = price.label;
                          }
                          return (
                            <tr key={item.id}>
                              <td data-label="Delete">
                                <div
                                  className="delete-icon"
                                  onClick={() =>
                                    handleDelete(item.id, item.price)
                                  }
                                >
                                  <i className="bi bi-x" />
>>>>>>> e88ae82
                                </div>
                              </td>
                              <td data-label="Image">
                                <img
                                  src={
                                    "/images/bg/" + IMAGES[randomNumber(0, 2)]
                                  }
                                  alt=""
                                />
                              </td>
                              <td data-label="Food Name">
                                <Link
                                  to={`/shop/${item.productId}`}
                                  className="tw-capitalize"
                                >
                                  {item.product.title}
                                  {variationLabel && ` ( ${variationLabel} ) `}
                                </Link>
                              </td>
                              <td data-label="Unite Price">
                                <del>
                                  <span className="tw-text-xs">ksh</span>
                                  <span>{item.price}</span>
                                </del>
                              </td>
                              <td data-label="Discount Price">
                                <span className="tw-text-xs">ksh</span>
                                <span>{item.price}</span>
                              </td>
                              <td data-label="Quantity">
                                <div className="quantity d-flex align-items-center">
                                  <div className="quantity-nav nice-number d-flex align-items-center">
                                    <button
                                      onClick={() =>
                                        decrement(item.id, item.price)
                                      }
                                      type="button"
                                    >
                                      <i className="bi bi-dash"></i>
                                    </button>
                                    <div>{item.count}</div>
                                    <button
                                      onClick={() =>
                                        increment(item.id, item.price)
                                      }
                                      type="button"
                                    >
                                      <i className="bi bi-plus"></i>
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td data-label="Subtotal">
                                <span className="tw-text-xs">ksh</span>
                                <span>{item.price * item.count}</span>
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
                    <Link to="/shop">
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
<<<<<<< HEAD
  const session = await getUserSession(request);
  // if (session && session.role === Role.ADMIN) return redirect("/");
=======
  const session = await requireUserSession(request, [Role.CUSTOMER], "/cart");
>>>>>>> e88ae82
  try {
    const cart = session
      ? await prisma.cartItem.findMany({
          where: {
            customer: {
              profileId: session.profileId,
            },
          },
          include: {
            product: {
              include: {
                pictures: true,
              },
            },
          },
        })
      : [];

    return { cart, authenticated: !!session };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
