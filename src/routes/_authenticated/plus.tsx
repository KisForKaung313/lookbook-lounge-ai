import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { EmptyState } from "@/components/states";

export const Route = createFileRoute("/_authenticated/plus")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Plus — Outfit Oasis" },
      { name: "description", content: "Plus in Outfit Oasis." },
      { property: "og:title", content: "Plus — Outfit Oasis" },
      { property: "og:description", content: "Plus in Outfit Oasis." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Plus" subtitle="This section is being built next." />
      <EmptyState title="Coming right up" description="We're finishing this screen." />
    </>
  );
}
