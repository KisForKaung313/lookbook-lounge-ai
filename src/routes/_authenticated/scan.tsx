import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { EmptyState } from "@/components/states";

export const Route = createFileRoute("/_authenticated/scan")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Scan — Outfit Oasis" },
      { name: "description", content: "Scan in Outfit Oasis." },
      { property: "og:title", content: "Scan — Outfit Oasis" },
      { property: "og:description", content: "Scan in Outfit Oasis." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Scan" subtitle="This section is being built next." />
      <EmptyState title="Coming right up" description="We're finishing this screen." />
    </>
  );
}
