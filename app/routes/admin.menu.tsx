import { MenuCategory } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { Link, Outlet, useFetcher } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import DashboardPageHeader from "~/components/common/DashboardPageHeader";
import DualRingLoader from "~/components/indicators/DualRingLoader";
import Tab from "~/components/Tab/Tab";
import { getMenuList } from "~/controllers/admin.server";
import { parseMenuCategory } from "~/utils/helpers";

const MenuList = () => {
  const menu = useTypedLoaderData<typeof loader>();
  const fetcher = useFetcher();
  return (
    <>
      <DashboardPageHeader>Menu</DashboardPageHeader>
      <Link to={"create"} className="my-btn outline primary semi-rounded mb-20">
        Add menu
      </Link>
      <fetcher.Form action="clear" method="DELETE">
        <button className="my-btn text red semi-rounded mb-20">
          clear {fetcher.state === "submitting" && <DualRingLoader size={15} />}{" "}
        </button>
      </fetcher.Form>
      <Tab.Wrapper>
        <Tab.Header.Wrapper id="menuTabHeader">
          {[
            MenuCategory.FOOD,
            MenuCategory.BREAKFAST,
            MenuCategory.BAKERY,
            MenuCategory.BEVERAGE,
          ].map((mCat) => (
            <Tab.Header.Item
              key={mCat}
              id={mCat}
              defaultSelected={mCat === MenuCategory.FOOD}
            >
              {parseMenuCategory(mCat)}
            </Tab.Header.Item>
          ))}
        </Tab.Header.Wrapper>
        <Tab.Content.Wrapper id="menuTabContent">
          {[
            MenuCategory.FOOD,
            MenuCategory.BREAKFAST,
            MenuCategory.BAKERY,
            MenuCategory.BEVERAGE,
          ].map((mCat) => (
            <Tab.Content.Item
              key={mCat}
              id={mCat}
              defaultSelected={mCat === MenuCategory.FOOD}
            >
              <div className="table-wrapper">
                <table className="my-table table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Products</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {menu
                      .filter((m) => m.category === mCat)
                      .map((m) => (
                        <tr key={m.id}>
                          <td data-label="Title">{m.title}</td>
                          <td data-label="Category">
                            {parseMenuCategory(m.category)}
                          </td>
                          <td data-label="Products">{m.products.length}</td>
                          <td data-label="Edit">
                            <Link to={`${m.id}/edit`} className="icon">
                              <i className="bi bi-pencil"></i>
                            </Link>
                          </td>
                          <td data-label="Delete">
                            <div
                              className="icon"
                              // onClick={() => handleDelete(item.id)}
                            >
                              <i className="bi bi-x" />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Tab.Content.Item>
          ))}
        </Tab.Content.Wrapper>
      </Tab.Wrapper>

      <Outlet />
    </>
  );
};

export default MenuList;
export async function loader({ request }: LoaderArgs) {
  const menuList = getMenuList();
  return menuList;
}
