"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

export default function NavAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (user) {
    return (
      <Link
        href="/account"
        className="rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-amber-300 transition-colors"
      >
        Account
      </Link>
    );
  }

  return (
    <Link
      href="/signup"
      className="rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-amber-300 transition-colors"
    >
      Sign Up
    </Link>
  );
}
