# Site plan · Rehabify (rehabify.in)

Version 1 · 12 October 2026 · Prepared by Automize Media Labs for review by Dr. Dharshan N A
Facts come from `client-answers.md`. Anything not confirmed there is marked `[CONFIRM: ...]`. Visual reference: `rehabify-design-v3.html` (the design wins for visuals; this plan and the master prompt win for rules).

---

## 1. Positioning in one line

Rehabify is a doctor-led physical medicine and rehabilitation practice in Bengaluru and online, where a physiatrist assesses how you move, sets goals with you and plans rehab for pain, stroke, spine, joint and sports problems, for children, adults and older adults.

Entity statement (used word for word in About, `llms.txt`, `entity-facts.md` and the Google profile description):

> Rehabify is a physical medicine and rehabilitation (PMR) practice in Bengaluru, Karnataka, offering clinic consultations and video consultations across India. Its doctors are Dr. Dharshan N A, MBBS, MD (Physical Medicine and Rehabilitation), a consultant physiatrist with a fellowship in interventional pain management, and Dr. Selina Kh, a consultant in physical medicine and rehabilitation [CONFIRM: her qualifications]. Rehabify looks after back and neck pain, sciatica, joint and sports injuries, stroke, spinal cord injury, head injury, Parkinson's disease, cerebral palsy and other conditions that affect movement and function, with exercise-based rehab, medicines and image-guided pain procedures when suitable. [CONFIRM: clinic address and hours, to add as one sentence]

---

## 2. Page list and URLs (44 pages + Guides posts)

`trailingSlash: true`. Lowercase, hyphenated, no dates in URLs. Existing URLs that rank are kept or 301-redirected (section 9).

### Core (12 + 404)

| # | Page | URL | H1 (italic = serif accent) | Main search intent |
|---|---|---|---|---|
| 1 | Home | `/` | Rehab that moves *with you.* | physiatrist Bengaluru, rehabilitation doctor Bengaluru |
| 2 | About Rehabify | `/about/` | About *Rehabify* | Rehabify Bengaluru |
| 3 | Our doctors | `/doctors/` | Meet your *doctors* | PMR doctor Bengaluru |
| 4 | Dr. Dharshan N A | `/dr-dharshan-n-a/` (kept from old site) | Dr. Dharshan *N A* | Dr Dharshan physiatrist, Dr Dharshan N A |
| 4b | Dr. Selina Kh | `/dr-selina-kh/` (kept from old site) | Dr. Selina *Kh* | Dr Selina Kh physiatrist, PMR doctor Bengaluru |
| 5 | All care | `/care/` | Care for pain, nerves and *movement* | rehabilitation services |
| 6 | Conditions A to Z (Care section) | `/care/#a-z` | Every condition, by *name.* | condition + rehab |
| 7 | Video consultation | `/video-consultation/` | See a rehab doctor from *home* | online physiatrist consultation India |
| 8 | Plan your visit | `/plan-your-visit/` | Plan your *visit* | what to bring, timings |
| 9 | Contact and book | `/contact/` (form anchor `#book`) | Book a *consultation* | Rehabify phone, book |
| 10 | FAQs | `/faqs/` | Questions people *often* ask | what is a physiatrist |
| 11 | Guides | `/guides/` | Health *Library* | |
| 12 | Thank you (noindex) | `/thank-you/` | Thank you, we have your *request* | |
| 13 | 404 | | We could not find that *page* | |

### Care pages (24): 5 hubs + 19 detail pages

