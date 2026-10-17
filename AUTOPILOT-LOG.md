# Autopilot log — Rehabify Phases 1b–7

Autonomous run. Preview deployments are blocked (no Vercel Git deployment or
CLI credentials), so all verification is local (`npm run start` on :3000).

## Phase 1b — Badges (branch: phase-1b)

**Built:** 28 code-drawn badge SVGs in `resources/badges/src/` on a shared
`badge-base.svg` template; `scripts/build-badges.mjs` emits SVG +
PNG/WebP at 512/256 to `public/images/icons/services/` and a contact sheet to
`artifacts/badges/contact-sheet.png`. Cards use the real files; styleguide has
a badge gallery (mobile-collapsed `<details>`).

**Acceptance:** build PASS, 11/11 Playwright PASS, `test:images` PASS
(205 files idempotent, sources unchanged, no upscale/EXIF, alpha masks ok).
Fixed: `bones.svg` filled dots → stroked circles; stale "28 pending" text in
process-images; 20,662px mobile badge section → horizontal scroll + collapse.

**Screenshots:** artifacts/badges/contact-sheet.png; styleguide 390/1440.

## Phase 1c — Icons (branch: phase-1b)

**Built:** `lib/icons.tsx` (tree-shaken Lucide set at stroke 1.75, Icon
component), `components/medical-icons.tsx` (8 code-drawn: stethoscope,
ultrasound, goniometer, spine, brain, knee, wheelchair, child), styleguide
Icons section at 24/16 on paper and night.

**Acceptance:** build + lint PASS, 11/11 Playwright PASS after making icon
rows scrollable focusable regions.

## Phase 2 — Site shell (branch: phase-2)

**Built:** floating pill nav (shrinks on scroll) with Care mega panel,
full-screen mobile menu, mobile action dock, 4-column footer with emergency
strip and giant wordmark, cookie/consent banner (localStorage, customisable),
spine navigator (auto-discovers `[data-spine]` sections, dark-aware), skip
link, breadcrumbs, 404 page, `lib/nav.ts`, `lib/consent.ts`,
`lib/booking-context.ts`, `(site)` route group so /styleguide stays
chrome-free.

**Acceptance:** build + lint PASS, 11/11 Playwright PASS. Screenshots:
artifacts/shell-*-top/footer.png, shell-mega-1440.png, shell-menu-390.png.
Fixed: cookie banner z-index below mobile menu.

## Phase 3 — Content pipeline (branch: phase-3)

**Built:** `scripts/build-content.mjs` parses `new-website-content.md` into 49
`content/pages/**.mdx` (frontmatter + verbatim sections) + manifest. Runtime:
`lib/content.ts` loader, `lib/markdown.tsx` renderer, `lib/conditions.ts`
(41 A–Z entries), `lib/schema.ts` (MedicalWebPage, Physician, MedicalClinic,
FAQPage, BlogPosting, BreadcrumbList — all [CONFIRM]-stripped). Catch-all
`[...slug]` route + ContentPage/DoctorPage/PostPage/ConditionsPage/
CareIndexPage templates with breadcrumbs, FAQ accordion, reviewer box,
emergency strip, CTA band, JSON-LD. `app/sitemap.ts`, `robots.ts`
(indexable switch + AI-crawler rules), `llms.txt` + `llms-full.txt` routes,
8 redirects, `proxy.ts` 410 for /ai-tools. `launch-check` extended: per-page
content checks, banned terms, em/en dashes, broken internal links, condition
coverage, llms presence — currently 90 blockers (78 [CONFIRM], indexable
flag, 6 future post links, others as found).

**Acceptance:** 59 routes build, 18/18 Playwright PASS (new
tests/routes.spec.ts covers h1/noindex/schema/redirects/410/a11y).
Fixed: `/dr-*` redirect loop (trailingSlash already handles), wrapped YAML
arrays, Prettier breaking generated frontmatter (content/ now prettierignored),
stale test servers, nav-book accessible name at mobile width.

**Screenshots:** artifacts/p3-*-1440/390.png.

**Blocked:** future posts referenced by `posts:` fields (6 unwritten articles)
stay as launch-check blockers; Vercel preview unavailable.

## Phase 4 — Home and templates (branch: phase-4)

