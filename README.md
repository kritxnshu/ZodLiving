# ZOD Living

A website for ZOD Living, a student hostel in Greater Noida. The homepage is a scroll-driven walkthrough of the building: frames play on a canvas, loaded by a custom frame loader that keeps a limited cache, prioritizes key scenes and preloads in the direction you scroll. Visitors can browse room types with AC/Non-AC pricing, amenities, a photo gallery and the location, and contact the hostel on WhatsApp, by phone or by email. It's built with Next.js 16, React 19, TypeScript and Tailwind CSS v4 with no animation libraries, and all hostel details live in one config file, so prices and info can be updated without touching the UI.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Deploying (Vercel)

- Works with no configuration. Page titles, the sitemap, `robots.txt` and the share image use the project's production URL automatically.
- Once there's a custom domain, set `NEXT_PUBLIC_SITE_URL` (e.g. `https://zodliving.in`) in the Vercel project's environment variables.

## Where things live

| What | Where |
|---|---|
| Address, phone, prices, amenities | `src/lib/contact-config.ts` |
| FAQ answers | `src/lib/faqs.ts` |
| Page titles and descriptions for Google | `src/app/<page>/page.tsx` |
| Page content | `src/components/pages/` |
| Colours (one gold family) and fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Hero scenes: text, keyframes, timing | `src/lib/scenes.ts` |

## Hero frames

The hero plays 445 AVIF frames from `public/sequence/<version>/`, with a desktop set (1600×900) and a portrait set for phones (720×1080, cropped around each scene's subject). They're built from the original 1920×1080 PNGs in `frames-source/`, which is not committed:

```bash
npm run frames   # macOS only (uses sips)
```

The frames are cached by browsers for a year. Whenever they change, bump `VERSION` in `scripts/build-frames.sh` **and** `FRAME_VERSION` in `src/lib/frames.ts`.

## Not wired up yet

The booking dialog and the contact form show a confirmation but don't send the enquiry anywhere yet. They're to be connected to Google Sheets.
