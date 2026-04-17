"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DisclaimerModal from "@/components/DisclaimerModal";

/* ââ Feature lists per tier âââââââââââââââââââââââââââââââ */

const FREE_FEATURES = [
  { text: "Scorecard tab (spin entry & hit counters)", included: true },
  { text: "Reference cards (all 5 elements)", included: true },h
  { text: "All 6 video lessons", included: true },
  { text: "Basic session save/load", included: true },
  { text: "Cover suggestions & coaching signals", included: false },
  { text: "Practice simulator", included: false },
  { text: "W/L Log, reports & exports", included: false },
  { text: "Live P&L tracker", included: false },
  { text: "Photo OCR (AI scan)", included: false },
];

const PRO_FEATURES = [
  "Everything in Free",
  "Restart feature (reset scorecard view)",
  "Cover element suggestions (green star, signals)",
  "Practice casino simulator",
  "Full session history & analysis (4 pooled metrics)",
  "W/L Log, reports & exports",
  "Coaching signals & AI Insights",
  "Priority AI customer service",
  "Live streaming session access",
  "Member-only articles & tips",
];

const PREMIUM_FEATURES = [
  "Everything in Pro",
  "Live P\u0026L tracker (bankroll, per-spin net, stats panel)",
  "Photo OCR \u2014 scan scorecard from camera via AI Vision",
  "Group session sharing (6-digit code, host-only entry)",
  "Rules engine embedded in scorecard (H1\u2013H4, C1\u2013C3)",
  "Element selector \u0026 lead-loss warning",
];

/* ââ Component ââââââââââââââââââââââââââââââââââââââââââââ */

export default function PricingCards({
  isLoggedIn,
  currentTier,
}: {
  isLoggedIn: boolean;
  currentTier: "free" | "pro" | "premium";
}) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [loading, setLoading] = useState<"pro" | "premium" | null>(null);
  const [disclaimerTier, setDisclaimerTier] = useState<"pro" | "premium" | null>(null);
  const router = useRouter();

  async function startCheckout(tier: "pro" | "premium") {
    setLoading(tier);

    const priceId =
      tier === "pro"
        ? billing === "monthly"
          ? process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_MONTHLY
          : process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ANNUAL
        : billing === "monthly"
          ? process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_MONTHLY
          : process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ANNUAL;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, tier }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(null);
      alert("Something went wrong. Please try again.");
    }
  }

  function handleSubscribe(tier: "pro" | "premium") {
    if (!isLoggedIn) {
      router.push(`/signup?redirect=/pricing`);
      return;
    }
    // Show disclaimer modal before checkout
    setDisclaimerTier(tier);
  }

  function onDisclaimerAccepted() {
    if (disclaimerTier) {
      startCheckout(disclaimerTier);
    }
    setDisclaimerTier(null);
  }

  // Determine which buttons to show based on current tier
  const canUpgradeToPro = currentTier === "free";
  const canUpgradeToPremium = currentTier !== "premium";

  return (
    <>
      {/* Disclaimer modal */}
      {disclaimerTier && (
        <DisclaimerModal
          tier={disclaimerTier}
          onAccept={onDisclaimerAccepted}
          onCancel={() => setDisclaimerTier(null)}
        />
      )}

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

      <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* ââ Free tier ââââââââââââââââââââââââââââ */}
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
          <div className="text-sm uppercase tracking-wider text-neutral-500">Free</div>
          <div className="mt-2 text-4xl font-bold">$0</div>
          <div className="mt-1 text-xs text-neutral-500">No credit card required</div>

          <ul className="mt-6 space-y-2 text-sm text-neutral-300">
            {FREE_FEATURES.map((f) => (
              <li key={f.text} className={f.included ? "" : "text-neutral-600"}>
                {f.included ? "\u2713" : "\u2717"} {f.text}
              </li>
            ))}
          </ul>

          <button
            onClick={() =>
              isLoggedIn
                ? (window.location.href = "https://lymx4kl.github.io/layfive-app/")
                : router.push("/signup")
            }
            className="mt-8 w-full rounded-md border border-neutral-700 px-6 py-3 font-semibold hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            {isLoggedIn ? "Open Tracker" : "Start Free"}
          </button>
        </div>

        {/* ââ Pro tier âââââââââââââââââââââââââââââ */}
        <div className="rounded-lg border border-amber-400 bg-amber-400/5 p-8 relative">
          <div className="absolute -top-3 left-8 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-neutral-900">
            Most Popular
          </div>
          <div className="text-sm uppercase tracking-wider text-amber-400">Pro</div>
          <div className="mt-2 text-4xl font-bold">
            {billing === "monthly" ? "$2.99" : "$30"}
            <span className="text-lg font-normal text-neutral-400">
              {billing === "monthly" ? "/mo" : "/year"}
            </span>
          </div>
          {billing === "monthly" && (
            <div className="text-xs text-neutral-400">or $30/year — save 16%</div>
          )}
          {billing === "annual" && (
            <div className="text-xs text-neutral-400">$2.50/mo billed annually</div>
          )}
          <div className="mt-1 text-xs font-medium text-amber-300">
            7-day free trial included
          </div>

          <ul className="mt-6 space-y-2 text-sm text-neutral-100">
            {PRO_FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          {canUpgradeToPro ? (
            <button
              onClick={() => handleSubscribe("pro")}
              disabled={loading === "pro"}
              className="mt-8 w-full rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300 transition-colors disabled:opacity-50"
            >
              {loading === "pro" ? "Redirecting..." : "Start 7-Day Free Trial"}
            </button>
          ) : (
            <div className="mt-8 w-full rounded-md border border-amber-400/30 px-6 py-3 text-center text-sm text-amber-400">
              {currentTier === "pro" ? "\u2713 Current Plan" : "Included in Premium"}
            </div>
          )}
        </div>

        {/* ââ Premium tier âââââââââââââââââââââââââ */}
        <div className="rounded-lg border border-purple-400 bg-purple-400/5 p-8 relative">
          <div className="absolute -top-3 left-8 rounded-full bg-purple-400 px-3 py-1 text-xs font-semibold text-neutral-900">
            Full Access
          </div>
          <div className="text-sm uppercase tracking-wider text-purple-400">Premium</div>
          <div className="mt-2 text-4xl font-bold">
            {billing === "monthly" ? "$7.99" : "$70"}
            <span className="text-lg font-normal text-neutral-400">
              {billing === "monthly" ? "/mo" : "/year"}
            </span>
          </div>
          {billing === "monthly" && (
            <div className="text-xs text-neutral-400">or $70/year — save 27%</div>
          )}
          {billing === "annual" && (
            <div className="text-xs text-neutral-400">$5.83/mo billed annually</div>
          )}
          {currentTier === "free" && (
            <div className="mt-1 text-xs font-medium text-purple-300">
              7-day free trial included
            </div>
          )}

          <ul className="mt-6 space-y-2 text-sm text-neutral-100">
            {PREMIUM_FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          {canUpgradeToPremium ? (
            <button
              onClick={() => handleSubscribe("premium")}
              disabled={loading === "premium"}
              className="mt-8 w-full rounded-md bg-purple-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-purple-300 transition-colors disabled:opacity-50"
            >
              {loading === "premium"
                ? "Redirecting..."
                : currentTier === "free"
                  ? "Start 7-Day Free Trial"
                  : "Upgrade to Premium"}
            </button>
          ) : (
            <div className="mt-8 w-full rounded-md border border-purple-400/30 px-6 py-3 text-center text-sm text-purple-400">
              \u2713 Current Plan
            </div>
          )}
        </div>
      </div>
    </>
  );
}
