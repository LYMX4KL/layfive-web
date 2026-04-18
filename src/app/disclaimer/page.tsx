import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | LayFive",
  description: "Important disclaimer for LayFive roulette tracking tool.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-3xl font-bold text-amber-400">Important Disclaimer</h1>
      <p className="mt-2 text-neutral-400 text-sm">Last updated: April 17, 2026</p>

      <div className="mt-8 space-y-6 text-neutral-300 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-neutral-100">1. Not a winning strategy</h2>
          <p className="mt-2">
            LayFive is a roulette tracking and analysis tool. It does not change the house
            edge, predict outcomes, or guarantee wins. Every spin is independent. Past results
            do not predict future outcomes. The casino always has a mathematical advantage.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-100">2. Entertainment and education only</h2>
          <p className="mt-2">
            LayFive is provided for entertainment and educational purposes. It is not financial
            advice, gambling advice, or an invitation to gamble. Users should treat roulette as
            entertainment, not as a source of income.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-100">3. Responsible gambling</h2>
          <p className="mt-2">
            Play within your means. Set a bankroll limit before you play and stick to it. Never
            gamble with money you cannot afford to lose. If gambling is affecting your life,
            please seek help: call 1-800-GAMBLER (US) or visit{" "}
            <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 underline">
              ncpgambling.org
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-100">4. Non-refundable</h2>
          <p className="mt-2">
            Paid subscription benefits are non-refundable after purchase. You may cancel at any
            time, but no refunds will be issued for the current billing period. The 7-day free
            trial (where available) can be canceled at no charge before the trial ends.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-100">5. Age requirement</h2>
          <p className="mt-2">
            You must be at least 21 years old (or the minimum legal gambling age in your
            jurisdiction, whichever is higher) to use LayFive. By using this service, you
            confirm that you meet this requirement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-100">6. Jurisdiction</h2>
          <p className="mt-2">
            You are solely responsible for determining whether online gambling tracking tools
            are permitted in your jurisdiction. LayFive makes no representation that its
            services are legal or available in all locations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-100">7. Limitation of liability</h2>
          <p className="mt-2">
            LayFive, its owners, and affiliates shall not be liable for any losses, damages, or
            costs arising from the use of this service. You acknowledge that you use LayFive at
            your own risk and that all gambling decisions are your own.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-neutral-100">8. Intellectual property</h2>
          <p className="mt-2">
            All content, designs, algorithms, and materials within LayFive are the intellectual
            property of LayFive and are protected by copyright law. Unauthorized reproduction,
            distribution, or modification is prohibited.
          </p>
        </section>
      </div>

      <div className="mt-10 border-t border-neutral-800 pt-6 text-center text-sm text-neutral-500">
        <p>&copy; 2026 LayFive. All rights reserved.</p>
      </div>
    </div>
  );
}
