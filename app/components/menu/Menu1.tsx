import type { MenuCategory } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import { parseMenuCategory } from "~/utils/helpers";

const menuWithProducst = Prisma.validator<Prisma.MenuArgs>()({
  include: {
    submenu: {
      include: {
        products: true,
      },
    },
  },
});

type MenuWithProducts = Prisma.MenuGetPayload<typeof menuWithProducst>;

interface Props {
  menu: MenuWithProducts[];
  category: MenuCategory;
}

const Menu1: FC<Props> = ({ menu, category }) => {
  return (
    <div className="menu2-area pt-120 mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="menu2-tab mb-70">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {menu.map((item, idx) => (
                  <li key={item.id} className="nav-item" role="presentation">
                    <button
                      className={`nav-link tw-capitalize ${
                        idx === 0 && "active"
                      }`}
                      id={`${item.title}-tab`}
                      data-bs-toggle="tab"
                      data-bs-target={`#${category}${idx}`}
                      type="button"
                      role="tab"
                      aria-controls={item.title}
                      aria-selected="false"
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="tab-content" id="myTabContent">
              {menu.map((item, idx) => (
                <div
                  key={item.id}
                  className={`tab-pane fade  ${idx === 0 && "show active"}`}
                  id={`${category}${idx}`}
                  role="tabpanel"
                  aria-labelledby={`${item.title}-tab`}
                >
                  <div className="row">
                    <div className="col-lg-6 p-0">
                      <div className="menu2-left-img md:tw-max-h-[670px] md:tw-sticky md:tw-top-44 tw-hidden lg:tw-block">
                        <img src="/images/bg/menu2-left-img-01.png" alt="" />
                        <div className="overlay">
                          <div className="vec-left">
                            <img src="/images/icon/menu1-left-vec.svg" alt="" />
                          </div>
                          <div className="vec-right">
                            <img
                              src="/images/icon/menu1-right-vec.svg"
                              alt=""
                            />
                          </div>
                          <h2 className="tw-capitalize">
                            {parseMenuCategory(category)}
                          </h2>
                          <h3 className="tw-capitalize">
                            {item.title}
                            <h4 className="tw-opacity-80">{item.subtitle}</h4>
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 p-0">
                      <div className="menu2-wrap">
                        <div className="menu-title tw-p-0">
                          <h2 className="tw-capitalize m-0 ">{item.title}</h2>
                        </div>
                        {item.subtitle ? (
                          <p className="tw-text-center tw-uppercase">
                            ( {item.subtitle} )
                          </p>
                        ) : (
                          <div className="tw-w-24 tw-h-4 tw-bg-primary tw-mx-auto tw-rounded-tl-md tw-rounded-br-md"></div>
                        )}
                        {item.submenu.map((sub) => (
                          <div key={sub.id} className="tw-mt-10">
                            {item.title !== sub.title && (
                              <h3 className="tw-italic tw-font-jost tw-capitalize tw-text-primary">
                                {sub.title}
                              </h3>
                            )}
                            <ul>
                              {sub.products.map((prod) => (
                                <li key={prod.id}>
                                  <Link
                                    to={`/shop/${prod.id}`}
                                    className="hover:tw-bg-emerald-400/10 hover:tw-px-4 tw-rounded-tl-2xl tw-rounded-br-2xl tw-py-1 tw-transition-all tw-duration-300 tw-block"
                                  >
                                    <div className="single-menu">
                                      <div className="menu-name">
                                        <h4 className="tw-capitalize">
                                          {prod.title}
                                        </h4>
                                        <p className="first-letter:tw-capitalize">
                                          {prod.subtitle}
                                        </p>
                                      </div>
                                      <div className="tw-flex tw-gap-2">
                                        {prod.prices.map((price, idx) => (
                                          <div
                                            key={idx}
                                            className={`price ${
                                              price.value === 0 &&
                                              "tw-invisible"
                                            }`}
                                          >
                                            {price.label !== "std" && (
                                              <div className="tw-text-center tw-text-primary tw-capitalize">
                                                {price.label}
                                              </div>
                                            )}
                                            <span className="tw-relative">
                                              <div className="tw-inline tw-text-sm tw-font-cormorant tw-right-0 -tw-top-3">
                                                ksh
                                              </div>
                                              {price.value}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu1;
