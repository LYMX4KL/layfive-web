import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LayFive — 5-Element Roulette Strategy",
  description:
    "LayFive is the 5-element (Metal / Wood / Water / Fire / Earth) roulette tracking and strategy platform. Play smarter with live tracking, coaching signals, and the official reference cards.",
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
              <Link href="/pricing" className="hover:text-amber-400">Pricing</Link>
              <Link href="/articles" className="hover:text-amber-400">Articles</Link>
              <Link href="/app" className="hover:text-amber-400">Launch App</Link>
            </div>
            <Link
              href="/signup"
              className="rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-amber-300 transition-colors"
            >
              Sign Up
            </Link>
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
                  <li><Link href="/app" className="hover:text-amber-400">Launch App</Link></li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-neutral-200 mb-3">Content</div>
                <ul className="space-y-2">
                  <li><Link href="/articles" className="hover:text-amber-400">Articles</Link></li>
                  <li><Link href="/testimonials" className="hover:text-amber-400">Testimonials</Link></li>
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
