import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import PricingCards from "./PricingCards";

export const metadata = { title: "Pricing — LayFive" };

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let currentTier: "free" | "pro" | "premium" = "free";

  if (user) {
    const { data: profile } = await getSupabaseAdmin()
      .from("profiles")
      .select("tier")
      .eq("id", user.id)
      .single();
    if (profile?.tier === "pro" || profile?.tier === "premium") {
      currentTier = profile.tier;
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-bold text-center">Pricing</h1>
      <p className="mt-3 text-center text-neutral-400">
        Free forever, or unlock more with Pro or Premium.
      </p>
      <PricingCards isLoggedIn={!!user} currentTier={currentTier} />
    </div>
  );
}
