import { MenuCategory, Product } from "@prisma/client";
import type { FC } from "react";
import Menu from "./Menu";

interface Props {
  products: {
    breakfast: Product[];
    lunchDinner: Product[];
    bakery: Product[];
    beverages: Product[];
  };
}

const MenuList: FC<Props> = ({
  products: { bakery, beverages, breakfast, lunchDinner },
}) => {
  return (
    <div className="h3-menu-area mb-240">
      <div className="container">
        <div className="row justify-content-center mb-45">
          <div className="col-lg-8">
            <div className="section-title3 text-center">
              <span>
                <img
                  className="left-vec"
                  src="/images/icon/h3-sub-title-vec.svg"
                  alt=""
                />
                Menu List
                <img
                  className="right-vec"
                  src="/images/icon/h3-sub-title-vec.svg"
                  alt=""
                />
              </span>
              <h2>Our Menu</h2>
            </div>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-lg-6">
            <Menu
              title="Break-fast"
              products={breakfast}
              page={`/shop?mcat=${MenuCategory.BREAKFAST}`}
            />
          </div>
          <div className="col-lg-6">
            <Menu
              title="Lunch/Dinner"
              products={lunchDinner}
              page={`/shop?mcat=${MenuCategory.FOOD}`}
            />
          </div>
          <div className="col-lg-6">
            <Menu
              title="Bakery"
              products={bakery}
              page={`/shop?mcat=${MenuCategory.BAKERY}`}
            />
          </div>
          <div className="col-lg-6">
            <Menu
              title="Beverage"
              products={beverages}
              page={`/shop?mcat=${MenuCategory.BEVERAGE}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
