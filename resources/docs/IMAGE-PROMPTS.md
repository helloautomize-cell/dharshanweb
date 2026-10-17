# Image prompts · Rehabify

Ready-to-paste prompts for the doctor portraits, the clinic scenes and the service badges. Version 1 · 12 October 2026.
Slots, sizes and page usage are in `IMAGE-RESOURCES-NEEDED.md`. This file only says **how to make** each image.

Read this first (five rules that protect the doctors and the clinic):

1. **Real photographs always win.** A 20-minute phone shoot in daylight beats any generated image for trust. Use the prompts below only for what cannot be photographed yet.
2. **A doctor's portrait must look like that doctor.** Never invent a face for a real person. Every doctor image is made from the doctor's own real photo as a reference (image-to-image, or "reference image" in the tool). The doctor approves each final image in writing (`client-answers.md` Q42). Record the approval next to the file.
3. **Rooms and places that exist must be real photos.** The clinic entrance, reception and consultation room (C1, C2, C3), the team photo (C14) and the real ultrasound machine (C7) are photographed, not generated. A generated "clinic" would show patients a place that does not exist.
4. **Generated scenes are allowed only for generic activity** (exercise area, hand therapy, a home exercise sheet) and are always labelled as illustrations in the alt text and on the Editorial policy page. They never show a real patient, a before and after, a result or a branded device.
5. **Nothing in any image:** text, logos, brand names, medicine boxes, hospital names, red cross or plus, readable screens, watermarks, extra fingers or distorted hands. Check hands, teeth, glasses and the stethoscope before approving.

Tool tips: use one tool and one session per set so lighting and style match. Ask for 4 options, keep 1. Export PNG at the largest size the tool offers. Do not upscale with face-changing "enhancers". Keep the tool's content credentials (C2PA) in the file.

---

## Part A · Doctor portraits

### A0 · Shared style block (paste at the end of every doctor prompt)

> Photographed look, soft natural window light from the left, shallow depth of field, neutral cool colour grade with slightly lifted shadows, gentle warm highlights, real skin texture (no airbrushing), clean white medical coat with a thin dark collar line, a plain stethoscope with no brand, no name badge text, no logos, no jewellery that draws attention, background a softly blurred bright rehabilitation corridor in pale blue-grey and white. Calm, kind, confident expression. Sharp eyes. Natural hands. No text anywhere in the image.

Negative prompt, if the tool has one: `text, logo, watermark, red cross, plus sign, extra fingers, warped hands, plastic skin, heavy retouching, cartoon, uncanny eyes, brand names, hospital signs`.

**How to use the reference photo:** upload a clear, front-facing, well-lit selfie or portrait of the doctor (no sunglasses, no heavy filter) and add this line at the top of each prompt: `Keep this exact person's face, hair, skin tone, age and glasses (if worn) unchanged. Only change the clothing, pose and background as described.`

### Dr. Dharshan N A (D1 to D5)

He already has 5 generated portraits (`doctors/photos/dharshan/`). Reuse them if he approves each one in writing. These prompts make the missing shots (D4, D5) and larger replacements.

**D1 · Hero portrait** (4:5, at least 2000px tall)

> [reference line] Waist-up portrait of a male rehabilitation doctor in his early thirties, standing with his arms loosely crossed, white coat over a dark olive shirt, soft confident smile looking at the camera, space above his head for an arched crop. 4:5 vertical. [A0 style block]

**D2 · At the desk** (3:2 or 4:5)

> [reference line] The same doctor seated at a clean desk by a window, stethoscope resting around his neck, one hand on a closed notebook, turned slightly toward the camera with a warm look. Nothing readable on the desk. [A0 style block]

**D3 · Square headshot** (1:1, 1000px or more)

> [reference line] Head and shoulders, centred, plain soft blue-grey background with a very light gradient, white coat collar visible, friendly neutral smile, even light. 1:1 square, circle-safe crop with space around the head. [A0 style block, but background plain, not a corridor]

**D4 · Examining a patient** (3:2, at least 2400px wide)

