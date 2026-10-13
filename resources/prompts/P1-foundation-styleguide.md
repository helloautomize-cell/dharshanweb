# P1 · Foundation, tokens, image pipeline, /styleguide

What it does: creates the Next.js app, the design tokens, the logo and photo processing script and a hidden /styleguide page that shows every building block.
Check before approving: compare the /styleguide screenshots with design v3 side by side. The glow button label must be readable, the body map must work with the keyboard, and the logo shape must be unchanged.

```
# Phase 1: Foundation, tokens, image pipeline, /styleguide

Before starting, confirm these paths exist and list them:
- resources/docs/design-development-plan.md
- resources/docs/site-plan.md
- resources/docs/new-website-content.md
- resources/docs/IMAGE-MAP.md
- resources/design/rehabify-design-v3.html
- resources/images/IMAGE-GUIDE.md
- resources/images/brand/mark-original.png
If any is missing, STOP and tell me. Do not substitute another file.

Branch: phase-1. Deploy a Vercel preview. Do not merge to main until I approve.

Read resources/docs/design-development-plan.md fully. Its section 0 overrides everything. Open resources/design/rehabify-design-v3.html in a real browser, scroll it top to bottom at 1440 and 390 widths, and read its CSS comments. That file is the visual target. Match its look and motion. Do not replace it with a generic template.

Non-negotiables (short form):
- Night-and-ice design. Fonts: Bricolage Grotesque, Geist, Geist Mono and Instrument Serif italic via next/font, self-hosted.
- Logo PNG only. The shape never changes. Recolour per surface.
- Aqua and apricot are text colours only on night. No pure black. No red cross. One glow button per viewport.
- Body text at least 17px, tap targets 48px, contrast 4.5:1, visible focus, prefers-reduced-motion respected everywhere, content visible without JS.
- No em or en dashes in UI strings. Copy only from new-website-content.md.
- No testimonials, ratings widgets, "best" or "cure". No third-party requests before consent.
- No Framer Motion, GSAP or Lenis. CSS + one small observer helper.

Tasks:
1. Create the Next.js app at the repo root next to resources/ without touching resources/. Use the App Router (latest stable), TypeScript strict, Tailwind v4, ESLint, Prettier, `trailingSlash: true`, and `images.formats ['image/avif','image/webp']`.
2. Tokens: every variable in plan section 1 goes in app/globals.css, mapped in the Tailwind @theme, including `@property --a`. Add the type scale as utility classes (.display, .h2, .h3, .lede, .kicker, .serif).
3. Create lib/site-config.ts with every fact from resources/docs/client-answers.md. Unknown values are the literal string "[CONFIRM: ...]". Add a TODO_CONFIRM export listing them.
4. Write scripts/process-images.mjs (sharp), following resources/docs/IMAGE-MAP.md (the final mapping) and plan section 7:
   - Read resources/images/ and write public/images/. Never upscale. JPEG q85, or PNG with alpha.
   - Strip EXIF and GPS, keep sRGB, and leave any C2PA data untouched.
   - Logo: trim transparent padding. Write ice (#D9EDF3), blue (#0A6E94) and white recolours by tinting the alpha mask, so the shape is identical. Export 1x/2x/3x PNG + WebP, favicon.ico, icon.png, apple-icon.png (mark on a #0A1626 rounded tile) and a 1200x630 OG base.
   - Doctor set, for BOTH Dr. Dharshan and Dr. Selina Kh, exactly as IMAGE-MAP.md section 2 says: -hero (4:5), -portrait, -avatar (1:1, circle-safe), -exam (3:2), -video (3:2), -banner (Dr. Dharshan only). All current doctor images are approved (12 Oct 2026): set every imageApprovals flag in site-config to true. Keep the "Photo to be added" placeholder component in the codebase for any future doctor or replaced image that is not yet approved.
   - Badges are drawn in code in Phase 1b (P1b-badges.md). In this phase only create the folder public/images/icons/services/ and the placeholder line icons.
   - Write public/images/alt-text.json (factual alt text for every image) and public/images/_todo.md (missing slots, AI portrait approvals needed).
   - Add `npm run images`, run it, and commit the output.
5. Create lib/service-badges.ts mapping every care page slug (site-plan.md section 2) to its badge slug. Use a placeholder line icon when a PNG is missing, and log which slugs still need badges.
6. Build /styleguide (noindex, linked from nowhere). It shows, with real Rehabify copy:
   a. Logo on night, paper and photo, at 3 sizes, plus the favicon and app icon
   b. Swatches with their contrast ratios (computed at build, not typed)
   c. The type scale, including an H2 with a serif accent on paper and on night
   d. Buttons: glow (on night and on paper), primary, ghost, WhatsApp, link with arrow, in hover, focus and disabled states. The glow must have NO isolation:isolate and no transform on hover (see plan section 2)
   e. Floating pill nav (static demo) with the sliding indicator and the mega panel open
   f. Spine navigator demo (labels on hover or focus only)
   g0. Both doctors: the hero fan (Dr. Dharshan front, Dr. Selina behind, now with her real images; the placeholder variant shown once below it) and the two doctor cards from design v3
   g. The goniometer widget (animated, labelled EXAMPLE)
   h. The finder bar
   i. A bento tile with the cursor spotlight, plus the goals ring
   j. The body map (front and back, keyboard-operable hotspots, region chips on mobile). The client likes this most, so polish it
   k. Badge cards, one per care group, with all hover effects (plan section 5)
   l. A stacking card with the video-call mock
   m. The FAQ grid-rows accordion on <details>
   n. Callouts: emergency, info, warning
   o. The mobile dock inside a phone frame
   p. The reduced-motion toggle (forces the static state for review)
7. Playwright: set up the tests in plan section 9 that apply to /styleguide (overflow, nested interactives, glow label visibility, reduced-motion snapshot).

Acceptance:
- Screenshots of /styleguide at 390 and 1440, side by side with the matching parts of rehabify-design-v3.html at the same widths
- Lighthouse on /styleguide: accessibility 100, best practices 100
- No console errors and no hydration warnings
- `npm run images` is idempotent (running it twice changes nothing)

## Report
- What was built, by task number; any deviations and why
- Screenshots: /styleguide full page at 390 and 1440, plus close-ups of the glow button, the body map and the badge cards
- Tests run and results; Lighthouse scores
- The image _todo.md contents and the TODO_CONFIRM list
- Remaining issues
STOP after this. Do not start Phase 1b.
```
