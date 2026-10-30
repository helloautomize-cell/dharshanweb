# P7q: Booking close card and full footer (site-wide)

Branch: create phase-7q-close-footer from phase-7p-home-sections (or from the latest phase branch if P7p is merged).

Why: today the booking close ("Your next step can be a small one.") and the footer sit on one continuous night slab, so the footer reads as the bottom of the booking box. The right column repeats the journey steps, "Confirmed by phone" appears three times, and the footer is too thin. This prompt separates the two and gives the footer real content.

Scope: the shared booking close component and the shared footer component. They change everywhere they are used, so every page gets the new versions. Pages that do not show the booking close today (for example most legal pages after P7n) still do not show it. Do not change any other section.

Rules:
- Port, don't re-interpret. Use the existing tokens (--night, --night-2 or the nearest existing raised night tone, --paper, --white, --ink, --muted, --line, --ice, --ice-2, --aqua, --blue, --blue-ink, apricot for emergency only, --r-xl) and the existing fonts (display, body, mono, serif accent). No new libraries. If a value below has no token, add it as a token, not a literal in the component.
- Keep all existing hrefs, the booking form target, analytics events on the buttons, and the WhatsApp and phone numbers exactly as they are now.
- Mobile rules stay: tap targets at least 44px, 48px on primary actions; no swipe strips; body text 17px, card and meta text 16px.
- Do not take screenshots per item. One verification at the end.

---

## 1. Booking close: an inset night card on paper

1.1 Placement
- The section background becomes paper (--paper), like the sections around it. The night colour now belongs only to a card inside the 1240px container.
- Card: background --night, border-radius 32px, padding 72px 64px, overflow hidden. One very soft radial light in the bottom-right corner only: radial-gradient(closest-side, rgba(111,208,230,.10), transparent), about 60% of the card wide and 80% tall, positioned past the bottom-right edge. No other glow, no drifting light, no glow on the buttons.
- Space: 96px of paper between the bottom of the card and the footer's top border (56px below 640px). The section above keeps its normal section gap.

