# P2 · Site shell

What it does: builds the frame every page sits in: the floating pill nav with the Care mega panel, the spine navigator, the mobile dock and menu, the night footer, the cookie banner, breadcrumbs, the branded 404, the skip link and the noindex switch that keeps the preview out of Google.
Check before approving: open the preview on a phone and a laptop, open the Care menu, tap WhatsApp on two different pages (the message must name each page), and check the report shows `X-Robots-Tag: noindex` and `Disallow: /` on the preview URL.

```
# Phase 2: Site shell (nav, mega panel, spine navigator, dock, mobile menu, footer, cookie banner, breadcrumbs, 404, noindex switch)

Before starting, confirm these paths exist and list them:
- resources/docs/design-development-plan.md
- resources/docs/site-plan.md
- resources/docs/new-website-content.md
- resources/docs/client-answers.md
- resources/design/rehabify-design-v3.html
- lib/site-config.ts (from Phase 1, with TODO_CONFIRM)
- app/styleguide/page.tsx (from Phase 1)
- public/images/brand/ (ice, blue and white logo files from Phase 1)
If any is missing, STOP and tell me. Do not substitute another file.

Branch: phase-2 (from main after Phase 1 was merged). Deploy a Vercel preview. Do not merge to main until I approve.

Read resources/docs/design-development-plan.md sections 0, 2, 6 and 9 again, and site-plan.md sections 3 and 4. Open resources/design/rehabify-design-v3.html in a real browser at 1440 and 390 and study the nav (#nav, #links, #ind), the spine navigator (#spnav), the dock and the footer. That file is the visual target for every part of this phase.
Where site-plan.md and the plan disagree on a breakpoint, the plan wins: dock below 768px, spine navigator at 1100px and wider.

Non-negotiables (short form):
- Night-and-ice design. Fonts: Bricolage Grotesque, Geist, Geist Mono, Instrument Serif italic via next/font, self-hosted. Not Figtree, not white glass.
- Logo PNG only, shape never changes, recolour per surface (ice on night, blue on white, white on photos).
- Aqua and apricot are text colours only on night. No pure black. No red cross. One glow button per viewport.
- Body text at least 17px, tap targets 48px, contrast 4.5:1 (also over glass), visible 2px aqua focus, prefers-reduced-motion respected, everything usable without JS.
- No em or en dashes in UI strings. Copy only from new-website-content.md and site-plan.md section 4. Never invent copy, facts, numbers, fees or hours. Unknown values render the [CONFIRM: ...] chip from lib/site-config.ts.
- Compliance (IMC 2002 Regulations, DPDP Act 2023, Telemedicine Guidelines 2020): factual information only; no testimonials, ratings widgets, AggregateRating or Review schema, before/after; never "best", "No. 1", "leading", "world-class", "guaranteed", "cure", "permanent", "100%"; no fees unless site-config sets them; no drug or device brands; no hospital names as referral claims; the emergency line "Medical emergency? Call 108 or 112." on every care page and in the footer; no third-party request (analytics, maps, YouTube, fonts from a CDN) before consent or a click.
- No Framer Motion, GSAP or Lenis. CSS plus the one small observer helper from Phase 1.

Tasks:
1. Layout and skip link. app/layout.tsx: `<html lang="en-IN">`, a "Skip to content" link as the first focusable element (visible on focus, 48px tall, aqua outline) that moves focus to `<main id="main" tabindex="-1">`. `main` gets bottom padding equal to the dock height plus the safe area below 768px.
2. SITE_INDEXABLE switch (lib/indexing.ts, read from the env var SITE_INDEXABLE, default false; only the exact string "true" turns it on):
   a. false: every response carries `X-Robots-Tag: noindex, nofollow` (set in next.config headers for all paths, all hosts), every page has `<meta name="robots" content="noindex, nofollow">` through the root metadata, and app/robots.ts returns `User-agent: *` and `Disallow: /`.
   b. true: no noindex header or meta (except /thank-you/ and /styleguide/, which stay noindex always), and robots.ts allows all crawlers. Phase 3 adds the AI crawler list and the sitemap line.
   c. Set SITE_INDEXABLE=false on every Vercel environment now. The vercel.app URL must never be indexable.
3. lib/nav.ts: one source for the desktop nav, mega panel, mobile menu and footer columns, typed, exactly as site-plan.md section 3: Logo · Care (mega panel) · Where it hurts (Home `#where`, elsewhere `/conditions/`) · Video consults · Doctors · Visit · Book a consultation (glow). Mega panel groups and link labels word for word from site-plan.md section 3, each with its URL from section 2.
4. Floating pill nav (Radix NavigationMenu):
   a. Fixed, centred, 66px tall, white glass (backdrop blur 20px, saturate 160%). It shrinks to 56px after 80px of scroll (one passive scroll listener with rAF, or a sentinel observer).
   b. Sliding hover indicator moves between links with `--ease`, 240ms. It follows keyboard focus too.
   c. Dark glass variant whenever the nav overlaps a `[data-dark]` section (one IntersectionObserver with a rootMargin that matches the nav band). Contrast at least 4.5:1 in both variants.
   d. Glow "Book a consultation" button from Phase 1 at the right end. No `isolation:isolate` and no transform on `.glow`.
   e. Below 1024px the links collapse to the logo, the Book button and a 48px menu button.
