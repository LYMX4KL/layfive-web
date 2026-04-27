import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { videos, getVideoBySlug } from "@/lib/videos";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return videos.map((v) => ({ id: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const v = getVideoBySlug(id);
  if (!v) return { title: "Video not found" };
  return {
    title: `${v.title} — LayFive`,
    description: v.summary,
  };
}

export default async function VideoPage({ params }: Props) {
  const { id } = await params;
  const v = getVideoBySlug(id);
  if (!v) notFound();

  const currentIndex = videos.findIndex((x) => x.n === v.n);
  const prev = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const next = currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/learn"
        className="text-sm text-amber-400 hover:text-amber-300"
      >
        ← All videos
      </Link>

      <div className="mt-6 inline-block rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1 text-xs text-amber-300">
        Video {v.n} of {videos.length}
      </div>
      <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
        {v.title}
      </h1>
      <p className="mt-4 text-neutral-300 leading-relaxed text-lg">
        {v.summary}
      </p>

      {/* Video placeholder — swap in YouTube embed when available */}
      <div className="mt-8 aspect-video rounded-lg border border-neutral-800 bg-neutral-900/50 flex items-center justify-center text-neutral-500 text-sm">
        {v.youtubeId ? (
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${v.youtubeId}`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <span>Video coming soon</span>
        )}
      </div>

      <div className="mt-10 rounded-lg border border-amber-400/30 bg-amber-400/5 p-6">
        <p className="text-amber-200 italic leading-relaxed">{v.hook}</p>
      </div>

      <article className="mt-12 space-y-10">
        {v.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl font-semibold text-amber-400">{s.heading}</h2>
            <div className="mt-4 space-y-4 text-neutral-300 leading-relaxed">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </article>

      <section className="mt-12 rounded-lg border border-neutral-800 bg-neutral-900/40 p-6">
        <h2 className="text-lg font-semibold text-neutral-100">Key takeaways</h2>
        <ul className="mt-4 space-y-2 text-neutral-300">
          {v.takeaways.map((t, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-amber-400">•</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <nav className="mt-16 flex justify-between gap-4 border-t border-neutral-800 pt-8">
        {prev ? (
          <Link
            href={`/learn/${prev.slug}`}
            className="flex-1 rounded-lg border border-neutral-800 p-4 hover:border-amber-400/50 transition-colors"
          >
            <div className="text-xs text-neutral-500">← Previous</div>
            <div className="mt-1 font-semibold text-neutral-100">
              {prev.shortTitle}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/learn/${next.slug}`}
            className="flex-1 rounded-lg border border-neutral-800 p-4 hover:border-amber-400/50 transition-colors text-right"
          >
            <div className="text-xs text-neutral-500">Next →</div>
            <div className="mt-1 font-semibold text-neutral-100">
              {next.shortTitle}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>

      <div className="mt-12 text-center text-xs text-neutral-500">
        21+. Gambling can be addictive. Play responsibly.
      </div>
    </div>
  );
}
