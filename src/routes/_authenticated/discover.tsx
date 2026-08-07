import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { EmptyState } from "@/components/states";

export const Route = createFileRoute("/_authenticated/discover")({
  head: () => ({
    meta: [
      { title: "Discover — Outfit Oasis" },
      { name: "description", content: "Discover in Outfit Oasis." },
      { property: "og:title", content: "Discover — Outfit Oasis" },
      { property: "og:description", content: "Discover in Outfit Oasis." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Discover" subtitle="This section is being built next." />
      <EmptyState title="Coming right up" description="We're finishing this screen." />
    </>
  );
}
