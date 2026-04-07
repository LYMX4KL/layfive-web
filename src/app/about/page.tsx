export const metadata = { title: "About — LayFive" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 prose prose-invert">
      <h1 className="text-4xl font-bold">About LayFive</h1>
      <p className="mt-6 text-neutral-300 leading-relaxed">
        LayFive is an original roulette strategy system designed by Kenny Lin after years
        of live play, testing, and refinement at casinos around the world. The system
        organizes the 36 numbers on a European-style roulette wheel into five elements
        drawn from the classical Chinese Wu Xing philosophy: Metal, Wood, Water, Fire,
        and Earth.
      </p>
      <p className="mt-4 text-neutral-300 leading-relaxed">
        Rather than chasing individual numbers or patterns, LayFive players track the
        distribution of spins across the five elements and bet on the one that is
        statistically due, using covering elements only when multiple groups are
        clustered and a hedge makes sense.
      </p>
      <p className="mt-4 text-neutral-300 leading-relaxed">
        This website and the LayFive app are the digital home for the system — all
        strategies, reference cards, illustrations, and software are the original work
        of Kenny Lin and protected as intellectual property.
      </p>
    </div>
  );
}
