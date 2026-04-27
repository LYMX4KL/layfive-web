import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bankroll Management — LayFive",
  description:
    "Bankroll management is the only thing LayFive teaches. The 4-spin survival rule, unit sizing, and how casinos turn time at the table into free cruises.",
};

interface Block {
  heading: string;
  body: string[];
}

const blocks: Block[] = [
  {
    heading: "Why bankroll management is everything",
    body: [
      "Roulette has a house edge. We cannot beat it, and we are not trying to. The math says we lose a fixed amount over time, no matter what we do.",
      "What we CAN control is how fast we lose it, and how long we sit at the table while it happens. That control is bankroll management — and on a cruise, it is the difference between an empty seat in 30 minutes and a comped suite next year.",
    ],
  },
  {
    heading: "Casinos rate you on time × bet, not on wins",
    body: [
      "Cruise casinos do not care if you win. They care that you sat there, bet steadily, and stayed long enough to be measured.",
      "The math: avg-bet × hours = theoretical loss to the house = how much they will comp you back. Steady $15-per-spin play for two hours rates higher than $200-per-spin play for fifteen minutes. Same total exposure, different rating.",
      "So our job is to make $15-per-spin sustainable. That is what every rule on this site is for.",
    ],
  },
  {
    heading: "The 4-spin survival rule",
    body: [
      "Pick a unit size you can comfortably lose 4 spins of without flinching. That is your floor.",
      "Each spin = 15 units (12 straight bets at 1 unit each + 3 split bets at 1 unit each). So 4 spins of misses = 60 units lost. Your bankroll must absorb that without breaking your discipline.",
      "If 4 spins of losses would make you anxious, your unit is too big. Drop it until losing 4 in a row feels boring, not scary.",
    ],
  },
  {
    heading: "Unit sizing in dollars",
    body: [
      "Pick the unit you can afford. $1 unit = $15 per spin = $60 to absorb 4 misses. $5 unit = $75 per spin = $300 to absorb 4 misses. $10 unit = $150 per spin = $600 to absorb 4 misses.",
      "Bigger units rate higher with the casino, but only matter if you can keep playing. A $10 unit player who busts in 20 minutes is rated less than a $1 unit player who plays for two hours.",
    ],
  },
  {
    heading: "Stop signals",
    body: [
      "Three reasons to walk away — any one is enough:",
      "1) You hit 45–90 minutes at the table. Discipline drops after that.",
      "2) You feel emotional, win or lose. Frustration, excitement, urge to raise the bet — all the same signal.",
      "3) You catch yourself looking for reasons to keep playing. When it is right to keep playing, you do not need to justify it.",
    ],
  },
  {
    heading: "What we never do",
    body: [
      "We do not predict numbers. Roulette has no memory and we do not pretend otherwise.",
      "We do not chase losses. Each spin is independent. There is no catch-up.",
      "We do not raise bets when we are hot. A streak is just variance — the next spin still has the same odds.",
      "We do not switch elements during a bad run. Switching trades one variance pattern for another and adds emotion.",
    ],
  },
];

export default function BankrollPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        Bankroll Management
      </h1>
      <p className="mt-8 text-xl text-amber-300 leading-relaxed italic">
        It is the only thing LayFive teaches. Everything else is in service of
        keeping you at the table long enough for the casino to pay for your
        next cruise.
      </p>

      <div className="mt-14 space-y-12">
        {blocks.map((b) => (
          <section key={b.heading}>
            <h2 className="text-2xl font-semibold text-amber-400">
              {b.heading}
            </h2>
            <div className="mt-4 space-y-4 text-neutral-300 leading-relaxed">
              {b.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 rounded-lg border border-neutral-800 bg-neutral-900/40 p-6">
        <h2 className="text-lg font-semibold text-neutral-100">
          The whole point, in one line
        </h2>
        <p className="mt-3 text-neutral-300 leading-relaxed">
          We are not paying to win. We are paying to stay at the table. The
          longer we stay, calmly and consistently, the more the casino pays us
          back in comps.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/learn/7-bankroll-math"
          className="rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300"
        >
          Watch Video 7 — Bankroll Math
        </Link>
        <Link
          href="/learn"
          className="rounded-md border border-neutral-700 px-6 py-3 font-semibold hover:border-amber-400 hover:text-amber-400"
        >
          The Full Series
        </Link>
      </div>

      <div className="mt-12 text-center text-xs text-neutral-500">
        21+. Gambling can be addictive. Play responsibly.
      </div>
    </div>
  );
}
