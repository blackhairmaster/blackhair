/**
 * Central place for outbound links.
 * Replace the bracketed placeholders in `src/data/siteData.ts`.
 */
import { siteData } from "@/data/siteData";

export const contactLinks = {
  email: siteData.contact.email,
  instagram: siteData.social.instagram,
  facebook: siteData.social.facebook,
  tiktok: siteData.social.tiktok,
  whatsapp: siteData.social.whatsapp,
  telegram: siteData.social.telegram,
};

/** Returns true when a link is still an unfilled [PLACEHOLDER]. */
export function isPlaceholder(value: string): boolean {
  return /^\s*\[.*\]\s*$/.test(value);
}

/** Makes sure the href has a protocol so the browser opens it correctly. */
export function normalizeUrl(url: string): string {
  if (/^(https?:|mailto:|tel:)/i.test(url)) return url;
  return `https://${url}`;
}
