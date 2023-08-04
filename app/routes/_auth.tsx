import { Outlet } from "@remix-run/react";
import React from "react";

const AuthLayout = () => {
  return (
    <div className="tw-relative">
      <img
        src="/images/bg/error-page-bg.png"
        className="tw-absolute tw-h-full tw-w-full tw-object-cover"
        alt=""
      />
      <div className="tw-text-center tw-pt-12 tw-mb-5">
        <img
          src="/images/dark-logo.png"
          className="tw-h-16 md:tw-h-24"
          alt=""
        />
      </div>
      <div className="tw-relative tw-z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
