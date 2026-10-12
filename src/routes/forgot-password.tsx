import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Reset your password — Outfit Oasis" },
      { name: "description", content: "Send yourself a link to set a new Outfit Oasis password." },
      { property: "og:title", content: "Reset your password — Outfit Oasis" },
      {
        property: "og:description",
        content: "Send yourself a link to set a new Outfit Oasis password.",
      },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    setBusy(true);
    setError(null);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (resetError) {
      setError("We couldn't send that email. Please try again.");
      return;
    }
    setSent(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="eyebrow mb-8 block">
          Outfit Oasis
        </Link>
        <h1 className="text-4xl leading-tight">Forgot your password?</h1>

        {sent ? (
          <p className="mt-4 text-sm text-muted-foreground">
            If an account exists for <span className="text-foreground">{email}</span>, a reset link
            is on its way. Open it to choose a new password.
          </p>
        ) : (
          <>
            <p className="mt-3 text-sm text-muted-foreground">
              Enter your email and we'll send you a link to set a new one.
            </p>
            <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>
              {error ? (
                <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm">
                  {error}
                </p>
              ) : null}
              <Button type="submit" disabled={busy} className="w-full py-6">
                {busy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                Send reset link
              </Button>
            </form>
          </>
        )}

        <Link
          to="/auth"
          search={{ mode: "login" }}
          className="mt-6 inline-block text-sm underline underline-offset-4"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
