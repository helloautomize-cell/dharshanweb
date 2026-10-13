# P5 · Posts, preview deploy and QA

What it does: adds the 3 launch articles, deploys a full preview on Vercel (Mumbai region), measures real Lighthouse scores on that preview, runs every test across every page, and writes `client-inputs-needed.md`: the list of every missing fact grouped by who must supply it.
Check before approving: read the 3 articles on your phone, check the Lighthouse medians in the report, and forward `client-inputs-needed.md` to Dr. Dharshan and the clinic team. Nothing goes live in this phase; the site stays noindex.

```
# Phase 5: Launch posts, preview deploy, Lighthouse, site-wide QA, client-inputs-needed.md

Before starting, confirm these paths exist and list them:
- resources/docs/new-website-content.md (Part 7 has the 3 posts)
- resources/docs/site-plan.md
- resources/docs/design-development-plan.md
- scripts/build-content.mjs and scripts/launch-check.mjs (from Phase 3)
- lib/schema.ts and the post template with its fixture (from Phase 4)
- public/images/_todo.md
If any is missing, STOP and tell me. Do not substitute another file.

Branch: phase-5 (from main after Phase 4 was merged). Deploy a Vercel preview. Do not merge to main until I approve.

Non-negotiables (short form):
- Night-and-ice design, Phase 1 tokens and fonts (Bricolage Grotesque, Geist, Geist Mono, Instrument Serif italic). Logo PNG only. One glow button per viewport.
- Body text at least 17px, tap targets 48px, contrast 4.5:1, visible focus, reduced motion respected, content visible without JS.
- Copy only from new-website-content.md, word for word. Never invent copy, facts, dates, reading times, numbers, fees or hours. [CONFIRM] chips stay until the client answers.
- No em or en dashes anywhere.
- Compliance (IMC 2002 Regulations, Drugs and Magic Remedies Act 1954, DPDP Act 2023, Telemedicine Guidelines 2020): no testimonials, ratings, AggregateRating or Review schema, before/after; never "best", "No. 1", "leading", "world-class", "guaranteed", "cure", "permanent", "100%"; no fees unless site-config sets them; no drug or device brands; no hospital names as referral claims; emergency line on every care page and the footer; reviewer box and last-reviewed date on every medical page and post; no third-party requests before consent or a click.
- SITE_INDEXABLE stays false. Do not turn indexing on, do not add a custom domain, do not touch DNS.

Tasks:
1. The 3 launch posts (new-website-content.md Part 7, routes from site-plan.md section 2):
   - /health-library/what-is-a-physiatrist/
   - /health-library/first-90-days-after-stroke/
   - /health-library/low-back-pain-when-to-worry/
   a. Extend scripts/build-content.mjs to write resources/content/health-library/{slug}.md with the yaml frontmatter as given (author, reviewedBy, datePublished, dateModified, lastReviewed, readingTime, links) and the body word for word. The copy coverage check covers them.
   b. Add a post Zod schema: title max 60, description max 160, author and reviewedBy are doctor ids, datePublished and dateModified are dates or [CONFIRM], readingTime as given (do not compute a new one), faqs as visible on the page.
   c. Render with the Phase 4 post template: reviewer box at the top, "Written by Dr. Dharshan N A · [date] · 5 min read" (nowrap, date as a [CONFIRM] chip until set), table of contents, body, callouts (the emergency callout where the post content has one), FAQs on `<details>`, sources, related care cards and the links from frontmatter, CTA band.
   d. Schema from lib/schema.ts: BlogPosting (headline, author and reviewedBy as the Physician @id, datePublished, dateModified, publisher #clinic, inLanguage en-IN, mainEntityOfPage) plus FAQPage only for the visible FAQs and BreadcrumbList. Dates still [CONFIRM] are omitted and logged by launch-check.
   e. Health Library list: 3 cards with designed covers (night gradient plus the badge of the post's main care page, never a photo or video thumbnail), category chip, title, the byline line. Category chips filter without a reload and the full list shows without JS.
   f. Care detail pages listed in each post's frontmatter show the post in their related posts slot. Sitemap, llms.txt and llms-full.txt include the posts.
2. Preview deploy on Vercel:
   a. vercel.json with `"regions": ["bom1"]` for functions. Node version pinned in package.json engines.
   b. Env vars on Preview: SITE_INDEXABLE=false. No analytics keys yet.
   c. `poweredByHeader: false` and no production browser source maps. Security headers and the CSP are Phase 6; do not add them now.
   d. If Vercel Deployment Protection is on, create a Protection Bypass for Automation secret for the tests. Do not turn protection off.
3. Lighthouse on the deployed preview URL (not localhost), mobile and desktop, median of 3 runs each, for: /, /pain-and-spine/, /pain-and-spine/back-pain/, /neuro-rehabilitation/stroke/, /dr-dharshan-n-a/, /dr-selina-kh/, /video-consultation/, /contact/, /conditions/, /health-library/what-is-a-physiatrist/. Use the Lighthouse CLI with the default mobile profile. Save each run's JSON to reports/lighthouse/ and a table of medians to reports/lighthouse/summary.md. If a run's LCP looks inflated by simulation, confirm it with a direct measurement (WebPageTest or the Chrome performance panel on a throttled profile) and report both.
4. Site-wide QA (Playwright, all routes: the 46 pages, the 3 posts, a 404 URL and every redirects.json entry), all tests from design-development-plan.md section 9:
   - No horizontal overflow at 390, 768, 1024 and 1440
   - Zero nested interactives (`a a, a button, button a, button button`)
   - No section taller than 1.3 x the viewport at 390x844 (heroes excluded), and Home height at 390 between 9,000 and 10,500px
   - The reduced-motion snapshot shows every section's final state
   - Zero GA, Maps or YouTube requests before consent or a click (request log on every route)
   - Mega panel inside the viewport at 1024, 1280 and 1440, no overlapping links
   - Glow button label visible above its blur layer (pixel check) and at most one glow button in the viewport
   - Lighthouse Accessibility 100 and SEO 100 on /styleguide/, Home and one care page (SEO measured on a local production build with SITE_INDEXABLE=true, because the preview is noindex)
   Also on every route: status code (200, 404 or 410 as expected), one H1, one parsable JSON-LD @graph, a canonical, the breadcrumb below Home, the emergency line on every care page and post, the reviewer box on every medical page and post, no console errors, no hydration warnings, every `<img>` with alt.
5. Initial HTML check (scripts/check-initial-html.mjs, `npm run check:html`): for every route, `curl -s` the preview URL (with the bypass header if needed) and check that the raw HTML, before any JS runs, contains the full text of: every FAQ question and answer, every tab panel, every carousel and care track card, the body map region cards, the Conditions A to Z list, the doctor chip groups including the items behind "Show all", and the answer-first intro paragraph. The expected text comes from resources/content, not from the DOM. Any missing string fails with the route and the string. Also check the raw HTML has no "[CONFIRM" in a VERCEL_ENV=production build.
6. Run `npm run launch-check` and keep reports/launch-check.json. It must fail only with [CONFIRM] findings and omitted schema properties.
7. Write reports/client-inputs-needed.md (not served by the site) from reports/launch-check.json, public/images/_todo.md and site-config TODO_CONFIRM:
   a. Every [CONFIRM] item once, deduplicated, with the exact text of the marker, the pages it appears on as full preview links, and what it blocks (page text, schema, footer, form).
   b. Grouped by owner: Dr. Dharshan N A (registration number, fellowship year, sign-off dates, portrait approvals, decisions D1 to D3); Dr. Selina Kh (qualifications, registration, languages, days and hours, her own words, photo approvals); Clinic team (address and landmark, hours, video consult hours, email, phone and WhatsApp hours, confirmation time, access and parking, formats offered, therapy team); Legal and admin (legal entity, privacy contact, policy dates, legal review, domain and DNS access, Vercel, Resend, GA4 and Search Console owners); Owner to be decided (anything that fits none of these). Take the owner from client-answers.md where it says who answers; otherwise use "Owner to be decided".
   c. At the top: counts per owner and a short list of the launch blockers (the ★ items in client-answers.md that are still open). Plain English, no em or en dashes.
8. Screenshots for review, saved to reports/screenshots/phase-5/ as {route-slug}-{width}.png, full page, on the deployed preview: every route at 390 and 1440; plus close-ups at 390 of the dock, the mobile menu open, the body map with a card open, and the cookie banner. Write reports/screenshots/phase-5/INDEX.md listing every file with its route, width and preview link.

Acceptance:
- The 3 posts render at their routes, pass the copy coverage check, and their JSON-LD passes validator.schema.org with zero errors
- Preview deployed with functions in bom1 (show the Vercel function region in the report); `curl -sI` on the preview shows `x-robots-tag: noindex, nofollow` and no `x-powered-by`
- Lighthouse medians on the deployed preview, mobile: Performance at least 90, Accessibility 100, Best Practices 100 on all 10 URLs; LCP under 2.0s, CLS under 0.05, INP (or TBT as its lab proxy) under 200ms. SEO is about 69 on the preview because of noindex and must be 100 on the local SITE_INDEXABLE=true build
- Every Playwright test passes on every route at every width; zero third-party requests before consent or a click
- `npm run check:html` passes on every route
- launch-check findings are only [CONFIRM] and omitted schema properties; reports/client-inputs-needed.md accounts for every one of them (the counts match)

## Report
- What was built, by task number; deviations and why
- The preview URL and the bom1 region proof
- The Lighthouse median table (mobile and desktop) for the 10 URLs, plus any direct LCP measurements
- Tests run and results, per test and per route count; the check:html result
- The launch-check summary counts per rule
- reports/client-inputs-needed.md in full
- Screenshots: the list in reports/screenshots/phase-5/INDEX.md (all routes at 390 and 1440 plus the 4 close-ups)
- Remaining issues
STOP after this. Do not start Phase 6.
```
