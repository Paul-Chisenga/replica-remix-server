import { Link } from "@remix-run/react";
import type { FC } from "react";

interface Props {
  pageTitle: string;
  pageName: string;
}

const Breadcrumb: FC<Props> = ({ pageName, pageTitle }) => {
  return (
    <div className="breadcrumb-section">
      <div className="breadcrumb-left-vec">
        <img
          src="/images/icon/breadcumb-left-vec.svg"
          alt="breadcumb-left-vec"
        />
      </div>
      <div className="breadcrumb-right-vec">
        <img
          src="/images/icon/breadcumb-right-vec.svg"
          alt="breadcumb-right-vec"
        />
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-12">
            <h2 className="breadcrumb-title tw-capitalize">{pageTitle}</h2>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb d-flex">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li
                  className="breadcrumb-item active tw-capitalize"
                  aria-current="page"
                >
                  {pageName}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
