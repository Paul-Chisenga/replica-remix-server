import { Link } from "@remix-run/react";
import React from "react";

const ComingSoon = () => {
  return (
    <div className="error-pages">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="error-content text-center">
              <h2>Hey!</h2>

              <p>This functionality is coming soon, try again later</p>
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

export default ComingSoon;
