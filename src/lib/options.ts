export const STYLE_OPTIONS = [
  "Minimal",
  "Casual",
  "Streetwear",
  "Smart Casual",
  "Formal",
  "Vintage",
  "Indie",
  "Y2K",
  "Sporty",
  "Elegant",
  "Bohemian",
  "Other",
] as const;

export const COLOR_OPTIONS = [
  "Black",
  "White",
  "Cream",
  "Beige",
  "Brown",
  "Grey",
  "Navy",
  "Blue",
  "Green",
  "Olive",
  "Red",
  "Burgundy",
  "Pink",
  "Purple",
  "Yellow",
  "Orange",
  "Pastels",
  "Earth tones",
] as const;

export const OCCASION_OPTIONS = [
  "Everyday",
  "University",
  "Work",
  "Date",
  "Party",
  "Wedding",
  "Travel",
  "Formal events",
  "Religious/cultural events",
  "Other",
] as const;

export const BUDGET_OPTIONS = ["Budget", "Mid-range", "Premium", "Luxury"] as const;

export const SHOPPING_OPTIONS = ["Local brands", "Global brands", "Both"] as const;

export const GOAL_OPTIONS = [
  "Daily outfits",
  "Special occasions",
  "Styling clothes I already own",
  "Shopping",
  "Finding my personal style",
] as const;

export const CATEGORIES = [
  "Tops",
  "Bottoms",
  "Dresses",
  "Outerwear",
  "Shoes",
  "Accessories",
] as const;

export const SLOTS = ["Top", "Bottom", "Shoes", "Outerwear", "Accessories"] as const;

export const FITS = ["Slim", "Regular", "Relaxed", "Oversized"] as const;

export const SEASONS = ["All year", "Hot", "Rainy", "Cool"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Slot = (typeof SLOTS)[number];
