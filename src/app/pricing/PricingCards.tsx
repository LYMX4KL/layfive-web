"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FREE_FEATURES = [
  { text: "Scorecard tab", included: true },
  {
    text: "Reference cards (all 5 elements + quick ref, coverage, splits)",
    included: true,
  },
  { text: "All 6 video lessons", included: true },
  { text: "Cover suggestions", included: false },
  { text: "Practice simulator", included: false },
  { text: "W/L Log & Reports", included: false },
  { text: "Session history", included: false },
];

const MEMBER_FEATURES = [
  "Everything in Free",
  "Cover element suggestions",
  "Practice casino simulator",
  "Full session history & analysis",
  "W/L tracking, reports & exports",
  "Coaching signals & analysis",
  "Priority AI customer service",
  "Live streaming session access",
  "Member-only articles & tips",
];

export default function PricingCards({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubscribe() {
    if (!isLoggedIn) {
      router.push("/signup?redirect=/pricing");
      return;
    }

    setLoading(true);
    const priceId =
      billing === "monthly"
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      {/* Billing toggle */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-full border border-neutral-700 p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              billing === "monthly"
                ? "bg-amber-400 text-neutral-900"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              billing === "annual"
                ? "bg-amber-400 text-neutral-900"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Annual (save 16%)
          </button>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Free tier */}
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
          <div className="text-sm uppercase tracking-wider text-neutral-500">
            Free
          </div>
          <div className="mt-2 text-4xl font-bold">$0</div>
          <ul className="mt-6 space-y-2 text-sm text-neutral-300">
            {FREE_FEATURES.map((f) => (
              <li
                key={f.text}
                className={f.included ? "" : "text-neutral-600"}
              >
                {f.included ? "\u2713" : "\u2717"} {f.text}
              </li>
            ))}
          </ul>
          <button
            onClick={() => router.push(isLoggedIn ? "/app" : "/signup")}
            className="mt-8 w-full rounded-md border border-neutral-700 px-6 py-3 font-semibold hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            {isLoggedIn ? "Open Tracker" : "Start Free"}
          </button>
        </div>

        {/* Member tier */}
        <div className="rounded-lg border border-amber-400 bg-amber-400/5 p-8 relative">
          <div className="absolute -top-3 left-8 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-neutral-900">
            Most Popular
          </div>
          <div className="text-sm uppercase tracking-wider text-amber-400">
            Member
          </div>
          <div className="mt-2 text-4xl font-bold">
            {billing === "monthly" ? "$2.99" : "$30"}
            <span className="text-lg font-normal text-neutral-400">
              {billing === "monthly" ? "/mo" : "/year"}
            </span>
          </div>
          {billing === "monthly" && (
            <div className="text-xs text-neutral-400">
              or $30/year — save 16%
            </div>
          )}
          {billing === "annual" && (
            <div className="text-xs text-neutral-400">
              $2.50/mo billed annually
            </div>
          )}
          <ul className="mt-6 space-y-2 text-sm text-neutral-100">
            {MEMBER_FEATURES.map((f) => (
              <li key={f}>{"\u2713"} {f}</li>
            ))}
          </ul>
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="mt-8 w-full rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300 transition-colors disabled:opacity-50"
          >
            {loading ? "Redirecting to checkout..." : "Become a Member"}
          </button>
        </div>
      </div>
    </>
  );
}
