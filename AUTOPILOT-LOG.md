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
| Page | Perf | A11y | BP | SEO | LCP ms | CLS | TBT ms |
|---|---|---|---|---|---|---|---|
| Home | 92 | 97 | 100 | 66 | 3262 | 0 | 47 |
| Back pain | 95 | 100 | 100 | 69 | 2931 | 0 | 42 |
| Dr. Dharshan | 92 | 100 | 100 | 69 | 3176 | 0 | 101 |

SEO is low by design (deliberate noindex). LCP ~3.0-3.3s local; the 2.0s
budget is measured on the deployed preview (still blocked - no Vercel deploy).

**Blocked:** Vercel preview (unchanged); Lighthouse numbers are local.