| # | Page | URL | Parent | Badge | Primary query |
|---|---|---|---|---|---|
| 14 | Pain and spine | `/pain-and-spine/` | Hub | pain-spine | pain doctor Bengaluru, back pain specialist |
| 15 | Back pain | `/pain-and-spine/back-pain/` | 14 | back-pain | low back pain treatment Bengaluru |
| 16 | Neck pain | `/pain-and-spine/neck-pain/` | 14 | neck-pain | neck pain doctor, cervical pain |
| 17 | Sciatica | `/pain-and-spine/sciatica/` | 14 | sciatica | sciatica treatment without surgery |
| 18 | Image-guided injections and nerve blocks | `/pain-and-spine/image-guided-injections/` | 14 | injection | nerve block, facet injection Bengaluru |
| 19 | Neuro rehabilitation | `/neuro-rehabilitation/` | Hub | neuro | neuro rehab Bengaluru |
| 20 | Stroke rehabilitation | `/neuro-rehabilitation/stroke/` | 19 | stroke | stroke rehab Bengaluru, paralysis recovery |
| 21 | Spinal cord injury rehab | `/neuro-rehabilitation/spinal-cord-injury/` | 19 | spinal-cord | spinal cord injury rehabilitation |
| 22 | Head injury rehab | `/neuro-rehabilitation/head-injury/` | 19 | head-injury | brain injury rehab |
| 23 | Parkinson's disease rehab | `/neuro-rehabilitation/parkinsons/` | 19 | parkinsons | Parkinson's physiotherapy doctor |
| 24 | Spasticity care | `/neuro-rehabilitation/spasticity/` | 19 | spasticity | muscle stiffness after stroke |
| 25 | Joints and sports | `/joints-and-sports/` | Hub | joints | joint pain doctor, sports medicine Bengaluru |
| 26 | Knee pain and osteoarthritis | `/joints-and-sports/knee-pain/` | 25 | knee | knee pain without surgery |
| 27 | Shoulder pain and frozen shoulder | `/joints-and-sports/shoulder-pain/` | 25 | shoulder | frozen shoulder treatment |
| 28 | Sports injuries | `/joints-and-sports/sports-injuries/` | 25 | sports | sports injury rehab |
| 29 | Rehab after a fracture or surgery | `/joints-and-sports/after-fracture-or-surgery/` | 25 | fracture | post-surgery rehab, knee replacement rehab |
| 30 | PRP and prolotherapy | `/joints-and-sports/prp-and-prolotherapy/` | 25 | prp | PRP injection knee Bengaluru [CONFIRM: offered] |
| 31 | Amputation and prosthetic rehab | `/joints-and-sports/prosthetic-rehab/` | 25 | prosthesis | prosthetic training |
| 32 | Children's rehabilitation | `/childrens-rehabilitation/` | Hub | children | paediatric rehab Bengaluru |
| 33 | Cerebral palsy | `/childrens-rehabilitation/cerebral-palsy/` | 32 | cerebral-palsy | cerebral palsy treatment Bengaluru |
| 34 | Muscular dystrophy | `/childrens-rehabilitation/muscular-dystrophy/` | 32 | muscular-dystrophy | DMD rehab |
| 35 | Developmental delay and autism support | `/childrens-rehabilitation/developmental-delay/` | 32 | development | developmental delay therapy |
| 36 | Older adults | `/older-adults/` | Hub | older-adults | geriatric rehab Bengaluru |
| 37 | Falls and balance | `/older-adults/falls-and-balance/` | 36 | balance | fall prevention elderly |
| 38 | Osteoporosis | `/older-adults/osteoporosis/` | 36 | bones | osteoporosis doctor |

Practo also lists cardiopulmonary, oncology, pelvic, women's and post-COVID rehab. They stay off the site until Dr. Dharshan confirms he offers them (`client-answers.md` Q17). Adding one later = one new detail page.

### Legal and trust (7)

| # | Page | URL |
|---|---|---|
| 39 | Privacy Policy | `/privacy-policy/` |
| 40 | Terms of Use | `/terms-of-use/` |
| 41 | Medical Disclaimer | `/medical-disclaimer/` |
| 42 | Editorial and Medical Review Policy (incl. AI-assisted images) | `/editorial-policy/` |
| 43 | Patient Rights and Responsibilities | `/patient-rights/` |
| 44 | Appointments, Cancellation and Refund (incl. video consults) | `/appointments-cancellation-refund/` |
| 45 | Accessibility Statement | `/accessibility/` |
| + | Telemedicine notice (section on Video consultation + Terms) | |

### Guides at launch (3 posts)

| Slug | Title | Links to |
|---|---|---|
| `/guides/what-is-a-physiatrist/` | What is a physiatrist, and when should you see one? | Home, FAQs, Dr. Dharshan |
| `/guides/first-90-days-after-stroke/` | The first 90 days after a stroke: what rehab looks like | Stroke, Spasticity |
| `/guides/low-back-pain-when-to-worry/` | Low back pain: what helps, and the warning signs to act on | Back pain, Sciatica, Injections |

