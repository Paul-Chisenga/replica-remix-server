import type { LoaderArgs } from "@remix-run/node";
import { useTypedLoaderData } from "remix-typedjson";
import LinkButton2 from "~/components/Button/LinkButton2";
import { getMenuList } from "~/controllers/admin.server";
import { parseMenuCategory } from "~/utils/helpers";

const MenuList = () => {
  const menu = useTypedLoaderData<typeof loader>();

  return (
    <div>
      <LinkButton2 to="new" className="tw-text-white">
        Add menu
      </LinkButton2>

      <div className="tw-py-6 tw-grid tw-grid-cols-2 tw-gap-6">
        {menu.map((item) => (
          <div
            key={item.id}
            className="border tw-border-[#eee] tw-rounded-md tw-p-8 tw-bg-white"
          >
            <h6 className="tw-capitalize tw-text-primary">
              {parseMenuCategory(item.category)}
            </h6>
            <h2 className="tw-font-cormorant tw-font-bold tw-text-dark tw-capitalize">
              {item.title}
            </h2>
            <h4 className="tw-font-jost tw-text-sm">{item.subtitle}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
export async function loader({ request }: LoaderArgs) {
  const menuList = getMenuList();
  return menuList;
}
