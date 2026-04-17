"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DisclaimerModal from "@/components/DisclaimerModal";

const FREE_FEATURES = [
  { text: "Scorecard tab (spin entry & hit counters)", included: true },
  { text: "Reference cards (all 5 elements)", included: true },
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
  "Live P&L tracker (bankroll, per-spin net, stats panel)",
  "Photo OCR — scan scorecard from camera via AI Vision",
  "Group session sharing (6-digit code, host-only entry)",
  "Rules engine embedded in scorecard (H1–H4, C1–C3)",
  "Element selector & lead-loss warning",
];

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
    setDisclaimerTier(tier);
  }

  function onDisclaimerAccepted() {
    if (disclaimerTier) {
      startCheckout(disclaimerTier);
    }
    setDisclaimerTier(null);
  }

  const canUpgradeToPro = currentTier === "free";
  const canUpgradeToPremium = currentTier !== "premium";

  return (
    <>
      {disclaimerTier && (
        <DisclaimerModal
          tier={disclaimerTier}
          onAccept={onDisclaimerAccepted}
          onCancel={() => setDisclaimerTier(null)}
        />
      )}

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
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
          <div className="text-sm uppercase tracking-wider text-neutral-500">Free</div>
          <div className="mt-2 text-4xl font-bold">$0</div>
          <div className="mt-1 text-xs text-neutral-500">No credit card required</div>
          <ul className="mt-6
