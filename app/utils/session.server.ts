import { User } from "@prisma/client";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import bcrypt from "bcryptjs";

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const cookieSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "HC_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

function getUserSession(request: Request) {
  return cookieSessionStorage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") {
    return null;
  }
  return userId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request);

  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await cookieSessionStorage.getSession();

  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await cookieSessionStorage.commitSession(session),
    },
  });
}

export async function loginUser(usernameOrEmail: string, password: string) {
  let user: User | null = null;

  const field = /\@/.test(usernameOrEmail)
    ? { email: usernameOrEmail }
    : { username: usernameOrEmail };

  user = await db.user.findUnique({ where: { ...field } });

  if (!user) {
    return null;
  }

  const isValidPassowrd = await bcrypt.compare(password, user.password);

  if (!isValidPassowrd) {
    return null;
  }

  return { id: user.id, usernameOrEmail };
}

export async function logoutUser(request: Request) {
  const session = await getUserSession(request);

  return redirect("/login", {
    headers: {
      "Set-Cookie": await cookieSessionStorage.destroySession(session),
    },
  });
}
