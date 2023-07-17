/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "@remix-run/react";
import React from "react";

const Banner = () => {
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
          Our Restaurant is Opening Hour 9:30 AM to 9.00 PM
          <img
            className="right-vec"
            src="/images/icon/h3-open-vec.svg"
            alt=""
          />
        </p>
      </div>
      <div className="video-wrap d-flex align-items-center justify-content-center">
        <video autoPlay loop muted preload="auto">
          <source src="/video/v1.mp4" type="video/mp4" />
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
          <h1>Find Your Best Healthy &amp; Tasty Food.</h1>
          <Link to="/about">
            <a className="primary-btn7 btn-md2">
              <i className="bi bi-arrow-up-right-circle" /> Discover More
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
