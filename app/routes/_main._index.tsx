import type { Prisma } from "@prisma/client";
import { MenuCategory } from "@prisma/client";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import { useTypedLoaderData } from "remix-typedjson";
import About from "~/components/about/About";
import Banner from "~/components/home/Banner";
import MenuList from "~/components/menuList/MenuList";
import Reservation2 from "~/components/reservation/Reservation2";
import prisma from "~/services/prisma.server";
import datePickerCss from "react-datepicker/dist/react-datepicker.css";
import { randomNumber } from "~/utils/helpers";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Replica - Home" },
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
    if (count <= 4) return 0;
    return randomNumber(0, count - 4);
  };

  const breakfastWhere: Prisma.ProductWhereInput = {
    menuItem: {
      category: MenuCategory.BREAKFAST,
    },
  };
  const breakfastCount = await prisma.product.count({ where: breakfastWhere });
  const breakfast = await prisma.product.findMany({
    where: breakfastWhere,
    include: {
      images: true,
    },
    skip: random(breakfastCount),
    take: 4,
  });

  const lunchWhere: Prisma.ProductWhereInput = {
    menuItem: {
      category: MenuCategory.FOOD,
    },
  };
  const lunchCount = await prisma.product.count({ where: lunchWhere });
  const lunchDinner = await prisma.product.findMany({
    where: lunchWhere,
    include: {
      images: true,
    },
    skip: random(lunchCount),
    take: 4,
  });

  const bakeryWhere: Prisma.ProductWhereInput = {
    menuItem: {
      category: MenuCategory.BAKERY,
    },
  };
  const bakeryCount = await prisma.product.count({ where: bakeryWhere });
  const bakery = await prisma.product.findMany({
    where: bakeryWhere,
    include: {
      images: true,
    },
    skip: random(bakeryCount),
    take: 4,
  });

  const beverageWhere: Prisma.ProductWhereInput = {
    menuItem: {
      category: MenuCategory.BEVARAGE,
    },
  };
  const beverageCount = await prisma.product.count({ where: beverageWhere });
  const beverages = await prisma.product.findMany({
    where: beverageWhere,
    include: {
      images: true,
    },
    skip: random(beverageCount),
    take: 4,
  });

  return { breakfast, lunchDinner, bakery, beverages };
}
