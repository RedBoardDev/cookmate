import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/r/"];
const STATIC_PREFIXES = ["/_next/", "/api/", "/favicon", "/icon", "/avatars/", "/profile-avatar.svg"];
const SESSION_COOKIE = "better-auth.session_token";

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

function isStaticPath(pathname: string): boolean {
  return STATIC_PREFIXES.some((p) => pathname.startsWith(p));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticPath(pathname) || isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(SESSION_COOKIE);

  if (!sessionToken?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|avatars|profile-avatar\\.svg).*)"],
};