1.2 Layout (1000px and up)
- Two columns, 1.25fr and 1fr, gap 64px, vertically centred.
- Left column, in this order:
  1. Kicker (mono, 12px, letter-spacing .16em, uppercase, --ice-2, with the 24px hairline before it): "Book a consultation".
  2. H2: "Your next step can be a *small one.*" in the display font, clamp(40px, 5.2vw, 72px), line-height .98, letter-spacing -.045em, --ice. "small one." is the serif italic accent in --aqua (solid colour, no gradient text).
  3. Lede, 18px, a light ice-grey (the current lede colour on night, about #B9CCD6), max 44ch: "Clinic visit or video consult. The team confirms your time by phone or WhatsApp." (unchanged copy).
  4. Buttons, 32px above, gap 12px: the existing primary "Book a consultation" (ice fill, night text, calendar icon), and "Message on WhatsApp" as the ghost button (1px border rgba(217,237,243,.28), ice text). Both 52px tall. Remove any glow, conic border or shadow on these buttons.
  5. "Prefer to call? +91 79048 42576", 16px, 20px above, with the number in --ice, weight 600, tabular numbers and a 1px underline at 30% ice.
- Right column: a "Your doctors" panel.
  - Panel: background a raised night tone (--night-2, about #0F2034), 1px border rgba(217,237,243,.14), radius 24px, padding 28px.
  - Kicker "Your doctors" (same style as above), 20px gap below.
  - Two doctor rows, 14px vertical padding each, a hairline rgba(217,237,243,.10) between them. Each row: the doctor's existing 160px avatar shown at 56 x 56px round with a 1px ice ring at 20%; the name (17px, weight 600, --ice); "Consultant physiatrist" (15px, --ice-2) under it; on the right a 44 x 44px round icon link with the lucide ArrowRight (20px, --ice-2, --ice on hover) linking to /dr-dharshan-n-a/ and /dr-selina-kh/. aria-labels "Dr. Dharshan N A profile" and "Dr. Selina Kh profile". The whole row is not one big link; only the arrow button is the link, and the name may also be a link to the same profile.
  - Under the rows: a hairline rgba(217,237,243,.14), 18px padding above, then one line with the lucide MapPin icon (18px, --aqua): "Clinic in Bengaluru, or by video across India".
- Remove from the booking close: the three numbered steps (01 Book, 02 Confirmed, 03 See the doctor) and the mono fact row ("Clinic and video | Two rehabilitation doctors | Confirmed by phone").

1.3 Tablet (640 to 999px)
- One column, gap 40px, card padding 56px 40px. The doctors panel goes under the buttons at full width.

1.4 Phone (below 640px)
- Card padding 40px 20px 20px, radius 24px, gap 32px. H2 42px. Lede 17px.
- Buttons stack, each full width and 52px tall: Book first, WhatsApp second.
- Doctors panel padding 20px, radius 18px. If "Consultant physiatrist" wraps, it wraps under the name; the arrow stays vertically centred.

---

## 2. Footer: on paper, full content

2.1 Placement and frame
- The footer sits on --paper, not on night, on every page. It is no longer inside or attached to any night slab.
- 1px --line border on top, padding 56px 0 28px, inside the 1240px container. The blocks below are 40px apart.

2.2 Top block (1000px and up): two columns, 1fr and 2fr, gap 56px
- Brand column (left), gap 20px:
  1. The R logo mark in its navy variant (rehabify-mark-navy) at 32px tall plus "Rehabify" in the display font, 24px, weight 700, --ink. Links to /.
  2. One line, 16px, --muted, max 34ch: "Physical medicine and rehabilitation. A rehabilitation doctor plans your recovery with you, in Bengaluru and online."
  3. Contact block, with a --line hairline above it and 20px padding above:
     - Mono label "Call or WhatsApp" (12px, uppercase, letter-spacing .14em, --muted).
     - The phone number "+91 79048 42576" in the display font, 26px, weight 700, --ink, tabular numbers, as a tel: link.
     - Two 44px pill buttons, gap 8px: "WhatsApp" (white fill, 1px --line border, lucide MessageCircle 16px in --blue, border --blue on hover) linking to the existing wa.me link, and "Book a consultation" (night fill, ice text, lucide Calendar 16px in --aqua) linking to /contact/#book.
  4. Remove the empty round icon button that sits next to the phone number today.
- Link columns (right): four equal columns, gap 32px. Each has a mono heading (12px, uppercase, letter-spacing .14em, --muted, 10px below) and links at 16px in --ink (--blue-ink on hover), each link at least 40px tall (44px on phone):
  - Care: Pain and spine (/pain-and-spine/), Neuro rehabilitation (/neuro-rehabilitation/), Joints and sports (/joints-and-sports/), Children's rehabilitation (/childrens-rehabilitation/), Older adults (/older-adults/), Conditions A to Z (/care/#a-z).
  - Your visit: Book a consultation (/contact/#book), Plan your visit (/plan-your-visit/), Video consults (/video-consultation/), FAQs (/faqs/), Cancellation and refund (/appointments-cancellation-refund/).
  - Doctors: Meet your doctors (/doctors/), Dr. Dharshan N A (/dr-dharshan-n-a/), Dr. Selina Kh (/dr-selina-kh/).
  - Learn: Guides (/guides/), Editorial policy (/editorial-policy/), Medical disclaimer (/medical-disclaimer/), Patient rights (/patient-rights/).
  - Wrap the four columns in one `<nav aria-label="Footer">`. Column headings are h2 or h3 per the page's heading order, styled as above; do not skip a heading level on any page.

2.3 Emergency note
- A full-width box under the top block: padding 16px 20px, radius 16px, background a very light apricot tint (about #FDF6F2), border 1px a light apricot (about #F0D5C6). Add both as tokens.
- Content: lucide TriangleAlert 20px in apricot, then "**Medical emergency?** Call 108 or 112. Do not wait for an appointment." with "Medical emergency?" in apricot, weight 600, and the rest in --ink, 15px. 108 and 112 are tel: links (keep the existing ones).
- This replaces the old apricot mono line in the footer. Keep the separate emergency strip elsewhere on the site (P7n A6) as it is.

2.4 Bottom bar
- --line hairline on top, 20px padding above, mono 13px, --muted, laid out as one row that wraps, space-between, gap 8px 24px:
  - "© 2026 Rehabify. For education; it does not replace a consultation." (keep the year dynamic if it already is).
  - Legal links: Privacy policy, Terms of use, Accessibility, Cookie settings (the existing cookie settings button keeps its behaviour). Each at least 32px tall on desktop and 44px on phone. Wrap them in `<nav aria-label="Legal">`.
  - "Built & Marketed by Automize Media Labs" with the existing link in --blue-ink.

2.5 Tablet (640 to 999px)
- The top block becomes one column: brand column first, then the four link columns in one row of four.

2.6 Phone (below 640px)
- Footer margin-top 56px, padding-top 40px, block gap 32px.
- Brand column as on desktop, full width. The two pill buttons wrap if needed.
- Link columns in a 2 x 2 grid (Care and Your visit, then Doctors and Learn), gap 28px 16px, each link at least 44px tall. No accordions.
- The emergency box aligns its icon to the first line of text.
- Bottom bar stacks: copyright, legal links (wrapping), credit.
- The mobile dock must not cover the bottom bar: keep the existing bottom padding that clears the dock, or add it.

---

## 3. Clean-up

- Delete the styles, markup and data that only the old booking close steps and fact row used, and the old footer row layout. Do not delete anything another component still uses.
- Update tests, design-diff lists and QA scripts that expected the old footer links or the steps list. Do not skip or delete tests to get green.
- Update /styleguide so it shows the new booking close card and the new footer (render the real components).

---

## Verification (once, at the end only)

At 1440 x 900, 1024 x 768 and 390 x 844, with the cookie banner dismissed:
1. On Home, /doctors/, /care/ and /medical-disclaimer/: the booking card is a rounded night card with paper around it, there is visible paper between the card and the footer, and the footer is on paper. No night background reaches the footer.
2. The booking card has no steps list and no fact row; "Confirmed by phone" or "confirms your time" appears once in the card. Both doctor avatars load sharp (naturalWidth at least 1.9x rendered width at DPR 2) and both arrow links go to the right profile.
3. Every footer link resolves (no 404), including /care/#a-z, tel: and wa.me links. The footer is identical on every route in the sitemap.
4. Tap targets: every link and button in the card and footer is at least 44 x 44px at 390px (legal links included).
5. No horizontal overflow at any width; the dock does not cover the footer's last line at 390px; heading order is valid on every page (no skipped levels).
6. No console errors; lint, typecheck, format, tests and build pass.

Save full-page screenshots of / and /doctors/ at 1440 and 390, plus a crop of the card and footer at each width, in artifacts/phase7q/.

Report: one line per item (1.1 to 3), the verification results and the screenshot paths. Commit on branch phase-7q-close-footer and push for a preview.
