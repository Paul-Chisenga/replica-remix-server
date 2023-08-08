import type { Prisma } from "@prisma/client";
import { MenuCategory } from "@prisma/client";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import { useTypedLoaderData } from "remix-typedjson";
import About from "~/components/about/About";
import Banner from "~/components/Banner";
import MenuList from "~/components/menuList/MenuList";
import Reservation2 from "~/components/reservation/Reservation2";
import prisma from "~/services/prisma.server";
import datePickerCss from "react-datepicker/dist/react-datepicker.css";
import { randomNumber } from "~/utils/helpers";

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
  const random = (count: number) => {
    return randomNumber(0, count - 4);
  };

  const breakfastWhere: Prisma.ProductWhereInput = {
    subMenu: {
      menu: {
        category: MenuCategory.BREAKFAST,
      },
    },
  };
  const breakfastCount = await prisma.product.count({ where: breakfastWhere });
  const breakfast = await prisma.product.findMany({
    where: breakfastWhere,
    skip: random(breakfastCount),
    take: 4,
  });

  const lunchWhere: Prisma.ProductWhereInput = {
    subMenu: {
      menu: {
        category: MenuCategory.FOOD,
      },
    },
  };
  const lunchCount = await prisma.product.count({ where: lunchWhere });
  const lunchDinner = await prisma.product.findMany({
    where: lunchWhere,
    skip: random(lunchCount),
    take: 4,
  });

  const bakeryWhere: Prisma.ProductWhereInput = {
    subMenu: {
      menu: {
        category: MenuCategory.BAKERY,
      },
    },
  };
  const bakeryCount = await prisma.product.count({ where: bakeryWhere });
  const bakery = await prisma.product.findMany({
    where: bakeryWhere,
    skip: random(bakeryCount),
    take: 4,
  });

  const beverageWhere: Prisma.ProductWhereInput = {
    subMenu: {
      menu: {
        category: MenuCategory.BEVARAGE,
      },
    },
  };
  const beverageCount = await prisma.product.count({ where: beverageWhere });
  const beverages = await prisma.product.findMany({
    where: beverageWhere,
    skip: random(beverageCount),
    take: 4,
  });

  return { breakfast, lunchDinner, bakery, beverages };
}
