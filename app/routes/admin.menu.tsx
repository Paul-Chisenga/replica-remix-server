import type { LoaderArgs } from "@remix-run/node";
import { Form, Outlet } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import Button2 from "~/components/Button/Button2";
import LinkButton2 from "~/components/Button/LinkButton2";
import { getMenuList } from "~/controllers/admin.server";
import { parseMenuCategory } from "~/utils/helpers";

const MenuList = () => {
  const menu = useTypedLoaderData<typeof loader>();

  return (
    <div>
      <div className="tw-flex tw-gap-5">
        <LinkButton2 to="new" className="tw-text-white">
          Add menu
        </LinkButton2>
        <Form action="all" method="POST">
          <Button2 className="tw-text-white !tw-bg-yellow-500">Migrate</Button2>
        </Form>
        <Form action="clear" method="POST">
          <Button2 className="tw-text-white !tw-bg-red-500">Clear menu</Button2>
        </Form>
      </div>

      <div className="tw-py-6 tw-grid tw-grid-cols-2 tw-gap-6">
        <Outlet />
        <div className="tw-space-y-4">
          {menu.map((item) => (
            <div
              key={item.id}
              className="border tw-border-[#eee] tw-rounded-md tw-px-6 tw-py-2 tw-bg-white"
            >
              <div className="tw-flex tw-gap-2 tw-items-center">
                <i className="bi bi-pencil-square tw-text-base"></i>
                <i className="bi bi-trash2 tw-text-lg tw-text-red-500"></i>
              </div>
              <div className="tw-flex tw-justify-between">
                <div>
                  <h2 className="tw-font-cormorant tw-font-bold tw-text-dark tw-capitalize">
                    {item.title}
                  </h2>
                  <h6 className="tw-text-dark/80 tw-lowercase tw-mt-2 tw-text-sm">
                    {item.products.length} Products
                  </h6>
                </div>
                <h6 className="tw-capitalize tw-text-primary">
                  {parseMenuCategory(item.category)}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuList;
export async function loader({ request }: LoaderArgs) {
  const menuList = getMenuList();
  return menuList;
}
