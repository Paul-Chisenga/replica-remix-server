/* eslint-disable jsx-a11y/anchor-is-valid */
import type { Prisma } from "@prisma/client";
import { MenuCategory } from "@prisma/client";
import { type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { Form, Link, useNavigate, useSearchParams } from "@remix-run/react";
import ReactPaginate from "react-paginate";
import { useTypedLoaderData } from "remix-typedjson";
import BannerBlogWidget from "~/components/blog/BannerBlogWidget";
import Breadcrumb from "~/components/common/Breadcrumb";
import CategoryItem from "~/components/shop/CategoryItem";
import ShopItem from "~/components/shop/ShopItem";
import prisma from "~/services/prisma.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Shopping - Replica restaurant" },
    {
      name: "description",
      content: "Find healthy and awesome food at replica!",
    },
  ];
};

const Shop = () => {
  const {
    breakfastCount,
    lunchCount,
    bakeryCount,
    beverageCount,
    menuList,
    products,
    count,
  } = useTypedLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const { mcat, m, sm, s } = Object.fromEntries(searchParams);

  const navigate = useNavigate();

  return (
    <>
      <Breadcrumb pageName="Shop" pageTitle="Shop" />
      <div className="Shop-pages pt-120 mb-120">
        <div className="container">
          <div className="row g-lg-5 gy-5">
            <div className="col-lg-4">
              <div className="widget-area">
                <BannerBlogWidget />
                <div className="single-widgets widget_search">
                  <Form action="" method="GET">
                    <div className="wp-block-search__inside-wrapper ">
                      <input
                        type="search"
                        id="wp-block-search__input-1"
                        className="wp-block-search__input"
                        name="s"
                        placeholder="Search..."
                      />
                      <button type="submit" className="wp-block-search__button">
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.10227 0.0713005C1.983 0.760967 -1.22002 5.91264 0.44166 10.7773C1.13596 12.8 2.60323 14.471 4.55652 15.4476C6.38483 16.3595 8.59269 16.5354 10.5737 15.9151C11.4023 15.6559 12.6011 15.0218 13.2121 14.5126L13.3509 14.3969L16.1281 17.1695C19.1413 20.1735 18.9932 20.0531 19.4237 19.9698C19.6505 19.9281 19.9282 19.6504 19.9699 19.4236C20.0532 18.9932 20.1735 19.1413 17.1695 16.128L14.397 13.3509L14.5127 13.212C14.7858 12.8834 15.2394 12.152 15.4755 11.6614C17.0029 8.48153 16.3271 4.74159 13.7814 2.28379C11.9994 0.561935 9.52304 -0.257332 7.10227 0.0713005ZM9.38418 1.59412C11.0135 1.9135 12.4669 2.82534 13.4666 4.15376C14.0591 4.94062 14.4572 5.82469 14.6793 6.83836C14.8136 7.44471 14.8228 8.75925 14.7025 9.34708C14.3507 11.055 13.4713 12.4622 12.1336 13.4666C11.3467 14.059 10.4627 14.4571 9.44898 14.6793C8.80097 14.8228 7.48644 14.8228 6.83843 14.6793C4.78332 14.2303 3.0985 12.9389 2.20054 11.1337C1.75156 10.2312 1.54328 9.43503 1.49699 8.4445C1.36276 5.62566 3.01055 3.05677 5.6535 1.96904C6.10248 1.7839 6.8014 1.59412 7.28741 1.52932C7.74102 1.46452 8.92595 1.50155 9.38418 1.59412Z" />
                        </svg>
                      </button>
                    </div>
                  </Form>
                </div>
                <div className="single-widgets widget_egns_categoris">
                  <div className="widget-title">
                    <h3>Category:</h3>
                  </div>
                  <ul className="wp-block-categoris-cloud">
                    <li>
                      <CategoryItem
                        to={`?mcat=${MenuCategory.BREAKFAST}`}
                        mCategory={MenuCategory.BREAKFAST}
                        curQuery={mcat as any}
                        count={breakfastCount}
                      />
                    </li>
                    <li>
                      <CategoryItem
                        to={`?mcat=${MenuCategory.FOOD}`}
                        mCategory={MenuCategory.FOOD}
                        curQuery={mcat as any}
                        count={lunchCount}
                      />
                    </li>
                    <li>
                      <CategoryItem
                        to={`?mcat=${MenuCategory.BAKERY}`}
                        mCategory={MenuCategory.BAKERY}
                        curQuery={mcat as any}
                        count={bakeryCount}
                      />
                    </li>
                    <li>
                      <CategoryItem
                        to={`?mcat=${MenuCategory.BEVERAGE}`}
                        mCategory={MenuCategory.BEVERAGE}
                        curQuery={mcat as any}
                        count={beverageCount}
                      />
                    </li>
                  </ul>
                </div>
                {/* <TagBlogWidget /> */}
                <div className="single-widgets widget_egns_tag">
                  <div className="widget-title">
                    <h3>Tag:</h3>
                  </div>
                  <ul className="wp-block-tag-cloud">
                    {menuList.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={`?m=${item.id}#products`}
                          className={`tw-capitalize ${
                            m &&
                            m === item.id &&
                            "tw-text-primary tw-border-primary border"
                          }`}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8" id="products">
              <div className="row g-4">
                {products.map((prod, idx) => (
                  <div className="col-md-6 col-sm-6" key={prod.id}>
                    <ShopItem product={prod} />
                  </div>
                ))}
              </div>
              <ReactPaginate
                breakLabel="..."
                nextLabel={<i className="bi bi-arrow-right" />}
                onPageChange={(e) => {
                  if (e.selected < 0) {
                    return;
                  }
                  let url = `?page=${e.selected}`;
                  if (mcat) {
                    url += `&mcat=${mcat}`;
                  }
                  if (m) {
                    url += `&m=${m}`;
                  }
                  if (sm) {
                    url += `&sm=${sm}`;
                  }
                  if (s) {
                    url += `&s=${s}`;
                  }
                  navigate(url + "#products");
                }}
                pageRangeDisplayed={2}
                pageCount={Math.ceil(count / 8)}
                previousLabel={<i className="bi bi-arrow-left" />}
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;

export async function loader({ request }: LoaderArgs) {
  const searchParams = new URL(request.url).searchParams;
  const { m, mcat, s } = Object.fromEntries(searchParams);
  const pageNumber = searchParams.get("page");
  const page = pageNumber ? +pageNumber : 0;
  try {
    const productWhere: Prisma.ProductWhereInput = {
      title: { contains: s, mode: "insensitive" },
      menuItem: {
        id: m,
        category: mcat as any,
      },
    };
    const count = await prisma.product.count({ where: productWhere });
    const products = await prisma.product.findMany({
      where: productWhere,
      skip: page * 8,
      take: 8,
    });
    // AGGREGATES
    /* By menu category */
    const breakfastCount = await prisma.product.count({
      where: {
        menuItem: {
          category: MenuCategory.BREAKFAST,
        },
      },
    });
    const lunchCount = await prisma.product.count({
      where: {
        menuItem: {
          category: MenuCategory.FOOD,
        },
      },
    });

    const bakeryCount = await prisma.product.count({
      where: {
        menuItem: {
          category: MenuCategory.BAKERY,
        },
      },
    });
    const beverageCount = await prisma.product.count({
      where: {
        menuItem: {
          category: MenuCategory.BEVERAGE,
        },
      },
    });
    /* All menu */
    const menuList = await prisma.menuItem.findMany({
      select: {
        id: true,
        title: true,
      },
    });
    return {
      products,
      count,
      breakfastCount,
      lunchCount,
      bakeryCount,
      beverageCount,
      menuList,
    };
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}
