import type { MetadataRoute } from "next";
import { SITE_INDEXABLE } from "@/lib/site-config";
import { robotsRules } from "@/lib/robots-rules";

export default function robots(): MetadataRoute.Robots {
  return robotsRules(SITE_INDEXABLE);
}
