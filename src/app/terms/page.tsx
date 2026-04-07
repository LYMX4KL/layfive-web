export const metadata = { title: "Terms of Service — LayFive" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-neutral-300 leading-relaxed">
      <h1 className="text-4xl font-bold text-neutral-100">Terms of Service</h1>
      <p className="mt-3 text-sm text-neutral-500">Draft — final version pending attorney review.</p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">1. Acceptance</h2>
      <p className="mt-3">
        By creating an account or using layfive.com, you agree to these Terms of Service
        and the Privacy Policy.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">2. License</h2>
      <p className="mt-3">
        LayFive grants you a personal, non-transferable, non-exclusive license to use the
        site and the app for your own entertainment and education. You may not copy,
        redistribute, resell, sublicense, or reverse engineer any LayFive strategy,
        reference card, illustration, or code.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">3. Membership and billing</h2>
      <p className="mt-3">
        Paid memberships auto-renew until canceled. You may cancel at any time from your
        account page. Refunds are handled case-by-case by contacting support.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">4. Intellectual property</h2>
      <p className="mt-3">
        All LayFive content, branding, strategies, and software are owned by Kenny Lin.
        LayFive™ is an in-use trademark.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">5. No gambling guarantee</h2>
      <p className="mt-3">
        See the <a href="/disclaimer" className="text-amber-400">Disclaimer</a> for the
        full statement. LayFive does not guarantee winnings.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">6. Changes</h2>
      <p className="mt-3">
        These terms may be updated. When they change, you will be asked to re-confirm
        consent the next time you log in.
      </p>
    </div>
  );
}
