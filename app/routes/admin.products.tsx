import type { LoaderArgs } from "@remix-run/node";
import { Link, Outlet, useFetcher } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import DashboardPageHeader from "~/components/common/DashboardPageHeader";
import DualRingLoader from "~/components/indicators/DualRingLoader";
import prisma from "~/services/prisma.server";
import { parseMenuCategory, parseProdImageUrl } from "~/utils/helpers";

const Products = () => {
  const products = useTypedLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <>
      <DashboardPageHeader>Products</DashboardPageHeader>
      <Link to={"create"} className="my-btn outline primary semi-rounded mb-20">
        Add product
      </Link>
      <Link
        to={"upload"}
        className="my-btn text dark semi-rounded mb-20 tw-ml-5"
      >
        upload menu picture
      </Link>
      <fetcher.Form action="clear" method="DELETE">
        <button className="my-btn text red semi-rounded mb-20">
          clear {fetcher.state === "submitting" && <DualRingLoader size={15} />}{" "}
        </button>
      </fetcher.Form>
      <div className="table-wrapper">
        <table className="my-table table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Menu</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td data-label="Image">
                  <img src={parseProdImageUrl(product.image)} alt="" />
                </td>
                <td data-label="Title">
                  <p className="tw-text-dark">{product.title}</p>
                  <p>{product.description}</p>
                </td>
                <td data-label="Menu">
                  <p className="tw-text-dark">{product.menuItem.title}</p>
                  <p>{parseMenuCategory(product.menuItem.category)}</p>
                </td>
                <td data-label="Price">ksh{product.price}</td>
                <td data-label="Edit">
                  <Link to={`${product.id}/edit`} className="icon">
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
      <Outlet />
    </>
  );
};

export default Products;

export async function loader({ request }: LoaderArgs) {
  const menu = await prisma.product.findMany({
    include: {
      menuItem: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return menu;
}
