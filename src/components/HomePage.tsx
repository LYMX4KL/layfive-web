import Link from "next/link";
import { dictionaries, type Locale } from "@/lib/dictionaries";

// Five Elements visual data — shape & color come from the LayFive Logo Brief.
// Shapes are primary, colors secondary, and everything must read in B&W.
const elements = [
  { name: "Metal", zh: "金", symbol: "金", shape: "●", colorClass: "text-amber-300" },
  { name: "Wood", zh: "木", symbol: "木", shape: "▮", colorClass: "text-emerald-400" },
  { name: "Water", zh: "水", symbol: "水", shape: "~", colorClass: "text-sky-400" },
  { name: "Fire", zh: "火", symbol: "火", shape: "▲", colorClass: "text-red-400" },
  { name: "Earth", zh: "土", symbol: "土", shape: "■", colorClass: "text-yellow-700" },
];

export default function HomePage({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].home;
  const trackerHref = locale === "zh" ? "/app" : "/app";
  const learnHref = locale === "zh" ? "/zh/learn" : "/learn";
  const disclaimerHref = locale === "zh" ? "/zh/disclaimer" : "/disclaimer";

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 text-center">
        <div className="inline-block rounded-full border border-amber-400/30 bg-amber-400/5 px-4 py-1 text-xs text-amber-300 mb-6">
          {t.eyebrow}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          <span className="block">{t.heroTitle1}</span>
          <span className="block">{t.heroTitle2}</span>
          <span className="block text-amber-400">{t.heroTitle3}</span>
        </h1>
        <p className="mt-8 text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {t.heroSub}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href={learnHref}
            className="rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300 transition-colors"
          >
            {t.ctaPrimary}
          </Link>
          <Link
            href={trackerHref}
            className="rounded-md border border-neutral-700 px-6 py-3 font-semibold text-neutral-100 hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            {t.ctaSecondary}
          </Link>
        </div>
        <div className="mt-16 flex justify-center gap-6 md:gap-10">
          {elements.map((el) => (
            <div key={el.name} className="text-center">
              <div className={`text-3xl md:text-4xl ${el.colorClass}`}>{el.shape}</div>
              <div className={`mt-2 text-2xl md:text-3xl font-bold ${el.colorClass}`}>
                {el.symbol}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-neutral-500">
                {el.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Five layouts intro */}
      <section className="mx-auto max-w-3xl px-6 py-16 border-t border-neutral-800 text-center">
        <h2 className="text-3xl font-bold">{t.elementsTitle}</h2>
        <p className="mt-6 text-neutral-300 leading-relaxed">{t.elementsBody}</p>
      </section>

      {/* What it actually is */}
      <section className="mx-auto max-w-3xl px-6 py-16 border-t border-neutral-800">
        <h2 className="text-3xl font-bold text-center">{t.whatItIsTitle}</h2>
        <div className="mt-8 space-y-5 text-neutral-300 leading-relaxed">
          <p>{t.whatItIsBody1}</p>
          <p>{t.whatItIsBody2}</p>
          <p>{t.whatItIsBody3}</p>
        </div>
      </section>

      {/* Three pillars */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-800">
        <h2 className="text-3xl font-bold text-center">{t.pillarsTitle}</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {t.pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 hover:border-amber-400/50 transition-colors"
            >
              <h3 className="font-semibold text-lg text-amber-400">{p.title}</h3>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum / videos */}
      <section className="mx-auto max-w-4xl px-6 py-16 border-t border-neutral-800">
        <h2 className="text-3xl font-bold text-center">{t.curriculumTitle}</h2>
        <p className="mt-4 text-center text-neutral-400 max-w-2xl mx-auto">{t.curriculumBody}</p>
        <ol className="mt-10 space-y-3">
          {t.videos.map((v) => (
            <li
              key={v.n}
              className="flex items-start gap-4 rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 hover:border-amber-400/40 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center font-semibold">
                {v.n}
              </div>
              <div className="text-sm text-neutral-200 leading-relaxed pt-1.5">{v.title}</div>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Link
            href={learnHref}
            className="inline-block rounded-md bg-amber-400 px-6 py-3 font-semibold text-neutral-900 hover:bg-amber-300 transition-colors"
          >
            {t.ctaPrimary}
          </Link>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-800">
        <h2 className="text-3xl font-bold text-center">{t.pricingTitle}</h2>
        <p className="mt-3 text-center text-neutral-400 max-w-xl mx-auto">{t.pricingSub}</p>
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8">
            <div className="text-sm uppercase tracking-wider text-neutral-500">{t.free.label}</div>
            <div className="mt-2 text-4xl font-bold">{t.free.price}</div>
            <ul className="mt-6 space-y-2 text-sm text-neutral-300">
              {t.free.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-amber-400 bg-amber-400/5 p-8 relative">
            <div className="absolute -top-3 left-8 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-neutral-900">
              {t.paid.popular}
            </div>
            <div className="text-sm uppercase tracking-wider text-amber-400">{t.paid.label}</div>
            <div className="mt-2 text-4xl font-bold">
              {t.paid.price}
              <span className="text-lg font-normal text-neutral-400">{t.paid.per}</span>
            </div>
            <div className="text-xs text-neutral-400">{t.paid.annual}</div>
            <ul className="mt-6 space-y-2 text-sm text-neutral-100">
              {t.paid.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-3xl px-6 py-12 border-t border-neutral-800 text-center">
        <p className="text-xs text-neutral-500 leading-relaxed">{t.disclaimerShort}</p>
        <Link
          href={disclaimerHref}
          className="mt-3 inline-block text-xs text-amber-400 hover:text-amber-300 underline"
        >
          {t.readDisclaimer} →
        </Link>
      </section>
    </>
  );
}
