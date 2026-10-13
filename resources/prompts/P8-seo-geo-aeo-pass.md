# P8 · SEO, GEO and AEO pass

What it does: the final pre-launch SEO, schema, GEO and AEO pass plus the AI-fingerprint clean-up. It builds the launch switches (AI bot allowlist, IndexNow) but leaves them off until Phase 9.
Check before approving: put resources/docs/entity-facts.md in the repo before pasting; then open the CSV of titles and descriptions, read qa/tone-cleanup.md and decide the "needs approval" list.

```
# Phase 8: SEO, schema, GEO and AEO pass, AI-fingerprint clean-up

Before starting, confirm these paths exist and list them:
- resources/docs/site-plan.md
- resources/docs/new-website-content.md
- resources/docs/client-answers.md
- resources/docs/entity-facts.md
- resources/docs/redirects.json
- resources/docs/design-development-plan.md
- lib/site-config.ts
- lib/schema.ts
- app/sitemap.ts
- app/robots.ts
If any is missing, STOP and tell me. Do not substitute another file.

Branch: phase-8. Deploy a Vercel preview. Do not merge to main until I approve.

Rehabify is ONE clinic in Bengaluru plus video consults across India. There is no catchment page and there must be no per-area or per-town pages (no "physiotherapy in Koramangala" style doorway pages). Do not create any page that is not in site-plan.md section 2.

NAP rule: resources/docs/entity-facts.md is the single wording for name, address, phone, email, hours and credentials. Use it verbatim in lib/site-config.ts, the footer, the contact page, schema and llms.txt. If entity-facts.md and site-config differ, entity-facts wins; if entity-facts.md itself contains [CONFIRM], the value stays [CONFIRM] everywhere.

Non-negotiables (short form):
- Night-and-ice design. Fonts: Bricolage Grotesque, Geist, Geist Mono and Instrument Serif italic via next/font, self-hosted.
- Logo PNG only. The shape never changes.
- Aqua and apricot are text colours only on night. No pure black. No red cross. One glow button per viewport.
- Body text at least 17px, tap targets 48px, contrast 4.5:1, visible focus, prefers-reduced-motion respected, content visible without JS.
- No em or en dashes anywhere in output. Copy only from new-website-content.md. Never invent facts; [CONFIRM] stays.
- Compliance (IMC 2002, Drugs and Magic Remedies Act 1954, DPDP 2023 and Rules 2025, Telemedicine Guidelines 2020): no testimonials, ratings, AggregateRating or Review schema, before/after, "best", "No. 1", "leading", "guaranteed", "cure", "permanent", "100%", drug or device brands, named referral hospitals, fees unless site-config sets them. Emergency line on every care page and the footer. Unticked consent. No third-party request before consent or a click.
- SITE_INDEXABLE stays false in this phase. Nothing gets indexed yet.

Tasks:

1. Technical SEO
   a. Unique title (60 characters max) and description (155 max) on every indexable route, taken from the frontmatter in new-website-content.md. Write scripts/export-seo.mjs to produce qa/seo-titles-descriptions.csv with columns: url, title, title_length, description, description_length, h1, canonical, robots, schema_types, word_count. The script fails on any duplicate title or description, any title over 60 or description over 155, or any missing H1.
   b. Self-canonical on every page as https://www.rehabify.in/... with a trailing slash. Canonicals, sitemap URLs, internal links and redirect targets all use the same form. No redirect chains.
   c. html lang="en-IN"; og:locale en_IN; og:site_name Rehabify.
   d. OG image per page via opengraph-image (night-and-ice, logo mark, the page H1, 1200x630). No doctor photo in OG images until written approval of that photo is recorded.
   e. Every image has alt text from public/images/alt-text.json; decorative images have alt="". AVIF and WebP served.
   f. Security headers from Phase 6 still present; poweredByHeader false; no production source maps (check that no .map file is served).
   g. Every row of resources/docs/redirects.json is implemented: 301 straight to the final URL with a trailing slash, and 410 for /ai-tools and /ai-tools/*. The branded 404 returns status 404.
   h. sitemap.xml lists every indexable route with lastModified from content frontmatter (lastReviewed or updated), never the build time. /thank-you/, /styleguide and 404 are excluded.
   i. The SITE_INDEXABLE switch: while false, every host sends X-Robots-Tag: noindex, meta robots noindex, and robots.txt "Disallow: /". When true, only the host www.rehabify.in is indexable; every other host (vercel.app, previews) keeps noindex.

2. Schema (lib/schema.ts, one @graph per page, stable @ids)
   a. #website: WebSite, inLanguage en-IN, publisher #clinic.
   b. #clinic: MedicalClinic per site-plan.md section 7. Address, geo, telephone, email, openingHoursSpecification and foundingDate come from entity-facts.md; while any is [CONFIRM], OMIT that property (never output "[CONFIRM" in JSON-LD). medicalSpecialty as text "PhysicalMedicineAndRehabilitation". areaServed: Bengaluru (City) for clinic visits and India (Country) for video consults. ContactPoint with the phone and its answering hours when known. founder #dr-dharshan-n-a. sameAs only for profiles listed in entity-facts.md. No department (there is no lab or pharmacy). No GeoCircle radius.
   c. #dr-dharshan-n-a and #dr-selina-kh: Physician per site-plan.md section 7. Dr. Selina's credentials, registration and languages are omitted until confirmed. No affiliation with hospitals (decision D2) unless client-answers.md records otherwise.
   d. Organization data sits on #clinic (no separate brand entity).
   e. Care pages: MedicalWebPage with about (MedicalCondition, MedicalTherapy or MedicalProcedure as in site-plan.md), reviewedBy #dr-dharshan-n-a, lastReviewed. MedicalCondition gets alternateName only when new-website-content.md gives a common name.
   f. Posts: BlogPosting with author, reviewedBy, datePublished, dateModified. Doctor pages: ProfilePage. Contact: ContactPage. Video consultation: Service with availableChannel online.
   g. FAQPage only on pages where the FAQs are visible. BreadcrumbList on every page below Home. VideoObject only for real videos.
   h. Never AggregateRating or Review.
   i. Test (tests/schema.spec.ts): parse every page's JSON-LD; it is valid JSON; every @id reference resolves inside the graph or to #clinic, #website or a doctor; no "[CONFIRM", no AggregateRating, no Review; FAQPage questions match the visible FAQ text exactly. Also run 5 pages (Home, a hub, a detail, Dr. Dharshan, a post) through the Schema.org validator and Google's Rich Results Test and report the results.

3. Local SEO (single location)
   a. One genuine Google Business Profile for Rehabify. No town or area landing pages; the footer, contact page and Plan your visit say "Bengaluru" and "video consults across India" in the wording from new-website-content.md only.
   b. Write qa/gbp-launch.md for me (not on the site): the name exactly "Rehabify" (no keywords), primary category suggestion "Physical medicine and rehabilitation physician" or the closest Google offers, description = the entity statement from site-plan.md section 1 (750 characters max, trimmed only at a sentence end, and tell me if it needs trimming), hours exactly as entity-facts.md, website link https://www.rehabify.in/?utm_source=google&utm_medium=organic&utm_campaign=gbp, appointment link https://www.rehabify.in/contact/?utm_source=google&utm_medium=organic&utm_campaign=gbp_booking#book, and the same NAP lines for Practo and Justdial.

4. GEO and AEO
   a. /llms.txt (entity statement verbatim, then the page list with one-line descriptions) and /llms-full.txt (all page text as plain Markdown), generated from content at build time. Both carry no [CONFIRM] text and no dashes.
   b. robots.ts at launch (SITE_INDEXABLE true) allows: Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, plus User-agent: * Allow: /, Disallow: /thank-you/ and /styleguide, and the Sitemap line. While false: Disallow: / for all. Add a unit test for both states.
   c. Answer-first intros: on every care page, the first paragraph is real HTML text within the first 600px of the article, and it names Rehabify, Bengaluru and the doctor once (as already written in the content).
   d. Initial HTML: verify with curl (no JS) that every FAQ answer, tab panel, care track card, body map region card, Conditions A to Z entry and carousel item is present in the server HTML. Write scripts/check-initial-html.mjs and add it to CI.
   e. IndexNow: generate a key, serve it at /[key].txt, and write scripts/indexnow.mjs that posts changed URLs (from the sitemap, comparing lastModified to the last run) to https://api.indexnow.org/indexnow. It must refuse to run unless SITE_INDEXABLE is true and the host is www.rehabify.in. Do not ping anything in this phase.
   f. The body map, finder bar and Conditions A to Z already serve "find care by concern". Do not add an A/A+ text-size switch; it is not in the design plan.

5. AI-fingerprint clean-up
   a. Build check (scripts/check-dashes.mjs, runs in CI and in launch-check): zero U+2013 and U+2014 in rendered HTML, JSON-LD, llms.txt, llms-full.txt, sitemap, OG image text and email templates.
   b. Tone sweep: scan all rendered text for the blacklist (delve, navigate as a metaphor, embark, realm, tapestry, testament, seamless, comprehensive, holistic, robust, leverage, empower, elevate, unlock, tailored, cutting-edge, state-of-the-art, world-class, top-notch, game-changer, peace of mind, rest assured, one-stop, "it's important to note", "in today's fast-paced world", "whether you're", "not just", "look no further", sentences starting Furthermore, Moreover or Additionally, rhetorical-question headings, exclamation marks, emojis, Title Case headings). Log every hit in qa/tone-cleanup.md as: page, original sentence, proposed sentence, status. Apply a change only when it is a like-for-like plain word swap with no change of meaning or claim (status "applied"). Anything else stays unchanged with status "needs approval". FAQ questions phrased as patient questions are allowed and are not rhetorical headings.
   c. Remove comments that mention AI tools, prompts or agents; remove console.log; strip data-testid from production builds (compiler.reactRemoveProperties); no lorem, TODO or visible [CONFIRM] in production output.
   d. Neutral README.md and package.json (name "rehabify-website", no tool credits). Agent and editor files (.windsurf, .cursor, prompts, resources/) are never served: confirm nothing outside public/ is reachable and that public/ holds no .md, .env or source files.
   e. Image metadata: run exiftool on public/images; no EXIF GPS, camera or software fields remain (C2PA content credentials stay untouched). No "Made with" badges anywhere.
   f. Commits stay under the agency identity. Do not rewrite history.

6. Performance
   a. Lighthouse on the preview, mobile, median of 3 runs each, on: /, /pain-and-spine/, /pain-and-spine/back-pain/, /dr-dharshan-n-a/, /contact/, /health-library/what-is-a-physiatrist/.
   b. Targets now: Performance at least 90, Accessibility 100, Best Practices 100. SEO will read about 60 to 70 while noindex is on; that is expected. Targets after launch: SEO 100 on all six.
   c. CLS under 0.05 (target 0). LCP under 2.0 s on mobile 4G. Only the hero portrait is preloaded; fonts self-hosted; map and video load on click.
   d. JS budget: Home first-load JS under 120 KB gzipped (design plan section 0). Report every route's first-load JS and flag any over 150 KB with the cause.
   e. If Lighthouse's simulated LCP looks inflated, confirm with a direct measurement (WebPageTest or a Chrome performance trace) and report both.

7. launch-check
   Extend npm run launch-check to run: the [CONFIRM] count, check-dashes, export-seo (fail mode), check-initial-html, the schema test, redirect tests and the image metadata check. It prints a table of what blocks launch.

Acceptance:
- qa/seo-titles-descriptions.csv exists with zero duplicates and zero over-length rows.
- curl -sI for each redirects.json source on the preview returns 301 to the final URL in one hop; /ai-tools/ returns 410; a random URL returns 404.
- All JSON-LD tests pass; validator and Rich Results results reported with no errors.
- check-dashes and check-initial-html pass; robots unit tests pass for both states.
- Lighthouse medians meet the targets in task 6b; Home JS under 120 KB gzipped.
- npm run launch-check output: everything passes except the [CONFIRM] count (list those).

## Report
- What was done, by task number; deviations and why
- qa/seo-titles-descriptions.csv attached, qa/gbp-launch.md and qa/tone-cleanup.md contents (with the "needs approval" list first)
- Schema validator and Rich Results Test results for the 5 pages
- Lighthouse medians table and the JS size per route
- launch-check output
- No screenshots needed, I will review live
- Remaining issues
STOP after this. Do not start Phase 9.
```
