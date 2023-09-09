/* eslint-disable jsx-a11y/anchor-is-valid */
import type { Product } from "@prisma/client";
import { Link } from "@remix-run/react";
import { useState, type FC, useEffect, useCallback, useContext } from "react";
import { ClipLoader } from "react-spinners";
import { useTypedFetcher } from "remix-typedjson";
import { CartContext } from "~/context/CartContext";
import type { action } from "~/routes/_main.shop_.$id.add-to-cart";
import MyForm from "../Form/MyForm";

interface Props {
  product: Product;
  image: string;
}

const ShopItem: FC<Props> = ({ product, image }) => {
  const cartContext = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const [selectedPrice, setselectedPrice] = useState("0");

  const fetcher = useTypedFetcher<typeof action>();

  const handleAddToCart = useCallback(() => {
    fetcher.submit(
      {
        price: product.prices[+selectedPrice].value,
      },
      {
        action: `/shop/${product.id}/add-to-cart`,
        method: "POST",
      }
    );
  }, [selectedPrice]);

  const handleUpdateCartState = useCallback((count: number) => {
    cartContext.updateCart(count);
  }, []);

  // useEffect(() => {
  //   if (added) {
  //     const timer = setTimeout(() => {
  //       setAdded(false);
  //     }, 4000);

  //     return () => {
  //       if (timer) {
  //         clearTimeout(timer);
  //       }
  //     };
  //   }
  // }, [added]);

  useEffect(() => {
    if (fetcher.data) {
      setAdded(true);
      handleUpdateCartState(fetcher.data.totalUserCartItems);
    }
  }, [fetcher.data]);

  return (
    <div className="food-items2-wrap">
      <div className="food-img">
        <Link to={`${product.id}`}>
          <img
            className="img-fluid hover:tw-bg-white/20 hover:tw-opacity-90 tw-transition-all tw-duration-200 "
            src={"/images/bg/" + image}
            alt="h2-food-item-1"
          />
        </Link>
        <div className="cart-icon">
          <a
            className="tw-cursor-pointer hover:tw-text-white"
            onClick={handleAddToCart}
          >
            {fetcher.state !== "submitting" && (
              <i className="bi bi-cart-plus" />
            )}
            {fetcher.state === "submitting" && <ClipLoader size={15} />}
            {fetcher.state !== "submitting" && added && (
              <i className="bi bi-check tw-text-lg tw-text-primary"></i>
            )}
          </a>
        </div>
        <div className="pric-tag ">
          <span className="tw-flex">
            <div className="tw-text-xs tw-inline tw-align-middle">ksh</div>
            <div className="tw-inline tw-align-middle">
              {product.prices[+selectedPrice].value}
            </div>
          </span>
        </div>
      </div>
      <div className="food-content">
        <div className="tw-inline-block tw-w-auto">
          {product.prices.length > 1 && (
            <MyForm.Select.Wrapper
              id="price-selector"
              value={selectedPrice}
              onChange={(e) => {
                setselectedPrice(e.target.value);
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
        <ul className="d-flex align-items-center justify-content-center p-0 gap-1">
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
        </ul>
        <h3>
          <Link to={`/shop/${product.id}`} className="tw-capitalize">
            {product.title}
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default ShopItem;
