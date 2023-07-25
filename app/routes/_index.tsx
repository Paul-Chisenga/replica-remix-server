import type { V2_MetaFunction } from "@remix-run/node";
import About from "~/components/about/About";
import Banner from "~/components/Banner";
import Footer from "~/components/footer/Footer";
import Header2 from "~/components/header/Header2";
import Topbar from "~/components/header/Topbar";
import MenuList from "~/components/menuList/MenuList";
import Reservation2 from "~/components/reservation/Reservation2";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Replica - The classic restaurant" },
    { name: "description", content: "Welcome to Replica!" },
  ];
};

export default function Index() {
  return (
    <div>
      {/* <Preloader /> */}
      <Topbar />
      <Header2 />
      {/* <Header /> */}
      <Banner />
      <About />
      {/* <Facilities />
      <SpecialOffer /> */}
      <Reservation2 />
      <MenuList />
      <Footer />
    </div>
  );
}

export async function loader() {
  return null;
}