5. Care mega panel:
   a. Explicit CSS grid, never auto width: `grid-template-columns: repeat(4, minmax(176px, auto)) 248px`, total width about 1000px at 1280 and wider; at 1024 to 1279 use `repeat(4, minmax(150px, auto)) 220px`. Set the Radix viewport width from the panel's measured content (the known Radix viewport width bug), not from a fixed container.
   b. Four columns: Pain and spine, Brain and nerves, Joints and sport, Children and older adults (site-plan.md section 3). Column headings are Geist Mono 12px uppercase eyebrows, each linking to its hub. Links are text, 17px, 44px row height minimum.
   c. Column 5: the night preview card "Video consults · See the doctor from home" linking to /video-consultation/ (the video image from Phase 1, or the ice mark if missing). Stretched-link pattern, no nested interactives.
   d. Panel footer row: hours (from site-config, [CONFIRM] chip while unknown), phone +91 79048 42576 as `tel:+917904842576`, and "Medical emergency? Call 108 or 112."
   e. Hover intent 120ms open and close. Keyboard: Enter or Space opens, arrows move, Esc closes and returns focus to the trigger. The panel never leaves the viewport at 1024, 1280 and 1440.
6. Spine navigator (components/SpineNav.tsx): desktop only at 1100px and wider, Home and the 5 hub pages only. A fixed left rail of vertebra pills C1 to S1, one per section that has `data-spine="Label"`. Done = blue, current = aqua with halo, upcoming = ice at low opacity. The label shows on hover or keyboard focus only, never permanently, and never overlaps the hero H1. Each pill is a link to its section anchor with an aria-label. Hidden from print and under 1100px.
7. Mobile dock (below 768px, every page except /thank-you/):
   a. Fixed bottom glass dock with three 48px+ targets: Call, WhatsApp, Book (centre, glow). Safe-area padding (`env(safe-area-inset-bottom)`). Pressed state scale .97 and opacity .85.
   b. Call opens a small Radix Dialog sheet with "Call +91 79048 42576" (`tel:+917904842576`) and the emergency line.
   c. WhatsApp uses lib/whatsapp.ts: `buildWhatsAppUrl(pageTitle)` returns `https://wa.me/917904842576?text=` plus the encoded message from site-plan.md section 3, word for word: "Hello Rehabify, I would like to book a consultation about [page title]. My name is ". [page title] is the page H1 as plain text without the serif markup (for example "Low back pain"). On Home, and on pages with no H1 such as the 404, drop the " about [page title]" part: "Hello Rehabify, I would like to book a consultation. My name is ". Opens in a new tab with rel="noopener".
   d. Book links to `/contact/?reason=...#book` with the reason from the page (Phase 3 adds lib/booking-context.ts; for now pass the page path).
   e. Hidden while the on-screen keyboard is open (visualViewport height drops by more than 150px, or a text input, select or textarea has focus).
8. Mobile menu: Radix Dialog sheet from the top, night background, focus trapped, Esc and a 48px close button close it. Large Bricolage links in the order of site-plan.md section 3 (care groups as an accordion, all collapsed, then Conditions A to Z, Video consultation, Our doctors, About, Plan your visit, Health Library, FAQs, Contact). Fixed footer: Book · Call · today's hours line from site-config ([CONFIRM] chip while unknown). Body scroll locked while open.
9. Night footer (a rounded night stage inset by the 12px gutter):
   a. The global CTA band from site-plan.md section 4, word for word, with the glow button (this is the only glow in that viewport, so the nav glow must not be in view at the same time; if it is, the CTA band uses the primary button).
   b. Four columns from site-plan.md section 3: brand block (ice logo, the entity line, phone and WhatsApp, obfuscated email from site-config, address [CONFIRM], Get directions), Care, Patients, Legal (7 pages) plus a "Cookie settings" button that reopens the banner. Social links only when site-config has them.
   c. The emergency line "Medical emergency? Call 108 or 112." in its own row, above the bottom line.
   d. The bottom line from site-plan.md section 3 word for word, with the [CONFIRM] parts from site-config and the year computed at build.
   e. The giant faded "Rehabify" wordmark in Bricolage 800 across the bottom, clipped by the stage, `aria-hidden="true"`, not selectable, no layout shift.
   f. Below 768px the link columns become `<details>` accordions; the brand block stays open.
