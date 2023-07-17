import { compare, hash } from "bcryptjs";

export async function hashPassword(pwd: string) {
  const hashedPassword = await hash(pwd, 12);
  return hashedPassword;
}

export async function verifyPassword(pwd: string, hashedPwd: string) {
  const isValid = await compare(pwd, hashedPwd);
  return isValid;
}
