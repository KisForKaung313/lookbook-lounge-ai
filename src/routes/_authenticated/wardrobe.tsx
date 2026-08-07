import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { EmptyState } from "@/components/states";

export const Route = createFileRoute("/_authenticated/wardrobe")({
  head: () => ({
    meta: [
      { title: "Wardrobe — Outfit Oasis" },
      { name: "description", content: "Wardrobe in Outfit Oasis." },
      { property: "og:title", content: "Wardrobe — Outfit Oasis" },
      { property: "og:description", content: "Wardrobe in Outfit Oasis." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Wardrobe" subtitle="This section is being built next." />
      <EmptyState title="Coming right up" description="We're finishing this screen." />
    </>
  );
}
