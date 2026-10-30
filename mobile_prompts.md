# P7r: Home page mobile structure (below 900px)

Branch: create phase-7r-mobile-home from the latest phase branch (after P7p and P7q).

Why: on a 390px phone the Home page is about 17,750px tall. The hero shows text first and the doctor photo only starts around 720px down, below the first screen. Some sections are much longer than they need to be on a phone: Care is about 3,100px, the doctor section about 2,300px, Ways to see us about 1,900px and the body map about 1,800px. Dr. Dharshan's photo appears several times in large sizes. This prompt fixes the mobile structure only.

Scope: Home page (/) only, and only below 900px (the same breakpoint where the mobile dock appears). Desktop at 900px and up must not change at all. Do not change copy, links, schema or the order of sections. Do not touch the mobile dock (Book, Call, WhatsApp). It stays exactly as it is.

Rules:
- Port, don't re-interpret. Reuse existing tokens and components. No new libraries.
- Tap targets at least 44px, 48px for primary actions. Body text 17px, card and meta text 16px. No horizontal swipe strips anywhere on Home on mobile; remove the ones that exist (listed below).
- Section spacing below 640px: 56px between sections, 24px between a section head and its content.
- Every expand or collapse works with the keyboard and announces its state (aria-expanded), and all content stays in the HTML (no content loaded only on click), so SEO and the initial-HTML check still pass.
- Reduced motion: no transitions on anything this prompt adds.
- One verification at the end, no screenshots per item.

---

## 1. Hero (#top): photo first

1.1 New order below 900px, top to bottom:
1. The doctor fan (both arches with the P7p right-to-left swap, the name cards and the dots and pause controls).
2. The pill "Physical medicine and rehabilitation · Bengaluru and online".
3. H1 "Rehab that moves with you."
4. The lede.
5. The two buttons, stacked and full width (Book a consultation first, 52px tall; Where does it hurt? second, 48px).
6. The facts row.

Do this with CSS order or grid areas on the existing markup. Do not duplicate the fan in the HTML. Keep the DOM order the same as desktop if changing it would change the heading order for screen readers. The H1 must stay the first heading.

1.2 Fan size on mobile
- The fan block is the full container width, 340px tall at 390px (scale with the width: height = 87vw, at most 400px). The front arch is about 68% of the width, and the back arch peeks from the right and stays fully inside the screen.
- Padding above the fan is 16px below the floating header, so the top of Dr. Dharshan's head is never under the header. Check this at 360px, 390px and 430px wide.
- The controls row sits 12px under the fan, centred.
- The pill sits 24px under the controls.

1.3 First screen check
- At 390 x 844, the photo, the pill and the H1 must all be fully visible without scrolling. If the H1 does not fit, reduce the fan height (never below 300px) before touching the type.
- LCP must still be Dr. Dharshan's hero image, eager with fetchpriority high and sizes "(max-width: 899px) 70vw, 430px". Report LCP before and after.

1.4 Facts row on mobile
- Keep 2 x 2, but compact: 16px gap, value in 16px weight 600, label in mono 12px. A hairline on top, 24px above it.

---

## 2. Finder card ("I need help with")

- Keep it, directly under the hero, overlapping the hero's bottom edge by 24px as now.
- The "When" segmented control (This week / Later) and the "Request a time" button must not sit under the mobile dock when the page is scrolled so that the card is at the bottom of the screen. Give the page a bottom padding equal to the dock height plus 24px, so that the end of the page clears it. The dock itself is unchanged.
- Each segment button at least 44px tall.

---

## 3. Why (#why)

- The bento becomes one column with 12px between tiles.
- The quote tile: quote text at 26px on mobile (it is very large now and runs about 400px tall). The doctor byline stays.
- The goals tile (P7p goal meter) stays as is.
- The three small tiles (Pain care, Neuro rehab, Every age) stay as full-width cards, 20px padding.

---

## 4. Where does it hurt? (#where)

- Keep the P7p figure panel (figure box 460px tall, top bar with "Selected" and Front/Back).
- Area chips: today each chip is on its own line, which is long. Lay them out as a 2-column grid (gap 8px), each chip full cell width, 44px tall, text centred, wrapping to two lines if needed.
- The condition links under the area title stay as a one-column list with hairline dividers.
- Target: the whole section no taller than about 1,350px at 390px.

---

## 5. Care (#care): from one long list to an accordion

Today on mobile the section shows every condition in all five groups (about 3,100px), with a sticky horizontal chip strip ("Pain and spine", "Neuro rehabilitation", ...) that is cut off at the right edge.

