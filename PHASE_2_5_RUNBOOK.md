# Phase 2-5 Execution Runbook

This runbook covers platform validation, UX testing, SEO growth work, and the recurring measurement loop.

## Phase 2: Backend/Platform Validation

### 1) Route parity and crawlability checks
- Run:
```bash
npm run audit:seo
```
- Expected:
  - `GET` and `HEAD` return `200` for all sitemap URLs.
  - No routes with `404` in the report.
  - HTML pages expose valid title/canonical/robots.

### 2) Post-deploy critical URL checks
- Verify:
  - `https://www.pausepad.com/timer`
  - `https://www.pausepad.com/blog`
  - `https://www.pausepad.com/about`
  - `https://www.pausepad.com/privacy`
- All should return `200`.

### 3) Analytics data quality checks
- Confirm GA4 receives:
  - `page_view` events on route changes.
  - Core Web Vitals events: `CLS`, `INP`, `LCP`, `FCP`, `TTFB`.
- Source:
  - `src/utils/analytics.ts`

## Phase 3: UI/UX Conversion Validation

### Playwright smoke coverage (already executed in this session)
- Desktop:
  - timer start/pause/reset
  - add task flow
- Mobile:
  - navigation access
  - navigation to blog

### Current baseline result
- Status: pass
- Timestamp: `2026-02-05T20:01:17.792Z`
- Environment tested: `https://www.pausepad.com`

## Phase 4: SEO Content Growth Plan

### Priority clusters
1. Commercial-intent timer pages:
  - "study timer online"
  - "pomodoro timer with music"
  - "focus timer for work"
2. Informational blog clusters:
  - pomodoro technique
  - exam and study workflows
  - concentration and deep-work methods

### Content actions
1. Publish one new high-intent page weekly.
2. Update two existing articles weekly with:
  - refreshed examples
  - updated date fields
  - tighter internal links to `/timer`.
3. Expand hub linking:
  - each blog post links to 3 relevant posts and 1 product CTA.

## Phase 5: Measurement Loop (Weekly)

### Weekly checklist
1. Run `npm run audit:seo`.
2. Review Search Console:
  - Index coverage
  - Top queries
  - CTR for `/timer` and `/blog/*`.
3. Review GA4:
  - Organic sessions
  - Landing-page conversion proxy (timer starts, tasks added).
4. Log metrics in `reports/kpi-tracker.csv`.

### Monthly checklist
1. Compare month-over-month:
  - organic clicks
  - average position
  - CTR
  - Core Web Vitals events distribution.
2. Trim low-performing pages or re-target intent.
3. Re-run full technical + UX smoke.
