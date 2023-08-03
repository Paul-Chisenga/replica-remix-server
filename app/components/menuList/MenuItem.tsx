import type { Product } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { FC } from "react";

interface Props {
  product: Product;
  image: string;
}

const MenuItem: FC<Props> = ({ product, image }) => {
  return (
    <li key={product.id}>
      <div className="item-name">
        <div className="item-img">
          <img src={"/images/bg/" + image} alt="" />
        </div>
        <div className="content">
          <h3>
            <Link
              to={`/shop/${product.id}`}
              className="tw-text-inherit hover:tw-text-emerald-500 hover:tw-underline tw-capitalize"
            >
              {product.title}
            </Link>
          </h3>
          <p>Special Breakfast to make for our customer.</p>
        </div>
      </div>
      <div className="divider">
        <img src="/images/icon/h3-menu-divider.svg" alt="" />
      </div>
      <Link to={`/shop/${product.id}`} className="link">
        <div className="price">
          <span className="tw-relative">
            {product.prices[0]}
            {/* <i className="tw-text-xs tw-absolute tw-left-0">ksh</i> */}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default MenuItem;
