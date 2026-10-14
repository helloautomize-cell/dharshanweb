# P7 · Design polish

What it does: the polish pass. You review the preview on desktop and mobile and paste your findings into the marked block; the agent fixes them plus everything on its own standing checklist at 390, 768, 1024 and 1440, with before/after screenshots.
Check before approving: fill in the findings block before pasting (or write "None beyond the checklist"), then compare the before/after pairs page by page and check the Home page at 390px is 9,000 to 10,500px tall.

```
# Phase 7: Design polish (desktop and mobile)

Before starting, confirm these paths exist and list them:
- resources/docs/design-development-plan.md
- resources/docs/site-plan.md
- resources/docs/new-website-content.md
- resources/design/rehabify-design-v3.html
- resources/images/IMAGE-GUIDE.md
- public/images/alt-text.json
- lib/site-config.ts
- lib/service-badges.ts
If any is missing, STOP and tell me. Do not substitute another file.

Branch: phase-7. Deploy a Vercel preview. Do not merge to main until I approve.

Open resources/design/rehabify-design-v3.html and the preview side by side at 1440 and 390. The design file wins for looks; design-development-plan.md section 0 wins for rules. Polish means fixing what is there. Do not add sections, change copy, or restyle anything that already matches the design.

Non-negotiables (short form):
- Night-and-ice design. Fonts: Bricolage Grotesque, Geist, Geist Mono and Instrument Serif italic via next/font, self-hosted.
- Logo PNG only. The shape never changes. Recolour per surface.
- Aqua and apricot are text colours only on night. No pure black. No red cross. One glow button per viewport.
- Body text at least 17px, tap targets 48px, contrast 4.5:1, visible focus, prefers-reduced-motion respected everywhere, content visible without JS.
- No em or en dashes in UI strings. Copy only from new-website-content.md. Never invent facts; [CONFIRM] stays.
- Compliance (IMC 2002, Drugs and Magic Remedies Act 1954, DPDP 2023 and Rules 2025, Telemedicine Guidelines 2020): no testimonials, ratings, AggregateRating, before/after, "best", "cure", "guaranteed", "100%", drug or device brands, named referral hospitals, or fees unless site-config sets them. Emergency line on every care page and the footer. Unticked consent. No third-party request before consent or a click.
- No Framer Motion, GSAP or Lenis.

Pages in scope (call this list THE PAGES):
/, /about/, /doctors/, /dr-dharshan-n-a/, /dr-selina-kh/, /care/, all 5 hubs (/pain-and-spine/, /neuro-rehabilitation/, /joints-and-sports/, /childrens-rehabilitation/, /older-adults/), /pain-and-spine/back-pain/, /neuro-rehabilitation/stroke/, /joints-and-sports/prp-and-prolotherapy/, /childrens-rehabilitation/cerebral-palsy/, /conditions/, /video-consultation/, /plan-your-visit/, /contact/, /faqs/, /health-library/, /health-library/what-is-a-physiatrist/, /thank-you/, the 404 page, /privacy-policy/.
Widths: 390, 768, 1024, 1440. Test the mobile widths with touch emulation.

Step 1. Before screenshots.
Capture full-page screenshots of THE PAGES at all four widths, before changing anything, into qa/phase-7/before/[page-slug]-[width].png. Use the reduced-motion snapshot as well for /, so every scroll-driven section shows its final state.

Step 2. Fix the agency findings.

=== Findings from the agency review (the agency pastes these before sending) ===
Across the site:
- [finding] · [where] · [what "fixed" looks like, with a number where possible]
Home, desktop:
- [section name]: [finding] · [acceptance]
Home, mobile:
- [section name]: [finding] · [acceptance]
Templates (hub, detail, doctor, post, legal):
- [template]: [finding] · [acceptance]
Other pages:
- [page]: [finding] · [acceptance]
=== End of findings ===

Fix every finding above. If a finding conflicts with section 0 of the design plan or with compliance, do not apply it: tell me which one and why in one line.

Step 3. Run the standing checklist yourself on THE PAGES at all four widths and fix every failure. Add each automated check to tests/polish.spec.ts so it keeps running.
1. Alignment: every section's content edges sit on the 1240px container (or the inset night panel) within 1px. Kickers, headings and the first card of a row share the same left edge.
2. Equal card heights: within any row of cards (badge cards, doctor cards, care track cards, post cards, bento tiles in the same row), heights differ by at most 1px. Titles that wrap to different line counts must not push buttons out of line (pin the arrow chip or button to the bottom).
3. Orphans: no heading, card title, lede or button label ends with a single word alone on its last line. Use text-wrap: balance on headings and pretty on paragraphs; fix remaining cases with spacing, not by editing copy. Automated check: for h1 to h3, .lede and card titles, the last line box holds more than one word.
4. Overlaps on faces: no label, pill, chip, name tag, glass card, goniometer widget or the spine navigator covers a face in any doctor or clinic photo. Add a face box (x, y, w, h in percent) per portrait to public/images/alt-text.json and assert that no overlay element's rectangle intersects it at any width. The Dr. Selina "Photo to be added" placeholder counts as a face area too.
5. Clipped text: no element with overflow hidden or a fixed height has scrollWidth greater than clientWidth or scrollHeight greater than clientHeight. Check glow button labels, pills, chips, tabs, the mega panel, the finder bar, the dock and the footer. Nothing is cut by the rounded panel corners.
6. Mega panel: at 1024 and 1440, the Care panel sits fully inside the viewport with at least 16px to each edge, no two links overlap, columns follow the explicit grid, hover intent 120ms, Esc closes it and returns focus to "Care". The panel footer (hours, phone, emergency line) is on one line at 1440.
7. Contrast: axe-core color-contrast reports 0 violations on THE PAGES, including inactive tabs, segmented control states, disabled buttons, placeholder text, text over photos and glass, and the dark-glass nav over night stages. Aqua and apricot text appear only on night (automated: computed color of text on paper is never #6FD0E6 or #F2B48A).
8. Repeated badges: no two adjacent cards (in a row, a carousel or the care track) show the same badge. Report every slug still on a placeholder icon or sharing a badge, so new badges can be made.
9. Carousel autoplay pause: every auto-moving carousel and the marquee has a visible pause/play button (48px target, accessible name), stops on hover, focus, touch and when the tab is hidden, stays stopped after interaction, and does not move at all under reduced motion. The hero doctor swap and glow spin also stop under reduced motion.
10. Mobile length: at 390x844, Home is 9,000 to 10,500px tall; no section except the hero is taller than 1.3 x 844 = 1,097px; a doctor is visible in the first screen after the hero. Report the height of every Home section before and after.
11. CTA reachability: at 390 the dock (Call, WhatsApp, Book) is visible on every page except /thank-you/ and hides while typing; at 1024 and 1440 the glow "Book a consultation" stays visible in the pill nav after scrolling; every care page shows a Book action in its first viewport; Book links carry the booking-context prefill. Only one glow button is visible per viewport.
12. NAP consistency: every phone, WhatsApp link, email, address and hours string on THE PAGES and in the footer, dock, mega panel and JSON-LD comes from lib/site-config.ts. Automated: the phone renders only as "+91 79048 42576" (display), tel:+917904842576 and https://wa.me/917904842576; no other phone number appears anywhere (in particular not +91 9428216487).
13. Dashes and separators: zero U+2013 and U+2014 characters in the rendered HTML and JSON-LD of THE PAGES. No stray "·" at the start or end of a line, no double separators, no "·" chains left behind by hidden [CONFIRM] values.
14. Also check: spacing rhythm (section padding per plan section 1), duplicate adjacent links to the same URL, empty gaps before the footer (no more than one section padding), focus rings visible on night and paper, and the reduced-motion snapshot shows every section's final state.

Step 4. After screenshots.
Capture the same set into qa/phase-7/after/ with the same names. Build qa/phase-7/compare.html showing each before and after pair side by side, grouped by page, then width. Write qa/phase-7/changes.md: one line per fix, grouped "Across the site" then per page and section, each with the finding it closes.

Acceptance:
- Every agency finding is fixed or answered with a one-line reason.
- tests/polish.spec.ts covers checklist items 1 to 13 and passes at all four widths; all earlier tests still pass (overflow, nested interactives, section height, reduced motion, forms, consent, headers).
- Home at 390: 9,000 to 10,500px; no non-hero section over 1,097px.
- axe: 0 violations of any kind on THE PAGES.
- Lighthouse (preview, mobile, median of 3) on /, one hub and one detail page: Performance at least 90, Accessibility 100, Best Practices 100. CLS under 0.05.
- Home first-load JS still under 120 KB gzipped.

## Report
- Each agency finding with its fix (or the reason not applied)
- The standing checklist, items 1 to 14, each marked pass and what was changed
- Link to qa/phase-7/compare.html and the 6 most important before/after pairs inline: Home hero at 390 and 1440, Home doctors at 390, mega panel at 1440, a care detail page at 390, contact at 390
- Home section heights at 390, before and after
- Badge slugs still on placeholders or shared
- Tests run and results; Lighthouse medians; JS size
- Remaining issues
STOP after this. Do not start Phase 8.
```
