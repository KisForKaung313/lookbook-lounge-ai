import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

// Browsing is open to everyone; sign-in is only needed to save personal data.
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