Old rehabify.in blog posts: reviewed one by one in `current-website-audit.md`; keep, rewrite or 410. [CONFIRM: export of old posts]

---

## 3. Navigation (matches design v2)

### Floating pill navbar (desktop)
Logo · Care ▾ (mega panel) · Video consults · Doctors · Visit · Guides · **Book a consultation** (glow button)

Utility info moves out of a separate bar: hours, phone and "Medical emergency? Call 108 or 112" sit in the mega panel footer, the mobile menu footer and the site footer. The emergency line also appears on every symptom page callout.

### Mega panel "Care" (4 columns + preview card)
- Pain and spine: Back pain · Neck pain · Sciatica · Image-guided injections
- Brain and nerves: Stroke · Spinal cord injury · Head injury · Parkinson's · Spasticity
- Joints and sport: Knee pain · Shoulder pain · Sports injuries · After fracture or surgery · PRP · Prosthetic rehab
- Children and older adults: Children's rehab · Cerebral palsy · Muscular dystrophy · Falls and balance · Osteoporosis
- Preview card (photo): "Video consults · See the doctor from home" → `/video-consultation/`
- Panel footer row: hours · phone · emergency line

### Mobile menu (full-screen night sheet, accordions all closed)
Care groups (5) · Conditions A to Z · Video consultation · Our doctors · About · Plan your visit · Guides · FAQs · Contact
Fixed footer: Book · Call · today's hours line

### Mobile dock (below 900px, every page)
Book (ice) · Call (sheet: +91 79048 42576) · WhatsApp (green, pre-filled). Hidden while typing in a form and on the thank-you page.

WhatsApp pre-fill: "Hello Rehabify, I would like to book a consultation about [page title]. My name is "

### Spine navigator (desktop 1280px+, Home and long hub pages only)
Vertebra rail on the left, one vertebra per section, labelled C1 to S1 on hover.

### Footer (night)
Logo (ice) + entity line · phone/WhatsApp · email (obfuscated) · address `[CONFIRM]` · Get directions · Columns: Care · Patients (Book, Video consults, Plan your visit, Conditions A to Z, FAQs, Guides) · Legal (7) + Cookie settings · Social `[CONFIRM]` · emergency line · giant faded "Rehabify" wordmark.
Bottom line: "© [year] Rehabify. This website is run by [CONFIRM: legal entity name], [address]. Information here is for general education and does not replace a consultation. Dr. Dharshan N A, Karnataka Medical Council Reg. No. [CONFIRM]."

---

## 4. Global copy blocks (reuse exactly)

**Emergency line:** Medical emergency? Call 108 or 112.

**Emergency callout (symptom pages):**
> **Get help straight away.** Call 108 or 112, or go to the nearest emergency department, for sudden weakness or numbness on one side of the body, a drooping face, slurred speech, sudden loss of bladder or bowel control, numbness around the private parts, back pain after a fall or accident, or back pain with fever. Do not wait for a rehab appointment.

**Reviewer box:**
> Medically reviewed by **Dr. Dharshan N A**, MBBS, MD (Physical Medicine and Rehabilitation) · Karnataka Medical Council Reg. No. [CONFIRM] · Last reviewed [date set at sign-off]
> This page explains general care at Rehabify. It does not replace a consultation. Read our [editorial policy](/editorial-policy/).

**CTA band (night stage):**
> Your next step can be a *small one.*
> Clinic visit or video consult. The team confirms your time by phone or WhatsApp [CONFIRM: confirmation time, e.g. "within 2 hours, 9 am to 7 pm"].
> [Book a consultation] [Call +91 79048 42576] [WhatsApp]

**Form consent (checkbox, unticked):**
> I agree that Rehabify may use these details to contact me about my appointment, as explained in the [Privacy Policy](/privacy-policy/).

**Under the form:**
> Please do not include detailed medical information here. You can share it with the doctor at your consultation.

**Generic treatment line:** The doctor decides the right tests and treatment for you after examining you.

**Procedures line:** Most plans start with exercise, posture advice and medicines. Image-guided injections or nerve blocks are used only when the doctor finds them suitable after examining you.

**Therapy team line:** [CONFIRM: does Rehabify have its own physiotherapists, or work with partner therapists?] Default copy: "Your doctor works with physiotherapists and other therapists on one plan."

