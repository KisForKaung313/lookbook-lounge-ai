import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { EmptyState } from "@/components/states";

export const Route = createFileRoute("/_authenticated/shop")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Shop — Outfit Oasis" },
      { name: "description", content: "Shop in Outfit Oasis." },
      { property: "og:title", content: "Shop — Outfit Oasis" },
      { property: "og:description", content: "Shop in Outfit Oasis." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Shop" subtitle="This section is being built next." />
      <EmptyState title="Coming right up" description="We're finishing this screen." />
    </>
  );
}
