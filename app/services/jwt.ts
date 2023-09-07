import jwt from "jsonwebtoken";

export function generateToken(payload: any, secret: string) {
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  return token;
}

export function verifyToken(token: string, secret: string) {
  const decodedToken = jwt.verify(token, secret);
  if (!decodedToken) {
    throw new Error("No payload found");
  }

  return decodedToken;
}