> [reference line] The doctor in a bright consultation room gently guiding a seated adult's knee with one hand while holding a plastic goniometer against the leg with the other, measuring range of motion. The patient is shown from the side and behind, face not visible, wearing plain grey clothing. The doctor looks at the knee, calm and attentive. No machines with logos. 3:2 horizontal. [A0 style block]

**D5 · On a video call** (3:2)

> [reference line] The doctor at a tidy desk talking to a laptop camera with a gentle smile, one hand slightly raised as if explaining. The laptop screen is not visible to us (seen from behind or at a steep angle, no readable content). A plant and a window in the background. 3:2 horizontal. [A0 style block]

### Dr. Selina Kh (S1 to S5)

Same five shots. **Do not generate any of these until she has sent a real reference photo.** Until then the website shows the "Photo to be added" arch.

**S1 · Hero portrait** (4:5)

> [reference line] Waist-up portrait of a female rehabilitation doctor standing with her hands relaxed in front of her, white coat, soft confident smile looking at the camera, space above her head for an arched crop. 4:5 vertical. [A0 style block]

**S2 · At the desk**

> [reference line] The same doctor seated at a clean desk by a window, stethoscope around her neck, turned slightly toward the camera with a warm look, one hand resting on the desk. Nothing readable on the desk. [A0 style block]

**S3 · Square headshot** (1:1)

> [reference line] Head and shoulders, centred, plain soft blue-grey background, white coat collar visible, friendly neutral smile, even light, circle-safe crop. [A0 style block, plain background]

**S4 · Guiding a patient** (3:2)

> [reference line] The doctor in a bright consultation room gently supporting an adult's arm during a shoulder movement exercise. The patient is seen from behind, face not visible, in plain grey clothing. The doctor is attentive and encouraging. 3:2 horizontal. [A0 style block]

**S5 · On a video call** (3:2)

> [reference line] The doctor at a tidy desk talking to a laptop camera with a gentle smile. The laptop screen is not visible to us. A window and a plant behind her. 3:2 horizontal. [A0 style block]

### Doctor image checklist (before sending for approval)

- Does it look like the doctor, at their real age? Would a patient recognise them at the clinic?
- Coat, stethoscope, hands and glasses look natural. No text, logos or odd objects.
- File named `dr-dharshan-d1.png` and so on (the coding agent renames them).
- Send each image to the doctor with: "Please reply 'approved' for each image you are happy to have on the Rehabify website. These images are AI-assisted from your own photo." Save the replies.

---

## Part B · Clinic and rehab scenes

**Photograph, do not generate:** C1 entrance with signboard · C2 reception · C3 consultation room · C4 goniometer in use (real, with staff as model) · C7 ultrasound machine (your real one) · C14 team photo.

**May be generated as labelled illustrations** (generic activity, no real place): C5, C6, C8, C9, C10, C11, C12, C13. Better still, replace each with a real photo when you have one.

### B0 · Shared style block (paste at the end of every scene prompt)

> Documentary photograph, soft daylight from a large window, clean modern rehabilitation space in pale blue-grey, white and light wood, uncluttered, shallow depth of field, natural colours with a cool grade and a hint of warm highlights, 3:2 horizontal, high resolution. No text, no logos, no brand names on any equipment, no screens with content, no red cross or plus sign, no watermarks. People are shown from the side or behind, faces not the focus, plain grey or navy clothing. Natural hands and posture.

