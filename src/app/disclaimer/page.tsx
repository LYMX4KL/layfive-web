export const metadata = {
  title: "Important Disclaimer — LayFive",
  description:
    "LayFive is not a winning system. Please read this disclaimer before playing.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-neutral-700 leading-relaxed">
      <h1 className="text-4xl font-bold text-neutral-900">Important Disclaimer</h1>
      <p className="mt-3 text-xl text-neutral-600">Please read before playing.</p>

      <p className="mt-8 text-lg text-neutral-800">
        <strong className="text-neutral-900">LayFive is not a winning system.</strong>{" "}
        None of the layouts, strategies, or progressions described here change the
        casino&apos;s mathematical edge. In roulette, every number, every layout,
        and every spin has{" "}
        <strong className="text-neutral-900">exactly the same probability</strong>{" "}
        of hitting as any other. There is no advantage, no prediction power, and no
        guaranteed outcome.
      </p>

      <h2 className="mt-14 text-2xl font-semibold text-neutral-900">The real purpose</h2>
      <p className="mt-4">These layouts exist to help players:</p>
      <ul className="mt-3 space-y-2 list-disc pl-6">
        <li>Understand the consequences of every bet</li>
        <li>Maintain structure and discipline at the table</li>
        <li>Play longer on a controlled bankroll</li>
        <li>Maximize casino comps and entertainment value</li>
        <li>Make roulette social and fun instead of a solo grind</li>
      </ul>
      <p className="mt-4">
        By offering <strong className="text-neutral-900">five different layouts</strong>,
        LayFive lets friends, couples, and families play at the{" "}
        <strong className="text-neutral-900">same table at the same time</strong>,
        each with a different style &mdash; different layouts, different
        progressions, different risk tolerances. That creates conversation,
        comparison, and shared enjoyment, rather than silent, isolated gambling
        &mdash; which is the environment where most people lose control.
      </p>
      <p className="mt-4">
        Some sessions will run slightly positive, some negative.{" "}
        <strong className="text-neutral-900">
          The goal is fun, discipline, and comps &mdash; not chasing wins.
        </strong>
      </p>

      <h2 className="mt-14 text-2xl font-semibold text-neutral-900">
        The real goal: comps and control
      </h2>
      <p className="mt-4">The primary objective is not profit. It is to:</p>
      <ul className="mt-3 space-y-2 list-disc pl-6">
        <li>Stretch your bankroll</li>
        <li>Accumulate comp value</li>
        <li>Enjoy your vacation</li>
        <li>
          Leave the casino{" "}
          <strong className="text-neutral-900">on your own terms</strong>
        </li>
      </ul>
      <p className="mt-4">
        If you play long enough without limits,{" "}
        <strong className="text-neutral-900">loss is guaranteed</strong>. That
        isn&apos;t an opinion. It&apos;s math.
      </p>

      <h2 className="mt-14 text-2xl font-semibold text-neutral-900">
        Things you should never do
      </h2>
      <p className="mt-4">These rules are non-negotiable.</p>
      <p className="mt-4">
        <strong className="text-neutral-900">
          1. Never lend money to anyone in a casino.
        </strong>{" "}
        This isn&apos;t about whether you&apos;ll be repaid. If you say no now, they
        won&apos;t lend to you later &mdash; which protects you from ever exceeding
        your planned losses. That is the real reason.
      </p>
      <p className="mt-4">
        <strong className="text-neutral-900">
          2. Never bring more than 20 full bets to the table.
        </strong>{" "}
        Set your limit before you arrive. Do not build in &ldquo;backup&rdquo;
        options or mental loopholes. Most people &mdash; myself included &mdash;
        cannot control themselves once the limit starts moving. This is a lesson I
        learned the painful way.
      </p>
      <p className="mt-4">
        <strong className="text-neutral-900">
          3. Set your walk-away point in advance.
        </strong>{" "}
        Decide before the first spin when you leave if you&apos;re ahead, and when
        you leave if you&apos;re down. Then follow it. No exceptions, no excuses.
      </p>

      <h2 className="mt-14 text-2xl font-semibold text-neutral-900">Final reminder</h2>
      <p className="mt-4">
        No layout, no strategy, no progression changes the house edge.
      </p>
      <ul className="mt-3 space-y-2 list-disc pl-6">
        <li>Every spin is independent</li>
        <li>Every number has the same chance</li>
        <li>The casino always wins over time</li>
      </ul>
      <p className="mt-4">
        These layouts exist to encourage responsible play, reduce emotional
        decisions, create group enjoyment, and help players last longer and earn
        comps.
      </p>
      <p className="mt-6">
        As every casino clearly states:{" "}
        <strong className="text-neutral-900">Play responsibly.</strong>
      </p>

      <h2 className="mt-14 text-2xl font-semibold text-neutral-900">
        Legal age and jurisdiction
      </h2>
      <p className="mt-4">
        You must be at least 21 years old (or the legal gambling age in your
        jurisdiction, whichever is higher) to use LayFive. You are responsible for
        ensuring that gambling is legal where you are located.
      </p>

      <h2 className="mt-14 text-2xl font-semibold text-neutral-900">
        Intellectual property
      </h2>
      <p className="mt-4">
        All LayFive strategies, reference cards, illustrations, app code, and
        written content are the original work of Kenny Lin and are protected by
        copyright. LayFive&trade; is a trademark in use. Copying, redistributing,
        or reselling LayFive content in any form is prohibited.
      </p>

      <h2 className="mt-14 text-2xl font-semibold text-neutral-900">
        Responsible gambling
      </h2>
      <p className="mt-4">
        If gambling is affecting your life, please seek help. In the United States,
        call the National Council on Problem Gambling at 1-800-GAMBLER or visit
        ncpgambling.org.
      </p>

      <div className="mt-16 pt-8 border-t border-neutral-300 text-sm text-neutral-500">
        <p>
          Also available in{" "}
          <a href="/zh/disclaimer" className="text-amber-600 hover:underline">
            中文
          </a>
          .
        </p>
      </div>
    </div>
  );
}
