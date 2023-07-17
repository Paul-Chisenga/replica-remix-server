import { Outlet } from "@remix-run/react";
import Footer from "~/components/footer/Footer";
import Header2 from "~/components/header/Header2";

const Layout = () => {
  return (
    <>
      <Header2 />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
