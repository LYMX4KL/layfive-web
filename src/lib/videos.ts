// Cruise Roulette Series — 8 video data
// Used by /learn (hub) and /learn/[id] (per-video pages).
// Source: video scripts in Drive folder "Cruise Roulette Series" (Kenny's Drive).

export interface VideoSection {
  heading: string;
  body: string[];
}

export interface Video {
  n: number;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  hook: string;
  sections: VideoSection[];
  takeaways: string[];
  youtubeId?: string; // fill in once video is published
}

export const videos: Video[] = [
  {
    n: 1,
    slug: "1-not-to-win",
    title: "Not to Win — But to Play Longer & Get Free Cruises",
    shortTitle: "Not to Win",
    summary:
      "The opening manifesto. This is NOT a strategy to win money. It is a structured way for cruise players to make their bankroll last and earn casino comps.",
    hook:
      "If you're on a cruise, you're not really a gambler — but you'd love to get free cruises, free rooms, and free drinks from the casino. This video is for you.",
    sections: [
      {
        heading: "Who this is for",
        body: [
          "This approach is for cruise guests, casual players, and people who treat the casino as entertainment.",
          "It is NOT for people trying to win big, chase losses, or gamble emotionally.",
          "With this approach, you will win some and lose some — back and forth. That back-and-forth is the whole point. Without discipline, no one can play long enough to earn free cruises.",
        ],
      },
      {
        heading: "Why casinos give free cruises",
        body: [
          "Casinos do NOT reward winners. They reward time played, average bet, and consistency.",
          "Free cruises are not about how much you win. They're about how long you play.",
        ],
      },
      {
        heading: "Why most cruise players lose too fast",
        body: [
          "First night: excitement, random bets, chasing losses. One hour later: bankroll gone, no comps, no offers.",
          "The problem is not roulette. The problem is no structure.",
        ],
      },
      {
        heading: "We don't predict numbers — we cover them",
        body: [
          "Roulette doesn't remember you. Every spin is independent.",
          "Instead of guessing, we cover a group of numbers. You're not paying to win — you're paying to stay at the table longer. The longer you stay, the more valuable you are to the casino.",
        ],
      },
    ],
    takeaways: [
      "This is not a winning system. It's a money- and comp-management approach.",
      "Casinos reward time and consistency, not big wins.",
      "We cover numbers, we don't predict them.",
      "Goal: enjoy more free cruises by playing longer.",
    ],
  },
  {
    n: 2,
    slug: "2-five-elements",
    title: "The Five Elements — Metal, Wood, Water, Fire, Earth",
    shortTitle: "The Five Elements",
    summary:
      "Five balanced 18-number layouts based on the Wuxing five-element framework. Each element covers half the wheel with 12 straight bets and 3 split bets.",
    hook:
      "The five elements are five different ways to cover 18 numbers — without guessing, without chasing, without emotions.",
    sections: [
      {
        heading: "What an 18-number layout is",
        body: [
          "A European roulette wheel has 37 numbers. Each spin, we cover 18 of them — almost half the wheel.",
          "The goal is not to be right every spin. The goal is to be involved often enough so it doesn't feel like constant losing.",
          "Some spins hit, some don't. Money moves back and forth. That back-and-forth is exactly what we want.",
        ],
      },
      {
        heading: "The five elements (Wuxing)",
        body: [
          "Metal (金), Wood (木), Water (水), Fire (火), Earth (土) — five elements, five layouts.",
          "Each layout = 12 straight-up bets + 3 split bets covering 6 numbers = 15 total bets covering 18 numbers per spin.",
          "None is better than the others. Pick one. Stick with it. Stay consistent.",
        ],
      },
      {
        heading: "Why these layouts are balanced",
        body: [
          "Each layout has 9 red and 9 black numbers, 6 numbers in each dozen, 6 numbers in each column.",
          "This does NOT change the odds. What it does is keep your betting organized, evenly spread, and calm.",
          "We're not leaning on one color, dozen, or column. That structure helps you stay disciplined and avoid emotional betting.",
        ],
      },
    ],
    takeaways: [
      "Five elements = five 18-number layouts.",
      "15 bets per spin: 12 straights + 3 splits.",
      "Each layout is balanced 9 red / 9 black.",
      "Pick one. Stay with it. Stay consistent.",
    ],
  },
  {
    n: 3,
    slug: "3-win-lose-miss",
    title: "What Happens When You Win, Lose, or Nothing Hits",
    shortTitle: "Win, Lose, or Miss",
    summary:
      "Three outcomes per spin define the entire system. Understand them and you understand why this approach works for cruise players, not gamblers.",
    hook:
      "Each spin has three outcomes: a straight hit, a split hit, or a miss. The math behind each one tells you why this works.",
    sections: [
      {
        heading: "When a straight number hits",
        body: [
          "12 straight bets per spin. When one hits, you net +21 units (35 payout + 1 winning chip - 15 bets).",
          "It's a noticeable bounce. It can fully cover one losing spin and leaves a small buffer.",
          "Don't celebrate. Don't raise bets. Keep the same rhythm. The purpose of a straight hit is not to make you rich — it's to keep you at the table.",
        ],
      },
      {
        heading: "When a split hits",
        body: [
          "3 split bets per spin covering 6 numbers. When one hits, you net +3 units.",
          "The win is small. It's not exciting. But it's important.",
          "Split hits slow down the loss rate, break losing streaks, and smooth out the session. Think of them as shock absorbers.",
        ],
      },
      {
        heading: "When nothing hits",
        body: [
          "If none of the 18 numbers hit, you lose 15 units. That's the worst possible outcome for one spin. It does not get worse than that.",
          "Yes, there will be misses. They are normal, expected, part of roulette.",
          "The key question isn't 'did I lose' — it's 'how did I lose?' With small spread bets and a fixed structure, losses are controlled, not explosive.",
        ],
      },
      {
        heading: "Why we don't chase",
        body: [
          "Many players change numbers or increase bets after losses. We don't.",
          "Roulette doesn't owe you anything. We don't chase, switch, or let emotions change the plan.",
          "The moment you play emotionally, you're no longer playing a layout — you're playing yourself.",
        ],
      },
    ],
    takeaways: [
      "Straight hit = +21 units. Split hit = +3 units. Miss = -15 units.",
      "These three outcomes define the entire system.",
      "Real sessions feel different from the math because of variance.",
      "Don't chase. Don't switch. Don't increase bets to recover.",
    ],
  },
  {
    n: 4,
    slug: "4-bet-size",
    title: "Bet Size, Units, and How Casinos Rate You",
    shortTitle: "Bet Size & Units",
    summary:
      "The most important video for comps. How many bets per spin, why we use small units, and how bet size affects casino rating.",
    hook:
      "If your goal is free cruises, free rooms, and free drinks, this video might be the most important one so far.",
    sections: [
      {
        heading: "Think in units, not dollars",
        body: [
          "We don't think in dollars. We think in units. A unit is a small, comfortable amount.",
          "For one player, 1 unit might be $1. For another, $5. For another, $10. The exact dollar amount doesn't matter.",
          "What matters: same unit size, no emotion-based changes, and you can afford to lose multiple units calmly.",
        ],
      },
      {
        heading: "How many bets per spin",
        body: [
          "Every layout uses 12 straight + 3 split = 15 bets per spin.",
          "If 1 unit = $1, each spin is $15. If 1 unit = $5, each spin is $75. The layout controls structure. The unit controls survival.",
        ],
      },
      {
        heading: "Why we keep units small",
        body: [
          "Many players start reasonable, then slowly increase when bored or emotional. That's how bankrolls disappear.",
          "Small units mean: known worst-case loss per spin, losing spins don't feel painful, no pressure to 'win it back'.",
          "If losing one spin feels uncomfortable, your unit size is too big.",
        ],
      },
      {
        heading: "How casinos actually rate you",
        body: [
          "Casinos rate you on average bet × time at the table. Not your biggest win. Not your biggest loss.",
          "A calm player betting steadily for two hours is often rated higher than someone betting big for 20 minutes.",
          "Roulette played slowly and steadily is very popular with cruise players chasing comps.",
        ],
      },
      {
        heading: "Choosing the right unit size",
        body: [
          "Pick a unit size that lets you comfortably lose 4 spins without stress.",
          "If you feel nervous after 2 or 3 bad spins, your unit is too big.",
          "Cruise casinos reward patience, not bravery.",
        ],
      },
    ],
    takeaways: [
      "Think in units, not dollars.",
      "15 bets per spin. Same size. No emotional changes.",
      "Casinos rate you on avg bet × time, not on wins.",
      "Pick a unit that lets you absorb 4 spins of misses calmly.",
    ],
  },
  {
    n: 5,
    slug: "5-when-to-stop",
    title: "How Long to Play — Knowing When to Stop",
    shortTitle: "When to Stop",
    summary:
      "Three questions every cruise player asks (and most get wrong): how long should one session be, when to stop if losing, and when to stop even if winning.",
    hook:
      "Casinos don't care how much you win in one moment. They care how long you sit at the table.",
    sections: [
      {
        heading: "The ideal session length",
        body: [
          "For most cruise players, 45 to 90 minutes is healthy.",
          "Longer than that: fatigue builds, emotions creep in, discipline drops. A 45–90 minute session looks stable to the casino, feels calm to the player, and keeps decisions clear.",
          "You want to leave the table before your discipline fades.",
        ],
      },
      {
        heading: "When to stop if you're losing",
        body: [
          "Losing is expected. But stop immediately if: you feel frustrated, you start thinking 'the next one has to hit', you want to increase bets, or you stop caring about structure.",
          "At that point, you're no longer managing money — you're reacting emotionally. Stopping is not weakness. It's discipline.",
        ],
      },
      {
        heading: "When to stop if you're winning",
        body: [
          "Yes, you should stop even when you're winning. This is harder — and more important.",
          "Winning creates confidence → pressure → broken structure. If you notice 'I'm hot today' or 'I should bet more' — that's your signal to stop.",
        ],
      },
      {
        heading: "A simple stop signal",
        body: [
          "The moment you start looking for reasons to keep playing, that's when you should stop.",
          "When it's truly right to continue, you don't need to justify it.",
        ],
      },
    ],
    takeaways: [
      "Aim for 45–90 minute sessions.",
      "Stop when emotions hit — win or lose.",
      "Looking for reasons to keep playing IS the reason to stop.",
      "Casino comps go to consistent players, not bold ones.",
    ],
  },
  {
    n: 6,
    slug: "6-complete-session",
    title: "A Complete Cruise Roulette Session — Sit Down to Walk Away",
    shortTitle: "A Complete Session",
    summary:
      "Putting everything together. What to do when you sit down, how to play during the session, and how to leave the right way.",
    hook:
      "This is the process to play longer and earn cruise casino comps — not a strategy to win.",
    sections: [
      {
        heading: "Sitting down",
        body: [
          "Don't rush. Don't feel pressure to bet immediately.",
          "Look at table limits. Confirm single-zero wheel. Make sure the minimum bet fits your unit size.",
          "Buy in calmly. Stack chips neatly. Settle in. How you sit down already tells the casino something about you.",
        ],
      },
      {
        heading: "Choose your element",
        body: [
          "Pick one element: Metal, Wood, Water, Fire, or Earth. It does not matter which one.",
          "Stay with it. You are not testing. You are not comparing. You are not switching based on outcomes.",
        ],
      },
      {
        heading: "Set your units",
        body: [
          "Confirm your unit size. Can I comfortably lose 4 spins at this size? Will I feel calm if I lose a few in a row?",
          "If the answer is not 'yes', your unit is too big. Once set: every straight = 1 unit, every split = 1 unit. No changes.",
        ],
      },
      {
        heading: "Play the session",
        body: [
          "Each spin: same 15 bets, same positions, same unit size.",
          "Some spins miss, some splits hit, some straights hit. You don't react. No celebration. No frustration. No adjustments.",
          "You are not here to be right — you are here to be consistent.",
        ],
      },
      {
        heading: "Leaving cleanly",
        body: [
          "A session ends when: you've reached 45–90 min, you feel emotional (win or lose), or you catch yourself looking for reasons to keep playing.",
          "Finish the current spin. Stack chips neatly. Cash out calmly. No drama. No announcing.",
          "Leaving cleanly is part of being a well-rated player.",
        ],
      },
    ],
    takeaways: [
      "Sit down calmly. Confirm wheel + limits + units.",
      "Pick one element. Stay with it.",
      "Same 15 bets every spin. No reactions.",
      "Leave at 45–90 min, on emotion, or when justifying continuing.",
    ],
  },
  {
    n: 7,
    slug: "7-bankroll-math",
    title: "Bankroll Math — The Math Behind the Layouts",
    shortTitle: "Bankroll Math",
    summary:
      "The numbers behind the system. Why losses are unavoidable. Why bankroll management matters more than layout choice.",
    hook:
      "Not to predict outcomes — to understand limits. Math decides the outcome. Behavior decides how long you last.",
    sections: [
      {
        heading: "What one spin really looks like",
        body: [
          "Each layout: 18 numbers covered, 15 units used, 12 straight + 3 splits. This never changes.",
        ],
      },
      {
        heading: "The three outcomes",
        body: [
          "Straight hits: +21 units (35 payout + 1 chip back - 15 bets).",
          "Split hits: +3 units (17 payout + 1 chip back - 15 bets).",
          "Miss: -15 units. These three define the system.",
        ],
      },
      {
        heading: "The theoretical distribution",
        body: [
          "On a 37-number wheel, over a large sample: 19 spins miss all 18 numbers, 12 spins hit straight numbers, 6 spins hit splits.",
          "If perfectly distributed over 37 spins: -15 units total. That's exactly the house edge — one full 15-unit bet lost every 36–37 spins.",
        ],
      },
      {
        heading: "Why real sessions feel different",
        body: [
          "Real play never looks like the average. Losses cluster. Wins cluster. You can miss many times in a row, or hit several times close together.",
          "This is variance. Variance is why bankroll management exists.",
        ],
      },
      {
        heading: "Why 4 bets is the minimum",
        body: [
          "Bring at least 4 full bets — 4 × 15 = 60 units.",
          "This allows room for short losing streaks without panic, time for variance to play out, and emotional stability.",
          "The goal is not to beat the math. The goal is to survive the math.",
        ],
      },
    ],
    takeaways: [
      "Math: -15 units expected per 37 spins (house edge).",
      "Variance is why bankroll management exists.",
      "Bring at least 4 full bets (60 units) to absorb variance.",
      "Survive the math; don't try to beat it.",
    ],
  },
  {
    n: 8,
    slug: "8-session-control",
    title: "Advanced Session Control — Protecting Your Bankroll",
    shortTitle: "Advanced Control",
    summary:
      "Behavior beats math. What you actually do during a session to protect your bankroll and your mindset.",
    hook:
      "This is where most players fail — not because of math, but because of behavior.",
    sections: [
      {
        heading: "When you do NOT bet",
        body: [
          "Don't start betting immediately. For any element — Metal, Wood, Water, Fire, Earth — observe first.",
          "Wait for one loss in your chosen element. Then begin betting.",
        ],
      },
      {
        heading: "The three-spin rule",
        body: [
          "Once you start, bet up to three consecutive spins. Each set covers 18 numbers — one miss is normal, two miss happens, three misses are uncommon.",
          "If a set misses four times in a row, betting stops immediately. No exceptions.",
        ],
      },
      {
        heading: "Never switch elements",
        body: [
          "Switching during a bad run creates chaos. The original may start hitting. The new may also miss. Pressure increases.",
          "Instead: stop betting, step back, resume later. Discipline protects bankrolls. Switching destroys them.",
        ],
      },
      {
        heading: "No chasing, ever",
        body: [
          "Never increase bets because you expect a catch-up. Each spin is independent. Roulette doesn't remember.",
          "Stopping is always safer than chasing.",
        ],
      },
      {
        heading: "Increasing only with winnings",
        body: [
          "After a straight hit (+21 units), you have a buffer. Only after that buffer exists can exposure increase — using winnings, not bankroll.",
          "First win: 2 units × 15 bets → +42. Second win: 3 units × 15 bets → +63. Third spin: a loss still leaves profit; a win creates a walk-away result.",
          "At no point is the bankroll fully exposed again. This is risk redistribution, not pressing.",
        ],
      },
    ],
    takeaways: [
      "Observe first. Wait for one loss before betting.",
      "Three-spin rule: stop after 4 consecutive misses.",
      "Never switch elements during a bad run.",
      "Increase exposure only with winnings, never bankroll.",
    ],
  },
];

export function getVideoBySlug(slug: string): Video | undefined {
  return videos.find((v) => v.slug === slug);
}
