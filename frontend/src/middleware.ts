import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("jwt");

  // Debugging: This will print in your VS Code terminal
  console.log("Checking token for:", request.nextUrl.pathname);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  // This matcher protects EVERYTHING except the items in parentheses
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};
