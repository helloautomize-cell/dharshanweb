import type { MetadataRoute } from "next";

export function robotsRules(indexable: boolean): MetadataRoute.Robots {
  if (!indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/thank-you/", "/404/", "/api/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-Video",
          "Google-Extended",
          "Bingbot",
          "Applebot",
          "Applebot-Extended",
          "DuckDuckBot",
          "DuckAssistBot",
          "YandexBot",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Meta-ExternalAgent",
          "Meta-ExternalFetcher",
          "Amazonbot",
          "MistralAI-User",
          "cohere-ai",
          "YouBot",
          "CCBot",
          "DiffBot",
          "Bytespider",
          "facebookexternalhit",
          "WhatsApp",
          "LinkedInBot",
          "Twitterbot",
        ],
        allow: "/",
        disallow: ["/thank-you/", "/api/"],
      },
    ],
    sitemap: "https://www.rehabify.in/sitemap.xml",
  };
}
