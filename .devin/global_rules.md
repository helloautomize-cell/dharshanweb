# Rehabify project rules

## User-approved workflow overrides

- Never create a branch, commit, merge, or push code. Leave all changes uncommitted in the working tree; the user handles version control.
- Store new agent configuration only in `.devin/`. Do not create `.windsurfrules` or other tool-specific configuration.
- Work on one requested phase at a time. Report and STOP after each phase; do not start the next phase without approval.
- `_handoff/` is an immutable source package. Copy resources without modifying, renaming, or moving originals. `resources/` is not gitignored.
- Phase 0 only organises resources. Do not scaffold the app, install app dependencies, generate badges, process images, or start Phase 1 during Phase 0.

## Taste Skill usage

- Invoke `taste-skill` before planning or changing any relevant landing page, marketing page, portfolio, or visual redesign. Apply its compatible quality checks throughout the project, not only in the hero.
- The installed skill source for this environment is `C:/Users/Eq2182au/AppData/Roaming/devin/skills/taste-skill/SKILL.md`. If skill invocation is unavailable, read that file directly. If the skill tool reports another source, use the reported source.
- Declare the Design Read and explicit `DESIGN_VARIANCE`, `MOTION_INTENSITY`, and `VISUAL_DENSITY` for UI work, based on the actual brief and approved visual reference. Do not force generic baseline dials on a rehabilitation audience.
- Prioritise legible hierarchy, careful spacing, motivated motion, real approved images, consistent tokens and radii, responsive layouts, accessible contrast, keyboard access, reduced motion, and complete interactive states.
- Use the applicable Taste Skill pre-flight checks before delivering UI. Record evidence, exceptions and blocked checks honestly; do not claim unrun Lighthouse or browser checks passed.
- Project requirements, medical compliance, the approved design v3, approved copy, supplied assets, and explicit user instructions take priority over Taste Skill defaults. Do not redesign the brand, rewrite medical copy, replace the stack, or add dependencies merely because the skill suggests it.
- Explicit project exceptions: alternating night/paper sections, the prescribed multi-accent token palette, Bricolage Grotesque and Instrument Serif accent phrases, prescribed glow buttons, Lucide at stroke 1.75, and code-drawn medical graphics/badges. Preserve these approved choices rather than applying conflicting generic bans.
- Use CSS and native scroll-driven animation with a small IntersectionObserver/rAF helper as specified. Do not install Motion, Framer Motion, GSAP, Lenis, or UI kits to satisfy skill defaults. Do not animate the LCP element.
- Use supplied approved doctor images. Clinic photos must be real, approved photos; do not substitute stock doctors, hospitals or patients or generate replacement clinical scenes without fresh approval.
- Do not add testimonials, review quotes, star ratings, invented clinical metrics, or social-proof claims. Do not apply marketing-page layout rules to multi-step booking/product flows.

## Project

- Site: Rehabify, https://www.rehabify.in/, a physical medicine and rehabilitation practice in Bengaluru, India, with video consults across India.
- Doctors: Dr. Dharshan N A (lead) and Dr. Selina Kh.
- Sources of truth (in `resources/docs/`):
  - `design-development-plan.md`: section 0 takes priority over other project design references, subject to the user-approved workflow overrides above.
  - `site-plan.md`
  - `new-website-content.md`: all copy
  - `client-answers.md`: facts
  - `IMAGE-MAP.md`
  - `sitemap.md`
  - `redirects.json`
  - `entity-facts.md`
- Visual target: `resources/design/rehabify-design-v3.html`.

## Workflow

- At the start of a phase, confirm the listed input files exist. If one is missing, STOP. Never substitute another file.
- At the end of a phase, write the requested report, then STOP.
- Never ask the human to rename or move files by hand.
- Vercel previews belong to the requested implementation phases, not resource-only Phase 0. Do not deploy or publish without authorisation.

## Stack

- Next.js App Router (stable), TypeScript strict, Tailwind v4 with tokens as CSS variables. Verify dependency versions and repository conventions before installing.
- Libraries: Radix primitives, Embla (only where native scroll-snap is not enough), next/font (self-hosted), next/image, sharp, Zod, remark/rehype.
- Hosting: Vercel, functions region bom1.
- Options: `trailingSlash: true`, `poweredByHeader: false`.
- Not allowed: Motion, Framer Motion, GSAP, Lenis, jQuery or UI kits. Use CSS and scroll-driven animations, plus one small IntersectionObserver/rAF helper.

## Design

