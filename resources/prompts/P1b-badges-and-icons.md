# P1b · Service badges drawn in code, and P1c · Icons

What it does: the coding agent draws all 26 service badges and 2 doctor badges as SVG in one matching style, then exports them as images. It shows you 4 drafts first. After that, P1c sets up the small UI icons.
Check before approving: the contact sheet. All 28 must look like one family, be readable at 64px, and no two may look alike.

```
# Badge set: 26 service badges + 2 doctor badges, drawn in code

Before starting, confirm these paths exist and list them:
- resources/docs/IMAGE-RESOURCES-NEEDED.md (section 4 is the badge table B1 to B26 with a subject for each)
- resources/docs/design-development-plan.md (sections 1 and 5)
- lib/service-badges.ts
If any is missing, STOP and tell me.

Branch: badges. Do not merge until I approve.

Goal: one consistent illustrated badge per care page, drawn as hand-authored SVG (not an image generator, not an icon-font), exported to PNG and WebP, with the rest of the pipeline from `process-images.mjs` unchanged.

Style (all 28 must match):
- 1024 x 1024 viewBox. A circular badge: a soft disc (night-3 #173251 to night #0A1626 gradient, 6% inner ring in ice #D9EDF3 at 18% opacity), centred drawing, 12% padding.
- The drawing is clean continuous line art, stroke 14 (at 1024), round caps and joins, a gradient stroke from aqua #6FD0E6 to ice #D9EDF3, with one small apricot #F2B48A accent element (a dot, arc or spark) per badge and two tiny plus-sign sparkles in ice at 40% opacity. No fills except the disc and the accent. No text, no logos, no brand names, no red cross.
- Generous empty space. Simple shapes. Every drawing must read at 64px.
- Same line weight, same corner treatment, same accent rule in all badges.

Subjects: use the "Subject for the prompt" column for B1 to B26 and the two doctor badges (D-m, D-f) in IMAGE-RESOURCES-NEEDED.md section 4. Each badge is one file: resources/badges/src/{slug}.svg, slug as in the "Badge file" column.

Tasks:
1. Write a shared `badge-base.svg` template (disc, ring, sparkles, gradient defs) and have a small script `scripts/build-badges.mjs` inject each drawing into it, so style changes in one place update all 28.
2. Draw the 28 drawings. Start with 4 (pain-spine, stroke, knee, children), render them, show me, and only then continue. Keep human figures abstract and gender-neutral except the two doctor badges.
3. Export with sharp: 512 and 256 px PNG with alpha and WebP into public/images/icons/services/{slug}.{png,webp}. No knockout step is needed because the SVG has no off-white background. Skip the old knockout for these files.
4. Update lib/service-badges.ts so every care page slug maps to its badge, never the same badge on two neighbouring cards. Report any slugs sharing a badge.
5. Add a /styleguide section "Badges" with all 28 at 256, 112 and 64 px on night and on paper, and the badge card hover effects (plan section 5). Add alt text entries to public/images/alt-text.json ("Illustration of ..." per badge).
6. Visual check: render the 28 as one contact sheet at 1440 wide and review it yourself for consistency before reporting. Fix any that look thinner, heavier or off-style.

Acceptance: contact sheet screenshot; every badge legible at 64px; all 28 files exist in PNG and WebP; the styleguide Badges section passes the existing Playwright checks.

## Report
- What was built, by task; deviations and why
- The contact sheet and the 4 first drafts
- Any duplicate badge mappings
STOP after this. Do not start Phase 2.
```

## P1c · Icons (same branch as P1b, paste after the badge report is approved)

What it does: sets up the small UI icons and the code-drawn medical graphics.

```
# Phase 1c: Icon system

Before starting, confirm resources/docs/design-development-plan.md and resources/design/rehabify-design-v3.html exist. If not, STOP.

1. Install lucide-react. Create components/icons/index.ts that re-exports only the icons we use (tree-shaken): Phone, MessageCircle (WhatsApp uses its own brand-safe glyph drawn as an inline SVG, green #1F8F55, no WhatsApp logo file), Calendar, Clock, MapPin, Video, Mail, ChevronDown, ChevronRight, ArrowRight, Menu, X, Check, Info, AlertTriangle, Search, Accessibility, Home, Footprints, Stethoscope. Defaults: 24px, stroke 1.75, currentColor, aria-hidden unless the icon is the only content (then an aria-label).
2. Line icons are only for UI at 32px and under. Never use a Lucide icon in place of a service badge.
3. Draw these as React SVG components from design v3 (copy the geometry from its source, keep it accessible): Vertebra (for the spine navigator), Goniometer (arc, ticks, needle, degree counter, accepts a value prop), BodyMap front and back (each region a <button> path with an accessible name), SpinePath (for the journey scrollytelling), GoalsRing.
4. Favicon and app icons come from the logo mark (P1 script). The OG image template uses the night background, the ice mark and the page title in Bricolage Grotesque.
5. Add an "Icons" section to /styleguide: every Lucide icon at 16, 20 and 24px on paper and night, and every drawn graphic.

## Report
- Screenshot of the Icons section at 1440 and 390
- Bundle size change of the Home route (must be under 4 KB gzipped for icons)
STOP after this. Do not start Phase 2.
```
