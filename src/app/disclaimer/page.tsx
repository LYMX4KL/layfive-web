export const metadata = { title: "Disclaimer — LayFive" };

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-neutral-300 leading-relaxed">
      <h1 className="text-4xl font-bold text-neutral-100">Disclaimer</h1>
      <p className="mt-6">
        LayFive is provided for entertainment and educational purposes only. Nothing on
        this website, in the LayFive app, or in any LayFive reference material constitutes
        financial, legal, or gambling advice.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">No guarantee of winnings</h2>
      <p className="mt-3">
        Gambling involves risk. Past results do not predict future outcomes. LayFive does
        not guarantee any winnings and you should never wager money you cannot afford to
        lose.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">Legal age and jurisdiction</h2>
      <p className="mt-3">
        You must be at least 21 years old (or the legal gambling age in your jurisdiction,
        whichever is higher) to use LayFive. You are responsible for ensuring that
        gambling is legal where you are located.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">Intellectual property</h2>
      <p className="mt-3">
        All LayFive strategies, reference cards, illustrations, app code, and written
        content are the original work of Kenny Lin and are protected by copyright.
        LayFive™ is a trademark in use. Copying, redistributing, or reselling LayFive
        content in any form is prohibited.
      </p>
      <h2 className="mt-10 text-2xl font-semibold text-neutral-100">Responsible gambling</h2>
      <p className="mt-3">
        If gambling is affecting your life, please seek help. In the United States, call
        the National Council on Problem Gambling at 1-800-GAMBLER or visit ncpgambling.org.
      </p>
    </div>
  );
}
