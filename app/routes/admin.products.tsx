import type { LoaderArgs } from "@remix-run/node";
import { Form, Link, Outlet, useNavigation } from "@remix-run/react";
import { useTypedLoaderData } from "remix-typedjson";
import Button2 from "~/components/Button/Button2";
import LinkButton2 from "~/components/Button/LinkButton2";
import prisma from "~/services/prisma.server";
import { parseProdImageUrl } from "~/utils/helpers";

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
  "APPETIZERS",
  "SOUP_SALAD",
  "BURGERS",
  "SANDWICHES_LUNCH",
  "TACOS",
  "MAINS_1",
  "MAINS_2",
  "SIDES",
  "DESSERTS",
  "KIDS_BREAKFAST",
  "KIDS_LUNCH",
];

const Products = () => {
  const menu = useTypedLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <>
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
              <div className="border tw-border-[#eee] tw-rounded-md tw-p-8 tw-bg-white">
                {item.products.map((prod) => (
                  <div key={prod.id}>
                    {prod.images.map((image) => (
                      <img
                        key={image.key}
                        src={parseProdImageUrl([image])}
                        alt=""
                        style={{ maxWidth: 200, maxHeight: 100 }}
                        className="tw-rounded tw-object-contain"
                      />
                    ))}
                    <div className="tw-flex tw-justify-between tw-flex-nowrap">
                      <div>
                        <h4 className="tw-font-cormorant tw-font-bold tw-text-dark tw-capitalize">
                          {prod.title}
                        </h4>
                        <h5 className="tw-font-jost tw-font-normal">
                          {prod.description}
                        </h5>
                      </div>
                      <h5 className="tw-font-bold tw-text-dark tw-flex-shrink-0 ">
                        {prod.price}
                      </h5>
                    </div>
                    <br />
                    <div className="tw-flex tw-justify-between tw-flex-wrap tw-gap-2 tw-pb-8">
                      <Link
                        to={`new?pId=${prod.id}`}
                        className="primary-btn8 lg--btn btn-primary-fill"
                      >
                        Edit
                      </Link>
                      <Form action={`${prod.id}`} method="DELETE">
                        <button className="primary-btn8 btn tw-bg-red-500 hover:tw-text-white">
                          {navigation.state === "submitting"
                            ? "Deletting.."
                            : "Delete"}
                        </button>
                      </Form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Products;

export async function loader({ request }: LoaderArgs) {
  const menu = await prisma.menuItem.findMany({
    include: {
      products: {
        include: {
          images: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return menu;
}
