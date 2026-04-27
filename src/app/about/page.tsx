import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About LayFive",
  description:
    "LayFive is bankroll management for cruise casino roulette. Not a winning system, not a prediction system — just a structure for playing long enough to earn comps.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        About LayFive
      </h1>
      <p className="mt-8 text-xl text-amber-300 leading-relaxed italic">
        LayFive is bankroll management for cruise casino roulette. That is the
        only thing it teaches.
      </p>

      <div className="mt-12 space-y-6 text-neutral-300 leading-relaxed text-lg">
        <p>
          I built LayFive after years of live play on cruise ships. The pattern
          was always the same — players sit down with excitement, place random
          bets, chase losses, and one hour later the bankroll is gone. No
          comps. No offers. Just a bad night.
        </p>
        <p>
          The problem was never roulette. The problem was no bankroll
          discipline.
        </p>
        <p>
          LayFive does not predict anything. It does not beat the house edge.
          It cannot.
        </p>
        <p>
          What it does is give you a structure: five fixed 18-number betting
          layouts — Metal, Wood, Water, Fire, Earth — 15 chips per spin, no
          chasing, no switching, no surprises. With that structure in place
          you know exactly what each spin can win or lose, you can size your
          unit so you survive 4 spins of misses, and you can play long enough
          for casino comps to actually arrive.
        </p>
        <p>
          Casinos rate you on average bet times time at the table, not on
          wins. Steady, calm, consistent play is what they want — and what
          gets rewarded with free cruises, free rooms, and free drinks. So
          that is what we practice.
        </p>
        <p>
          The hardest part is the discipline itself: not chasing losses, not
          raising bets when you are hot, not switching layouts mid-session.
          The LayFive Tracker app exists to do the bookkeeping so the only job
          left is to follow your own rules.
        </p>
        <p>
          That is LayFive. Bankroll management for cruise casino players. Not
          a winning system. A money- and time-management approach so the next
          vacation is on the casino.
        </p>
        <p className="font-semibold text-neutral-100">— Kenny Lin</p>
      </div>

      <div className="mt-16 flex flex-wrap gap-4">
        <Link
          href="/learn/1-not-to-win"
          className="rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300"
        >
          Watch Video 1
        </Link>
        <Link
          href="/elements"
          className="rounded-md border border-neutral-700 px-6 py-3 font-semibold hover:border-amber-400 hover:text-amber-400"
        >
          The Five Elements
        </Link>
      </div>

      <div className="mt-12 text-center text-xs text-neutral-500">
        21+. Gambling can be addictive. Play responsibly.
      </div>
    </div>
  );
}
