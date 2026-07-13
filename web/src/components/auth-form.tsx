"use client";

import Link from "next/link";
import { useState } from "react";
import { getSupabase, isDemoMode } from "@/lib/supabase";
import { EMIRATES } from "@/lib/catalog";
import { LogoMark } from "./logo";
import { Button, Input, Label, Select } from "./ui";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const signUp = mode === "sign-up";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabase();
    if (!supabase) {
      setStatus(
        "Demo mode: accounts switch on once Supabase is connected. Everything else on the site is ready to explore without one."
      );
      return;
    }
    setBusy(true);
    setStatus(null);
    const { error } = signUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    setStatus(
      error
        ? error.message
        : signUp
          ? "Check your email to confirm your account."
          : "Signed in!"
    );
  }

  return (
    <div className="mx-auto max-w-md pb-16 pt-12">
      <div className="mb-6 text-center">
        <div className="mb-3 inline-block">
          <LogoMark size={44} />
        </div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">
          {signUp ? "Join Hala" : "Welcome back"}
        </h1>
        <p className="mt-1.5 text-sm text-ink-500">
          {signUp
            ? "Sell what you don't wear. Find what you'll love."
            : "Sign in to your wardrobe."}
        </p>
      </div>

      <form
        onSubmit={submit}
        className="space-y-4 rounded-3xl border border-sand-200 bg-sand-25 p-6 sm:p-7"
      >
        <div>
          <Label htmlFor="a-email">Email</Label>
          <Input
            id="a-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <Label htmlFor="a-password">Password</Label>
          <Input
            id="a-password"
            type="password"
            autoComplete={signUp ? "new-password" : "current-password"}
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
          />
        </div>
        {signUp && (
          <div>
            <Label htmlFor="a-emirate">Your emirate</Label>
            <Select id="a-emirate" defaultValue="Dubai">
              {EMIRATES.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </Select>
            <p className="mt-1.5 text-xs text-ink-500">
              We use this to show you nearby items first. You can change it any
              time in Settings.
            </p>
          </div>
        )}

        {status && (
          <p className="rounded-xl bg-teal-50 px-3.5 py-3 text-sm leading-relaxed text-teal-800">
            {status}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? "One moment…" : signUp ? "Create account" : "Sign in"}
        </Button>

        <div className="relative py-1 text-center">
          <span className="relative z-10 bg-sand-25 px-3 text-xs font-medium uppercase tracking-wide text-ink-400">
            or
          </span>
          <span className="absolute inset-x-0 top-1/2 h-px bg-sand-200" aria-hidden="true" />
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() =>
            setStatus(
              isDemoMode
                ? "Google sign-in switches on with Supabase Auth — one click once keys are added."
                : "Redirecting to Google…"
            )
          }
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.3-2.1 3.7-5.2 3.7-8.6z" />
            <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-6-2.1-6.9-5.1l-3.9 3C3.2 21.3 7.3 24 12 24z" />
            <path fill="#FBBC05" d="M5.1 14.3c-.3-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3l-4-3C.4 8.3 0 10.1 0 12s.4 3.7 1.2 5.3l3.9-3z" />
            <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4L19 2.9C17 1.1 14.7 0 12 0 7.3 0 3.2 2.7 1.2 6.7l4 3c.9-3 3.6-5 6.8-5z" />
          </svg>
          Continue with Google
        </Button>

        <p className="pt-1 text-center text-sm text-ink-500">
          {signUp ? "Already on Hala?" : "New to Hala?"}{" "}
          <Link
            href={signUp ? "/auth/sign-in" : "/auth/sign-up"}
            className="font-semibold text-teal-800 hover:text-teal-600"
          >
            {signUp ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </form>
    </div>
  );
}
