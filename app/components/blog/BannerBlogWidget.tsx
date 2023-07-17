import { Link } from "@remix-run/react";

const BannerBlogWidget = () => {
  return (
    <div className="single-widgets widget_sm-banner">
      <img
        className="img-fluid"
        src="/images/blog/blog-sidebar-img.png"
        alt="blog-sidebar-img"
      />
      <div className="overlay d-flex align-items-center justify-content-center">
        <div className="items-content text-center">
          <span>
            <img
              className="left-vec"
              src="/images/icon/shape-white1.svg"
              alt="sub-title-vec"
            />
            Reserve
            <img
              className="right-vec"
              src="/images/icon/shape-white1.svg"
              alt="sub-title-vec"
            />
          </span>
          <h3>
            <Link to="/reservation">For Your Private Event</Link>
          </h3>
          <Link className="primary-btn btn-sm" to="/reservation">
            Book Table
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerBlogWidget;
