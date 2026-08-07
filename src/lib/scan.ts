/**
 * Clothing recognition service layer.
 *
 * `mockRecognition` is a placeholder: it does not run computer vision. It
 * derives a sensible starting guess from the file name and returns it so the
 * user can correct every field before saving. Swap in a real vision provider by
 * implementing `RecognitionProvider`.
 */

export interface RecognitionResult {
  name: string;
  category: string;
  color: string;
  style: string;
  fit: string;
  confidence: number;
  engine: "mock" | "vision";
}

export interface RecognitionProvider {
  readonly engine: "mock" | "vision";
  analyze(file: File): Promise<RecognitionResult>;
}

const COLORS = ["Black", "White", "Cream", "Beige", "Navy", "Olive", "Grey", "Brown"];
const CATEGORIES = ["Tops", "Bottoms", "Outerwear", "Shoes", "Accessories"];
const STYLES = ["Casual", "Minimal", "Streetwear", "Smart Casual"];
const FITS = ["Regular", "Relaxed", "Oversized", "Slim"];

const HINTS: Array<[RegExp, Partial<RecognitionResult>]> = [
  [/(shirt|tee|top|blouse|sweater|knit)/i, { category: "Tops" }],
  [/(jean|trouser|pant|short|skirt)/i, { category: "Bottoms" }],
  [/(jacket|coat|blazer|hoodie)/i, { category: "Outerwear" }],
  [/(shoe|sneaker|boot|sandal|loafer)/i, { category: "Shoes" }],
  [/(bag|watch|belt|cap|hat|necklace)/i, { category: "Accessories" }],
  [/black/i, { color: "Black" }],
  [/white/i, { color: "White" }],
  [/beige|cream|sand/i, { color: "Beige" }],
];

export const mockRecognition: RecognitionProvider = {
  engine: "mock",
  async analyze(file) {
    await new Promise((r) => setTimeout(r, 1400));

    const seed = file.name.length + file.size;
    const result: RecognitionResult = {
      name: "",
      category: CATEGORIES[seed % CATEGORIES.length] ?? "Tops",
      color: COLORS[seed % COLORS.length] ?? "Black",
      style: STYLES[seed % STYLES.length] ?? "Casual",
      fit: FITS[seed % FITS.length] ?? "Regular",
      confidence: 0,
      engine: "mock",
    };

    for (const [re, patch] of HINTS) {
      if (re.test(file.name)) Object.assign(result, patch);
    }

    result.name = `${result.color} ${result.fit.toLowerCase()} ${
      result.category === "Tops" ? "T-shirt" : result.category.replace(/s$/, "").toLowerCase()
    }`;
    return result;
  },
};

export function getRecognition(): RecognitionProvider {
  return mockRecognition;
}
