import Link from "next/link";

const elements = [
  { name: "Metal", symbol: "金", color: "text-amber-300" },
  { name: "Wood", symbol: "木", color: "text-emerald-400" },
  { name: "Water", symbol: "水", color: "text-sky-400" },
  { name: "Fire", symbol: "火", color: "text-red-400" },
  { name: "Earth", symbol: "土", color: "text-yellow-700" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 text-center">
        <div className="inline-block rounded-full border border-amber-400/30 bg-amber-400/5 px-4 py-1 text-xs text-amber-300 mb-6">
          The 5-Element Roulette Strategy — original system by Kenny Lin
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Play roulette with a <span className="text-amber-400">system</span>,
          <br className="hidden md:inline" /> not a guess.
        </h1>
        <p className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto">
          LayFive tracks every spin across five elements — Metal, Wood, Water, Fire, Earth —
          and gives you live coaching signals, cover suggestions, and a practice simulator
          so you walk into any casino knowing exactly what to do.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300 transition-colors"
          >
            Start Free
          </Link>
          <Link
            href="/pricing"
            className="rounded-md border border-neutral-700 px-6 py-3 font-semibold text-neutral-100 hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            See Membership
          </Link>
        </div>
        <div className="mt-12 flex justify-center gap-8">
          {elements.map((el) => (
            <div key={el.name} className="text-center">
              <div className={`text-4xl md:text-5xl font-bold ${el.color}`}>{el.symbol}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
                {el.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-800">
        <h2 className="text-3xl font-bold text-center">What LayFive gives you</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Live Scorecard",
              body: "Log every spin and see element distribution, gaps, and coaching signals instantly. Free forever.",
            },
            {
              title: "Cover Suggestions",
              body: "When elements cluster, LayFive shows which covering numbers to add without doubling up with your main bet.",
            },
            {
              title: "Practice Casino",
              body: "Full roulette simulator with real table layout, chip selector, and spin wheel to rehearse before you play for real.",
            },
            {
              title: "Reference Cards",
              body: "The official 5-element layout cards and quick-reference sheets built into the app — no printouts needed.",
            },
            {
              title: "Session Tracking",
              body: "Every session is archived so you can review what worked, spot your patterns, and improve over time.",
            },
            {
              title: "AI Customer Service",
              body: "Ask the LayFive assistant anything about the system, your account, or how to play. Answers in seconds.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 hover:border-amber-400/50 transition-colors"
            >
              <h3 className="font-semibold text-lg text-amber-400">{f.title}</h3>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing preview */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-800">
        <h2 className="text-3xl font-bold text-center">Simple pricing</h2>
        <p className="mt-3 text-center text-neutral-400">
          Start free. Upgrade when you are ready for the full toolkit.
        </p>
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <div className="text-sm uppercase tracking-wider text-neutral-500">Free</div>
            <div className="mt-2 text-4xl font-bold">$0</div>
            <ul className="mt-6 space-y-2 text-sm text-neutral-300">
              <li>✓ Scorecard tab</li>
              <li>✓ Reference cards</li>
              <li>✗ Cover suggestions</li>
              <li>✗ Practice simulator</li>
              <li>✗ Session history</li>
            </ul>
          </div>
          <div className="rounded-lg border border-amber-400 bg-amber-400/5 p-8 relative">
            <div className="absolute -top-3 left-8 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-neutral-900">
              Most Popular
            </div>
            <div className="text-sm uppercase tracking-wider text-amber-400">Member</div>
            <div className="mt-2 text-4xl font-bold">
              $2.99
              <span className="text-lg font-normal text-neutral-400">/month</span>
            </div>
            <div className="text-xs text-neutral-400">or $30/year — save 16%</div>
            <ul className="mt-6 space-y-2 text-sm text-neutral-100">
              <li>✓ Everything in Free</li>
              <li>✓ Cover element suggestions</li>
              <li>✓ Practice casino simulator</li>
              <li>✓ Full session history</li>
              <li>✓ Coaching signals & analysis</li>
              <li>✓ Priority AI support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-3xl px-6 py-12 border-t border-neutral-800 text-center">
        <p className="text-xs text-neutral-500 leading-relaxed">
          LayFive is intended for entertainment and educational purposes only. Gambling
          involves risk and LayFive does not guarantee winnings. Players must be of legal
          gambling age in their jurisdiction. All strategies, reference cards, and app
          designs are the intellectual property of Kenny Lin / LayFive™.
        </p>
      </section>
    </>
  );
}
