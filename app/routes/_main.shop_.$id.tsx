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
import { CartContext } from "~/context/CartContext";
import ProductChoice from "~/components/shop/ProductChoice";
import type { HandledChoices, HandledOptions } from "~/utils/types";
import type { SelectedChoice } from "@prisma/client";
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
                className="tab-content tab-content1 tw-p-0 tw-block tw-bg-transparent"
                id="v-pills-tabContent"
              >
                <div
                  className="tab-pane fade active show"
                  id={product.image ?? "image"}
                  role="tabpanel"
                  aria-labelledby={`${product.image ?? "image"}-tab`}
                >
                  <div className="gallery-big-image">
                    <img
                      className="tw-w-full tw-object-cover tw-object-top  tw-rounded tw-shadow-lg tw-shadow-emerald-50"
                      src={parseProdImageUrl(product.image)}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div
                className="nav nav1 nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                {product.image && (
                  <button
                    className={"nav-link active tw-hidden"}
                    id={`${product.image}-tab`}
                    data-bs-toggle="pill"
                    data-bs-target={`#${product.image}`}
                    type="button"
                    role="tab"
                    aria-controls={product.image}
                    aria-selected={true}
                  >
                    <img
                      src={parseProdImageUrl(product.image)}
                      alt=""
                      style={{ width: 104, height: 104 }}
                    />
                  </button>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="prod-details-content">
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
                            <DualRingLoader size={15} />
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
