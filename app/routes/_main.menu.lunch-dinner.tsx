import { MenuCategory } from "@prisma/client";
import type { V2_MetaFunction } from "@remix-run/node";
import { useTypedLoaderData } from "remix-typedjson";
import Breadcrumb from "~/components/common/Breadcrumb";
import Menu1 from "~/components/menu/Menu1";
import { menuLoader } from "~/utils/helpers";

export const meta: V2_MetaFunction = () => {
  return [
    { title: " Lunch and Dinner - Replica restaurant" },
    {
      name: "description",
      content:
        "This page contains the lunch and dinner menu with serve at replica!",
    },
  ];
};

const LunchDinnerMenu = () => {
  const menu = useTypedLoaderData<typeof loader>();
  return (
    <>
      <Breadcrumb pageName="lunch-dinner" pageTitle="Lunch/Dinner Menu" />
      <Menu1
        category={MenuCategory.FOOD}
        menu={menu}
        image="lunch_dinner.png"
      />
    </>
  );
};

export default LunchDinnerMenu;

export function loader() {
  return menuLoader(MenuCategory.FOOD);
}
