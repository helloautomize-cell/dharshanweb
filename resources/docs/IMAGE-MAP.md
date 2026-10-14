# Image map · Rehabify (final, for the coding agent)

This is the single source for every image on the site: where each file comes from, what it is renamed to, where it is used, how it is cropped, its alt text and whether it is approved. `scripts/process-images.mjs` reads `resources/images/` and writes `public/images/`. Never upscale. Strip EXIF and GPS. Keep C2PA content credentials on AI-assisted images.

Approval rule: every doctor image is AI-assisted from the doctor's real photo. All current doctor images were approved on 12 Oct 2026. Any new or replaced doctor image needs a fresh written approval before it goes live. Keep a flag per image in `lib/site-config.ts` (`imageApprovals`), and keep the image out of production builds while its flag is false. `npm run launch-check` fails if a production page uses an unapproved image.

---

## 1. Brand (resources/images/brand/)

| Source                                     | Output (public/images/brand/)                 | Use                                                                |
| ------------------------------------------ | --------------------------------------------- | ------------------------------------------------------------------ |
| mark-original.png (493 x 493, ice #D9EDF3) | mark-ice.png @1x/2x/3x + webp                 | Night surfaces: hero watermark, footer, mega preview, placeholders |
| mark-blue.png                              | mark-blue.png @1x/2x/3x + webp                | Nav on light glass, paper sections                                 |
| mark-white.png                             | mark-white.png                                | On photos                                                          |
| mark-navy.png                              | mark-navy.png                                 | Print and the PDF report                                           |
| (generated)                                | favicon.ico, icon.png 512, apple-icon.png 180 | Mark on a #0A1626 rounded tile                                     |
| (generated)                                | og-base.png 1200 x 630                        | Night background, ice mark, page title set in Bricolage Grotesque  |

The logo shape never changes. Recolour by tinting the alpha mask only. No SVG redraw. The largest original is only 493px, so never show the mark above about 240px on screen until the client sends a larger file.

## 2. Doctors (resources/images/doctors/)

| Source file (already named) | Size        | Output crops                                       | Used on                                                                          | Alt text                                                                     | Status               |
| --------------------------- | ----------- | -------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------- |
| dr-dharshan-hero.png        | 1122 x 1402 | dr-dharshan-hero (4:5), dr-dharshan-portrait (4:5) | Home hero front arch, profile hero, doctor cards                                 | Dr. Dharshan N A in a white coat, arms crossed, in a rehabilitation corridor | Approved 12 Oct 2026 |
| dr-dharshan-desk.png        | 1122 x 1402 | dr-dharshan-desk (4:5)                             | Home "Meet the doctor" large photo, About                                        | Dr. Dharshan N A seated at a desk with a stethoscope                         | Approved 12 Oct 2026 |
| dr-dharshan-avatar.png      | 1254 x 1254 | dr-dharshan-avatar (1:1, 512 and 160)              | Mega menu, booking form doctor choice, reviewer box, post bylines                | Dr. Dharshan N A                                                             | Approved 12 Oct 2026 |
| dr-dharshan-exam.png        | 1536 x 1024 | dr-dharshan-exam (3:2)                             | Journey step 2 "First consultation", Why Rehabify, Knee pain                     | Illustration: Dr. Dharshan N A measuring knee movement with a goniometer     | Approved 12 Oct 2026 |
| dr-dharshan-video.png       | 1536 x 1024 | dr-dharshan-video (3:2)                            | Video consultation hero, stacking card "Video consult"                           | Illustration: Dr. Dharshan N A explaining during a video consultation        | Approved 12 Oct 2026 |
| dr-dharshan-banner.png      | 1376 x 768  | dr-dharshan-banner (16:9)                          | Plan your visit header (desktop only)                                            | Dr. Dharshan N A standing in a clinic corridor                               | Approved 12 Oct 2026 |
| dr-selina-hero.png          | 1122 x 1402 | dr-selina-hero (4:5), dr-selina-portrait (4:5)     | Home hero back arch, her profile hero, doctor cards                              | Dr. Selina Kh in a white coat with a stethoscope                             | Approved 12 Oct 2026 |
| dr-selina-desk.png          | 1536 x 1024 | dr-selina-desk (3:2)                               | Her profile "How she works", About                                               | Dr. Selina Kh at her desk                                                    | Approved 12 Oct 2026 |
| dr-selina-avatar.png        | 1254 x 1254 | dr-selina-avatar (1:1)                             | Mega menu, booking doctor choice, reviewer box                                   | Dr. Selina Kh                                                                | Approved 12 Oct 2026 |
| dr-selina-exam.png          | 1536 x 1024 | dr-selina-exam (3:2)                               | Stroke, Shoulder pain, Spinal cord injury                                        | Illustration: Dr. Selina Kh guiding a shoulder movement                      | Approved 12 Oct 2026 |
| dr-selina-video.png         | 1536 x 1024 | dr-selina-video (3:2)                              | Video consultation page (second card)                                            | Illustration: Dr. Selina Kh on a video consultation                          | Approved 12 Oct 2026 |
| dr-selina-real-portrait.jpg | 913 x 1280  | (none by default)                                  | Reference photo. Use it only if Dr. Selina prefers her real photo on her profile | Dr. Selina Kh                                                                | Reference            |

Approval (12 Oct 2026): both doctors approved all their images as they are, as relayed by the agency, including the mixed glasses styles in Dr. Dharshan's set. Keep the doctors' written approvals on file with the agency. Set every `imageApprovals` flag in `lib/site-config.ts` to true.

Placeholder: the "Photo to be added" arch (night gradient + ice mark + mono label) stays in the codebase. It is used automatically for any doctor whose images are not approved.

## 3. Clinic photos (real photos, arriving later, resources/images/clinic/)

Name each file exactly as below when it arrives. All landscape, at least 2400px wide, no patient faces without written consent, nothing readable on screens or papers.

| File name                 | Shows                                         | Used on                              | Until it arrives                   |
| ------------------------- | --------------------------------------------- | ------------------------------------ | ---------------------------------- |
| clinic-entrance.jpg       | Entrance with the Rehabify signboard          | Visit band, Plan your visit, Contact | Night "Visit" card without a photo |
| clinic-reception.jpg      | Reception or waiting area                     | Journey step 1, About                | Step shows the vertebra graphic    |
| clinic-consult-room.jpg   | Consultation room                             | Journey step 2, About                | dr-dharshan-exam                   |
| clinic-rom-measure.jpg    | Goniometer on a knee or elbow, staff as model | Home goniometer section, step 6      | Code-drawn goniometer only         |
| clinic-therapy-area.jpg   | Mats, parallel bars, steps, bands             | Journey step 4, Neuro hub            | Night illustration panel           |
| clinic-gait-training.jpg  | Walking between parallel bars                 | Stroke, Spinal cord injury           | Badge only                         |
| clinic-ultrasound.jpg     | Ultrasound machine, no brand visible          | Image-guided injections              | Badge only                         |
| clinic-hand-therapy.jpg   | Hands with putty or pegboard                  | Stroke, Spasticity                   | Badge only                         |
| clinic-child-therapy.jpg  | Child session, parent present, consent        | Children's hub, Cerebral palsy       | Badge only                         |
| clinic-balance-older.jpg  | Older adult balance work, consent             | Older adults, Falls and balance      | Badge only                         |
| clinic-sports-rehab.jpg   | Band, step-down, ladder                       | Sports injuries                      | Badge only                         |
| clinic-prosthetic.jpg     | Walking with a prosthesis, consent            | Prosthetic rehab                     | Badge only                         |
| clinic-home-programme.jpg | Phone or sheet with exercises, no names       | Journey step 5, stacking card        | Code-drawn phone mock              |
| clinic-team.jpg           | Doctors with therapists                       | About, Our doctors                   | Two doctor cards                   |

Journey step map (Home, 6 steps): Book → clinic-reception · First consultation → clinic-consult-room or dr-dharshan-exam · Your goals → clinic-rom-measure · Your plan → clinic-therapy-area · Practice at home → clinic-home-programme · Review and adjust → clinic-rom-measure.

Never use stock photos of other doctors, hospitals or patients.

## 4. Service badges (drawn in code, prompt P1b)

28 SVGs in `resources/badges/src/{slug}.svg`, exported to `public/images/icons/services/{slug}.{png,webp}` at 512 and 256. Mapping (care page → badge):

| Page                       | Badge slug                 | Page                            | Badge slug         |
| -------------------------- | -------------------------- | ------------------------------- | ------------------ |
| Pain and spine (hub)       | pain-spine                 | Joints and sports (hub)         | joints             |
| Back pain                  | back-pain                  | Knee pain                       | knee               |
| Neck pain                  | neck-pain                  | Shoulder pain                   | shoulder           |
| Sciatica                   | sciatica                   | Sports injuries                 | sports             |
| Image-guided injections    | injection                  | After fracture or surgery       | fracture           |
| Neuro rehabilitation (hub) | neuro                      | PRP and prolotherapy            | prp                |
| Stroke                     | stroke                     | Prosthetic rehab                | prosthesis         |
| Spinal cord injury         | spinal-cord                | Children's rehabilitation (hub) | children           |
| Head injury                | head-injury                | Cerebral palsy                  | cerebral-palsy     |
| Parkinson's                | parkinsons                 | Muscular dystrophy              | muscular-dystrophy |
| Spasticity                 | spasticity                 | Developmental delay             | development        |
| Video consultation         | video                      | Older adults (hub)              | older-adults       |
| Doctor badge (menus only)  | doctor-male, doctor-female | Falls and balance               | balance            |
|                            |                            | Osteoporosis                    | bones              |

Alt text: "Illustration of [subject]" (decorative copies inside cards use `alt=""` because the card title says it).

## 5. Icons (prompt P1c)

Lucide, stroke 1.75, at 32px and under only. Drawn in code: body map (front and back), goals ring, care index icons. No icon fonts and no emoji. (Phase 7g retired the goniometer and the decorative spine motif; the Journey section keeps its inline spine path by client decision.)

## 6. Illustrations (AI, resources/images/illustrations/)

AI-generated artwork, not doctor likenesses, so the doctor approval flag does not apply. Alt text carries the "Illustration:" prefix.

| Source file                  | Size        | Output (public/images/illustrations/)      | Used on                   | Alt text                                   |
| ---------------------------- | ----------- | ------------------------------------------ | ------------------------- | ------------------------------------------ |
| skeleton_front_1600x2400.png | 1600 x 2400 | body-front-{600,900,1200,1600}.{avif,webp} | Home body map, front view | Illustration: front view of the human body |
| skeleton_back_1600x2400.png  | 1600 x 2400 | body-back-{600,900,1200,1600}.{avif,webp}  | Home body map, back view  | Illustration: back view of the human body  |

body-front.png and body-back.png (1024 x 1536, heavier margin) are kept as alternates and are not processed. The dark background is baked into the artwork and is feathered into the night panel with a CSS mask, so keep both files on the same dark background.

## 7. Generated per page

`opengraph-image` per route from og-base: night background, ice mark, page H1 without the accent styling, "rehabify.in" in Geist Mono. Health Library covers are designed gradients with the post's badge, never photos with text.
