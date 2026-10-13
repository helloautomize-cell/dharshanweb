# Rehabify · Design development plan

For the coding agent. Version 1 · 12 October 2026 · Based on `rehabify-design-v3.html` (design v2 plus the second doctor; v2 approved as the base by the client on 12 Oct 2026).

Read this whole file before writing code. **Section 0 overrides everything else**, including any rule in the master prompt or the Medcare/Niramay reference files.

Files this plan relies on (in `resources/`):
- `docs/site-plan.md` (pages, URLs, nav, schema, redirects)
- `docs/new-website-content.md` (all copy and frontmatter)
- `docs/IMAGE-RESOURCES-NEEDED.md` (photos, badges, icons)
- `docs/client-answers.md` (facts; anything not answered stays `[CONFIRM]`)
- `design/rehabify-design-v3.html` (the visual reference: open it in a browser, scroll it, read its CSS comments)
- `images/` (raw images, sorted by the Phase 1 script)

---

## 0. Overrides and non-negotiables

1. **The look is design v3, "Night and ice".** Dark night-blue stages (hero, body map, care track, CTA, footer) alternate with calm paper-white reading sections. Do **not** fall back to a white glass clinic template. The client rejected a version that copied the reference.
2. **Fonts for this project** (an approved exception to the master prompt's fixed Figtree rule):
   - Bricolage Grotesque, weights 500 to 800, optical size axis: headings
   - Geist, 400/500/600: all body and UI text
   - Geist Mono, 500/600: kickers, labels, numbers
   - Instrument Serif italic: at most one accent phrase per heading
   - All loaded through `next/font`, self-hosted. Preload Geist and Bricolage only. Fallback Figtree, then system.
3. **Logo:** the spine and brush "R" PNG. Never change its shape and never redraw it as SVG. Recolour only: ice `#D9EDF3` on night, blue `#0A6E94` on white, white on photos. The wordmark "Rehabify" is set in Bricolage Grotesque 700 next to the mark.
4. **Colour rules:**
   - Aqua and apricot are text colours **only on night**. On white they are decorative only.
   - Ink is never pure black. Alert red is used only for emergency notices. There is no red cross anywhere.
   - At most one glow button (rotating conic border) per viewport.
5. **Accessibility:**
   - Body text at least 17px. Tap targets at least 48px. Contrast at least 4.5:1, including over glass and photos.
   - Visible focus everywhere (2px aqua outline).
   - All motion is off under `prefers-reduced-motion`. Scroll-driven sections then render in their final, static state.
   - Content is visible with no JS (reveals start visible and are only enhanced).
6. **Copy:**
   - Copy comes only from `new-website-content.md`. Do not write new marketing text.
   - No em or en dashes in UI strings.
   - `[CONFIRM: ...]` shows as a yellow chip in dev, is hidden in production and fails `npm run launch-check`.
7. **Compliance (IMC 2002, DPDP 2023, Telemedicine Guidelines 2020):**
   - No testimonials, star widgets, AggregateRating, before/after photos, "best", "cure" or "guaranteed".
   - No fees unless `site-config` sets them.
   - The emergency line appears on every care page and the footer.
   - Analytics, maps and YouTube load only after consent or a click.
8. **Performance budget:**
   - LCP under 2.0s on mobile 4G. CLS under 0.05. INP under 200ms.
   - JS for the Home route under 120 KB gzipped.
   - No Framer Motion or GSAP. Use CSS (scroll-driven animations with `animation-timeline: view()` where supported) plus one small IntersectionObserver and rAF helper. Lenis is not used.

---

## 1. Tokens (CSS variables in `app/globals.css`, mapped into the Tailwind v4 `@theme`)

```css
@property --a{syntax:"<angle>";inherits:false;initial-value:0deg}
:root{
  --night:#0A1626; --night-2:#10233A; --night-3:#173251;
  --ice:#D9EDF3;  --ice-2:#A9BFCB;      /* ice on night 15.6:1, ice-2 8.9:1 */
  --aqua:#6FD0E6; --apricot:#F2B48A;   /* text only on night */
  --paper:#F5F8FA; --card:#FFFFFF;
  --ink:#0E2233; --ink-2:#4A6274;      /* 15.9:1 and 6.38:1 on white */
  --blue:#0A6E94; --blue-ink:#086487;  /* white on blue 5.72:1; links 6.60:1 */
  --line:#DFE8EE; --line-d:rgba(217,237,243,.12);
  --alert:#C8302A; --ok:#2F7D5B; --wa:#1F8F55;
  --ease:cubic-bezier(.22,1,.36,1);
  --r-xl:32px; --r-l:24px; --r-m:16px;
  --sh:0 1px 2px rgba(14,34,51,.05),0 18px 40px -18px rgba(10,22,38,.22);
  --sh-h:0 30px 60px -24px rgba(10,22,38,.35);
}
```

**Type scale** (all fluid, `clamp`):

| Role | Font | Size | Line height | Tracking |
|---|---|---|---|---|
| Display (hero H1) | Bricolage 700 | clamp(48px, 8vw, 116px) | 0.95 | -0.045em |
| H2 | Bricolage 700 | clamp(36px, 5.4vw, 72px) | 1.02 | -0.035em |
| H3 | Bricolage 600 | clamp(22px, 2.2vw, 28px) | 1.15 | -0.02em |
| Lede | Geist 400 | clamp(17px, 1.5vw, 20px) | 1.6 | 0 |
| Body | Geist 400 | 17px | 1.65 | 0 |
| Kicker / label | Geist Mono 600 | 12px uppercase | 1 | 0.12em |
| Accent | Instrument Serif italic | inherits | inherits | -0.01em |

On night, the accent phrase in H2 uses an aqua-to-apricot text gradient. On paper, it uses `--blue-ink`.

**Spacing:** section padding `clamp(72px, 10vw, 140px)`; max content width 1240px; page gutter 12px, with the dark stages inset as rounded panels (`--r-xl`).

---

## 2. Global shell (built in Phase 2)

| Component | Spec (see design v3 for the look) |
|---|---|
| **Floating pill nav** | Fixed, centred, 66px, glass white (blur 20, saturate 160%). Shrinks to 56px after 80px of scroll. A sliding hover indicator moves between links. "Care" opens a mega panel: 3 columns of care groups plus a night preview card. Radix NavigationMenu with explicit grid widths. Over dark stages, the nav switches to its dark glass variant (`data-dark` sections and an IntersectionObserver). |
| **Glow Book button** | Night pill with a blue icon disc. The `::before`/`::after` conic border rotates `--a`. **Do not** set `isolation:isolate` or a transform on `.glow`: this made the blur layer paint over the label. Hover speeds the spin and deepens the shadow. |
| **Spine navigator** | Desktop only (≥1100px). A fixed left rail of vertebra pills (C1 to S1) for Home sections. Done = blue, current = aqua with halo. The label shows on hover or focus only, never permanently (it overlapped the hero). |
| **Mobile dock** | Below 768px: a fixed bottom glass dock with Call · WhatsApp · Book (centre, glow). Safe-area padding. Hidden while the on-screen keyboard is open. |
| **Mobile menu** | Radix Dialog sheet from the top, night background, large Bricolage links, care groups as an accordion. |
| **Footer** | A night stage: the CTA band, 4 columns (site-plan section 4), the emergency line and the giant faded "Rehabify" wordmark (clipped, decorative, `aria-hidden`). |
| **Cookie banner** | Bottom-left glass card with Accept / Reject / Settings at equal weight. `useSyncExternalStore` with a cached snapshot. |
| **Breadcrumbs** | Mono, small, on every page below Home, plus BreadcrumbList schema. |

---

## 3. Home page sections (in order; built in Phase 4)

| # | Section | Component and behaviour |
|---|---|---|
| 1 | Hero (night stage) | Aurora blobs (CSS, 18s drift). Ice R logo watermark. H1 plus pill, sub, glow Book and ghost "Where does it hurt?". Arch portrait of Dr. Dharshan (D1) with a second, smaller arch behind it to the right for Dr. Selina Kh (S1; "Photo to be added" placeholder with the ice mark until her photo is approved). On hover the back arch rotates a little further. Mobile: the back arch peeks from the right edge. The hero fact row reads "Two rehabilitation doctors". **Goniometer widget:** an SVG arc, needle and degree counter animating 0 to 120 to 95 (example; labelled EXAMPLE). The portrait is the LCP: `priority`, no reveal. |
| 2 | Finder bar | A glass bar overlapping the hero edge: reason select · clinic/video segmented control · when · Request a time. Deep-links to `/contact/?reason=&format=&when=#book`. |
| 3 | Why Rehabify (bento) | 5 tiles with a cursor-follow spotlight (CSS var from pointermove): Doctor-led · Goals ring (an SVG ring that fills on view) · One team · Clinic or video switch (a live toggle mock) · Plain explanations. |
| 4 | Where does it hurt? (night) | **The client's favourite section. Keep it and make it richer.** Front/back body figure SVG with hotspots (neck, shoulder, back, hip, knee, ankle, head, hand). Hover or tap shows a card with the matching conditions and links. Keyboard: hotspots are buttons in a logical order. Mobile: region chips above the figure. |
| 5 | Care track | Pinned horizontal scroll on desktop (a sticky container, translateX from scroll progress). 5 care groups as large night cards with badge, title, conditions and arrow. Mobile: a native swipe carousel with scroll-snap and a progress bar. |
| 6 | Your journey (spine scrollytelling) | An SVG spine path draws itself with scroll (`stroke-dashoffset`). 6 vertebrae light up as the 6 steps pass (Book → First consultation → Your goals → Your plan → Practice at home → Review and adjust). Step photos from the image map. Mobile: vertical steps with the rail on the left. |
| 7 | Ways to see us (stacking cards) | 3 sticky cards that stack as you scroll: In clinic · Video consult (video-call UI mock) · Home programme (phone UI mock with exercise ticks). |
| 8 | Meet the doctor | A large portrait with zoom on scroll (scale 1.08 to 1), a credentials list, a languages chip [CONFIRM], profile link. Two doctors from day one (design v3): the large Dr. Dharshan block, then a two-card row below it (Dr. Dharshan, Dr. Selina Kh). Dr. Selina's card shows a "Photo to be added" arch with the ice mark until `doctors/dr-selina-hero.jpg` exists. |
| 9 | Plan your visit | A night strip: address [CONFIRM], hours [CONFIRM], directions, a click-to-load map. |
| 10 | Conditions A to Z | A live filter input plus letter chips. Results animate in a grid. Uses data from `lib/conditions.ts`. |
| 11 | FAQs | Grid-rows accordion (`grid-template-rows: 0fr → 1fr`). Native `<details>` underneath, so it works without JS. FAQPage schema. |
| 12 | Callouts | Emergency (alert) and "this site is for information" (info). |
| 13 | CTA + footer | The night stage with the glow button and the wordmark. |

Below 768px: doctor visible in the first screen after the hero; no section taller than 1.3 × viewport except the hero; target Home height about 9,000 to 10,500px at 390px.

---

## 4. Templates (built in Phase 4)

- **Care hub:** night hero with the badge `lg`, H1, intro, an at-a-glance card, care cards (badge cards; see section 5), a 4-step tracker, FAQs, the emergency callout, a reviewer box and a CTA.
- **Care detail:** a split hero (H1, intro, badge on a night arch), a sticky "On this page" rail on desktop, and the sections exactly as in the content file. Then the urgent-help callout, FAQs, sources (small, mono numbers), the reviewer box ("Medically reviewed by Dr. Dharshan N A · Last reviewed [date]"), related care cards, posts, and a sticky booking card on desktop prefilled via `lib/booking-context.ts`.
- **Doctor profile (one per doctor, same template):** hero portrait, credentials timeline, focus areas, languages, places he consults [CONFIRM per D2], and Physician schema.
- **Post:** a reading column of 68ch, a reviewer box at the top, a table of contents, FAQs and sources.
- **Legal:** a plain reading column, "Last updated" from `site-config.legalLastUpdated`, and a table of contents.

---

## 5. Badge card (signature component, replaces Medcare's glass arch)

- A rounded card (`--r-l`) on paper. The top area is a night-3 to night gradient "window" with two drifting blobs (aqua 22%, apricot 18%, blur 28px, transform only, animated only on screen).
- The badge `md` (112px) is centred in the window. **On hover:** the rotating conic ring (the same `@property --a` as the glow button) fades in and turns once, the badge lifts 3px, and a sheen sweeps across once. On touch devices, it plays once on first view. Never loop.
- Below the window: title (H3), one line and an arrow chip. Stretched-link pattern; no nested interactives.
- Different blob pairs per care group: pain = blue/aqua, neuro = aqua/ice, joints = blue/apricot, children = apricot/aqua, older adults = ice/apricot.
- Badges are drawn in code in phase P1b. Until they exist, use the line-icon placeholders from design v3 and log them in `_todo.md`.

---

## 6. Motion

- **Reveal:** fade up 16px, 500ms, `--ease`, once, 60ms stagger. Never on the LCP element.
- **Scroll-driven** (care track, spine draw, stacking cards, zoom): `animation-timeline: view()` / `scroll()` where supported. Fallback is a 1 KB rAF helper reading `getBoundingClientRect` once per frame, only while the section is intersecting.
- **Glow button spin:** 4s linear, 2s on hover. Paused when off screen (`animation-play-state` from an IntersectionObserver).
- **Carousels:** Embla on mobile only where native scroll-snap is not enough. Autoplay 4.5s with a pause button (WCAG 2.2.2), stopped on interaction.
- **Reduced motion:** everything static. Pinned sections become normal stacked sections.

---

## 7. Images

**The final image mapping is `IMAGE-MAP.md`. It overrides the table below if they differ.** Image map (target names in `public/images/`):

| Slot | Source | Target |
|---|---|---|
| Logo ice / blue / white | `brand/rehabify-mark-*.png` | `brand/mark-{ice,blue,white}.png` + `@2x`, favicon, app icons, OG base |
| D1 hero portrait | `dr-dharshan-1.png` (needs written approval) | `doctors/dr-dharshan-hero.jpg` (4:5) |
| D2 desk | `-2` / `-3` | `doctors/dr-dharshan-portrait.jpg` |
| D3 headshot | `-4` | `doctors/dr-dharshan-avatar.jpg` (1:1) |
| D5 video | `-3` (temporary) | `doctors/dr-dharshan-video.jpg` |
| S1 to S5 Dr. Selina Kh | client photos (pending, written approval needed) | `doctors/dr-selina-{hero,portrait,avatar,exam,video}.jpg` |
| Banner | `-5` (1376 × 768) | `doctors/dr-dharshan-banner.jpg` |
| C1 to C14 | client photos (pending) | `clinic/*.jpg` per `IMAGE-RESOURCES-NEEDED.md` |
| B1 to B26 | badge PNGs (pending) | `icons/services/{slug}.{png,webp}` at 512 and 256 |

- Every image gets factual alt text in `public/images/alt-text.json`. AI-generated portraits are disclosed on the Editorial policy page.
- Missing images are listed in `public/images/_todo.md`.

---

## 8. Single sources (lib/)

`site-config.ts` · `nav.ts` · `conditions.ts` (A to Z data) · `service-badges.ts` · `booking-context.ts` (page → reason and doctor prefill; Dr. Selina's page and card prefill her) · `whatsapp.ts` · `consent.ts` · `schema.ts` (one @graph builder).

---

## 9. Tests (Playwright, from Phase 1 on)

- No horizontal overflow at 390, 768, 1024 and 1440
- Zero nested interactives
- No section taller than 1.3 × viewport on mobile (hero excluded)
- The reduced-motion snapshot shows every section's final state
- Zero GA, Maps or YouTube requests before consent or a click
- Mega panel inside the viewport
- Glow button label visible above its blur layer (pixel check on the label area)
- Lighthouse a11y 100 and SEO 100 on `/styleguide`, Home and one care page

---

## 10. Phase plan

| Phase | Scope | Prompt |
|---|---|---|
| 1 | Foundation, tokens, fonts, image script, `/styleguide` | `phase-1-prompt.md` |
| 2 | Shell: nav, mega, spine nav, dock, mobile menu, footer, cookie banner, breadcrumbs, 404 | after P1 approval |
| 3 | Content pipeline, all 45 routes rendering, `[CONFIRM]` system, launch-check, schema, redirects | |
| 4 | Home sections + templates | |
| 5 | Posts, preview deploy, Lighthouse, QA | |
| 6 | Forms (Server Action + Resend), consent analytics, Maps, lock preview | |
