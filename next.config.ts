import type { NextConfig } from "next";
import { SITE_INDEXABLE } from "./lib/site-config";

const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 480],
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      {
        source: "/home/monthly",
        destination: "/plan-your-visit/",
        permanent: true,
      },
      {
        source: "/home/pricing",
        destination: "/plan-your-visit/",
        permanent: true,
      },
      {
        source: "/home/book-an-appointment-now",
        destination: "/contact/",
        permanent: true,
      },
      { source: "/about-us", destination: "/about/", permanent: true },
      { source: "/blogs", destination: "/health-library/", permanent: true },
      {
        source: "/blogs/:slug*",
        destination: "/health-library/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: SITE_INDEXABLE ? "all" : "noindex, nofollow",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};
export default config;
