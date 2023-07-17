/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "@remix-run/react";

function Footer() {
  return (
    <footer>
      <div className="footer-top ">
        <div className="container">
          <div className="row justify-content-center align-items-center gy-5">
            <div className="col-lg-4 col-md-6  order-md-1 order-2">
              <div className="footer-widget one">
                <div className="widget-title">
                  <h3>Our Facilities</h3>
                </div>
                <div className="menu-container">
                  <ul>
                    <li>
                      <Link to="/menu/special#indian">Indian Menu</Link>
                    </li>
                    <li>
                      <Link to="/menu/super">Super Menu List</Link>
                    </li>
                    <li>
                      <Link to="/reservation">Private Event</Link>
                    </li>
                    <li>
                      <Link to="/menu/special#italian">Italian Menu</Link>
                    </li>
                    <li>
                      <Link to="#">Best Offer</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/shop">Shopping</Link>
                    </li>
                    <li>
                      <Link to="#">New Food</Link>
                    </li>
                    <li>
                      <Link to="#">Special Offer</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 order-md-2 order-1">
              <div className="footer-widgetfooter-widget social-area">
                <div className="footer-logo text-center">
                  <Link to="/">
                    <img
                      src="/images/white-logo.png"
                      className="tw-h-20"
                      alt=""
                    />
                  </Link>
                  <p>Established . 2023</p>
                  <span>
                    <img src="/images/icon/footer-shape.svg" alt="" />
                  </span>
                </div>
                <div className="footer-social">
                  <ul className="social-link d-flex align-items-center justify-content-center">
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
              </div>
            </div>
            <div className="col-lg-4 col-md-6 order-3">
              <div className="footer-widget one">
                <div className="widget-title">
                  <h3>Address Info</h3>
                </div>
                <div className="contact-info">
                  <div className="single-contact">
                    <span className="title">Phone:</span>
                    <span className="content">
                      <a href="tel:+254740000000">+254-740000000</a>
                    </span>
                  </div>
                  <div className="single-contact">
                    <span className="title">Email:</span>
                    <span className="content">
                      <a href="mailto:info@example.com">info@example.com</a>
                    </span>
                  </div>
                  <div className="single-contact">
                    <span className="title">Location:</span>
                    <span className="content">
                      <a href="https://www.google.com/maps/d/viewer?mid=1SuwNJ-HqTWSF2Bmaur7HqmVqZBk&hl=en&ll=-1.2933369999999977%2C36.80705299999999&z=17">
                        Parkland,House-167/170,
                        <br />
                        Nairobi, Kenya.
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-btm">
        <div className="container">
          <div className="row border-ttop g-2">
            <div className="col-md-8 justify-content-md-start justify-content-center">
              <div className="copyright-area">
                <p>@Copyright by Replica -2023, All Right Reserved.</p>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-md-end justify-content-center">
              <div className="privacy-policy">
                <p>
                  <Link to="#">Privacy &amp; Policy</Link> |
                  <a href="#">Terms and Conditions</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
