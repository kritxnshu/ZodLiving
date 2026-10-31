import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { path: "/", priority: 1 },
    { path: "/room", priority: 0.9 },
    { path: "/amenities", priority: 0.8 },
    { path: "/life-at-zod", priority: 0.7 },
    { path: "/contact", priority: 0.9 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
