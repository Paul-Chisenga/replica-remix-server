import type { MenuCategory } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import { parseMenuCategory } from "~/utils/helpers";

interface Props {
  count: number;
  mCategory: MenuCategory;
  to: string;
  curQuery: MenuCategory;
}

const CategoryItem: FC<Props> = ({ count, mCategory, to, curQuery }) => {
  return (
    <Link to={to + "#products"}>
      <span
        className={`tag-name tw-capitalize ${
          curQuery && curQuery === mCategory && "tw-text-primary"
        }`}
      >
        {parseMenuCategory(mCategory)}
      </span>
      <img
        className="img-fluid"
        src="/images/blog/category-divider.png"
        alt=""
      />
      <span className="qty">{count}</span>
    </Link>
  );
};

export default CategoryItem;
