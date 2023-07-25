import { Link } from "@remix-run/react";

const MenuList = () => {
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
            <div className="home3-menu-wrap">
              <div className="left-vector">
                <img
                  src="/images/icon/h3-menu-vec-left.svg"
                  alt="h3-menu-vec-left"
                />
              </div>
              <div className="right-vector">
                <img
                  src="/images/icon/h3-menu-vec-right.svg"
                  alt="h3-menu-vec-right"
                />
              </div>
              <div className="menu-title text-center">
                <h2>Break-fast</h2>
                <img src="/images/icon/h3-menu-tt-bg.svg" alt="h3-menu-tt-bg" />
              </div>
              <ul>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-1.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>
                        <Link
                          to={`/shop/id`}
                          className="tw-text-inherit hover:tw-text-emerald-500 hover:tw-underline"
                        >
                          Breakfast Bar
                        </Link>
                      </h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <Link to={`/shop/id`} className="link">
                    <div className="price">
                      <span>$45</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-2.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Frittata Muffins</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$45</span>
                  </div>
                </li>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-3.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Muffins</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$45</span>
                  </div>
                </li>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-4.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Smoothies</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$45</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="home3-menu-wrap">
              <div className="left-vector">
                <img
                  src="/images/icon/h3-menu-vec-left.svg"
                  alt="h3-menu-vec-left"
                />
              </div>
              <div className="right-vector">
                <img
                  src="/images/icon/h3-menu-vec-right.svg"
                  alt="h3-menu-vec-right"
                />
              </div>
              <div className="menu-title text-center">
                <h2>Lunch</h2>
                <img src="/images/icon/h3-menu-tt-bg.svg" alt="h3-menu-tt-bg" />
              </div>
              <ul>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-5.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Lemon Rice</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$55</span>
                  </div>
                </li>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-6.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Pasta Salad</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$45</span>
                  </div>
                </li>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-7.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Masala Poha</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$40</span>
                  </div>
                </li>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-8.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Mongdal Khichdi</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$48</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="home3-menu-wrap">
              <div className="left-vector">
                <img
                  src="/images/icon/h3-menu-vec-left.svg"
                  alt="h3-menu-vec-left"
                />
              </div>
              <div className="right-vector">
                <img
                  src="/images/icon/h3-menu-vec-right.svg"
                  alt="h3-menu-vec-right"
                />
              </div>
              <div className="menu-title text-center">
                <h2>Dinner</h2>
                <img src="/images/icon/h3-menu-tt-bg.svg" alt="h3-menu-tt-bg" />
              </div>
              <ul>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-9.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Burgers or Hotdogs</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$25</span>
                  </div>
                </li>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-10.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Meatballs and Rice</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$35</span>
                  </div>
                </li>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-11.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Stir fry</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$55</span>
                  </div>
                </li>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-12.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Quesadillas</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$45</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="home3-menu-wrap">
              <div className="left-vector">
                <img
                  src="/images/icon/h3-menu-vec-left.svg"
                  alt="h3-menu-vec-left"
                />
              </div>
              <div className="right-vector">
                <img
                  src="/images/icon/h3-menu-vec-right.svg"
                  alt="h3-menu-vec-right"
                />
              </div>
              <div className="menu-title text-center">
                <h2>Beverage</h2>
                <img src="/images/icon/h3-menu-tt-bg.svg" alt="h3-menu-tt-bg" />
              </div>
              <ul>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-13.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Sparkling Drinks</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$65</span>
                  </div>
                </li>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-14.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Milkshakes</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$25</span>
                  </div>
                </li>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-15.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Energy Drink</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$15</span>
                  </div>
                </li>
                <li>
                  <div className="item-name">
                    <div className="item-img">
                      <img src="/images/bg/h3-menu-food-16.png" alt="" />
                    </div>
                    <div className="content">
                      <h3>Coffee</h3>
                      <p>Special Breakfast to make for our customer.</p>
                    </div>
                  </div>
                  <div className="divider">
                    <img src="/images/icon/h3-menu-divider.svg" alt="" />
                  </div>
                  <div className="price">
                    <span>$20</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
