import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { EmptyState, LoadingGrid } from "@/components/states";
import { OutfitCard } from "@/components/outfit-card";
import { useOutfits, useProfile } from "@/lib/data";
import { firstName, greeting } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/home")({
  head: () => ({
    meta: [
      { title: "Your daily edit — Outfit Oasis" },
      { name: "description", content: "Today's outfit ideas, picked from your own wardrobe." },
      { property: "og:title", content: "Your daily edit — Outfit Oasis" },
      {
        property: "og:description",
        content: "Today's outfit ideas, picked from your own wardrobe.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data: profile } = useProfile();
  const { data: outfits, isLoading } = useOutfits();

  return (
    <>
      <PageHeader
        eyebrow={greeting()}
        title={firstName(profile?.name) ? `Hi, ${firstName(profile?.name)}.` : "Your daily edit."}
        subtitle="Outfit ideas assembled from the pieces you already own."
      />

      <Link
        to="/stylist"
        className="mb-8 flex items-center justify-between rounded-md bg-primary px-5 py-5 text-primary-foreground"
      >
        <span>
          <span className="eyebrow block text-[0.6rem] opacity-70">AI Stylist</span>
          <span className="mt-1 block font-display text-2xl">What should I wear today?</span>
        </span>
        <Sparkles className="size-6" aria-hidden="true" />
      </Link>

      {isLoading ? (
        <LoadingGrid label="Pulling your looks together…" />
      ) : outfits?.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {outfits.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No looks yet"
          description="Add a few wardrobe pieces and the stylist will start building outfits for you."
          action={
            <Link
              to="/wardrobe"
              className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Build your wardrobe
            </Link>
          }
        />
      )}
    </>
  );
}
