import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 px-6 py-8 mt-auto">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
        <p>&copy; 2026 LayFive. All rights reserved.</p>
        <nav className="flex gap-4">
          <Link href="/disclaimer" className="hover:text-neutral-300 transition-colors">
            Disclaimer
          </Link>
          <Link href="/pricing" className="hover:text-neutral-300 transition-colors">
            Pricing
          </Link>
          
            href="https://lymx4kl.github.io/layfive-app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-300 transition-colors"
          >
            Open Tracker
          </a>
        </nav>
      </div>
    </footer>
  );
}
