/**
 * AI Stylist service layer.
 *
 * `demoStylist` is a deterministic, rule-based recommendation engine that runs
 * entirely in the browser. It is NOT a language model — nothing here calls an
 * external API. When a real LLM is configured, implement `StylistProvider`
 * against it and swap the export in `getStylist()`; every screen already talks
 * to the interface, not the implementation.
 */

export type StylistSlot = "Top" | "Bottom" | "Shoes" | "Outerwear" | "Accessories";

export interface StylistItem {
  slot: StylistSlot;
  label: string;
  owned: boolean;
  wardrobeItemId?: string | undefined;
  imageUrl?: string | undefined;
}

export interface StylistOutfit {
  id: string;
  name: string;
  style: string;
  occasion: string;
  matchScore: number;
  rationale: string;
  items: StylistItem[];
  imageKey: string;
  tags: string[];
}

export interface StylistReply {
  message: string;
  outfits: StylistOutfit[];
  engine: "demo" | "llm";
}

export interface WardrobeSnapshotItem {
  id: string;
  name: string;
  category: string;
  color?: string | null;
  style?: string | null;
  fit?: string | null;
  image_url?: string | null;
}

export interface StylistRequest {
  prompt: string;
  firstName?: string | undefined;
  preferences?:
    | {
        styles?: string[] | undefined;
        colors?: string[] | undefined;
        occasions?: string[] | undefined;
        budget?: string | null | undefined;
        shopping_preferences?: string | null | undefined;
        style_goals?: string[] | undefined;
      }
    | null
    | undefined;
  wardrobe?: WardrobeSnapshotItem[] | undefined;
  /** Restrict the look to pieces the user already owns. */
  ownedOnly?: boolean | undefined;
  /** Focus the look around one wardrobe item. */
  anchorItemId?: string | undefined;
}

export interface StylistProvider {
  readonly engine: "demo" | "llm";
  suggest(request: StylistRequest): Promise<StylistReply>;
}

const SLOT_FOR_CATEGORY: Record<string, StylistSlot> = {
  Tops: "Top",
  Dresses: "Top",
  Bottoms: "Bottom",
  Shoes: "Shoes",
  Outerwear: "Outerwear",
  Accessories: "Accessories",
};

interface Recipe {
  name: string;
  style: string;
  imageKey: string;
  tags: string[];
  base: Record<StylistSlot, string>;
}

const RECIPES: Recipe[] = [
  {
    name: "Urban Minimal",
    style: "Minimal",
    imageKey: "minimal",
    tags: ["Minimal", "Casual", "Everyday"],
    base: {
      Top: "Oversized black T-shirt",
      Bottom: "Beige wide-leg trousers",
      Shoes: "White sneakers",
      Outerwear: "Cream overshirt",
      Accessories: "Silver watch",
    },
  },
  {
    name: "Off-Duty Street",
    style: "Streetwear",
    imageKey: "streetwear",
    tags: ["Streetwear", "Weekend", "Bold"],
    base: {
      Top: "Boxy graphic tee",
      Bottom: "Olive cargo pants",
      Shoes: "Chunky white trainers",
      Outerwear: "Washed denim jacket",
      Accessories: "Cap and chain necklace",
    },
  },
  {
    name: "Quiet Confidence",
    style: "Smart Casual",
    imageKey: "smart-casual",
    tags: ["Smart Casual", "Work", "Polished"],
    base: {
      Top: "White cotton tee",
      Bottom: "Taupe tailored trousers",
      Shoes: "Leather loafers",
      Outerwear: "Unstructured black blazer",
      Accessories: "Slim leather belt",
    },
  },
  {
    name: "Evening Plum",
    style: "Formal",
    imageKey: "formal",
    tags: ["Formal", "Evening", "Elegant"],
    base: {
      Top: "Satin shell top",
      Bottom: "Deep plum tailored trousers",
      Shoes: "Polished heeled boots",
      Outerwear: "Matching plum blazer",
      Accessories: "Gold drop earrings",
    },
  },
  {
    name: "Sunday Slow",
    style: "Casual",
    imageKey: "weekend",
    tags: ["Casual", "Weekend", "Comfort"],
    base: {
      Top: "Chunky knit sweater",
      Bottom: "Straight-leg jeans",
      Shoes: "Canvas sneakers",
      Outerwear: "Light cotton jacket",
      Accessories: "Soft leather tote",
    },
  },
  {
    name: "Second Hand Story",
    style: "Vintage",
    imageKey: "vintage",
    tags: ["Vintage", "Date", "Playful"],
    base: {
      Top: "Fitted ribbed top",
      Bottom: "Floral midi skirt",
      Shoes: "Leather mary janes",
      Outerwear: "Cropped denim jacket",
      Accessories: "Thin gold chain",
    },
  },
  {
    name: "Café Layers",
    style: "Indie",
    imageKey: "indie",
    tags: ["Indie", "University", "Layered"],
    base: {
      Top: "Striped long-sleeve",
      Bottom: "Brown wide trousers",
      Shoes: "Loafers",
      Outerwear: "Knitted vest",
      Accessories: "Canvas tote",
    },
  },
  {
    name: "Warm Evening",
    style: "Elegant",
    imageKey: "elegant",
    tags: ["Elegant", "Wedding", "Occasion"],
    base: {
      Top: "Draped blouse",
      Bottom: "Fluid black trousers",
      Shoes: "Strappy sandals",
      Outerwear: "Light shawl",
      Accessories: "Delicate necklace",
    },
  },
];

