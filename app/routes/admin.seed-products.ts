import type { ProductPrice } from "@prisma/client";
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
  HEALTHIER_SIDE,
  OMELETTES,
  PANCAKES,
  SANDWICHES,
} from "~/data/breakfast";
import { KIDS_BREACK_FAST, KIDS_LUNCH } from "~/data/kids-menu";
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
import type { SEED } from "~/utils/types";

// HELPERS
const createProduct = async (payload: {
  adminProfileId: string;
  menuTitle: string;
  menuCat: MenuCategory;
  menuSubtitle?: string;
  subMenuTitle?: string;
  products: SEED[];
}) => {
  const {
    adminProfileId,
    menuTitle,
    subMenuTitle,
    menuCat,
    menuSubtitle,
    products,
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
        let title = "";
        let subtitle: string | undefined;
        if (Array.isArray(prod.title)) {
          title = prod.title[0];
          subtitle = prod.title[1];
        } else {
          title = prod.title;
        }

        const prices: ProductPrice[] = Array.isArray(prod.prices)
          ? prod.prices.map((item) => ({ label: item[0], value: item[1] }))
          : [{ label: "std", value: prod.prices }];

        return {
          title: title.trim().toLowerCase(),
          subtitle: subtitle?.trim().toLowerCase(),
          prices: prices,
          description:
            "Nulla facilisi. In lacinia eu odio ut iaculis. Vivamus cursus commodo libero vel porttitor.",
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
        products: YEAST_DONUTS,
      });
      break;

    case "SPECIAL_DONUTS":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "pastries",
        menuCat: MenuCategory.BAKERY,
        subMenuTitle: "special donuts",
        products: SPECIAL_DONUTS,
      });
      break;
    case "ALL_OTHER_PASTRIES":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "pastries",
        menuCat: MenuCategory.BAKERY,
        products: PASTRIES,
      });
      break;
    case "CAKES_CUPCAKES":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "cakes & cupcakes",
        menuCat: MenuCategory.BAKERY,
        products: CAKES_CUPCAKES,
      });
      break;
    case "BREAD":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "bread",
        menuCat: MenuCategory.BAKERY,
        products: BREAD,
      });
      break;
    case "COFFE_TEA":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "coffee & tea",
        menuCat: MenuCategory.BEVARAGE,
        products: COFFE_TEA,
      });
      break;
    case "BEER":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "beer",
        menuCat: MenuCategory.BEVARAGE,
        products: BEER,
      });
      break;
    case "WINE":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "wine",
        menuCat: MenuCategory.BEVARAGE,
        products: WINE,
      });
      break;
    case "ADDITIONAL_BEV":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "additional beverages",
        menuCat: MenuCategory.BEVARAGE,
        products: ADDITIONAL_BEV,
      });
      break;
    case "FRECH_JUICE":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "fresh juice",
        menuCat: MenuCategory.BEVARAGE,
        products: FRECH_JUICE,
      });
      break;

    // BREAKFAST
    case "COMBINATIONS":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "combinations",
        menuCat: MenuCategory.BREAKFAST,
        products: COMBINATIONS,
      });
      break;
    case "OMELETTES":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "omelettes",
        menuCat: MenuCategory.BREAKFAST,
        products: OMELETTES,
      });
      break;
    case "SANDWICHES":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "sandwiches",
        menuCat: MenuCategory.BREAKFAST,
        products: SANDWICHES,
      });
      break;
    case "HEALTHIER_SIDE":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "healthier side",
        menuCat: MenuCategory.BREAKFAST,
        products: HEALTHIER_SIDE,
      });
      break;
    case "ALL_OTHER_A_LA_CARTE":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "a la carte",
        menuCat: MenuCategory.BREAKFAST,
        products: A_LA_CARTE,
      });
      break;
    case "PANCAKES":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "a la carte",
        subMenuTitle: "pancakes",
        menuCat: MenuCategory.BREAKFAST,
        products: PANCAKES,
      });
      break;
    // case "FRENCH_TOAST":
    //   await createProduct({
    //     adminProfileId: session.profileId,
    //     menuTitle: "a la carte",
    //     subMenuTitle: "french toast",
    //     menuCat: MenuCategory.BREAKFAST,
    //     products: FRENCH_TOAST,
    //   });
    //   break;

    // LUNCH AND DINNER
    case "APPETIZERS":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "appetizers",
        menuCat: MenuCategory.FOOD,
        products: APPETIZERS,
      });
      break;
    case "SOUP_SALAD":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "soup & salad",
        menuCat: MenuCategory.FOOD,
        products: SOUP_SALAD,
      });
      break;
    case "BURGERS":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "burgers",
        menuCat: MenuCategory.FOOD,
        products: BURGERS,
      });
      break;
    case "SANDWICHES_LUNCH":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "sandwiches",
        menuCat: MenuCategory.FOOD,
        products: SANDWICHES_LUNCH,
      });
      break;
    case "TACOS":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "sandwiches",
        subMenuTitle: "tacos",
        menuCat: MenuCategory.FOOD,
        products: TACOS,
      });
      break;

    case "MAINS_1":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "mains",
        menuSubtitle: "includes 2 side item",
        menuCat: MenuCategory.FOOD,
        products: MAINS_1,
      });
      break;
    case "MAINS_2":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "mains",
        menuSubtitle: "served with choice of bread",
        menuCat: MenuCategory.FOOD,
        products: MAINS_2,
      });
      break;
    case "SIDES":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "sides",
        menuCat: MenuCategory.FOOD,
        products: SIDES,
      });
      break;
    case "DESSERTS":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "desserts",
        menuCat: MenuCategory.FOOD,
        products: DESSERTS,
      });
      break;

    // KIDS
    case "KIDS_BREAKFAST":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "kids breakfast",
        menuCat: MenuCategory.BREAKFAST,
        products: KIDS_BREACK_FAST,
      });
      break;
    case "KIDS_LUNCH":
      await createProduct({
        adminProfileId: session.profileId,
        menuTitle: "kids lunch/dinner",
        menuCat: MenuCategory.FOOD,
        products: KIDS_LUNCH,
      });
      break;

    default:
      throw new Error("NO MENU TYPE PROVIDED");
  }

  return redirect("/admin/products");
}
