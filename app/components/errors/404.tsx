import { Link } from "@remix-run/react";
import React from "react";

const NotFound = () => {
  return (
    <div className="error-pages">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="error-content text-center">
              <h2>Ooops!</h2>
              <img className="img-fluid" src="/images/bg/404.png" alt={"404"} />
              <p>The page not found , something went wrong. Go to Homepage</p>
              <Link to="/" className="primary-btn7 btn-md2">
                <i className="bi bi-arrow-up-right-circle" />
                Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
