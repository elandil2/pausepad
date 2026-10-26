# PausePad – Pomodoro Timer

A free, distraction-free Pomodoro timer with a task list and lofi focus music. No sign-up, no ads.

**Live site:** https://pausepad.vercel.app (pausepad.com is being re-registered)

## Features

- Pomodoro, short break, long break and 50-minute deep focus modes
- Custom durations and optional auto-start (saved in the browser)
- Accurate in background tabs: remaining time is derived from the clock, not from interval ticks
- Countdown in the tab title, sound chime and desktop notifications
- Task list and daily focus stats stored locally
- Lofi live streams that only load when you press Play
- Blog with Pomodoro guides in 9 languages
- Installable PWA

## Stack

React 18 + TypeScript, Vite, styled-components, React Router, react-helmet-async, deployed on Vercel.

Every route is **prerendered to static HTML at build time** (`src/entry-server.tsx` + `scripts/prerender.mjs`),
so search engines and link previews get real content, titles, canonical URLs, hreflang and JSON-LD.
The same step generates `sitemap.xml` and `robots.txt`.

## Development

```bash
npm install
npm run dev       # dev server on http://localhost:5173
npm run build     # type-check, client build, SSR build, prerender into dist/
npx serve dist    # preview the production build with clean URLs
```

## Project layout

| Path | What it is |
| --- | --- |
| `src/routes.tsx` | All routes and their sitemap priority |
| `src/content/posts.ts` | Blog post metadata (titles, dates, languages, translations) |
| `src/config/site.ts` | Public site URL (override with the `VITE_SITE_URL` env var) |
| `src/components/SEO.tsx` | Title, meta, canonical, Open Graph, hreflang, JSON-LD |
| `src/components/Article.tsx` | Shared blog post layout |
| `src/hooks/usePomodoro.ts` | Timer logic |
| `scripts/generate-assets.py` | Regenerates favicon, PWA icons and `og-image.png` (needs Pillow) |

## Adding a blog post

1. Create the page in `src/pages/blog/` using the components from `src/components/Article.tsx`.
2. Add its metadata to `src/content/posts.ts` (set `translationGroup` for translations).
3. Add the route to `src/routes.tsx`. The blog index, footer, sitemap and hreflang update automatically.

## Analytics

- **Vercel Web Analytics + Speed Insights** (free on the Hobby plan): enable both in the Vercel project's
  *Analytics* and *Speed Insights* tabs.
- **Google Analytics 4** (`G-FK0RKNZG4G`): loaded in `index.html`; page views are sent on every route change.
- **Google Search Console**: verified with `public/google701882e8b3fd3bb9.html`; submit `/sitemap.xml`.

## License

MIT
