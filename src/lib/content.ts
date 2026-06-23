import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";
import fallbackContent from "../../content/site.json";

export type SiteContent = typeof fallbackContent;
export type SiteSettings = SiteContent["settings"];

let cached: SiteContent | null = null;

export function getSiteContent(): SiteContent {
  if (cached) return cached;

  const contentPath = path.join(process.cwd(), "content", "site.json");
  try {
    cached = JSON.parse(readFileSync(contentPath, "utf8")) as SiteContent;
  } catch {
    cached = fallbackContent;
  }

  return cached;
}

export function mapsUrl(org: string, name: string, city: string): string {
  const query = `${org} ${name} ${city}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
