# LayFive Web (layfive.com)

The public website + member platform for LayFive.

## What's here so far (Phase 1, in progress)

- Next.js 16 + React + TypeScript + Tailwind CSS
- Landing page (`/`)
- About (`/about`), Pricing (`/pricing`)
- Legal pages: Terms (`/terms`), Privacy (`/privacy`), Disclaimer (`/disclaimer`)
- Existing LayFive app embedded at `/app` (served from `public/app/index.html`)
- Site-wide header and footer with LayFive branding
- Footer links to 123partners.net for merchandise (external)

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy

This repo is intended to be deployed to Vercel with the layfive.com domain pointed via GoDaddy DNS. Instructions for this setup are in `LayFive_Website_Plan.docx` (Section 4, Phase 1).

## What's next

- Phase 1 finish: GitHub repo, Vercel deploy, GoDaddy DNS, attorney review of legal pages
- Phase 2: Supabase auth + Stripe memberships + free-vs-paid feature gate
- Phase 3: Articles, testimonials, referral, promotions, cruise offerings
- Phase 4: AI customer service (Claude API)
- Phase 5: YouTube/TikTok live streaming embeds
- Phase 6: Marketing automation
- Phase 7: Mobile app packaging (Capacitor)
- Phase 8: 123partners.net takeover (separate project)
