import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { EmptyState } from "@/components/states";

export const Route = createFileRoute("/_authenticated/stylist")({
  head: () => ({
    meta: [
      { title: "Stylist — Outfit Oasis" },
      { name: "description", content: "Stylist in Outfit Oasis." },
      { property: "og:title", content: "Stylist — Outfit Oasis" },
      { property: "og:description", content: "Stylist in Outfit Oasis." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Stylist" subtitle="This section is being built next." />
      <EmptyState title="Coming right up" description="We're finishing this screen." />
    </>
  );
}
