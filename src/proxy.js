import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_for_dev";
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Protect /owner/dashboard
  if (pathname.startsWith("/owner/dashboard")) {
    const token = request.cookies.get("owner_session")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/owner/login", request.url));
    }

    try {
      await jwtVerify(token, encodedSecret);
      return NextResponse.next();
    } catch {
      // Invalid token
      return NextResponse.redirect(new URL("/owner/login", request.url));
    }
  }

  // Redirect /owner/login to dashboard if already authenticated
  if (pathname === "/owner/login") {
    const token = request.cookies.get("owner_session")?.value;
    if (token) {
      try {
        await jwtVerify(token, encodedSecret);
        return NextResponse.redirect(new URL("/owner/dashboard", request.url));
      } catch {
        // Fall through to login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/:path*"],
};
