/* eslint-disable jsx-a11y/anchor-is-valid */
import type { Product } from "@prisma/client";
import { Link } from "@remix-run/react";
import { type FC } from "react";
import { parseProdImageUrl } from "~/utils/helpers";
import LinkButton2 from "../Button/LinkButton2";

interface Props {
  product: Product;
}

const ShopItem: FC<Props> = ({ product }) => {
  return (
    <div className="food-items2-wrap">
      <div className="food-img">
        <Link
          to={`/shop/${product.id}`}
          className="tw-block tw-bg-black/5 tw-rounded-t-md tw-rounded-tr-md sm:tw-h-[316px]"
        >
          <img
            className=" tw-w-full hover:tw-bg-white/20 hover:tw-opacity-90 tw-transition-all tw-duration-200 tw-object-cover tw-object-top"
            src={parseProdImageUrl(product.image)}
            alt=""
            style={{ maxHeight: 316 }}
          />
        </Link>
        <div className="cart-icon">
          <Link to={`/shop/${product.id}`}>
            <i className="bi bi-cart-plus" />
          </Link>
        </div>
        <div className="pric-tag ">
          <span className="tw-flex">
            <div className="tw-text-xs tw-inline tw-align-middle">ksh</div>
            <div className="tw-inline tw-align-middle">{product.price}</div>
          </span>
        </div>
      </div>
      <div className="food-content tw-px-4">
        {/* Reviews */}
        {/* <ul className="d-flex align-items-center justify-content-center p-0 gap-1">
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
        </ul> */}
        <h3>
          <Link to={`/shop/${product.id}`} className="tw-capitalize">
            {product.title}
          </Link>
        </h3>
        <p className="tw-max-w-[90%]">{product.description?.slice(0, 80)}</p>
        <br />
        <LinkButton2 to={`/shop/${product.id}`}>
          <i className="bi bi-cart-plus" />
        </LinkButton2>
      </div>
    </div>
  );
};

export default ShopItem;
