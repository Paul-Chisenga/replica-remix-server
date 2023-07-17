import Breadcrumb from "~/components/common/Breadcrumb";

const SuperMenu = () => {
  return (
    <>
      <Breadcrumb pageName="Super Menu" pageTitle="Super Menu List" />
      <div className="menu2-area pt-120 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="menu2-tab mb-70">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="breakfast-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#breakfast"
                      type="button"
                      role="tab"
                      aria-controls="breakfast"
                      aria-selected="true"
                    >
                      Breakfast
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="lunch-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#lunch"
                      type="button"
                      role="tab"
                      aria-controls="lunch"
                      aria-selected="false"
                    >
                      Lunch
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="dinner-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#dinner"
                      type="button"
                      role="tab"
                      aria-controls="dinner"
                      aria-selected="false"
                    >
                      Dinner
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="starter-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#starter"
                      type="button"
                      role="tab"
                      aria-controls="starter"
                      aria-selected="false"
                    >
                      Starter
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="beverage-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#beverage"
                      type="button"
                      role="tab"
                      aria-controls="beverage"
                      aria-selected="false"
                    >
                      Berverage
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="wines-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#wines"
                      type="button"
                      role="tab"
                      aria-controls="wines"
                      aria-selected="false"
                    >
                      Wines
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="apitizer-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#apitizer"
                      type="button"
                      role="tab"
                      aria-controls="apitizer"
                      aria-selected="false"
                    >
                      Apitizer
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="breakfast"
                  role="tabpanel"
                  aria-labelledby="breakfast-tab"
                >
                  <div className="row">
                    <div className="col-lg-6 p-0">
                      <div className="menu2-left-img">
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
                          <span>Friday Offer</span>
                          <h2>
                            20% <span>Discount</span>
                          </h2>
                          <h3>Our Breakfast Menu</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 p-0">
                      <div className="menu2-wrap">
                        <div className="menu-title">
                          <h2>Breakfast</h2>
                        </div>
                        <ul>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Veggie Burgers</h4>
                                <p>
                                  It has survived not only five centuries the
                                  leap need.
                                </p>
                              </div>
                              <div className="price">
                                <span>$80</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Sweet Peppers</h4>
                                <p>
                                  It has survived not only five centuries, but
                                  also the electronic.
                                </p>
                              </div>
                              <div className="price">
                                <span>$40</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Ricotta Cheese</h4>
                                <p>
                                  It has survived not only five centuries also
                                  the leap know.
                                </p>
                              </div>
                              <div className="price">
                                <span>$60</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Black Beans</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$50</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Special Kabab</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$40</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="lunch"
                  role="tabpanel"
                  aria-labelledby="lunch-tab"
                >
                  <div className="row">
                    <div className="col-lg-6 p-0">
                      <div className="menu2-left-img">
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
                          <span>Friday Offer</span>
                          <h2>
                            15% <span>Discount</span>
                          </h2>
                          <h3>Our Lunch Menu</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 p-0">
                      <div className="menu2-wrap">
                        <div className="menu-title">
                          <h2>Lunch</h2>
                        </div>
                        <ul>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Lemon rice</h4>
                                <p>
                                  It has survived not only five centuries the
                                  leap need.
                                </p>
                              </div>
                              <div className="price">
                                <span>$66</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Pasta salad.</h4>
                                <p>
                                  It has survived not only five centuries, but
                                  also the electronic.
                                </p>
                              </div>
                              <div className="price">
                                <span>$22</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Masala poha.</h4>
                                <p>
                                  It has survived not only five centuries also
                                  the leap know.
                                </p>
                              </div>
                              <div className="price">
                                <span>$40</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Methi parantha</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$30</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Moong dal khichd</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$40</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="dinner"
                  role="tabpanel"
                  aria-labelledby="dinner-tab"
                >
                  <div className="row">
                    <div className="col-lg-6 p-0">
                      <div className="menu2-left-img">
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
                          <span>Friday Offer</span>
                          <h2>
                            25% <span>Discount</span>
                          </h2>
                          <h3>Our Dinner Menu</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 p-0">
                      <div className="menu2-wrap">
                        <div className="menu-title">
                          <h2>Dinner</h2>
                        </div>
                        <ul>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Lemon Chicken</h4>
                                <p>
                                  It has survived not only five centuries the
                                  leap need.
                                </p>
                              </div>
                              <div className="price">
                                <span>$80</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Chettinad Fish Fry</h4>
                                <p>
                                  It has survived not only five centuries, but
                                  also the electronic.
                                </p>
                              </div>
                              <div className="price">
                                <span>$40</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Dum Aloo Lakhnawi</h4>
                                <p>
                                  It has survived not only five centuries also
                                  the leap know.
                                </p>
                              </div>
                              <div className="price">
                                <span>$60</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Keema Biryani</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$50</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Shahi Egg Curry</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$40</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="starter"
                  role="tabpanel"
                  aria-labelledby="starter-tab"
                >
                  <div className="row">
                    <div className="col-lg-6 p-0">
                      <div className="menu2-left-img">
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
                          <span>Friday Offer</span>
                          <h2>
                            30% <span>Discount</span>
                          </h2>
                          <h3>Our Starter Menu</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 p-0">
                      <div className="menu2-wrap">
                        <div className="menu-title">
                          <h2>Starter</h2>
                        </div>
                        <ul>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Bandage Cutlets</h4>
                                <p>
                                  It has survived not only five centuries the
                                  leap need.
                                </p>
                              </div>
                              <div className="price">
                                <span>$25</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Crispy Corn</h4>
                                <p>
                                  It has survived not only five centuries, but
                                  also the electronic.
                                </p>
                              </div>
                              <div className="price">
                                <span>$20</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Veg Momos</h4>
                                <p>
                                  It has survived not only five centuries also
                                  the leap know.
                                </p>
                              </div>
                              <div className="price">
                                <span>$17</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Bhara Kabab</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$45</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Moong Dal Bhel</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$24</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="beverage"
                  role="tabpanel"
                  aria-labelledby="beverage-tab"
                >
                  <div className="row">
                    <div className="col-lg-6 p-0">
                      <div className="menu2-left-img">
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
                          <span>Friday Offer</span>
                          <h2>
                            20% <span>Discount</span>
                          </h2>
                          <h3>Our Berverage Menu</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 p-0">
                      <div className="menu2-wrap">
                        <div className="menu-title">
                          <h2>Beverage</h2>
                        </div>
                        <ul>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Coffee</h4>
                                <p>
                                  It has survived not only five centuries the
                                  leap need.
                                </p>
                              </div>
                              <div className="price">
                                <span>$12</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Sparkling drinks</h4>
                                <p>
                                  It has survived not only five centuries, but
                                  also the electronic.
                                </p>
                              </div>
                              <div className="price">
                                <span>$15</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Lemon Juices</h4>
                                <p>
                                  It has survived not only five centuries also
                                  the leap know.
                                </p>
                              </div>
                              <div className="price">
                                <span>$15</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Milkshakes</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$22</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Tonic Water</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$18</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="wines"
                  role="tabpanel"
                  aria-labelledby="wines-tab"
                >
                  <div className="row">
                    <div className="col-lg-6 p-0">
                      <div className="menu2-left-img">
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
                          <span>Friday Offer</span>
                          <h2>
                            20% <span>Discount</span>
                          </h2>
                          <h3>Our Wines Menu</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 p-0">
                      <div className="menu2-wrap">
                        <div className="menu-title">
                          <h2>Wines</h2>
                        </div>
                        <ul>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Shiraz (Syrah)</h4>
                                <p>
                                  It has survived not only five centuries the
                                  leap need.
                                </p>
                              </div>
                              <div className="price">
                                <span>$20</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Malbec</h4>
                                <p>
                                  It has survived not only five centuries, but
                                  also the electronic.
                                </p>
                              </div>
                              <div className="price">
                                <span>$24</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Merlot</h4>
                                <p>
                                  It has survived not only five centuries also
                                  the leap know.
                                </p>
                              </div>
                              <div className="price">
                                <span>$17</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Red Zinfandal</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$38</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Pinot Noir</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$30</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="apitizer"
                  role="tabpanel"
                  aria-labelledby="apitizer-tab"
                >
                  <div className="row">
                    <div className="col-lg-6 p-0">
                      <div className="menu2-left-img">
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
                          <span>Friday Offer</span>
                          <h2>
                            20% <span>Discount</span>
                          </h2>
                          <h3>Our Apitizer Menu</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 p-0">
                      <div className="menu2-wrap">
                        <div className="menu-title">
                          <h2>Apitizer</h2>
                        </div>
                        <ul>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Fruit Charcuterie</h4>
                                <p>
                                  It has survived not only five centuries the
                                  leap need.
                                </p>
                              </div>
                              <div className="price">
                                <span>$80</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Hot Spinach Artichoke Dip</h4>
                                <p>
                                  It has survived not only five centuries, but
                                  also the electronic.
                                </p>
                              </div>
                              <div className="price">
                                <span>$40</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Bean Dip</h4>
                                <p>
                                  It has survived not only five centuries also
                                  the leap know.
                                </p>
                              </div>
                              <div className="price">
                                <span>$60</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Buffalo Chicken Dip</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$50</span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="single-menu">
                              <div className="menu-name">
                                <h4>Creamy Artichoke Dip</h4>
                                <p>It has survived not only five centuries.</p>
                              </div>
                              <div className="price">
                                <span>$40</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperMenu;
