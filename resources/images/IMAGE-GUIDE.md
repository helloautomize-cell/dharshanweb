# Rehabify image guide

Phase 0 inventory, 12 October 2026. Targets, verdicts, crops and approval status follow `resources/docs/IMAGE-MAP.md`. No images were renamed, resized, recompressed, recoloured or exported during this phase.

## Source preservation and verdicts

- `_source/` preserves the complete handoff `images/` tree, including its `clinic/.keep` directory marker. This marker is not an image and has no public target.
- `brand/` and `doctors/` are byte-for-byte working copies of the received assets, with the same filenames.
- `clinic/` is empty pending real clinic photos.
- Inventory: 16 images, 15 KEEP, 1 REFERENCE, 0 REJECT. No unknown image files.
- KEEP means retain for the mapped use, not independently verified written approval. The image map records agency-relayed doctor approval on 12 October 2026; the agency must retain the doctors' written approvals.
- All 11 doctor PNGs are classified by the map as approved AI-assisted images. The real portrait JPG remains REFERENCE, with no default production output.
- Public targets below are future outputs of the Phase 1 image-processing pipeline; `public/images/` has not been created.

## Brand assets

Paths are relative to `resources/images/`. Each source also exists under `_source/` at the same relative path.

| File                      | What it shows / intended use                                                                                 | Actual size in px | Verdict | Target path                                           | Treatment                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------- | ------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `brand/mark-original.png` | Original Rehabify spine and brush-R mark in ice; night hero watermark, footer, mega preview and placeholders | 493 x 493         | KEEP    | `public/images/brand/mark-ice.png` and WebP variants  | Preserve shape and alpha. Generate density variants only within source resolution. Map caps on-screen mark at about 240px pending a larger original. |
| `brand/mark-blue.png`     | Blue brand mark; light navigation and paper sections                                                         | 249 x 380         | KEEP    | `public/images/brand/mark-blue.png` and WebP variants | Preserve aspect ratio and alpha; no stretching or upscaling. Map requests density variants, subject to actual source resolution.                     |
| `brand/mark-white.png`    | White brand mark; use over photos                                                                            | 249 x 380         | KEEP    | `public/images/brand/mark-white.png`                  | Preserve shape, aspect ratio and alpha; no upscaling. Check contrast over the actual image.                                                          |
| `brand/mark-navy.png`     | Navy brand mark; print and client PDF                                                                        | 249 x 380         | KEEP    | `public/images/brand/mark-navy.png`                   | Preserve shape, aspect ratio and alpha; respect native resolution for print.                                                                         |

## Doctor assets

Use the mapped alt text from IMAGE-MAP section 2. Scene images use the prescribed `Illustration:` prefix. Do not infer new medical facts from imagery. Keep faces and clinically relevant hands/instruments within crops.

| File                                  | What it shows / intended use                                                                                     | Actual size in px | Verdict   | Target path(s)                                                                                 | Treatment                                                                                                                                         |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------- | --------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `doctors/dr-dharshan-hero.png`        | Dr. Dharshan in a white coat, arms crossed in a rehabilitation corridor; home front arch, profile and cards      | 1122 x 1402       | KEEP      | `public/images/doctors/dr-dharshan-hero.jpg`, `public/images/doctors/dr-dharshan-portrait.jpg` | Two mapped 4:5 outputs; preserve face and pose. Apply arch in layout, not by altering raw source. Approved per map.                               |
| `doctors/dr-dharshan-desk.png`        | Dr. Dharshan seated at a desk with a stethoscope; home doctor feature and About                                  | 1122 x 1402       | KEEP      | `public/images/doctors/dr-dharshan-desk.jpg`                                                   | 4:5 crop; retain face, hands and stethoscope. Approved per map.                                                                                   |
| `doctors/dr-dharshan-avatar.png`      | Dr. Dharshan portrait; mega menu, booking selection, reviewer box and bylines                                    | 1254 x 1254       | KEEP      | `public/images/doctors/dr-dharshan-avatar.jpg` (512px and 160px variants)                      | 1:1, face-centred. Preserve likeness; no retouching. Approved per map.                                                                            |
| `doctors/dr-dharshan-exam.png`        | Illustration of Dr. Dharshan measuring knee movement with a goniometer; consultation, Why Rehabify and Knee pain | 1536 x 1024       | KEEP      | `public/images/doctors/dr-dharshan-exam.jpg`                                                   | 3:2; retain clinical action and instrument. Use mapped Illustration alt text. Approved per map.                                                   |
| `doctors/dr-dharshan-video.png`       | Illustration of Dr. Dharshan during a video consultation; video hero and care-track card                         | 1536 x 1024       | KEEP      | `public/images/doctors/dr-dharshan-video.jpg`                                                  | 3:2; keep doctor and consultation context visible. Use mapped Illustration alt text. Approved per map.                                            |
| `doctors/dr-dharshan-banner.png`      | Dr. Dharshan standing in a clinic corridor; desktop Plan your visit header                                       | 1376 x 768        | KEEP      | `public/images/doctors/dr-dharshan-banner.jpg`                                                 | Mapped 16:9 crop, slightly adjusted from native ratio; never stretch. Desktop-only placement. Approved per map.                                   |
| `doctors/dr-selina-hero.png`          | Dr. Selina in a white coat with a stethoscope; home back arch, profile and cards                                 | 1122 x 1402       | KEEP      | `public/images/doctors/dr-selina-hero.jpg`, `public/images/doctors/dr-selina-portrait.jpg`     | Two mapped 4:5 outputs; preserve face and stethoscope. Apply arch in layout. Approved per map.                                                    |
| `doctors/dr-selina-desk.png`          | Dr. Selina at her desk; profile working approach and About                                                       | 1536 x 1024       | KEEP      | `public/images/doctors/dr-selina-desk.jpg`                                                     | 3:2 crop; preserve doctor and desk context. Approved per map.                                                                                     |
| `doctors/dr-selina-avatar.png`        | Dr. Selina portrait; mega menu, booking selection and reviewer box                                               | 1254 x 1254       | KEEP      | `public/images/doctors/dr-selina-avatar.jpg`                                                   | 1:1, face-centred; derivative sizes to be specified in Phase 1 without upscaling. Approved per map.                                               |
| `doctors/dr-selina-exam.png`          | Illustration of Dr. Selina guiding shoulder movement; Stroke, Shoulder pain and Spinal cord injury               | 1536 x 1024       | KEEP      | `public/images/doctors/dr-selina-exam.jpg`                                                     | 3:2; retain clinically relevant hands and movement. Use mapped Illustration alt text. Approved per map.                                           |
| `doctors/dr-selina-video.png`         | Illustration of Dr. Selina on a video consultation; second video consultation card                               | 1536 x 1024       | KEEP      | `public/images/doctors/dr-selina-video.jpg`                                                    | 3:2; keep doctor and laptop context visible. Use mapped Illustration alt text. Approved per map.                                                  |
| `doctors/dr-selina-real-portrait.jpg` | Real reference portrait of Dr. Selina                                                                            | 913 x 1280        | REFERENCE | None by default                                                                                | Preserve for reference. Use on her profile only if she prefers the real photo and approves its use; do not include in default production exports. |