| #   | Prompt                                                                                                                                                                                                             |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| C5  | An exercise and therapy area: a padded mat, parallel bars, three low steps, resistance bands on a wall rack, a balance board. A physiotherapist in plain navy scrubs adjusts the height of the parallel bars. [B0] |
| C6  | An adult walking slowly between parallel bars with a physiotherapist standing beside them, one hand near their back for safety. Seen from the side at floor height. [B0]                                           |
| C8  | Close-up of an adult's hands gripping a soft therapy putty ball, a wooden pegboard beside them, a therapist's hands guiding gently. Only hands visible. [B0]                                                       |
| C9  | A child of about six taking steps toward a parent's outstretched hands on a soft play mat, a therapist crouching nearby. Seen from behind, faces not visible, bright and gentle. [B0]                              |
| C10 | An older adult standing beside a sturdy handrail doing a gentle balance exercise, a therapist beside them. Seen from the side, calm and safe. [B0]                                                                 |
| C11 | A young adult doing a step-down exercise with a resistance band around the knees, a low box and agility ladder on the floor, an athletic but plain outfit with no logos. [B0]                                      |
| C12 | Lower body only: a person walking on a smooth floor with a below-knee prosthetic leg, a handrail beside them, a therapist's hand near. No brand on the prosthesis. [B0]                                            |
| C13 | A phone lying on a wooden table showing a simple stick-figure exercise sheet (generic shapes only, no readable words), a yoga mat rolled beside it, morning light. [B0]                                            |

**Label:** alt text for every generated scene starts with "Illustration:". The Editorial policy page already explains AI-assisted images.

---

## Part C · Service badges (built in code with the Windsurf agent)

You decided to create the 26 badges with the coding agent instead of an image tool. That works well, and the result is crisp at every size. Paste this prompt into the agent after Phase 1 is approved (it needs the tokens and the badge slots from `service-badges.ts`).

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

If you prefer illustrated PNG badges from an image tool instead, the original palette-filled prompt is in `IMAGE-RESOURCES-NEEDED.md` section 4, and `process-images.mjs` already knocks out the off-white background.

---

## Batch review log (images the client sends for approval and mapping)

Images arrive in batches of up to ten. For each batch we record: file, what it shows, size, verdict (KEEP / REFERENCE / REJECT), slot (D1 to D5, S1 to S5, C1 to C14), treatment, and whether written approval is on file. The coding agent receives the final mapping as `IMAGE-GUIDE.md` input.

### Batch 0 (12 Oct 2026, from Practo, Dr. Dharshan N A)

| File                                                                 | Shows                                                                   | Size      | Verdict   | Notes                                                                                          |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------- | --------- | ---------------------------------------------------------------------------------------------- |
| `doctors/photos/dharshan/reference/practo-portrait-black-shirt.png`  | Real portrait, black shirt, arms crossed, glasses, plain cloth backdrop | 500 x 684 | REFERENCE | Practo watermark, low resolution. Use as the likeness reference for D1 to D5. Not for the site |
| `doctors/photos/dharshan/reference/practo-fullbody-white-blazer.png` | Real full-length photo, white blazer, event backdrop with flowers       | 500 x 667 | REFERENCE | Watermark, low resolution, wrong setting. Likeness reference only                              |

### Batch 1 (12 Oct 2026, ten AI images: five of Dr. Dharshan, five of Dr. Selina Kh)

Files copied to `/mnt/project-files/doctors/photos/batch1/`. Sizes: portraits 1122 x 1402, squares 1254 x 1254, scenes 1536 x 1024 (big enough for 2x display at the sizes in design v3; the banner and large scenes need a larger export later).

| Slot | File               | Verdict                                        | Notes                                                                                                                                                             |
| ---- | ------------------ | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1   | dharshan-d1-hero   | KEEP, pending his written approval             | Clean hands, stethoscope, corridor. Likeness close to his real photo, but rimless glasses where his real glasses are dark metal frames: ask him                   |
| D2   | dharshan-d2-desk   | KEEP, pending approval                         | Same person as D1. Notebook and hand fine                                                                                                                         |
| D3   | dharshan-d3-square | KEEP, pending approval                         | Slightly rough hair edge near the top left and a lens flare, fine at avatar size. Circle-safe                                                                     |
| D4   | dharshan-d4-exam   | KEEP, pending approval                         | Goniometer is plausible. The patient is a back view, no face. Hair is lighter and the plaid shirt differs from D1 to D3: acceptable as a scene but check likeness |
| D5   | dharshan-d5-video  | HOLD                                           | Reads as a different person: round dark glasses, shorter hair, rounder face. Regenerate from the real photo (prompt D5 in Part A)                                 |
| S1   | selina-s1-hero     | KEEP pending her approval (cleared in Batch 2) | Good quality                                                                                                                                                      |
| S2   | selina-s2-desk     | KEEP pending her approval                      | Laptop corner and hand fine                                                                                                                                       |
| S3   | selina-s3-square   | KEEP pending her approval                      | Circle-safe                                                                                                                                                       |
| S4   | selina-s4-exam     | KEEP pending her approval                      | Patient back view, no face. Arm lift pose is natural                                                                                                              |
| S5   | selina-s5-video    | KEEP pending her approval                      | Laptop angled away, no screen content                                                                                                                             |

