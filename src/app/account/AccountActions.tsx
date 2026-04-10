"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AccountActions({
  isActive,
  isPastDue,
}: {
  isActive: boolean;
  isPastDue: boolean;
}) {
  const router = useRouter();

  async function handleManageSubscription() {
    const res = await fetch("/api/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {(isActive || isPastDue) && (
        <button
          onClick={handleManageSubscription}
          className="rounded-md border border-neutral-700 px-4 py-2 text-sm font-semibold hover:border-amber-400 hover:text-amber-400 transition-colors"
        >
          Manage Subscription
        </button>
      )}
      <button
        onClick={handleLogout}
        className="rounded-md border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-400 hover:border-red-400 hover:text-red-400 transition-colors"
      >
        Log Out
      </button>
    </div>
  );
}
