import { createClient } from "@/lib/supabase/server";
import PricingCards from "./PricingCards";

export const metadata = { title: "Pricing — LayFive" };

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-bold text-center">Pricing</h1>
      <p className="mt-3 text-center text-neutral-400">
        Free forever, or unlock everything for the price of a coffee.
      </p>
      <PricingCards isLoggedIn={!!user} />
    </div>
  );
}