**Dr. Selina Kh set: was on hold, now cleared in Batch 2 (see below).** The five images are consistent with each other, but we have no real reference photo of her, so they show an invented face. A patient meeting her would not recognise it. Before they are used, she must send a clear photo, and the set must be regenerated or confirmed in writing as an acceptable likeness. Until then the site keeps the "Photo to be added" placeholder.

**Dr. Dharshan set:** D1 to D4 can go to the website once he approves each in writing. D5 needs a redo.

### Mapping for the coding agent (draft, becomes final after approval)

| Source file                                                                                                                                                | Target (public/images/doctors/)                 | Crop     | Alt text                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------- | ------------------------------------------------------------------------------ |
| dharshan-d1-hero                                                                                                                                           | dr-dharshan-hero.jpg                            | 4:5      | "Dr. Dharshan N A in a white coat, arms crossed, in a rehabilitation corridor" |
| dharshan-d2-desk                                                                                                                                           | dr-dharshan-portrait.jpg                        | 4:5      | "Dr. Dharshan N A at a desk with a stethoscope"                                |
| dharshan-d3-square                                                                                                                                         | dr-dharshan-avatar.jpg                          | 1:1      | "Dr. Dharshan N A"                                                             |
| dharshan-d4-exam                                                                                                                                           | dr-dharshan-exam.jpg                            | 3:2      | "Illustration: Dr. Dharshan N A measuring knee movement with a goniometer"     |
| dharshan-d5-video                                                                                                                                          | dr-dharshan-video.jpg                           | 3:2      | after regeneration                                                             |
| selina-s1 to s5                                                                                                                                            | dr-selina-{hero,portrait,avatar,exam,video}.jpg | as above | after approval and regeneration                                                |
| Alt text for AI-assisted images says "Illustration:" for scenes (D4, S4, D5, S5) and is factual for portraits. Disclosure is on the Editorial policy page. |

### Batch 2 (12 Oct 2026)

| Slot                   | File                                                                      | Verdict                                               | Notes                                                                                                                                                                                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D5 (replaces first D5) | `doctors/photos/batch1/dharshan-d5-video-v2.png` (1536 x 1024)            | KEEP, pending approval                                | Open-hand explaining gesture, laptop angled away, anatomical skeleton model in the background. The round dark glasses match his real Practo photo. **D1 to D4 show rimless glasses, so the set is not consistent: ask him which he wears, and regenerate the others to match if it is the dark frames.** Hands look natural |
| Reference for S1 to S5 | `doctors/photos/selina/reference/rehabify-site-portrait.jpg` (913 x 1280) | REFERENCE, and usable as a real photo if she approves | Taken from the Rehabify site as supplied by the client. Beige blazer, blue vest, grey cloth backdrop. Good enough size for the site at 1x and 2x, but not the doctor-coat look of the other portraits                                                                                                                       |

**Dr. Selina Kh set (S1 to S5, batch 1): now KEEP, pending her written approval.** The face, hair and features match her real photo, so the earlier concern (an invented face) is resolved. Remaining conditions: she approves each image in writing, and the images are labelled as AI-assisted. Optionally also use her real photo as a plain portrait (for example the profile page) if she prefers it. The page text on rehabify.in does not describe the photo, so I could not check the live page image myself. The match above is against the file you sent.

---

**Update 12 Oct 2026:** both doctors approved all their images. The final list and status are in `IMAGE-MAP.md`, which overrides anything above.
