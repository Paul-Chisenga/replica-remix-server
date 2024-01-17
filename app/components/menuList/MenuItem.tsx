import type { Product } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import { parseProdImageUrl } from "~/utils/helpers";

interface Props {
  product: Product;
}

const MenuItem: FC<Props> = ({ product }) => {
  return (
    <li key={product.id}>
      <div className="item-name">
        <div className="item-img">
          <img
            src={parseProdImageUrl(product.image)}
            alt=""
            style={{ width: 68, height: 68 }}
            className="tw-object-contain"
          />
        </div>
        <div className="content">
          <h3>
            <Link
              to={`/shop/${product.id}`}
              className="tw-text-inherit hover:tw-text-emerald-500 hover:tw-underline"
            >
              {product.title}
            </Link>
          </h3>
          {/* <p>Special Breakfast to make for our customer.</p> */}
          {/* <p>We love food, we want you to love it too</p> */}
          <p>
            {product.description?.slice(0, 40)}
            {product.description && product.description?.length > 40 && "..."}
          </p>
        </div>
      </div>
      <div className="divider">
        <img src="/images/icon/h3-menu-divider.svg" alt="" />
      </div>
      <Link to={`/shop/${product.id}`} className="link">
        <div className="price">
          <span className="tw-relative">
            {product.price}
            {/* <i className="tw-text-xs tw-absolute tw-left-0">ksh</i> */}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default MenuItem;
