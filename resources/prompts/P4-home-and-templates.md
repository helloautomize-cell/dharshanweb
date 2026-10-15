# P4 · Home page and templates

What it does: builds the real Home page (all 13 sections from design v3, including the two-doctor hero, the body map, the care track and the spine journey) and the full page templates for care hubs, care pages, both doctor profiles, posts, legal pages, contact, plan your visit, video consultation, Conditions A to Z, FAQs and the Guides list.
Check before approving: compare Home on your phone and laptop with rehabify-design-v3.html side by side, try the body map with a finger and with the Tab key, and check the report's mobile Home height (9,000 to 10,500px) and Lighthouse numbers.

```
# Phase 4: Home page (13 sections) and all page templates

Before starting, confirm these paths exist and list them:
- resources/docs/design-development-plan.md
- resources/docs/site-plan.md
- resources/docs/new-website-content.md
- resources/docs/IMAGE-PROMPTS.md
- resources/design/rehabify-design-v3.html
- resources/content/index.md and resources/content/pain-and-spine/back-pain.md (from Phase 3)
- lib/schema.ts, content/care-conditions.ts, lib/booking-context.ts, lib/service-badges.ts, lib/site-config.ts
- public/images/doctors/dr-dharshan-hero.jpg and public/images/alt-text.json
If any is missing, STOP and tell me. Do not substitute another file.

Branch: phase-4 (from main after Phase 3 was merged). Deploy a Vercel preview. Do not merge to main until I approve.

Read design-development-plan.md sections 0, 3, 4, 5, 6 and 9 again. Open resources/design/rehabify-design-v3.html in a real browser at 1440, 1024 and 390 and scroll it slowly top to bottom. Every Home section below has a matching section in that file (ids #top, #finder, #why, #where, #care, #journey, #ways, #doctor, #visit, #az, then the FAQ, notices and #book sections). Match its look, spacing and motion. Read its CSS and JS for the body map, goniometer, care track and spine path.

Non-negotiables (short form):
- Night-and-ice design: night stages alternate with paper sections. Fonts: Bricolage Grotesque (headings), Geist (body), Geist Mono (labels), Instrument Serif italic (one accent phrase per heading at most). Not Figtree, not white glass.
- Logo PNG only, recoloured per surface. Aqua and apricot are text colours only on night. No pure black. No red cross. One glow button per viewport.
- Body text at least 17px, tap targets 48px, contrast 4.5:1 (also over glass and photos), visible 2px aqua focus, content visible without JS.
- Copy only from resources/content (generated from new-website-content.md), word for word. Never invent copy, facts, numbers, fees, hours or doctor details. [CONFIRM] chips stay.
- No em or en dashes anywhere. `npm run launch-check` must show no new findings other than [CONFIRM].
- Compliance (IMC 2002 Regulations, Drugs and Magic Remedies Act 1954, DPDP Act 2023, Telemedicine Guidelines 2020): no testimonials, ratings, counters, AggregateRating or Review schema, before/after, offers or pop-ups; never "best", "No. 1", "leading", "world-class", "guaranteed", "cure", "permanent", "100%"; no fees unless site-config sets them; no drug or device brands; no hospital names as referral claims; emergency line on every care page and the footer; reviewer box and last-reviewed date on every medical page; maps and YouTube load only after a click, analytics only after consent.
- No Framer Motion, GSAP or Lenis. CSS (animation-timeline: view() / scroll() where supported) plus the one small IntersectionObserver and rAF helper. Embla only on mobile carousels where native scroll-snap is not enough.
- Stretched-link pattern for every card. Zero nested interactives.

Part A. Home (app/page.tsx), in this order, each section with `data-spine` for the spine navigator and `data-dark` on night stages:
1. Hero (night stage): aurora blobs (CSS, 18s drift, transform and opacity only), ice R logo watermark, pill, H1 "Rehab that moves *with you.*", sub, glow "Book a consultation" and ghost "Where does it hurt?" (to #where). Fact row as in design v3 (four items: MD Physical Medicine and Rehabilitation · Fellowship Interventional pain · Two rehabilitation doctors · Clinic + video). Floating chip "Video consults available".
   Two-doctor hero fan: the front arch is Dr. Dharshan N A (public/images/doctors/dr-dharshan-hero.jpg, next/image with `priority` and `fetchPriority="high"`, sizes set, no reveal animation: it is the LCP). Behind it to the right, a second smaller arch for Dr. Selina Kh: her hero image only if public/images/doctors/dr-selina-hero.jpg exists and site-config marks her written approval; otherwise the "Photo to be added" arch with the ice mark, exactly as design v3. Each arch has a vertical name pill. On hover or focus of the fan the back arch rotates a little further (transform only, 400ms). No automatic swap. Mobile: the back arch peeks from the right edge, the front portrait is about 300px tall, and the mobile short line from the content file sits under it.
   Goniometer widget: SVG arc, needle and degree counter animating 0 to 120 to 95 once when in view, labelled "KNEE FLEXION · EXAMPLE" as in the content file. Static at 95 under reduced motion.
2. Finder bar overlapping the hero edge, with the conditions marquee strip from the content file below it as in design v3 (#mqt; paused on hover, focus and touch; static and wrapped under reduced motion). Fields: reason select (booking reasons), clinic/video segmented control, when, "Request a time". Submits as a plain GET form to /contact/?reason=&format=&when=#book, so it works without JS.
3. Why Rehabify (bento): the 5 tiles from the content file. Cursor spotlight via a CSS variable set on pointermove (rAF throttled, off on touch and reduced motion). Goals ring fills once on view. The clinic or video switch is a working toggle mock (a real button with aria-pressed).
4. Where does it hurt? (night). The client likes this section most: polish it.
   - Front and back body figure SVG (toggle with two 48px buttons, aria-pressed). Hotspots for neck, shoulder, back, hip, knee, ankle, head and hand, each a real `<button>` with an aria-label, in a logical Tab order (head to feet), with a visible focus ring and a soft pulse (off under reduced motion).
   - Hover, tap or Enter shows the region card: region name, its conditions and links to the matching care pages, all from the content file and content/care-conditions.ts. The card is an aria-live="polite" region. Esc closes it.
   - Below 768px: region chips above the figure (a horizontal scroll row), the figure scales to fit 390px with no overflow, and the card opens below the figure.
   - All region card text is in the initial HTML (rendered hidden, not fetched), so curl and crawlers see it.
5. Care track: the 5 care groups as large night cards (badge from lib/service-badges.ts, title, conditions, arrow). Desktop 1024px and wider: pinned horizontal scroll (sticky container, translateX from scroll progress, CSS scroll timeline with the rAF fallback). Below 1024px: native swipe carousel, cards about 84% wide with the next one peeking, scroll-snap, a progress bar. Under reduced motion: a normal grid, nothing pinned.
6. Your journey (spine scrollytelling): the SVG spine path draws with scroll (stroke-dashoffset); 6 vertebrae light up as the 6 steps pass (Book, First consultation, Your goals, Your plan, Practice at home, Review and adjust, text from the content file). Step photos from the image map where they exist, otherwise the design v3 placeholders. Mobile: vertical steps with the rail on the left. Reduced motion: path fully drawn, all steps lit.
7. Ways to see us: 3 sticky stacking cards (In clinic, Video consult with the video-call UI mock, Home programme with the phone UI mock and exercise ticks). Mobile: the cards stack without sticky if that keeps the section under 1.3 viewports. Reduced motion: plain stacked cards.
8. Meet the doctor: the large Dr. Dharshan block (portrait with zoom on scroll from scale 1.08 to 1, credentials timeline, the three principles, languages chip from site-config, KMC [CONFIRM] caption, "Book with Dr. Dharshan" prefilled via booking-context, "Full profile"). Then a row of two doctor cards, Dr. Dharshan N A and Dr. Selina Kh, using the Our doctors card copy; Dr. Selina's card shows the "Photo to be added" arch until her approved photo exists, and her Book button prefills her.
9. Plan your visit (night strip): kicker, H3, address and hours from site-config ([CONFIRM] chips), chips, Get directions, and a click-to-load map (a static placeholder with a "Show map" button; no Google request until clicked).
10. Conditions A to Z: a live filter input (label, 48px, placeholder from the content file) plus letter chips. Results filter as you type with a short fade, grouped as in content/care-conditions.ts, each name a link. The full list is in the initial HTML and the filter only hides items, so it works without JS. The empty state text and WhatsApp link from the content file.
11. FAQs: the 4 Quick answers as a grid-rows accordion (grid-template-rows 0fr to 1fr) on native `<details>`, plus the WhatsApp help card. FAQPage schema from the same array.
12. Callouts: the emergency callout (alert) and the information notice, plus the tip line, from the content file.
13. CTA band and footer: the night stage with the glow button and the wordmark (Phase 2 footer).

Part B. Templates (read design-development-plan.md section 4 for each):
1. Care hub (5 pages): night hero with the badge at lg size, H1, answer-first intro, at-a-glance card, care cards (the badge card from plan section 5, with the blob pair per care group and all hover effects, playing once on first view on touch devices), the 4-step tracker, FAQs, emergency callout, reviewer box, CTA. Spine navigator on.
2. Care detail (19 pages): split hero (H1, intro, badge on a night arch), sticky "On this page" rail on desktop (1024px and wider, highlights the current section), the sections exactly as in the content file, urgent-help callout, FAQs, sources (small, Geist Mono numbers), reviewer box, related care cards, related posts slot (filled in Phase 5), and a sticky booking card on desktop (1280px and wider) prefilled from lib/booking-context.ts with the page's reason. On mobile the booking card is not sticky; the dock covers booking.
3. Doctor profile (one template, two pages: /dr-dharshan-n-a/ and /dr-selina-kh/): split hero portrait (Dr. Selina: "Photo to be added" arch until approved), key facts card, about, how the doctor works, credentials timeline, focus areas as non-clickable chip groups (desktop all; mobile 6 per group plus "Show all (n)" on a native button), languages, memberships and publications where the content has them, places the doctor consults [CONFIRM per decision D2], FAQs, Book CTA prefilled with that doctor. ProfilePage and Physician schema from lib/schema.ts.
4. Post (used in Phase 5): 68ch reading column, reviewer box at the top, table of contents, body, callouts, FAQs, sources, related care cards and posts. Build it now with a fixture post that is not routed in production.
5. Legal (7 pages): plain reading column, "Last updated" from site-config.legalLastUpdated, a left table of contents on desktop (on top, collapsed, on mobile), print styles (no nav, dock, footer stage or cookie banner when printed).
6. Contact (/contact/): the form layout with the `#book` anchor and contact cards. Fields as in the content file and master Part 9.1 (name, mobile, age, doctor with "No preference", reason, format, preferred date and time, city, under-18 guardian, unticked consent with the exact text from site-plan.md section 4, the line under the form). Prefill from the query string and booking-context. Phase 6 wires the Server Action and email; for now the form posts nowhere and shows the fields only. ContactPage schema.
7. Plan your visit, Video consultation, Conditions A to Z (full page version of the Home filter), FAQs (grouped as in the content file, one FAQPage), Guides list (intro, category chips as filters, card grid ready for the 3 Phase 5 posts with designed covers: gradient plus badge, never video thumbnails).
8. About, Our doctors, All care, Thank you: use the shared section components; no new one-off designs.

