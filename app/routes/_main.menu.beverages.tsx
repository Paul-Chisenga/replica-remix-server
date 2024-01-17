import { MenuCategory } from "@prisma/client";
import type { V2_MetaFunction } from "@remix-run/node";
import { useTypedLoaderData } from "remix-typedjson";
import Breadcrumb from "~/components/common/Breadcrumb";
import Menu2 from "~/components/menu/Menu2";
import { menuLoader } from "~/utils/helpers";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Beverages - Replica restaurant" },
    {
      name: "description",
      content: "This page contains the beverages menu with serve at replica!",
    },
  ];
};

const BeverageMenu = () => {
  const menu = useTypedLoaderData<typeof loader>();
  return (
    <>
      <Breadcrumb pageName="beverages" pageTitle="Beverages Menu" />
      <Menu2 menu={menu} />
      {/* <Menu1
        category={MenuCategory.BEVARAGE}
        menu={menu}
        image="beverages.png"
      /> */}
    </>
  );
};

export default BeverageMenu;

export function loader() {
  return menuLoader(MenuCategory.BEVERAGE);
}