5.1 Below 900px
- Hide the sticky chip strip (.ci-side) on mobile. It is a swipe strip and the accordion replaces it.
- Each care group (.ci-group) becomes an accordion item:
  - Header button, full width, at least 56px tall, hairline divider below: the area name (18px, weight 600, --ink), the count in mono on the right ("04"), and a lucide ChevronDown (20px) that rotates 180 degrees when open (200ms). aria-expanded and aria-controls on the button.
  - Panel: the existing condition rows (title and one-line description, with the arrow), then a link "See all of [area name]" with an arrow to the area hub page (/pain-and-spine/, /neuro-rehabilitation/, /joints-and-sports/, /childrens-rehabilitation/, /older-adults/).
  - The first group (Pain and spine) is open on load; the others are closed. Opening one does not close the others.
  - Closed panels use the `hidden="until-found"` attribute where supported (fallback: `hidden`) so the text stays in the HTML and find-in-page still works.
- Keep the existing h3 for each group name inside the header button (button inside the h3), so the heading order stays the same.
- Under the accordion, the existing "See all care" link, 48px tall.
- Target: the section is about 1,000 to 1,200px tall at 390px with the first group open.

5.2 Desktop
- Unchanged: the side navigation and all groups stay open from 900px up.

---

## 6. Six steps, one plan. (#journey)

- Keep the P7p left rail with the vertebra pills.
- Step spacing on mobile: 40px between steps (it is larger now). Step H3 at 24px. Chips stay wrapped.
- Target: the section no taller than about 1,600px.

---

## 7. Ways to see us (#ways)

- In each card, put the photo first and the text second on mobile.
- Photo: full card width, aspect-ratio 16 / 10, at most 220px tall, object-fit cover, object-position chosen so the doctor's face is fully visible (check both photos).
- Card padding 20px, list items 16px, the button full width and 48px tall.
- `sizes` for these photos: "(max-width: 899px) 92vw, 50vw". Check the served width is not the 3840px version on mobile.
- Target: the section no taller than about 1,500px.

---

## 8. Meet your doctor (#doctor)

Today on mobile: a large desk photo of Dr. Dharshan, his full bio, values, timeline and buttons, then two big cards again for Dr. Dharshan and Dr. Selina, each with a big photo.

8.1 Feature block
- The desk photo: aspect-ratio 4 / 5, at most 420px tall, the floating name card stays at the bottom-left.
- The three values (Goals first, Explained plainly, One team): keep them, as a compact list with 12px between items.
- The timeline: keep it.
- Buttons stacked, full width: "Book with Dr. Dharshan" (52px) and "Full profile" (48px).

8.2 The two doctor cards (.doc2) on mobile
- Replace the big photo cards with two compact rows inside one white card with a hairline between them. Each row: the avatar at 72px round, the kicker ("Lead physiatrist" / "Physiatrist") in mono 12px, the name at 20px weight 700, the one-line specialty at 15px (clamp to 2 lines), and a 44px "Profile" arrow link on the right.
- Use the existing 160px avatar images, not the large photos.
- Desktop keeps the current big cards.
- Target: the section no taller than about 1,600px.

---

## 9. Booking card and footer (from P7q), mobile polish

- In the "Your doctors" panel on phones, the name "Dr. Dharshan N A" breaks so that the "A" sits alone on a line. Fix it: avatar 48px on mobile, panel padding 16px, and use a non-breaking space between "N" and "A" (Dr. Dharshan N&nbsp;A) everywhere the name appears. "Consultant physiatrist" may wrap, but the name must stay on one line at 360px.
- The footer is unchanged, apart from making sure the page's bottom padding clears the dock (item 2).

---

## 10. Header on mobile

- No change to the design. Check that it has a solid background over light and dark sections (P7n A3), and that no heading text shows through it at any scroll position.

---

## Verification (once, at the end only)

At 360 x 780, 390 x 844 and 430 x 932, with the cookie banner dismissed:
1. Hero: the photo is the first thing below the header; the photo, pill and H1 are visible without scrolling at 390 x 844; the top of the head is not under the header; the swap still works. LCP before and after.
2. Section heights at 390px: report each section's height before and after, and the total page height (target under 12,000px; it is about 17,750px now).
3. No horizontal overflow and no horizontal swipe strip on Home.
4. Care accordion: keyboard open and close, aria-expanded correct, all condition links in the initial HTML, find-in-page finds text inside a closed group (where hidden="until-found" is supported).
5. Every tap target at least 44px; primary buttons 48px or more.
6. The dock is unchanged and never covers the last element of the page, the finder's "Request a time" button, or the footer's last line.
7. Desktop at 1440 and 1024 looks exactly as before (compare to the P7q screenshots).
8. No console errors; lint, typecheck, format, tests and build pass.

Save full-page Home screenshots at 390 (before and after) and at 360 and 430 (after) in artifacts/phase7r/.

Report: one line per item (1 to 10), the section height table, the LCP numbers, and the screenshot paths. Commit on branch phase-7r-mobile-home and push for a preview.
