/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "@remix-run/react";
import type { FC } from "react";
import { useEffect, useReducer, useRef } from "react";

/*---------Using reducer mange the active or inactive menu----------*/
const initialState = {
  activeMenu: "",
  mobileMenuState: false,
  navState: false,
  scrollY: 0,
};
function reducer(state: any, action: any) {
  switch (action.type) {
    case "mobileMenu":
      return { ...state, mobileMenuState: action.isMobileMenu };
    case "setScrollY":
      return { ...state, scrollY: action.payload };
    default:
      throw new Error();
  }
}

interface Props {
  user: {
    name: string;
    email: string;
  };
}

const RiderHeader: FC<Props> = ({ user }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const headerRef = useRef(null);

  const handleScroll = () => {
    const { scrollY } = window;
    dispatch({ type: "setScrollY", payload: scrollY });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header ref={headerRef} className={"header-area style-1 bg-color2 sticky"}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="header-logo tw-flex tw-items-center tw-gap-3">
          <Link to="/">
            <a>
              <img alt="" className=" tw-h-12" src="/images/white-logo.png" />
            </a>
          </Link>
          <span className="tw-inline-block tw-text-gray-300">Dashboard</span>
        </div>
        <div
          className={
            state.mobileMenuState == true ? "main-menu show-menu" : "main-menu"
          }
        >
          <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
            <div className="mobile-logo-wrap">
              <Link to="/">
                <a>
                  <img
                    alt=""
                    src="/images/white-logo.png"
                    className="tw-h-20"
                  />
                </a>
              </Link>
            </div>
            <div className="menu-close-btn">
              <i
                className="bi bi-x-lg text-white"
                onClick={() =>
                  dispatch({ type: "mobileMenu", isMobileMenu: false })
                }
              />
            </div>
          </div>
          <div className="tw-py-10 tw-space-y-6 d-md-none">
            <div className=" tw-items-center tw-gap-6 tw-flex tw-mt-[150]">
              <div className="border tw-rounded-full tw-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-border-primary group-hover:tw-bg-white/20">
                <i className="bi bi-person tw-text-2xl tw-text-primary" />
              </div>
              <div className="">
                <span className="tw-text-primary tw-font-normal tw-text-sm">
                  {user.email}
                </span>
                <h6 className="tw-uppercase tw-font-medium tw-text-white">
                  {user.name}
                </h6>
              </div>
            </div>

            <Link to="/logout" className="primary-btn btn-md">
              Logout
            </Link>
          </div>
        </div>
        <div className="nav-right d-flex jsutify-content-end align-items-center">
          <div className="d-none tw-items-center tw-gap-6 d-md-flex">
            <div className="border tw-rounded-full tw-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-border-primary group-hover:tw-bg-white/20">
              <i className="bi bi-person tw-text-2xl tw-text-primary" />
            </div>
            <div className="">
              <span className="tw-text-primary tw-font-normal tw-text-sm">
                {user.email}
              </span>
              <h6 className="tw-uppercase tw-font-medium tw-text-white">
                {user.name}
              </h6>
            </div>
          </div>

          <Link
            to="/logout"
            className="primary-btn btn-md d-none d-md-inline-block"
          >
            Logout
          </Link>
          <div
            className="sidebar-button mobile-menu-btn d-md-none"
            onClick={() => dispatch({ type: "mobileMenu", isMobileMenu: true })}
          >
            <i className="bi bi-list" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default RiderHeader;
