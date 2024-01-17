import { Role } from "@prisma/client";
import { hashPassword } from "~/services/bcrypt.server";
import { deleteFile, uploadFile } from "~/services/files.server";
import prisma from "~/services/prisma.server";
import { parseCustomError } from "~/utils/helpers";
import type { AttachmentPayload, ProductPayload } from "~/utils/types";

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
    category: string;
  }
) {
  const menu = await prisma.menuItem.findUnique({
    where: {
      title_category: {
        title: payload.title,
        category: payload.category as any,
      },
    },
  });

  if (menu) {
    throw parseCustomError("A simular menu exists", 422);
  }

  await prisma.menuItem.create({
    data: {
      title: payload.title,
      category: payload.category as any,
    },
  });
}
export async function updateMenu(
  adminProfileId: string,
  menuId: string,
  payload: {
    title: string;
    category: string;
  }
) {
  await prisma.menuItem.update({
    where: {
      id: menuId,
    },
    data: {
      title: payload.title,
      category: payload.category as any,
    },
  });
}
export async function getMenuList() {
  const list = await prisma.menuItem.findMany({
    // orderBy: { title: "asc" },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      products: true,
    },
  });
  return list;
}

export async function createProduct(
  adminProfileId: string,
  payload: ProductPayload
) {
  const product = await prisma.product.findUnique({
    where: {
      title_menuItemId: { title: payload.title, menuItemId: payload.menuId },
    },
  });
  if (product) {
    throw parseCustomError(
      "A product with title is found. use another title",
      422
    );
  }

  let image: AttachmentPayload | undefined;
  if (payload.image) {
    if (payload.image.size > 0) {
      const key = await uploadFile(payload.image);
      image = {
        ext: payload.image.type,
        key,
        name: payload.image.name,
        size: payload.image.size,
      };
    }
  }

  try {
    await prisma.product.create({
      data: {
        title: payload.title,
        description: payload.description,
        price: payload.price,
        menuItemId: payload.menuId,
        choices: payload.choices,
        image: image ? image.key : undefined,
        meta: { vegeterian: !!payload.isVegeterian },
      },
    });
  } catch (error) {
    if (image) {
      deleteFile(image.key).catch(() => {});
    }

    throw error;
  }
}
export async function updateProduct(
  adminProfileId: string,
  productId: string,
  payload: ProductPayload
) {
  const product = await prisma.product.findUniqueOrThrow({
    where: {
      id: productId,
    },
  });

  let image: AttachmentPayload | undefined;
  if (payload.image) {
    if (payload.image.size > 0) {
      const key = await uploadFile(payload.image);
      image = {
        ext: payload.image.type,
        key,
        name: payload.image.name,
        size: payload.image.size,
      };
    }
  }

  try {
    await prisma.product.update({
      where: { id: productId },
      data: {
        title: payload.title,
        description: payload.description,
        price: payload.price,
        menuItemId: payload.menuId,
        choices: payload.choices,
        image: image ? image.key : undefined,
        meta: {
          ...(product.meta as any),
          vegeterian: !!payload.isVegeterian,
        },
      },
    });
    if (product.image && image) {
      deleteFile(product.image).catch(() => {});
    }
  } catch (error) {
    if (image) {
      deleteFile(image.key).catch(() => {});
    }
    throw error;
  }
}
export async function uploadMenuImage(
  adminProfileId: string,
  payload: { menuId: string; image: File }
) {
  const products = await prisma.product.findMany({
    where: {
      menuItemId: payload.menuId,
      image: { isSet: false },
    },
  });

  const key = await uploadFile(payload.image);
  const image: AttachmentPayload = {
    ext: payload.image.type,
    key,
    name: payload.image.name,
    size: payload.image.size,
  };

  try {
    await prisma.$transaction(
      products.map((product) =>
        prisma.product.update({
          where: { id: product.id },
          data: { image: image.key },
        })
      )
    );
  } catch (error) {
    deleteFile(image.key).catch(() => {});
    throw error;
  }
}
export async function deleteProduct(adminProfileId: string, productId: string) {
  const deletedProd = await prisma.product.delete({
    where: { id: productId },
  });
  if (deletedProd.image) {
    deleteFile(deletedProd.image).catch(() => {});
  }
}
export async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}
