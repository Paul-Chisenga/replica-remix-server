import BannerBlogWidget from "~/components/blog/BannerBlogWidget";
import CategoryBlogWidget from "~/components/blog/CategoryBlogWidget";
import SearchBlogWidget from "~/components/blog/SearchBlogWidget";
import TagBlogWidget from "~/components/blog/TagBlogWidget";
import Breadcrumb from "~/components/common/Breadcrumb";
import PaginatedItems from "~/components/pagination/PaginatedItems";
import ShopNewItem from "~/components/shop/ShopNewItem";

const Shop = () => {
  return (
    <>
      <Breadcrumb pageName="Shop" pageTitle="Shop" />
      <div className="Shop-pages pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-5 gy-5">
            <div className="col-lg-4">
              <div className="widget-area">
                <BannerBlogWidget />
                <SearchBlogWidget />
                <ShopNewItem />
                <CategoryBlogWidget />
                <TagBlogWidget />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="row g-4">
                <PaginatedItems itemsPerPage={8} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