10. Cookie banner and lib/consent.ts:
   a. A consent store with `subscribe`, `getSnapshot` and `getServerSnapshot` for `useSyncExternalStore`. `getSnapshot` returns a cached object that only changes when the stored value changes (never a new object per call, or the banner loops). Stored in a first-party cookie `rh_consent` for 180 days, read with try/catch.
   b. Bottom-left glass card, above the dock on mobile, with Accept, Reject and Settings at equal weight (same size, same style, none highlighted). Settings opens a dialog with Essential (always on, disabled toggle) and Analytics (off by default).
   c. Nothing third-party loads in this phase. Export `hasAnalyticsConsent()` for Phase 6.
   d. The banner does not render during SSR in a way that shifts layout (fixed position, no CLS) and does not appear on /styleguide/.
11. Breadcrumbs: components/Breadcrumbs.tsx on every page below Home, Geist Mono 12px uppercase, built from the route and the page H1 (plain text). It outputs a BreadcrumbList JSON-LD block with absolute URLs on https://www.rehabify.in and trailing slashes. Phase 3 moves this into the single @graph builder; keep the function pure so it can be reused.
12. Branded 404 (app/not-found.tsx): night hero, H1 "We could not find that *page*", the text and the six links from new-website-content.md Page 13, word for word, with the emergency line. It returns HTTP 404 and stays noindex.
13. Temporary routes so the shell can be reviewed: a placeholder Home that renders only the Home H1 and the CTA band, and one stub at /pain-and-spine/back-pain/ that renders only its H1 from the content file with breadcrumbs. Phase 3 replaces both. Add `data-dark` and `data-spine` sections to the Home placeholder so the nav variant and spine navigator can be tested.
14. Add the shell parts to /styleguide (nav, mega panel open, dock in a phone frame, footer, cookie banner).
15. Playwright tests (add to the Phase 1 suite, run on /, /pain-and-spine/back-pain/, /styleguide/ and a 404 URL):
   - No horizontal overflow at 390, 768, 1024 and 1440
   - Zero nested interactives (`a a, a button, button a, button button` count 0)
   - Mega panel: fully inside the viewport at 1024, 1280 and 1440; no two link boxes overlap; Esc closes it and focus returns to the trigger
   - Nav height 66px at the top and 56px after scrolling 120px; dark variant class present while a `[data-dark]` section is under it
   - Glow label visible above its blur layer (pixel check on the label area, as in Phase 1)
   - Spine navigator: not rendered below 1100px; labels have opacity 0 until hover or focus
   - Dock: visible at 390, hidden at 1024, hidden on /thank-you/, hidden while an input has focus
   - WhatsApp href on two routes decodes to the exact site-plan message with each page's title
   - Cookie banner: Accept, Reject and Settings have equal width and height (within 2px); no "Maximum update depth" error; choice persists after reload
   - Skip link is the first Tab stop and moves focus to #main
   - 404 URL returns status 404 and shows the branded H1
   - Reduced-motion snapshot of the shell

Acceptance:
- `curl -sI <preview URL>/` and `curl -sI <preview URL>/pain-and-spine/back-pain/` both show `x-robots-tag: noindex, nofollow`; `curl -s <preview URL>/robots.txt` shows `Disallow: /`; the page source has the robots meta noindex
- All Playwright tests above pass at every width
- Lighthouse (mobile, preview URL) on / and /pain-and-spine/back-pain/: Accessibility 100, Best Practices 100. SEO is lower only because of noindex; list any other failing SEO audit
- CLS 0 from the shell (nav shrink, cookie banner and footer wordmark cause no shift)
- Zero third-party network requests on first load (Playwright request log)
- No console errors, no hydration warnings
- Zero em or en dashes in rendered shell text (grep the built HTML for U+2013 and U+2014)

## Report
- What was built, by task number; any deviations and why
- Screenshots: nav at the top and after scroll (1440), mega panel open at 1024 and 1440, spine navigator with a label on focus (1440), dock and Call sheet (390), mobile menu open with one accordion open (390), footer at 1440 and 390, cookie banner and Settings dialog (390 and 1440), 404 at 390 and 1440
- The decoded WhatsApp URLs from the two test routes
- The curl output for the noindex checks
- Tests run and results; Lighthouse scores
- Remaining issues and the [CONFIRM] values the shell shows
STOP after this. Do not start Phase 3.
```