**Built:** full Home in `app/(site)/page.tsx`: night hero (doctor fan, floating
chip + goniometer, fact row, mobile short line), finder bar (prefills
/contact/#book), conditions marquee, 6-tile WHY bento (quote, goals widget,
pain, neuro, ages, clinic/video switch), body map + also-row, 12-card care
track, recovery spine (sticky vertebra column + 6 steps), 3 stacking cards,
meet-the-doctor (portrait, principles, timeline), visit band, A-to-Z search,
quick answers + help card, notices, CTA band. Care/doctor/post/conditions
templates from P3 verified.

**Acceptance:** build PASS, 18/18 Playwright PASS, lint/typecheck/format PASS.
Fixed: recovery section missing night bg (washed heading), goniometer hidden
under arch (z-index), `.goals-tile`/`.bento-quote` scoped to `.bento-grid`
(styleguide specimen regression), nested `<main>` (templates -> div),
`main` landmark in (site) layout, visit-band contrast, nav-book aria-label.

**Screenshots:** artifacts/p4-home-{1440,390}-{hero,bento,recovery,az,meet,full}.png

## Phase 5 — Posts, preview, QA (branch: phase-5; lighthouse + a11y fixes landed in the phase-4 commit window)

**Built:** post template verified on all 3 library posts; `scripts/
lighthouse-run.mjs` (N-run median harness); all-route sweep (48 public routes:
200, h1, noindex, zero horizontal overflow at 390).

**Lighthouse mobile medians (3 runs, local prod build):**

| Page         | Perf | A11y | BP  | SEO | LCP ms | CLS | TBT ms |
| ------------ | ---- | ---- | --- | --- | ------ | --- | ------ |
| Home         | 92   | 97   | 100 | 66  | 3262   | 0   | 47     |
| Back pain    | 95   | 100  | 100 | 69  | 2931   | 0   | 42     |
| Dr. Dharshan | 92   | 100  | 100 | 69  | 3176   | 0   | 101    |

SEO is low by design (deliberate noindex). LCP ~3.0-3.3s local; the 2.0s
budget is measured on the deployed preview (still blocked - no Vercel deploy).

**Blocked:** Vercel preview (unchanged); Lighthouse numbers are local.

## Phase 6 — Forms, analytics, integrations, headers (branch: phase-6)

**Built:**

- `lib/booking-shared.ts` + `lib/booking-schema.ts`: shared constants/phone
  normalisation (client-safe) + Zod schema (server). Reason list from
  site-plan order, 10-digit Indian mobile normalisation (+91/91/0 prefixes),
  age years/months, date bounds computed in Asia/Kolkata, under-18 and
  guardian-consent rules, consent required.
- `app/(site)/contact/page.tsx` + `actions.ts` + `components/booking-form.tsx`:
  dedicated contact page renders generated copy plus the real form. Server
  action validates server-side, honeypot + HMAC-signed 3-second minimum fill
  (silent redirect for bots), Turnstile when keys exist (skipped with one
  server warning otherwise), Resend send with RESEND_MODE=mock|fail test
  switch (mock writes artifacts/mock-email.html), 303 redirect to
  /thank-you/?type=. Failure state keeps all typed values and shows the
  Call/WhatsApp copy.
- Progressive enhancement verified: form posts and validates with JavaScript
  disabled (React resets uncontrolled fields after actions; the reason select
  is keyed by the echoed value so it remounts with the right default).
- Consent: `lib/consent.ts` versioned (v1, 12-month expiry); `lib/analytics.ts`
  typed track() allowlist; `components/analytics.tsx` Consent Mode v2 defaults
  - gtag injection only after Accept; manual page_view on route change keeps
    utm_* only; Reject updates consent to denied and deletes _ga cookies.
- `components/map-facade.tsx` click-to-load Google Maps embed + directions
  link (hidden in production while address is CONFIRM); renders on
  /plan-your-visit/ and /contact/.
- `components/video-facade.tsx` youtube-nocookie click-to-load facade;
  styleguide specimen only (siteConfig.videos empty).
- Speed Insights via `components/speed-insights.tsx` (renders only on Vercel;
  locally it 404s).
