import type { Role } from "@prisma/client";
import { createCookieSessionStorage, json } from "@remix-run/node";
import { redirect } from "react-router";
import { verifyPassword } from "~/services/bcrypt.server";
import prisma from "~/services/prisma.server";
import type { AuthSession } from "~/utils/types";

const SESSION_SECRET = process.env.SESSION_SECRET as string;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    httpOnly: true,
  },
});

async function createUserSession(payload: AuthSession, redirectPath: string) {
  const session = await sessionStorage.getSession();
  session.set("user", JSON.stringify(payload));
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const sessionUser = session.get("user");

  if (!sessionUser) {
    return null;
  }

  const user = JSON.parse(sessionUser) as AuthSession;
  if (!user) {
    return null;
  }

  return user;
}

export async function requireUserSession(
  request: Request,
  role?: Role[],
  cbkUrl?: string
) {
  const session = await getUserSession(request);
  if (!session) {
    let nextUrl = "/login";
    if (cbkUrl) {
      nextUrl += "?next=" + cbkUrl;
    }
    throw redirect(nextUrl);
  }

  if (role && !role.includes(session.role)) {
    throw json(
      { message: "You are not allowed to access this resource" },
      { status: 403, statusText: "Forbidden" }
    );
  }

  return session;
}

export async function destroyUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function login(
  credentials: { email: string; password: string },
  redirectPath: string
) {
  const user = await prisma.profile.findUnique({
    where: {
      email: credentials.email,
    },
  });

  const error = {
    message: "Invalid email or password",
    status: 422,
  };

  if (!user) {
    throw error;
  }

  const isValidPassword = await verifyPassword(
    credentials.password,
    user.password
  );

  if (!isValidPassword) {
    throw error;
  }

  return createUserSession(
    {
      email: user.email,
      role: user.role,
      profileId: user.id,
    },
    redirectPath
  );
}
