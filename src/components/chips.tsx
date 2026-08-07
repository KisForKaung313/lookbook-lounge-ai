import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function StyleChip({
  label,
  selected,
  onClick,
  size = "md",
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
}) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      {...(onClick ? { type: "button" as const, onClick, "aria-pressed": !!selected } : {})}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border transition-colors",
        size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm",
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground",
        onClick && !selected && "hover:border-muted-foreground",
      )}
    >
      {selected ? <Check className="size-3.5" aria-hidden="true" /> : null}
      {label}
    </Comp>
  );
}

export function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
      {label}
    </span>
  );
}

export function MatchBadge({ score, className }: { score: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center rounded-sm bg-card/90 px-3 py-1.5 leading-none backdrop-blur",
        className,
      )}
    >
      <span className="eyebrow text-[0.55rem]">AI match</span>
      <span className="mt-1 font-display text-lg">{score}%</span>
    </span>
  );
}
