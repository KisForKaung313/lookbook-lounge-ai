import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Choose a new password — Outfit Oasis" },
      { name: "description", content: "Set a new password for your Outfit Oasis account." },
      { property: "og:title", content: "Choose a new password — Outfit Oasis" },
      {
        property: "og:description",
        content: "Set a new password for your Outfit Oasis account.",
      },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      setError("Passwords need at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Those passwords don't match.");
      return;
    }
    setBusy(true);
    setError(null);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) {
      setError("That reset link may have expired. Request a new one and try again.");
      return;
    }
    toast.success("Password updated.");
    void navigate({ to: "/home", replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="eyebrow mb-8 block">
          Outfit Oasis
        </Link>
        <h1 className="text-4xl leading-tight">Choose a new password</h1>
        <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          {error ? (
            <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={busy} className="w-full py-6">
            {busy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            Update password
          </Button>
        </form>
      </div>
    </div>
  );
}
