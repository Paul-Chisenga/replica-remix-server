import { MenuCategory } from "@prisma/client";
import type { V2_MetaFunction } from "@remix-run/node";
import { useTypedLoaderData } from "remix-typedjson";
import Breadcrumb from "~/components/common/Breadcrumb";
import Menu1 from "~/components/menu/Menu1";
import { menuLoader } from "~/utils/helpers";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Bakery - Replica restaurant" },
    {
      name: "description",
      content: "This page contains the bakery menu with serve at replica!",
    },
  ];
};

const BakeryMenu = () => {
  const menu = useTypedLoaderData<typeof loader>();
  return (
    <>
      <Breadcrumb pageName="bakery" pageTitle="Bakery Menu" />
      <Menu1 category={MenuCategory.BAKERY} menu={menu} image="bakery.png" />
    </>
  );
};

export default BakeryMenu;

export function loader() {
  return menuLoader(MenuCategory.BAKERY);
}
