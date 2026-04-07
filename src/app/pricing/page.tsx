import Link from "next/link";

export const metadata = { title: "Pricing — LayFive" };

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-bold text-center">Pricing</h1>
      <p className="mt-3 text-center text-neutral-400">
        Free forever, or unlock everything for the price of a coffee.
      </p>
      <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
          <div className="text-sm uppercase tracking-wider text-neutral-500">Free</div>
          <div className="mt-2 text-4xl font-bold">$0</div>
          <ul className="mt-6 space-y-2 text-sm text-neutral-300">
            <li>✓ Scorecard tab</li>
            <li>✓ Reference cards (all 5 elements + quick ref, coverage, splits)</li>
            <li>✗ Coaching signals</li>
            <li>✗ Cover suggestions</li>
            <li>✗ Practice simulator</li>
            <li>✗ Session history</li>
          </ul>
          <Link
            href="/signup"
            className="mt-8 block text-center rounded-md border border-neutral-700 px-6 py-3 font-semibold hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            Start Free
          </Link>
        </div>
        <div className="rounded-lg border border-amber-400 bg-amber-400/5 p-8 relative">
          <div className="absolute -top-3 left-8 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-neutral-900">
            Most Popular
          </div>
          <div className="text-sm uppercase tracking-wider text-amber-400">Member</div>
          <div className="mt-2 text-4xl font-bold">
            $2.99<span className="text-lg font-normal text-neutral-400">/mo</span>
          </div>
          <div className="text-xs text-neutral-400">or $30 / year — save 16%</div>
          <ul className="mt-6 space-y-2 text-sm text-neutral-100">
            <li>✓ Everything in Free</li>
            <li>✓ Cover element suggestions</li>
            <li>✓ Practice casino simulator</li>
            <li>✓ Full session history & analysis</li>
            <li>✓ Coaching signals</li>
            <li>✓ Priority AI customer service</li>
            <li>✓ Live streaming session access</li>
            <li>✓ Member-only articles & tips</li>
          </ul>
          <Link
            href="/signup"
            className="mt-8 block text-center rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300 transition-colors"
          >
            Become a Member
          </Link>
        </div>
      </div>
    </div>
  );
}
