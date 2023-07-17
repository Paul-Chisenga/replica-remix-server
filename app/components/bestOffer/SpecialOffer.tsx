import { Link } from "@remix-run/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Navigation, Autoplay, Pagination, EffectFade]);

const SpecialOffer = () => {
  const offerSlider = {
    slidesPerView: 1,
    // spaceBetween: 15,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 1500,
    autoplay: {
      delay: 2000,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination-i",
      clickable: true,
    },
  };
  return (
    <div className="h3-spacial-offer-area mb-120 ">
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
                Special Combo Offer
                <img
                  className="right-vec"
                  src="/images/icon/h3-sub-title-vec.svg"
                  alt=""
                />
              </span>
              <h2>Special Combo Offer</h2>
            </div>
          </div>
        </div>
        <div className="row mb-40">
          <Swiper
            {...(offerSlider as any)}
            className="swiper h3-spacial-offer-slider"
          >
            <div className="swiper-wrapper">
              <SwiperSlide className="swiper-slide">
                <div className="row position-relative g-lg-5 g-4">
                  <div className="divider" />
                  <div className="col-lg-6">
                    <div className="single-offer-card">
                      <div className="offer-img">
                        <img
                          src="/images/bg/h3-special-01.png"
                          alt="h3-special-01"
                        />
                        <div className="sm-img">
                          <img
                            src="/images/bg/h3-special-01-sm.png"
                            alt="h3-special-01-sm"
                          />
                        </div>
                      </div>
                      <div className="offer-content">
                        <div className="price-sl">
                          <div className="price-tag">
                            <span>
                              $60 <del>$75</del>
                            </span>
                          </div>
                          <div className="sl-no">
                            <span>01</span>
                          </div>
                        </div>
                        <h3>
                          <Link to="/shop-details">Chicken with Drinks.</Link>
                        </h3>
                        <p>
                          It’s so tasty and delicious for creating our customer.
                          So visit our restaurant.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-lg-end">
                    <div className="single-offer-card">
                      <div className="offer-img">
                        <img
                          src="/images/bg/h3-special-02.png"
                          alt="h3-special-01"
                        />
                        <div className="sm-img">
                          <img
                            src="/images/bg/h3-special-02-sm.png"
                            alt="h3-special-01-sm"
                          />
                        </div>
                      </div>
                      <div className="offer-content">
                        <div className="price-sl">
                          <div className="price-tag">
                            <span>
                              $40 <del>$55</del>
                            </span>
                          </div>
                          <div className="sl-no">
                            <span>02</span>
                          </div>
                        </div>
                        <h3>
                          <Link to="/shop-details">Burger with Drinks.</Link>
                        </h3>
                        <p>
                          It’s so tasty and delicious for creating our customer.
                          So visit our restaurant.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="single-offer-card">
                      <div className="offer-img">
                        <img
                          src="/images/bg/h3-special-03.png"
                          alt="h3-special-03"
                        />
                        <div className="sm-img">
                          <img
                            src="/images/bg/h3-special-03-sm.png"
                            alt="h3-special-03-sm"
                          />
                        </div>
                      </div>
                      <div className="offer-content">
                        <div className="price-sl">
                          <div className="price-tag">
                            <span>
                              $90 <del>$95</del>
                            </span>
                          </div>
                          <div className="sl-no">
                            <span>03</span>
                          </div>
                        </div>
                        <h3>
                          <Link to="/shop-details">Soup with Kabab.</Link>
                        </h3>
                        <p>
                          It’s so tasty and delicious for creating our customer.
                          So visit our restaurant.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-lg-end">
                    <div className="single-offer-card">
                      <div className="offer-img">
                        <img
                          src="/images/bg/h3-special-04.png"
                          alt="h3-special-04"
                        />
                        <div className="sm-img">
                          <img
                            src="/images/bg/h3-special-04-sm.png"
                            alt="h3-special-04-sm"
                          />
                        </div>
                      </div>
                      <div className="offer-content">
                        <div className="price-sl">
                          <div className="price-tag">
                            <span>
                              $75 <del>$85</del>
                            </span>
                          </div>
                          <div className="sl-no">
                            <span>04</span>
                          </div>
                        </div>
                        <h3>
                          <Link to="/shop-details">Pizza with Pasta.</Link>
                        </h3>
                        <p>
                          It’s so tasty and delicious for creating our customer.
                          So visit our restaurant.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="row position-relative g-lg-5 g-4">
                  <div className="divider" />
                  <div className="col-lg-6">
                    <div className="single-offer-card">
                      <div className="offer-img">
                        <img
                          src="/images/bg/h3-special-05.png"
                          alt="h3-special-01"
                        />
                        <div className="sm-img">
                          <img
                            src="/images/bg/h3-special-01-sm.png"
                            alt="h3-special-01-sm"
                          />
                        </div>
                      </div>
                      <div className="offer-content">
                        <div className="price-sl">
                          <div className="price-tag">
                            <span>
                              $60 <del>$75</del>
                            </span>
                          </div>
                          <div className="sl-no">
                            <span>05</span>
                          </div>
                        </div>
                        <h3>
                          <Link to="/shop-details">Beef with Drinks.</Link>
                        </h3>
                        <p>
                          It’s so tasty and delicious for creating our customer.
                          So visit our restaurant.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-lg-end">
                    <div className="single-offer-card">
                      <div className="offer-img">
                        <img
                          src="/images/bg/h3-special-06.png"
                          alt="h3-special-01"
                        />
                        <div className="sm-img">
                          <img
                            src="/images/bg/h3-special-02-sm.png"
                            alt="h3-special-01-sm"
                          />
                        </div>
                      </div>
                      <div className="offer-content">
                        <div className="price-sl">
                          <div className="price-tag">
                            <span>
                              $45 <del>$55</del>
                            </span>
                          </div>
                          <div className="sl-no">
                            <span>06</span>
                          </div>
                        </div>
                        <h3>
                          <Link to="/shop-details">Fish with Drinks.</Link>
                        </h3>
                        <p>
                          It’s so tasty and delicious for creating our customer.
                          So visit our restaurant.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="single-offer-card">
                      <div className="offer-img">
                        <img
                          src="/images/bg/h3-special-07.png"
                          alt="h3-special-03"
                        />
                        <div className="sm-img">
                          <img
                            src="/images/bg/h3-special-03-sm.png"
                            alt="h3-special-03-sm"
                          />
                        </div>
                      </div>
                      <div className="offer-content">
                        <div className="price-sl">
                          <div className="price-tag">
                            <span>
                              $55 <del>$75</del>
                            </span>
                          </div>
                          <div className="sl-no">
                            <span>07</span>
                          </div>
                        </div>
                        <h3>
                          <Link to="/shop-details">Prwan with Kabab.</Link>
                        </h3>
                        <p>
                          It’s so tasty and delicious for creating our customer.
                          So visit our restaurant.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-lg-end">
                    <div className="single-offer-card">
                      <div className="offer-img">
                        <img
                          src="/images/bg/h3-special-08.png"
                          alt="h3-special-04"
                        />
                        <div className="sm-img">
                          <img
                            src="/images/bg/h3-special-04-sm.png"
                            alt="h3-special-04-sm"
                          />
                        </div>
                      </div>
                      <div className="offer-content">
                        <div className="price-sl">
                          <div className="price-tag">
                            <span>
                              $45 <del>$65</del>
                            </span>
                          </div>
                          <div className="sl-no">
                            <span>08</span>
                          </div>
                        </div>
                        <h3>
                          <Link to="/shop-details">Mutton with Pasta.</Link>
                        </h3>
                        <p>
                          It’s so tasty and delicious for creating our customer.
                          So visit our restaurant.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="row position-relative g-lg-5 g-4">
                  <div className="divider" />
                  <div className="col-lg-6">
                    <div className="single-offer-card">
                      <div className="offer-img">
                        <img
                          src="/images/bg/h3-special-01.png"
                          alt="h3-special-01"
                        />
                        <div className="sm-img">
                          <img
                            src="/images/bg/h3-special-01-sm.png"
                            alt="h3-special-01-sm"
                          />
                        </div>
                      </div>
                      <div className="offer-content">
                        <div className="price-sl">
                          <div className="price-tag">
                            <span>
                              $60 <del>$75</del>
                            </span>
                          </div>
                          <div className="sl-no">
                            <span>09</span>
                          </div>
                        </div>
                        <h3>
                          <Link to="/shop-details">Chicken with Drinks.</Link>
                        </h3>
                        <p>
                          It’s so tasty and delicious for creating our customer.
                          So visit our restaurant.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-lg-end">
                    <div className="single-offer-card">
                      <div className="offer-img">
                        <img
                          src="/images/bg/h3-special-02.png"
                          alt="h3-special-01"
                        />
                        <div className="sm-img">
                          <img
                            src="/images/bg/h3-special-02-sm.png"
                            alt="h3-special-01-sm"
                          />
                        </div>
                      </div>
                      <div className="offer-content">
                        <div className="price-sl">
                          <div className="price-tag">
                            <span>
                              $40 <del>$55</del>
                            </span>
                          </div>
                          <div className="sl-no">
                            <span>10</span>
                          </div>
                        </div>
                        <h3>
                          <Link to="/shop-details">Burger with Drinks.</Link>
                        </h3>
                        <p>
                          It’s so tasty and delicious for creating our customer.
                          So visit our restaurant.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="single-offer-card">
                      <div className="offer-img">
                        <img
                          src="/images/bg/h3-special-03.png"
                          alt="h3-special-03"
                        />
                        <div className="sm-img">
                          <img
                            src="/images/bg/h3-special-03-sm.png"
                            alt="h3-special-03-sm"
                          />
                        </div>
                      </div>
                      <div className="offer-content">
                        <div className="price-sl">
                          <div className="price-tag">
                            <span>
                              $90 <del>$95</del>
                            </span>
                          </div>
                          <div className="sl-no">
                            <span>11</span>
                          </div>
                        </div>
                        <h3>
                          <Link to="/shop-details">Soup with Kabab.</Link>
                        </h3>
                        <p>
                          It’s so tasty and delicious for creating our customer.
                          So visit our restaurant.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-lg-end">
                    <div className="single-offer-card">
                      <div className="offer-img">
                        <img
                          src="/images/bg/h3-special-04.png"
                          alt="h3-special-04"
                        />
                        <div className="sm-img">
                          <img
                            src="/images/bg/h3-special-04-sm.png"
                            alt="h3-special-04-sm"
                          />
                        </div>
                      </div>
                      <div className="offer-content">
                        <div className="price-sl">
                          <div className="price-tag">
                            <span>
                              $75 <del>$85</del>
                            </span>
                          </div>
                          <div className="sl-no">
                            <span>12</span>
                          </div>
                        </div>
                        <h3>
                          <Link to="/shop-details">Pizza with Pasta.</Link>
                        </h3>
                        <p>
                          It’s so tasty and delicious for creating our customer.
                          So visit our restaurant.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
        <div className="row position-relative">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="swiper-pagination-i" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
