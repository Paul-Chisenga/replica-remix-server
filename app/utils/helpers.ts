import invariant from "invariant";
import type { MyObject } from "./types";
import { MenuCategory } from "@prisma/client";
import prisma from "~/services/prisma.server";
import { format } from "date-fns";

// DATES
export function formatDate(date: string | Date) {
  return format(new Date(date), "dd MMM, yyyy");
}
export function formatTime(date: string | Date) {
  return format(new Date(date), "hh:mm a");
}
export function formatDateTime(date: string | Date) {
  return format(new Date(date), "dd MMM, yyyy - hh:mm a");
}

//RANDOM NUMBERS
export function randomNumber(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ERRORS
export function parseCustomError(message: string, status: number) {
  return {
    message,
    status,
  };
}

// SERVER VALIDATION
export function invariantValidate(
  data: { [key: string]: any },
  exclude?: string[]
) {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (exclude && exclude.includes(key)) continue;
      invariant(typeof element === "string", "Invalid Request");
    }
  }

  return data as MyObject<string>;
}
export function requiredFieldValidate(
  data: MyObject<string>,
  fields: string[],
  ...customValidators: (() => MyObject<null | string>)[]
) {
  let errors: MyObject<string | null> = {};

  fields.forEach((field) => {
    errors[field] = data[field] ? null : "This field is required";
  });
  customValidators.forEach((validator) => {
    errors = { ...errors, ...validator() };
  });

  return errors;
}
export function hasErrors(errors: MyObject<string | null>) {
  return Object.values(errors).some((errorMessage) => errorMessage);
}

// MENU
export function parseMenuCategory(cat: MenuCategory) {
  switch (cat) {
    case MenuCategory.BAKERY:
      return "Bakery";
    case MenuCategory.BEVERAGE:
      return "Beverage";
    case MenuCategory.BREAKFAST:
      return "Breakfast";
    case MenuCategory.FOOD:
      return "Lunch/Dinner";
    default:
      return "";
  }
}

// MISC
export class MyFormData {
  formData: FormData;
  constructor(formData: FormData) {
    this.formData = formData;
  }

  get(field: string) {
    return this.formData.get(field) as string;
  }
  getAll(field: string) {
    return this.formData.getAll(field) as string[];
  }
}
export function parseProductVariation(prices: any[], selectedPrice: number) {
  let variationLabel = "";
  const price = prices.find((price) => price.value === selectedPrice);

  if (price && price.label !== "std") {
    variationLabel = price.label;
  }

  return variationLabel;
}
export function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// COMMON DB OP
export async function menuLoader(category: MenuCategory) {
  try {
    const menu = await prisma.menuItem.findMany({
      where: {
        category,
      },
      include: {
        products: true,
      },
    });
    return menu;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}
// PRODUCTS
export function parseProdImageUrl(imageKey: string | null) {
  if (imageKey) {
    return `/product/${imageKey}`;
  }
  return "/images/dark-logo.png";
}
