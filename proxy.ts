import { NextResponse, type NextRequest } from "next/server";
import { SITE_INDEXABLE } from "@/lib/site-config";

// Removed old-site paths return 410 Gone (decision D1). Once indexable, only
// www.rehabify.in may be indexed; previews and other hosts keep noindex.
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.replace(/\/$/, "").startsWith("/ai-tools")) {
    return new NextResponse(null, { status: 410 });
  }
  const rawPath = new URL(request.url).pathname;
  if (rawPath === "/dr-dharshan-n-a" || rawPath === "/dr-selina-kh") {
    return NextResponse.redirect(new URL(`${rawPath}/`, request.url), 301);
  }
  const response = NextResponse.next();
  if (SITE_INDEXABLE && request.nextUrl.hostname !== "www.rehabify.in") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}
export const config = {
  matcher: [
    "/ai-tools",
    "/ai-tools/:path*",
    "/((?!_next|images|fonts|.*\\.(?:png|jpe?g|webp|avif|svg|gif|ico|txt|xml|json|webmanifest|woff2?|css|js|map)$).*)",
  ],
};
