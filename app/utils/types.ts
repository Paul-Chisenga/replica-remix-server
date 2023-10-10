import type { Role } from "@prisma/client";
import type { ReactNode } from "react";

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
