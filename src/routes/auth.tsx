import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/hooks/use-session";

const searchSchema = z.object({
  mode: z.enum(["login", "signup"]).catch("login"),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign in — Outfit Oasis" },
      { name: "description", content: "Sign in or create your Outfit Oasis account." },
      { property: "og:title", content: "Sign in — Outfit Oasis" },
      { property: "og:description", content: "Sign in or create your Outfit Oasis account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const { session, loading: sessionLoading } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  const isSignup = mode === "signup";

  useEffect(() => {
    if (!sessionLoading && session) void navigate({ to: "/home", replace: true });
  }, [session, sessionLoading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please fill in your email and password.");
      return;
    }
    if (isSignup && password.length < 6) {
      setError("Passwords need at least 6 characters.");
      return;
    }

    setBusy(true);
    try {
      if (isSignup) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { name: name.trim() || undefined },
          },
        });
        if (signUpError) throw signUpError;
        if (!data.session) {
          setCheckEmail(true);
          return;
        }
        toast.success("Welcome to Outfit Oasis.");
        void navigate({ to: "/onboarding", replace: true });
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) throw signInError;
        void navigate({ to: "/home", replace: true });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (/invalid login credentials/i.test(message)) {
        setError("That email and password don't match. Try again.");
      } else if (/already registered/i.test(message)) {
        setError("That email already has an account. Try signing in instead.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  }

  if (checkEmail) {
    return (
      <Centered>
        <h1 className="text-3xl">Check your email</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          We sent a confirmation link to <span className="text-foreground">{email}</span>. Open it to
          finish setting up your account.
        </p>
        <Link to="/auth" search={{ mode: "login" }} className="mt-6 inline-block text-sm underline underline-offset-4">
          Back to sign in
        </Link>
      </Centered>
    );
  }

  return (
    <Centered>
      <Link to="/" className="eyebrow mb-8 block">
        Outfit Oasis
      </Link>
      <h1 className="text-4xl leading-tight">{isSignup ? "Let's find your look." : "Welcome back."}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {isSignup
          ? "Create an account and we'll personalise your styling in a couple of minutes."
          : "Sign in to your wardrobe, boards and saved outfits."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
        {isSignup ? (
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="How should we greet you?"
            />
          </div>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {!isSignup ? (
              <Link to="/forgot-password" className="text-xs underline underline-offset-4">
                Forgot password?
              </Link>
            ) : null}
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isSignup ? "new-password" : "current-password"}
            placeholder="••••••••"
          />
        </div>

        {error ? (
          <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-foreground">
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={busy} className="w-full py-6">
          {busy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          {isSignup ? "Create account" : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-muted-foreground">
        {isSignup ? "Already have an account? " : "New to Outfit Oasis? "}
        <Link
          to="/auth"
          search={{ mode: isSignup ? "login" : "signup" }}
          className="text-foreground underline underline-offset-4"
        >
          {isSignup ? "Sign in" : "Create one"}
        </Link>
      </p>
    </Centered>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
