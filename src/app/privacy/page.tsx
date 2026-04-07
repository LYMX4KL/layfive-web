export const metadata = { title: "Privacy Policy — LayFive" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-neutral-300 leading-relaxed">
      <h1 className="text-4xl font-bold text-neutral-100">Privacy Policy</h1>
      <p className="mt-3 text-sm text-neutral-500">Draft — final version pending attorney review.</p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">What we collect</h2>
      <p className="mt-3">
        We collect the information you provide when signing up (name, email, country, optional phone),
        the spins and sessions you log inside the app, and basic analytics (page views, browser
        type, approximate location) via Google Analytics.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">How we use it</h2>
      <p className="mt-3">
        To operate your account, send you relevant product updates if you opt in, improve the
        app, and respond to support requests.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">Who we share it with</h2>
      <p className="mt-3">
        Only service providers that help us run LayFive: Vercel (hosting), Supabase (database and
        auth), Stripe (payments), Resend (email delivery), and Anthropic (AI customer service).
        We never sell your data.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">Your rights</h2>
      <p className="mt-3">
        You can request a copy of your data or delete your account at any time by emailing
        lymx4kl@gmail.com.
      </p>
    </div>
  );
}
