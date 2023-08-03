import { MenuCategory } from "@prisma/client";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import { useTypedLoaderData } from "remix-typedjson";
import About from "~/components/about/About";
import Banner from "~/components/Banner";
import MenuList from "~/components/menuList/MenuList";
import Reservation2 from "~/components/reservation/Reservation2";
import prisma from "~/services/prisma.server";
import datePickerCss from "react-datepicker/dist/react-datepicker.css";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Replica - The classic restaurant" },
    { name: "description", content: "Welcome to Replica!" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: datePickerCss },
];

export default function Index() {
  const products = useTypedLoaderData<typeof loader>();
  return (
    <div>
      {/* <Preloader /> */}
      {/* <Topbar /> */}
      {/* <Header2 /> */}
      {/* <Header /> */}
      <Banner />
      <About />
      {/* <Facilities />
      <SpecialOffer /> */}
      <Reservation2 />
      <MenuList products={products} />
      {/* <Footer /> */}
    </div>
  );
}

export async function loader() {
  const breakfast = await prisma.product.findMany({
    where: {
      subMenu: {
        menu: {
          category: MenuCategory.BREAKFAST,
        },
      },
    },
    take: 4,
  });
  const lunchDinner = await prisma.product.findMany({
    where: {
      subMenu: {
        menu: {
          category: MenuCategory.FOOD,
        },
      },
    },
    take: 4,
  });

  const bakery = await prisma.product.findMany({
    where: {
      subMenu: {
        menu: {
          category: MenuCategory.BAKERY,
        },
      },
    },
    take: 4,
  });

  const beverages = await prisma.product.findMany({
    where: {
      subMenu: {
        menu: {
          category: MenuCategory.BEVARAGE,
        },
      },
    },
    take: 4,
  });
  return { breakfast, lunchDinner, bakery, beverages };
}
