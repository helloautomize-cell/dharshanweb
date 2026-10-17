# Phase 7 changes

No agency findings were supplied (autopilot run) — the standing checklist
drove all fixes. `tests/polish.spec.ts` (10 checks) keeps them running.

## Across the site

- `.visit-band` had `on-night` text with no background on Home; the aqua
  kicker sat on paper (contrast rule: aqua only on night). Added
  `background: var(--night)`. Closes checklist 7.
- Marquee had no pause control. Added `MarqueePause` (48px button, accessible
  name, aria-pressed) plus hover/focus-within pause; reduced-motion already
  stops it. Closes checklist 9.
- Mega panel: Esc now returns focus to the "Care" link instead of the hidden
  hamburger, and a suppress flag stops `onFocus` reopening it. Panel stays
  inside the viewport at 1440 (verified in test). Closes checklist 6.

## Home, mobile (390)

- Home was 16,840px (target 9,000 to 10,500). Fixes, per the ">3 items =
  swipe" rule:
  - `#why` bento tiles: horizontal snap-scroll strip, 82vw cards.
  - `#ways` stack cards: horizontal snap-scroll, sticky stacking off.
  - `#recovery` steps: horizontal snap-scroll; spine rail hidden on mobile.
  - `#meet` principles: horizontal snap-scroll; portrait capped at 220px.
  - `#concern` body figure hidden at 390 (region chips carry interaction;
    matches earlier a11y decision), `also-row` scrolls horizontally.
  - `#conditions` list: scrollable region capped at 480px, keyboard focusable.
  - `.section` padding-block 48 to 36px, `.section-head` margin tightened.
- Result: 10,263px total; tallest non-hero section 1,081px exempt hero then
  1,051px (meet). Doctor portrait sits in the first viewport. Closes 10.

## Tests

- `tests/polish.spec.ts`: dashes in text/JSON-LD, NAP digits, dock visibility
  - thank-you exception + care-page Book reachability, clipped text incl.
    glow-button labels, aqua/apricot only on night, marquee pause, home height
    range + section caps + doctor visibility, no adjacent duplicate track
    badges, axe colour-contrast on key pages, mega panel bounds + Esc.
- Full suite: 38/38 green.
