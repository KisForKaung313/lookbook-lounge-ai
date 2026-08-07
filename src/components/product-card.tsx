import { ExternalLink } from "lucide-react";
import { resolveImage } from "@/lib/images";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const image = resolveImage(product.image_url);
  const href = product.affiliate_url || product.external_url;

  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-soft">
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        {image ? (
          <img src={image} alt={product.name} loading="lazy" className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
            {product.category ?? "Product"}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="eyebrow">{product.brands?.name ?? "Independent"}</p>
        <h3 className="mt-1 text-sm font-medium leading-snug">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatPrice(product.price, product.currency)}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <a
            href={href ?? "#"}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Shop
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </div>
        {product.is_demo ? (
          <p className="mt-2 text-[0.65rem] text-muted-foreground">
            Demo listing — not a live retail partner.
          </p>
        ) : null}
      </div>
    </article>
  );
}
