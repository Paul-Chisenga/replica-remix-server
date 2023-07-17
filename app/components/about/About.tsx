/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "@remix-run/react";

const About = () => {
  return (
    <div className="introduction-area pt-120 mb-120">
      <div className="container">
        <div className="row align-items-end gy-5">
          <div className="col-lg-7">
            <div className="section-title3">
              <span>
                <img
                  className="left-vec"
                  src="/images/icon/h3-sub-title-vec.svg"
                  alt=""
                />
                About Replica
                <img
                  className="right-vec"
                  src="/images/icon/h3-sub-title-vec.svg"
                  alt=""
                />
              </span>
              <h2>Find your best healthy and Tasty food</h2>
            </div>
            <div className="introduction-content">
              <p>
                Replica is Suspendisse nec mi non turpis egestas vestibulum.
                Cras vel sollicitudin libero, id tristique ex. Pellentesque
                tristique malesuada nunc quis vulputate. Integer aliquet
                convallis ante id interdum of Lorem Ipsum.Suspendisse nec mi non
                turpis egestas vestibulum
              </p>
              <div className="h2-about-area tw-mx-0">
                <div className="about-right tw-mx-0">
                  <div className="about-featurs">
                    <ul>
                      <li>
                        <div className="features-img">
                          <img src="/images/icon/h2-about1.svg" alt="" />
                        </div>
                        <div className="features-content">
                          <h4>Pure Fresh Food.</h4>
                          <p>We are serve different type of fresh food.</p>
                        </div>
                      </li>
                      <li>
                        <div className="features-img">
                          <img src="/images/icon/h2-about2.svg" alt="" />
                        </div>
                        <div className="features-content">
                          <h4>Experties Chef.</h4>
                          <p>We are serve different type of fresh food.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="discover-btn">
                <Link to="/about">
                  <a className="primary-btn7 btn-md2">
                    <i className="bi bi-arrow-up-right-circle" />
                    Discover More
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="h3-into-img-big">
              <img
                className="img-fluid"
                src="/images/bg/h3-intro-big.png"
                alt="h3-intro-big"
              />
              {/* <div className="h3-into-img-sm magnetic-wrap">
                <img
                  className="img-fluid magnetic-item"
                  src="/images/bg/h3-intro-sm.png"
                  alt="h3-intro-sm"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
