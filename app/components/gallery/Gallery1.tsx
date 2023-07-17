import React, { useState } from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import gallaryData from "~/data/gallery2.json";
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);
function Gallery1() {
  const [isOpenimg, setOpenimg] = useState({
    openingState: false,
    openingIndex: 0,
  });
  const gallarySlider = {
    slidesPerView: "auto",
    spaceBetween: 37,
    loop: true,
    speed: 1500,
    // autoplay: {
    //     delay: 2000,
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      280: {
        slidesPerView: 2,
        spaceBetween: 15,
        centeredSlides: true,
      },
      480: {
        slidesPerView: 2,
        spaceBetween: 15,
        centeredSlides: true,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 25,
        centeredSlides: true,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 25,
        centeredSlides: true,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 25,
        centeredSlides: true,
      },
      1400: {
        slidesPerView: 5,
      },
      1600: {
        slidesPerView: 5,
      },
    },
  };
  return (
    <div className="food-gallery-area mb-120">
      <div className="container-fluid">
        <div className="row d-flex justify-content-center mb-40">
          <div className="col-lg-8">
            <div className="section-title text-center">
              <span>
                <img
                  className="left-vec"
                  src="assets/images/icon/sub-title-vec.svg"
                  alt="sub-title-vec"
                />
                Gallery
                <img
                  className="right-vec"
                  src="assets/images/icon/sub-title-vec.svg"
                  alt="sub-title-vec"
                />
              </span>
              <h2>Restho’s Gallery</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <Swiper
            {...(gallarySlider as any)}
            className="swiper gallery-slider1"
          >
            <div className="swiper-wrapper">
              {gallaryData.map((data, index) => {
                const { id, imageSmalll, slideCategoryTitle, slideTitle } =
                  data;
                return (
                  <SwiperSlide key={id} className="swiper-slide">
                    <div
                      className="gallery-wrap"
                      onClick={() =>
                        setOpenimg({ openingState: true, openingIndex: index })
                      }
                    >
                      <img className="img-fluid" src={imageSmalll} alt="" />
                      <div className="overlay d-flex align-items-center justify-content-center">
                        <div className="items-content text-center">
                          <span>
                            <img
                              className="left-vec"
                              src="assets/images/icon/shape-white1.svg"
                              alt="sub-title-vec"
                            />
                            {slideCategoryTitle}
                            <img
                              className="right-vec"
                              src="assets/images/icon/shape-white1.svg"
                              alt="sub-title-vec"
                            />
                          </span>
                          <h3>{slideTitle}</h3>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </div>
          </Swiper>
          <Lightbox
            className="img-fluid"
            open={isOpenimg.openingState}
            plugins={[Fullscreen]}
            index={isOpenimg.openingIndex}
            close={() => setOpenimg({ openingState: false, openingIndex: 0 })}
            styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
            slides={gallaryData.map(function (elem) {
              return { src: elem.imageBig };
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default Gallery1;
