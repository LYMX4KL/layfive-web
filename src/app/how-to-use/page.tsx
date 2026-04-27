import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Use the LayFive Tracker — LayFive",
  description:
    "Step-by-step walkthrough of the LayFive cruise roulette tracker app. Sign up, pick an element, set your units, and record your session.",
};

interface Step {
  n: number;
  title: string;
  body: string;
}

const steps: Step[] = [
  {
    n: 1,
    title: "Sign up at layfive.com",
    body:
      "Create your account on the website with email + password. You'll get a confirmation email — click the link to activate. Free tier is enough to get started; Pro and Premium unlock the deeper coaching tools.",
  },
  {
    n: 2,
    title: "Open the Tracker",
    body:
      "Once your account is active, click ‘Open Tracker’ anywhere on the site. The tracker is a separate web app that runs in your phone's browser — no installation needed.",
  },
  {
    n: 3,
    title: "Log in to the Tracker",
    body:
      "Use the same email and password you set up at layfive.com. The tracker checks your tier (Free / Pro / Premium) and unlocks the right features automatically.",
  },
  {
    n: 4,
    title: "Pick your element for the session",
    body:
      "Choose Metal, Wood, Water, Fire, or Earth at the top of the scorecard. The Reference tab shows the betting layout for whichever element you pick. Don't switch mid-session.",
  },
  {
    n: 5,
    title: "Set your unit size",
    body:
      "Pick a unit you can comfortably lose 4 spins of without stress. If your bankroll is $60, that's a $1 unit ($15 per spin × 4 spins). Casinos rate you on average bet × time, not on wins.",
  },
  {
    n: 6,
    title: "Record each spin",
    body:
      "Tap the result number on the scorecard. The tracker logs the hit, updates your running totals, and shows you what category the result fell into for the element you picked.",
  },
  {
    n: 7,
    title: "Watch the scorecard, not the wheel",
    body:
      "The scorecard shows your hits, misses, splits, and how the session is unfolding. The point isn't to predict — it's to stay aware of your rhythm and your bankroll.",
  },
  {
    n: 8,
    title: "End your session cleanly",
    body:
      "Sessions end at 45–90 minutes, when you feel emotional (win or lose), or when you catch yourself looking for reasons to keep playing. Tap ‘End Session’ to save it. Save your sessions — over time, the data shows you what works.",
  },
];

export default function HowToUsePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          How to Use the Tracker
        </h1>
        <p className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Eight steps from signup to a complete cruise roulette session. The
          tracker is a memory aid, not a strategy — it helps you follow your
          own rules without doing the math in your head.
        </p>
      </div>

      {/* Walkthrough video placeholder */}
      <div className="mt-10 aspect-video rounded-lg border border-neutral-800 bg-neutral-900/50 flex items-center justify-center text-neutral-500 text-sm">
        Walkthrough video coming soon
      </div>

      <ol className="mt-12 space-y-6">
        {steps.map((s) => (
          <li
            key={s.n}
            className="flex gap-5 rounded-lg border border-neutral-800 bg-neutral-900/40 p-6"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center font-semibold">
              {s.n}
            </div>
            <div>
              <h2 className="font-semibold text-lg text-neutral-100">
                {s.title}
              </h2>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16 flex flex-wrap justify-center gap-4">
        <a
          href="https://lymx4kl.github.io/layfive-app/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300"
        >
          Open the Tracker
        </a>
        <Link
          href="/learn"
          className="rounded-md border border-neutral-700 px-6 py-3 font-semibold hover:border-amber-400 hover:text-amber-400"
        >
          Watch the Series
        </Link>
      </div>

      <div className="mt-12 text-center text-xs text-neutral-500">
        21+. Gambling can be addictive. Play responsibly.
      </div>
    </div>
  );
}
