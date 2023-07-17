import { Link } from "@remix-run/react";

const TagBlogWidget = () => {
  return (
    <div className="single-widgets widget_egns_tag">
      <div className="widget-title">
        <h3>Tag:</h3>
      </div>
      <ul className="wp-block-tag-cloud">
        <li>
          <Link to={"/shop"}>Dinner</Link>
        </li>
        <li>
          <Link to={"/shop"}>Breakfast</Link>
        </li>
        <li>
          <Link to={"/shop"}>Dessert</Link>
        </li>
        <li>
          <Link to={"/shop"}>Beverage</Link>
        </li>
        <li>
          <Link to={"/shop"}>Lunch</Link>
        </li>
        <li>
          <Link to={"/shop"}>Food</Link>
        </li>
        <li>
          <Link to={"/shop"}>Menu</Link>
        </li>
        <li>
          <Link to={"/shop"}>Sea Food</Link>
        </li>
      </ul>
    </div>
  );
};

export default TagBlogWidget;
