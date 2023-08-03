import { MenuCategory } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import Button2 from "~/components/Button/Button2";
import LinkButton2 from "~/components/Button/LinkButton2";
import prisma from "~/services/prisma.server";

const MENU_TITLES = [
  "YEAST_DONUTS",
  "SPECIAL_DONUTS",
  "ALL_OTHER_PASTRIES",
  "CAKES_CUPCAKES",
  "BREAD",
  "COFFE_TEA",
  "BEER",
  "WINE",
  "ADDITIONAL_BEV",
  "FRECH_JUICE",
  "COMBINATIONS",
  "OMELETTES",
  "SANDWICHES",
  "HEALTHIER_SIDE",
  "ALL_OTHER_A_LA_CARTE",
  "PANCAKES",
  "FRENCH_TOAST",
  "APPETIZERS",
  "SOUP_SALAD",
  "BURGERS",
  "SANDWICHES_LUNCH",
  "TACOS",
  "MAINS_1",
  "MAINS_2",
  "SIDES",
  "DESSERTS",
];

const Products = () => {
  const menu = useTypedLoaderData<typeof loader>();

  return (
    <div>
      <div className="tw-flex tw-gap-4">
        <LinkButton2 to="new" className="tw-text-white tw-mb-6">
          Add product
        </LinkButton2>
        <Form action="/admin/clean-submenu" method="DELETE">
          <Button2 className="tw-bg-red-500">Clean Submenu</Button2>
        </Form>
        {/* <Form action="/admin/seed-products" method="POST">
          <input type="hidden" name="menu" value={"YEAST_DONUTS"} />
          <Button2>Add all products</Button2>
        </Form> */}
      </div>

      <div className="tw-flex tw-flex-wrap tw-gap-4">
        {MENU_TITLES.map((item) => (
          <Form key={item} action="/admin/seed-products" method="POST">
            <input type="hidden" name="menu" value={item} />
            <Button2>{item}</Button2>
          </Form>
        ))}
      </div>

      <div className="tw-space-y-4 tw-py-10">
        <div className=" tw-grid tw-grid-cols-2 tw-gap-6">
          {menu.map((item) => (
            <div key={item.id} className="">
              <h1 className="tw-font-cormorant tw-font-bold tw-text-dark tw-capitalize">
                {item.title}
              </h1>
              {item.subtitle && (
                <p className="tw-text-dark tw-uppercase tw-tracking-wide">
                  ({item.subtitle})
                </p>
              )}
              <div className="border tw-border-[#eee] tw-rounded-md tw-p-8 tw-bg-white">
                {item.submenu.map((sub) => (
                  <div key={sub.id} className="mb-5">
                    {sub.title !== item.title && (
                      <p className="tw-text-dark tw-uppercase tw-tracking-wide">
                        {sub.title}
                      </p>
                    )}
                    <ul
                      className={`tw-m-0 tw-p-0 ${
                        sub.title === item.title ? "tw-list-none" : "tw-p-5"
                      }`}
                    >
                      {sub.products.map((prod) => (
                        <li key={prod.id}>
                          <div className="tw-flex tw-justify-between tw-flex-nowrap">
                            <div>
                              <h4 className="tw-font-cormorant tw-font-bold tw-text-dark tw-capitalize">
                                {prod.title}
                              </h4>
                              <h5 className="tw-font-jost tw-font-normal">
                                {prod.subtitle}
                              </h5>
                            </div>
                            <div className="tw-flex tw-gap-4">
                              {prod.prices.map((price, idx) => (
                                <h5
                                  key={idx}
                                  className="tw-font-bold tw-text-dark tw-flex-shrink-0 "
                                >
                                  {price}
                                  {/* <p className="tw-text-base tw-text-right">ksh</p> */}
                                </h5>
                              ))}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

export async function loader({ request }: LoaderArgs) {
  const menu = await prisma.menu.findMany({
    where: {
      category: MenuCategory.BREAKFAST,
    },
    include: {
      submenu: {
        include: {
          products: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  console.log(menu.filter((item) => item.title === "healthier side"));
  // const products = getProducts();
  return menu;
}
