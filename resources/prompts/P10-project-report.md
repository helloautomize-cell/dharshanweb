# P10 · Client project report (PDF)

What it does: produces the client report as an A4 PDF in the night-and-ice look, built from measured numbers, the old-site audit and real screenshots of the live site.
Check before approving: check every number against its source, check every status chip is honest (Done / At launch / Clinic) and read it once as Dr. Dharshan would. Do not send it to the clinic until you have approved it.

```
# Phase 10: Client project report (A4 PDF)

Before starting, confirm these paths exist and list them:
- resources/docs/current-website-audit.md
- resources/docs/site-plan.md
- resources/docs/client-answers.md
- resources/docs/entity-facts.md
- resources/docs/design-development-plan.md
- resources/design/rehabify-design-v3.html
- qa/phase-7/changes.md (and the Home section heights from the Phase 7 report)
- qa/seo-titles-descriptions.csv
- qa/launch/redirects-check.txt
- public/images/brand/
If any is missing, STOP and tell me. Do not substitute another file.

Branch: phase-10. The report lives in report/ and is not part of the website build (not served, not in public/). Do not merge to main until I approve.

Non-negotiables (short form):
- Night-and-ice look: night #0A1626 stages, ice #D9EDF3, aqua #6FD0E6 and apricot #F2B48A as text only on night, paper #F5F8FA reading pages, blue-ink #086487 accents on paper. Fonts: Bricolage Grotesque (headings), Geist (body), Geist Mono (labels and numbers), Instrument Serif italic (at most one accent phrase per heading). Embed them from the same self-hosted files the site uses.
- Logo PNG only, ice on night and blue on paper. The shape never changes.
- Body text at least 11pt in print; contrast 4.5:1.
- No em or en dashes. Plain, warm, short sentences; sentence case headings; none of the AI-tone words (delve, seamless, comprehensive, holistic, robust, leverage, elevate, unlock, tailored, cutting-edge, state-of-the-art, world-class, peace of mind).
- Never invent a number. Every figure comes from a measurement or a file, and its source is listed in report/sources.md. If something was not measured, show "Not measured", never an estimate.
- Compliance applies to the report too (IMC 2002, Drugs and Magic Remedies Act 1954, DPDP 2023 and Rules 2025, Telemedicine Guidelines 2020): no "best", "No. 1", "leading", "guaranteed", no promises of rankings, traffic, patients or AI answers, no testimonials. Screenshots never show patient data (use the empty form).

Tasks:

1. Gather the facts into report/data.json (one source of truth for the report):
   - Pages: count of indexable routes in the live sitemap; care pages (hubs + detail pages); legal pages; Guides posts at launch.
   - Doctors: 2 (Dr. Dharshan N A, Dr. Selina Kh), with what is shown for each.
   - Badges: illustrated PNG badges in use out of 26 planned (from lib/service-badges.ts); placeholders still in use.
   - Lighthouse: production, mobile, median of 3, for the six Phase 8 pages (Performance, Accessibility, Best Practices, SEO, LCP, CLS, TBT). Run them now and keep the raw JSON in report/lighthouse/.
   - Mobile Home length at 390px: before and after the Phase 7 polish, and the percentage reduction.
   - Old site facts from resources/docs/current-website-audit.md (sections 0, 3, 5, 9).
   - Status of every SEO, schema, GEO and integration item: Done (verified live), At launch (switched on at launch and verified), or Clinic (waiting for the clinic: name the item, for example Dr. Selina's registration number, clinic photos, badges, videos, Guides posts).

2. Build report/index.html as print-ready HTML (A4 portrait, @page size A4, margins 14mm, page numbers in the footer from page 2, no content split across pages inside a card or table row). Sections:
   1. Cover (night): logo, headline with one serif accent phrase, a Home screenshot at 1440 in a browser frame, "Prepared for Dr. Dharshan N A, Rehabify" and "Prepared by Automize Media Labs", the date, and the status (Live at www.rehabify.in).
   2. At a glance: exactly 8 stat tiles: pages, care pages, doctors, badges, mobile Performance (median), Accessibility, CLS, mobile Home length reduction. Each tile: big Geist Mono number, one label, a tiny source note.
   3. Why we rebuilt: two lists side by side, "Before" from the audit (placeholder email xyz@abc.com on the home page, the agency's phone and email on inner pages, unreviewed AI health tools, a booking button leading to an empty page, four empty pages, /home duplicating the home page, no address, hours, map, schema or alt text, "Rehabify - X" titles) and "Now" (the matching fix on the new site, each one true and verifiable).
   4. Why Next.js instead of Google Sites: a comparison table (speed, accessibility, structured data, forms and privacy, control of content, security headers, hosting). Facts only.
   5. Design and patient experience: 6 cards (night-and-ice identity built from the logo, the body map "Where does it hurt?", the two-doctor hero, the care track and spine journey, clinic or video choice, accessibility and reduced motion).
   6. Home page: 4 to 6 screenshots (desktop) and a section-by-section table (section, what it does for a patient).
   7. Mobile: 390px screenshots of the hero, body map, doctors and contact; the before/after Home height; a table of mobile changes from qa/phase-7/changes.md.
   8. Site structure and booking: the page tree from site-plan.md section 2 as a compact diagram; the booking form flow (doctor choice, clinic or video, under-18 guardian consent, unticked consent, spam protection, email to the clinic, thank-you page); privacy (consent-gated analytics, no data stored on the website, DPDP-ready notices).
   9. Technical SEO table with status chips (Done / At launch / Clinic): titles and descriptions, canonicals, sitemap, robots and the AI bot allowlist, redirects for every old URL (from redirects-check.txt), 410 for the old AI tools, OG images, security headers, noindex on non-production hosts.
   10. Schema and area served: a table of schema types per page type; area served shown as two chips: "Bengaluru clinic" and "Video consults across India". No catchment bars (Rehabify has one location and no catchment data). If client-answers.md item 28 has been answered, add the areas as plain chips.
   11. GEO and AEO: llms.txt and llms-full.txt, answer-first intros, FAQs in the initial HTML, entity-facts.md and identical NAP across the site, GBP and Practo, IndexNow. Then "Responsible medical communication": no testimonials or ratings, reviewer box and last-reviewed dates, emergency line, AI-assisted images disclosed with doctor approval, legal pages.
   12. Speed and quality: the Lighthouse medians table (six pages) and QA cards (Playwright suites and what they check: overflow, nested interactives, forms, consent, headers, schema, dashes, initial HTML).
   13. Content plan and next steps: Guides live vs target (3 at launch, 24 topics in year one from site-plan.md section 12, shown as topic chips), then numbered next steps with an owner (Agency or Clinic), then a closing night band with the clinic phone and website.

3. Every status chip is honest. "Done" only when verified on the live site in this phase. "At launch" only for items that were switched on at launch and verified in Phase 9B. "Clinic" for anything waiting on the clinic. Show a small legend on page 2.

4. Render report/rehabify-project-report.pdf with Playwright (Chromium): page.emulateMedia({ media: "print" }), page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true }). Wait for document.fonts.ready and all images before printing. Add npm run report.

5. Screenshots for the report come from production (https://www.rehabify.in) with the cookie banner dismissed by Reject, reduced motion on, and no test data in forms. Save them in report/shots/.

Acceptance:
- The PDF is A4 portrait, 12 to 18 pages, under 10 MB.
- pdffonts shows Bricolage Grotesque, Geist and Geist Mono embedded (Instrument Serif if used); no fallback fonts.
- No text cut at page edges; no card or table row split across pages; page numbers correct.
- Every number in the PDF appears in report/data.json with a source in report/sources.md.
- Zero em or en dashes in the HTML and the extracted PDF text (pdftotext then grep).
- All links in the PDF are clickable and go to https://www.rehabify.in pages.

## Report
- The PDF and report/index.html
- report/data.json and report/sources.md
- A list of every Clinic item shown in the report
- PNG previews of pages 1, 2 and 9 of the PDF
- Remaining issues
STOP after this. Do not send the report to the client. I will review it first.
```
