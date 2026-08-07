import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { EmptyState } from "@/components/states";

export const Route = createFileRoute("/_authenticated/boards")({
  head: () => ({
    meta: [
      { title: "Boards — Outfit Oasis" },
      { name: "description", content: "Boards in Outfit Oasis." },
      { property: "og:title", content: "Boards — Outfit Oasis" },
      { property: "og:description", content: "Boards in Outfit Oasis." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader title="Boards" subtitle="This section is being built next." />
      <EmptyState title="Coming right up" description="We're finishing this screen." />
    </>
  );
}
