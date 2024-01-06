import { Role } from "@prisma/client";
import { hashPassword } from "~/services/bcrypt.server";
import { deleteFiles, uploadFile } from "~/services/files.server";
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
      meta: { createdBy: adminProfileId },
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
    where: { title: payload.title },
  });
  if (product) {
    throw parseCustomError(
      "A product with title is found, use another title",
      422
    );
  }

  const images: AttachmentPayload[] = [];
  for (let i = 0; i < payload.images.length; i++) {
    const file = payload.images[i];
    if (file.size <= 0) continue;
    const key = await uploadFile(file);
    images.push({
      ext: file.type,
      key,
      name: file.name,
      size: file.size,
    });
  }

  try {
    await prisma.product.create({
      data: {
        title: payload.title,
        description: payload.description,
        price: payload.price,
        menuItemId: payload.menuId,
        choices: payload.choices,
        images: { create: images },
        meta: {
          createdBy: adminProfileId,
          vegeterian: !!payload.isVegeterian,
        },
      },
    });
  } catch (error) {
    deleteFiles(images.map((item) => item.key)).catch(() => {});
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
    include: {
      images: true,
    },
  });

  const images: AttachmentPayload[] = [];
  for (let i = 0; i < payload.images.length; i++) {
    const file = payload.images[i];
    if (file.size <= 0) continue;
    const key = await uploadFile(file);
    images.push({
      ext: file.type,
      key,
      name: file.name,
      size: file.size,
    });
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
        images:
          images.length > 0 ? { deleteMany: {}, create: images } : undefined,
        meta: {
          ...(product.meta as any),
          updatedBy: adminProfileId,
          vegeterian: !!payload.isVegeterian,
        },
      },
    });
    if (images.length > 0) {
      deleteFiles(product.images.map((im) => im.key)).catch(() => {});
    }
  } catch (error) {
    deleteFiles(images.map((item) => item.key)).catch(() => {});
    throw error;
  }
}
export async function deleteProduct(adminProfileId: string, productId: string) {
  const deletedProd = await prisma.product.delete({
    where: { id: productId },
    include: { images: true },
  });
  if (deletedProd.images.length > 0) {
    deleteFiles(deletedProd.images.map((item) => item.key)).catch(() => {});
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
