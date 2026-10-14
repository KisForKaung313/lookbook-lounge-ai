import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { EmptyState } from "@/components/states";

export const Route = createFileRoute("/_authenticated/outfit/$outfitId")({
  head: () => ({ meta: [
    { title: "Outfit details — Outfit Oasis" },
    { name: "description", content: "Outfit details and personal styling inspiration from Outfit Oasis." },
    { property: "og:title", content: "Outfit details — Outfit Oasis" },
    { property: "og:description", content: "Explore outfit details and personal styling inspiration." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => (
    <>
      <PageHeader title="Outfit" subtitle="This screen is being built next." />
      <EmptyState title="Coming right up" description="We're finishing this screen." />
    </>
  ),
});