- Security headers on all routes: HSTS, nosniff, Referrer-Policy,
  Permissions-Policy, X-Frame-Options DENY, CSP (self + gtag/ga connect,
  cloudflare challenges script+frame, youtube-nocookie + google maps frame).
  CSP uses 'unsafe-inline' for script-src and style-src so pages stay static;
  nonces would force dynamic rendering (deferred; noted as deviation).
- `.env.example` and `docs/dns-resend.md` (current DNS snapshot + records to
  add; rules: never touch existing MX, no second apex SPF).
- Mobile dock hidden on /thank-you/ and while the booking form is focused.
- Tests: tests/forms.spec.ts (6), tests/consent-headers.spec.ts (4).

**Acceptance:** 28/28 Playwright PASS (forms: required-summary focus+links,
mobile normalisation, under-18 gate, consent gate, honeypot silent redirect,
<3s silent redirect; consent: zero third-party requests pre/post reject;
headers: all present on /, /contact/, care page + noindex). Lint/typecheck/
format/build PASS. Mock email verified to contain IST time, exact consent
text, tel: and wa.me links. no-JS submission verified end-to-end (303 to
/thank-you/?type=clinic). RESEND_MODE=fail verified (fail copy + kept values).

**Deviation:** first-load JS measured gzipped in-browser: / = 158 KB,
/contact/ = 163 KB (targets 120/150). Breakdown: ~110 KB is the React/Next
runtime + shared layout chunks (header nav, consent banner, dock, spine nav)
that every page needs; the rest is page widgets. Getting under the target
means removing core interactive components; flagged for the P8 report rather
than silently dropping features.

**Blocked:** Turnstile real keys, Resend API key + verified domain,
BOOKING_TO_EMAIL, GA4 id, PREVIEW_USER/PASS for preview Basic Auth (no
preview host exists yet), Vercel Deployment Protection toggle, real
end-to-end email to AGENCY_TEST_EMAIL, preview Lighthouse.

## Phase 7 — Design polish (branch: phase-7)

No agency findings were supplied; the standing checklist drove the work.
`scripts/qa-capture.mjs` captured 100 before-shots (25 pages x 4 widths) and
100 after-shots into qa/phase-7/{before,after}/, plus compare.html and
changes.md.

**Fixes (one line each, all recorded in qa/phase-7/changes.md):**

- visit-band gained a real night background (aqua kicker was on paper).
- Marquee gained a visible 48px pause/play control + hover/focus pause.
- Mega panel: Esc returns focus to the Care link (suppress flag prevents the
  focus handler reopening it).
- Home mobile height 16,840 -> 10,263px via swipe-strip rules for >3-item
  sections (bento, ways, recovery steps, principles), scrollable A-to-Z
  region, body figure hidden at 390 (chips carry interaction), tighter
  mobile section rhythm. All non-hero sections under 1,097px.
- Booking form age label association fixed (Lighthouse a11y 95 -> 100).

**tests/polish.spec.ts** covers: em/en dashes, NAP digits, dock visibility +
thank-you exception + Book reachability, clipped text incl. glow labels,
aqua/apricot only on night, marquee pause, home height range + section caps +
doctor visibility, adjacent duplicate badges, axe colour-contrast on key
pages, mega panel bounds + Esc.

**Results:** 38/38 Playwright green. Lint, typecheck, format, build all pass.
Local Lighthouse medians of 3 (mobile):

- / : perf 91, a11y 100, BP 96, LCP 3.50s, CLS 0, TBT 58ms
- /pain-and-spine/back-pain/ : perf 92, a11y 100, BP 100, LCP 3.27s
- /dr-dharshan-n-a/ : perf 92, a11y 100, BP 100, LCP 3.31s
- /contact/ : perf 93, a11y 100, BP 100, LCP 3.17s

**Open:** Vercel preview still blocked (no signed-in CLI / Git integration not
connected to this repo); LCP medians above the <2.0s real-page target are
local next start numbers on this machine - preview measurement pending.
JS budgets deviate: home 158KB gz, contact 163KB gz (see P6 note).

## Phase 7m follow-up

**Open (P8):** /guides/ and guide articles ship ~193KB gzipped first-load JS, over the 170KB guide target. The shared site shell (nav, consent, analytics gating) accounts for nearly all of it - /care/ measures 202KB gz on the same bundle. Accepted in 7m; revisit in P8 against the whole shell rather than guide code.
