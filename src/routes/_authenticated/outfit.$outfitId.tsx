import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { EmptyState } from "@/components/states";

export const Route = createFileRoute("/_authenticated/outfit/$outfitId")({
  component: () => (
    <>
      <PageHeader title="Outfit" subtitle="This screen is being built next." />
      <EmptyState title="Coming right up" description="We're finishing this screen." />
    </>
  ),
});
