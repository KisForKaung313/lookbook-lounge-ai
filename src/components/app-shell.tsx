import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Compass, ScanLine, Shirt, User, Sparkles, ShoppingBag, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useSession } from "@/hooks/use-session";

const PRIMARY = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/scan", label: "Scan", icon: ScanLine },
  { to: "/wardrobe", label: "Wardrobe", icon: Shirt },
  { to: "/profile", label: "Profile", icon: User },
] as const;

const DESKTOP_EXTRA = [
  { to: "/stylist", label: "AI Stylist", icon: Sparkles },
  { to: "/boards", label: "Boards", icon: Layers },
  { to: "/shop", label: "Marketplace", icon: ShoppingBag },
] as const;

function useIsActive() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (to: string) => pathname === to || pathname.startsWith(`${to}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const isActive = useIsActive();
  const { session, loading } = useSession();

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-sidebar px-5 py-7 lg:flex">
        <Link to="/home" className="mb-9 block">
          <span className="font-display text-2xl leading-none">Outfit Oasis</span>
          <span className="eyebrow mt-2 block text-[0.6rem]">Level up your fashion game</span>
        </Link>
        <nav className="flex flex-col gap-1">
          {[...PRIMARY, ...DESKTOP_EXTRA].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                isActive(to)
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-md border border-border p-4">
          <p className="font-display text-lg leading-tight">Outfit Oasis+</p>
          <p className="mt-1 text-xs text-muted-foreground">
            More personalization. More styling.
          </p>
          <Link
            to="/plus"
            className="mt-3 inline-block text-xs font-medium underline underline-offset-4"
          >
            See what's included
          </Link>
        </div>
      </aside>

      <div className="lg:pl-60">
        {!loading && !session ? (
          <div className="flex items-center justify-between gap-3 border-b border-border bg-secondary px-4 py-2.5 text-xs text-secondary-foreground sm:px-6">
            <span>You're browsing as a guest. Sign in to save outfits and build your wardrobe.</span>
            <span className="flex shrink-0 gap-3">
              <Link to="/auth" search={{ mode: "login" }} className="underline underline-offset-4">
                Sign in
              </Link>
              <Link to="/auth" search={{ mode: "signup" }} className="font-medium underline underline-offset-4">
                Create account
              </Link>
            </span>
          </div>
        ) : null}
        <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-5 sm:px-6 lg:pb-14 lg:pt-10">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden"
      >
        <ul className="mx-auto flex max-w-lg items-end justify-between px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
          {PRIMARY.map(({ to, label, icon: Icon }) => {
            const active = isActive(to);
            const isScan = to === "/scan";
            return (
              <li key={to} className="flex-1">
                <Link
                  to={to}
                  aria-current={active ? "page" : undefined}
                  className="flex min-h-12 flex-col items-center justify-end gap-1"
                >
                  <span
                    className={cn(
                      "flex items-center justify-center rounded-full transition-colors",
                      isScan
                        ? "size-11 bg-primary text-primary-foreground"
                        : cn(
                            "size-9",
                            active ? "bg-secondary text-foreground" : "text-muted-foreground",
                          ),
                    )}
                  >
                    <Icon className={isScan ? "size-5" : "size-[18px]"} aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      "text-[0.625rem] tracking-wide",
                      active ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="eyebrow mb-2">{eyebrow}</p> : null}
        <h1 className="text-3xl leading-tight sm:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-prose text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </header>
  );
}
