/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import type { LoaderArgs } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import invariant from "invariant";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTypedFetcher, useTypedLoaderData } from "remix-typedjson";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Breadcrumb from "~/components/common/Breadcrumb";
import { getUserSession } from "~/controllers/auth.server";
import prisma from "~/services/prisma.server";
import { parseMenuCategory, parseProdImageUrl } from "~/utils/helpers";
import type { action } from "./_main.shop_.$id.add-to-cart";
import { ClipLoader } from "react-spinners";
import { CartContext } from "~/context/CartContext";
import ProductChoice from "~/components/shop/ProductChoice";
import type { HandledChoices, HandledOptions } from "~/utils/types";
import { SelectedChoice } from "@prisma/client";
import DualRingLoader from "~/components/indicators/DualRingLoader";

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

function parseHandledChoices(
  choices: SelectedChoice[] | undefined
): HandledChoices {
  if (!choices) {
    return {};
  }
  const choicesMap: HandledChoices = {};
  choices.forEach((ch) => {
    const optionsMap: HandledOptions = {};
    ch.options.forEach((opt) => {
      optionsMap[opt.id] = { count: opt.count };
    });

    choicesMap[ch.id] = optionsMap;
  });
  return choicesMap;
}

function ShopDetails() {
  const {
    product,
    cartCount,
    selectedChoices: cartChoices,
  } = useTypedLoaderData<typeof loader>();
  const [handledChoices, setHandledChoices] = useState<HandledChoices>(
    parseHandledChoices(cartChoices)
  );
  const [count, setCount] = useState(cartCount ?? 0);
  const [selectedChoices, setSelectedChoices] = useState<
    SelectedChoice[] | undefined
  >(cartChoices);

  const [hasSelectedRequiredChoices, setHasSelectedRequiredChoices] =
    useState(false);

  const fetcher = useTypedFetcher<typeof action>();
  const cartContext = useContext(CartContext);

  const increment = useCallback(() => {
    if (hasSelectedRequiredChoices) {
      fetcher.submit(
        {
          choices: JSON.stringify(handledChoices),
        },
        {
          action: `add-to-cart`,
          method: "POST",
        }
      );
    } else {
      alert("Select all required options");
    }
  }, [hasSelectedRequiredChoices]);

  const decrement = useCallback(() => {
    if (count > 0) {
      fetcher.submit(null, {
        action: `remove-from-cart`,
        method: "POST",
      });
    }
  }, []);

  const handleChoiceChange = useCallback(
    (selectedChoices: HandledOptions, idx: number) => {
      const cpy = { ...handledChoices };
      const cur = cpy[idx];
      if (cur) {
        Object.entries(selectedChoices).forEach(([optionId, option]) => {
          cur[optionId] = option;
        });
      } else {
        cpy[idx] = selectedChoices;
      }

      setHandledChoices(cpy);
    },
    [handledChoices]
  );

  useEffect(() => {
    if (fetcher.data) {
      cartContext.updateCart(fetcher.data.totalUserCartItems);
      setCount(fetcher.data.totalProductCartItems);
      setSelectedChoices(fetcher.data.choices);
    }
  }, [fetcher.data]);

  useEffect(() => {
    let valid = true;
    const prodChoices = product.choices;
    prodChoices.forEach((ch, idx) => {
      const isValid =
        handledChoices[idx] &&
        ch.requiredOptions ===
          Object.values(handledChoices[idx]).reduce(
            (prev, cur) => prev + cur.count,
            0
          );

      valid &&= isValid;
    });
    setHasSelectedRequiredChoices(valid);
  }, [handledChoices, product.choices]);

  return (
    <>
      <Breadcrumb pageName={product.title} pageTitle={product.title} />
      <div className="shop-details pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-5 gy-5">
            <div className="col-lg-6">
              <div
                className="tab-content tab-content1 tw-block tw-bg-emerald-50"
                id="v-pills-tabContent"
              >
                {product.images.map((image, idx) => (
                  <div
                    key={image.key}
                    className={`tab-pane fade ${idx === 0 && "active show"}`}
                    id={image.key}
                    role="tabpanel"
                    aria-labelledby={`${image.key}-tab`}
                  >
                    <div className="gallery-big-image">
                      <img
                        className="tw-w-full tw-object-cover tw-object-top tw-max-h-[400px] tw-rounded"
                        src={parseProdImageUrl([image])}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="nav nav1 nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                {product.images.length > 1 &&
                  product.images.map((image, idx) => (
                    <button
                      key={image.key}
                      className={`nav-link ${idx === 0 && "active"}`}
                      id={`${image.key}-tab`}
                      data-bs-toggle="pill"
                      data-bs-target={`#${image.key}`}
                      type="button"
                      role="tab"
                      aria-controls={image.key}
                      aria-selected={idx === 0}
                    >
                      <img
                        src={parseProdImageUrl([image])}
                        alt=""
                        style={{ width: 104, height: 104 }}
                      />
                    </button>
                  ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="prod-details-content">
                {/* REVIEWS */}
                {/* <ul className="product-review2 d-flex flex-row align-items-center mb-25">
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
                </ul> */}
                <h2 className="tw-capitalize">{product.title}</h2>
                <div className="price-tag tw-flex tw-items-center tw-gap-2">
                  <h4>
                    <span className="tw-text-sm">ksh</span>
                    <span>{product.price}</span>
                  </h4>
                </div>
                <p className="tw-capitalize">{product.description}</p>
                {product.choices.length > 0 && (
                  <div className=" tw-py-8">
                    {product.choices.map((ch, idx) => (
                      <ProductChoice
                        key={idx}
                        choice={ch}
                        selectedOptions={
                          selectedChoices?.find((slch) => slch.id === "" + idx)
                            ?.options
                        }
                        onChange={(e) => handleChoiceChange(e, idx)}
                      />
                    ))}
                  </div>
                )}
                <div className="prod-quantity d-flex align-items-center justify-content-start mb-20">
                  {count > 0 && (
                    <div className="quantity d-flex align-items-center">
                      <div className="quantity-nav nice-number d-flex align-items-center">
                        <button
                          onClick={decrement}
                          type="button"
                          disabled={
                            fetcher.state === "submitting" ||
                            !hasSelectedRequiredChoices
                          }
                          className="disabled:tw-opacity-50"
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
                          disabled={
                            fetcher.state === "submitting" ||
                            !hasSelectedRequiredChoices
                          }
                          className="disabled:tw-opacity-50"
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                  )}
                  {count <= 0 && (
                    <button
                      type="submit"
                      className="primary-btn3 disabled:tw-opacity-50 "
                      onClick={increment}
                      disabled={
                        fetcher.state === "submitting" ||
                        !hasSelectedRequiredChoices
                      }
                    >
                      <span>Add to cart</span>
                      {fetcher.state === "submitting" && (
                        <DualRingLoader size={15} className="tw-ml-2" />
                      )}
                    </button>
                  )}
                </div>
                <div className="category-tag">
                  <ul>
                    <li>Category:</li>
                    <li>
                      <Link
                        to={`/shop?m=${product.menuItemId}`}
                        className="tw-capitalize"
                      >
                        {product.menuItem.title},
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/shop?mcat=${product.menuItem.category}`}
                        className="tw-capitalize"
                      >
                        {parseMenuCategory(product.menuItem.category)},
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Reviews And Feedback */}
          {/* <div className="row g-4 pt-50">
            <div className="col-lg-12 mb-25">
              <h2 className="item-details-tt"></h2>
              <h2 className="item-details-tt">Product Details</h2>
            </div>
            <div className="row g-4">
              <div className="col-lg-3">
                <div
                  className="nav nav2 nav  nav-pills"
                  id="v-pills-tab2"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
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
                  </button>
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
          </div> */}
        </div>
      </div>
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
        menuItem: true,
        images: true,
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
      return {
        product,
        cartCount: cartItem?.count,
        selectedChoices: cartItem?.choices,
      };
    }
    return { product };
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}
