import type { Product } from "@prisma/client";
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
              images={[
                "h3-menu-food-1.png",
                "h3-menu-food-2.png",
                "h3-menu-food-3.png",
                "h3-menu-food-4.png",
              ]}
              page="/menu/breakfast"
            />
          </div>
          <div className="col-lg-6">
            <Menu
              title="Lunch/Dinner"
              products={lunchDinner}
              images={[
                "h3-menu-food-5.png",
                "h3-menu-food-6.png",
                "h3-menu-food-7.png",
                "h3-menu-food-8.png",
              ]}
              page="/menu/lunch-dinner"
            />
          </div>
          <div className="col-lg-6">
            <Menu
              title="Bakery"
              products={bakery}
              images={[
                "h3-menu-food-9.png",
                "h3-menu-food-10.png",
                "h3-menu-food-11.png",
                "h3-menu-food-12.png",
              ]}
              page="/menu/bakery"
            />
          </div>
          <div className="col-lg-6">
            <Menu
              title="Beverage"
              products={beverages}
              images={[
                "h3-menu-food-13.png",
                "h3-menu-food-14.png",
                "h3-menu-food-15.png",
                "h3-menu-food-16.png",
              ]}
              page="/menu/beverages"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