**Video consult line:** Video consults suit first advice, follow-ups and home programmes. If you need an examination or a procedure, the doctor will ask you to come in.

---

## 5. Writing rules (every page)

- Plain English for a 60-year-old patient and a worried family member. Short sentences. "We" and "you".
- Explain every medical term the first time (e.g. "spasticity, muscles that stay tight and stiff after a brain or spinal cord injury").
- Answer-first: 2 to 3 sentences that say what it is, who it is for, what happens at Rehabify.
- "At a glance" fact box on every care page (plain HTML list).
- FAQs 5 to 8 per care page, 40 to 80 words each, standalone answers.
- No em or en dashes; ranges use "to". Sentence case headings.
- Never: best, leading, top, No. 1, world-class, guaranteed, cure, permanent, 100%, miracle, painless, "avoid surgery" as a promise, "regenerate cartilage", comprehensive, holistic, seamless, tailored, peace of mind, state-of-the-art.
- No testimonials, review quotes, before/after, patient numbers, prices in offers, drug or device brand names, hospital names as referral claims.
- PRP and prolotherapy: describe what they are and that evidence is still growing; never promise regrowth or results.
- Children: parent or guardian is part of every visit; under-18 form flow.
- Video consults follow the Telemedicine Practice Guidelines 2020 (identity, consent, what can be prescribed).

---

## 6. Internal linking

- Every detail page links up to its hub, sideways to 2 related pages and to 1 or 2 Guides posts.
- Hubs link down to every child page (care track cards).
- Body map regions and Conditions A to Z link to the matching care page.
- Every page ends with the CTA band; the Book button carries the page as the booking reason (`lib/booking-context.ts`).
- Each doctor's profile links to the hubs they cover; every reviewer box links to the profile.

Booking reason dropdown: Back pain · Neck pain · Sciatica or leg pain · Knee pain · Shoulder pain · Sports injury · After a fracture or surgery · Stroke · Spinal cord injury · Head injury · Parkinson's disease · Muscle stiffness (spasticity) · Child's movement or development · Falls or balance · Osteoporosis · Prosthesis or amputation · Injection or PRP advice · Other

Format choice on the form: Clinic visit · Video consult

---

## 7. Schema plan (one `@graph` per page)

