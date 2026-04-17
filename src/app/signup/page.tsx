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
          <label className="block text-sm text
