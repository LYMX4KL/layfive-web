"use client";

import { useState, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!disclaimerAccepted) {
      setError("You must accept the disclaimer to create an account.");
      return;
    }

    setLoading(true);
    setError("");
    const supabase = createClient();
    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
      },
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    // Record disclaimer acceptance
    if (data.user) {
      try {
        await supabase.from("disclaimer_acceptances").insert({
          user_id: data.user.id,
          version: "v1.0",
          context: "signup",
        });
      } catch (e) {
        console.error("Failed to record disclaimer:", e);
      }
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="mt-4 text-neutral-400">
          We sent a confirmation link to{" "}
          <span className="text-amber-400">{email}</span>. Click the link to
          activate your account.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-3xl font-bold text-center">Create your account</h1>
      <p className="mt-2 text-center text-neutral-400">
        Join LayFive and start tracking your sessions.
      </p>
      <form onSubmit={handleSignup} className="mt-8 space-y-4">
        {error && (
          <div className="rounded-md bg-red-900/30 border border-red-800 p-3 text-sm text-red-300">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none"
            placeholder="Kenny Lin"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none"
            placeholder="At least 6 characters"
            minLength={6}
            required
          />
        </div>

        {/* Disclaimer acceptance */}
        <div className="rounded-md border border-neutral-700 bg-neutral-900/50 p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={disclaimerAccepted}
              onChange={(e) => setDisclaimerAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-neutral-600 bg-neutral-800 text-amber-400 focus:ring-amber-400"
            />
            <span className="text-sm text-neutral-300">
              I have read and agree to the{" "}
              <Link
                href="/disclaimer"
                target="_blank"
                className="text-amber-400 hover:text-amber-300 underline"
              >
                Important Disclaimer
              </Link>
              . I understand that LayFive is not a winning system, is for
              entertainment and educational purposes only, and that gambling
              involves risk of loss. I confirm that I am at least 21 years old
              (or the legal gambling age in my jurisdiction).
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !disclaimerAccepted}
          className="w-full rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-400">
        Already have an account?{" "}
        <Link href="/login" className="text-amber-400 hover:text-amber-300">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