| Page | Types |
|---|---|
| All | `WebSite` (#website, en-IN), `MedicalClinic` (#clinic), `Physician` (#dr-dharshan-n-a, #dr-selina-kh), `BreadcrumbList` |
| Home | + `MedicalWebPage`, `FAQPage` |
| Dr. Dharshan | + `ProfilePage` (mainEntity #dr-dharshan-n-a) |
| Dr. Selina | + `ProfilePage` (mainEntity #dr-selina-kh; Physician with medicalSpecialty PMR, credentials and registration [CONFIRM]) |
| Care pages | + `MedicalWebPage` (about `MedicalCondition` or `MedicalTherapy`/`MedicalProcedure`, reviewedBy, lastReviewed), `FAQPage` |
| Video consultation | + `MedicalWebPage`, `Service` (availableChannel `ServiceChannel` online) |
| Posts | `BlogPosting` (author + reviewedBy, datePublished, dateModified), `FAQPage` |
| Contact | `ContactPage` |

`MedicalClinic` (#clinic): name "Rehabify", url https://www.rehabify.in/, telephone +91-7904842576, email [CONFIRM], address + geo [CONFIRM], openingHoursSpecification [CONFIRM], medicalSpecialty "PhysicalMedicineAndRehabilitation" (text, schema.org has no enum), knowsAbout list, availableService (MedicalTherapy items), areaServed Bengaluru + India (online), founder #dr-dharshan-n-a, foundingDate [CONFIRM], sameAs [CONFIRM: GBP, Instagram, Facebook, Practo]. No AggregateRating, no Review.

`Physician` (#dr-dharshan-n-a): honorificSuffix "MBBS, MD"; medicalSpecialty PMR; alumniOf Annapoorana Medical College (Salem), Regional Institute of Medical Sciences (Imphal), Delhi Pain Management Centre; hasCredential (MBBS, MD PMR, fellowship, KMC registration [CONFIRM]); knowsLanguage [CONFIRM]; worksFor #clinic; affiliation [DECISION D2: list VSH Hospital / Apollo Clinic / Antara? Default: not listed, to avoid implying referral arrangements].

---

## 8. Home page section map (design v2 order)

Hero (flat night stage, two doctor arches) · Finder bar · Static conditions strip · Why Rehabify (bento, 5 tiles) · Where does it hurt? (body map) · How we can help (care index) · Your recovery (6 steps; keeps the original spine scrollytelling panel by client decision) · Ways to see us (clinic, video) · Meet your doctor · Visit band · Conditions A to Z · Before you book (accordion) · Closing CTA + compact footer.

> Phase 7g note: the decorative spine motif is retired site-wide (spine navigator, hero/CTA spine graphics, watermark), along with the glow button, marquee, aurora blobs and the goniometer. The one exception is the Journey section, which keeps its original spine-drawn scrollytelling panel by explicit client decision. "Spine" stays in copy only where it means the body part.

Not used: testimonials, review quotes, counters, before/after, offers, pop-ups.

---

## 9. Old URL map (301 / 410)

| Old URL | New |
|---|---|
| `/home` | `/` |
| `/about-us` | `/about/` |
| `/dr-dharshan-n-a` | `/dr-dharshan-n-a/` (same) |
| `/dr-selina-kh` | `/dr-selina-kh/` (same path, new page) |
| `/blogs`, `/blogs/*` | `/guides/` or the matching new post |
| `/home/book-an-appointment-now` | `/contact/#book` |
| `/home/pricing`, `/home/monthly` | `/plan-your-visit/` [CONFIRM: what "Monthly" was] |
| `/ai-tools` and each AI tool page | 410 Gone [DECISION D1] |

Full list comes from a crawl of the old site in `current-website-audit.md`.

---

## 10. Decisions for the client

- **D1 · AI tools (AI Family Doctor, Mediwise, Report Analysis, Diet Planner, Period Pal).** Recommendation: remove at launch. Unreviewed symptom and medicine advice under a doctor's brand is a medical-advertising and DPDP risk, and Period Pal and the diet tool are off-topic for a rehab practice. If kept, they need a doctor-reviewed scope, disclaimers and consent, as a separate phase.
- **D2 · Hospital affiliations** (VSH Hospital, Apollo Clinic, Antara Senior Care). Recommendation: show past and current roles as plain career facts on the doctor profile only, not as "where to book" or referral claims.
- **D3 · Fees.** Default: no fees on the site, "fee told at booking". Alternative: one plain line per format.
- **D4 · Second doctor (Dr. Selina Kh). DECIDED 12 Oct 2026: she is in the site from the first build.** Own profile page `/dr-selina-kh/` (page 4b), second card on Our doctors, two-card fan in the hero, two cards in the Home doctor section, and a doctor choice in the booking form. Her qualifications, registration number, languages and photos are still `[CONFIRM]`; the page ships with a "Photo to be added" placeholder until approved photos arrive.

---

## 11. GEO and AEO notes

- `llms.txt` (entity statement + page list) and `llms-full.txt` (all page text) at build time.
- Every care page's first paragraph names Rehabify, Bengaluru and Dr. Dharshan N A once, naturally.
- "What is a physiatrist?" answered on Home, FAQs and its own post (high AI-answer intent, low competition).
- FAQ, care track, body map and A to Z text are all in the initial HTML.
- Same NAP and hours everywhere (site, schema, `entity-facts.md`, Google profile, Practo).

---

## 12. Guides topics (year one, 24)

Pain and spine: Desk work and neck pain · Sciatica: what the leg pain means · Is bed rest good for back pain? · Nerve blocks explained · Slipped disc: what the MRI words mean
Neuro: Stroke rehab at home · Shoulder pain after a stroke · Spasticity and what helps · Living well with Parkinson's: movement tips · Spinal cord injury: bladder, skin and daily care
Joints and sport: Knee osteoarthritis: exercise that helps · Frozen shoulder stages · Returning to cricket or running after injury · PRP: what the evidence says · Rehab after knee replacement
Children: Cerebral palsy: what parents ask first · Toe walking: when to check · School and therapy for children with DMD
Older adults: Making a home safer against falls · Osteoporosis after 50 · Walking aids: cane, walker or none?
General: What is a physiatrist? · Physiotherapist or physiatrist: the difference · Video consults for rehab: what can and cannot be done
