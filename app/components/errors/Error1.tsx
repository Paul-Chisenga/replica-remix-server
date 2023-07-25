import { Link } from "@remix-run/react";
import type { FC } from "react";

interface Props {
  errorMessage?: string;
}

const Error1: FC<Props> = () => {
  return (
    <div className="error-pages">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="error-content text-center">
              <h2>Ooops!</h2>

              <p>Something went wrong. Go to Homepage</p>
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

export default Error1;
