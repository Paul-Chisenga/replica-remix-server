import type { LoaderArgs } from "@remix-run/node";
import { useTypedLoaderData } from "remix-typedjson";
import LinkButton2 from "~/components/Button/LinkButton2";
import { getProducts } from "~/controllers/admin.server";
import { parseMenuCategory } from "~/utils/helpers";

const Products = () => {
  const products = useTypedLoaderData<typeof loader>();

  return (
    <div>
      <LinkButton2 to="new" className="tw-text-white">
        Add product
      </LinkButton2>

      <div className="tw-py-6 tw-grid tw-grid-cols-2 tw-gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="border tw-border-[#eee] tw-rounded-md tw-p-8 tw-bg-white"
          >
            <div className="tw-flex tw-justify-between tw-flex-nowrap">
              <div>
                <h1 className="tw-font-cormorant tw-font-bold tw-text-dark tw-capitalize">
                  {item.title}
                </h1>
                <h5 className="tw-font-jost tw-font-normal">{item.subtitle}</h5>
                <h4 className="tw-font-jost tw-text-sm tw-text-dark">
                  {item.description}
                </h4>
                <h6 className="tw-capitalize tw-flex tw-gap-4">
                  <div>
                    <p className="tw-text-dark">{item.subMenu.menu.title}</p>
                    <p>{item.subMenu.menu.subtitle}</p>
                  </div>
                  <span className="tw-flex-shrink-0  tw-text-primary tw-uppercase">
                    {parseMenuCategory(item.subMenu.menu.category)}
                  </span>
                </h6>
              </div>
              <div>
                <h1 className="tw-font-bold tw-text-dark tw-font-cormorant tw-flex-shrink-0">
                  {item.prices[0]}
                  <p className="tw-text-base tw-text-right">ksh</p>
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

export async function loader({ request }: LoaderArgs) {
  const products = getProducts();
  return products;
}
