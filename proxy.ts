import { NextResponse, type NextRequest } from "next/server";

// Removed old-site paths return 410 Gone (decision D1).
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.replace(/\/$/, "").startsWith("/ai-tools")) {
    return new NextResponse(null, { status: 410 });
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/ai-tools", "/ai-tools/:path*"],
};
