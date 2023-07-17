import type { V2_MetaFunction } from "@remix-run/node";
import About from "~/components/about/About";
import Banner from "~/components/Banner";
import SpecialOffer from "~/components/bestOffer/SpecialOffer";
// import Preloader from "~/components/common/Prelaoder";
import Facilities from "~/components/facilities/Facilities";
import Footer from "~/components/footer/Footer";
// import Header from "~/components/header/Header";
import Header2 from "~/components/header/Header2";
import Topbar from "~/components/header/Topbar";
import MenuList from "~/components/menuList/MenuList";
import { getUsers } from "~/controllers/test.server";

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
      <Facilities />
      <SpecialOffer />
      <MenuList />
      <Footer />
    </div>
  );
}

export async function loader() {
  const users = await getUsers();
  console.log(users);
  return null;
}
