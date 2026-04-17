import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import Link from "next/link";
import AccountActions from "./AccountActions";

export const metadata = { title: "Account — LayFive" };

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await getSupabaseAdmin()
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const tier: "free" | "pro" | "premium" = profile?.tier || "free";
  const isActive = profile?.subscription_status === "active";
  const isPastDue = profile?.subscription_status === "past_due";

  const tierLabel = tier === "premium" ? "Premium" : tier === "pro" ? "Pro" : "Free";
  const tierColor =
    tier === "premium"
      ? "text-purple-400"
      : tier === "pro"
        ? "text-amber-400"
        : "text-neutral-300";

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-3xl font-bold">Your Account</h1>

      <div className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
        <div className="text-sm text-neutral-400">Signed in as</div>
        <div className="mt-1 text-lg font-semibold">{user.email}</div>

        <div className="mt-6 border-t border-neutral-800 pt-6">
          <div className="text-sm text-neutral-400">Membership</div>
          <div className="mt-1 flex items-center gap-3">
            <span className={`text-lg font-semibold ${tierColor}`}>
              {isPastDue ? `${tierLabel} (Past Due)` : tierLabel}
            </span>
            {isActive && profile?.subscription_current_period_end && (
              <span className="text-xs text-neutral-500">
                Renews{" "}
                {new Date(
                  profile.subscription_current_period_end
                ).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <AccountActions isActive={isActive} isPastDue={isPastDue} />

      {tier === "free" && (
        <div className="mt-8 rounded-lg border border-amber-400/30 bg-amber-400/5 p-6 text-center">
          <p className="text-neutral
