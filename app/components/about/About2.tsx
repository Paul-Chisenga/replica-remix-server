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
              <h2>Come to Our Restaurant, Ready Your Food.</h2>
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
                src="/images/bg/h1-intro-left-img.png"
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
              <div className="description">
                <p>
                  Replica is Suspendisse nec mi non turpis egestas vestibulum.
                  Cras vel sollicitudin libero, id tristique ex. Pellentesque
                  tristique malesuada nunc quis vulputate. Integer aliquet
                  convallis ante id interdum
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
                      Letraset Sheets.
                    </li>
                    <li>
                      <i className="bi bi-check-circle" />
                      Quality Food.
                    </li>
                  </ul>
                </div>
                <div className="author-area">
                  <div className="author-content">
                    <p>
                      “Welcome our restaurant! Our Restaurant is the best as
                      like delicious food, nutrition food etc in world-wide.”
                    </p>
                  </div>
                  <div className="author-img-name">
                    <div className="author-img">
                      <img src="/images/bg/h1-intro-author.png" alt="" />
                    </div>
                    <div className="author-name">
                      <h4>Mr. Brady Searl</h4>
                      <span>CEO &amp;Founder</span>
                    </div>
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
