# LayFive Membership Payment Implementation Guide

**For:** Claude Code execution  
**Project:** layfive-web (Next.js 16, App Router, TypeScript, Tailwind v4)  
**Date:** 2026-04-10  
**Goal:** Add Supabase Auth + Stripe subscription payments ($2.99/mo or $30/yr)

---

## Overview

This guide adds membership payments to layfive.com. The site already has a pricing page with Free and Member tiers. We need to wire up real auth (Supabase) and real payments (Stripe) so users can sign up, subscribe, and access gated tracker features.

**Current state:** No auth, no payment, no API routes, no middleware, no .env file. Only 3 production deps (next, react, react-dom).

**Target state:** Full signup/login flow, Stripe Checkout for subscriptions, webhook to sync status, gated tracker features, account management page.

---

## Step 1: Install Dependencies

```bash
cd layfive-web
npm install @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js
```

---

## Step 2: Environment Variables

Create `.env.local` in the project root:

```env
# Supabase (get from https://supabase.com/dashboard → LayFive project → Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe (get from https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**IMPORTANT:** Also add these to Vercel Environment Variables (Settings → Environment Variables) for production. Change `NEXT_PUBLIC_APP_URL` to `https://layfive.com` in production.

---

## Step 3: Supabase Client Setup

### 3a. Browser client — `src/lib/supabase/client.ts`

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### 3b. Server client — `src/lib/supabase/server.ts`

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  );
}
```

### 3c. Admin client (service role) — `src/lib/supabase/admin.ts`

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

### 3d. Stripe server client — `src/lib/stripe.ts`

```typescript
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
  typescript: true,
});
```

---

## Step 4: Supabase Database Setup

Run this SQL in Supabase SQL Editor (Dashboard → SQL Editor → New Query):

```sql
-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  stripe_customer_id TEXT UNIQUE,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'active', 'canceled', 'past_due')),
  subscription_id TEXT,
  subscription_price_id TEXT,
  subscription_current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Service role can do anything (for webhooks)
CREATE POLICY "Service role full access"
  ON public.profiles FOR ALL
  USING (auth.role() = 'service_role');

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
```

Also configure in Supabase Dashboard:
- **Authentication → URL Configuration:** Set Site URL to `https://layfive.com` (or `http://localhost:3000` for dev)
- **Authentication → URL Configuration:** Add `http://localhost:3000/auth/callback` and `https://layfive.com/auth/callback` to Redirect URLs

---

