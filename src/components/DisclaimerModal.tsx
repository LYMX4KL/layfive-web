"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface DisclaimerModalProps {
  tier: "pro" | "premium";
  onAccept: () => void;
  onCancel: () => void;
}

export default function DisclaimerModal({ tier, onAccept, onCancel }: DisclaimerModalProps) {
  const [checked, setChecked] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleAccept() {
    if (!checked) return;
    setSaving(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase.from("disclaimer_acceptances").insert({
          user_id: user.id,
          version: "v1.0",
          context: `upgrade_${tier}`,
        });
      }
    } catch (e) {
      console.error("Failed to record disclaimer:", e);
    }

    onAccept();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-lg rounded-lg border border-neutral-700 bg-neutral-900 p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-amber-400">
          Important Disclaimer
        </h2>
        <p className="mt-2 text-sm text-neutral-400">
          Please read and accept before upgrading to {tier === "pro" ? "Pro" : "Premium"}.
        </p>

        <div className="mt-4 space-y-4 text-sm text-neutral-300 leading-relaxed">
          <div>
            <h3 className="font-semibold text-neutral-100">1. Not a winning strategy</h3>
            <p className="mt-1">
              LayFive is a roulette tracking and analysis tool. It does not change the
              house edge, predict outcomes, or guarantee wins. Every spin is independent.
              Past results do not predict future outcomes. The casino always has a
              mathematical advantage.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-100">2. Entertainment and education only</h3>
            <p className="mt-1">
              LayFive is provided for entertainment and educational purposes. It is not
              financial advice, gambling advice, or an invitation to gamble. Users should
              treat roulette as