Mobile rules (below 768px):
- No section taller than 1.3 x the viewport height (844px at 390x844), except the hero.
- Home total height between 9,000 and 10,500px at 390px wide.
- A doctor is visible in the first screen at 390x844: the front arch of the hero fan is at least half inside the viewport before any scroll.
- Any section with more than 3 cards becomes a swipe carousel (about 84% wide cards, next card peeking, scroll-snap, progress bar when more than 5 items). Autoplay only where plan section 6 asks for it: 4.5s, pause/play button, stops on interaction, never under reduced motion.
- No full-screen decorative photos. Hero H1 at 390 is 48px (the clamp minimum) and wraps without orphans.

Performance budget (mobile, 4G, Moto G Power profile):
- LCP under 2.0s (the hero portrait), CLS under 0.05, INP under 200ms, Total Blocking Time under 200ms.
- JS for the Home route under 120 KB gzipped (report the number from the build output).
- Only the hero portrait is preloaded. Fonts self-hosted; only Geist and Bricolage preloaded. Below-the-fold images lazy. No content-visibility:auto above the fold.
- Every animation uses transform and opacity only. Observers stop work for sections off screen; the glow spin and blob drift pause off screen.

Reduced motion (prefers-reduced-motion: reduce, and the Phase 1 toggle):
- Every section renders its final, static state: goniometer at 95, rings filled, spine fully drawn and lit, care track and stacking cards as normal stacked layouts, no zoom, no marquee movement, no autoplay, no glow spin, no spotlight.

