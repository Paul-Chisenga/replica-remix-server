import { MenuCategory, Role } from "@prisma/client";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "remix-typedjson";
import { requireUserSession } from "~/controllers/auth.server";
import {
  ADDITIONAL_BEV,
  BEER,
  BREAD,
  CAKES_CUPCAKES,
  COFFE_TEA,
  FRECH_JUICE,
  PASTRIES,
  SPECIAL_DONUTS,
  WINE,
  YEAST_DONUTS,
} from "~/data/beverages-and-bakery";
import {
  A_LA_CARTE,
  COMBINATIONS,
  FRENCH_TOAST,
  HEALTHIER_SIDE,
  OMELETTES,
  PANCAKES,
  SANDWICHES,
} from "~/data/breakfast";
import {
  APPETIZERS,
  BURGERS,
  DESSERTS,
  MAINS_1,
  MAINS_2,
  SANDWICHES_LUNCH,
  SIDES,
  SOUP_SALAD,
  TACOS,
} from "~/data/lunch-dinner";
import prisma from "~/services/prisma.server";

// HELPERS
const createProduct = async (payload: {
  adminProfileId: string;
  menuTitle: string;
  menuCat: MenuCategory;
  menuSubtitle?: string;
  subMenuTitle?: string;
  products: string[] | string[][];
  prices: number[];
}) => {
  const {
    adminProfileId,
    menuTitle,
    prices,
    products,
    subMenuTitle,
    menuCat,
    menuSubtitle,
  } = payload;
  await prisma.$transaction(async (tx) => {
    const admin = await tx.admin.findUniqueOrThrow({
      where: {
        profileId: adminProfileId,
      },
    });
    const menu = await tx.menu.findFirstOrThrow({
      where: {
        title: menuTitle.trim().toLowerCase(),
        category: menuCat,
        subtitle: menuSubtitle,
      },
    });
    // if submenu doesnt exist create it
    const subMenu =
      (await tx.subMenu.findUnique({
        where: {
          title_menuId: {
            title: subMenuTitle
              ? subMenuTitle.trim().toLowerCase()
              : menu.title,
            menuId: menu.id,
          },
        },
      })) ??
      (await tx.subMenu.create({
        data: {
          menuId: menu.id,
          title: subMenuTitle ? subMenuTitle.trim().toLowerCase() : menu.title,
        },
      }));
    await tx.product.createMany({
      data: products.map((prod) => {
        if (Array.isArray(prod)) {
          return {
            title: prod[0].trim().toLowerCase(),
            description:
              "Nulla facilisi. In lacinia eu odio ut iaculis. Vivamus cursus commodo libero vel porttitor.",
            prices: prices,
            adminId: admin.id,
            subMenuId: subMenu.id,
            subtitle: prod[1].trim().toLowerCase(),
          };
        }

        return {
          title: prod.trim().toLowerCase(),
          description:
            "Nulla facilisi. In lacinia eu odio ut iaculis. Vivamus cursus commodo libero vel porttitor.",
          prices: prices,
          adminId: admin.id,
          subMenuId: subMenu.id,
        };
      }),
    });
  });
};

