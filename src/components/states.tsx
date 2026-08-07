import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-md border border-dashed border-border bg-card/60 px-6 py-14 text-center">
      {icon ? <div className="mb-4 text-muted-foreground">{icon}</div> : null}
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="rounded-md border border-destructive/40 bg-destructive/5 px-5 py-4 text-sm"
    >
      <p className="text-foreground">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 text-sm font-medium underline underline-offset-4"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function LoadingGrid({ count = 6, label }: { count?: number; label?: string }) {
  return (
    <div>
      {label ? <p className="mb-3 text-sm text-muted-foreground">{label}</p> : null}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-md bg-muted" />
        ))}
      </div>
    </div>
  );
}
