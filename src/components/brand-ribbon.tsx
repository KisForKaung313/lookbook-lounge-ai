import { useState } from "react";
import { Pause, Play, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";

const beliefs = ["Personal style, not price tags", "Inspired by you", "Confidence for everyone"];

export function BrandRibbon() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="brand-ribbon relative overflow-hidden border-b border-border bg-primary text-primary-foreground">
      <div className="sr-only">{beliefs.join(". ")}</div>
      <div className="brand-ribbon-track" data-paused={paused} aria-hidden="true">
        {[0, 1, 2, 3].map((copy) => <div className="brand-ribbon-group" key={copy}>{beliefs.map((belief) => <span key={belief} className="flex shrink-0 items-center gap-10 text-xs uppercase">{belief}<Sparkle className="size-4 text-primary-foreground/60" /></span>)}</div>)}
      </div>
      <Button variant="ghost" size="icon" className="ribbon-control absolute right-3 top-1/2 size-8 -translate-y-1/2 rounded-full bg-primary text-primary-foreground" aria-label={paused ? "Resume moving ribbon" : "Pause moving ribbon"} onClick={() => setPaused(!paused)}>{paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}</Button>
    </div>
  );
}