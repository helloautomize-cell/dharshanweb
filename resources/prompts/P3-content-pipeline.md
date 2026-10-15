# P3 · Content pipeline

What it does: turns the approved content file into one Markdown file per page, makes all 46 pages render in a basic layout, and adds the machinery behind them: the [CONFIRM] chips, the `npm run launch-check` gate, schema, sitemap, robots, redirects, llms.txt and page metadata. It does not polish the design; Phase 4 does that.
Check before approving: click through all 46 pages on the preview, open two care pages and check the text matches new-website-content.md word for word, and read the launch-check output in the report: it should fail, and only for the [CONFIRM] items we already know about. Make sure `resources/docs/redirects.json` is in the repo first; the agent stops if it is missing.

```
# Phase 3: Content pipeline, all 46 pages, [CONFIRM] system, launch-check, schema, sitemap, robots, redirects, llms.txt, metadata

Before starting, confirm these paths exist and list them:
- resources/docs/new-website-content.md
- resources/docs/site-plan.md
- resources/docs/client-answers.md
- resources/docs/design-development-plan.md
- resources/docs/current-website-audit.md
- resources/docs/redirects.json
- lib/site-config.ts, lib/nav.ts, lib/whatsapp.ts, lib/consent.ts, lib/indexing.ts (from Phases 1 and 2)
- lib/service-badges.ts and public/images/alt-text.json (from Phase 1)
If any is missing, STOP and tell me. Do not substitute another file.

Branch: phase-3 (from main after Phase 2 was merged). Deploy a Vercel preview. Do not merge to main until I approve.

Read new-website-content.md in full (it is long; read all of it) and site-plan.md sections 2, 4, 6, 7, 9 and 11. The 46 pages are the rows in site-plan.md section 2: pages 1 to 45 plus 4b (/dr-selina-kh/), which includes /thank-you/ and the 404. The 3 Guides posts are Phase 5; do not build them now.

Non-negotiables (short form):
- Night-and-ice design and the Phase 1 tokens. Fonts: Bricolage Grotesque, Geist, Geist Mono, Instrument Serif italic. Logo PNG only.
- Body text at least 17px, tap targets 48px, contrast 4.5:1, visible focus, reduced motion respected, content visible without JS.
- Copy only from new-website-content.md, transcribed word for word. Never rewrite, shorten, "improve" or invent copy, facts, numbers, fees or hours. If a page needs text the file does not have, leave the slot empty and list it in the report.
- No em or en dashes anywhere in rendered HTML, JSON-LD, llms files or metadata.
- Compliance (IMC 2002 Regulations, Drugs and Magic Remedies Act 1954, DPDP Act 2023, Telemedicine Guidelines 2020): factual information only; no testimonials, ratings, AggregateRating or Review schema, before/after; never "best", "No. 1", "leading", "world-class", "guaranteed", "cure", "permanent", "100%"; no fees unless site-config sets them; no drug or device brands; no hospital names as referral claims; emergency line on every care page and the footer; reviewer box and last-reviewed date on every medical page; no third-party requests before consent or a click.
- Keep everything from Phases 1 and 2 working.

Tasks:
1. Content generator (scripts/build-content.mjs, `npm run content`):
   a. Parse resources/docs/new-website-content.md and write one file per page to resources/content/, mirroring the URL: resources/content/index.md, resources/content/about.md, resources/content/pain-and-spine/index.md, resources/content/pain-and-spine/back-pain.md, and so on. Never edit new-website-content.md.
   b. Frontmatter comes from each page's yaml block, plus fields read from the page text where the yaml lacks them (h1, kicker lines). Add `type` (home, core, hub, detail, doctor, legal, utility), `route`, `hub` for detail pages and `faqs` as an array of { q, a } parsed from the FAQs section.
   c. The body keeps the content file's section headings as H2 and the text word for word, including every [CONFIRM: ...] marker exactly as written.
   d. Copy coverage check: after generating, compare the normalised text of each page in the source with the generated file (whitespace and markdown syntax ignored). Any missing or changed sentence fails the script with the page and the sentence.
   e. The script is idempotent: running it twice changes nothing.
2. Zod schemas (lib/content/schema.ts), one per type. Required on every page: title (max 60 characters), description (max 160 characters), route (lowercase, trailing slash), h1. Required on medical pages (home, hubs, detail pages, doctor profiles, /video-consultation/, /faqs/): reviewer (a doctor id from site-config) and lastReviewed (a date or a [CONFIRM] string). Detail pages also require hub, badge, related (2 routes that exist) and faqs (5 to 8). Legal pages require lastUpdated. `next build` fails on any invalid file and names the file and field.
3. lib/content/index.ts: load, validate and cache all pages at build; export getPage(route), getAllPages(), getPagesByHub(hub). All 46 routes are statically generated (`generateStaticParams`, `dynamicParams = false` for the catch-all care routes).
4. [CONFIRM] chip system (components/Confirm.tsx and a remark plugin):
   a. Any `[CONFIRM: text]` in content, frontmatter or site-config renders as a yellow chip with the text inside, in development and on preview deploys (VERCEL_ENV = preview).
   b. In a production build with VERCEL_ENV = production the chip renders nothing, and the marker never reaches HTML, JSON-LD, metadata or llms files.
   c. lib/site-config.ts: every unknown value stays the literal "[CONFIRM: ...]" string; TODO_CONFIRM is generated from it, not typed by hand. Add legalLastUpdated, the doctors (dr-dharshan-n-a and dr-selina-kh with name, title line, qualifications, registration, languages, profile route) and every fact from client-answers.md that pages need. Dr. Dharshan's languages are answered (client-answers.md item 16); Dr. Selina's are [CONFIRM].
5. `npm run launch-check` (scripts/launch-check.mjs). It runs a production build with VERCEL_ENV=production and SITE_INDEXABLE=true, starts it locally, fetches every route in the sitemap plus a 404 URL, /robots.txt, /llms.txt and /llms-full.txt, and fails (exit code 1) with a list of route, rule and the offending text for:
   a. Any "[CONFIRM" in rendered HTML, JSON-LD, metadata, llms files or in site-config TODO_CONFIRM
   b. Any em dash (U+2014), en dash (U+2013), figure dash (U+2012) or horizontal bar (U+2015) in rendered text, attributes, JSON-LD or metadata
   c. Blacklist words and phrases in visible text and metadata, case insensitive, whole words: delve, navigate, embark, realm, tapestry, testament, seamless, comprehensive, holistic, robust, leverage, empower, elevate, unlock, tailored, cutting-edge, state-of-the-art, world-class, top-notch, game-changer, peace of mind, rest assured, one-stop solution, "it's important to note", "in today's fast-paced world", "look no further", sentences starting with Furthermore, Moreover or Additionally, best, No. 1, leading, guaranteed, cure, permanent, 100%, miracle, painless, regenerate cartilage, plus exclamation marks and emoji in visible text. An allowlist file (scripts/launch-check-allow.json) may exempt one exact phrase on one route, each with a reason; it starts empty.
   d. Any `<img>` without an alt attribute, and any image with alt="" that is not inside an aria-hidden or decorative wrapper
   e. Any medical page without a visible reviewer box or with a missing or [CONFIRM] lastReviewed
   f. Titles over 60 characters, descriptions over 160, duplicate titles or descriptions, a missing canonical
   g. Any AggregateRating or Review type in JSON-LD
   It also writes reports/launch-check.json (every finding with route, rule, text and the source file and line). Add unit tests with one fixture per rule proving each rule catches its case and passes a clean page.
6. content/care-conditions.ts: the A to Z data from new-website-content.md Page 6, every name word for word, grouped as written, each with a route. Link to the detail page whose content covers the condition; if no detail page covers it, link to its group hub. List every hub fallback in the report so I can check it.
7. lib/booking-context.ts: route to { reason, doctor, format } prefill. Reasons are exactly the booking reason list in site-plan.md section 6. /dr-selina-kh/ prefills Dr. Selina Kh, /dr-dharshan-n-a/ prefills Dr. Dharshan N A, every other page "No preference". /video-consultation/ prefills format = video. The Book buttons in the nav, dock, CTA band and pages use it.
8. lib/whatsapp.ts (from Phase 2): use the page H1 from content. lib/nav.ts (from Phase 2): check every link resolves to one of the 46 routes; the build fails on a dead link.
9. lib/schema.ts, a single @graph builder. Every page outputs exactly one `<script type="application/ld+json">` with one @graph. Stable absolute @ids on https://www.rehabify.in: `/#website`, `/#clinic`, `/#dr-dharshan-n-a`, `/#dr-selina-kh`, plus `{page url}#webpage` and `{page url}#breadcrumb`.
   - All pages: WebSite (#website, name Rehabify, inLanguage en-IN), MedicalClinic (#clinic, fields from site-plan.md section 7 and site-config), Physician #dr-dharshan-n-a and #dr-selina-kh (fields from site-plan.md section 7; affiliation not listed, decision D2), BreadcrumbList (move the Phase 2 builder in here).
   - Home: MedicalWebPage, plus FAQPage. Care hubs and detail pages: MedicalWebPage with about (MedicalCondition from frontmatter `about`, with alternateName, or MedicalTherapy / MedicalProcedure), reviewedBy and lastReviewed, plus FAQPage. Doctor profiles: ProfilePage with mainEntity the matching Physician. /video-consultation/: MedicalWebPage plus Service with availableChannel ServiceChannel (online). /contact/: ContactPage. Phase 5 adds BlogPosting.
   - FAQPage only where the same FAQs are visible on that page: the page component and the schema read the same `faqs` array, so they cannot drift.
   - A property whose value is still a [CONFIRM] string is omitted from JSON-LD (never output as text) and logged in reports/launch-check.json as "schema property omitted".
   - Never AggregateRating, Review or rating properties.
10. app/sitemap.ts: every indexable route (not /thank-you/, /styleguide/ or the 404), absolute URLs with trailing slashes, lastModified from lastReviewed or lastUpdated when it is a real date, otherwise the last git commit date of the content file.
11. app/robots.ts governed by SITE_INDEXABLE (lib/indexing.ts): false keeps `Disallow: /` for everyone; true allows all, explicitly lists Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended and Applebot-Extended as allowed, disallows /styleguide/ and /thank-you/, and adds `Sitemap: https://www.rehabify.in/sitemap.xml`.
12. Redirects from resources/docs/redirects.json (it should match current-website-audit.md section 5 and site-plan.md section 9; report any difference instead of guessing):
   a. 301 entries go in next.config `redirects()` with `permanent: true` replaced by `statusCode: 301`. /home/book-an-appointment-now goes to /contact/ (servers ignore #book).
   b. 410 entries (/ai-tools and anything under it, decision D1) are answered by middleware (proxy.ts on Next 16) with status 410 and the branded 404 content.
   c. No chains: every old URL reaches its final page in one hop. The only accepted extra hop is Next's own trailing-slash redirect for an already-correct path (for example /dr-dharshan-n-a to /dr-dharshan-n-a/).
13. llms.txt and llms-full.txt generated at build (scripts/build-llms.mjs, run in prebuild, written to public/): llms.txt = the entity statement from site-plan.md section 1 word for word, then the page list grouped as in site-plan.md section 2 with each page's description. llms-full.txt = the plain text of every indexable page in nav order, with its URL as a heading. [CONFIRM] markers are removed from both in production builds; launch-check still fails while any remain in the source.
14. Metadata per page through `generateMetadata`: title and description from frontmatter (the root layout must not append a suffix that pushes a title past 60 characters), absolute self-canonical with trailing slash on https://www.rehabify.in, `<html lang="en-IN">`, og:locale en_IN, og:type website (profile for doctors), Twitter card summary_large_image. OG image via `opengraph-image.tsx` for the root and each route group: 1200x630, night background, ice logo, the page H1 in Bricolage Grotesque 700 with the serif accent in Instrument Serif italic, fonts read from local files.
15. Templates in basic form, so every page renders its full content in the right order with the shell: home, core, care hub, care detail (sections exactly as in the content file, the urgent-help callout, FAQs as `<details>`, sources, reviewer box, related cards), doctor profile, legal (with "Last updated"), utility (/thank-you/ noindex, 404). Use Phase 1 components where they exist; no new visual design in this phase. Phase 4 builds the full templates. The reviewer box and emergency callout use the global copy blocks in site-plan.md section 4 word for word. /guides/ shows its intro and category chips only (posts come in Phase 5).
16. Playwright: a route test that loads all 46 routes and checks status 200 (404 for the 404 URL, 410 for /ai-tools), one H1, the breadcrumb on every page below Home, one JSON-LD block that parses, no horizontal overflow at 390 and 1440, and zero nested interactives.

Acceptance:
- `npm run content` twice in a row produces no git diff; the copy coverage check passes for all 46 pages
- `next build` passes with Zod validation on; temporarily breaking one field (title over 60 characters) fails the build with the file and field named
- All 46 routes return 200 on the preview; `curl -sI` on every redirects.json entry shows exactly one 301 (or 410) to the final URL, and the final URL returns 200
- `npm run launch-check` runs to the end and fails only with [CONFIRM] findings and "schema property omitted" lines; zero dash, blacklist, alt, title or rating findings. The fixture unit tests all pass
- JSON-LD on /, /pain-and-spine/back-pain/, /dr-dharshan-n-a/, /dr-selina-kh/, /video-consultation/ and /contact/ passes the Schema.org validator (validator.schema.org) with zero errors; FAQPage appears only on pages with visible FAQs
- With SITE_INDEXABLE=false (preview): robots.txt is `Disallow: /`, every page has noindex. With SITE_INDEXABLE=true (local build): robots.txt lists the 10 crawlers and the sitemap line; no page except /thank-you/ and /styleguide/ is noindex
- /sitemap.xml lists every indexable route once, with lastModified; /llms.txt starts with the entity statement word for word
- Every page has a canonical, a title of 60 characters or fewer, a description of 160 or fewer, and an OG image that renders (open 3 of them)
- Lighthouse (mobile, local production build with SITE_INDEXABLE=true) on /, one hub and one detail page: Accessibility 100, SEO 100, Best Practices 100
- No console errors and no hydration warnings on any route

## Report
- What was built, by task number; any deviations and why
- The resources/content/ tree and the count of files (46)
- Screenshots: no full screenshots needed, I will review live. Send one of a [CONFIRM] chip on the preview and of the same spot on a local production build
- The launch-check summary: count per rule, then the full [CONFIRM] list grouped by page
- Schema validator results for the 6 pages above; the list of omitted schema properties
- The curl output for every redirect
- Hub fallbacks in content/care-conditions.ts, and any page slot with no copy in the content file
- Tests run and results; Lighthouse scores
- Remaining issues
STOP after this. Do not start Phase 4.
```
