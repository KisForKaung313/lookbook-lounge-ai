import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { EmptyState } from "@/components/states";

export const Route = createFileRoute("/_authenticated/wardrobe/$itemId")({
  head: () => ({ meta: [
    { title: "Wardrobe item details — Outfit Oasis" },
    { name: "description", content: "Wardrobe item details from your personal Outfit Oasis collection." },
    { property: "og:title", content: "Wardrobe item details — Outfit Oasis" },
    { property: "og:description", content: "View an item from your personal wardrobe collection." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => (
    <>
      <PageHeader title="Wardrobe item" subtitle="This screen is being built next." />
      <EmptyState title="Coming right up" description="We're finishing this screen." />
    </>
  ),
});
