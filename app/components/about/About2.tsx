const About2 = () => {
  return (
    <div className="home1-introduction-area pt-120 mb-120">
      <div className="container-lg container-fluid">
        <div className="row mb-40">
          <div className="col-lg-12">
            <div className="section-title">
              <span>
                <img
                  className="left-vec"
                  src="/images/icon/sub-title-vec.svg"
                  alt="sub-title-vec"
                />
                About Replica
                <img
                  className="right-vec"
                  src="/images/icon/sub-title-vec.svg"
                  alt="sub-title-vec"
                />
              </span>
              <h2>We love food, we want you to love it too</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row gy-5">
          <div className="col-lg-4">
            <div className="into-left-img magnetic-wrap">
              <img
                className="img-fluid magnetic-item"
                src="/images/replica-02.jpeg"
                alt="h1-intro-left-img"
              />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="our-mission">
              <div className="icon">
                <img src="/images/icon/mission.svg" alt="" />
                <h4>Our Mission</h4>
              </div>
              <div className="description ">
                <p className="tw-capitalize">
                  To provide high quality food, service, and aesthetic at a
                  price that works for us all.
                </p>
              </div>
            </div>
            <div className="intro-right">
              <div className="features-author">
                <div className="intro-features">
                  <ul>
                    <li>
                      <i className="bi bi-check-circle" />
                      Delicious Food.
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Cost Effective.
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Clean Environment.
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <i className="bi bi-check-circle" />
                      Expert Chef.
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Great Service.
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Quality Food.
                    </li>
                  </ul>
                </div>
                <div className="our-mission tw-block tw-mt-4">
                  <div className="icon tw-border-none">
                    <img src="/images/icon/mission.svg" alt="" />
                    <h4>About us</h4>
                  </div>
                  <div className="description">
                    <p>
                      We started Replica in 2023 with the desire of providing
                      East Africans with a unique and quality dining experience.
                      Our eclectic American cuisine is a taste of our home, with
                      a blend of other cuisines. We want our customers to feel
                      appreciated by the effort we put into each dish and the
                      service we provide each table. Our hope is to replicate
                      ourselves throughout East Africa and grow with the
                      communities we are in.
                    </p>
                  </div>
                </div>
              </div>
              <div className="intro-right-img magnetic-wrap">
                <img
                  className="img-fluid magnetic-item"
                  src="/images/bg/h1-intro-right-img.png"
                  alt="h1-intro-right-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About2;
