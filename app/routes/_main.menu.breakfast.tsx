import { MenuCategory } from "@prisma/client";
import type { V2_MetaFunction } from "@remix-run/node";
import { useTypedLoaderData } from "remix-typedjson";
import Breadcrumb from "~/components/common/Breadcrumb";
import Menu1 from "~/components/menu/Menu1";
import { menuLoader } from "~/utils/helpers";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Breakfast - Replica restaurant" },
    {
      name: "description",
      content: "This page contains the breakfast menu with serve at replica!",
    },
  ];
};

const BreakFastMenu = () => {
  const menu = useTypedLoaderData<typeof loader>();
  return (
    <>
      <Breadcrumb pageName="breakfast" pageTitle="Breakfast Menu" />
      <Menu1
        category={MenuCategory.BREAKFAST}
        menu={menu}
        image="breakfast.png"
      />
    </>
  );
};

export default BreakFastMenu;

export function loader() {
  return menuLoader(MenuCategory.BREAKFAST);
}
