import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { EmptyState } from "@/components/states";

export const Route = createFileRoute("/_authenticated/wardrobe/$itemId")({
  component: () => (
    <>
      <PageHeader title="Wardrobe item" subtitle="This screen is being built next." />
      <EmptyState title="Coming right up" description="We're finishing this screen." />
    </>
  ),
});
