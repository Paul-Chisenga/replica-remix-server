import { Link } from "@remix-run/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);
function ShopNewItem() {
  const shopSLider = {
    slidesPerView: 1,
    speed: 1200,
    spaceBetween: 22,
    fadeEffect: {
      crossFade: true,
    },
    autoplay: true,
    loop: true,
    navigation: {
      nextEl: ".next-btn",
      prevEl: ".prev-btn",
    },
    pagination: false,
  };
  return (
    <div className="single-widgets widget_egns_recent_post">
      <div className="widget-title">
        <h3>New Items: </h3>
        <div className="slder-btn">
          <div className="prev-btn">
            <i className="bi bi-chevron-left" />
          </div>
          <div className="next-btn">
            <i className="bi bi-chevron-right" />
          </div>
        </div>
      </div>
      <div className="recent-post-wraper">
        <Swiper {...shopSLider} className="swiper recent-post-slider">
          <div className="swiper-wrapper">
            <SwiperSlide className="swiper-slide">
              <div className="news-wrap">
                <div className="post-thum">
                  <img
                    className="img-fluid"
                    src="/images/bg/sb-new-item1.png"
                    alt=""
                  />
                </div>
                <div className="news-content two">
                  <ul className="d-flex align-items-center p-0 gap-1">
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                  </ul>
                  <div className="pric-tag">
                    <span>$10</span>
                  </div>
                  <h3>
                    <Link to="/shop-details">
                      <a>
                        Delicious Food Always To Make Healthy Body &amp; Mind.
                      </a>
                    </Link>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="news-wrap">
                <div className="post-thum">
                  <img
                    className="img-fluid"
                    src="/images/bg/sb-new-item2.png"
                    alt=""
                  />
                </div>
                <div className="news-content two">
                  <ul className="d-flex align-items-center p-0 gap-1">
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                  </ul>
                  <div className="pric-tag">
                    <span>$15</span>
                  </div>
                  <h3>
                    <Link to="/shop-details">
                      <a>
                        Cooking BBQ Beef With Tasty Mashala With Beautiful
                        Plate.
                      </a>
                    </Link>
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default ShopNewItem;
