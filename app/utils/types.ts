import type { Product, Role } from "@prisma/client";
import { Prisma } from "@prisma/client";
import type { ReactNode } from "react";

export const REPLICA_POSITION = {
  lat: -1.2164003760804667,
  lng: 36.79986749635304,
};

export const MAP_ID = "92607597270be4cc";
export type MyPlaceResult = google.maps.LatLngLiteral & { name: string };
export type MyDistanceMatrix = { duration: string; distance: string };

export interface AuthSession {
  email: string;
  profileId: string;
  role: Role;
}
export type MyObject<V> = { [key: string]: V };
export interface AttachmentPayload {
  ext: string;
  key: string;
  name: string;
  size: number;
}
export interface MyActionData {
  error?: string;
  errors?: MyObject<string | null>;
}
export interface InitProps {
  children?: ReactNode;
  className?: string;
}

export type SEED = {
  title: string | string[];
  prices: number | [string, number][];
};
export type HandledOptions = {
  [optionId: string]: {
    count: number;
  };
};

export type HandledChoices = {
  [choiceId: string]: { [optionId: string]: { count: number } };
};

// PAYLOADS
export interface ProductPayload
  extends Pick<Product, "choices" | "title" | "price" | "description"> {
  menuId: string;
  images: File[];
  isVegeterian?: boolean;
}

// PRISMA TYPES
const productWithImages = Prisma.validator<Prisma.ProductArgs>()({
  include: {
    images: true,
  },
});
export type ProductWithImages = Prisma.ProductGetPayload<
  typeof productWithImages
>;
const riderWithProfile = Prisma.validator<Prisma.RiderDefaultArgs>()({
  include: {
    profile: true,
  },
});
export type RiderWithProfile = Prisma.RiderGetPayload<typeof riderWithProfile>;
