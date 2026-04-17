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
      // Continue anyway â don't block checkout for a logging failure
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
              treat roulette as entertainment, not as a source of income.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-100">3. Responsible gambling</h3>
            <p className="mt-1">
              Play within your means. Set a bankroll limit before you play and stick to it.
              Never gamble with money you cannot afford to lose. If gambling is affecting
              your life, please seek help: call 1-800-GAMBLER (US) or visit ncpgambling.org.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-100">4. Non-refundable</h3>
            <p className="mt-1">
              Paid subscription benefits are non-refundable after purchase. You may cancel
              at any time, but no refunds will be issued for the current billing period.
              {tier === "pro" && " The 7-day free trial can be canceled at no charge before the trial ends."}
            </p>
          </div>
        </div>

        <label className="mt-6 flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-neutral-600 bg-neutral-800 text-amber-400 focus:ring-amber-400"
          />
          <span className="text-sm text-neutral-200">
            I have read and agree to the above disclaimer. I understand that LayFive
            is not a winning system and that gambling involves risk of loss.
          </span>
        </label>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-md border border-neutral-700 px-4 py-3 text-sm font-semibold text-neutral-400 hover:border-neutral-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAccept}
            disabled={!checked || saving}
            className={`flex-1 rounded-md px-4 py-3 text-sm font-semibold transition-colors disabled:opacity-40 ${
              tier === "premium"
                ? "bg-purple-400 text-neutral-900 hover:bg-purple-300"
                : "bg-amber-400 text-neutral-900 hover:bg-amber-300"
            }`}
          >
            {saving ? "Processing..." : "I Agree \u2014 Continue to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
