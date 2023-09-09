/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import type { LoaderArgs } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { Form, Link } from "@remix-run/react";
import invariant from "invariant";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTypedFetcher, useTypedLoaderData } from "remix-typedjson";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
import Breadcrumb from "~/components/common/Breadcrumb";
import { getUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";
import { formatDate, parseMenuCategory } from "~/utils/helpers";
import type { action } from "./_main.shop_.$id.add-to-cart";
import { ClipLoader } from "react-spinners";
import { CartContext } from "~/context/CartContext";
import MyForm from "~/components/Form/MyForm";

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.product.title ?? "Product"} - Replica restaurant` },
    {
      name: "description",
      content:
        data?.product.description ??
        "Find healthy and awesome food at replica!",
    },
  ];
};

function ShopDetails() {
  const { product, cartCount } = useTypedLoaderData<typeof loader>();
  const [count, setCount] = useState(cartCount ?? 0);
  const [selectedPrice, setSelectedPrice] = useState("0");

  const fetcher = useTypedFetcher<typeof action>();
  const cartContext = useContext(CartContext);

  const increment = useCallback(() => {
    fetcher.submit(
      {
        price: product.prices[+selectedPrice].value,
      },
      {
        action: `add-to-cart`,
        method: "POST",
      }
    );
  }, [selectedPrice]);

  const decrement = useCallback(() => {
    if (count > 0) {
      fetcher.submit(
        {
          price: product.prices[+selectedPrice].value,
        },
        {
          action: `remove-from-cart`,
          method: "POST",
        }
      );
    }
  }, [selectedPrice]);

  useEffect(() => {
    if (fetcher.data) {
      cartContext.updateCart(fetcher.data.totalUserCartItems);
      setCount(fetcher.data.totalProductCartItems);
    }
  }, [fetcher.data]);

  return (
    <>
      <Breadcrumb pageName={product.title} pageTitle={product.title} />
      <div className="shop-details pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-5 gy-5">
            <div className="col-lg-6">
              <div className="tab-content tab-content1" id="v-pills-tabContent">
                <div
                  className="tab-pane fade active show"
                  id="v-pills-img1"
                  role="tabpanel"
                  aria-labelledby="v-pills-img1-tab"
                >
                  <div className="gallery-big-image">
                    <img
                      className="img-fluid"
                      src="/images/bg/card-big-01.png"
                      alt=""
                    />
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-img2"
                  role="tabpanel"
                  aria-labelledby="v-pills-img2-tab"
                >
                  <img
                    className="img-fluid"
                    src="/images/bg/card-big-02.png"
                    alt=""
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-img3"
                  role="tabpanel"
                  aria-labelledby="v-pills-img3-tab"
                >
                  <img
                    className="img-fluid"
                    src="/images/bg/card-big-03.png"
                    alt=""
                  />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-img4"
                  role="tabpanel"
                  aria-labelledby="v-pills-img4-tab"
                >
                  <img
                    className="img-fluid"
                    src="/images/bg/card-big-04.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                className="nav nav1 nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <button
                  className="nav-link active"
                  id="v-pills-img1-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-img1"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-img1"
                  aria-selected="true"
                >
                  <img src="/images/bg/card-sm-01.png" alt="" />
                </button>
                <button
                  className="nav-link"
                  id="v-pills-img2-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-img2"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-img2"
                  aria-selected="false"
                >
                  <img src="/images/bg/card-sm-02.png" alt="" />
                </button>
                <button
                  className="nav-link"
                  id="v-pills-img3-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-img3"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-img3"
                  aria-selected="false"
                >
                  <img src="/images/bg/card-sm-03.png" alt="" />
                </button>
                <button
                  className="nav-link"
                  id="v-pills-img4-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#v-pills-img4"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-img4"
                  aria-selected="false"
                >
                  <img src="/images/bg/card-sm-04.png" alt="" />
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="prod-details-content">
                <ul className="product-review2 d-flex flex-row align-items-center mb-25">
                  <li>
                    <i className="bi bi-star-fill" />
                  </li>
                  <li>
                    <i className="bi bi-star-fill" />
                  </li>
                  <li>
                    <i className="bi bi-star-fill" />
                  </li>
                  <li>
                    <i className="bi bi-star-fill" />
                  </li>
                  <li>
                    <i className="bi bi-star-fill" />
                  </li>
                  <li>
                    <a href="#" className="review-no" />(
                    {product.reviews.length} Review)
                  </li>
                </ul>
                <h2 className="tw-capitalize">{product.title}</h2>
                <div className="tw-inline-block tw-w-auto">
                  {product.prices.length > 1 && (
                    <MyForm.Select.Wrapper
                      id="price-selector"
                      value={selectedPrice}
                      onChange={(e) => {
                        setSelectedPrice(e.target.value);
                      }}
                      className="tw-capitalize hover:tw-cursor-pointer"
                    >
                      {product.prices.map((item, idx) => (
                        <MyForm.Select.Option key={idx} value={idx}>
                          {item.label}
                        </MyForm.Select.Option>
                      ))}
                    </MyForm.Select.Wrapper>
                  )}
                </div>
                <div className="price-tag tw-flex tw-items-center tw-gap-2">
                  <h4>
                    <span className="tw-text-sm">ksh</span>
                    <span>{product.prices[+selectedPrice].value}</span>
                  </h4>
                </div>
                <p className="tw-capitalize">{product.subtitle}</p>
                <div className="prod-quantity d-flex align-items-center justify-content-start mb-20">
                  <div className="quantity d-flex align-items-center">
                    <div className="quantity-nav nice-number d-flex align-items-center">
                      <button
                        onClick={decrement}
                        type="button"
                        disabled={fetcher.state === "submitting"}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span style={{ margin: "0 8px" }}>
                        {fetcher.state === "submitting" ? (
                          <ClipLoader size={15} />
                        ) : (
                          count
                        )}
                      </span>
                      <button
                        onClick={increment}
                        type="button"
                        disabled={fetcher.state === "submitting"}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="primary-btn3 "
                    onClick={increment}
                    disabled={fetcher.state === "submitting"}
                  >
                    Add to cart
                  </button>
                </div>
                <div className="category-tag">
                  <ul>
                    <li>Category:</li>
                    <li>
                      <Link
                        to={`/shop?m=${product.subMenu.menu.id}`}
                        className="tw-capitalize"
                      >
                        {product.subMenu.menu.title},
                      </Link>
                    </li>
                    {product.subMenu.title !== product.subMenu.menu.title && (
                      <li>
                        <Link
                          to={`/shop?m=${product.subMenu.menu.id}&sm=${product.subMenu.id}`}
                          className="tw-capitalize"
                        >
                          {product.subMenu.title},
                        </Link>
                      </li>
                    )}
                  </ul>
                  <ul>
                    <li>Menu:</li>
                    <li>
                      <Link
                        to={`/shop?mcat=${product.subMenu.menu.category}`}
                        className="tw-capitalize"
                      >
                        {parseMenuCategory(product.subMenu.menu.category)},
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-4 pt-50">
            <div className="col-lg-12 mb-25">
              <h2 className="item-details-tt"></h2>
              {/* <h2 className="item-details-tt">Product Details</h2> */}
            </div>
            <div className="row g-4">
              <div className="col-lg-3">
                <div
                  className="nav nav2 nav  nav-pills"
                  id="v-pills-tab2"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  {/* <button
                    className="nav-link btn--lg "
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="false"
                  >
                    Details
                  </button> */}
                  <button
                    className="nav-link active"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="true"
                  >
                    Review
                  </button>
                </div>
              </div>
              <div className="col-lg-9">
                <div
                  className="tab-content tab-content2"
                  id="v-pills-tabContent2"
                >
                  <div
                    className="tab-pane fade "
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <div className="description box--shadow">
                      <p className="para-2 mb-2">{product.description}</p>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade active show"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <div className="comments-area">
                      <div className="number-of-comment">
                        <h3>Comments({product.reviews.length}) :</h3>
                      </div>
                      <div className="comment-list-area mb-60">
                        <ul className="comment-list">
                          {product.reviews.map((review) => (
                            <li key={review.id}>
                              <div className="single-comment d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap">
                                <div className="comment-image">
                                  <img
                                    src="/images/blog/comment-img-1.png"
                                    alt=""
                                  />
                                </div>
                                <div className="comment-content">
                                  <div className="c-header d-flex align-items-center">
                                    <div className="comment-meta">
                                      <h5 className="mb-0">
                                        <a href="#" className="tw-capitalize">
                                          {review.name} ,
                                        </a>
                                      </h5>
                                      <div className="c-date">
                                        {formatDate(review.createdAt)}
                                      </div>
                                    </div>
                                    <div className="replay-btn">
                                      <a href="#">
                                        <i className="bi bi-reply" />
                                        Reply
                                      </a>
                                    </div>
                                  </div>
                                  <ul className="product-review">
                                    {Array(review.rating)
                                      .fill(null)
                                      .map((_, idx) => (
                                        <li key={idx}>
                                          <i className="bi bi-star-fill" />
                                        </li>
                                      ))}
                                  </ul>
                                  <div className="c-body">
                                    <p>{review.comment}</p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="comment-form">
                        <div className="number-of-comment">
                          <h3>Leave A Reply</h3>
                        </div>
                        <Form action="review" method="POST">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-inner mb-30">
                                <input
                                  type="text"
                                  placeholder="Name*"
                                  required
                                  name="name"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-inner mb-30">
                                <input
                                  type="email"
                                  placeholder="Email*"
                                  required
                                  name="email"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-inner mb-10">
                                <textarea
                                  placeholder="Message..."
                                  defaultValue={""}
                                  name="message"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-inner2 mb-30">
                                <div className="comment-rate-area">
                                  <p>Your Rating</p>
                                  <div className="rate">
                                    <input
                                      type="radio"
                                      id="star5"
                                      name="rate"
                                      defaultValue={5}
                                    />
                                    <label htmlFor="star5" title="text">
                                      5 stars
                                    </label>
                                    <input
                                      type="radio"
                                      id="star4"
                                      name="rate"
                                      defaultValue={4}
                                    />
                                    <label htmlFor="star4" title="text">
                                      4 stars
                                    </label>
                                    <input
                                      type="radio"
                                      id="star3"
                                      name="rate"
                                      defaultValue={3}
                                    />
                                    <label htmlFor="star3" title="text">
                                      3 stars
                                    </label>
                                    <input
                                      type="radio"
                                      id="star2"
                                      name="rate"
                                      defaultValue={2}
                                    />
                                    <label htmlFor="star2" title="text">
                                      2 stars
                                    </label>
                                    <input
                                      type="radio"
                                      id="star1"
                                      name="rate"
                                      defaultValue={1}
                                    />
                                    <label htmlFor="star1" title="text">
                                      1 star
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-inner two">
                                <button
                                  className="primary-btn btn-lg"
                                  type="submit"
                                >
                                  Post Comment
                                </button>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="related-items-area mb-120">
        <div className="container">
          <div className="row mb-50">
            <div className="col-lg-12">
              <h2 className="item-details-tt">Related Products</h2>
            </div>
          </div>
          <div className="row">
            <Swiper
              {...(relatedproduceSlider as any)}
              className="swiper related-item-sliders"
              autoplay={{
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }}
            >
              <div className="swiper-wrapper">
                {relatedProducts.map((prod, idx) => {
                  const IMAGES = [
                    "h2-food-item-2.png",
                    "h2-food-item-4.png",
                    "h2-food-item-5.png",
                    "h2-food-item-6.png",
                    "h2-food-item-8.png",
                  ];
                  return (
                    <SwiperSlide key={prod.id} className="swiper-slide">
                      <ShopItem product={prod} image={IMAGES[idx]} />
                    </SwiperSlide>
                  );
                })}
              </div>
            </Swiper>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default ShopDetails;
export async function loader({ request, params }: LoaderArgs) {
  const productId = params.id;
  invariant(typeof productId === "string", "Invalid Request");

  const session = await getUserSession(request);
  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: { id: productId },
      include: {
        subMenu: {
          include: {
            menu: true,
          },
        },
        reviews: true,
      },
    });

    if (session) {
      const cartItem = await prisma.cartItem.findFirst({
        where: {
          productId: product.id,
          customer: {
            profileId: session.profileId,
          },
        },
      });
      return { product, cartCount: cartItem?.count };
    }
    return { product };
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}
