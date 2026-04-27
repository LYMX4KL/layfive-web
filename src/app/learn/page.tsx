import Link from "next/link";
import type { Metadata } from "next";
import { videos } from "@/lib/videos";

export const metadata: Metadata = {
  title: "Cruise Roulette Series — LayFive",
  description:
    "Eight free videos on how to make your cruise casino bankroll last, earn comps, and play roulette without losing control.",
};

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="text-center">
        <div className="inline-block rounded-full border border-amber-400/30 bg-amber-400/5 px-4 py-1 text-xs text-amber-300 mb-6">
          Free · No signup needed
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          The Cruise Roulette Series
        </h1>
        <p className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Eight short videos walk you through the entire system, from why
          casinos give free cruises to how to manage your bankroll across a full
          session. Every video is free, no signup needed.
        </p>
      </div>

      <ol className="mt-16 space-y-4">
        {videos.map((v) => (
          <li key={v.n}>
            <Link
              href={`/learn/${v.slug}`}
              className="block rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 hover:border-amber-400/50 transition-colors group"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center font-semibold text-lg">
                  {v.n}
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-lg text-neutral-100 group-hover:text-amber-400 transition-colors">
                    {v.title}
                  </h2>
                  <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                    {v.summary}
                  </p>
                </div>
                <div className="flex-shrink-0 text-amber-400/50 group-hover:text-amber-400 transition-colors text-2xl">
                  →
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-16 text-center text-xs text-neutral-500">
        21+. Gambling can be addictive. Play responsibly.
        <br />
        These videos describe a money-management approach for entertainment, not a
        winning strategy.
      </div>
    </div>
  );
}
