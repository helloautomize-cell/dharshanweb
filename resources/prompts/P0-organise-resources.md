# P0 · Organise the resources folder (no code yet)

What it does: puts every document, the design file and all images into one `resources/` folder in the repo, and writes the image guide. No website code yet.
Check before approving: the folder tree in the report matches the list below and the image guide has no "unknown" files.

```
# Phase 0: Organise resources

You are building a new Next.js website for Rehabify (https://www.rehabify.in/), a physical medicine and rehabilitation practice in Bengaluru, India. Doctors: Dr. Dharshan N A (lead) and Dr. Selina Kh. This step only organises files. Do not create the app yet.

I have unzipped the handoff package at the repo root as `_handoff/` with these folders: docs/, design/, images/, prompts/.

Before starting, list everything in `_handoff/` and confirm these paths exist:
- _handoff/docs/design-development-plan.md
- _handoff/docs/site-plan.md
- _handoff/docs/new-website-content.md
- _handoff/docs/IMAGE-MAP.md
- _handoff/docs/sitemap.md
- _handoff/docs/redirects.json
- _handoff/docs/entity-facts.md
- _handoff/design/rehabify-design-v3.html
- _handoff/images/brand/mark-original.png
- _handoff/images/doctors/dr-dharshan-hero.png
If any is missing, STOP and tell me. Do not substitute another file.

Tasks:
1. Create this structure by COPYING (never moving or editing) from _handoff/:
   resources/docs/      every file in _handoff/docs/
   resources/design/    rehabify-design-v3.html (self-contained, images are embedded)
   resources/prompts/   every file in _handoff/prompts/ (for reference only)
   resources/images/_source/   every image exactly as received, same names
   resources/images/brand/     the 4 logo files
   resources/images/doctors/   the doctor images (names are already final, see IMAGE-MAP.md section 2)
   resources/images/clinic/    empty for now; real clinic photos arrive later and are named per IMAGE-MAP.md section 3
2. Copy _handoff/WINDSURF-RULES.md to the repo root as `.windsurfrules` (create the file if it does not exist; if one exists, STOP and show me both).
3. Open every image and write resources/images/IMAGE-GUIDE.md: file, what it shows, size in px, KEEP / REFERENCE / REJECT, target path in public/images/, treatment. Use IMAGE-MAP.md as the source of truth for targets and verdicts; flag any disagreement instead of changing it.
4. Add `_handoff/` to .gitignore. resources/ is committed.
Never ask me to rename files by hand.

## Report
- The tree of resources/ (2 levels)
- IMAGE-GUIDE.md summary and any disagreement with IMAGE-MAP.md
STOP after this. Do not start Phase 1.
```
