import invariant from "invariant";
import type { MyObject } from "./types";
import { MenuCategory } from "@prisma/client";

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
}
export function requiredFieldValidate(
  data: MyObject<string>,
  fields: string[]
) {
  const errors: MyObject<string | null> = {};

  fields.forEach((field) => {
    errors[field] = data[field] ? null : "This field is required";
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
    case MenuCategory.BEVARAGE:
      return "Beverage";
    case MenuCategory.BREAKFAST:
      return "Breakfast";
    case MenuCategory.FOOD:
      return "Lunch/Dinner";
    default:
      return "";
  }
}
