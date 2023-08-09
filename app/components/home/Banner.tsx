/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "@remix-run/react";
import { useEffect, useRef } from "react";

const Banner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultPlaybackRate = 0.5;
      videoRef.current.playbackRate = 0.5;
    }
  }, []);
  return (
    <div className="home3-banner">
      <div className="social-area">
        <ul>
          <li>
            <a href="https://www.facebook.com/">
              <i className="bx bxl-facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <i className="bx bxl-instagram-alt" />
            </a>
          </li>
          <li>
            <a href="https://www.pinterest.com/">
              <i className="bx bxl-linkedin" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/">
              <i className="bx bxl-twitter" />
            </a>
          </li>
        </ul>
      </div>
      <div className="open-time">
        <div className="left-vect">
          <img src="/images/bg/open-vec-left.png" alt="" />
        </div>
        <div className="right-vect">
          <img src="/images/bg/open-vec-right.png" alt="" />
        </div>
        <p>
          <img className="left-vec" src="/images/icon/h3-open-vec.svg" alt="" />
          7 a.m.-10.p.m (Mon-Thur) | 7.a.m-11.p.m (Fri-Sat){" "}
          <strong>Closed Sunday</strong>
          <img
            className="right-vec"
            src="/images/icon/h3-open-vec.svg"
            alt=""
          />
        </p>
      </div>
      <div className="video-wrap d-flex align-items-center justify-content-center">
        <video autoPlay loop muted preload="auto" ref={videoRef}>
          <source src="/video/v2.webm" type="video/mp4" />
        </video>
        <div className="banner-content text-center">
          <span>
            <img
              className="left-vec"
              src="/images/icon/h3-sub-title-vec.svg"
              alt=""
            />
            Welcome To Replica
            <img
              className="right-vec"
              src="/images/icon/h3-sub-title-vec.svg"
              alt=""
            />
          </span>
          <h1 className="tw-capitalize">
            We love food, we want you to love it too.
          </h1>
          <Link to="/shop">
            <a className="primary-btn7 btn-md2">
              <i className="bi bi-arrow-up-right-circle" /> Order now
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