- Look: night-and-ice. Night stages (#0A1626) alternate with paper sections (#F5F8FA). Tokens are exactly as in plan section 1.
- Fonts: Bricolage Grotesque (headings), Geist (body and UI), Geist Mono (labels), Instrument Serif italic (one accent phrase per heading at most).
- Logo: PNG only. The shape never changes; recolour per surface.
- Aqua and apricot are text colours only on night.
- No pure black text.
- No red cross or plus anywhere.
- At most one rotating glow button per viewport. The glow button never gets `isolation:isolate` or a hover transform.
- Body text at least 17px; tap targets at least 48px; contrast at least 4.5:1, including over glass and photos; visible focus everywhere.
- `prefers-reduced-motion` shows the final static state everywhere.
- Content is visible without JS. Never animate the LCP element.
- Mobile: doctors are visible early. No non-hero section is taller than 1.3 times the viewport. Any section with more than 3 items becomes a swipe carousel with a pause control.

## Copy

- Copy comes only from `new-website-content.md`. Never write new marketing text. If something is missing, use `[CONFIRM: ...]` and list it.
- `[CONFIRM: ...]` shows as a yellow chip in dev, is hidden in production and fails `npm run launch-check`.
- No em or en dashes anywhere in rendered HTML or JSON-LD. Use "to" for ranges. Enforce this with a build check.
- Never write these words: delve, navigate (as a metaphor), embark, realm, tapestry, seamless, comprehensive, holistic, robust, leverage, empower, elevate, unlock, tailored, cutting-edge, state-of-the-art, world-class, top-notch, game-changer, peace of mind, rest assured, one-stop.
- No exclamation marks, no emojis and no Title Case headings.

## Medical compliance (India)

- Applicable project compliance references: IMC Regulations 2002 (factual information only), the Drugs and Magic Remedies Act 1954, the DPDP Act 2023 and Rules 2025, and the Telemedicine Practice Guidelines 2020. Confirm current legal requirements during the compliance phase; do not imply legal review has occurred.
- Never use "best", "No. 1", "leading", "guaranteed", "cure", "permanent" or "100%".
- No testimonials, review quotes, star ratings or AggregateRating/Review schema.
- No before/after images, price offers, drug or device brand names, or patient counts.
- Never imply a referral arrangement with a hospital. Hospitals are named only as decision D2 allows.
- Include "Medical emergency? Call 108 or 112." on care pages and in the footer.
- Include a reviewer box and a last-reviewed date on every medical page.
- Consent boxes are unticked by default.
- No third-party requests before consent: GA4, Maps and YouTube load on consent or click.
- AI-assisted images need the doctor's written approval flag (see `IMAGE-MAP.md`). Scene images carry "Illustration:" alt text.

## Engineering

- Single sources in `lib/`: `site-config.ts`, `nav.ts`, `conditions.ts`, `service-badges.ts`, `booking-context.ts`, `whatsapp.ts`, `consent.ts`, `schema.ts`.
- Cards use the stretched-link pattern; never nest interactive elements.
- `useSyncExternalStore` getSnapshot must return a cached value.
- No `content-visibility:auto` above the fold.
- `SITE_INDEXABLE` stays false until launch: noindex header, meta tag and robots Disallow on every host.
- No secrets in the repo. Keys live in Vercel env vars.
- Do not leave comments that mention AI tools or prompts in code. No `console.log` and no production source maps.
- Tests are Playwright, and every implementation phase keeps all earlier tests green.
- Image processing: never upscale; strip EXIF and GPS while preserving C2PA content credentials where present. Keep raw files untouched.

## Verified project workflow

- Node.js 22 is the current local runtime. Dependencies are exact-pinned; ESLint 9 and TypeScript 6 match the installed Next lint plugins. Keep Playwright, playwright-core and the test runner on the same version to avoid axe Page type mismatches.
- Build with `npm run build`; verify with `npm run lint`, `npm run typecheck`, `npm run format:check`, `npm run test:images`, and `npm test`. Playwright expects a production build, starts or reuses the server on port 3000, and saves its report locally.
- `npm run images` generates public assets; `npm run test:images` checks two repeat runs, unchanged sources, no upscaling/EXIF, logo alpha masks, and preserved provenance originals. OG font downloads are cached in `.cache/image-fonts/` after the first run. Hero/portrait crops have prebuilt responsive AVIF/WebP variants so the LCP portrait does not depend on first-request image encoding.
- `npm run start` serves the local production preview; review `/styleguide/` directly. Do not add a public link to this hidden noindex route.
- The reference capture uses `python -m http.server 4174 --bind 127.0.0.1` from `resources/design/`, then `npm run qa:reference` from the root. It captures 390/1440 reference images and composes reference-left/implementation-right comparisons when styleguide screenshots exist.
- Browser screenshots and comparison PNGs are in `artifacts/`; run `npm run qa:lighthouse` separately from other browser/CPU-heavy tests for meaningful measurements. Never report old or failed scores as current.
- `npm run launch-check` must remain blocked while confirmations and noindex are unresolved. A preview build is not permission to launch.
- Do not put a Next streaming `loading.tsx` boundary around this static styleguide: disabled JavaScript otherwise leaves the loading fallback visible instead of the actual page.
- Preserved C2PA originals live under `public/images/provenance/` with a hash manifest. Decision (Phase 1 close): processed derivatives are unsigned and that is accepted; disclosure is handled by the Editorial policy page and "Illustration:" alt text. Nothing is re-signed. Never describe derivatives as retaining valid original signatures.
- Performance budget: the LCP <2.0s target applies to real pages (Home, care pages), measured on the deployed preview as the median of 3 mobile runs. `/styleguide` is a heavy specimen page and is exempt. Re-measure on Home in Phase 4.
- The dev-only lint dependency advisory is accepted while `npm audit --omit=dev` stays clean. Re-check in Phase 8.
