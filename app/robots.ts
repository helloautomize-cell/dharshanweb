import type { MetadataRoute } from "next";
import { SITE_INDEXABLE } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (!SITE_INDEXABLE) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you/", "/404/", "/styleguide/"],
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: "https://www.rehabify.in/sitemap.xml",
  };
}
