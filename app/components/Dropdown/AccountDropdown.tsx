/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "@remix-run/react";
import LinkButton1 from "../Button/LinkButton1";
import type { FC } from "react";

interface Props {
  user?: {
    name: string;
    email: string;
    admin?: boolean;
  };
}

const AccountDropdown: FC<Props> = ({ user }) => {
  return (
    <div className="tw-cursor-pointer tw-inline-block tw-relative tw-py-0 tw-px-0 tw-group">
      <a className="tw-text-white/70 tw-py-6 tw-block tw-transition-all tw-ease-out tw-duration-500 hover:tw-text-primary active:tw-text-primary">
        <div className="border tw-rounded-full tw-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-border-primary group-hover:tw-bg-white/20">
          {!user && <i className="bi bi-person tw-text-2xl" />}
          {user && (
            <i className="bi bi-person-check tw-text-2xl tw-text-primary"></i>
          )}
        </div>
      </a>
      <div
        style={{
          visibility: "hidden",
          opacity: 0,
          transform: "translateY(20px)",
        }}
        className={`tw-absolute tw-right-0 tw-top-auto tw-m-0 tw-p-3 tw-min-w-[220px] tw-bg-[#0b0f14] tw-z-50 tw-text-left tw-transition-all group-hover:tw-visible group-hover:tw-opacity-100 group-hover:tw-translate-y-0`}
      >
        <div className="tw-p-0 tw-block tw-relative">
          <div className="tw-block tw-px-2 tw-pt-2 tw-text-center  ">
            <div className=" tw-text-white  tw-uppercase tw-text-sm  tw-font-medium">
              {user ? user.name : "My Account"}
            </div>
            {user && (
              <p className=" tw-opacity-75 tw-text-primary">{user.email}</p>
            )}
          </div>
          <hr />
          {user && !user.admin && (
            <div>
              <div className="tw-space-y-4">
                <Link
                  to="/orders"
                  className=" tw-flex tw-items-center tw-text-white/80 hover:tw-text-primary"
                >
                  <i className="bi bi-bucket tw-text-lg tw-mx-4 tw-block"></i>
                  <div className="tw-uppercase tw-text-sm tw-font-normal">
                    Orders
                  </div>
                </Link>
                <Link
                  to="/profile"
                  className=" tw-flex tw-items-center tw-text-white/80 hover:tw-text-primary"
                >
                  <i className="bi bi-person-circle tw-text-lg tw-mx-4 tw-block"></i>
                  <div className="tw-uppercase tw-text-sm tw-font-normal">
                    Profile
                  </div>
                </Link>
              </div>
              <hr />
              <LinkButton1
                to="/logout"
                className="tw-block tw-text-dark tw-visible py-2"
              >
                Logout
              </LinkButton1>
            </div>
          )}
          {!user && (
            <LinkButton1
              to="/login"
              className="tw-block tw-text-dark tw-visible"
            >
              Login
            </LinkButton1>
          )}
          {user && user.admin && (
            <LinkButton1
              to="/admin"
              className="tw-block tw-text-dark tw-visible"
            >
              Admin console
            </LinkButton1>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDropdown;
