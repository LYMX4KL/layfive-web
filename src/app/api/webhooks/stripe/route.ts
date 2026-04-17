import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

// Disable body parsing — Stripe needs raw body
export const dynamic = "force-dynamic";

/* ── Map Stripe price IDs to tier names ──────────────────── */

function tierFromPriceId(priceId: string | null): "pro" | "premium" | "free" {
  if (!priceId) return "free";
  const proIds = [
    process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_MONTHLY,
    process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ANNUAL,
  ];
  const premiumIds = [
    process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_MONTHLY,
    process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ANNUAL,
  ];
  if (premiumIds.includes(priceId)) return "premium";
  if (proIds.includes(priceId)) return "pro";
  // Fallback: check subscription metadata (set during checkout)
  return "free";
}

function tierFromSubscription(subscription: Stripe.Subscription): "pro" | "premium" | "free" {
  // First try price ID mapping
  const priceId = subscription.items.data[0]?.price.id || null;
  const fromPrice = tierFromPriceId(priceId);
  if (fromPrice !== "free") return fromPrice;

  // Fallback: check metadata set during checkout
  const metaTier = subscription.metadata?.tier;
  if (metaTier === "pro" || metaTier === "premium") return metaTier;

  return "free";
}

/* ── Webhook handler ─────────────────────────────────────── */

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find user by stripe_customer_id
        const { data: profile } = await getSupabaseAdmin()
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          // Map subscription status
          const status =
            subscription.status === "active" ||
            subscription.status === "trialing"
              ? "active"
              : subscription.status === "past_due"
                ? "past_due"
                : subscription.status === "canceled"
                  ? "canceled"
                  : "free";

          // Map price → tier
          const tier =
            status === "active" ? tierFromSubscription(subscription) : "free";

          await getSupabaseAdmin()
            .from("profiles")
            .update({
              subscription_status: status,
              subscription_id: subscription.id,
              subscription_price_id:
                subscription.items.data[0]?.price.id || null,
              subscription_current_period_end: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
              tier: tier,
            })
            .eq("id", profile.id);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { data: profile } = await getSupabaseAdmin()
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await getSupabaseAdmin()
            .from("profiles")
            .update({
              subscription_status: "free",
              subscription_id: null,
              subscription_price_id: null,
              subscription_current_period_end: null,
              tier: "free",
            })
            .eq("id", profile.id);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook processing error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