Doctor JPEG targets follow the Phase 1 pipeline brief (JPEG quality 85, or PNG where alpha is needed) and plan section 7's file format. IMAGE-MAP overrides the older table's source filenames, target basenames, crops and approval status. Next.js serves AVIF/WebP through its image optimiser; these are not assumed to be separately exported public files. Density/size suffixes are not finalised in Phase 0.

## Global processing requirements for Phase 1

- Never upscale, change logo shape, redraw the logo as SVG, or stretch images to a target ratio.
- Keep `_source/` intact. Generate derivatives only through the image script.
- Strip EXIF and GPS from public outputs while preserving C2PA content credentials where present. Verify encoder support rather than claiming preservation without checking.
- Reserve dimensions for rendered images and prioritise the actual LCP image. Do not animate the LCP element.
- Track image approvals in `lib/site-config.ts`. New/replaced doctor images need fresh written approval. Do not create approval flags in resource-only Phase 0.
- Do not replace clinic images with stock photos of other doctors, hospitals or patients.

## Pending clinic photos

None have arrived. All must be real photos, landscape, at least 2400px wide, with patient consent where applicable and no readable sensitive information. Exact future source filenames and uses are in IMAGE-MAP section 3:

- Entrance and rooms: `clinic-entrance.jpg`, `clinic-reception.jpg`, `clinic-consult-room.jpg`, `clinic-therapy-area.jpg`.
- Assessment and therapy: `clinic-rom-measure.jpg`, `clinic-gait-training.jpg`, `clinic-ultrasound.jpg`, `clinic-hand-therapy.jpg`, `clinic-child-therapy.jpg`, `clinic-balance-older.jpg`, `clinic-sports-rehab.jpg`, `clinic-prosthetic.jpg`.
- Home practice and team: `clinic-home-programme.jpg`, `clinic-team.jpg`.

Use only the map's specified interim treatments in future implementation. Do not generate substitute clinical photos in Phase 0.

## Disagreements and clarifications

1. All 12 doctor image dimensions match IMAGE-MAP. The original mark is 493 x 493 as documented. No verdict or target-basename changes are proposed.
2. The three recoloured marks are 249 x 380, not square 493px assets. IMAGE-MAP does not state their dimensions; its general largest-original/about-240px guidance must not be treated as a universal export budget. At 2x their maximum natural CSS footprint is 124.5 x 190px; at 3x it is 83 x approximately 126.7px. Use each source's actual dimensions when generating density variants.
3. The generated `icon.png` target is 512px, greater than the 493px original canvas. In Phase 1, place the un-upscaled mark within a newly composed 512px tile, rather than enlarging the source. Generated favicon/Apple icon/OG assets are not received images and are not created here.
4. The map uses rounded crop names: 1122 x 1402 is approximately 4:5, and 1376 x 768 is approximately 16:9. A small real crop is required for exact ratios; do not stretch or change the map.
5. Written approvals themselves are not included in the package. Approval status here is the map's recorded agency relay, not independent verification of signatures or C2PA credentials.

No sources rejected. Preserve the image map unchanged and carry these resolution/approval notes into Phase 1.
