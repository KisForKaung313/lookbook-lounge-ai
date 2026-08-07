import { Link } from "@tanstack/react-router";
import { Bookmark, Heart } from "lucide-react";
import { resolveImage } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { Outfit } from "@/lib/data";
import { MatchBadge } from "@/components/chips";

export function OutfitCard({
  outfit,
  saved,
  liked,
  onSave,
  onLike,
  ratio = "aspect-[3/4]",
}: {
  outfit: Outfit;
  saved?: boolean;
  liked?: boolean;
  onSave?: () => void;
  onLike?: () => void;
  ratio?: string;
}) {
  const image = resolveImage(outfit.image_url);

  return (
    <article className="group relative overflow-hidden rounded-md border border-border bg-card shadow-soft transition-shadow hover:shadow-lift">
      <Link to="/outfit/$outfitId" params={{ outfitId: outfit.id }} className="block">
        <div className={cn("overflow-hidden bg-muted", ratio)}>
          {image ? (
            <img
              src={image}
              alt={outfit.name}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-xs text-muted-foreground">
              No image yet
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-display text-lg leading-tight">{outfit.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {[outfit.style, outfit.occasion].filter(Boolean).join(" · ") || "Look"}
          </p>
        </div>
      </Link>

      {outfit.ai_match_score ? (
        <MatchBadge score={outfit.ai_match_score} className="absolute left-2 top-2" />
      ) : null}

      {(onSave || onLike) && (
        <div className="absolute right-2 top-2 flex flex-col gap-2">
          {onLike ? (
            <button
              type="button"
              onClick={onLike}
              aria-label={liked ? `Unlike ${outfit.name}` : `Like ${outfit.name}`}
              aria-pressed={!!liked}
              className="flex size-8 items-center justify-center rounded-full bg-card/90 backdrop-blur transition-transform active:scale-90"
            >
              <Heart
                className={cn("size-4", liked ? "fill-destructive text-destructive" : "text-foreground")}
              />
            </button>
          ) : null}
          {onSave ? (
            <button
              type="button"
              onClick={onSave}
              aria-label={saved ? `Remove ${outfit.name} from saved` : `Save ${outfit.name}`}
              aria-pressed={!!saved}
              className="flex size-8 items-center justify-center rounded-full bg-card/90 backdrop-blur transition-transform active:scale-90"
            >
              <Bookmark
                className={cn("size-4", saved ? "fill-foreground text-foreground" : "text-foreground")}
              />
            </button>
          ) : null}
        </div>
      )}
    </article>
  );
}
