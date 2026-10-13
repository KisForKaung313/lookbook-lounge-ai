import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";

const links = [
  { to: "/home", label: "Home" },
  { to: "/about", label: "About us" },
] as const;

export function WebsiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { session } = useSession();
  const mainRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(main.querySelectorAll<HTMLElement>("section:not(:first-child) h2, section:not(:first-child) h3, section:not(:first-child) p, section:not(:first-child) article, section:not(:first-child) img, blockquote"))
      .filter((element) => !element.closest("article") || element.tagName === "ARTICLE");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("motion-visible");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    const initialize = () => {
      observer.disconnect();
      elements.forEach((element) => {
        element.classList.remove("motion-pending", "motion-visible");
        if (!preference.matches && element.getBoundingClientRect().top > window.innerHeight - 24) {
          element.classList.add("motion-pending");
          observer.observe(element);
        }
      });
    };
    const updateProgress = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    initialize();
    updateProgress();
    preference.addEventListener("change", initialize);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", initialize);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      elements.forEach((element) => element.classList.remove("motion-pending", "motion-visible"));
    };
  }, [pathname]);
  return (
    <div className="company-website min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div ref={progressRef} aria-hidden="true" className="reading-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-success" />
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-10">
          <Link to="/home" className="font-display text-3xl" onClick={() => setOpen(false)}>Outfit Oasis<span className="text-success">.</span></Link>
          <nav aria-label="Company navigation" className="hidden items-center gap-8 md:flex">
            {links.map(({ to, label }) => <Button key={to} asChild variant="link" className={pathname === to || (to === "/home" && pathname === "/") ? "underline underline-offset-8" : "text-muted-foreground"}><Link to={to}>{label}</Link></Button>)}
            <Button asChild variant="link" className="text-muted-foreground"><Link to="/discover">Explore style</Link></Button>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">{session ? <Link to="/profile">My account</Link> : <Link to="/auth" search={{ mode: "login" }}>Sign in</Link>}</Button>
            <Button asChild className="hidden sm:inline-flex"><Link to="/about">Meet Outfit Oasis <ArrowUpRight /></Link></Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {open && <nav aria-label="Mobile company navigation" className="company-menu absolute inset-x-0 top-20 flex flex-col gap-2 border-b border-border bg-background px-5 py-5 shadow-soft">
          {[...links, { to: "/discover", label: "Explore style" } as const].map(({ to, label }) => <Button asChild variant="ghost" className="justify-start" key={to}><Link to={to} onClick={() => setOpen(false)}>{label}</Link></Button>)}
          <Button asChild variant="outline"><Link to="/auth" search={{ mode: "login" }} onClick={() => setOpen(false)}>Sign in</Link></Button>
        </nav>}
      </header>
      <main ref={mainRef} key={pathname}>{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-10 md:grid-cols-[2fr_1fr_1fr]">
          <div><Link to="/home" className="font-display text-3xl">Outfit Oasis.</Link><p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">Confidence, creativity, and convenience. A fresh perspective on getting dressed, expressing yourself, and finding your own style.</p></div>
          <div><p className="eyebrow mb-4">Our world</p><div className="flex flex-col items-start gap-3"><Link to="/home" className="text-sm hover:underline">Home</Link><Link to="/about" className="text-sm hover:underline">About us</Link><Link to="/discover" className="text-sm hover:underline">Style inspiration</Link></div></div>
          <div><p className="eyebrow mb-4">The platform</p><div className="flex flex-col items-start gap-3"><Link to="/stylist" className="text-sm hover:underline">AI stylist</Link><Link to="/wardrobe" className="text-sm hover:underline">Digital wardrobe</Link><Link to="/shop" className="text-sm hover:underline">Marketplace</Link><Link to="/auth" search={{ mode: "signup" }} className="text-sm hover:underline">Create an account</Link></div></div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 border-t border-border px-5 py-6 text-xs text-muted-foreground sm:px-10"><p>© Outfit Oasis. All rights reserved.</p><p>Style is personal. Confidence is for everyone.</p></div>
      </footer>
    </div>
  );
}