# Studio Kunal Photography — “Memories in Motion”

Editorial, cinematic portfolio for Studio Kunal Photography (North America · India · Worldwide).
Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS 4 · GSAP (ScrollTrigger, SplitText) · Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, JSON-LD (defaults to `https://studiokunalphotography.com`) |
| `RESEND_API_KEY` | Sends contact enquiries via [Resend](https://resend.com). Without it, dev logs enquiries to the console; production shows a friendly error with the studio email. |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | Recipient / verified sender for enquiries |

## Where things live

```
app/                      routes (all statically generated)
  page.tsx                home — the full “film” sequence
  portfolio/[slug]        photo-essay story pages
  films, about, journal/[slug], experience, contact, privacy
  contact/actions.ts      Server Action: validation, honeypot, time trap, rate limit, delivery
  sitemap.ts robots.ts    SEO endpoints (sitemap includes image entries)
components/
  home/                   Hero, Statement, SelectedStories, HorizontalGallery, FilmStrip,
                          CinemaSection, EditorialCollage, BehindTheLens, Presence,
                          Testimonials, Process, FinalCta
  story/                  PortfolioIndex (filters), StoryBlocks (essay grammar), StoryViewer
  layout/                 Header, FullscreenMenu, Footer
  motion/                 SmoothScroll (Lenis), Reveals (data-attribute scroll motion),
                          PageTransition (photo-expand + curtain transitions, <TLink>)
  ui/                     Pic (all images), Lightbox, Cursor, FilmEmbed, JournalCard…
data/                     ALL content — edit here, not in components
  weddings.ts             stories + curated block sequences
  testimonials.ts films.ts journal.ts studio.ts
  images.json             generated photo manifest (dimensions, colour, blur preview)
lib/                      photos, gsap helpers, schema.org builders, enquiry schema
```

### Adding a portfolio story
1. Put optimised JPEGs (≤2400px long edge) in `public/images/<set>/01.jpg…`.
2. Add the set to `data/images.json` (width, height, colour, blur) — `scripts/migrate-images.mjs` shows how the manifest was generated with `sharp`.
3. Add an entry to `data/weddings.ts`, composing `blocks` from: `wide`, `pair`, `detail`, `full`, `trio`, `quote`, `sequence`, `film`, `final`. The page, metadata, sitemap and JSON-LD follow automatically.

### Motion system
Pages stay server-rendered; motion is opt-in via attributes:
`data-reveal="split|fade|mask|stagger"`, `data-speed="0.1"` (desktop parallax), `data-cursor="view|play|drag|open"`,
`data-theme="dark|light"` (header colour). Hidden initial states only apply under `html.js-motion`, which is never set
for `prefers-reduced-motion` users — they get static, fully visible pages, no smooth scroll, no pinning.

## Content provenance
Everything was migrated from the existing site — no invented clients, venues, awards or statistics:
- 8 galleries (≈270 photographs after removing near-duplicates and album layouts), 7 extra homepage frames, 9 YouTube films, 9 testimonials, FAQ, pricing approach, contact details.
- Facts such as “07.05.2025” (Nooreen & Jugraj) and “21.04.2026” (Akshita & Rajat) are read from signage in the photographs.
- Legacy URLs 308-redirect to the new ones (`next.config.ts`).

### Needs the studio's input before launch
- **Portrait of Kunal** — none existed on the old site. `BehindTheLens` and `/about` currently use a portfolio frame, captioned honestly as *“Through Kunal's lens”*. Pass a real portrait and `isFounder` to swap it in.
- **Journal** — five launch articles written from the studio's own published philosophy, FAQ and real sessions. Please review the wording.
- **Privacy notice** — plain-language draft; have it reviewed for PIPEDA / India's DPDP Act.
- **Enquiry email** — set `RESEND_API_KEY` (and verify the sending domain) before going live.
- The three unattributed wedding frames in `data/weddings.ts → moments` came from the old homepage; add couple names if you'd like them credited.
