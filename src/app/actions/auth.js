"use server";

import { cookies } from "next/headers";
import { SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_dev";
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

function getOwnerCredentials() {
  const username =
    process.env.OWNER_USERNAME ||
    process.env.ADMIN_USERNAME ||
    "";
  const password =
    process.env.OWNER_PASSWORD ||
    process.env.ADMIN_PASSWORD ||
    "";

  return { username, password };
}

export async function login(formData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const credentials = getOwnerCredentials();

  if (
    username === credentials.username &&
    password === credentials.password &&
    credentials.username &&
    credentials.password
  ) {
    const token = await new SignJWT({ role: "owner" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(encodedSecret);

    const cookieStore = await cookies();
    cookieStore.set("owner_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return { success: true };
  }

  return { success: false, error: "Invalid username or password" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("owner_session");
  return { success: true };
}