export async function action({ request }: ActionArgs) {
  const session = await requireUserSession(request, [Role.ADMIN]);
  const formData = await request.formData();
  const product = formData.get("menu");

  if (typeof product !== "string") {
    throw new Error("Invalid request");
  }

  switch (product) {
    // PASTRIES
    case "YEAST_DONUTS":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "pastries",
        menuCat: MenuCategory.BAKERY,
        subMenuTitle: "yeast donuts",
        prices: [250],
        products: YEAST_DONUTS,
      });
      break;

    case "SPECIAL_DONUTS":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "pastries",
        menuCat: MenuCategory.BAKERY,
        subMenuTitle: "special donuts",
        prices: [250],
        products: SPECIAL_DONUTS,
      });
      break;
    case "ALL_OTHER_PASTRIES":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "pastries",
        menuCat: MenuCategory.BAKERY,
        prices: [250],
        products: PASTRIES,
      });
      break;
    case "CAKES_CUPCAKES":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "cakes & cupcakes",
        menuCat: MenuCategory.BAKERY,
        prices: [250],
        products: CAKES_CUPCAKES,
      });
      break;
    case "BREAD":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "bread",
        menuCat: MenuCategory.BAKERY,
        prices: [250],
        products: BREAD,
      });
      break;
    case "COFFE_TEA":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "coffee & tea",
        menuCat: MenuCategory.BEVARAGE,
        prices: [250, 250],
        products: COFFE_TEA,
      });
      break;
    case "BEER":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "beer",
        menuCat: MenuCategory.BEVARAGE,
        prices: [250],
        products: BEER,
      });
      break;
    case "WINE":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "wine",
        menuCat: MenuCategory.BEVARAGE,
        prices: [250, 1050],
        products: WINE,
      });
      break;
    case "ADDITIONAL_BEV":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "additional beverages",
        menuCat: MenuCategory.BEVARAGE,
        prices: [250],
        products: ADDITIONAL_BEV,
      });
      break;
    case "FRECH_JUICE":
      await prisma.menu.update({
        where: {
          title_category_subtitle: {
            title: "fresh & juices",
            category: MenuCategory.BEVARAGE,
            subtitle: "",
          },
        },
        data: {
          title: "fresh juice",
        },
      });
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "fresh juice",
        menuCat: MenuCategory.BEVARAGE,
        prices: [250],
        products: FRECH_JUICE,
      });
      break;

    // BREAKFAST
    case "COMBINATIONS":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "combinations",
        menuCat: MenuCategory.BREAKFAST,
        prices: [850],
        products: COMBINATIONS,
      });
      break;
    case "OMELETTES":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "omelettes",
        menuCat: MenuCategory.BREAKFAST,
        prices: [850],
        products: OMELETTES,
      });
      break;
    case "SANDWICHES":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "sandwiches",
        menuCat: MenuCategory.BREAKFAST,
        prices: [850],
        products: SANDWICHES,
      });
      break;
    case "HEALTHIER_SIDE":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "healthier side",
        menuCat: MenuCategory.BREAKFAST,
        prices: [850],
        products: HEALTHIER_SIDE,
      });
      break;
    case "ALL_OTHER_A_LA_CARTE":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "a la carte",
        menuCat: MenuCategory.BREAKFAST,
        prices: [650],
        products: A_LA_CARTE,
      });
      break;
    case "PANCAKES":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "a la carte",
        subMenuTitle: "pancakes",
        menuCat: MenuCategory.BREAKFAST,
        prices: [650],
        products: PANCAKES,
      });
      break;
    case "FRENCH_TOAST":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "a la carte",
        subMenuTitle: "french toast",
        menuCat: MenuCategory.BREAKFAST,
        prices: [850],
        products: FRENCH_TOAST,
      });
      break;

    // LUNCH AND DINNER
    case "APPETIZERS":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "appetizers",
        menuCat: MenuCategory.FOOD,
        prices: [850],
        products: APPETIZERS,
      });
      break;
    case "SOUP_SALAD":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "soup & salad",
        menuCat: MenuCategory.FOOD,
        prices: [700],
        products: SOUP_SALAD,
      });
      break;
    case "BURGERS":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "burgers",
        menuCat: MenuCategory.FOOD,
        prices: [700],
        products: BURGERS,
      });
      break;
    case "SANDWICHES_LUNCH":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "sandwiches",
        menuCat: MenuCategory.FOOD,
        prices: [850],
        products: SANDWICHES_LUNCH,
      });
      break;
    case "TACOS":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "sandwiches",
        subMenuTitle: "tacos",
        menuCat: MenuCategory.FOOD,
        prices: [850],
        products: TACOS,
      });
      break;

    case "MAINS_1":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "mains",
        menuSubtitle: "includes 2 side item",
        menuCat: MenuCategory.FOOD,
        prices: [850],
        products: MAINS_1,
      });
      break;
    case "MAINS_2":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "mains",
        menuSubtitle: "served with choice of bread",
        menuCat: MenuCategory.FOOD,
        prices: [850],
        products: MAINS_2,
      });
      break;
    case "SIDES":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "sides",
        menuCat: MenuCategory.FOOD,
        prices: [250],
        products: SIDES,
      });
      break;
    case "DESSERTS":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "desserts",
        menuCat: MenuCategory.FOOD,
        prices: [700],
        products: DESSERTS,
      });
      break;

    default:
      throw new Error("NO MENU TYPE PROVIDED");
  }

  return redirect("/admin/products");
}
