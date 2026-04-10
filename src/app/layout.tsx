import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import NavAuth from "@/components/NavAuth";

export const metadata: Metadata = {
  title: "LayFive — Play Longer. Play Smarter. Play Together.",
  description:
    "LayFive is the 5-element (Metal / Wood / Water / Fire / Earth) roulette discipline system for cruise casino players. Not a winning system — a structured way to make your bankroll last and earn casino comps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur sticky top-0 z-50">
          <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-1 font-semibold text-lg">
              <span className="text-amber-400">Lay</span>
              <span>Five</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
              <Link href="/about" className="hover:text-amber-400">About</Link>
              <Link href="/learn" className="hover:text-amber-400">Learn</Link>
              <Link href="/pricing" className="hover:text-amber-400">Pricing</Link>
              <a href="https://lymx4kl.github.io/layfive-app/" className="hover:text-amber-400">Open Tracker</a>
            </div>
            <div className="flex items-center gap-3">
              {/* Simple language toggle: EN goes to /, 中文 goes to /zh.
                  Both render the same HomePage component with a different locale. */}
              <div className="hidden sm:flex items-center gap-1 text-xs text-neutral-400">
                <Link
                  href="/"
                  className="px-2 py-1 rounded hover:text-amber-400 hover:bg-neutral-800"
                >
                  EN
                </Link>
                <span className="text-neutral-700">·</span>
                <Link
                  href="/zh"
                  className="px-2 py-1 rounded hover:text-amber-400 hover:bg-neutral-800"
                >
                  中文
                </Link>
              </div>
              <NavAuth />
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-neutral-800 mt-16">
          <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-400">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="font-semibold text-neutral-200 mb-3">LayFive</div>
                <ul className="space-y-2">
                  <li><Link href="/about" className="hover:text-amber-400">About</Link></li>
                  <li><Link href="/pricing" className="hover:text-amber-400">Pricing</Link></li>
                  <li><a href="https://lymx4kl.github.io/layfive-app/" className="hover:text-amber-400">Tracker</a></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-neutral-200 mb-3">Content</div>
                <ul className="space-y-2">
                  <li><Link href="/learn" className="hover:text-amber-400">Cruise Roulette Series</Link></li>
                  <li><Link href="/articles" className="hover:text-amber-400">Articles</Link></li>
                  <li><Link href="/cruise" className="hover:text-amber-400">Cruise Offerings</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-neutral-200 mb-3">Shop</div>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://123partners.net"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-400"
                    >
                      Merchandise ↗
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-neutral-200 mb-3">Legal</div>
                <ul className="space-y-2">
                  <li><Link href="/terms" className="hover:text-amber-400">Terms</Link></li>
                  <li><Link href="/privacy" className="hover:text-amber-400">Privacy</Link></li>
                  <li><Link href="/disclaimer" className="hover:text-amber-400">Disclaimer</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-neutral-800 text-xs text-neutral-500">
              © 2026 Kenny Lin / LayFive™. All rights reserved. LayFive strategies,
              reference cards, and app designs are proprietary intellectual property.
              For entertainment and educational purposes only — no guarantee of winnings.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