Tests (Playwright, on Home, all 5 hubs, back-pain, stroke, both doctor profiles, contact, conditions, faqs, privacy-policy and guides):
- No horizontal overflow at 390, 768, 1024 and 1440
- Zero nested interactives
- No section taller than 1.3 x viewport at 390x844 (hero excluded); Home document height at 390 between 9,000 and 10,500px
- Reduced-motion snapshot shows every section's final state (screenshot compare)
- Body map: Tab reaches every hotspot in order; Enter opens the card with the right conditions; Esc closes it; region chips work at 390
- A to Z: typing "knee" leaves only matching names; with JS off the full list shows
- Finder bar with JS off submits to /contact/ with the three parameters
- FAQs open without JS (`<details>`); FAQPage only on pages with visible FAQs
- Zero Google Maps or YouTube requests before the click
- Glow label pixel check; at most one glow button in the viewport at every scroll step of Home at 390 and 1440
- Hero portrait has fetchpriority="high" and is the LCP element (PerformanceObserver)

Acceptance:
- Lighthouse mobile on the preview for /, /pain-and-spine/, /pain-and-spine/back-pain/ and /dr-dharshan-n-a/, median of 3 runs: Performance at least 90, Accessibility 100, Best Practices 100 (SEO is lower on the preview only because of noindex; on a local production build with SITE_INDEXABLE=true it is 100)
- LCP under 2.0s, CLS under 0.05 on all four pages; Home JS under 120 KB gzipped
- All tests above pass
- `npm run launch-check` has no findings except [CONFIRM] and omitted schema properties
- No console errors and no hydration warnings

## Report
- What was built, by part and number; deviations from design v3 and why
- Screenshots: Home full page at 390 and 1440 next to rehabify-design-v3.html at the same widths; the hero fan at 390 and 1440 (with the hover state); the body map with a region card open (390 and 1440) and its region chips (390); the care track mid-scroll (1440) and as a carousel (390); the spine journey at 3 scroll points (1440); one hub, one detail page, both doctor profiles, contact and one legal page at 390 and 1440; the reduced-motion Home at 390
- Mobile Home height at 390 and the height of each section, flagging any over 1.3 viewports
- Lighthouse medians and the Home JS size
- Tests run and results
- Remaining issues and [CONFIRM] items visible on these templates
STOP after this. Do not start Phase 5.
```
