import minimal from "@/assets/looks/minimal.jpg";
import streetwear from "@/assets/looks/streetwear.jpg";
import smartCasual from "@/assets/looks/smart-casual.jpg";
import formal from "@/assets/looks/formal.jpg";
import vintage from "@/assets/looks/vintage.jpg";
import indie from "@/assets/looks/indie.jpg";
import weekend from "@/assets/looks/weekend.jpg";
import elegant from "@/assets/looks/elegant.jpg";

/**
 * Demo imagery registry.
 *
 * Demo/seeded rows store `image_url` as "demo:<key>" so the licensed asset can
 * later be swapped without touching the database. User-uploaded images store a
 * real (signed) URL and pass straight through.
 */
export const DEMO_IMAGES: Record<string, string> = {
  minimal,
  streetwear,
  "smart-casual": smartCasual,
  formal,
  vintage,
  indie,
  weekend,
  elegant,
};

export const DEMO_IMAGE_KEYS = Object.keys(DEMO_IMAGES);

export function resolveImage(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("demo:")) return DEMO_IMAGES[url.slice(5)];
  return url;
}
