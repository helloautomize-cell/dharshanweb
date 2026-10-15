import type { NextConfig } from "next";
import { SITE_INDEXABLE } from "./lib/site-config";

const isDev = process.env.NODE_ENV !== "production";

const config: NextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 480],
  },
  async redirects() {
    return [
      { source: "/conditions", destination: "/care/#a-z", statusCode: 301 },
      { source: "/conditions/", destination: "/care/#a-z", statusCode: 301 },
      {
        source: "/:file((?!\\.well-known(?:/.*)?)(?:[^/]+/)*[^/]+\\.\\w+)/",
        destination: "/:file",
        statusCode: 308,
        missing: [{ type: "header", key: "x-nextjs-data" }],
      },
      {
        source: "/:notfile((?!\\.well-known(?:/.*)?)(?:[^/]+/)*[^/\\.]+$)",
        destination: "/:notfile/",
        statusCode: 308,
      },
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
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
          },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://challenges.cloudflare.com https://va.vercel-scripts.com`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://challenges.cloudflare.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
              "frame-src https://challenges.cloudflare.com https://www.youtube-nocookie.com https://www.google.com/maps https://maps.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};
export default config;
