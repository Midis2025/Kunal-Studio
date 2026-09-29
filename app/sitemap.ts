import type { MetadataRoute } from "next";
import { articles } from "@/data/journal";
import { SITE_URL } from "@/data/studio";
import { weddings } from "@/data/weddings";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => new URL(p, SITE_URL).toString();
  const now = new Date();
  const pages = ["/", "/portfolio", "/films", "/about", "/journal", "/experience", "/contact", "/privacy"].map((p) => ({
    url: url(p),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "/" ? 1 : p === "/privacy" ? 0.2 : 0.8,
  }));
  const stories = weddings.map((w) => ({
    url: url(`/portfolio/${w.slug}`),
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
    images: [w.hero, ...w.frames.slice(0, 10)].map((p) => url(p.src)),
  }));
  const posts = articles.map((a) => ({
    url: url(`/journal/${a.slug}`),
    lastModified: new Date(a.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
    images: [url(a.cover.src)],
  }));
  return [...pages, ...stories, ...posts];
}
