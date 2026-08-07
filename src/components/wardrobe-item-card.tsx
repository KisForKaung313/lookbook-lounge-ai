import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WardrobeItem } from "@/lib/data";

export function WardrobeItemCard({ item }: { item: WardrobeItem }) {
  return (
    <Link
      to="/wardrobe/$itemId"
      params={{ itemId: item.id }}
      className="group relative block overflow-hidden rounded-md border border-border bg-card shadow-soft transition-shadow hover:shadow-lift"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex size-full items-center justify-center px-3 text-center text-xs text-muted-foreground">
            {item.category}
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-medium">{item.name}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {[item.category, item.color].filter(Boolean).join(" · ")}
        </p>
      </div>
      {item.is_favorite ? (
        <span className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-card/90 backdrop-blur">
          <Star className={cn("size-3.5 fill-foreground text-foreground")} aria-label="Favourite" />
        </span>
      ) : null}
    </Link>
  );
}
