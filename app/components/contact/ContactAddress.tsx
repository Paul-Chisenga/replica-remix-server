/* eslint-disable jsx-a11y/anchor-is-valid */

const ContactAddress = () => {
  return (
    <div className="contact-page pt-120">
      <div className="container-fluid">
        <div className="row justify-content-center g-4">
          <div className="col-xxl-6 col-xl-4 col-lg-5 col-md-6 col-sm-8">
            <div className="contact-wrap">
              <div className="contact-img">
                <img src="/images/bg/contact-img-02.png" alt="contact-img-01" />
              </div>
              <div className="contact-content">
                <h3>Rosslyn Branch</h3>
                <ul>
                  <li>
                    <div className="icon">
                      <img src="/images/icon/location.svg" alt="location" />
                    </div>
                    <div className="content">
                      <a>
                        Rosslyn Riviera Mall, Floor #1
                        <br />
                        Nairobi, Kenya.
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/images/icon/phone.svg" alt="phone" />
                    </div>
                    <div className="content">
                      <a href="#">+254 115 904863</a>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <img src="/images/icon/envlope.svg" alt="envlope" />
                    </div>
                    <div className="content">
                      <a href="#">Replicabakery@gmail.com</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactAddress;
