import type { ProductVariation } from "@prisma/client";
import { Role } from "@prisma/client";
import { hashPassword } from "~/services/bcrypt.server";
import prisma from "~/services/prisma.server";
import { parseCustomError } from "~/utils/helpers";

// ADMIN USERS
export async function createAdmin(payload: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: number;
}) {
  const user = await prisma.profile.findUnique({
    where: { email: payload.email },
  });

  if (user) {
    throw parseCustomError(
      "A User with this email exists already, choose another email address",
      422
    );
  }

  const password = await hashPassword(payload.password);

  await prisma.admin.create({
    data: {
      profile: {
        create: {
          email: payload.email,
          firstname: payload.firstname,
          lastname: payload.lastname,
          password,
          phone: payload.phone,
          role: Role.ADMIN,
        },
      },
    },
  });
}
// MENUS
export async function createMenu(
  adminProfileId: string,
  payload: {
    title: string;
    subtitle: string;
    category: string;
  }
) {
  const menu = await prisma.menu.findUnique({
    where: {
      title_category_subtitle: {
        title: payload.title,
        subtitle: payload.subtitle,
        category: payload.category as any,
      },
    },
  });

  if (menu) {
    throw parseCustomError("A simular menu exists", 422);
  }

  await prisma.menu.create({
    data: {
      title: payload.title,
      subtitle: payload.subtitle,
      category: payload.category as any,
      createdBy: {
        connect: {
          profileId: adminProfileId,
        },
      },
    },
  });
}
export async function getMenuList() {
  const list = await prisma.menu.findMany({ orderBy: { title: "asc" } });
  return list;
}

// PRODUCTS
export async function createProduct(
  adminProfileId: string,
  payload: {
    title: string;
    subtitle?: string;
    description?: string;
    price?: number;
    variations: ProductVariation[];
    menuId: string;
    parentProductId?: string;
  }
) {
  const product = await prisma.product.findUnique({
    where: { title: payload.title },
  });

  if (product) {
    throw parseCustomError(
      "A simular product is found, use another title",
      422
    );
  }

  await prisma.product.create({
    data: {
      title: payload.title,
      subtitle: payload.subtitle,
      description: payload.description,
      price: payload.price,
      varitions: payload.variations,
      menu: {
        connect: {
          id: payload.menuId,
        },
      },
      createdBy: {
        connect: {
          profileId: adminProfileId,
        },
      },
      parent: payload.parentProductId
        ? {
            connect: {
              id: payload.parentProductId,
            },
          }
        : undefined,
    },
  });
}
export async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      menu: true,
    },
  });

  return products;
}
