import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Five Elements — LayFive",
  description:
    "Metal, Wood, Water, Fire, Earth — five balanced 18-number layouts based on the Wuxing five-element framework.",
};

interface Element {
  name: string;
  zh: string;
  shape: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  description: string;
}

const elements: Element[] = [
  {
    name: "Metal",
    zh: "金",
    shape: "●",
    colorClass: "text-amber-300",
    borderClass: "border-amber-300/30",
    bgClass: "bg-amber-300/5",
    description:
      "One of five balanced 18-number layouts. Like every element, Metal covers 12 straight numbers and 3 split bets — 15 chips per spin, 18 numbers covered. Pick it once, stay with it.",
  },
  {
    name: "Wood",
    zh: "木",
    shape: "▮",
    colorClass: "text-emerald-400",
    borderClass: "border-emerald-400/30",
    bgClass: "bg-emerald-400/5",
    description:
      "Wood is a different 18-number layout, balanced the same way: 9 red and 9 black, 6 numbers in each dozen, 6 in each column. The structure keeps your betting calm and even.",
  },
  {
    name: "Water",
    zh: "水",
    shape: "∼",
    colorClass: "text-sky-400",
    borderClass: "border-sky-400/30",
    bgClass: "bg-sky-400/5",
    description:
      "Water covers a third set of 18 numbers. None of these layouts is better than another — they're different ways to spread the same 15-chip exposure across half the wheel.",
  },
  {
    name: "Fire",
    zh: "火",
    shape: "▲",
    colorClass: "text-red-400",
    borderClass: "border-red-400/30",
    bgClass: "bg-red-400/5",
    description:
      "Fire is the fourth element. Same structure: 12 straight bets, 3 splits, 18 numbers covered. The point isn't to predict — it's to be involved often enough that the session feels stable.",
  },
  {
    name: "Earth",
    zh: "土",
    shape: "■",
    colorClass: "text-yellow-700",
    borderClass: "border-yellow-700/30",
    bgClass: "bg-yellow-700/5",
    description:
      "Earth is the fifth and final element. The discipline rule across all five is the same: pick one element per session, stay with it, never switch during a bad run.",
  },
];

export default function ElementsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          The Five Elements
        </h1>
        <p className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Five balanced 18-number layouts based on the Wuxing five-element
          framework. Each element covers half the wheel using 12 straight bets
          and 3 split bets — 15 chips per spin.
        </p>
        <p className="mt-4 text-sm text-neutral-500 max-w-xl mx-auto">
          None is better than the others. Pick one element per session, stay with
          it, and let consistency do its work.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {elements.map((el) => (
          <div
            key={el.name}
            className={`rounded-lg border ${el.borderClass} ${el.bgClass} p-6`}
          >
            <div className="flex items-baseline gap-3">
              <span className={`text-3xl ${el.colorClass}`}>{el.shape}</span>
              <span className={`text-3xl font-bold ${el.colorClass}`}>{el.zh}</span>
              <span className="text-sm uppercase tracking-wider text-neutral-500">
                {el.name}
              </span>
            </div>
            <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
              {el.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-lg border border-neutral-800 bg-neutral-900/40 p-6">
        <h2 className="text-lg font-semibold text-amber-400">Why five layouts?</h2>
        <div className="mt-3 space-y-3 text-neutral-300 leading-relaxed text-sm">
          <p>
            Each layout covers 18 of 37 numbers — almost half the wheel. Some
            spins hit, some don't. Money moves back and forth.
          </p>
          <p>
            The structure isn't there to change the odds (it doesn't). It's
            there to keep your betting calm, organized, and evenly spread — so
            you can play long enough for cruise casino comps to add up.
          </p>
          <p>
            For the full breakdown of how each element's 15 chips are placed
            (which 12 straights, which 3 splits), see the full layout images on
            the LayFive Tracker app — they're built into the Reference tab.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/learn/2-five-elements"
          className="rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300"
        >
          Watch Video 2
        </Link>
        <a
          href="https://lymx4kl.github.io/layfive-app/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-neutral-700 px-6 py-3 font-semibold hover:border-amber-400 hover:text-amber-400"
        >
          Open the Tracker
        </a>
      </div>

      <div className="mt-12 text-center text-xs text-neutral-500">
        21+. Gambling can be addictive. Play responsibly.
      </div>
    </div>
  );
}
