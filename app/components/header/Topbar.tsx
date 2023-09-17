/* eslint-disable jsx-a11y/anchor-is-valid */
function Topbar() {
  return (
    <div className="top-bar">
      <div className="container-lg container-fluid ">
        <div className="row">
          <div className="col-lg-5 col-md-5 d-flex align-items-center justify-content-md-start justify-content-center">
            <div className="open-time tw-text-center">
              <p>
                <span>Opening Hour:</span> 7.a.m-10.p.m(Mon-Thur) |
                7.a.m-11.p.m(Fri-Sat) <strong>Closed Sunday</strong>
              </p>
            </div>
          </div>
          <div className="col-lg-7 col-md-7 d-flex justify-content-end">
            <div className="contact-info">
              <ul>
                <li>
                  <a href="mailto:replicabakery@gmail.com">
                    <i className="bi bi-envelope" /> replicabakery@gmail.com
                  </a>
                </li>
                <li>
                  <a>
                    <i className="bi bi-geo-alt" />
                    Rosslyn Riviera Mall, Floor #1 Nairobi Kenya
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
