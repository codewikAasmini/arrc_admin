import { NextRequest, NextResponse } from "next/server";

const FORCE_CAPITAL_URL = false;   // as requirement true or false only 

const LOWER_TO_CAPITAL: Record<string, string> = {
  "/dashboard": "/dashboard",

};

const CAPITAL_TO_LOWER: Record<string, string> = {
  "/Dashboard": "/dashboard",
 
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (FORCE_CAPITAL_URL && LOWER_TO_CAPITAL[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = LOWER_TO_CAPITAL[pathname];
    return NextResponse.redirect(url, 307);
  }

  if (CAPITAL_TO_LOWER[pathname]) {
    const url = request.nextUrl.clone();
    url.pathname = CAPITAL_TO_LOWER[pathname];
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};



