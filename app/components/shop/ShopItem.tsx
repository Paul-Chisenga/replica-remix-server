/* eslint-disable jsx-a11y/anchor-is-valid */
import type { Product } from "@prisma/client";
import { Link } from "@remix-run/react";
import { useState, type FC, useEffect, useCallback, useContext } from "react";
import { ClipLoader } from "react-spinners";
import { useTypedFetcher } from "remix-typedjson";
import { CartContext } from "~/context/CartContext";
import type { action } from "~/routes/_main.shop_.$id.add-to-cart";

interface Props {
  product: Product;
  image: string;
}

const ShopItem: FC<Props> = ({ product, image }) => {
  const cartContext = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const fetcher = useTypedFetcher<typeof action>();

  const handleAddToCart = () => {
    fetcher.submit(
      {},
      {
        action: `/shop/${product.id}/add-to-cart`,
        method: "POST",
      }
    );
  };

  const handleUpdateCartState = useCallback((count: number) => {
    cartContext.updateCart(count);
  }, []);

  useEffect(() => {
    if (added) {
      const timer = setTimeout(() => {
        setAdded(false);
      }, 4000);

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [added]);

  useEffect(() => {
    if (fetcher.data) {
      setAdded(true);
      handleUpdateCartState(fetcher.data.totalUserCartItems);
    }
  }, [fetcher.data]);

  return (
    <div className="food-items2-wrap">
      <div className="food-img">
        <img
          className="img-fluid"
          src={"/images/bg/" + image}
          alt="h2-food-item-1"
        />
        <div className="cart-icon">
          <a
            className="tw-cursor-pointer hover:tw-text-white"
            onClick={handleAddToCart}
          >
            {!added && fetcher.state !== "submitting" && (
              <i className="bi bi-cart-plus" />
            )}
            {added && <i className="bi bi-check tw-text-lg"></i>}
            {fetcher.state === "submitting" && <ClipLoader size={15} />}
          </a>
        </div>
        <div className="pric-tag">
          <span>
            <div className="tw-text-xs tw-inline">ksh</div>
            {product.prices[0]}
          </span>
        </div>
      </div>
      <div className="food-content">
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
