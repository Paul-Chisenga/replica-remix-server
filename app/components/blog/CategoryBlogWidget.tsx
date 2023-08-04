import { MenuCategory } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import { parseMenuCategory } from "~/utils/helpers";

interface Props {
  breakfast: number;
  lunch: number;
  bakery: number;
  beverage: number;
}

const CatItem: FC<{ count: number; title: string; to: string }> = ({
  count,
  title,
  to,
}) => {
  return (
    <Link to={to}>
      <span className="tag-name tw-capitalize">{title}</span>
      <img
        className="img-fluid"
        src="/images/blog/category-divider.png"
        alt=""
      />
      <span className="qty">{count}</span>
    </Link>
  );
};

const CategoryBlogWidget: FC<Props> = ({
  breakfast,
  lunch,
  bakery,
  beverage,
}) => {
  return (
    <div className="single-widgets widget_egns_categoris">
      <div className="widget-title">
        <h3>Category:</h3>
      </div>
      <ul className="wp-block-categoris-cloud">
        <li>
          <CatItem
            to={`?mcat=${MenuCategory.BREAKFAST}`}
            title={parseMenuCategory(MenuCategory.BREAKFAST)}
            count={breakfast}
          />
        </li>
        <li>
          <CatItem
            to={`?mcat=${MenuCategory.FOOD}`}
            title={parseMenuCategory(MenuCategory.FOOD)}
            count={lunch}
          />
        </li>
        <li>
          <CatItem
            to={`?mcat=${MenuCategory.BAKERY}`}
            title={parseMenuCategory(MenuCategory.BAKERY)}
            count={bakery}
          />
        </li>
        <li>
          <CatItem
            to={`?mcat=${MenuCategory.BEVARAGE}`}
            title={parseMenuCategory(MenuCategory.BEVARAGE)}
            count={beverage}
          />
        </li>
      </ul>
    </div>
  );
};

export default CategoryBlogWidget;
