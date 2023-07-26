import type { Role } from "@prisma/client";

export interface AuthSession {
  email: string;
  profileId: string;
  role: Role;
}
export type MyObject<V> = { [key: string]: V };
export interface PicturePayload {
  ext: string;
  key: string;
  name: string;
  size: number;
}
export interface MyActionData {
  error?: string;
  errors?: MyObject<string | null>;
}
