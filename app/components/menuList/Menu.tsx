import type { FC } from "react";
import MenuItem from "./MenuItem";
import LinkButton3 from "../Button/LinkButton3";
import type { Product } from "@prisma/client";

interface Props {
  title: string;
  products: Product[];
  page: string;
}

const Menu: FC<Props> = ({ title, products, page }) => {
  return (
    <div className="home3-menu-wrap">
      <div className="left-vector">
        <img src="/images/icon/h3-menu-vec-left.svg" alt="h3-menu-vec-left" />
      </div>
      <div className="right-vector">
        <img src="/images/icon/h3-menu-vec-right.svg" alt="h3-menu-vec-right" />
      </div>
      <div className="menu-title text-center">
        <h2>{title}</h2>
        <img src="/images/icon/h3-menu-tt-bg.svg" alt="h3-menu-tt-bg" />
      </div>
      <ul>
        {products.map((prod) => (
          <MenuItem key={prod.id} product={prod} />
        ))}
      </ul>

      <div className="tw-flex tw-justify-center tw-mt-10">
        <LinkButton3 to={page}>Go to menu</LinkButton3>
      </div>
    </div>
  );
};

export default Menu;