const OCCASION_KEYWORDS: Array<[RegExp, string]> = [
  [/wedding/i, "Wedding"],
  [/interview|work|office|meeting/i, "Work"],
  [/uni|class|campus|school|lecture/i, "University"],
  [/date|dinner/i, "Date"],
  [/party|night out|club/i, "Party"],
  [/travel|trip|flight/i, "Travel"],
  [/formal|gala|ceremony/i, "Formal events"],
  [/weekend|brunch|coffee/i, "Everyday"],
];

const STYLE_KEYWORDS: Array<[RegExp, string]> = [
  [/minimal|clean|simple/i, "Minimal"],
  [/street|hype|baggy/i, "Streetwear"],
  [/smart|polished|sharp/i, "Smart Casual"],
  [/formal|suit|black tie/i, "Formal"],
  [/vintage|retro|thrift/i, "Vintage"],
  [/indie|layered/i, "Indie"],
  [/elegant|classy|chic/i, "Elegant"],
  [/casual|comfy|relaxed|chill/i, "Casual"],
];

function detect(prompt: string, pairs: Array<[RegExp, string]>): string | undefined {
  for (const [re, value] of pairs) if (re.test(prompt)) return value;
  return undefined;
}

function pickWardrobe(
  wardrobe: WardrobeSnapshotItem[],
  slot: StylistSlot,
  seed: number,
): WardrobeSnapshotItem | undefined {
  const matches = wardrobe.filter((i) => SLOT_FOR_CATEGORY[i.category] === slot);
  if (!matches.length) return undefined;
  return matches[seed % matches.length];
}

function scoreFor(base: number, seed: number) {
  return Math.min(98, Math.max(72, base - (seed % 3) * 4));
}

function buildOutfit(
  recipe: Recipe,
  index: number,
  request: StylistRequest,
  occasion: string,
): StylistOutfit {
  const wardrobe = request.wardrobe ?? [];
  const anchor = wardrobe.find((i) => i.id === request.anchorItemId);
  const slots: StylistSlot[] = ["Top", "Bottom", "Shoes", "Outerwear", "Accessories"];

  const items: StylistItem[] = slots.map((slot) => {
    if (anchor && SLOT_FOR_CATEGORY[anchor.category] === slot) {
      return {
        slot,
        label: anchor.name,
        owned: true,
        wardrobeItemId: anchor.id,
        imageUrl: anchor.image_url ?? undefined,
      };
    }
    const owned = pickWardrobe(wardrobe, slot, index + slot.length);
    if (owned) {
      return {
        slot,
        label: owned.name,
        owned: true,
        wardrobeItemId: owned.id,
        imageUrl: owned.image_url ?? undefined,
      };
    }
    return { slot, label: recipe.base[slot], owned: false };
  });

  const visible = request.ownedOnly ? items.filter((i) => i.owned) : items;
  const ownedCount = visible.filter((i) => i.owned).length;
  const matchScore = scoreFor(
    82 + ownedCount * 3 + (request.preferences?.styles?.includes(recipe.style) ? 6 : 0),
    index,
  );

  const styleNote = request.preferences?.styles?.length
    ? `you lean ${request.preferences.styles.slice(0, 2).join(" and ").toLowerCase()}`
    : "you like keeping things easy";
  const ownedNote = ownedCount
    ? `it uses ${ownedCount} piece${ownedCount > 1 ? "s" : ""} already in your wardrobe`
    : "nothing in your wardrobe matched yet, so these are pieces to look for";

  return {
    id: `${recipe.imageKey}-${index}`,
    name: recipe.name,
    style: recipe.style,
    occasion,
    matchScore,
    rationale: `Since ${styleNote} and you're dressing for ${occasion.toLowerCase()}, ${ownedNote}. ${visible
      .slice(0, 3)
      .map((i) => i.label.toLowerCase())
      .join(", ")} keeps the proportions calm and the palette warm.`,
    items: visible,
    imageKey: recipe.imageKey,
    tags: [...recipe.tags, occasion].filter((v, i, a) => a.indexOf(v) === i),
  };
}

export const demoStylist: StylistProvider = {
  engine: "demo",
  async suggest(request) {
    // Small delay so the "thinking" state reads naturally.
    await new Promise((r) => setTimeout(r, 550));

    const prompt = request.prompt || "What should I wear?";
    const occasion =
      detect(prompt, OCCASION_KEYWORDS) ?? request.preferences?.occasions?.[0] ?? "Everyday";
    const wantedStyle = detect(prompt, STYLE_KEYWORDS);

    const preferred = request.preferences?.styles ?? [];
    const ranked = [...RECIPES].sort((a, b) => {
      const score = (r: Recipe) =>
        (wantedStyle === r.style ? 10 : 0) + (preferred.includes(r.style) ? 4 : 0);
      return score(b) - score(a);
    });

    const chosen = ranked.slice(0, 3).map((r, i) => buildOutfit(r, i, request, occasion));

    const name = request.firstName ? `${request.firstName}, here` : "Here";
    const message = request.ownedOnly
      ? `${name} are looks built only from pieces you already own for ${occasion.toLowerCase()}.`
      : `${name} are three ways to go for ${occasion.toLowerCase()}${
          wantedStyle ? `, leaning ${wantedStyle.toLowerCase()}` : ""
        }.`;

    return { message, outfits: chosen, engine: "demo" };
  },
};

/**
 * Integration point for a real model. Today it always returns the demo engine;
 * screens surface `engine === "demo"` to the user so nothing is overstated.
 */
export function getStylist(): StylistProvider {
  return demoStylist;
}
