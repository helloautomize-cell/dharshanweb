# Image resources needed · Rehabify (rehabify.in)

Collect everything below in one folder (Google Drive or zip). **Do not rename files**: the coding agent sorts and renames them. Send originals at full size (WhatsApp compresses photos; use Drive, email as "document", or a cable).

Priority: 🔴 needed to start the build · 🟠 needed before the preview goes to Dr. Dharshan · 🟢 nice to have

Total: 1 logo set · doctor photos for both doctors (5 each; 4 of Dr. Dharshan's in hand) · 14 clinic and step photos · 26 service badges (built in code, see `IMAGE-PROMPTS.md` part C) · 2 doctor badges · 1 Google rating note.

**Ready-to-paste image prompts for the doctor portraits and the clinic scenes are in `IMAGE-PROMPTS.md`.** Real photographs are always preferred. Dr. Selina Kh needs the same five shots as Dr. Dharshan (section 2b).

What we already have (in `/mnt/project-files/`):

- Logo mark PNG, 493 x 493, pale ice blue (`website/brand/rehabify-logo-original.png`) and our recolours (blue, navy, white).
- 5 AI-style portraits of Dr. Dharshan (`doctors/photos/dharshan/`), 1024 x 1024 and one 1376 x 768 banner.

---

## 1. Logo 🔴

| #   | File                                              | Spec                                                                                                                                                 | Status                                                           |
| --- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| L1  | Mark (spine + brush R), **largest original file** | The PSD, AI, Procreate or Canva file, or a PNG at least 2000px tall, transparent background                                                          | 🔴 Have only 493px. Needed for the hero and footer at large size |
| L2  | Wordmark                                          | Is there an approved "Rehabify" wordmark font or lettering? If not, we set "Rehabify" in Bricolage Grotesque Bold next to the mark (as in design v2) | 🔴 confirm                                                       |
| L3  | Colour codes                                      | Any official HEX values. Otherwise we use: ice #D9EDF3 (logo), blue #0A6E94, night #0A1626                                                           | 🟠                                                               |

Rules (agreed with you on 12 Oct 2026):

- The **shape never changes**. Colour may change to suit the surface: ice on night, blue on white, white on photos.
- Keep it as PNG. An SVG redraw would lose the brush texture. The coding agent makes trimmed 1x/2x/3x PNG and WebP sets, a favicon (mark only, on night tile) and the app icons.
- No red cross or red plus anywhere (Geneva Conventions Act, 1960). No "Best" or "No. 1" claims in the logo.

---

## 2. Dr. Dharshan N A photos

The current 5 portraits are AI-generated or AI-enhanced. They may be used **only with Dr. Dharshan's written approval of each image** (recorded in `client-answers.md` Q42). Real photos are preferred for trust.

| #   | Photo                   | Spec                                                                                                                             | Use                                       | Priority                                                                   |
| --- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------- |
| D1  | Hero portrait           | Standing, white coat, waist-up, facing camera, soft smile, softly blurred clinic corridor. **4:5, at least 2000px tall**         | Hero arch, profile hero                   | 🔴 (have: `dr-dharshan-1.png`, 1024px, needs approval or a larger version) |
| D2  | At the desk             | Seated, stethoscope, window light. 4:5 or 3:2, at least 2000px                                                                   | Doctor section, profile                   | 🟠 (have: `-2`, `-3`)                                                      |
| D3  | Square headshot         | Head and shoulders, plain background, at least 1000 x 1000                                                                       | Avatars, author chip, mega menu           | 🔴 (have: `-4`)                                                            |
| D4  | **Examining a patient** | Checking a knee, shoulder or back range of motion with a goniometer, or guiding an exercise. Landscape 3:2, at least 2400px wide | Step 2 "First consultation", Why Rehabify | 🟠                                                                         |
| D5  | **On a video call**     | Laptop on desk, him talking to camera, screen not readable                                                                       | Video consultation page, stacking card    | 🟠 (we currently mock this with `-3`)                                      |

Photo tips: daylight, no flash, clean coat, nothing with a medicine or device brand visible (boxes, pens, posters, equipment logos), no hospital logos (avoids implying a referral arrangement).

### 2b. Dr. Selina Kh photos (new, same specs as section 2)

| #   | Photo                                    | Use                                            | Priority |
| --- | ---------------------------------------- | ---------------------------------------------- | -------- |
| S1  | Hero portrait, 4:5, at least 2000px tall | Home hero (second arch), profile hero          | 🔴       |
| S2  | At the desk, 4:5 or 3:2                  | Doctor section, profile                        | 🟠       |
| S3  | Square headshot, 1000 x 1000             | Avatars, mega menu, booking form doctor choice | 🔴       |
| S4  | Examining or guiding a patient, 3:2      | Why Rehabify, stroke and spinal cord pages     | 🟠       |
| S5  | On a video call, 3:2                     | Video consultation page                        | 🟠       |

Until approved photos arrive, the site shows a "Photo to be added" arch with the logo mark (see design v3). Her written approval is needed for every image, exactly as for Dr. Dharshan.

---

## 3. Clinic and rehab photos

All landscape 3:2 or 16:9, at least 2400px wide. **Faces of patients only with written consent on file**; otherwise shoot hands, backs or use staff as models. No names, files or screens with patient data readable.

| #   | Photo                                                                                                                              | Used on                                  | Priority |
| --- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | -------- |
| C1  | **Clinic exterior or building entrance** with signboard [CONFIRM: does Rehabify have its own clinic or consult inside a hospital?] | Visit band, Plan your visit, Contact     | 🔴       |
| C2  | Reception or waiting area                                                                                                          | Step 1 "Book", About                     | 🟠       |
| C3  | Consultation room                                                                                                                  | Step 2, About                            | 🔴       |
| C4  | Range of motion being measured (goniometer on a knee or elbow)                                                                     | Home goniometer section, Step 6 "Review" | 🟠       |
| C5  | Exercise or therapy area (mat, parallel bars, steps, bands)                                                                        | Step 4 "Your plan", Neuro hub            | 🔴       |
| C6  | Gait training: patient walking with parallel bars or a walker                                                                      | Stroke, Spinal cord injury               | 🟠       |
| C7  | Ultrasound machine for image-guided procedures (no brand logo visible)                                                             | Image-guided injections                  | 🟠       |
| C8  | Hand and arm therapy (grip, pegboard, putty)                                                                                       | Stroke, Spasticity                       | 🟢       |
| C9  | Child therapy session (parent present, consent)                                                                                    | Children's hub, Cerebral palsy           | 🟠       |
| C10 | Older adult balance training (consent)                                                                                             | Older adults, Falls and balance          | 🟠       |
| C11 | Sports rehab (resistance band, step-down, ladder drill)                                                                            | Sports injuries                          | 🟢       |
| C12 | Prosthesis fitting or walking with a prosthesis (consent)                                                                          | Prosthetic rehab                         | 🟢       |
| C13 | Home programme: a phone or printed sheet with exercises (no names)                                                                 | Step 5 "Practice at home", stacking card | 🟢       |
| C14 | Team photo: Dr. Dharshan with therapists                                                                                           | About, Our doctors                       | 🟠       |

Step tracker map (Home, 6 steps): Book → C2 · First consultation → C3/D4 · Your goals → C4 · Your plan → C5 · Practice at home → C13 · Review and adjust → C4.

If real photos are not ready by Phase 4, the coding agent uses the night-stage illustrations from design v2 (no stock photos of other doctors or hospitals).

---

## 4. Service badges (illustrated PNGs) 🟠

Make these after the palette is approved. Design v2 uses large line icons on gradient blobs; the illustrated badges replace those icons on the care cards, hub heroes and the mega panel.

**Spec:** 1024 x 1024 PNG, one consistent style, plain off-white background (the coding agent removes it), no text, no logos, no brand names, no red cross.

**Prompt for the image tool (Rehabify palette filled in):**

> Circular medical service badge, clean continuous line-art illustration of **[subject]**, strokes in a gradient from deep night blue #0A1626 through Rehabify blue #0A6E94 to aqua #6FD0E6, with small warm apricot #F2B48A highlights and two tiny plus-sign sparkles, centred on a plain off-white background #F5F8FA, generous empty space around the subject, no text, no logos, no brand names, no red cross, flat premium editorial style, 1024x1024.

Make all of them in one session with the same seed or style reference so they match. Check that no two look alike.

| #   | Badge file         | Subject for the prompt                                                   | Page                                                                       |
| --- | ------------------ | ------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| B1  | pain-spine         | a side view of a spine with a soft glow at the lower back                | Pain and spine hub                                                         |
| B2  | back-pain          | a person bending slightly with a hand on the lower back                  | Back pain                                                                  |
| B3  | neck-pain          | a head and neck in profile with gentle motion arcs                       | Neck pain                                                                  |
| B4  | sciatica           | a leg outline with a nerve line running from the lower back to the foot  | Sciatica                                                                   |
| B5  | injection          | an ultrasound probe beside a fine needle, with sound-wave arcs           | Image-guided injections                                                    |
| B6  | neuro              | a brain outline connected to a short spinal cord                         | Neuro hub                                                                  |
| B7  | stroke             | a person taking a step with a walking stick, a small brain outline above | Stroke                                                                     |
| B8  | spinal-cord        | a wheelchair seen from the side with a vertebra column behind            | Spinal cord injury                                                         |
| B9  | head-injury        | a head profile with a soft protective halo                               | Head injury                                                                |
| B10 | parkinsons         | a hand holding a cup steadily, with calm motion lines                    | Parkinson's                                                                |
| B11 | spasticity         | a bent arm gently extending, with a stretch arc                          | Spasticity                                                                 |
| B12 | joints             | a knee joint with small range-of-motion arcs                             | Joints and sports hub                                                      |
| B13 | knee               | a knee with a goniometer-style arc showing the angle                     | Knee pain                                                                  |
| B14 | shoulder           | a shoulder with an arm raising in an arc                                 | Shoulder pain                                                              |
| B15 | sports             | a runner mid-stride with a resistance band                               | Sports injuries                                                            |
| B16 | fracture           | a long bone with a neat healed line and a small plate outline            | After fracture or surgery                                                  |
| B17 | prp                | a small vial with a drop and a knee outline (no syringe brand shapes)    | PRP and prolotherapy                                                       |
| B18 | prosthesis         | a lower-leg prosthesis taking a step                                     | Prosthetic rehab                                                           |
| B19 | children           | a child holding a parent's hand, taking steps                            | Children's hub                                                             |
| B20 | cerebral-palsy     | a child standing with a small walker                                     | Cerebral palsy                                                             |
| B21 | muscular-dystrophy | a child and a ball, with gentle strength arcs                            | Muscular dystrophy                                                         |
| B22 | development        | building blocks with a small rising path of footsteps                    | Developmental delay                                                        |
| B23 | older-adults       | an older adult walking with a cane beside a handrail                     | Older adults hub                                                           |
| B24 | balance            | a person standing on one foot with balance arcs                          | Falls and balance                                                          |
| B25 | bones              | a hip bone with a small density pattern                                  | Osteoporosis                                                               |
| B26 | video              | a laptop with a doctor silhouette and a speech bubble                    | Video consultation                                                         |
| D-m | doctor-male        | a male doctor with a stethoscope, friendly line style                    | Menu headings only, never replaces his photo                               |
| D-f | doctor-female      | a female doctor with a stethoscope, same style                           | Menu headings and booking doctor choice (Dr. Selina Kh is now on the site) |

Processing (coding agent, master prompt Part 4.9): off-white knockout to transparency, trim, square canvas with 4% padding, 512 and 256 px PNG + WebP, `lib/service-badges.ts` map, never the same badge on two neighbouring cards.

---

## 5. Icons ✅ nothing to collect

Small UI icons (phone, clock, map pin, WhatsApp, menu, mic, camera, checkmarks) come from Lucide inside the build, 1.75 stroke. The vertebra, goniometer and body map graphics are drawn in code (SVG) by the coding agent from design v2. Favicon, app icons and social share images are generated from the logo mark and page titles.

---

## 6. Video (optional) 🟢

| #   | Item                                                                                             | Use                          |
| --- | ------------------------------------------------------------------------------------------------ | ---------------------------- |
| V1  | 30 to 60 second clip of Dr. Dharshan explaining "What is a physiatrist?" (landscape, good audio) | Home and FAQs, click-to-load |
| V2  | Short exercise demos (no patient faces without consent)                                          | Guides posts                 |
| V3  | Existing YouTube or Instagram videos, as links                                                   | Watch section                |

---

## 7. Not images, but send with the folder

| #   | Item                                                                                   | Priority |
| --- | -------------------------------------------------------------------------------------- | -------- |
| G1  | Google rating and review count with the date checked (only if a Google profile exists) | 🟠       |
| G2  | Images that must NOT be used                                                           | 🟢       |
| G3  | Dr. Dharshan's written approval of each AI portrait used                               | 🔴       |
| G4  | Answers to the open items in `client-answers.md`                                       | 🔴       |

---

## Do not send

- Stock photos of other doctors, hospitals or patients
- Photos with medicine boxes, pharma pens, device brand logos or hospital logos visible
- Before/after photos of patients
- Screenshots of patient reviews or WhatsApp messages from patients
- Certificates as images (qualifications are listed as text)

---

**Update 12 Oct 2026:** both doctors approved all their images. The final list and status are in `IMAGE-MAP.md`, which overrides anything above.
