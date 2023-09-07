/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "@remix-run/react";
import { useState, type FC, useEffect } from "react";
import MyForm from "../Form/MyForm";
import useCartContext from "~/hooks/useCartContext";
import type { ProductWithPics } from "~/context/CartContext";

interface Props {
  product: ProductWithPics;
  image: string;
}

const ShopItem: FC<Props> = ({ product, image }) => {
  const cartContext = useCartContext();
  const [added, setAdded] = useState(false);
  const [selectedPrice, setselectedPrice] = useState("0");

  const handleAddToCart = () => {
    cartContext.increment(product, product.prices[+selectedPrice].value);
  };

  // if cart has item
  useEffect(() => {
    const itemIdx = cartContext.items.findIndex(
      (it) => it.product.id === product.id
    );
    if (itemIdx > -1) {
      setAdded(true);
    }
  }, [cartContext.items, product.id]);

  // const handleAddToCart = () => {
  //   fetcher.submit(
  //     {},
  //     {
  //       action: `/shop/${product.id}/add-to-cart`,
  //       method: "POST",
  //     }
  //   );
  // };

  // const handleUpdateCartState = useCallback((count: number) => {
  //   cartContext.updateCart(count);
  // }, []);

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

  // useEffect(() => {
  //   if (fetcher.data) {
  //     setAdded(true);
  //     handleUpdateCartState(fetcher.data.totalUserCartItems);
  //   }
  // }, [fetcher.data]);

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
            {/* {!added && fetcher.state !== "submitting" && (
              <i className="bi bi-cart-plus" />
            )}
            {added && <i className="bi bi-check tw-text-lg"></i>}
            {fetcher.state === "submitting" && <ClipLoader size={15} />} */}
            <i className="bi bi-cart-plus" />
            {added && (
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