## Step 5: Middleware — `src/middleware.ts`

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/account", "/app"];
// Routes that should redirect to /account if already logged in
const authRoutes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Redirect unauthenticated users away from protected routes
  if (!user && protectedRoutes.some((r) => pathname.startsWith(r))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth routes
  if (user && authRoutes.some((r) => pathname.startsWith(r))) {
    const url = request.nextUrl.clone();
    url.pathname = "/account";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

---

## Step 6: Auth Pages

### 6a. Signup page — `src/app/signup/page.tsx`

```typescript
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="mt-4 text-neutral-400">
          We sent a confirmation link to <span className="text-amber-400">{email}</span>.
          Click the link to activate your account.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-3xl font-bold text-center">Create your account</h1>
      <p className="mt-2 text-center text-neutral-400">
        Join LayFive and start tracking your sessions.
      </p>

      <form onSubmit={handleSignup} className="mt-8 space-y-4">
        {error && (
          <div className="rounded-md bg-red-900/30 border border-red-800 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm text-neutral-400 mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none"
            placeholder="Kenny Lin"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none"
            placeholder="At least 6 characters"
            minLength={6}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-400">
        Already have an account?{" "}
        <Link href="/login" className="text-amber-400 hover:text-amber-300">
          Log in
        </Link>
      </p>
    </div>
  );
}
```

### 6b. Login page — `src/app/login/page.tsx`

```typescript
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push(redirect);
      router.refresh();
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-3xl font-bold text-center">Welcome back</h1>
      <p className="mt-2 text-center text-neutral-400">
        Log in to your LayFive account.
      </p>

      <form onSubmit={handleLogin} className="mt-8 space-y-4">
        {error && (
          <div className="rounded-md bg-red-900/30 border border-red-800 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm text-neutral-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none"
            placeholder="Your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300 transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-400">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-amber-400 hover:text-amber-300">
          Sign up
        </Link>
      </p>
    </div>
  );
}
```

### 6c. Auth callback — `src/app/auth/callback/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") || "/account";

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}${redirect}`);
}
```

---

## Step 7: Stripe Setup

### Before coding — create products in Stripe Dashboard:

1. Go to https://dashboard.stripe.com/products
2. Click **+ Add product**
3. Name: `LayFive Membership`
4. Add **two prices**:
   - **Monthly:** $2.99 / month, recurring
   - **Annual:** $30.00 / year, recurring
5. Copy both Price IDs (start with `price_...`)
6. Add them to `.env.local`:

```env
STRIPE_PRICE_MONTHLY=price_xxx
STRIPE_PRICE_ANNUAL=price_yyy
```

### 7a. Checkout API route — `src/app/api/checkout/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json();

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get or create Stripe customer
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;

      await supabaseAdmin
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=canceled`,
      subscription_data: {
        metadata: { supabase_user_id: user.id },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
```

### 7b. Customer portal API route — `src/app/api/portal/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ error: "No subscription found" }, { status: 400 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/account`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Portal error:", err);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
```

### 7c. Stripe webhook — `src/app/api/webhooks/stripe/route.ts`

```typescript
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

// Disable body parsing — Stripe needs raw body
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
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
        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          const status = subscription.status === "active" || subscription.status === "trialing"
            ? "active"
            : subscription.status === "past_due"
            ? "past_due"
            : subscription.status === "canceled"
            ? "canceled"
            : "free";

          await supabaseAdmin
            .from("profiles")
            .update({
              subscription_status: status,
              subscription_id: subscription.id,
              subscription_price_id: subscription.items.data[0]?.price.id || null,
              subscription_current_period_end: new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
            })
            .eq("id", profile.id);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await supabaseAdmin
            .from("profiles")
            .update({
              subscription_status: "free",
              subscription_id: null,
              subscription_price_id: null,
              subscription_current_period_end: null,
            })
            .eq("id", profile.id);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
```

---

## Step 8: Account Page — `src/app/account/page.tsx`

```typescript
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import Link from "next/link";
import AccountActions from "./AccountActions";

export const metadata = { title: "Account — LayFive" };

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const isActive = profile?.subscription_status === "active";
  const isPastDue = profile?.subscription_status === "past_due";

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-3xl font-bold">Your Account</h1>

      <div className="mt-8 rounded-lg border border-neutral-800 bg-neutral-900/50 p-6">
        <div className="text-sm text-neutral-400">Signed in as</div>
        <div className="mt-1 text-lg font-semibold">{user.email}</div>

        <div className="mt-6 border-t border-neutral-800 pt-6">
          <div className="text-sm text-neutral-400">Membership</div>
          <div className="mt-1 flex items-center gap-3">
            <span className={`text-lg font-semibold ${isActive ? "text-amber-400" : "text-neutral-300"}`}>
              {isActive ? "Member" : isPastDue ? "Past Due" : "Free"}
            </span>
            {isActive && profile?.subscription_current_period_end && (
              <span className="text-xs text-neutral-500">
                Renews {new Date(profile.subscription_current_period_end).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <AccountActions isActive={isActive} isPastDue={isPastDue} />

      {!isActive && (
        <div className="mt-8 rounded-lg border border-amber-400/30 bg-amber-400/5 p-6 text-center">
          <p className="text-neutral-300">
            Upgrade to Member to unlock W/L tracking, reports, exports, cover suggestions, practice simulator, and more.
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-block rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300 transition-colors"
          >
            View Pricing
          </Link>
        </div>
      )}
    </div>
  );
}
```

### 8b. Account actions (client component) — `src/app/account/AccountActions.tsx`

```typescript
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
```

---

## Step 9: Update Pricing Page — `src/app/pricing/page.tsx`

Replace the entire file with:

```typescript
import { createClient } from "@/lib/supabase/server";
import PricingCards from "./PricingCards";

export const metadata = { title: "Pricing — LayFive" };

export default async function PricingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

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
```

### 9b. Pricing cards (client component) — `src/app/pricing/PricingCards.tsx`

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FREE_FEATURES = [
  { text: "Scorecard tab", included: true },
  { text: "Reference cards (all 5 elements + quick ref, coverage, splits)", included: true },
  { text: "All 6 video lessons", included: true },
  { text: "Cover suggestions", included: false },
  { text: "Practice simulator", included: false },
  { text: "W/L Log & Reports", included: false },
  { text: "Session history", included: false },
];

const MEMBER_FEATURES = [
  "Everything in Free",
  "Cover element suggestions",
  "Practice casino simulator",
  "Full session history & analysis",
  "W/L tracking, reports & exports",
  "Coaching signals & analysis",
  "Priority AI customer service",
  "Live streaming session access",
  "Member-only articles & tips",
];

export default function PricingCards({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubscribe() {
    if (!isLoggedIn) {
      router.push("/signup?redirect=/pricing");
      return;
    }

    setLoading(true);
    const priceId =
      billing === "monthly"
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <>
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

      <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Free tier */}
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
          <div className="text-sm uppercase tracking-wider text-neutral-500">Free</div>
          <div className="mt-2 text-4xl font-bold">$0</div>
          <ul className="mt-6 space-y-2 text-sm text-neutral-300">
            {FREE_FEATURES.map((f) => (
              <li key={f.text} className={f.included ? "" : "text-neutral-600"}>
                {f.included ? "✓" : "✗"} {f.text}
              </li>
            ))}
          </ul>
          <button
            onClick={() => router.push(isLoggedIn ? "/app" : "/signup")}
            className="mt-8 w-full rounded-md border border-neutral-700 px-6 py-3 font-semibold hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            {isLoggedIn ? "Open Tracker" : "Start Free"}
          </button>
        </div>

        {/* Member tier */}
        <div className="rounded-lg border border-amber-400 bg-amber-400/5 p-8 relative">
          <div className="absolute -top-3 left-8 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-neutral-900">
            Most Popular
          </div>
          <div className="text-sm uppercase tracking-wider text-amber-400">Member</div>
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
          <ul className="mt-6 space-y-2 text-sm text-neutral-100">
            {MEMBER_FEATURES.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>
          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="mt-8 w-full rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300 transition-colors disabled:opacity-50"
          >
            {loading ? "Redirecting to checkout..." : "Become a Member"}
          </button>
        </div>
      </div>
    </>
  );
}
```

**IMPORTANT:** Also add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PRICE_MONTHLY=price_xxx
NEXT_PUBLIC_STRIPE_PRICE_ANNUAL=price_yyy
```

---

## Step 10: Update Layout Nav — `src/app/layout.tsx`

Update the header nav to show "Account" instead of "Sign Up" when logged in. Replace the current layout with an async server component that checks auth, or extract the header into a client component that uses Supabase to check session.

**Recommended approach:** Create `src/components/NavAuth.tsx`:

```typescript
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

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
```

Then in `layout.tsx`, replace the Sign Up link with `<NavAuth />`. Import it at the top and use it in the header.

---

## Step 11: Update dictionaries.ts

Add these new entries to both `en` and `zh` sections for the W/L tracking membership perk:

**English (add to `en.home.paid.items`):**
```typescript
items: [
  "✓ Everything in Free",
  "✓ Cover element suggestions",
  "✓ Practice casino simulator",
  "✓ Full session history",
  "✓ W/L tracking, reports & exports",  // NEW
  "✓ Coaching signals & analysis",
  "✓ Priority AI support",
],
```

**Chinese (add to `zh.home.paid.items`):**
```typescript
items: [
  "✓ 包含免费版全部内容",
  "✓ 元素覆盖建议",
  "✓ 练习模拟器",
  "✓ 完整历史记录",
  "✓ 赢亏追踪、报表与导出",  // NEW
  "✓ 教练信号与分析",
  "✓ 优先 AI 客服",
],
```

Also add `"✗ W/L Log & Reports"` / `"✗ 赢亏日志与报表"` to the free tier items in both languages.

---

## Step 12: Stripe Webhook Setup (after Stripe account is created)

### Local development:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe
# or download from https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret it gives you into `STRIPE_WEBHOOK_SECRET` in `.env.local`.

### Production (Vercel):

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click **+ Add endpoint**
3. URL: `https://layfive.com/api/webhooks/stripe`
4. Events to listen for:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the signing secret to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

---

## Step 13: Configure Stripe Customer Portal

1. Go to https://dashboard.stripe.com/test/settings/billing/portal
2. Enable: "Allow customers to update payment methods"
3. Enable: "Allow customers to cancel subscriptions"
4. Set cancellation: "Cancel at end of billing period"
5. Save

---

## File Summary — All new files to create

```
src/
  lib/
    supabase/
      client.ts          (Step 3a)
      server.ts          (Step 3b)
      admin.ts           (Step 3c)
    stripe.ts            (Step 3d)
  app/
    signup/
      page.tsx           (Step 6a)
    login/
      page.tsx           (Step 6b)
    auth/
      callback/
        route.ts         (Step 6c)
    account/
      page.tsx           (Step 8a)
      AccountActions.tsx  (Step 8b)
    pricing/
      PricingCards.tsx    (Step 9b)
    api/
      checkout/
        route.ts         (Step 7a)
      portal/
        route.ts         (Step 7b)
      webhooks/
        stripe/
          route.ts       (Step 7c)
  components/
    NavAuth.tsx          (Step 10)
  middleware.ts          (Step 5)
```

## Files to modify

```
src/app/pricing/page.tsx     (Step 9 — replace with server component)
src/app/layout.tsx           (Step 10 — swap Sign Up link for NavAuth)
src/lib/dictionaries.ts      (Step 11 — add W/L perk text)
.env.local                   (Step 2 — create)
```

---

## Execution Order for Claude Code

1. `npm install @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js`
2. Create `.env.local` with placeholder values
3. Create `src/lib/supabase/client.ts`, `server.ts`, `admin.ts`
4. Create `src/lib/stripe.ts`
5. Create `src/middleware.ts`
6. Create `src/app/signup/page.tsx` and `src/app/login/page.tsx`
7. Create `src/app/auth/callback/route.ts`
8. Create all API routes (`checkout`, `portal`, `webhooks/stripe`)
9. Create `src/app/account/page.tsx` and `AccountActions.tsx`
10. Create `src/components/NavAuth.tsx`
11. Update `src/app/layout.tsx` to use NavAuth
12. Replace `src/app/pricing/page.tsx` and create `PricingCards.tsx`
13. Update `src/lib/dictionaries.ts` with new perk text
14. Run `npm run build` to verify no TypeScript errors
15. Run Supabase SQL migration (Step 4)
16. Test: sign up, log in, visit /pricing, click subscribe (will fail without Stripe keys — that's OK)

---

## Post-Implementation: Kenny's Manual Steps

1. **Create Stripe account** at https://dashboard.stripe.com
2. **Create product + prices** (Step 7 intro)
3. **Copy API keys** to `.env.local` and Vercel
4. **Run Supabase SQL** (Step 4)
5. **Configure Supabase auth redirects** (Step 4 bottom)
6. **Configure Stripe Customer Portal** (Step 13)
7. **Add webhook endpoint** in Stripe Dashboard (Step 12)
8. **Test full flow** in Stripe test mode before going live
