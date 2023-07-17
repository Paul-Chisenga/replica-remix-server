/* eslint-disable jsx-a11y/anchor-is-valid */
function Topbar() {
  return (
    <div className="top-bar">
      <div className="container-lg container-fluid ">
        <div className="row">
          <div className="col-lg-5 col-md-5 d-flex align-items-center justify-content-md-start justify-content-center">
            <div className="open-time">
              <p>
                <span>Opening Hour:</span> 9.00 am to 10.00 pm
              </p>
            </div>
          </div>
          <div className="col-lg-7 col-md-7 d-flex justify-content-end">
            <div className="contact-info">
              <ul>
                <li>
                  <a href="mailto:info@example.com">
                    <i className="bi bi-envelope" /> info@example.com
                  </a>
                </li>
                <li>
                  <a>
                    <i className="bi bi-geo-alt" />
                    Road-01, Block-B, West London City
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
