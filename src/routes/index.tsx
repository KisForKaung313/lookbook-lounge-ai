import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import heroImage from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/home" });
  },
  head: () => ({
    meta: [
      { title: "Outfit Oasis — Your personal AI stylist" },
      {
        name: "description",
        content:
          "Outfit Oasis turns the clothes you already own into outfits you love. Build a digital wardrobe, get styling ideas and discover pieces worth buying.",
      },
      { property: "og:title", content: "Outfit Oasis — Your personal AI stylist" },
      {
        property: "og:description",
        content:
          "Build a digital wardrobe, get styling ideas and discover pieces worth buying. Launching from Myanmar.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-between px-6 py-8 sm:px-10 lg:py-14">
          <header className="flex items-center justify-between">
            <span className="font-display text-xl">Outfit Oasis</span>
            <Link
              to="/auth"
              search={{ mode: "login" }}
              className="text-sm underline underline-offset-4"
            >
              Sign in
            </Link>
          </header>

          <div className="max-w-md py-14">
            <p className="eyebrow">Level up your fashion game</p>
            <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl">
              Your personal
              <br />
              AI stylist,
              <br />
              <em>powered by your wardrobe.</em>
            </h1>
            <p className="mt-6 max-w-sm text-base text-muted-foreground">
              Fashion shouldn't feel complicated. Add what you own, tell us the occasion, and get a
              look you'll actually wear.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Create your account
              </Link>
              <Link
                to="/auth"
                search={{ mode: "login" }}
                className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                I already have one
              </Link>
            </div>
          </div>

          <footer className="grid grid-cols-3 gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
            <p>Style first, shop second.</p>
            <p>Built for Southeast Asia.</p>
            <p>Wardrobe · Stylist · Discover</p>
          </footer>
        </div>

        <div className="relative hidden lg:block">
          <img
            src={heroImage}
            alt="Two people in warm neutral tailoring against a cream wall"
            width={1024}
            height={1280}
            className="size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
