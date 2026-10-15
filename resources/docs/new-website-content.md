# Rehabify · New website content

Version 1 (all 45 pages and 3 launch posts) for review by Dr. Dharshan N A · 12 October 2026 · Prepared by Automize Media Labs

Facts come from `client-answers.md`. Page list, URLs, menus, schema and global copy blocks are in `site-plan.md`. Visuals follow `rehabify-design-v3.html`.

Contents
- Part 1 · Core pages (Home, About, Our doctors, Dr. Dharshan N A, All care, Conditions A to Z, Video consultation, Plan your visit, Contact, FAQs, Health Library, Thank you, 404) ✅ this version
- Part 2 · Pain and spine (hub + 4 pages) ✅
- Part 3 · Neuro rehabilitation (hub + 5) ✅
- Part 4 · Joints and sports (hub + 6) ✅
- Part 5 · Children and older adults (2 hubs + 5) ✅
- Part 6 · Legal and trust (7) ✅
- Part 7 · Health Library launch posts (3) ✅
- Part 8 · Review guide for Dr. Dharshan and open confirmations ✅ (end of this file, grows with each part)

Conventions: italic word in an H1 or H2 = the Instrument Serif accent phrase. `[CONFIRM: ...]` = yellow chip in development, hidden in production, blocks `npm run launch-check`. Section kickers (mono labels) are given in CAPS.

---

# Part 1 · Core pages

## Page 1 · Home

```yaml
title: "Rehabify Bengaluru | Physiatrist for Pain, Stroke and Rehab"
description: "Doctor-led physical medicine and rehabilitation in Bengaluru and online. Back and neck pain, stroke, spine, joint and sports injuries. Clinic or video."
url: /
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
schema: [MedicalWebPage, FAQPage]
```

### Hero (night stage)

Pill: Physical medicine and rehabilitation · Bengaluru and online

H1: Rehab that moves *with you.*

Sub: A rehabilitation doctor assesses how you move, sets goals with you and plans each step back to the things you want to do. For pain, stroke, spine and sports injuries.

Buttons: [Book a consultation] [Where does it hurt? →]

Fact row: MD Physical Medicine and Rehabilitation · Fellowship Interventional pain · Clinic + video

Arch portrait caption: Dr. Dharshan N A · Consultant physiatrist

Floating chip: Video consults available

Goniometer widget: KNEE FLEXION · EXAMPLE · [animated degrees] · measured at each review

Mobile short line (under portrait): A rehab doctor, in clinic or by video.

### Finder bar

Fields: I need help with [dropdown = booking reasons, site-plan section 6] · See the doctor [In clinic | By video] · When [This week | Later] · [Request a time]
Behaviour: opens `/contact/#book` with the three choices prefilled.

### Marquee (conditions)
Stroke · Back pain · Knee osteoarthritis · Spinal cord injury · Sciatica · Frozen shoulder · Neck pain · Parkinson's disease · Sports injuries · Cerebral palsy · Head injury · Osteoporosis

### WHY REHABIFY (bento)

H2: Rehab planned by a *doctor*, around your goals.

Lede: Physiatrists are doctors who specialise in movement, pain and function. That changes where your rehab starts and how it is measured.

Tiles:
- **HOW IT STARTS** · Quote tile: *Your plan is written by a* **rehabilitation doctor** *after examining you, and it changes as you do.* · Byline: Dr. Dharshan N A, MBBS, MD (Physical Medicine and Rehabilitation)
- **GOALS YOU CHOOSE · TRY IT** · Progress is measured in the things you can do again. · Example goals (tickable, labelled "example"): Walk to the market · Climb two floors · Sleep without pain · Back to badminton · Ring: "2 of 4 goals reached"
- **PAIN CARE** · Image-guided injections, only when suitable. · Most plans start with exercise and medicines. Nerve blocks and joint injections are guided by imaging.
- **NEURO REHAB** · Brain, spine and nerve recovery. · Stroke, head injury, spinal cord injury, Parkinson's disease.
- **FOR** · Every age. · Children · Adults · Older adults
- **IN CLINIC / BY VIDEO** (switch) · Clinic: A full examination of movement, strength and pain. Procedures are done on site when needed. · Video: Start from home with a video consult. Share reports, move on camera, leave with a first plan.

### FIND CARE BY CONCERN (body map)

H2: Where does it *hurt?*

Lede: Tap the body or choose an area. You will see what the doctor looks after there and where to go next.

| Region | Line | Conditions (each links) | Link |
|---|---|---|---|
| Brain and nerves | Recovery of movement, balance, speech and daily tasks after damage to the brain, spinal cord or nerves. | Stroke · Head injury · Parkinson's disease · Spasticity · Nerve injuries · Balance problems | /neuro-rehabilitation/ |
| Neck and shoulder | Stiffness and pain in the neck and shoulder, including pain that travels down the arm. | Neck pain · Cervical radiculopathy · Frozen shoulder · Shoulder pain · Myofascial pain · Posture problems | /pain-and-spine/neck-pain/ |
| Back and spine (default) | Back pain from discs, joints and muscles, and recovery after spinal cord injury. | Low back pain · Sciatica · Facet joint pain · Spinal cord injury · Disc problems · Osteoporosis | /pain-and-spine/ |
| Elbow, wrist and hand | Pain and weakness that make gripping, writing and lifting hard. | Tennis elbow · Wrist pain · Hand weakness · Nerve compression · Arthritis of the hand · After a fracture | /joints-and-sports/ |
| Hip and knee | Joint pain and stiffness that limit walking, stairs and sport. | Knee osteoarthritis · Hip pain · Ligament injuries · Sports injuries · After joint surgery · Gait problems | /joints-and-sports/knee-pain/ |
| Ankle and foot | Pain and instability that affect standing and walking. | Heel pain · Ankle sprains · Foot care · Flat feet · Walking aids · Prosthetic training | /joints-and-sports/ |

Also row: Children's rehab · Older adults · After a fracture or surgery · Amputation and prosthesis

### HOW WE CAN HELP (pinned care track)

H2: Care for pain, nerves and *movement.*

Lede: Each card opens a full page on the condition, what happens at your visit and what to expect.

Cards (group · title · line):
1. Pain and spine · Back pain · Discs, joints and muscles. Exercise first, procedures when suitable.
2. Pain and spine · Neck pain · Including pain that travels down the arm.
3. Pain and spine · Sciatica · Pain that runs from the back down the leg.
4. Pain and spine · Image-guided injections · Nerve blocks and joint injections, guided by imaging.
5. Neuro rehab · Stroke rehab · Movement, balance, speech and daily tasks.
6. Neuro rehab · Spinal cord injury · Mobility, independence and preventing complications.
7. Neuro rehab · Parkinson's disease · Keep moving safely, reduce falls.
8. Joints and sport · Knee pain · Including osteoarthritis and after surgery.
9. Joints and sport · Sports injuries · A guided return to training and play.
10. Children · Children's rehab · Cerebral palsy, muscular dystrophy and development.
11. Older adults · Falls and balance · Balance, strength and safety at home.
12. Joints and sport · Prosthetic training · Learning to walk with a new limb.
Link under the track: See all care →

### YOUR RECOVERY (spine scrollytelling)

H2: Six steps, one *spine.*

| Step | Title | Text | Tags |
|---|---|---|---|
| 01 | Book | Book online, call or WhatsApp. Choose a clinic visit or a video consult. | Clinic or video · Confirmed by phone |
| 02 | First consultation | The doctor asks about your problem, checks how you move, your strength, balance and pain, and reads your scans. | Movement · Strength · Balance |
| 03 | Your goals | Together you agree on what matters: walking without support, sleeping without pain, getting back to work or sport. | Your words · Measurable |
| 04 | Your plan | Exercise, therapy, medicines and, only when suitable, image-guided procedures. Every part explained in plain words. | Written plan · Plain words |
| 05 | Practice at home | A home programme with clear steps, sets and repetitions, so progress continues between visits. | Home programme · WhatsApp questions |
| 06 | Review and adjust | At each review the doctor measures your progress and changes the plan as you improve. | Range of motion · Next goal |

### WAYS TO SEE US (stacking cards)

H2: In clinic, by video or at *home.*

1. **01 · CLINIC VISIT** · See the doctor in person. · A full examination of how you move, with procedures done on site when needed. · Bring scans, reports and medicines · Wear loose clothes · By appointment · [Book a clinic visit]
2. **02 · VIDEO CONSULT** · Start from home. · Share your reports, show the doctor how you move on camera and leave with a first plan. · Good for first advice and follow-ups · Reports shared before the call · The doctor says if you need to come in · [Book a video consult]
3. **03 · HOME PROGRAMME** · Keep going between visits. · Every plan comes with exercises for home, checked and changed at each review. · Clear steps, sets and repetitions · Updated as you improve · Questions on WhatsApp
[CONFIRM: formats offered; home visits?]

### MEET YOUR DOCTOR

Kicker: MEET YOUR DOCTOR · H2: Dr. Dharshan *N A* · Role: Consultant in Physical Medicine and Rehabilitation

Bio: He looks after people recovering from stroke, brain and spinal cord injury, and people living with back, neck and joint pain. His work covers children, adults and older adults, with image-guided pain procedures when they are suitable.

Three principles: **Goals first** Every plan starts from what you want to be able to do. · **Explained plainly** Scans, options and next steps in simple words. · **One team** Works with physiotherapists and other therapists on one plan.

Timeline: 2013 to 2019 MBBS, Annapoorana Medical College, Salem · 2020 to 2023 MD, Physical Medicine and Rehabilitation, RIMS Imphal · Fellowship Interventional Pain Management, Delhi Pain Management Centre

Photo caption: Dr. Dharshan N A · KMC Reg. No. [CONFIRM] · LEAD PHYSIATRIST
Buttons: [Book with Dr. Dharshan] [Full profile →]

### Visit band
Kicker: PLAN YOUR VISIT · H3: See the doctor in Bengaluru. · [CONFIRM: address, landmark and hours] · Chips: By appointment · Lift access [CONFIRM] · Parking [CONFIRM] · [Get directions]

### CONDITIONS A TO Z
H2: Look up a *condition.* · Lede: Type a word. The list filters as you type, and each name opens its own page. · Search placeholder: Try knee, stroke or sciatica
Groups as in `/conditions/` (Page 6).

### QUICK ANSWERS
H2: Before you *book.*

1. **What is a physiatrist?** A physiatrist is a doctor who specialises in Physical Medicine and Rehabilitation. They diagnose and treat problems with muscles, joints, nerves and the spine, and lead your rehab plan with physiotherapists and other therapists. The aim is less pain and more of the movement and independence you need for daily life.
2. **Do I need a referral?** No. You can book directly. Bring any scans, reports or hospital discharge summary to a clinic visit, or share them before a video consult, so the doctor can see the full picture.
3. **Can rehab start with a video consult?** Yes, for many problems. The doctor reviews your reports, watches you move on camera and sets a first plan with home exercises. If you need an in-person examination or a procedure, the doctor will tell you.
4. **Is every pain treated with an injection?** No. Most plans start with exercise, posture advice and medicines. Image-guided injections or nerve blocks are used only when the doctor finds them suitable after examining you, and every option is explained before you decide.

Help card: Still not sure? Send a message and the team will help you choose the right appointment. [WhatsApp +91 79048 42576]

### Notices row
Emergency callout (global) · Reviewer box (global) · Tip: Wear loose clothes to your visit so the doctor can check how your back, hips and knees move.

### CTA band (global)

---

## Page 2 · About Rehabify

```yaml
title: "About Rehabify | Physical Medicine and Rehabilitation, Bengaluru"
description: "Rehabify is a doctor-led rehab practice in Bengaluru and online, led by physiatrist Dr. Dharshan N A. How we work and what we look after."
url: /about/
h1: "About *Rehabify*"
schema: [AboutPage]
```

### Intro
Rehabify is a physical medicine and rehabilitation practice in Bengaluru that also sees patients by video across India. It is led by Dr. Dharshan N A, a physiatrist: a doctor trained to treat pain and to help people move and function again after illness or injury.

### Why Rehabify was started
Many people go from doctor to doctor with back pain, or leave hospital after a stroke with no clear plan for the months that follow. Rehab works best when one doctor looks at the whole problem, sets goals with you and keeps adjusting the plan as you improve. Rehabify was started to make that kind of care easier to reach, in person and from home. [CONFIRM: founding story in Dr. Dharshan's words, founding year]

### How we work
- **We start with function.** What can you not do today that you want to do again? That becomes the goal.
- **We examine before we treat.** Movement, strength, balance, nerves and pain are checked before any plan is made.
- **We keep procedures in their place.** Exercise and medicines come first. Image-guided procedures are offered only when they are likely to help.
- **We plan as a team.** Doctors, physiotherapists and other therapists work on one plan. [CONFIRM: in-house or partner therapists]
- **We explain everything.** Your diagnosis, your options and your next step, in plain words.

### What we look after
Five groups, each linked: Pain and spine · Neuro rehabilitation · Joints and sports · Children's rehabilitation · Older adults

### Facts at a glance
- Practice: Rehabify, physical medicine and rehabilitation
- Lead doctor: Dr. Dharshan N A, MBBS, MD (PMR), Fellowship in Interventional Pain Management
- Where: Bengaluru [CONFIRM: area] and online across India
- Formats: clinic visit, video consult, home programme [CONFIRM]
- Phone and WhatsApp: +91 79048 42576
- Founded: [CONFIRM]

---

## Page 3 · Our doctors

```yaml
title: "Our Doctors | Rehabify Bengaluru"
description: "Meet the rehabilitation doctors at Rehabify. Qualifications, focus areas and how to book a clinic or video consultation."
url: /doctors/
h1: "Meet your *doctors*"
```

Intro: Every plan at Rehabify is led by a doctor trained in physical medicine and rehabilitation.

Doctor card 1: Dr. Dharshan N A · Consultant physiatrist · MBBS, MD (PMR) · Neuro-rehabilitation, pain and spine, children and older adults · [Book with Dr. Dharshan] [View profile]
Doctor card 2: Dr. Selina Kh · Consultant physiatrist · Physical Medicine and Rehabilitation [CONFIRM: qualifications] · Stroke, spinal cord injury, rheumatology and pain management · [Book with Dr. Selina] [View profile]
Home hero and Home doctor section show both doctors (design v3). The booking form has a doctor choice: Dr. Dharshan N A · Dr. Selina Kh · No preference.

---

## Page 4 · Dr. Dharshan N A

```yaml
title: "Dr. Dharshan N A | Physiatrist, Bengaluru | Rehabify"
description: "Dr. Dharshan N A, MBBS, MD (Physical Medicine and Rehabilitation), fellowship in interventional pain management. Neuro rehab and pain care in Bengaluru."
url: /dr-dharshan-n-a/
h1: "Dr. Dharshan *N A*"
schema: [ProfilePage]
```

### Hero (split)
Kicker: CONSULTANT PHYSIATRIST
H1: Dr. Dharshan *N A*
Line: Consultant in Physical Medicine and Rehabilitation
Key facts card: Qualifications MBBS, MD (PMR), Fellowship in Interventional Pain Management · Practising as a consultant since 2023 · Languages Tamil, Telugu, Kannada, English, Manipuri, Hindi · Karnataka Medical Council Reg. No. [CONFIRM]
Buttons: [Book with Dr. Dharshan] [Video consult]

### About
Dr. Dharshan N A is a physiatrist, a doctor who specialises in physical medicine and rehabilitation. He looks after adults, children and older adults with conditions that affect movement and daily life: stroke, spinal cord and head injury, Parkinson's disease, back and neck pain, joint pain and sports injuries.

His training covers rehabilitation and interventional pain management. That means he can treat pain with exercise, medicines and, when suitable, image-guided injections and nerve blocks, and then build the rehab plan that helps you stay well.

He has worked in a 30-bed rehabilitation department at a teaching hospital, in a multispecialty hospital and in senior care in Bengaluru, where he set up fall-prevention and pressure-injury plans and led team-based rehab.

### How Dr. Dharshan works (his own words, lightly edited)
Medicine has three parts: preventing illness, treating it and restoring function. Physical medicine and rehabilitation covers all three, and his main focus is restoring lost function, ability and independence.

- **Non-surgical first.** He looks at what can be done with what is available. For someone who comes four years after a stroke with a lot of tightness, he asks what function they could still gain. If pain is the limit, he treats the pain. If tightness is the limit, he decides which muscle to target.
- **Change the plan if nothing changes.** If a treatment does not help, he changes the activities or finds a device that restores function.
- **Never limited to one organ or one diagnosis.** The question is always what function he can help you regain.
- **Independence matters.** "What is the point of saving a life if you are not able to do your work independently?"
[Source: Dr. Dharshan's own answer, website_information.docx, 12 Oct 2026. CONFIRM final wording with him]

### Education and training
| Years | Qualification | Institution |
|---|---|---|
| 2013 to 2019 | MBBS | Annapoorana Medical College and Hospitals, Salem, Tamil Nadu |
| 2020 to 2023 | MD, Physical Medicine and Rehabilitation | Regional Institute of Medical Sciences, Imphal, Manipur |
| [CONFIRM: year] | Fellowship in Interventional Pain Management | Delhi Pain Management Centre |

MD thesis: Correlation of balance impairment with pain and functional disability in people with primary osteoarthritis of the knee.

### Memberships
- Life Member, Indian Association of Physical Medicine and Rehabilitation (IAPMR)
- Life Member, Karnataka Association of Rehabilitation Medicine (KARM) [CONFIRM: full name of KARM]
- Life Member, Global Regenerative Orthopedic Sciences Foundation

### Research publications (International Journal of Scientific Research)
- Ultrasound-guided intra-articular injection of platelet-rich plasma versus high molecular weight hyaluronic acid, cartilage thickness and physical function in primary knee osteoarthritis: a randomised controlled trial (October 2024)
- Profile of pressure ulcer and other complications in traumatic spinal cord injury patients (April 2022)
- Effectiveness of ultrasound-guided local ozone injection in carpal tunnel syndrome: a randomised controlled trial (February 2022)
- Ultrasound-guided autologous blood injection versus extracorporeal shockwave therapy in chronic Achilles tendinopathy: a randomised controlled trial (March 2021)
[CONFIRM: author position and DOI or link for each; publish as a plain list, no claims about results]

### Experience
- Specialist, Physical Medicine and Rehabilitation, Manipal Hospital, Sarjapur Road, Bengaluru [CONFIRM: start date; current role per Dr. Dharshan, 12 Oct 2026]
- Consultant, senior care, Bengaluru (October 2025 to [CONFIRM: end date]): rehabilitation for stroke, brain injury, Parkinson's disease, fractures and complex musculoskeletal conditions; ICF-based plans; spasticity and pain care; fall prevention and pressure injury protocols with a multidisciplinary team.
- Consultant, physical medicine and rehabilitation, multispecialty hospital, Bengaluru (March to August 2025): image-guided joint, peri-articular and trigger point injections and peripheral nerve blocks; spine pain (cervical, thoracic and lumbar radiculopathy, facet and myofascial pain); neuro-rehabilitation for adults and older adults; paediatric rehabilitation for cerebral palsy, Duchenne muscular dystrophy and autism.
- Junior Consultant, multispecialty hospital, Bengaluru (November 2024 to February 2025): neuro-rehabilitation for brain injury, stroke, spinal cord and nerve injuries, with early mobilisation, tone assessment and cognitive screening, working with neurosurgery, neurology, physiotherapy and ICU teams.
- Senior Resident, Department of PMR, Regional Institute of Medical Sciences, Imphal (September 2023 to September 2024): managed stroke, spinal cord injury, cerebral palsy and rheumatological disorders in a 30-bed PMR department; planned care for rheumatology and chronic pain with physicians, physiotherapists and occupational therapists; used medicines, nerve blocks and physical therapy modalities for pain.
[DECISION D2: name the hospitals or keep generic. Manipal Hospital is a large brand: naming it could read as an endorsement or a booking route. Default stays generic until Dr. Dharshan and the hospital's rules (some hospitals restrict doctors' outside promotion) are confirmed. Also confirm that Rehabify and his hospital role are both stated correctly]

### Conditions and services (non-clickable chip groups)
- Pain and spine: Low back pain · Neck pain · Sciatica · Facet joint pain · Myofascial pain · Image-guided injections · Nerve blocks
- Brain and nerves: Stroke · Spinal cord injury · Head injury · Parkinson's disease · Spasticity
- Joints and sport: Knee osteoarthritis · Shoulder pain · Sports injuries · After fracture or surgery · PRP and prolotherapy [CONFIRM] · Prosthetic training
- Children: Cerebral palsy · Duchenne muscular dystrophy · Developmental delay · Autism support
- Older adults: Falls and balance · Osteoporosis · Pressure injury prevention
Mobile: 6 chips per group + "Show all (n)".

### FAQs
1. **What does a physiatrist do that a physiotherapist does not?** A physiatrist is a medical doctor. Dr. Dharshan diagnoses the cause of pain or weakness, orders and reads scans, prescribes medicines, does image-guided procedures when needed and leads the rehab plan. Physiotherapists are therapists who deliver much of the exercise and hands-on treatment. The two work together.
2. **Does Dr. Dharshan see children?** Yes. He looks after children with cerebral palsy, muscular dystrophy and developmental delay, together with their parents and therapists. A parent or guardian attends every consultation, in clinic or by video.
3. **Can I see Dr. Dharshan by video?** Yes. Video consults suit first advice, follow-ups and home programmes. If you need an examination or a procedure, he will ask you to come in.
4. **Which languages does he speak?** Tamil, Telugu, Kannada, English, Manipuri and Hindi.

---

## Page 4b · Dr. Selina Kh

```yaml
title: "Dr. Selina Kh | Physiatrist, Bengaluru | Rehabify"
description: "Dr. Selina Kh, consultant in physical medicine and rehabilitation at Rehabify. Stroke, spinal cord injury, rheumatology and pain care. [CONFIRM: qualifications]"
url: /dr-selina-kh/
h1: "Dr. Selina *Kh*"
schema: [ProfilePage]
reviewer: dr-selina-kh
```

Only what is confirmed so far is written here. Everything else is a chip for Dr. Selina to fill in or approve.

### Hero (split, same layout as Dr. Dharshan)
Kicker: CONSULTANT PHYSIATRIST
H1: Dr. Selina *Kh*
Line: Consultant in Physical Medicine and Rehabilitation
Key facts card: Qualifications [CONFIRM] · Practising since [CONFIRM] · Languages [CONFIRM] · Medical Council Reg. No. [CONFIRM: council and number]
Buttons: [Book with Dr. Selina] [Video consult]

### About
Dr. Selina Kh is a physiatrist, a doctor who specialises in physical medicine and rehabilitation. She looks after people recovering from stroke and spinal cord injury, people living with joint and rheumatic conditions, and people with long-term pain. [CONFIRM: she confirms this list of focus areas and adds children or older adults if she sees them]

Her care is built around the person, not just the diagnosis. She explains what is happening, supports you through the hard parts of recovery and helps you get back your confidence as well as your movement. [CONFIRM: replace with her own words]

### How Dr. Selina works
- **The person first.** [CONFIRM: her words]
- **Plain explanations.** Scans, options and next steps in simple language.
- **One team.** She works with therapists and other doctors on one plan.

### Education and training
[CONFIRM: degrees, institutions and years. Needed before launch. Until then this block is hidden and the page shows only the facts above.]

### Care she looks after
Stroke rehabilitation · Spinal cord injury rehabilitation · Spasticity care · Back, neck and joint pain · Rheumatology-related pain [CONFIRM] (each links to its care page)

### FAQs
1. **How do I book with Dr. Selina?** Choose her in the booking form, or call or message on WhatsApp and ask for her. You can choose a clinic visit or a video consult [CONFIRM: formats and days she sees patients].
2. **Can I see either doctor?** Yes. If you are not sure who to see, choose "No preference" and the team will suggest a doctor based on your reason for visiting.
3. **Do Dr. Dharshan and Dr. Selina work together?** Yes. Both work at Rehabify and can share your plan so that your care stays consistent. [CONFIRM: how cases are shared]

Reviewer box: "Medically reviewed by Dr. Selina Kh · Last reviewed [CONFIRM: sign-off date]". Emergency callout. CTA band.

---

## Page 5 · All care

```yaml
title: "Rehab and Pain Care | Rehabify Bengaluru"
description: "All rehabilitation and pain care at Rehabify: spine, neuro rehab, joints and sports, children and older adults. Clinic and video consults."
url: /care/
h1: "Care for pain, nerves and *movement*"
```

Intro: Rehabify in Bengaluru looks after problems that change how you move and live day to day. Dr. Dharshan N A and Dr. Selina Kh are physiatrists: doctors who lead your rehab plan. Find your concern below, or search for it.

Five hub blocks, each with its badge, one line and child links:
- **Pain and spine.** Back and neck pain, sciatica, and image-guided procedures when suitable. → Back pain · Neck pain · Sciatica · Image-guided injections and nerve blocks
- **Neuro rehabilitation.** Rehab after stroke and injury to the brain or spinal cord, and for Parkinson's disease. → Stroke · Spinal cord injury · Head injury · Parkinson's disease · Spasticity
- **Joints and sports.** Joint pain, sports injuries and rehab after fractures or surgery. → Knee pain · Shoulder pain · Sports injuries · After fracture or surgery · PRP and prolotherapy · Prosthetic rehab
- **Children's rehabilitation.** Movement and development care with parents as part of the team. → Cerebral palsy · Muscular dystrophy · Developmental delay
- **Older adults.** Staying steady, strong and independent. → Falls and balance · Osteoporosis

---

## Page 6 · Conditions A to Z

```yaml
title: "Conditions A to Z | Rehabify Bengaluru"
description: "Search the conditions Rehabify's rehabilitation doctors look after, from back pain and sciatica to stroke, cerebral palsy and osteoporosis."
url: /conditions/
h1: "Look up a *condition*"
```

Intro: Type a word or browse by area. Each condition links to the page that covers it.

- Pain and spine: Low back pain · Neck pain · Sciatica · Facet joint pain · Disc problems · Myofascial pain · Cervical radiculopathy
- Brain and nerves: Stroke · Head injury · Spinal cord injury · Parkinson's disease · Spasticity · Nerve injuries
- Joints and sport: Knee osteoarthritis · Frozen shoulder · Hip pain · Tennis elbow · Ankle sprains · Sports injuries · After a fracture · After joint replacement
- Children and older adults: Cerebral palsy · Muscular dystrophy · Developmental delay · Fall prevention · Balance problems · Osteoporosis · Amputation and prosthesis

Empty search state: No match. Try a simpler word, or [ask us on WhatsApp].

---

## Page 7 · Video consultation

```yaml
title: "Online Rehab Consultation with a Physiatrist | Rehabify"
description: "See a rehabilitation doctor by video from anywhere in India. Share reports, move on camera and get a home plan. Book a video consult with Rehabify."
url: /video-consultation/
h1: "See a rehab doctor from *home*"
schema: [MedicalWebPage, Service]
```

### Intro (answer-first)
A video consult at Rehabify is a private online appointment with Dr. Dharshan N A, a rehabilitation doctor. You share your reports, show how you move on camera and leave with a first plan and home exercises. It suits people far from Bengaluru, people who find travel hard, and follow-ups.

### At a glance
- **Who you see:** Dr. Dharshan N A, MBBS, MD (PMR)
- **How long:** [CONFIRM: e.g. 20 to 30 minutes]
- **What you need:** a phone or laptop with a camera, a quiet room, space to move
- **Good for:** first advice, follow-ups, home programmes, report reviews, family questions after a stroke
- **Not for:** emergencies, or problems that need an examination or a procedure
- **Platform:** [CONFIRM: video platform]

### How it works
1. **Book** online or on WhatsApp and choose "Video consult".
2. **Share reports** (scans, discharge summary, medicines) before the call.
3. **Confirm your identity** at the start of the call, as required by India's Telemedicine Practice Guidelines.
4. **Talk and move.** The doctor asks about your problem and may ask you to walk, bend or lift your arm on camera.
5. **Your plan.** Advice, home exercises and, where allowed, a prescription.
6. **Next step.** A follow-up video consult, or a clinic visit if you need an examination or a procedure.

### Get ready
- Wear loose clothes; keep a chair and a clear floor space nearby
- Ask a family member to hold the phone if you need to move around
- Keep your medicines and latest reports beside you

### What a video consult cannot do
Some problems need hands-on examination, scans or procedures. The doctor will tell you honestly if a video consult is not enough. Video consults are never for emergencies.

### FAQs
1. **Is a video consult as good as a clinic visit?** For many follow-ups and first advice, yes. The doctor can see how you move and talk through your reports. For a first assessment of a new injury, nerve problem or before any procedure, an in-person examination is usually needed, and the doctor will say so.
2. **Can the doctor prescribe medicines by video?** The doctor can prescribe some medicines on a video consult, within the rules of India's Telemedicine Practice Guidelines 2020. Some medicines cannot be prescribed online. Your prescription is sent to you digitally after the call.
3. **Can a family member join?** Yes. A family member or carer can join, and must join for a child or for an adult who needs help to communicate. Tell us their name when you book.
4. **What if the call drops?** The doctor will call you back on the number you booked with. If the connection stays poor, the consult is moved to a phone call or a new time at no extra cost. [CONFIRM]
5. **Is my video consult private?** Yes. Calls are not recorded [CONFIRM], and your reports are used only for your care, as explained in our Privacy Policy.

---

## Page 8 · Plan your visit

```yaml
title: "Plan Your Visit | Rehabify Bengaluru"
description: "Timings, address, what to bring and what to wear for your rehab consultation at Rehabify in Bengaluru."
url: /plan-your-visit/
h1: "Plan your *visit*"
```

### Timings
Consultations: [CONFIRM: days and hours] · Video consults: [CONFIRM] · Phone and WhatsApp: [CONFIRM] · Sundays and holidays: [CONFIRM]

### Address and directions
[CONFIRM: address with landmark] · [Get directions] (Google Maps, click to load)
Nearest metro or bus stop: [CONFIRM]

### Booking
Book online, call or WhatsApp +91 79048 42576. We confirm your time by phone or WhatsApp [CONFIRM: how fast].

### What to bring
- Scans (MRI, CT, X-ray) and their reports, on CD or phone
- Hospital discharge summary, if you were admitted
- A list of medicines, or the medicines themselves
- Walking aids, splints or braces you use
- A family member, if you need help walking or after a stroke

### What to wear
Loose, comfortable clothes so the doctor can see how your back, hips, knees or shoulders move. Shorts or a T-shirt in your bag help for knee and shoulder problems.

### Access
[CONFIRM: lift, wheelchair, ramp, parking]. Tell us when you book if you need a wheelchair at the entrance.

### Children
A parent or guardian must come with anyone under 18. Bring school or therapy reports if you have them.

### FAQs
1. **How long is the first consultation?** [CONFIRM: e.g. about 30 to 45 minutes]. The doctor needs time to ask questions, examine how you move and explain the plan.
2. **Will I need tests on the day?** Usually not. The doctor decides if you need scans or blood tests after examining you, and explains why.
3. **Can I come straight from hospital after a stroke?** Yes. Bring the discharge summary and scans. If travel is hard, start with a video consult.

---

## Page 9 · Contact and book

```yaml
title: "Book a Consultation | Rehabify Bengaluru"
description: "Book a clinic visit or video consult with Rehabify. Call or WhatsApp +91 79048 42576."
url: /contact/
h1: "Book a *consultation*"
schema: [ContactPage]
```

Intro: Choose a clinic visit or a video consult. We confirm your time by phone or WhatsApp.

### Form (`#book`)
Fields: Patient name · Mobile (+91) · Age + Years/Months · Format [Clinic visit | Video consult] · Reason (dropdown, site-plan section 6) · Preferred date (today to +60 days) · Time of day (Morning / Afternoon / Evening, from hours) · City (optional) · Under 18 → guardian name + guardian consent · Consent checkbox (global line) · [Request a time]
Under the form: global line.
Failure state: Something went wrong. Your details are still here. Call or WhatsApp +91 79048 42576 and we will book you straight away.

### Contact cards
- Call or WhatsApp: +91 79048 42576
- Email: [CONFIRM]
- Address: [CONFIRM] · Get directions
- Hours: [CONFIRM]
- Emergency: Medical emergency? Call 108 or 112.

---

## Page 10 · FAQs

```yaml
title: "FAQs | Rehabify Bengaluru"
description: "Answers about physiatrists, booking, video consults, procedures, children's rehab and privacy at Rehabify."
url: /faqs/
h1: "Questions people *often* ask"
schema: [FAQPage]
```

### About rehab
1. **What is a physiatrist?** (Home Q1)
2. **What is the difference between a physiatrist and a physiotherapist?** (Profile Q1)
3. **What is physical medicine and rehabilitation?** It is the medical specialty that treats pain and helps people regain movement and independence after illness, injury or surgery. It covers the spine, joints, muscles, nerves and the brain, and works through exercise, therapy, medicines, aids and procedures.
4. **How long does rehab take?** It depends on the problem. A sprain may need a few weeks; recovery after a stroke or spinal cord injury continues for months. Your goals and review dates are set at the first consultation so you can see progress.

### Booking and visits
5. **Do I need a referral?** (Home Q2)
6. **How do I book?** Online, by phone or on WhatsApp at +91 79048 42576.
7. **What should I bring?** Scans, reports, discharge summary, medicines and any walking aids.

### Video consults
8. **Can rehab start with a video consult?** (Home Q3)
9. **Can I get a prescription by video?** (Video Q2)

### Treatment
10. **Is every pain treated with an injection?** (Home Q4)
11. **Will I need surgery?** Many spine and joint problems improve without surgery. If the doctor finds signs that surgery may help, such as severe nerve compression, he will explain why and refer you to a surgeon of your choice.
12. **Do you offer physiotherapy?** [CONFIRM: in-house or partner therapists]

### Children
13. **Can my child be seen?** Yes, with a parent or guardian present at every consultation.

### Privacy
14. **How is my information used?** Only to arrange and give your care. See the Privacy Policy.

---

## Page 11 · Health Library

```yaml
title: "Health Library | Rehabify"
description: "Doctor-reviewed articles on back pain, stroke recovery, joint care and rehab at home from Rehabify's rehabilitation doctors."
url: /health-library/
h1: "Health *Library*"
```
Intro: Plain-language articles on pain, movement and recovery, written or reviewed by our doctors.
Category chips: All · Pain and spine · Neuro rehab · Joints and sport · Children · Older adults · About rehab

---

## Page 12 · Thank you (noindex)

H1: Thank you, we have your *request*
Text: We will call or WhatsApp you on the number you gave to confirm your time [CONFIRM: how fast]. If you chose a video consult, we will send the link and ask for your reports before the call.
Emergency line (global). Buttons: [Back to home] [Read: what to bring]

## Page 13 · 404

H1: We could not find that *page*
Text: The page may have moved when we rebuilt our website. Try one of these:
Links: Back pain · Stroke rehab · Knee pain · Video consultation · Conditions A to Z · Book a consultation

---

# Part 2 · Pain and spine

## Page 14 · Pain and spine (hub)

```yaml
title: "Back, Neck and Spine Pain Care in Bengaluru | Rehabify"
description: "Back pain, neck pain and sciatica assessed by a physiatrist trained in interventional pain management. Exercise first, procedures when suitable."
url: /pain-and-spine/
h1: "Pain and *spine*"
badge: pain-spine
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
related: [/neuro-rehabilitation/spinal-cord-injury/, /older-adults/osteoporosis/]
posts: [/health-library/low-back-pain-when-to-worry/]
```

### Intro (answer-first)
Back and neck pain are among the most common reasons people miss work and stop doing what they enjoy. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist with a fellowship in interventional pain management, finds the likely source of the pain and builds a plan that starts with movement and, when suitable, adds image-guided procedures.

### At a glance
- **Who it is for:** adults with back pain, neck pain, sciatica or arm pain, new or long-standing
- **First step:** a consultation with examination of movement, nerves and strength
- **Main treatments:** exercise-based rehab, posture and work advice, medicines, image-guided injections or nerve blocks when suitable
- **Formats:** clinic visit; video consult for follow-ups and home programmes
- **Aim:** less pain, more movement, and fewer flare-ups

### Care in this area (track cards)
Back pain · Neck pain · Sciatica · Image-guided injections and nerve blocks

### What your care includes (step tracker, 4 steps)
1. **Find the source.** History, examination and a careful look at your scans. Many scans show age-related changes that are not the cause of pain.
2. **Calm the pain.** Medicines, activity changes and, when suitable, an image-guided injection.
3. **Restore movement.** A graded exercise programme with a physiotherapist and at home.
4. **Prevent the next flare.** Work set-up, lifting, sleep and fitness habits.

### FAQs
1. **Do I need an MRI for back pain?** Most back pain does not need an MRI at first. Scans are useful when pain lasts beyond 4 to 6 weeks despite treatment, when there is weakness or numbness, or when warning signs are present. The doctor will tell you if you need one.
2. **Is bed rest good for back pain?** Usually not. Short rest during a bad flare is fine, but staying active within comfort helps most people recover faster. The doctor will show you which movements are safe.
3. **What does a pain physician do that other doctors do not?** A physiatrist trained in interventional pain management can target the exact source of pain with image-guided injections or nerve blocks, and combine this with rehab so the benefit lasts.
4. **Can neck pain cause headaches?** Yes. Problems in the upper neck can cause headaches felt at the back of the head or behind the eyes. These often improve with posture work and targeted exercise.
5. **Will I need surgery?** Most people with back or neck pain do not. If there are signs that surgery may help, the doctor will explain why and refer you to a spine surgeon of your choice.

Emergency callout (global). Reviewer box. CTA band.

---

## Page 15 · Back pain

```yaml
title: "Low Back Pain Treatment in Bengaluru | Rehabify Physiatrist"
description: "Low back pain assessed and treated by a physiatrist in Bengaluru. Exercise-based rehab, medicines and image-guided procedures when suitable."
url: /pain-and-spine/back-pain/
h1: "Low back *pain*"
badge: back-pain
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Low back pain", alternateName: ["Lumbago", "Kamar dard"] }
related: [/pain-and-spine/sciatica/, /pain-and-spine/image-guided-injections/]
posts: [/health-library/low-back-pain-when-to-worry/]
```

### Intro (answer-first)
Low back pain is pain, stiffness or tightness between the bottom of the ribs and the top of the legs. Most people have it at some point, and most improve within weeks, but for some it keeps coming back or lasts for months. At Rehabify in Bengaluru, Dr. Dharshan N A examines how your back moves, looks for the likely source of the pain and builds a plan to reduce pain and get you moving again.

### At a glance
- **What it is:** pain in the lower back, sometimes spreading to the buttock or thigh
- **How common:** most adults have back pain at some point in life
- **Common causes:** muscle and ligament strain, disc problems, facet joint arthritis, posture and work habits, low activity
- **First step:** consultation and examination; scans only if needed
- **At Rehabify:** exercise-based rehab, posture and work advice, medicines, image-guided injections when suitable
- **Aim:** less pain, normal movement and fewer flare-ups

### Common causes
- **Strain of muscles and ligaments,** often after lifting, twisting or a sudden movement
- **Disc problems,** where a disc bulges and irritates nearby tissues or a nerve
- **Facet joint pain,** from the small joints at the back of the spine, often worse on bending backwards
- **Sacroiliac joint pain,** felt low on one side, near the dimple above the buttock
- **Long hours of sitting,** low activity and weak core muscles
- **Less common causes** such as fracture from osteoporosis, infection or inflammatory back pain, which the doctor checks for

### Who should see a doctor
- Back pain that lasts more than 2 to 3 weeks or keeps coming back
- Pain that spreads below the knee, or tingling or numbness in the leg
- Pain that wakes you at night or is worse in the morning with stiffness that lasts over 30 minutes
- Back pain with osteoporosis, cancer history or steroid use

### What happens at Rehabify
1. **History.** When it started, what makes it better or worse, your work, sleep and activity.
2. **Examination.** How your spine bends and twists, nerve tests in the legs, strength, reflexes, hip and pelvis checks.
3. **Scans if needed.** Your existing scans are reviewed. New scans are advised only if they will change your treatment.
4. **Your plan.** Usually exercise and activity advice first, with medicines for comfort. An image-guided injection may be offered for pain from a specific joint or nerve.
5. **Rehab.** A graded programme with a physiotherapist and at home, built around your goals.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Bring scans and reports, and a list of medicines
- Wear loose clothes
- Note what you can and cannot do because of the pain (sit, drive, lift, sleep)

### After your visit
You leave with a written plan, home exercises and a review date. Most people are reviewed after 2 to 4 weeks [CONFIRM]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Go to an emergency department or call 108 or 112 if back pain comes with numbness around the private parts or inner thighs, new difficulty passing urine or controlling your bowels, weakness in both legs, fever, or follows a fall or accident.

### FAQs
1. **Should I rest or keep moving with back pain?** Keep moving within comfort. Walking and gentle activity help most people recover faster than bed rest. Avoid heavy lifting during a flare, and return to normal activities step by step. The doctor will show you which movements are safe for your back.
2. **Do I need an MRI?** Not usually at first. An MRI helps when pain lasts beyond 4 to 6 weeks despite treatment, when there is leg weakness or numbness, or if warning signs are present. Many MRI findings, such as disc bulges, are common in people without pain, so the doctor reads them together with your examination.
3. **Is a slipped disc the same as back pain?** No. A "slipped" or bulging disc is one possible cause of back pain, and it often heals without surgery. Many people have disc bulges on scans without any pain. The doctor checks whether the disc is really the source of your symptoms.
4. **When is an injection used for back pain?** When pain clearly comes from a specific joint or nerve and has not settled with exercise and medicines. The injection is guided by imaging so it reaches the right place. It is used to calm pain so that rehab can work, not as the only treatment.
5. **Can back pain come back?** Yes, it often does. Regular exercise, a good work set-up, staying active and keeping a healthy weight lower the chances. Your home programme is designed to help prevent flare-ups.
6. **Can I go to work with back pain?** Many people can, with changes such as shorter sitting periods and lighter tasks for a while. Staying at work often helps recovery. The doctor can advise on what is safe for your job.

### Sources
- National Institute for Health and Care Excellence (NICE) guideline NG59, Low back pain and sciatica in over 16s
- American College of Physicians guideline on non-invasive treatment of low back pain
- WHO guideline on management of chronic primary low back pain in adults, 2023

---

## Page 16 · Neck pain

```yaml
title: "Neck Pain Treatment in Bengaluru | Rehabify"
description: "Neck pain and arm pain assessed by a physiatrist in Bengaluru. Posture and exercise rehab, medicines and image-guided procedures when suitable."
url: /pain-and-spine/neck-pain/
h1: "Neck *pain*"
badge: neck-pain
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Neck pain", alternateName: ["Cervical pain", "Cervical spondylosis", "Gardan dard"] }
related: [/pain-and-spine/back-pain/, /pain-and-spine/image-guided-injections/]
posts: [/health-library/low-back-pain-when-to-worry/]
```

### Intro (answer-first)
Neck pain is pain or stiffness in the neck, sometimes spreading to the shoulders, upper back, head or arm. It is very common in people who work long hours at a desk or on a phone, and most cases settle with the right exercise and habits. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist (MD PMR) with a fellowship in interventional pain management, finds the likely source of your neck pain and plans care to ease it and keep it from coming back.

### At a glance
- **What it is:** pain or stiffness in the neck, at times with headache or arm pain
- **How common:** one of the most common pain problems in adults
- **Common causes:** posture and screen habits, muscle strain, age-related wear (cervical spondylosis), disc problems, a pinched nerve
- **First step:** consultation and examination; scans only if needed
- **At Rehabify:** posture and work advice, exercise-based rehab, medicines, image-guided injections or nerve blocks when suitable
- **Aim:** less pain, easier movement and fewer flare-ups

### Common causes
- **Posture and screen habits,** such as long hours looking down at a laptop or phone
- **Muscle strain,** after sleeping awkwardly, a sudden movement or carrying heavy bags
- **Cervical spondylosis,** age-related wear of the discs and joints in the neck, which is common and often causes no pain at all
- **Disc problems or a pinched nerve,** which can cause pain, tingling or weakness in the arm (cervical radiculopathy)
- **Facet joint pain,** from the small joints at the back of the neck
- **Whiplash,** after a sudden jerk of the neck in a road accident
- **Less common causes** such as inflammatory arthritis, infection or pressure on the spinal cord, which the doctor checks for

### Who should see a doctor
- Neck pain that lasts more than 2 to 3 weeks or keeps coming back
- Pain, tingling or numbness spreading into the arm or hand
- Weakness in the arm or hand, or dropping things
- Headaches that start from the neck
- Neck pain after a fall or road accident

### What happens at Rehabify
1. **History.** When the pain started, your work and screen use, sleep, and what makes it better or worse.
2. **Examination.** Neck movement, posture, shoulder checks, nerve tests in the arms, strength and reflexes.
3. **Scans if needed.** Your existing scans are reviewed. New scans are advised only if they will change your treatment.
4. **Your plan.** Usually posture, work set-up and exercise first, with medicines for comfort. An image-guided injection or nerve block may be offered when pain clearly comes from a specific joint or nerve.
5. **Rehab.** A graded programme with a physiotherapist and at home to build neck and shoulder strength.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Bring scans, reports and a list of medicines
- Wear a top that lets the doctor see your neck and shoulders
- Note how many hours you spend at a desk or on a phone, and your pillow and sleep position

### After your visit
You leave with a written plan, home exercises, simple desk and sleep changes, and a review date. Most people are reviewed after 2 to 4 weeks [CONFIRM]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Go to an emergency department or call 108 or 112 if neck pain follows a fall or road accident, or comes with weakness or numbness in both arms or legs, trouble walking or with balance, loss of bladder or bowel control, fever with a stiff neck, or a sudden severe headache.

### FAQs
1. **Is cervical spondylosis serious?** Usually not. Cervical spondylosis means age-related wear in the neck, and most adults over 40 show it on X-rays, often without any pain. It becomes a concern only when it presses on a nerve or the spinal cord. The doctor checks for this during the examination and explains what your scan really means.
2. **Should I wear a neck collar?** Mostly no. A soft collar may help for a few days after an injury, but wearing it for long weakens the neck muscles and slows recovery. Gentle movement and exercise usually help more. The doctor will tell you if a collar is needed in your case.
3. **Which pillow is best for neck pain?** There is no single right pillow. Choose one that keeps your neck level with your body, neither bent up nor dropping down. Sleeping on your back or side usually suits the neck better than lying on your stomach. The doctor can give advice based on your posture.
4. **Can neck pain cause arm pain or tingling?** Yes. When a disc or bony change irritates a nerve in the neck, pain, tingling or numbness can spread down the arm into the hand. This is called cervical radiculopathy. Most cases improve without surgery, but weakness needs a prompt check by a doctor.
5. **How can I prevent neck pain at work?** Raise your screen to eye level, keep the keyboard close, sit with back support and take a short break every 30 to 45 minutes. Hold your phone higher instead of bending your head down. Regular neck and shoulder exercises also help.
6. **When is an injection used for neck pain?** When pain clearly comes from a specific joint or nerve and has not settled with exercise and medicines. The injection is guided by imaging so it reaches the right place. It is used to calm pain so rehab can work, not as the only treatment.

### Sources
- National Institute for Health and Care Excellence (NICE) Clinical Knowledge Summary, Neck pain
- American Physical Therapy Association (APTA) clinical practice guideline, Neck pain, 2017
- North American Spine Society (NASS) guideline on cervical radiculopathy from degenerative disorders

---

## Page 17 · Sciatica

```yaml
title: "Sciatica Treatment Without Surgery in Bengaluru | Rehabify"
description: "Sciatica and leg pain from the back assessed by a physiatrist in Bengaluru. Exercise rehab, medicines and image-guided nerve root injections when suitable."
url: /pain-and-spine/sciatica/
h1: "Sciatica and *leg pain*"
badge: sciatica
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Sciatica", alternateName: ["Lumbar radiculopathy", "Leg pain from the back"] }
related: [/pain-and-spine/back-pain/, /pain-and-spine/image-guided-injections/]
posts: [/health-library/low-back-pain-when-to-worry/]
```

### Intro (answer-first)
Sciatica is pain that travels from the lower back or buttock down the leg, often below the knee, because a nerve root in the lower back is irritated or pressed. Many people improve within 6 to 12 weeks without surgery. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist (MD PMR) with a fellowship in interventional pain management, checks which nerve is involved and plans care to ease the pain and get you moving.

### At a glance
- **What it is:** nerve pain from the back running down one leg, sometimes with tingling, numbness or weakness
- **How common:** common in adults between 30 and 60
- **Common causes:** a bulging or herniated disc, narrowing of the spinal canal (spinal stenosis), a slipped vertebra
- **First step:** consultation with nerve examination; MRI if needed
- **At Rehabify:** activity advice, exercise-based rehab, nerve pain medicines, image-guided nerve root injections when suitable
- **Aim:** less leg pain, safe walking and sitting, and return to work and daily life

### Common causes
- **Disc herniation,** where the soft centre of a disc pushes out and irritates a nerve root. This is the most common cause
- **Lumbar spinal stenosis,** narrowing of the spinal canal with age, which often causes leg pain on walking that eases on sitting or bending forward
- **Spondylolisthesis,** where one vertebra slips forward on the one below
- **Piriformis or buttock muscle problems,** which can cause similar pain
- **Less common causes** such as infection or a growth, which the doctor checks for

### Who should see a doctor
- Leg pain that is severe, or lasts more than 2 weeks
- Tingling or numbness in the leg or foot
- Weakness, such as a foot that slaps or trips, or trouble standing on the toes or heels
- Leg pain that limits how far you can walk
- Sciatica that keeps coming back

### What happens at Rehabify
1. **History.** Where the pain travels, how long it has been there, and what you can and cannot do.
2. **Examination.** Nerve stretch tests, sensation, strength in each muscle group, and reflexes, to find the nerve root involved.
3. **Scans if needed.** An MRI is advised when pain does not settle, when there is weakness, or when an injection or surgery is being considered.
4. **Your plan.** Activity advice and medicines for nerve pain first. When leg pain from a confirmed nerve root does not settle, an image-guided nerve root injection (transforaminal epidural steroid injection) may be offered to calm it.
5. **Rehab.** Exercises for the back and legs, nerve mobility work and a graded return to activity.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Bring any MRI or X-ray films and reports, and a list of medicines
- Note how far you can walk and how long you can sit before the pain starts
- Wear loose clothes so your legs can be examined

### After your visit
You leave with a written plan, home exercises and a review date. If weakness is present, the doctor will check you again sooner. Most people are reviewed after 2 to 4 weeks [CONFIRM]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Go to an emergency department or call 108 or 112 if sciatica comes with numbness around the private parts or inner thighs, new difficulty passing urine or controlling your bowels, weakness in both legs, or weakness that is getting worse quickly. These can be signs of cauda equina syndrome, which needs urgent treatment.

### FAQs
1. **Does sciatica go away on its own?** Often, yes. Many people with sciatica from a disc improve within 6 to 12 weeks, as the disc shrinks back and the nerve settles. Staying active within comfort and the right exercises help. If pain is severe, lasts longer, or comes with weakness, see a doctor.
2. **Do I need surgery for a slipped disc with sciatica?** Most people do not. Surgery is considered when there is severe or worsening weakness, warning signs such as bladder problems, or pain that stays severe despite good non-surgical care. If surgery may help, the doctor will explain why and refer you to a spine surgeon.
3. **What is a nerve root injection?** It is an injection of a steroid and a local anaesthetic close to the irritated nerve root, guided by imaging so it reaches the right place. It can calm leg pain for a period so that you can move and do rehab. Relief varies from person to person, and it is offered only when suitable.
4. **Should I rest in bed with sciatica?** Long bed rest is not advised. Short rest during the worst days is fine, but gentle walking and normal activity within comfort help most people recover faster. The doctor will show you positions and movements that ease the leg pain.
5. **Why does my leg hurt when the problem is in my back?** The nerves to your legs leave the spine in the lower back. When a nerve root is pressed or inflamed there, you feel the pain along the path of that nerve, in the buttock, thigh, calf or foot, even though the cause is in the back.

### Sources
- National Institute for Health and Care Excellence (NICE) guideline NG59, Low back pain and sciatica in over 16s
- North American Spine Society (NASS) guideline on lumbar disc herniation with radiculopathy
- American College of Physicians guideline on non-invasive treatment of low back pain

---

## Page 18 · Image-guided injections and nerve blocks

```yaml
title: "Image-Guided Injections and Nerve Blocks | Rehabify"
description: "Image-guided spine and joint injections and nerve blocks in Bengaluru, used with rehab when a physiatrist finds them suitable after examination."
url: /pain-and-spine/image-guided-injections/
h1: "Image-guided injections and *nerve blocks*"
badge: injection
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalProcedure, name: "Image-guided pain injections and nerve blocks", alternateName: ["Nerve block", "Facet joint injection", "Epidural steroid injection"] }
related: [/pain-and-spine/back-pain/, /pain-and-spine/sciatica/]
posts: [/health-library/low-back-pain-when-to-worry/]
```

### Intro (answer-first)
Image-guided injections and nerve blocks place medicine close to the source of pain, using ultrasound or X-ray to guide the needle [CONFIRM: imaging used, ultrasound and/or fluoroscopy]. They are used to calm pain from a specific joint or nerve so that rehab can work. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist (MD PMR) with a fellowship in interventional pain management, offers these procedures only when examination and scans show they are suitable.

### At a glance
- **What it is:** a targeted injection of a local anaesthetic, often with a steroid, near a painful joint or nerve
- **Who it may suit:** people whose pain clearly comes from a specific joint or nerve and has not settled with exercise and medicines
- **Common types:** facet joint injections and medial branch blocks, nerve root (epidural) injections, sacroiliac joint injections, peripheral nerve blocks, joint injections [CONFIRM: list of procedures offered]
- **Where:** [CONFIRM: in the clinic procedure room or at a partner hospital]
- **Time:** usually a short procedure; you go home the same day [CONFIRM]
- **Part of a plan:** always combined with exercise and rehab, never the only treatment

### What it is
A nerve block is an injection that numbs a nerve for a while. It can ease pain, and it can also help the doctor confirm where the pain comes from. Imaging lets the doctor see the needle and the target, so the medicine goes to the right place and nearby structures are avoided.

Common procedures include:
- **Facet joint injection or medial branch block,** for pain from the small joints at the back of the spine
- **Transforaminal or epidural steroid injection,** for leg or arm pain from an irritated nerve root
- **Sacroiliac joint injection,** for pain low in the back near the pelvis
- **Peripheral nerve blocks,** for example the suprascapular nerve for shoulder pain or the genicular nerves for knee pain
- **Radiofrequency ablation,** which uses heat to quiet a small pain nerve for longer, when a test block has helped [CONFIRM: offered or not]

### Who should see a doctor about it
- Back, neck, leg or arm pain that has lasted more than 6 weeks despite exercise and medicines
- Pain that limits sleep, work or rehab
- People who want to avoid or delay surgery and want to know all options
- People referred by another doctor for a specific block

An injection is not suitable for everyone. The doctor will tell you if it is right for you, and explain other options.

### What happens at Rehabify
1. **Consultation first.** History, examination and review of scans to find the likely source of pain. A procedure is not done at the first visit unless planned in advance [CONFIRM].
2. **Discussion and consent.** The doctor explains the procedure, what it may and may not do, the risks and other options. You sign a consent form.
3. **The procedure.** You lie in a comfortable position. The skin is cleaned and numbed. The needle is guided with imaging and the medicine is injected. Most procedures take 15 to 30 minutes [CONFIRM].
4. **Short observation.** You rest for a while before going home.
5. **Rehab.** Exercises start or continue as the pain eases, so the benefit lasts.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Tell the doctor if you take blood thinners (such as aspirin, clopidogrel or warfarin), have diabetes, an allergy, an infection or may be pregnant
- Do not stop any medicine on your own; the doctor will advise
- Eat a light meal unless told otherwise [CONFIRM: fasting rules]
- Bring a family member or friend, and do not drive yourself home on the day
- Bring your scans and reports

### After your visit
Some numbness or heaviness may last a few hours. Steroid medicine, when used, usually starts to work in 2 to 7 days. Rest for the day, then return to light activity. Keep a simple pain diary for 2 weeks. A review is planned to check the effect and progress your rehab [CONFIRM: review timing]. You can send questions on WhatsApp.

### When to get help urgently
Callout:
> Go to an emergency department or call 108 or 112 if after a procedure you have fever, increasing pain or swelling at the injection site, new weakness or numbness that does not wear off after a few hours, a severe headache, difficulty breathing, or loss of bladder or bowel control.

### FAQs
1. **Does a nerve block hurt?** The skin is numbed first, so most people feel pressure and brief discomfort rather than sharp pain. Some feel a short flare of their usual pain as the medicine goes in. The doctor explains each step as it happens.
2. **How long does the relief last?** It varies. Some people get a few weeks of relief, others several months, and some do not benefit. The aim is to calm pain enough for rehab to work. Results cannot be promised, and the doctor will discuss what is realistic for you.
3. **Are steroid injections safe?** They are generally safe when done with imaging guidance by a trained doctor and with limits on how often they are repeated. Possible side effects include a short rise in blood sugar, facial flushing, infection, bleeding and, rarely, nerve injury. The doctor explains the risks before you consent.
4. **How many injections can I have?** This depends on the type of injection, the response to earlier ones and your overall health. Steroid injections are usually limited to a few a year at the same site. Repeat injections are considered only if earlier ones helped and rehab is ongoing.
5. **Will I need an injection after my first visit?** Not necessarily. Most plans start with exercise, posture advice and medicines. Injections are used only when the doctor finds them suitable after examining you.
6. **Can I go back to work after the procedure?** Most people rest for the rest of the day and return to desk work the next day. Heavier work may need a few more days. The doctor will advise based on your job and the procedure.

### Sources
- National Institute for Health and Care Excellence (NICE) guideline NG59, Low back pain and sciatica in over 16s (radiofrequency denervation and epidural injections)
- American Society of Regional Anesthesia and Pain Medicine (ASRA) guidance on interventional spine and pain procedures in patients on blood thinners
- Faculty of Pain Medicine of the Royal College of Anaesthetists, information for patients on pain procedures

---

# Part 3 · Neuro rehabilitation

## Page 19 · Neuro rehabilitation (hub)

```yaml
title: "Neuro Rehabilitation in Bengaluru | Rehabify"
description: "Rehab after stroke, spinal cord injury and head injury, and for Parkinson's and spasticity, planned by a physiatrist in Bengaluru with goals set with you."
url: /neuro-rehabilitation/
h1: "Neuro *rehabilitation*"
badge: neuro
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
related: [/childrens-rehabilitation/cerebral-palsy/, /older-adults/falls-and-balance/]
posts: [/health-library/first-90-days-after-stroke/]
```

### Intro (answer-first)
Neuro rehabilitation helps people regain movement, independence and confidence after an illness or injury of the brain, spinal cord or nerves. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist (MD PMR), assesses what has changed, sets clear goals with you and your family, and leads a plan that brings together exercise, therapy, medicines and equipment.

### At a glance
- **Who it is for:** adults after stroke, spinal cord injury or head injury, and people living with Parkinson's disease or spasticity
- **First step:** a consultation with a full check of movement, strength, balance, speech, swallowing and daily tasks
- **Main treatments:** goal-based therapy plans, spasticity care, medicines, splints and mobility aids, home programmes, family training
- **Formats:** clinic visit; video consult for follow-ups and home programmes [CONFIRM: home visits]
- **Aim:** more independence in daily life, safer movement and fewer complications

### Care in this area (track cards)
Stroke · Spinal cord injury · Head injury · Parkinson's disease · Spasticity

### What your care includes (step tracker, 4 steps)
1. **Assess.** What you can do now, what has changed, and what matters most to you and your family.
2. **Set goals.** Clear, practical goals, such as walking to the bathroom, eating on your own or returning to work.
3. **Rehab together.** One plan shared by the doctor, physiotherapists and other therapists, with exercise, medicines, splints and aids.
4. **Live well at home.** Home programme, family training, home safety and regular reviews as needs change.

### FAQs
1. **What is a physiatrist?** A physiatrist is a doctor who specialises in physical medicine and rehabilitation (PMR). They look at how an illness or injury affects movement and daily life, and lead the rehab plan with therapists. They also treat pain, spasticity and other problems that slow recovery.
2. **Is it too late to start rehab months after a stroke or injury?** It is rarely too late. Most recovery happens in the first months, but many people keep making gains for a long time with the right practice. Rehab can also help prevent stiffness, pain and falls, whenever it starts.
3. **Can family members take part?** Yes, and it helps. Family members learn how to assist safely, how to do home exercises, and what warning signs to watch for. We encourage a family member to come to the first visit.
4. **Do you work with other doctors?** Yes. We work alongside your neurologist, neurosurgeon or family doctor and share updates with your consent. Rehab does not replace their care.
5. **Can follow-ups be done by video?** Many can. Video consults suit progress reviews, home programme updates and family questions. A clinic visit is needed when a hands-on examination or procedure is required.

Emergency callout (global). Reviewer box. CTA band.

---

## Page 20 · Stroke rehabilitation

```yaml
title: "Stroke Rehabilitation in Bengaluru | Rehabify"
description: "Stroke rehab in Bengaluru led by a physiatrist. Goal-based plans for walking, arm use, daily tasks, spasticity and shoulder pain after a stroke."
url: /neuro-rehabilitation/stroke/
h1: "Stroke *rehabilitation*"
badge: stroke
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Stroke", alternateName: ["Paralysis", "Hemiplegia", "Brain attack", "Lakwa"] }
related: [/neuro-rehabilitation/spasticity/, /older-adults/falls-and-balance/]
posts: [/health-library/first-90-days-after-stroke/]
```

### Intro (answer-first)
Stroke rehabilitation helps people relearn movement and daily skills after a stroke, and lowers the risk of problems such as stiffness, shoulder pain and falls. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist (MD PMR), assesses what the stroke has changed, sets goals with the person and family, and leads a plan with therapists that continues at home.

### At a glance
- **What it is:** a stroke happens when blood supply to part of the brain is blocked or a blood vessel bleeds
- **Common effects:** weakness on one side (hemiplegia), poor balance, speech or swallowing problems, memory and mood changes
- **Best time to start:** as soon as the doctors treating the stroke say it is safe, and it keeps helping for months
- **First step:** consultation with a full rehab assessment
- **At Rehabify:** goal-based therapy plan, spasticity care, shoulder pain care, splints and walking aids, family training
- **Aim:** more independence in walking, self-care and daily life

### What stroke can change
- **Movement,** weakness or clumsiness of the arm, leg or face on one side
- **Spasticity,** muscles that stay tight and stiff, making movement harder
- **Balance and walking,** with a higher risk of falls
- **Speech and swallowing,** trouble speaking, understanding or swallowing safely
- **Shoulder pain,** common in the weak arm
- **Thinking and mood,** memory, attention, tiredness and low mood

### Who should see a rehab doctor
- Anyone recovering from a recent stroke, once medically stable
- People months or years after a stroke who want to improve walking, arm use or independence
- Stroke survivors with tight muscles, painful shoulder, falls or swelling of the hand or foot
- Families who need guidance on care, equipment and home safety

### What happens at Rehabify
1. **History.** Type and date of the stroke, hospital treatment, other health problems, and life before the stroke.
2. **Examination.** Strength, muscle tone, sensation, balance, walking, arm and hand use, speech and swallowing screening, and daily tasks.
3. **Goals.** What matters most to you, such as walking at home, dressing or returning to work.
4. **Your plan.** Therapy with physiotherapists and other therapists, medicines for spasticity, pain or mood, splints, walking aids, and injections for spasticity when suitable.
5. **Home and family.** A home exercise programme, safe transfer training for family, and advice on home changes.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Bring discharge summaries, scan reports and a list of medicines
- Bring a family member or carer
- Bring any splints, walking aids or wheelchair you use
- Note the main tasks you want to manage better

### After your visit
You and your family leave with a written plan, home exercises, safety advice and a review date. Reviews are usually more frequent in the early months [CONFIRM: typical review interval]. Video follow-ups can help track progress at home. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> A new stroke is an emergency. Call 108 or 112 at once if you notice BE FAST signs: loss of **B**alance, **E**yesight change, **F**ace drooping, **A**rm weakness, **S**peech difficulty. **T**ime to call. Also seek urgent care for a sudden severe headache, a fit, chest pain or a sudden drop in alertness.

### FAQs
1. **How long does recovery after a stroke take?** It differs for each person. The fastest gains usually come in the first 3 to 6 months, but many people keep improving for much longer with regular practice. Recovery depends on the size and site of the stroke, general health and how much rehab is done.
2. **When should stroke rehab start?** As soon as the treating doctors say it is safe, often within days in hospital. Rehab started early helps prevent stiffness and complications. If rehab stopped after discharge, it is worth starting again at any stage.
3. **Why does the shoulder hurt after a stroke?** The weak arm can pull on the shoulder joint, and tight muscles add to the strain. Shoulder pain is common after a stroke. Correct positioning, support for the arm, exercise and, when suitable, injections or nerve blocks can help.
4. **What can family members do at home?** Help with daily practice of exercises, encourage the person to use the weak side, set up the home to prevent falls and watch for warning signs. The team will show family members safe ways to help with transfers and walking.
5. **Can stroke rehab be done at home?** Much of it can. A clear home programme, regular practice and video follow-ups keep progress going between clinic visits. Some parts, such as an examination or a spasticity injection, need a clinic visit.
6. **Can another stroke be prevented?** The risk can be lowered. Take medicines as prescribed, control blood pressure, sugar and cholesterol, stop smoking and stay active. Your neurologist or family doctor manages these, and rehab helps you stay active safely.

### Sources
- American Heart Association / American Stroke Association (AHA/ASA) guidelines for adult stroke rehabilitation and recovery
- National Institute for Health and Care Excellence (NICE) guideline NG236, Stroke rehabilitation in adults, 2023
- World Health Organization (WHO), Rehabilitation 2030 and package of interventions for rehabilitation, stroke module

---

## Page 21 · Spinal cord injury rehabilitation

```yaml
title: "Spinal Cord Injury Rehabilitation in Bengaluru | Rehabify"
description: "Spinal cord injury rehab in Bengaluru led by a physiatrist. Mobility, bladder, bowel, skin and spasticity care, wheelchair advice and family training."
url: /neuro-rehabilitation/spinal-cord-injury/
h1: "Spinal cord injury *rehabilitation*"
badge: spinal-cord
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Spinal cord injury", alternateName: ["Paraplegia", "Quadriplegia", "Tetraplegia", "SCI"] }
related: [/neuro-rehabilitation/spasticity/, /pain-and-spine/]
posts: []
```

### Intro (answer-first)
Spinal cord injury rehabilitation helps people build strength, independence and healthy routines after damage to the spinal cord, from an accident, fall, infection, tumour or other illness. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist (MD PMR), assesses the level of injury, sets goals with you and your family, and plans long-term care for movement, bladder, bowel, skin and spasticity.

### At a glance
- **What it is:** damage to the spinal cord that affects movement, sensation and body functions below the level of injury
- **Types:** paraplegia (legs and lower body) or tetraplegia, also called quadriplegia (arms and legs); complete or incomplete
- **First step:** consultation with a full neurological and functional assessment
- **At Rehabify:** goal-based therapy, wheelchair and equipment advice, bladder and bowel plans, skin care, spasticity and pain care, family training
- **Formats:** clinic visit; video consult for follow-ups [CONFIRM: home visits]
- **Aim:** the most independence possible and fewer complications

### What spinal cord injury can change
- **Movement and sensation** below the level of injury
- **Bladder and bowel control,** needing a regular routine
- **Skin,** with a risk of pressure sores on areas you cannot feel
- **Spasticity,** muscles that stay tight and stiff or jerk
- **Pain,** including nerve pain
- **Blood pressure,** including autonomic dysreflexia, a sudden dangerous rise in blood pressure in injuries at or above the mid-chest level
- **Mood, sexual health and return to work or study**

### Who should see a rehab doctor
- Anyone with a new spinal cord injury, once medically stable
- People living with a long-standing injury who want to improve independence
- People with pressure sores, repeated urine infections, spasticity or pain
- Families who need training and advice on equipment and home changes

### What happens at Rehabify
1. **History.** How and when the injury happened, surgery, current routines and goals.
2. **Examination.** Strength and sensation by level (the ISNCSCI standard), muscle tone, skin check, sitting balance, transfers and wheelchair use.
3. **Goals.** Practical aims such as transferring on your own, managing your bladder, or returning to work.
4. **Your plan.** Therapy for strength and transfers, wheelchair and cushion advice, bladder and bowel programmes, skin care, medicines and spasticity treatment when needed.
5. **Home and family.** Training for carers, home and vehicle changes, and a schedule of regular reviews.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Bring discharge summaries, MRI reports and a list of medicines
- Bring your wheelchair, cushion, braces or catheter supplies if you use them
- Note your bladder and bowel routine and any skin problems
- Bring a family member or carer

### After your visit
You leave with a written plan covering exercise, bladder, bowel and skin care, equipment advice and a review date. Long-term reviews help catch problems early [CONFIRM: typical review interval]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Call 108 or 112 or go to an emergency department for a sudden pounding headache with flushing or sweating above the injury and high blood pressure (autonomic dysreflexia), fever with chills, breathing trouble, chest pain, a swollen painful leg, or new loss of strength or sensation. For autonomic dysreflexia, sit upright, loosen tight clothing and check the catheter while help comes.

### FAQs
1. **Can a person walk again after a spinal cord injury?** It depends on the level of injury and whether it is complete or incomplete. Some people with incomplete injuries regain walking, with or without aids. Others reach full independence using a wheelchair. The doctor will discuss realistic goals after examining you.
2. **How can pressure sores be prevented?** Change position often, at least every 2 hours in bed and by shifting weight every 15 to 30 minutes in a wheelchair. Use the right cushion and mattress, keep skin clean and dry, eat well and check your skin daily with a mirror or a family member's help.
3. **What is autonomic dysreflexia?** It is a sudden, dangerous rise in blood pressure that can happen in injuries at or above the mid-chest level. It is often triggered by a full bladder, constipation or a skin problem. Signs include a pounding headache and sweating. It needs urgent action.
4. **How is the bladder managed after spinal cord injury?** Most people need a regular plan, often using clean intermittent catheterisation several times a day. The right plan protects the kidneys and lowers infection risk. The doctor works out a routine that fits your hands, lifestyle and support.
5. **Can I return to work or study?** Many people do, with changes to the workplace, transport and routine. Rehab works on the skills, equipment and stamina needed. The doctor can also advise on disability certificates and support where relevant.

### Sources
- Consortium for Spinal Cord Medicine, clinical practice guidelines (Paralyzed Veterans of America)
- American Spinal Injury Association (ASIA), International Standards for Neurological Classification of Spinal Cord Injury (ISNCSCI)
- World Health Organization (WHO) and ISCoS, International Perspectives on Spinal Cord Injury

---

## Page 22 · Head injury rehabilitation

```yaml
title: "Head and Brain Injury Rehabilitation in Bengaluru | Rehabify"
description: "Rehab after head injury and traumatic brain injury in Bengaluru. A physiatrist plans care for movement, thinking, daily tasks and return to work."
url: /neuro-rehabilitation/head-injury/
h1: "Head injury *rehabilitation*"
badge: head-injury
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Traumatic brain injury", alternateName: ["Head injury", "Brain injury", "TBI", "Concussion"] }
related: [/neuro-rehabilitation/stroke/, /neuro-rehabilitation/spasticity/]
posts: []
```

### Intro (answer-first)
Head injury rehabilitation helps people recover movement, thinking, communication and daily skills after an injury to the brain, often from a road accident or fall. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist (MD PMR), assesses how the injury has affected the person, sets goals with the family and leads a plan with therapists from the early stage through return to home, study or work.

### At a glance
- **What it is:** damage to the brain from a blow, jolt or penetrating injury to the head (traumatic brain injury)
- **Severity:** mild (including concussion), moderate or severe
- **Common effects:** weakness, poor balance, headaches, tiredness, memory and attention problems, mood and behaviour changes
- **First step:** consultation with a full physical and functional assessment
- **At Rehabify:** goal-based therapy plan, spasticity and pain care, guidance on thinking skills, family training, return to work or study planning
- **Aim:** the most independence possible in daily life

### What a head injury can change
- **Movement and balance,** weakness, stiffness or poor coordination
- **Thinking,** memory, attention, planning and slower processing
- **Communication and swallowing**
- **Behaviour and mood,** irritability, low mood, anxiety or poor sleep
- **Headaches, dizziness and tiredness,** common even after mild injury
- **Spasticity and joint stiffness** after moderate or severe injury

### Who should see a rehab doctor
- People recovering from a moderate or severe head injury, once medically stable
- People with headaches, dizziness, poor concentration or tiredness weeks after a mild injury or concussion
- Families caring for someone with changes in behaviour or daily function
- Students or workers planning a return after a head injury

### What happens at Rehabify
1. **History.** How the injury happened, hospital care, scans, and changes the family has noticed.
2. **Examination.** Strength, tone, balance, walking, arm use, screening of memory and attention, and daily tasks.
3. **Goals.** Agreed with the person and family, such as self-care, safe walking or a graded return to work.
4. **Your plan.** Therapy with physiotherapists and other therapists, medicines for sleep, pain, mood or spasticity, and referral for speech or psychology support when needed [CONFIRM: in-house or partner therapists].
5. **Home and family.** Routines, safety advice, family training and a step-by-step return to study, work and driving.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Bring discharge summaries, CT or MRI reports and a list of medicines
- Bring a family member who knows how the person was before and after the injury
- Note changes in sleep, mood, memory or behaviour

### After your visit
You and your family leave with a written plan, home activities, safety advice and a review date [CONFIRM: typical review interval]. Video follow-ups can help check progress at home. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Call 108 or 112 or go to an emergency department if after a head injury there is a worsening headache, repeated vomiting, a fit, increasing drowsiness or confusion, slurred speech, new weakness, fluid from the nose or ears, or unequal pupils.

### FAQs
1. **How long does recovery from a head injury take?** It varies widely. Most people with a mild injury or concussion recover within weeks. Recovery from a moderate or severe injury can continue for months or years. Regular rehab, rest, sleep and a gradual return to activity support recovery.
2. **Why does my family member seem like a different person?** Injury to parts of the brain that control emotions and behaviour can cause irritability, low mood, impulsiveness or loss of interest. These changes are common and often improve with time, structure and support. The team can guide the family and arrange psychology support.
3. **When can I return to work or study after a concussion?** Usually step by step, starting with short hours and light tasks once symptoms allow. Most people return within a few weeks. If symptoms such as headache or poor focus last longer, a rehab plan can help.
4. **When is it safe to drive after a head injury?** It depends on the severity of the injury, fits, vision, reaction time and thinking skills. Do not drive until a doctor advises it is safe. The doctor will assess you and guide you on legal and safety needs.
5. **Can rehab help years after a brain injury?** Often yes. Rehab can still improve walking, stiffness, pain, daily routines and confidence long after the injury. Goals are set around what matters most now.

### Sources
- National Institute for Health and Care Excellence (NICE) guideline NG232, Head injury: assessment and early management, 2023
- Scottish Intercollegiate Guidelines Network (SIGN) guideline 130, Brain injury rehabilitation in adults
- World Health Organization (WHO), Package of interventions for rehabilitation, traumatic brain injury module

---

## Page 23 · Parkinson's disease rehabilitation

```yaml
title: "Parkinson's Disease Rehabilitation in Bengaluru | Rehabify"
description: "Rehab for Parkinson's disease in Bengaluru. A physiatrist plans exercise for walking, balance, posture and daily tasks, with fall prevention."
url: /neuro-rehabilitation/parkinsons/
h1: "Parkinson's disease *rehabilitation*"
badge: parkinsons
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Parkinson's disease", alternateName: ["Parkinsonism", "PD"] }
related: [/older-adults/falls-and-balance/, /neuro-rehabilitation/]
posts: []
```

### Intro (answer-first)
Parkinson's disease rehabilitation uses regular, targeted exercise and practical strategies to help people with Parkinson's move better, stay steady and keep doing daily tasks for longer. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist (MD PMR), assesses walking, balance and daily function, and builds a plan that works alongside the medicines prescribed by your neurologist.

### At a glance
- **What it is:** a slowly progressing condition of the brain that affects movement, causing slowness, stiffness, tremor and balance problems
- **Who it is for:** people at any stage of Parkinson's disease, and their families
- **First step:** consultation with assessment of walking, balance, posture and daily tasks
- **At Rehabify:** exercise programmes, balance and fall prevention, walking strategies for freezing, posture work, home safety and family guidance
- **Works with:** your neurologist, who manages Parkinson's medicines
- **Aim:** better movement, fewer falls and more independence

### What Parkinson's can change
- **Slowness of movement** (bradykinesia) and smaller steps
- **Stiffness** (rigidity) of muscles
- **Tremor,** often at rest
- **Balance and falls,** especially when turning
- **Freezing,** when the feet feel stuck to the floor
- **Stooped posture,** soft voice, small handwriting and swallowing changes
- **Non-movement symptoms** such as poor sleep, constipation, low mood and tiredness

### Who should see a rehab doctor
- Anyone newly diagnosed, to start an exercise plan early
- People with falls, near falls or freezing
- People finding it harder to dress, get out of a chair or turn in bed
- People with stooped posture, back or shoulder pain
- Families wanting advice on home safety and support

### What happens at Rehabify
1. **History.** Symptoms, medicines and timing, falls, and daily routines.
2. **Examination.** Walking, turning, balance tests, posture, strength, flexibility and how you get up from a chair.
3. **Goals.** Such as walking outdoors safely, getting up without help or reducing falls.
4. **Your plan.** A regular exercise programme with physiotherapists, cueing strategies for freezing, posture and flexibility work, and referral for speech and swallowing therapy when needed [CONFIRM: in-house or partner therapists].
5. **Home and family.** Fall-proofing the home, walking aid advice and family training.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Bring your list of medicines with timings, and your neurologist's notes
- Plan the visit when your medicines are working well, unless asked otherwise
- Bring a family member and any walking aid you use
- Note when falls or freezing happen

### After your visit
You leave with a written exercise plan, safety advice and a review date [CONFIRM: typical review interval]. Video follow-ups help keep your exercise programme up to date as needs change. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Call 108 or 112 or go to an emergency department after a fall with a head injury, severe pain or inability to get up, or for sudden confusion, choking, high fever with stiffness, or a sudden severe worsening of movement.

### FAQs
1. **Does exercise help Parkinson's disease?** Yes. Regular exercise improves walking, balance, strength and flexibility, and helps people stay independent for longer. It works alongside medicines, not instead of them. The best programme is one you can do regularly and enjoy.
2. **What can I do when my feet freeze?** Cueing strategies often help, such as stepping over a line on the floor, counting or walking to a beat, or shifting your weight before stepping. The team will teach strategies that work for you and practise them in real situations.
3. **How can falls be prevented with Parkinson's?** Exercise for balance and strength, take medicines on time, turn slowly in wide arcs, use good lighting and remove loose rugs. Grab bars in the bathroom and the right walking aid also help. The team will check your home risks with you.
4. **Is it worth starting rehab soon after diagnosis?** Yes. Starting exercise early helps build fitness and habits that support you as the condition changes. Early rehab can also address posture and balance before problems appear.
5. **Does Rehabify change my Parkinson's medicines?** Your neurologist manages Parkinson's medicines. The rehab doctor may share observations, such as when symptoms worsen during the day, with your consent, to help your neurologist plan treatment.

### Sources
- National Institute for Health and Care Excellence (NICE) guideline NG71, Parkinson's disease in adults
- European Physiotherapy Guideline for Parkinson's Disease (KNGF and ParkinsonNet)
- World Health Organization (WHO), Parkinson disease: a public health approach, technical brief, 2022

---

## Page 24 · Spasticity care

```yaml
title: "Spasticity Treatment in Bengaluru | Rehabify"
description: "Care for muscle stiffness after stroke, brain or spinal cord injury and cerebral palsy. Stretching, splints, medicines and injections when suitable."
url: /neuro-rehabilitation/spasticity/
h1: "Spasticity *care*"
badge: spasticity
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Spasticity", alternateName: ["Muscle stiffness", "Muscle tightness after stroke", "Increased tone"] }
related: [/neuro-rehabilitation/stroke/, /childrens-rehabilitation/cerebral-palsy/]
posts: [/health-library/first-90-days-after-stroke/]
```

### Intro (answer-first)
Spasticity means muscles that stay tight and stiff after an injury or illness of the brain or spinal cord, such as stroke, spinal cord injury, head injury, multiple sclerosis or cerebral palsy. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist (MD PMR), assesses which muscles are affected and how the stiffness limits daily life, then plans treatment that may include stretching, splints, medicines and targeted injections when suitable.

### At a glance
- **What it is:** muscles that stay tight, resist stretching and sometimes jerk or spasm
- **Common causes:** stroke, spinal cord injury, head injury, multiple sclerosis, cerebral palsy
- **Effects:** stiffness, pain, a bent elbow, clenched hand or pointed foot, difficulty walking, dressing or hygiene
- **First step:** consultation with examination of tone, range of movement and function
- **At Rehabify:** stretching and positioning, splints and orthoses, medicines, nerve blocks and botulinum toxin injections when suitable [CONFIRM: botulinum toxin offered]
- **Aim:** easier movement and care, less pain and fewer fixed joint contractures

### What it is
After damage to the brain or spinal cord, the signals that normally keep muscles relaxed are disrupted, so some muscles stay overactive. Spasticity is not always harmful. Some stiffness can help a weak leg bear weight. Treatment aims at the stiffness that causes pain or gets in the way of function or care. Without treatment, muscles and joints can shorten and become fixed (contractures).

### Who should see a doctor
- Stiffness that makes walking, dressing, washing or sleeping harder
- A hand that stays clenched, an elbow that stays bent or a foot that points down or turns in
- Painful spasms or stiffness
- Skin problems in the palm, armpit or between the legs because of tight muscles
- Children with cerebral palsy whose stiffness affects movement or care

### What happens at Rehabify
1. **History.** The cause of spasticity, what it affects in daily life, and current medicines and therapy.
2. **Examination.** Muscle tone scales, range of movement, walking and arm use, and checks for pain, skin and contractures.
3. **Goals.** Such as easier hand hygiene, a flatter foot for walking, or less pain at night.
4. **Your plan.** Stretching and positioning, therapy, splints or orthoses, oral medicines, and focal treatment such as botulinum toxin injections or nerve blocks into specific muscles when suitable [CONFIRM: procedures offered]. Injections are guided to the right muscle with ultrasound or nerve stimulation [CONFIRM].
5. **Follow-up.** Therapy and splinting after any injection, with review of the effect against your goals.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Bring discharge summaries, a list of medicines and any splints you use
- Note which tasks the stiffness makes hard, and when it is worse
- Bring a family member or carer, especially if they help with daily care
- For children, a parent or guardian gives consent and attends the visit

### After your visit
You leave with a written plan, stretching and positioning routines and a review date. If an injection is given, its effect usually starts within 1 to 2 weeks and wears off over about 3 months, so therapy continues during that time [CONFIRM: review timing]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Seek urgent care or call 108 or 112 if, after an injection, there is difficulty swallowing, breathing or speaking, or new widespread weakness. Also seek urgent care for a sudden large increase in spasms with fever, a swollen hot leg, or, in spinal cord injury, a pounding headache with high blood pressure.

### FAQs
1. **Is spasticity the same as weakness?** No. Weakness means a muscle cannot produce enough force. Spasticity means a muscle stays tight and resists stretching. They often occur together after a stroke or spinal cord injury, and treating spasticity alone does not restore strength, so rehab works on both.
2. **What are botulinum toxin injections for spasticity?** Botulinum toxin is a medicine injected into selected overactive muscles to relax them for a few months. It can ease stiffness and make stretching, splinting and care easier. It works best alongside therapy, and the effect varies from person to person.
3. **Can spasticity be stopped completely?** Usually not, because it comes from the original brain or spinal cord injury. It can often be reduced and managed so that it causes less pain and gets in the way less. Regular stretching and review help prevent fixed joints.
4. **Do medicines for spasticity have side effects?** Oral medicines such as baclofen or tizanidine can cause drowsiness, dizziness or weakness. The doctor starts with a low dose and adjusts it. Do not stop these medicines suddenly, as this can cause withdrawal effects.
5. **Why are splints important?** Splints and orthoses hold a muscle in a stretched position for longer periods, which helps prevent contractures and can improve walking or hand position. They need to fit well and be checked regularly to avoid skin damage.

### Sources
- Royal College of Physicians (UK), Spasticity in adults: management using botulinum toxin, national guidelines 2018
- American Academy of Neurology (AAN) practice guideline update on botulinum neurotoxin for spasticity, 2016
- National Institute for Health and Care Excellence (NICE) guideline CG145, Spasticity in under 19s: management

---

### Confirmations raised in this part
- Typical review interval after visits for neck pain and sciatica (2 to 4 weeks), and for stroke, spinal cord injury, head injury, Parkinson's and spasticity
- Imaging used for procedures: ultrasound, fluoroscopy (X-ray) or both
- Full list of image-guided procedures offered, including whether radiofrequency ablation is offered
- Where procedures are done (own procedure room or partner hospital), and whether patients go home the same day
- Whether a procedure can be done at the first visit
- Typical procedure duration (15 to 30 minutes)
- Fasting rules before procedures
- Review timing after an injection
- Home visits for neuro rehab patients
- Whether physiotherapists, speech therapists and psychologists are in-house or partner therapists
- Whether botulinum toxin injections and phenol or nerve blocks for spasticity are offered, and guidance method (ultrasound or nerve stimulation)

---

# Part 4 · Joints and sports

## Page 25 · Joints and sports (hub)

```yaml
title: "Joint Pain and Sports Injury Care in Bengaluru | Rehabify"
description: "Knee, shoulder and sports injuries, rehab after fracture or surgery, and prosthetic rehab, led by a physiatrist in Bengaluru. Exercise first."
url: /joints-and-sports/
h1: "Joints and *sports*"
badge: joints
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
related: [/pain-and-spine/, /older-adults/osteoporosis/]
posts: [/health-library/what-is-a-physiatrist/]
```

### Intro (answer-first)
Painful knees, stiff shoulders and sports injuries can stop you walking, working or playing the way you want. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist with a fellowship in interventional pain management, examines how the joint moves and builds a plan that starts with exercise and, when suitable, adds medicines or image-guided injections.

### At a glance
- **Who it is for:** adults and active people with joint pain, stiffness, sports injuries, recovery after a fracture or surgery, or limb loss
- **First step:** a consultation with examination of the joint, strength, balance and how you move
- **Main treatments:** exercise-based rehab, activity advice, medicines, image-guided injections when suitable, prosthetic training
- **Formats:** clinic visit; video consult for follow-ups and home programmes
- **Aim:** less pain, better movement and a safe return to work, walking or sport

### Care in this area (track cards)
Knee pain and osteoarthritis · Shoulder pain and frozen shoulder · Sports injuries · Rehab after a fracture or surgery · PRP and prolotherapy · Amputation and prosthetic rehab

### What your care includes (step tracker, 4 steps)
1. **Find the cause.** History, examination of the joint and a review of your X-rays or scans.
2. **Calm the pain.** Medicines, activity changes and, when suitable, an image-guided injection.
3. **Build strength and movement.** A graded exercise programme with a physiotherapist and at home.
4. **Return to what matters.** Step-by-step return to work, walking, stairs or sport, with checks along the way.

### FAQs
1. **Do I need surgery for knee or shoulder pain?** Most people do not. Exercise, weight management and pain control help many people. If surgery may help, the doctor will explain why and refer you to an orthopaedic surgeon of your choice.
2. **Is a physiatrist the same as an orthopaedic surgeon?** No. A physiatrist is a doctor who treats pain and movement problems without surgery, using rehab, medicines and procedures. Both often work together, for example before and after a joint replacement.
3. **Should I rest a painful joint?** Short rest during a flare is fine, but long rest makes joints stiffer and muscles weaker. The doctor will show you which activities are safe.
4. **Do you see children with sports injuries?** [CONFIRM: minimum age for sports injury consults] Teenagers who play sport are often seen with a parent present.
5. **Can follow-ups be done by video?** Yes, many follow-ups and home exercise reviews can be done by video consult. The first visit for a new joint problem is usually in the clinic so the joint can be examined.

Emergency callout (global). Reviewer box. CTA band.

---

## Page 26 · Knee pain and osteoarthritis

```yaml
title: "Knee Pain and Osteoarthritis Care in Bengaluru | Rehabify"
description: "Knee pain and knee osteoarthritis treated without surgery where possible. Exercise, weight and activity advice, medicines and injections when suitable."
url: /joints-and-sports/knee-pain/
h1: "Knee pain and *osteoarthritis*"
badge: knee
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Knee osteoarthritis", alternateName: ["Knee arthritis", "Ghutne ka dard"] }
related: [/joints-and-sports/prp-and-prolotherapy/, /joints-and-sports/after-fracture-or-surgery/, /older-adults/falls-and-balance/]
posts: []
```

### Intro (answer-first)
Knee pain is very common, and in adults over 40 the most common cause is osteoarthritis, where the cartilage and bone in the joint slowly change. It can make walking, stairs and sitting on the floor hard. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist whose MD research looked at balance and function in knee osteoarthritis, examines your knee and builds a plan to reduce pain and keep you moving.

### At a glance
- **What it is:** pain, stiffness or swelling in the knee, often worse on stairs, squatting or after rest
- **Who gets it:** more common after 40, with higher body weight, past knee injury or heavy kneeling and squatting work
- **Common causes:** osteoarthritis, pain at the front of the knee, ligament or meniscus injury, tendon problems
- **First step:** consultation and examination; X-ray if needed
- **At Rehabify:** strengthening exercise, weight and activity advice, medicines, injections when suitable
- **Aim:** less pain, better walking and balance, and delaying or avoiding surgery where possible

### Common causes
- **Osteoarthritis,** the slow wear and repair of the joint, often in both knees
- **Pain at the front of the knee** (patellofemoral pain), common in younger and active people
- **Meniscus or ligament injury,** often after a twist
- **Tendon pain** below or above the kneecap
- **Weak thigh and hip muscles,** which put more load on the knee
- **Less common causes** such as inflammatory arthritis, gout or infection, which the doctor checks for

### Who should see a doctor
- Knee pain that lasts more than 2 to 3 weeks or keeps coming back
- Pain that stops you walking, climbing stairs or sleeping
- A knee that locks, gives way or swells
- Knee pain with falls or poor balance

### What happens at Rehabify
1. **History.** When it started, what makes it worse, your work, activity and any past injury.
2. **Examination.** Swelling, range of movement, ligament tests, muscle strength, walking and balance.
3. **Scans if needed.** A standing X-ray is often enough. MRI is advised only if it will change your treatment.
4. **Your plan.** Exercise to strengthen the thigh and hip muscles, weight and activity advice, and medicines for comfort. An image-guided injection may be offered if pain stays high despite this.
5. **Rehab.** A graded programme with a physiotherapist and at home, with balance work to lower the risk of falls.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Bring X-rays, scans and a list of medicines
- Wear shorts or loose trousers that roll up above the knee
- Bring the shoes you walk in most days
- Note what you find hard: stairs, squatting, sitting on the floor, walking distance

### After your visit
You leave with a written plan, home exercises and a review date. Most people are reviewed after 4 to 6 weeks [CONFIRM]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Go to an emergency department if your knee becomes hot, red and very swollen with fever, if you cannot put any weight on it after a fall or injury, or if your calf becomes painful and swollen. Call 108 or 112 in an emergency.

### FAQs
1. **Is walking bad for knee osteoarthritis?** No. Walking and strengthening exercise are among the most helpful treatments. Start with short walks and build up. Pain that settles within a day is usually safe.
2. **Can knee osteoarthritis be reversed?** The changes in the joint do not reverse, but pain and function often improve a lot with exercise, weight loss and good pain control.
3. **Do knee injections help?** Steroid injections can ease a flare for some weeks. Other injections, such as hyaluronic acid or PRP, have mixed evidence. The doctor will explain the options and whether any are suitable for you.
4. **Will I need a knee replacement?** Many people do not. If pain and function stay poor despite good treatment, the doctor will discuss a referral to an orthopaedic surgeon.
5. **Does losing weight help my knees?** Yes. Even a small weight loss reduces the load on the knee and often reduces pain.

### Sources
- National Institute for Health and Care Excellence (NICE) guideline NG226, Osteoarthritis in over 16s: diagnosis and management
- American College of Rheumatology (ACR) and Arthritis Foundation guideline for osteoarthritis of the hand, hip and knee, 2019
- American Academy of Orthopaedic Surgeons (AAOS) clinical practice guideline, Management of osteoarthritis of the knee (non-arthroplasty)

---

## Page 27 · Shoulder pain and frozen shoulder

```yaml
title: "Frozen Shoulder and Shoulder Pain Care in Bengaluru | Rehabify"
description: "Frozen shoulder, rotator cuff and shoulder pain assessed by a physiatrist in Bengaluru. Exercise-based rehab and image-guided injections when suitable."
url: /joints-and-sports/shoulder-pain/
h1: "Shoulder pain and *frozen* shoulder"
badge: shoulder
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Frozen shoulder", alternateName: ["Adhesive capsulitis", "Shoulder pain"] }
related: [/pain-and-spine/neck-pain/, /pain-and-spine/image-guided-injections/, /joints-and-sports/sports-injuries/]
posts: []
```

### Intro (answer-first)
Shoulder pain can make it hard to dress, reach up, sleep on one side or lift. Frozen shoulder is one common cause, where the shoulder becomes painful and then stiff over months. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist with a fellowship in interventional pain management, finds the likely cause and builds a plan to ease pain and bring back movement.

### At a glance
- **What it is:** pain or stiffness in the shoulder, sometimes spreading down the upper arm
- **Who gets it:** frozen shoulder is more common between 40 and 60 and in people with diabetes or thyroid problems
- **Common causes:** frozen shoulder, rotator cuff problems, pain from the neck, arthritis
- **First step:** consultation and examination; ultrasound or X-ray if needed
- **At Rehabify:** stretching and strengthening exercise, medicines, image-guided injections when suitable
- **Aim:** less pain at night, more movement and use of the arm in daily life

### Common causes
- **Frozen shoulder,** where the joint lining becomes inflamed and tight. It often goes through a painful phase, a stiff phase and a slow thawing phase
- **Rotator cuff problems,** such as tendon irritation or tears, often pain when lifting the arm
- **Pain coming from the neck,** felt in the shoulder or arm
- **Arthritis** of the shoulder or the joint at the top of the shoulder
- **Less common causes** such as dislocation, fracture or pain referred from the heart or chest, which the doctor checks for

### Who should see a doctor
- Shoulder pain lasting more than 2 to 3 weeks
- Pain that wakes you at night or stops you lying on that side
- Shoulder that is getting stiffer, so you cannot reach behind your back or above your head
- Shoulder pain with diabetes

### What happens at Rehabify
1. **History.** When it started, what movements hurt, your work, sleep and other health problems such as diabetes.
2. **Examination.** Range of movement, strength of the rotator cuff, neck checks and specific shoulder tests.
3. **Scans if needed.** Ultrasound or X-ray may be advised. MRI only if it will change your treatment.
4. **Your plan.** Exercise and medicines first. An image-guided injection or nerve block may be offered to ease pain so that stretching can work.
5. **Rehab.** A stage-by-stage programme with a physiotherapist and at home.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Bring scans, reports and a list of medicines, including diabetes medicines
- Wear a loose top or vest so the shoulder can be examined
- Note which daily tasks are hard: dressing, combing hair, reaching a shelf

### After your visit
You leave with a written plan, home exercises and a review date. Most people are reviewed after 2 to 4 weeks [CONFIRM]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Call 108 or 112 straight away if shoulder or arm pain comes with chest pain, breathlessness, sweating or pain in the jaw. Go to an emergency department if the shoulder looks out of shape after a fall, or is hot and swollen with fever.

### FAQs
1. **How long does frozen shoulder last?** It often lasts from many months to over a year. Treatment aims to ease pain and keep as much movement as possible while it settles.
2. **Should I keep moving a frozen shoulder?** Yes, within comfort. Gentle stretching helps. Forcing painful movement during the early painful phase can make it worse, so the exercises change with each stage.
3. **Does an injection help frozen shoulder?** A steroid injection into the joint can reduce pain, especially in the early phase, and make exercise easier. The doctor will advise whether it is suitable for you.
4. **Is diabetes linked to frozen shoulder?** Yes. Frozen shoulder is more common in people with diabetes. Good sugar control is part of care.
5. **Can shoulder pain come from the neck?** Yes. Neck problems can cause pain in the shoulder and arm. The doctor checks the neck as part of the examination.

### Sources
- American Academy of Orthopaedic Surgeons (AAOS) clinical practice guideline, Management of rotator cuff injuries
- British Elbow and Shoulder Society (BESS) and Royal College of Surgeons patient care pathway for frozen shoulder
- NICE Clinical Knowledge Summary, Shoulder pain

---

## Page 28 · Sports injuries

```yaml
title: "Sports Injury Rehab in Bengaluru | Rehabify"
description: "Sports injuries assessed by a physiatrist in Bengaluru. Rehab for sprains, strains, tendon and ligament injuries, with a planned return to sport."
url: /joints-and-sports/sports-injuries/
h1: "Sports *injuries*"
badge: sports
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Sports injury", alternateName: ["Sprain", "Muscle strain", "Tendinopathy"] }
related: [/joints-and-sports/knee-pain/, /joints-and-sports/shoulder-pain/, /joints-and-sports/prp-and-prolotherapy/]
posts: []
```

### Intro (answer-first)
Sports injuries range from a twisted ankle to a torn ligament or a tendon that keeps hurting. Good rehab helps you heal and lowers the chance of getting hurt again. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist with a fellowship in interventional pain management, works out what is injured, plans your rehab and guides a step-by-step return to sport.

### At a glance
- **What it is:** injury to muscles, tendons, ligaments, joints or bones during sport or exercise
- **Who gets it:** runners, cricketers, footballers, badminton players, gym-goers and weekend players
- **Common injuries:** ankle sprain, hamstring or calf strain, knee ligament or meniscus injury, tennis elbow, Achilles and patellar tendon pain, shoulder injuries
- **First step:** consultation and examination; scans if needed
- **At Rehabify:** load-based rehab, strength and balance training, medicines, injections when suitable
- **Aim:** a safe return to your sport and fewer repeat injuries

### Common causes
- **Sudden injuries,** such as a twist, fall or collision
- **Overuse,** from training too much too soon, often in tendons
- **Weak or tight muscles** and poor balance
- **Poor technique or equipment,** such as worn shoes
- **Returning too early** after an earlier injury

### Who should see a doctor
- An injury that is not improving after 1 to 2 weeks
- Swelling, a joint that gives way or locks
- Pain that stops you training or comes back each time you play
- Before returning to sport after a ligament injury or surgery

### What happens at Rehabify
1. **History.** How the injury happened, your sport, training load and goals.
2. **Examination.** The injured area, joint stability, strength, flexibility, balance and movement patterns.
3. **Scans if needed.** Ultrasound, X-ray or MRI only if it will change your treatment.
4. **Your plan.** Relative rest, pain control and a rehab plan that adds load step by step. An image-guided injection may be offered for some long-standing tendon or joint problems.
5. **Return to sport.** Strength and movement checks before you go back, and advice on training load.

The doctor decides the right tests and treatment for you after examining you. If surgery may help, such as for some ligament tears, you are referred to a sports or orthopaedic surgeon of your choice.

### How to prepare
- Bring scans and reports
- Wear sports clothes and bring your training shoes
- Note your training schedule and the date of any match or event you want to return for

### After your visit
You leave with a written plan, a home and gym programme and a review date. Reviews are usually every 2 to 4 weeks during rehab [CONFIRM]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Go to an emergency department if a limb looks out of shape, you cannot put weight on it, there is numbness or a cold, pale limb, or after a head injury with confusion, vomiting or drowsiness. Call 108 or 112 in an emergency.

### FAQs
1. **Should I use ice and rest?** In the first day or two, protect the area and keep it comfortable. After that, gentle movement and gradual loading usually help healing more than long rest.
2. **When can I go back to sport?** When you have full movement, good strength compared with the other side and can do sport-specific movements without pain. Time alone is not the test.
3. **Do I need an MRI for a sports injury?** Not always. Many injuries are diagnosed by examination. MRI helps when a ligament or meniscus tear is suspected or the injury is not healing.
4. **Can a tendon injury be treated with an injection?** Exercise is the main treatment for tendon pain. Some injections, such as PRP, have mixed evidence and are considered only when suitable. Steroid injections are used carefully near tendons.
5. **How can I prevent another injury?** Warm up, build training load slowly, keep up strength and balance work, and use the right shoes and equipment.

### Sources
- American Academy of Orthopaedic Surgeons (AAOS) OrthoInfo, Sports injuries
- International Olympic Committee (IOC) consensus statement on load in sport and risk of injury, 2016
- 2016 consensus statement on return to sport from the First World Congress in Sports Physical Therapy, Bern

---

## Page 29 · Rehab after a fracture or surgery

```yaml
title: "Rehab After Fracture or Surgery in Bengaluru | Rehabify"
description: "Rehab after a fracture, knee or hip replacement or other surgery, planned by a physiatrist in Bengaluru. Pain control, movement, strength and walking."
url: /joints-and-sports/after-fracture-or-surgery/
h1: "Rehab after a fracture or *surgery*"
badge: fracture
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalProcedure, name: "Rehabilitation after fracture or orthopaedic surgery", alternateName: ["Post-operative rehab", "Knee replacement rehab"] }
related: [/joints-and-sports/knee-pain/, /older-adults/osteoporosis/, /older-adults/falls-and-balance/]
posts: []
```

### Intro (answer-first)
After a fracture or an operation such as a knee or hip replacement, rehab helps you get back movement, strength and confidence. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist with a fellowship in interventional pain management, plans your rehab in line with your surgeon's advice, manages pain and sets clear goals for walking, work and daily life.

### At a glance
- **Who it is for:** people recovering from a fracture, joint replacement, ligament repair, spine surgery or other orthopaedic surgery
- **When to start:** often within days of surgery, as advised by your surgeon
- **What rehab covers:** pain and swelling, joint movement, muscle strength, walking, balance, stairs and return to work
- **First step:** consultation with your surgery or fracture notes
- **At Rehabify:** a staged rehab plan, pain control, walking aid advice and bone health checks where needed
- **Aim:** a safe return to independent daily life

### What rehab covers
- **Pain and swelling control,** so you can move and sleep
- **Joint movement,** such as bending and straightening the knee after a replacement
- **Strength,** of the muscles weakened by injury, surgery or rest
- **Walking and balance,** with advice on when to move from a walker to a stick to no aid
- **Daily tasks,** such as stairs, toilet, getting in and out of a car
- **Bone health,** after a fracture from a minor fall, which can be a sign of osteoporosis

### Who should see a doctor
- Anyone after a fracture or orthopaedic surgery who wants a planned rehab programme
- Stiffness, pain or weakness that is not improving as expected
- Difficulty walking, or fear of falling after surgery
- A fracture after a minor fall

### What happens at Rehabify
1. **History.** Your injury or operation, your surgeon's instructions, weight-bearing limits and your goals.
2. **Examination.** Wound area, swelling, movement, strength, walking and balance.
3. **Your notes.** Discharge summary, operation notes and X-rays are reviewed. The plan follows your surgeon's advice.
4. **Your plan.** Pain control, a staged exercise programme, walking aid advice and goals for each stage.
5. **Rehab.** Sessions with a physiotherapist and at home, with regular checks. [CONFIRM: home visits offered after surgery?]

The doctor decides the right tests and treatment for you after examining you, and stays in touch with your surgeon when needed.

### How to prepare
- Bring your discharge summary, operation notes, X-rays and list of medicines
- Wear loose clothes that allow the operated area to be seen
- Bring your walking aid and any brace
- Bring a family member if you need help getting around

### After your visit
You leave with a written plan, home exercises and a review date. Reviews are usually every 1 to 2 weeks in the early weeks [CONFIRM]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Contact your surgeon or go to an emergency department if the wound becomes red, hot, swollen or leaks fluid, if you have fever, if the calf becomes painful and swollen, or if pain suddenly gets much worse. Call 108 or 112 straight away for chest pain or sudden breathlessness.

### FAQs
1. **When should rehab start after a knee replacement?** Usually within a day or two of surgery in hospital, then continuing for several weeks after you go home. Your surgeon sets the early limits.
2. **How long does rehab take?** It depends on the injury or operation. Many people make most of their progress in the first 3 months, and keep improving for up to a year.
3. **Is pain during exercises normal?** Some discomfort is expected. Pain that is sharp, getting worse each day or comes with swelling and redness should be checked.
4. **Can I do rehab at home?** Much of it, yes, with a home programme and video consult follow-ups. Some stages need hands-on sessions.
5. **Why check my bones after a fracture?** A fracture from a minor fall may be a sign of osteoporosis. Treating it lowers the risk of another fracture.

### Sources
- National Institute for Health and Care Excellence (NICE) guideline NG157, Joint replacement (primary): hip, knee and shoulder
- NICE guideline NG38, Fractures (non-complex): assessment and management
- American Academy of Orthopaedic Surgeons (AAOS) OrthoInfo, Total knee replacement exercise guide

---

## Page 30 · PRP and prolotherapy

```yaml
title: "PRP and Prolotherapy Injections in Bengaluru | Rehabify"
description: "What PRP and prolotherapy injections are, what the evidence says, and when a physiatrist may offer them as part of a rehab plan in Bengaluru."
url: /joints-and-sports/prp-and-prolotherapy/
h1: "PRP and *prolotherapy*"
badge: prp
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalProcedure, name: "Platelet-rich plasma injection", alternateName: ["PRP injection", "Prolotherapy"] }
related: [/joints-and-sports/knee-pain/, /joints-and-sports/sports-injuries/, /pain-and-spine/image-guided-injections/]
posts: []
```

### Intro (answer-first)
PRP (platelet-rich plasma) and prolotherapy are injections used for some joint, tendon and ligament problems. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist with a fellowship in interventional pain management, may offer them [CONFIRM: PRP and prolotherapy offered at Rehabify] when they are suitable, and only as part of a rehab plan. The evidence for them is mixed, and he will explain what they can and cannot do before you decide.

### At a glance
- **What PRP is:** a small amount of your own blood, spun to concentrate the platelets, then injected into the problem area
- **What prolotherapy is:** an injection of a solution, often a sugar (dextrose) solution, near a painful ligament or tendon
- **Sometimes considered for:** knee osteoarthritis, tennis elbow, some tendon problems, some ligament pain
- **Evidence:** mixed; some studies show pain relief for some people, others show little difference
- **At Rehabify:** offered only when suitable, after examination, with exercise rehab alongside
- **Not:** a way to grow new cartilage or a replacement for exercise

### What it is
- **PRP:** blood is taken from your arm, spun in a machine to separate the platelets, and the platelet-rich part is injected, often guided by ultrasound [CONFIRM: ultrasound guidance available]
- **Prolotherapy:** a solution is injected at the points where ligaments or tendons attach to bone, sometimes over a few sessions
- **Why they are used:** both are thought to help the body's own healing response, but how well they work is still being studied
- **Who is not suitable:** people with some blood disorders, active infection, certain cancers, or who take some blood-thinning medicines

### Who should see a doctor
- Long-standing knee, tendon or ligament pain not improving with exercise and other treatment
- Anyone who has been advised PRP or prolotherapy elsewhere and wants a second opinion
- Anyone wanting to understand the options before deciding

### What happens at Rehabify
1. **History and examination.** To confirm the source of pain and check what treatment you have already had.
2. **Review of scans.** To see whether the problem is one where these injections may be considered.
3. **Discussion.** The doctor explains the evidence, possible benefits, risks, costs and other options, so you can decide.
4. **Procedure if chosen.** Done with clean technique and, where needed, image guidance. Written consent is taken.
5. **Rehab.** Exercise continues before and after, as this is the main treatment.

The doctor decides whether the procedure is suitable for you after examining you.

### How to prepare
- Bring scans, reports and a list of medicines, including blood thinners and painkillers
- Ask the doctor which medicines to stop before the procedure; do not stop any on your own
- Eat normally and drink water on the day
- Plan to rest the area for a day or two afterwards

### After your visit
Some soreness for a few days is common. You leave with written advice on activity, pain relief and your exercise plan, and a review date [CONFIRM: usual review interval after PRP]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Contact the clinic or go to an emergency department if the injected area becomes very red, hot and swollen, you develop fever, or pain gets much worse after the first few days. Call 108 or 112 in an emergency.

### FAQs
1. **Does PRP regrow cartilage in the knee?** There is no good evidence that it regrows cartilage. Some people report less pain for a time. The doctor will explain what to expect.
2. **Is PRP better than a steroid injection?** Studies give mixed results. Steroids tend to act faster but for a shorter time. The choice depends on your problem and preferences.
3. **How many injections are needed?** It varies. Some plans use one PRP injection, others a short course. Prolotherapy is often given over several sessions.
4. **Is it safe?** PRP uses your own blood, so allergic reactions are rare. Risks include pain, swelling, bruising and, rarely, infection.
5. **Will I still need exercise?** Yes. Exercise remains the main treatment for joint and tendon pain. Injections, if used, support rehab rather than replace it.

### Sources
- American College of Rheumatology (ACR) and Arthritis Foundation guideline for osteoarthritis of the hand, hip and knee, 2019 (recommends against PRP for knee osteoarthritis)
- National Institute for Health and Care Excellence (NICE) interventional procedures guidance IPG637, Platelet-rich plasma injections for knee osteoarthritis
- American Academy of Orthopaedic Surgeons (AAOS) clinical practice guideline, Management of osteoarthritis of the knee (non-arthroplasty)

---

## Page 31 · Amputation and prosthetic rehab

```yaml
title: "Amputation and Prosthetic Rehab in Bengaluru | Rehabify"
description: "Rehab after amputation in Bengaluru: stump care, phantom pain, prosthetic planning and walking training, led by a physiatrist with your prosthetist."
url: /joints-and-sports/prosthetic-rehab/
h1: "Amputation and *prosthetic* rehab"
badge: prosthesis
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalProcedure, name: "Prosthetic rehabilitation", alternateName: ["Amputee rehabilitation", "Artificial limb training"] }
related: [/joints-and-sports/after-fracture-or-surgery/, /older-adults/falls-and-balance/]
posts: []
```

### Intro (answer-first)
After losing part of a leg or arm, rehab helps you heal well, manage pain, get ready for an artificial limb (prosthesis) and learn to use it in daily life. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist with a fellowship in interventional pain management, plans each stage of rehab and works with your prosthetist and therapists.

### At a glance
- **Who it is for:** people after amputation from diabetes, poor circulation, injury or other causes, and their families
- **Stages:** before surgery where possible, healing and stump care, preparing for a prosthesis, training with it, long-term follow-up
- **What rehab covers:** wound and stump care, phantom and stump pain, strength, balance, walking, daily tasks
- **First step:** consultation with your surgery notes
- **At Rehabify:** a staged plan, pain management, prosthetic prescription advice and training, working with a prosthetist [CONFIRM: prosthetist partner]
- **Aim:** as much independence as possible, with or without a prosthesis

### What rehab covers
- **Stump care,** shaping with bandages or a shrinker sock, skin checks and wound healing
- **Pain,** including phantom limb pain (pain felt in the missing part) and stump pain
- **Strength and flexibility,** to prevent joint stiffness and build the muscles needed to walk
- **Prosthetic planning,** whether a prosthesis is suitable, what type and when
- **Training,** putting on the limb, standing, walking, stairs and uneven ground
- **Daily life,** wheelchair skills where needed, home changes, driving and return to work

### Who should see a doctor
- Anyone who has had, or is about to have, an amputation
- Phantom or stump pain that is hard to bear
- A prosthesis that hurts, does not fit or is not being used
- Falls or skin problems while using a prosthesis

### What happens at Rehabify
1. **History.** The cause of amputation, other health problems such as diabetes or heart disease, your home and goals.
2. **Examination.** Stump shape and skin, joint movement, strength, balance and the other leg or arm.
3. **Your plan.** Stump care, pain management and exercise. The doctor discusses whether a prosthesis is suitable and when.
4. **Prosthesis.** Advice on the right type, working with a prosthetist, and checks of fit and alignment.
5. **Training and follow-up.** Walking and daily skills training, then regular reviews as the stump changes.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Bring discharge and surgery notes, and a list of medicines
- Bring your prosthesis, liner and socks if you have them, and the shoes you wear with it
- Bring a family member or carer if possible

### After your visit
You leave with a written plan, home exercises and a review date [CONFIRM: usual review interval]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Contact your surgeon or go to an emergency department if the stump wound opens, leaks, smells or becomes red, hot and swollen, if you have fever, or if your remaining foot becomes cold, pale, blue or develops a new wound. Call 108 or 112 in an emergency.

### FAQs
1. **Will I be able to walk with a prosthesis?** Many people can, but it depends on your overall health, strength, balance and the level of amputation. The doctor will discuss realistic goals with you.
2. **What is phantom limb pain?** Pain or other feelings in the part of the limb that is no longer there. It is common and real. Medicines, desensitisation, mirror therapy and other treatments can help.
3. **When can I get a prosthesis?** Usually after the wound has healed and swelling has settled, often several weeks after surgery. The timing depends on healing.
4. **Why does my prosthesis stop fitting?** The stump often shrinks in the first months. Socks, liners or a new socket may be needed. Regular checks help.
5. **How do I protect my other foot if I have diabetes?** Check it every day, wear well-fitting shoes, keep sugar under control and see a doctor quickly for any wound.

### Sources
- World Health Organization (WHO) Standards for prosthetics and orthotics, 2017
- British Society of Rehabilitation Medicine (BSRM) guidance, Amputee and prosthetic rehabilitation: standards and guidelines
- International Society of Physical and Rehabilitation Medicine (ISPRM) resources on amputee rehabilitation

---

### Confirmations raised in this part
- Sign-off date (lastReviewed) for Pages 25 to 31
- Minimum age for sports injury consults (Page 25)
- Usual review intervals: knee 4 to 6 weeks (26), shoulder 2 to 4 weeks (27), sports rehab 2 to 4 weeks (28), post-surgery 1 to 2 weeks (29), after PRP (30), prosthetic rehab (31)
- Home visits offered after surgery? (Page 29)
- PRP and prolotherapy actually offered at Rehabify (Page 30, also site-plan)
- Ultrasound guidance available for injections (Page 30)
- Prosthetist partner (Page 31)
- Related links point to pages not yet written: /pain-and-spine/neck-pain/, /older-adults/falls-and-balance/, /older-adults/osteoporosis/ (check URLs match site-plan); posts left empty as no launch posts cover joints

---

# Part 5 · Children and older adults

## Page 32 · Children's rehabilitation (hub)

```yaml
title: "Children's Rehabilitation in Bengaluru | Rehabify"
description: "Rehab for children with cerebral palsy, muscular dystrophy and developmental delay. A physiatrist plans care with parents, therapists and schools."
url: /childrens-rehabilitation/
h1: "Children's *rehabilitation*"
badge: children
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
related: [/childrens-rehabilitation/cerebral-palsy/, /neuro-rehabilitation/spasticity/]
posts: [/health-library/cerebral-palsy-what-parents-ask-first/, /health-library/toe-walking-when-to-check/]
```

### Intro (answer-first)
Some children need extra help to sit, stand, walk, use their hands or keep up at school. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist (MD Physical Medicine and Rehabilitation), assesses how your child moves and plays, sets goals with you and works with your child's therapists and school so that everyone follows one plan.

### At a glance
- **Who it is for:** children and teenagers with cerebral palsy, muscular dystrophy, developmental delay, toe walking or other movement problems
- **First step:** a consultation with you and your child, including a play-based examination
- **Main treatments:** therapy plans, stretching and strengthening, splints and orthoses, mobility aids, spasticity management when suitable
- **Formats:** clinic visit; video consult for follow-ups and home programme checks
- **Aim:** more independence in daily life, at home and at school

### Care in this area (track cards)
Cerebral palsy · Muscular dystrophy · Developmental delay and autism support

### What your care includes (step tracker, 4 steps)
1. **Meet and assess.** You tell us about your child's day. The doctor examines movement, muscle tone, joints and posture through play.
2. **Set goals together.** Goals that matter to your family, such as sitting at the table, walking to class or dressing.
3. **Plan the team.** Physiotherapy, occupational therapy, speech therapy, orthoses and medicines, linked into one plan with your child's current therapists and school.
4. **Review and adjust.** Children grow and change, so the plan is checked at regular reviews.

### FAQs
1. **Does a parent need to come to every visit?** Yes. A parent or legal guardian attends every visit and gives consent for any examination or treatment. Older children are also asked for their own agreement.
2. **We already have a therapist. Do we need to change?** No. Rehabify can work with your child's current physiotherapist, occupational therapist or speech therapist and share a written plan with them.
3. **What is a physiatrist's role for a child?** A physiatrist is a doctor for movement and function. The doctor looks at the whole picture, including muscle tone, joints, splints, equipment and medicines, and links the different therapies together.
4. **Can you write a note for my child's school?** Yes. The doctor can suggest seating, rest breaks, access and support at school, with your consent.
5. **From what age can you see my child?** [CONFIRM: youngest age seen at Rehabify]. Please call or WhatsApp to check before booking.

Emergency callout (global). Reviewer box. CTA band.

---

## Page 33 · Cerebral palsy

```yaml
title: "Cerebral Palsy Rehabilitation in Bengaluru | Rehabify"
description: "Cerebral palsy care led by a physiatrist in Bengaluru. Goal-based therapy, splints, spasticity management and school support, planned with parents."
url: /childrens-rehabilitation/cerebral-palsy/
h1: "Cerebral *palsy*"
badge: cerebral-palsy
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Cerebral palsy", alternateName: ["CP"] }
related: [/neuro-rehabilitation/spasticity/, /childrens-rehabilitation/developmental-delay/]
posts: [/health-library/cerebral-palsy-what-parents-ask-first/]
```

### Intro (answer-first)
Cerebral palsy (CP) is a group of conditions that affect movement and posture. It is caused by injury to or differences in the developing brain, before, during or soon after birth. The brain injury does not get worse, but the child's needs change as they grow. At Rehabify in Bengaluru, Dr. Dharshan N A works with parents, therapists and schools to plan rehab that helps your child do more for themselves.

### At a glance
- **What it is:** a lifelong condition that affects muscle tone, movement and posture
- **How it shows:** stiff or floppy muscles, late sitting or walking, toe walking, using one hand more than the other
- **Other needs it can bring:** feeding, speech, vision, learning or seizures, which other specialists also look after
- **First step:** a consultation with your child and you
- **At Rehabify:** therapy plans, stretching and strengthening, orthoses, mobility aids, spasticity medicines and injections when suitable
- **Aim:** comfort, function and independence at home and at school

### What cerebral palsy is
- **Spastic CP,** the most common type, with stiff, tight muscles
- **Dyskinetic CP,** with movements the child cannot control
- **Ataxic CP,** with problems of balance and coordination
- **Mixed types,** with features of more than one

CP can affect one side of the body, both legs, or all four limbs. Common causes include being born very early, low oxygen around birth, infection, or bleeding in the brain. Often no single cause is found.

### Who should see a doctor
- A baby who is late to hold the head, sit, crawl or walk
- Very stiff or very floppy limbs, or a strong preference for one hand before age 1
- Toe walking, frequent falls or a walk that looks different
- A child with CP whose stiffness, pain or posture is getting worse, or who is growing fast

### What happens at Rehabify
1. **History.** Birth, development, current therapies, daily routine, school and what you would most like to change.
2. **Examination.** Muscle tone, joint range, posture, sitting, standing and walking, and hand use, done through play.
3. **Goals.** Clear goals set with you and, where possible, your child.
4. **Your plan.** Physiotherapy and occupational therapy goals, a home programme, splints or orthoses, seating and mobility aids. Medicines or targeted injections for spasticity may be offered when suitable [CONFIRM: botulinum toxin injections offered at Rehabify].
5. **Team links.** A written plan for your child's therapists and school, and referral to an orthopaedic surgeon, neurologist or other specialist when needed.

The doctor decides the right tests and treatment for your child after examining them.

### How to prepare
- Bring birth and medical records, scans, and previous therapy reports
- Bring current splints, shoes and walking aids
- Dress your child in comfortable clothes that make it easy to see legs and arms
- Bring a favourite toy or snack, and short videos of your child moving at home if you can

### After your visit
You leave with a written plan, home exercises and a review date. Reviews are usually every few months, and more often after a growth spurt or a new treatment [CONFIRM]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Call 108 or 112 or go to an emergency department if your child has a seizure lasting more than 5 minutes, trouble breathing, choking while eating, or is very drowsy and hard to wake.

### FAQs
1. **Will my child walk?** It depends on the type and severity of CP, and on age. The doctor can explain what is likely for your child and set goals that matter, whether that is walking, using a walker or getting around in a wheelchair.
2. **Does cerebral palsy get worse?** The brain injury does not get worse. But muscles and joints can become tighter as a child grows, which is why regular reviews and stretching are important.
3. **What are splints or orthoses for?** They hold a joint in a better position, help with standing or walking, and slow down tightness. The doctor advises on the type and checks the fit as your child grows.
4. **Are injections used for stiffness?** Sometimes. Targeted injections into tight muscles can reduce stiffness for a few months, so that stretching and therapy can work better. They are used only when suitable and always with therapy.
5. **Can my child go to a regular school?** Many children with CP do. The doctor can suggest seating, access and support, and write to the school with your consent.

### Sources
- National Institute for Health and Care Excellence (NICE) guideline NG62, Cerebral palsy in under 25s: assessment and management
- NICE guideline CG145, Spasticity in under 19s: management
- American Academy for Cerebral Palsy and Developmental Medicine (AACPDM) care pathways

---

## Page 34 · Muscular dystrophy

```yaml
title: "Muscular Dystrophy Rehab in Bengaluru | Rehabify"
description: "Rehab for children with Duchenne and other muscular dystrophies. Stretching, splints, mobility and school advice, planned with your child's team."
url: /childrens-rehabilitation/muscular-dystrophy/
h1: "Muscular *dystrophy*"
badge: muscular-dystrophy
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Muscular dystrophy", alternateName: ["Duchenne muscular dystrophy", "DMD"] }
related: [/childrens-rehabilitation/cerebral-palsy/, /childrens-rehabilitation/]
posts: [/health-library/school-and-therapy-for-children-with-dmd/]
```

### Intro (answer-first)
Muscular dystrophies are genetic conditions that make muscles weaker over time. Duchenne muscular dystrophy (DMD) is the most common type in children and mostly affects boys. There is no cure yet, but good rehab can help a child stay active, comfortable and independent for longer. At Rehabify in Bengaluru, Dr. Dharshan N A plans stretching, splints, equipment and activity with your family, alongside your child's neurologist and therapists.

### At a glance
- **What it is:** a group of inherited conditions where muscles slowly get weaker
- **How it shows:** frequent falls, trouble climbing stairs or getting up from the floor, large calves, toe walking
- **Diagnosis:** made by a neurologist or paediatrician with blood tests and genetic tests
- **First step:** a consultation with your child and you
- **At Rehabify:** stretching and activity plans, night splints, mobility and seating, school and home advice
- **Aim:** keep joints flexible, stay active safely and support independence

### What it is
- **Duchenne muscular dystrophy (DMD):** signs usually start between ages 2 and 5
- **Becker muscular dystrophy:** similar to DMD but milder and slower
- **Other types,** such as limb-girdle and facioscapulohumeral dystrophy, which can start later

As muscles weaken, joints such as the ankles, knees and hips can get tight, the spine can curve, and in later stages the heart and breathing muscles can be affected. Your child's neurologist and other specialists look after these with the rehab team.

### Who should see a doctor
- A child who falls often, walks on toes or uses hands to push up from the floor
- A child with a diagnosis who needs a stretching programme, splints or equipment
- Tight ankles, pain, or a change in walking or posture
- Planning for school, a wheelchair or home changes

### What happens at Rehabify
1. **History.** Diagnosis, medicines, current therapy, daily routine and school.
2. **Examination.** Strength, joint range, posture, spine, walking and timed tasks such as rising from the floor.
3. **Your plan.** Daily stretching, safe activity, night splints, and advice on avoiding over-tiring exercise.
4. **Equipment.** Walking aids, seating and wheelchairs at the right time.
5. **Team links.** A written plan for your child's neurologist, therapists and school, with referral for heart, breathing or spine checks when needed.

The doctor decides the right tests and treatment for your child after examining them.

### How to prepare
- Bring the diagnosis report, genetic test results and a list of medicines
- Bring splints, shoes and any equipment your child uses
- Note what has changed in the last 6 months, such as falls or stairs

### After your visit
You leave with a written plan, a home stretching programme and a review date. Reviews are usually every 4 to 6 months [CONFIRM]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Call 108 or 112 or go to an emergency department if your child has trouble breathing, a weak cough with a chest infection, chest pain, fainting, or a fall with severe pain or a possible broken bone.

### FAQs
1. **Can rehab stop muscular dystrophy?** No. Rehab does not stop the condition, but it can help keep joints flexible, delay tightness, and help your child stay active and independent for longer.
2. **Is exercise safe for my child?** Gentle, regular activity such as swimming and play is usually encouraged. Heavy, straining exercise can harm weak muscles. The doctor will explain what is safe.
3. **Why are night splints used?** They hold the ankles in a stretched position while your child sleeps, which helps slow down tightness of the calf muscles.
4. **When does a child need a wheelchair?** Many children use one for long distances first, while still walking at home. The doctor helps you plan this so your child keeps up at school and with friends.
5. **Do you work with the school?** Yes, with your consent. The doctor can suggest seating, toilet access, rest breaks and safe PE.

### Sources
- DMD Care Considerations Working Group, Diagnosis and management of Duchenne muscular dystrophy (Lancet Neurology, 2018)
- National Institute for Health and Care Excellence (NICE) guidance on neuromuscular conditions [CONFIRM: preferred reference]
- World Health Organization (WHO), Rehabilitation fact sheet

---

## Page 35 · Developmental delay and autism support

```yaml
title: "Developmental Delay Support in Bengaluru | Rehabify"
description: "Support for children with developmental delay or autism. A physiatrist assesses movement and daily skills and links you with therapists and schools."
url: /childrens-rehabilitation/developmental-delay/
h1: "Developmental delay and *autism* support"
badge: development
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Developmental delay", alternateName: ["Global developmental delay", "Autism spectrum disorder support"] }
related: [/childrens-rehabilitation/cerebral-palsy/, /childrens-rehabilitation/]
posts: [/health-library/toe-walking-when-to-check/]
```

### Intro (answer-first)
Developmental delay means a child reaches milestones, such as sitting, walking, talking or playing, later than expected. Some children with delay are later found to have autism, which is a difference in how a child communicates and experiences the world. At Rehabify in Bengaluru, Dr. Dharshan N A looks at your child's movement, motor skills and daily activities, and helps your family plan therapy with paediatricians, therapists and schools. Rehabify does not diagnose or treat autism itself; it supports the motor and daily living needs that can come with it.

### At a glance
- **What it is:** reaching motor, speech, social or learning milestones later than most children
- **How it shows:** late sitting or walking, clumsiness, toe walking, low muscle tone, trouble with hand skills or self-care
- **Diagnosis of autism:** made by a developmental paediatrician, child psychiatrist or psychologist
- **First step:** a consultation with your child and you
- **At Rehabify:** motor and daily skills assessment, physiotherapy and occupational therapy plans, orthoses when needed, school advice
- **Aim:** help your child take part more easily at home, in play and at school

### Common causes and links
- **Being born early** or a difficult birth
- **Genetic conditions,** such as Down syndrome
- **Low muscle tone** or coordination difficulties
- **Autism,** where motor delay, toe walking and sensory differences are common
- **Often no single cause** is found, and many children catch up with support

### Who should see a doctor
- Not sitting alone by 9 months or not walking by 18 months
- Persistent toe walking after age 2 to 3
- Losing skills your child already had
- Clumsiness, frequent falls, or trouble with buttons, pencils or feeding
- A child with an autism diagnosis who needs help with motor skills or daily routines

### What happens at Rehabify
1. **History.** Birth, milestones, health, current therapies, sleep, feeding and school.
2. **Examination.** Muscle tone, posture, balance, walking, hand skills and play, at your child's pace.
3. **Your plan.** Goals for physiotherapy and occupational therapy, a home activity programme, and orthoses or shoes if needed.
4. **Team links.** Referral to a developmental paediatrician, speech therapist or psychologist when needed, and a written plan for therapists and school with your consent.

The doctor decides the right tests and treatment for your child after examining them.

### How to prepare
- Bring birth records, milestone notes, and any assessment or therapy reports
- Bring short videos of your child walking or playing at home
- Bring a favourite toy or snack and allow extra time; quiet appointment times can be requested [CONFIRM]

### After your visit
You leave with a written plan, home activities and a review date. Reviews are usually every 2 to 3 months [CONFIRM]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Call 108 or 112 or go to an emergency department if your child has a seizure, sudden weakness, a fall with a head injury, or is very drowsy and hard to wake.

### FAQs
1. **Do you treat autism?** No. Autism is not something to be treated away. Rehabify helps with the motor, posture and daily living needs some autistic children have, and works with the specialists who diagnose and support autism.
2. **Will my child catch up?** Many children with delay make good progress, especially with early support. The doctor will explain what to expect for your child after the assessment.
3. **Why does my child walk on their toes?** Toe walking is common in young children and often settles. When it continues, it can be linked to tight calves, low tone, autism or other conditions. The doctor checks for these.
4. **How much therapy does my child need?** It depends on your child's goals. Short, regular home activities built into daily routines often help as much as clinic sessions.
5. **Can you help with school?** Yes. With your consent, the doctor can suggest seating, handwriting aids, movement breaks and other supports.

### Sources
- American Academy of Pediatrics (AAP), Clinical report on identification, evaluation and management of children with autism spectrum disorder, 2020
- National Institute for Health and Care Excellence (NICE) guideline CG170, Autism spectrum disorder in under 19s: support and management
- World Health Organization (WHO), Nurturing care for early childhood development

---

## Page 36 · Older adults (hub)

```yaml
title: "Rehabilitation for Older Adults in Bengaluru | Rehabify"
description: "Rehab for older adults in Bengaluru. Falls and balance, osteoporosis, joint pain and recovery after illness, led by a physiatrist."
url: /older-adults/
h1: "Older *adults*"
badge: older-adults
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
related: [/older-adults/falls-and-balance/, /older-adults/osteoporosis/]
posts: [/health-library/making-a-home-safer-against-falls/, /health-library/osteoporosis-after-50/, /health-library/walking-aids-cane-walker-or-none/]
```

### Intro (answer-first)
Getting older should not mean giving up walking, travel or living on your own. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist who also works in senior care, assesses balance, strength, bones and joints, and plans rehab that helps older adults stay steady, active and independent. Family members are welcome at every visit.

### At a glance
- **Who it is for:** adults over 60 with falls, poor balance, osteoporosis, joint pain, weakness or slow recovery after illness or surgery
- **First step:** a consultation with a review of medicines, balance and walking
- **Main treatments:** strength and balance exercise, walking aids, home safety advice, bone health plans, pain management
- **Formats:** clinic visit; video consult for follow-ups and family check-ins; home visits [CONFIRM]
- **Aim:** fewer falls, stronger bones and more independence

### Care in this area (track cards)
Falls and balance · Osteoporosis

### What your care includes (step tracker, 4 steps)
1. **Check the whole picture.** Balance, strength, walking, eyesight, medicines, bones and memory concerns.
2. **Set goals together.** Such as walking to the temple, using stairs or travelling to see family.
3. **Build strength and balance.** A graded exercise plan with a physiotherapist and at home, with the right walking aid.
4. **Make home safer.** Simple changes to lighting, floors, bathrooms and footwear, and a plan for regular reviews.

### FAQs
1. **Is it too late to start exercise at 75 or 80?** No. Strength and balance can improve at any age with the right exercise. The plan starts gently and builds up.
2. **Can a family member come along?** Yes, and it helps. Family members can learn the home exercises and safety tips. Video consults let relatives in other cities join in.
3. **Do you look at all my medicines?** Yes. Some medicines can cause dizziness or falls. The doctor reviews your list and may suggest a discussion with your prescribing doctor.
4. **Do you offer home visits?** [CONFIRM: home visits, area and charges]. Please call or WhatsApp to ask.
5. **Should I use a walking stick?** Only if it helps. The doctor checks whether you need a cane or walker, the right height, and how to use it safely.

Emergency callout (global). Reviewer box. CTA band.

---

## Page 37 · Falls and balance

```yaml
title: "Falls and Balance Clinic in Bengaluru | Rehabify"
description: "Fall risk and balance assessed by a physiatrist in Bengaluru. Strength and balance exercise, walking aids, medicine review and home safety advice."
url: /older-adults/falls-and-balance/
h1: "Falls and *balance*"
badge: balance
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Falls and balance problems", alternateName: ["Fall risk", "Imbalance in older adults"] }
related: [/older-adults/osteoporosis/, /neuro-rehabilitation/parkinsons/]
posts: [/health-library/making-a-home-safer-against-falls/, /health-library/walking-aids-cane-walker-or-none/]
```

### Intro (answer-first)
Falls are common as we get older, but they are not a normal part of ageing, and many can be prevented. A fall can lead to a broken hip, loss of confidence and less independence. At Rehabify in Bengaluru, Dr. Dharshan N A, whose MD research looked at balance, finds out why you are unsteady and plans exercise, aids and home changes to lower your risk of falling.

### At a glance
- **What it is:** unsteadiness, dizziness or one or more falls, or a fear of falling
- **How common:** about one in three people over 65 falls each year
- **Common causes:** weak legs, poor balance, medicines, eyesight, foot problems, low blood pressure on standing, home hazards
- **First step:** a falls and balance assessment
- **At Rehabify:** strength and balance exercise, walking aid advice, medicine review, home safety plan
- **Aim:** fewer falls and more confidence moving around

### Common causes
- **Weak leg muscles and poor balance,** often after illness or long rest
- **Medicines,** especially sleeping tablets, some blood pressure tablets and many medicines taken together
- **Dizziness** from blood pressure dropping on standing, or inner ear problems
- **Eyesight, foot pain and poor footwear**
- **Conditions** such as Parkinson's disease, stroke, neuropathy, arthritis and memory problems
- **Home hazards,** such as loose mats, poor lighting, wet bathroom floors and stairs without rails

### Who should see a doctor
- Anyone who has fallen in the last year
- Feeling unsteady when walking or turning
- Fear of falling that stops you going out
- Needing to hold furniture or walls to move around the house

### What happens at Rehabify
1. **History.** Falls, near falls, dizziness, medicines, eyesight, health conditions and home set-up.
2. **Examination.** Blood pressure lying and standing, strength, joints, feet, sensation, and balance and walking tests such as getting up from a chair and walking.
3. **Your plan.** A strength and balance programme, the right walking aid, footwear advice, and a medicine review with your prescribing doctor.
4. **Home safety.** A checklist for your home, and family training where helpful.
5. **Rehab.** Exercise with a physiotherapist and at home, built up step by step.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Bring all your medicines in a bag, or a full list
- Bring your walking stick or walker and wear your usual shoes
- Note when and how any falls happened
- Bring a family member if you can

### After your visit
You leave with a written plan, home exercises and a review date. Most people are reviewed after 4 to 6 weeks [CONFIRM]. You or your family can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Call 108 or 112 or go to an emergency department after a fall if there is a head injury and the person takes blood thinners, severe pain or a leg that looks shortened or turned, inability to stand, confusion, or sudden weakness, numbness or slurred speech.

### FAQs
1. **Are falls just part of getting old?** No. Many falls have causes that can be found and changed, such as weak muscles, medicines or home hazards.
2. **What exercise helps prevent falls?** Exercise that challenges balance and builds leg strength, done regularly over months. Tai chi and supervised home programmes are good examples. The doctor will pick what is safe for you.
3. **I am afraid of falling, so I stay at home. Is that safer?** Usually not. Moving less makes muscles weaker and raises the risk of falling. A guided programme helps build confidence safely.
4. **What should I do if I fall at home?** Stay calm, check for pain, and get up slowly only if you can, using a sturdy chair. If you cannot get up, call for help and keep warm. The doctor can teach you and your family how to get up safely.
5. **Do I need a walker?** Not always. The doctor checks your balance and walking and advises if a cane or walker would make you safer, and sets the right height.

### Sources
- World Guidelines for Falls Prevention and Management for Older Adults, 2022 (Age and Ageing)
- National Institute for Health and Care Excellence (NICE) guideline CG161, Falls in older people: assessing risk and prevention
- World Health Organization (WHO), Step Safely: strategies for preventing and managing falls across the life-course, 2021

---

## Page 38 · Osteoporosis

```yaml
title: "Osteoporosis Doctor in Bengaluru | Rehabify"
description: "Osteoporosis assessed and managed by a physiatrist in Bengaluru. Bone health plans, safe exercise, fall prevention and pain care after fractures."
url: /older-adults/osteoporosis/
h1: "Osteo*porosis*"
badge: bones
reviewer: dr-dharshan-n-a
lastReviewed: "[CONFIRM: sign-off date]"
about: { type: MedicalCondition, name: "Osteoporosis", alternateName: ["Thin bones", "Low bone density"] }
related: [/older-adults/falls-and-balance/, /pain-and-spine/back-pain/]
posts: [/health-library/osteoporosis-after-50/]
```

### Intro (answer-first)
Osteoporosis means the bones have become thin and weak, so they break more easily, often after a minor fall. It causes no symptoms until a bone breaks, most often in the hip, spine or wrist. At Rehabify in Bengaluru, Dr. Dharshan N A checks your bone health and fall risk, plans safe exercise and works with you on medicines, diet and pain after a fracture.

### At a glance
- **What it is:** thin, fragile bones that break easily
- **Who gets it:** more common in women after menopause and in men and women over 50
- **How it is found:** a bone density (DEXA) scan, or after a fracture from a minor fall
- **First step:** a consultation with a review of risk factors and past fractures
- **At Rehabify:** bone health assessment, safe strength and balance exercise, fall prevention, medicines, pain care after spine fractures
- **Aim:** fewer fractures and staying active

### Common causes and risk factors
- **Age and menopause,** when bone loss speeds up
- **Family history** of hip fracture or osteoporosis
- **Long-term steroid tablets** and some other medicines
- **Low body weight,** smoking, heavy alcohol use and low activity
- **Low calcium or vitamin D**
- **Conditions** such as rheumatoid arthritis, thyroid problems, diabetes and early menopause

### Who should see a doctor
- A broken bone after a minor fall from standing height or less
- Loss of height, a curved upper back, or sudden back pain without injury
- Women after menopause and men over 50 with risk factors above
- Anyone on long-term steroid tablets

### What happens at Rehabify
1. **History.** Past fractures, falls, medicines, diet, menopause, family history and activity.
2. **Examination.** Height, posture, spine tenderness, strength and balance.
3. **Tests if needed.** A bone density (DEXA) scan, blood tests such as vitamin D and calcium, and spine X-rays if a fracture is suspected.
4. **Your plan.** Calcium and vitamin D, bone medicines when needed, safe strength and balance exercise, and fall prevention.
5. **After a fracture.** Pain management, bracing advice when needed and rehab to get moving again.

The doctor decides the right tests and treatment for you after examining you.

### How to prepare
- Bring any DEXA scan, X-rays and blood reports
- Bring a list of medicines, including calcium, vitamin D and steroids
- Note any past fractures and falls

### After your visit
You leave with a written plan, home exercises and a review date. Reviews depend on your treatment, often every 3 to 6 months at first [CONFIRM]. You can send questions on WhatsApp between visits.

### When to get help urgently
Callout:
> Call 108 or 112 or go to an emergency department after a fall if you cannot stand or bear weight, have severe hip, back or wrist pain, a limb that looks out of shape, or new weakness or numbness in the legs.

### FAQs
1. **Can osteoporosis be reversed?** Bone strength can improve with medicines, exercise and good nutrition, and the risk of fracture can come down. The doctor will explain what to expect in your case.
2. **Is exercise safe with osteoporosis?** Yes, the right kind is. Strength training, walking and balance work help bones and lower fall risk. Avoid sudden twisting and bending forward with weights. The doctor will show you safe movements.
3. **Is calcium enough on its own?** Usually not. Calcium and vitamin D are important, but many people also need bone medicines, exercise and fall prevention.
4. **What is a DEXA scan?** A quick, low-radiation scan that measures bone density, usually at the hip and spine. It helps decide whether you need treatment.
5. **Can men get osteoporosis?** Yes. It is less common than in women but often missed. Men over 50 with risk factors or a fracture from a minor fall should be checked.

### Sources
- National Institute for Health and Care Excellence (NICE) clinical knowledge summary and guidance on osteoporosis, assessing the risk of fragility fracture (CG146)
- Indian Menopause Society clinical practice guidelines on postmenopausal osteoporosis
- International Osteoporosis Foundation (IOF) and World Health Organization (WHO) guidance on osteoporosis and fracture risk

---

### Confirmations raised in this part
- Youngest age of child seen at Rehabify (Page 32 FAQ)
- Whether botulinum toxin injections for spasticity are offered (Page 33)
- Review intervals: CP every few months; DMD every 4 to 6 months; developmental delay every 2 to 3 months; falls 4 to 6 weeks; osteoporosis 3 to 6 months (Pages 33 to 38)
- Quiet or low-sensory appointment times for children (Page 35)
- Home visits, area and charges for older adults (Page 36 at a glance and FAQ; also client-answers Q29a and Q36)
- Preferred NICE reference for neuromuscular conditions (Page 34 Sources)
- Sign-off date (lastReviewed) for all seven pages

---

# Part 6 · Legal and trust

> **Needs legal review before launch.** These 7 pages are a plain-English first draft written to the DPDP Act 2023, the DPDP Rules 2025, the Telemedicine Practice Guidelines 2020 and the Charter of Patients' Rights. They are not legal advice. A lawyer should review them, or Rehabify should confirm "approved as written" (client-answers item 59). Defaults used: records kept at least 3 years, enquiries without a visit 12 months, complaints acknowledged within 24 hours with an aim to resolve in 7 days, privacy contact Dr. Dharshan N A at the single clinic email.

Shared for all 7 pages: `robots: index`, no reviewer box (legal pages are not medical content), "Last updated [CONFIRM: date set at launch]" under the H1, CTA band replaced by a plain "Questions? Write to [CONFIRM: email] or call +91 79048 42576" line. Schema: `WebPage` with `publisher` #clinic.

---

## Page 39 · Privacy Policy

```yaml
title: "Privacy Policy | Rehabify"
description: "How Rehabify in Bengaluru collects, uses, stores and protects your personal and health data under the Digital Personal Data Protection Act, 2023."
url: /privacy-policy/
h1: "Privacy *policy*"
lastUpdated: "[CONFIRM: date set at launch]"
```

### Intro
This policy explains what personal data Rehabify collects, why, how long we keep it and what rights you have. It is written to follow India's Digital Personal Data Protection Act, 2023 (DPDP Act) and the DPDP Rules, 2025. This website is run by [CONFIRM: legal entity name], [CONFIRM: address], Bengaluru, Karnataka. In this policy, "Rehabify", "we" and "us" mean that entity.

### At a glance
- **What we collect:** your name, phone, email, reason for visit, and health details you choose to share or that we record during care
- **Why:** to book and give you care, to keep medical records and to reply to you
- **We never:** sell your data, use it for advertising, or share it for marketing
- **Analytics:** only if you accept cookies, and never with health details
- **Your rights:** access, correction, erasure, grievance and nominee
- **Contact:** Privacy contact, Dr. Dharshan N A, [CONFIRM: email]

### 1. What data we collect
- **When you book or contact us:** name, phone number, email (optional), preferred date, clinic or video format, reason for visit and any message you write.
- **When you are our patient:** medical history, examination findings, scans and reports you share, treatment notes, prescriptions and follow-up records.
- **For video consults:** the details above, plus the call link and any photos or videos you send to help the doctor assess you. We do not record video consults [CONFIRM].
- **When you use the website:** basic technical data such as browser type and pages visited. With your consent only, anonymous usage data through Google Analytics 4.
- **On WhatsApp or phone:** your number and the messages you send us.

Please do not send detailed health information through the website form. Share it at your visit or on a channel the clinic tells you to use.

### 2. Why we use it (purpose)
- To confirm, reschedule or remind you of appointments
- To assess, treat and follow up with you, and to keep medical records required by law
- To answer your questions and complaints
- To issue bills and receipts
- To keep the website secure and working (for example, blocking spam with Cloudflare Turnstile)
- With separate consent only, to understand how the website is used

We use your data only for the purpose we told you about. If we need it for a new purpose, we will ask again.

### 3. Consent
We ask for your consent with an unticked checkbox on our forms. The consent notice tells you what we collect and why. You can withdraw consent at any time by writing to the privacy contact. Withdrawing consent does not affect care already given or records the law requires us to keep.

**Children under 18:** we need verifiable consent from a parent or legal guardian before we process a child's data. A parent or guardian should fill in the form and attend or join consults with the child.

### 4. Who we share it with
We share data only as needed to run our service, with providers who process it on our behalf under contract [CONFIRM: list of processors]:
- Website hosting (Vercel)
- Email delivery for booking requests (Resend)
- Spam protection (Cloudflare Turnstile)
- Video consult platform [CONFIRM: platform name]
- WhatsApp Business (Meta) when you message us
- Analytics (Google Analytics 4), only after you accept cookies

We also share data when the law requires it, with a doctor or hospital you are referred to with your agreement, or in a medical emergency to protect your life. Some providers may store data outside India, as allowed under the DPDP Act.

### 5. How long we keep it
- **Medical records:** at least 3 years from your last visit, as required by medical regulations, or longer where the law or your care needs it [CONFIRM]
- **Enquiries where no visit happened:** 12 months, then deleted
- **Website analytics:** as set in Google Analytics, no longer than 14 months [CONFIRM]

### 6. How we protect it
Access is limited to people who need it for your care or for running the clinic. We use encrypted connections (HTTPS), secure accounts with strong passwords, and providers with recognised security practices. If a personal data breach happens, we will inform you and the Data Protection Board of India as the law requires.

### 7. Your rights
Under the DPDP Act you can:
- **Access:** ask for a summary of the data we hold about you and how we use it
- **Correct and update:** ask us to fix data that is wrong or incomplete
- **Erase:** ask us to delete data we no longer need, except records we must keep by law
- **Withdraw consent** at any time
- **Nominate** someone to use these rights for you if you die or cannot act
- **Raise a grievance** with us, and then with the Data Protection Board of India if you are not satisfied

To use any right, write to the privacy contact. We may ask you to confirm your identity first.

### 8. Cookies
We use essential cookies to make the site work and remember your cookie choice. Analytics cookies load only if you click Accept on the cookie banner. You can change your choice anytime from "Cookie settings" in the footer. We do not use advertising cookies.

### 9. Privacy contact and grievances
Privacy contact: Dr. Dharshan N A, Rehabify, [CONFIRM: address] · Email: [CONFIRM: email] · Phone: +91 79048 42576.
We aim to acknowledge your request within 24 hours and resolve it within 7 days. If it needs longer, we will tell you why.

### 10. Changes
We may update this policy. The "Last updated" date at the top will change, and important changes will be shown on the website.

---

## Page 40 · Terms of Use

```yaml
title: "Terms of Use | Rehabify"
description: "The terms for using the Rehabify website, booking requests and video consultations, including the Telemedicine Practice Guidelines 2020 notice."
url: /terms-of-use/
h1: "Terms of *use*"
lastUpdated: "[CONFIRM: date set at launch]"
```

### Intro
These terms apply when you use www.rehabify.in, send a booking request or take a video consultation with Rehabify. This website is run by [CONFIRM: legal entity name], [CONFIRM: address], Bengaluru. By using the site you agree to these terms. If you do not agree, please do not use the site.

### 1. The website is for general information
Pages on this site explain conditions and treatments in general terms. They do not replace a consultation, and they do not create a doctor and patient relationship. See our Medical Disclaimer.

### 2. Booking requests
- A form, call or WhatsApp message is a request, not a confirmed appointment. We confirm by phone or WhatsApp.
- Please give correct details. If you book for someone else, you confirm you have their permission, or that you are the parent or guardian of a child under 18.
- Appointment, cancellation and refund rules are on the Appointments, Cancellation and Refund page.

### 3. Not for emergencies
This website, our phone line and WhatsApp are not emergency services. **Medical emergency? Call 108 or 112.**

### 4. Telemedicine notice (Telemedicine Practice Guidelines, 2020)
Rehabify offers video consultations [CONFIRM: formats offered] under the Telemedicine Practice Guidelines, 2020, issued by the Board of Governors in supersession of the Medical Council of India.
- **Who consults:** a registered medical practitioner. Dr. Dharshan N A, Karnataka Medical Council Reg. No. [CONFIRM], will tell you his name and registration at the start of the consult.
- **Identity:** we will confirm your name, age and, for a child, the parent or guardian joining the call.
- **Consent:** when you start a video consult that you booked, your consent is implied. For a first consult or a new problem, we may ask for your clear agreement.
- **Limits:** a video consult has limits because the doctor cannot touch or fully examine you. The doctor may ask you to come to the clinic, get tests, or see another doctor in person. The doctor decides whether video is suitable for your problem.
- **Prescriptions:** medicines are prescribed only when the doctor judges it safe after the consult, and only within what the Guidelines allow. Some medicines cannot be prescribed by video.
- **Records:** we keep a record of the consult, any prescription and messages, as described in the Privacy Policy.
- **Emergencies:** video consults are not for emergencies.

### 5. Using the site fairly
Do not misuse the site, try to break its security, send spam, or copy its content for commercial use. Text, design, logo and images belong to Rehabify or are used with permission. You may share links and print pages for personal use.

### 6. Links to other sites
We link to sites such as Google Maps and guideline bodies. We are not responsible for their content or privacy practices.

### 7. Limits of liability
We work to keep information correct and up to date, but the site is provided "as is". To the extent the law allows, Rehabify is not liable for loss caused by relying on general website content without a consultation. Nothing here limits rights you have under Indian consumer law.

### 8. Law and disputes
These terms follow the laws of India. Courts in Bengaluru, Karnataka have jurisdiction [CONFIRM]. Please contact us first so we can try to resolve any problem.

### 9. Contact
Email [CONFIRM: email] · Phone +91 79048 42576 · Address [CONFIRM].

---

## Page 41 · Medical Disclaimer

```yaml
title: "Medical Disclaimer | Rehabify"
description: "Information on the Rehabify website is for general education and does not replace a consultation with a doctor. Read what that means for you."
url: /medical-disclaimer/
h1: "Medical *disclaimer*"
lastUpdated: "[CONFIRM: date set at launch]"
```

### Intro
The health information on this website is for general education. It is not a diagnosis, a treatment plan or a substitute for seeing a doctor. Every person is different, and the right care depends on your history and examination.

### What this means for you
- **Do not start, stop or change treatment** or medicines based on this website alone. Speak to your doctor first.
- **Exercises shown are examples.** Do them only if your doctor or physiotherapist has said they are safe for you. Stop if pain gets sharply worse.
- **Results differ from person to person.** We do not promise any outcome. Where evidence for a treatment is mixed, we say so.
- **Treatments are offered only when suitable,** after the doctor examines you and explains the benefits, risks and other options.
- **Pages are reviewed by a doctor** and dated. Medical knowledge changes, so a page may not reflect the newest research on the day you read it.
- **Using the site, the form or WhatsApp** does not make you our patient. A doctor and patient relationship starts at your consultation.

### Emergencies
Callout:
> Medical emergency? Call 108 or 112, or go to the nearest emergency department. Do not wait for a rehab appointment or a reply on WhatsApp.

### Images
Some images on this site are illustrations or AI-assisted images, not photos of real patients. See our Editorial and Medical Review Policy.

### Questions
If anything on the site is unclear or seems wrong, write to [CONFIRM: email]. We review every report.

---

## Page 42 · Editorial and Medical Review Policy

```yaml
title: "Editorial and Medical Review Policy | Rehabify"
description: "How Rehabify writes, reviews, dates and corrects health content, and how we use AI-assisted images and drafting with doctor approval."
url: /editorial-policy/
h1: "How we write and *review*"
lastUpdated: "[CONFIRM: date set at launch]"
```

### Intro
Every health page on this website is checked and approved by a doctor before it goes live. This page explains who writes our content, how it is reviewed, where facts come from, and how we use AI tools.

### At a glance
- **Reviewer:** Dr. Dharshan N A, MBBS, MD (Physical Medicine and Rehabilitation), Karnataka Medical Council Reg. No. [CONFIRM]
- **Sources:** national and international clinical guidelines and peer-reviewed research
- **Dates:** every medical page shows "Last reviewed"
- **Review cycle:** at least once every 12 months [CONFIRM], sooner when guidance changes
- **No advertising, no sponsorship,** no drug brand names
- **AI use:** disclosed, and always approved by the doctor

### Who writes and reviews
Pages are drafted by our content team (Automize Media Labs, the agency that built the site) and by Dr. Dharshan N A. Dr. Dharshan reviews every medical page for accuracy, safety and plain language, and his name and review date appear in the reviewer box. Nothing medical is published without his approval.

### Our writing rules
- Plain English, short sentences, terms explained the first time they appear
- Facts only. No "best", no cure claims, no promises of results, no testimonials or patient numbers, as required by the Indian Medical Council (Professional Conduct, Etiquette and Ethics) Regulations, 2002, and the Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954
- Where evidence is mixed or weak, we say so
- Warning signs and the emergency line (108 or 112) on symptom pages
- Every page lists its main sources

### Sources we use
Clinical guidelines from bodies such as NICE (UK), the World Health Organization, the American Heart Association and American Stroke Association, the American Academy of Orthopaedic Surgeons, the Indian Council of Medical Research, and peer-reviewed journals. We do not use other clinics' marketing pages as sources.

### AI-assisted content and images
- **Images:** some images on this site, including some portraits of our doctors and illustrations, are AI-assisted. Each AI-assisted portrait is based on the real person and is approved in writing by that person [CONFIRM: written approval]. AI-assisted images never show results, before and after changes, or real patients. Illustrations of the body are simplified and not to scale.
- **Text:** AI tools may help draft or edit text. A person checks every draft, and the doctor reviews and approves every medical statement. AI tools never give medical advice on this site.
- **Labels:** AI-assisted images are marked in their alt text or caption [CONFIRM: labelling method].

### Corrections
If you find an error, write to [CONFIRM: email]. We aim to reply within 7 days, correct confirmed errors promptly and update the "Last reviewed" date.

### Independence
Rehabify does not accept payment, gifts or sponsorship for content. We do not name or promote medicine brands or devices.

---

## Page 43 · Patient Rights and Responsibilities

```yaml
title: "Patient Rights and Responsibilities | Rehabify"
description: "Your rights as a Rehabify patient, based on India's Charter of Patients' Rights, and how you can help us give you safe, effective care."
url: /patient-rights/
h1: "Your rights and *responsibilities*"
lastUpdated: "[CONFIRM: date set at launch]"
```

### Intro
At Rehabify in Bengaluru, you have the right to safe, respectful care that you understand and agree to. These rights follow the Charter of Patients' Rights from the Ministry of Health and Family Welfare, Government of India. Care also goes better when patients and families take part, so we list a few responsibilities too.

### Your rights
1. **Information.** To know your condition, the likely cause, the treatment options, their risks and benefits, and the expected cost, in words you understand.
2. **Records and reports.** To get copies of your medical records and test reports. We aim to provide them within 72 hours of your request [CONFIRM].
3. **Informed consent.** To agree or refuse before any procedure, such as an injection or nerve block. You can ask questions and take time to decide.
4. **Emergency care.** In an emergency, to be guided to the nearest emergency service without delay.
5. **Privacy and dignity.** To be examined with privacy, with a family member or chaperone present if you wish, and to have your information kept confidential.
6. **Second opinion.** To seek another doctor's opinion. We will share your records to help.
7. **Transparent costs.** To know consultation and procedure charges before they happen and to get an itemised bill.
8. **Non-discrimination.** To be treated without discrimination based on illness, disability, gender, religion, caste, language, age or any other ground.
9. **Choice.** To choose where you buy medicines or get tests done.
10. **Safety and quality.** To receive care that follows accepted medical standards.
11. **Referral.** To be told why if you are referred to another doctor or hospital, and to choose which one.
12. **Complaints.** To raise a concern and get a fair hearing, without it affecting your care.

### Children and people who need support
For patients under 18, a parent or guardian gives consent and attends consults. The child's views are heard and respected. Adults may bring a family member or carer, and may name someone to receive information on their behalf.

### Your responsibilities
- Share your full medical history, medicines and allergies, and bring scans and reports
- Follow the plan you agreed to, and tell us if you cannot or if things change
- Do your home exercises as advised, and report new or worsening symptoms
- Arrive on time, or tell us early if you need to cancel
- Treat staff and other patients with respect
- Pay for services as agreed

### Raising a concern
Speak to the doctor or front desk, or write to [CONFIRM: email] or call +91 79048 42576. We aim to acknowledge your concern within 24 hours and resolve it within 7 days. If you are not satisfied, you may contact the Karnataka Medical Council or other authorities.

Charter of Patients' Rights displayed at reception: [CONFIRM].

---

## Page 44 · Appointments, Cancellation and Refund

```yaml
title: "Appointments, Cancellation and Refund | Rehabify"
description: "How to book, reschedule or cancel a clinic visit or video consult at Rehabify, Bengaluru, and when refunds are given."
url: /appointments-cancellation-refund/
h1: "Appointments, cancellation and *refund*"
lastUpdated: "[CONFIRM: date set at launch]"
```

### Intro
This page explains how appointments work at Rehabify for clinic visits and video consultations, how to change or cancel them, and when you get a refund. Fees are explained when we confirm your booking [CONFIRM: fees not shown on site, decision D3].

### At a glance
- **Book:** website form, phone or WhatsApp on +91 79048 42576
- **Confirmed:** only after we call or message you back [CONFIRM: confirmation time]
- **Reschedule or cancel:** free with at least [CONFIRM: 12 hours] notice
- **Video consults:** paid in advance [CONFIRM]
- **Refunds:** to the original payment method within [CONFIRM: 7 working days]

### Booking
1. Send a request with your preferred date, time and format (clinic visit or video consult).
2. We call or message to confirm the slot and the fee.
3. You get a confirmation with the time, address or video link, and what to bring.
Hours: [CONFIRM: consultation days and hours, video consult hours].

### Clinic visits
- Payment at the clinic after the consult [CONFIRM: payment methods]
- Please arrive 10 minutes early with scans, reports and a medicines list
- If you are more than [CONFIRM: 15 minutes] late, we may need to move you to the next free slot
- Sometimes the doctor runs late because of a patient who needs extra time. We will tell you if the delay is long

### Video consultations
- Paid in advance to confirm the slot [CONFIRM: payment method and advance payment]
- The link is sent by [CONFIRM: WhatsApp or email] before the consult
- Join from a quiet place with good light, and keep scans and reports ready to show or send
- For a child, a parent or guardian must join
- If the doctor decides during the call that you need an in-person exam, the video fee is [CONFIRM: adjusted against the clinic visit, or not]

### Rescheduling and cancelling
- Reschedule or cancel by phone or WhatsApp at least [CONFIRM: 12 hours] before your slot
- Prepaid fees for a cancellation with enough notice are refunded in full, or moved to a new slot if you prefer
- Cancellation with less notice, or not joining a video consult within [CONFIRM: 10 minutes] of the start: [CONFIRM: fee not refunded, or one free reschedule]

### If we cancel
If Rehabify cancels or the doctor cannot attend, you can choose a new slot or a full refund.

### Technical problems
If a video consult fails because of a problem at our end and cannot be completed, we will offer a new slot or a full refund. If the problem is at your end, we will try a phone call or a new slot at no extra charge where possible.

### Refunds
- Paid back to the original payment method within [CONFIRM: 7 working days] of approval
- Fees for consults already completed and procedures already done are not refundable
- Procedure charges, if paid in advance, follow the same notice rules [CONFIRM]

### Questions
Write to [CONFIRM: email] or call +91 79048 42576.

---

## Page 45 · Accessibility Statement

```yaml
title: "Accessibility Statement | Rehabify"
description: "Rehabify aims for its website to meet WCAG 2.2 level AA. Read what we support, known limits and how to report a barrier."
url: /accessibility/
h1: "Accessibility *statement*"
lastUpdated: "[CONFIRM: date set at launch]"
```

### Intro
Many of our patients live with pain, weakness, stiffness or reduced vision, so the website should be easy for everyone to use. Rehabify aims for www.rehabify.in to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.

### What we have done
- Works with screen readers such as NVDA, JAWS, VoiceOver and TalkBack
- Every function can be reached by keyboard, with a visible focus outline
- Text and buttons meet colour contrast rules in light and dark areas
- Text can be enlarged to 200% without losing content
- Buttons and links are large enough to tap (at least 24 by 24 pixels, most 44 pixels)
- Motion and scroll effects stop when your device is set to "reduce motion"
- Images have text alternatives; decorative images are hidden from screen readers
- Forms have clear labels, error messages in words, and no time limits
- No "drag only" controls; the body map has a list alternative
- Plain English and short sentences throughout

### Known limits
- Embedded maps and videos from Google and YouTube may not fully meet WCAG 2.2. We give the address and a text summary next to them.
- Older PDF documents, if any, may not be fully accessible. Ask us and we will send the content in another format.

### Testing
We test with automated tools (Lighthouse and axe), keyboard-only use and a screen reader before launch and after major changes [CONFIRM: test date].

### At the clinic
[CONFIRM: lift, ramp, wheelchair access, accessible toilet, parking]. If you need help getting in, tell us when you book and we will plan for it.

### Report a barrier
If you cannot use part of the site, write to [CONFIRM: email] or call or WhatsApp +91 79048 42576. Tell us the page and what went wrong. We aim to reply within 24 hours and to fix the issue or give you the information another way within 7 days.

---

# Part 7 · Health Library launch posts

Shared for all posts: reviewer box, "Last reviewed" date, emergency callout where relevant, related care cards, CTA band. Schema `BlogPosting` (author #dr-dharshan-n-a or #organization, reviewedBy #dr-dharshan-n-a, datePublished, dateModified) + `FAQPage`.

---

## Post 1 · What is a physiatrist, and when should you see one?

```yaml
title: "What Is a Physiatrist? When to See One | Rehabify"
description: "A physiatrist is a doctor who treats pain and loss of movement without surgery. Learn what they do and when to see one in Bengaluru."
url: /health-library/what-is-a-physiatrist/
h1: "What is a *physiatrist*?"
schema: BlogPosting
author: dr-dharshan-n-a
reviewedBy: dr-dharshan-n-a
datePublished: "[CONFIRM: launch date]"
dateModified: "[CONFIRM: launch date]"
lastReviewed: "[CONFIRM: sign-off date]"
readingTime: "5 min"
links: [/, /faqs/, /dr-dharshan-n-a/, /care/]
```

### Intro (answer-first)
A physiatrist is a medical doctor who specialises in Physical Medicine and Rehabilitation (PMR). They diagnose and treat pain, weakness and loss of movement caused by problems in the muscles, bones, joints, nerves, brain or spinal cord, mostly without surgery. At Rehabify in Bengaluru, Dr. Dharshan N A is a physiatrist (MD PMR) with a fellowship in interventional pain management.

### What a physiatrist does
The aim of a physiatrist is simple: help you do more of what matters to you, with less pain. That might be walking to the shop, going back to work, playing cricket again or getting dressed without help.

To do this, a physiatrist:
- **Finds the cause.** A detailed history and examination of how you move, your nerves, strength and balance. Scans and nerve tests are used when they will change your care.
- **Treats the whole problem.** Pain, stiffness, weakness, balance and daily activities, not just one scan finding.
- **Leads a team.** Physiotherapists, occupational therapists, speech therapists, orthotists and your other doctors work to one plan.
- **Uses many tools.** Exercise programmes, medicines, splints and braces, walking aids, and procedures such as image-guided injections, nerve blocks or botulinum toxin injections for muscle stiffness, when suitable.
- **Plans for the long term.** Home programmes and follow-up so progress lasts.

### Physiatrist, physiotherapist or orthopaedic surgeon?
These three roles often get mixed up.
- **A physiatrist** is a doctor (MBBS, then a 3-year MD or DNB in PMR). They diagnose, prescribe medicines, order tests, do procedures and plan rehab.
- **A physiotherapist** is a trained therapist who delivers exercise and movement treatment. Physiatrists and physiotherapists usually work closely together.
- **An orthopaedic surgeon** is a doctor who operates on bones and joints. If surgery may help you, a physiatrist will explain why and refer you to a surgeon of your choice.

Many problems do not need surgery. A physiatrist is often a good first doctor for long-lasting pain or a loss of movement, and a good partner before and after surgery.

### When should you see a physiatrist?
Consider seeing one if you have:
- **Back, neck or joint pain** that lasts more than a few weeks or keeps coming back
- **Sciatica,** with pain, tingling or numbness down the leg
- **A stroke, spinal cord injury or head injury,** to plan rehab and manage stiffness, pain and daily tasks
- **Parkinson's disease** or another nerve condition affecting walking or balance
- **Sports injuries** or a slow recovery after a fracture or joint surgery
- **Knee or hip osteoarthritis** and want to stay active
- **Falls, weak bones or poor balance** in later life
- **A child with movement or development concerns,** such as cerebral palsy, alongside the paediatrician
- **An amputation,** to plan a prosthesis and training

You do not always need a referral. You can book directly.

### What happens at a first visit
1. **Your story.** What happened, what you can and cannot do, and what you want to get back to.
2. **Examination.** Movement, strength, nerves, reflexes, walking and balance.
3. **Review of scans and reports.** Bring everything you have.
4. **A clear plan.** Explained in plain words, with home exercises and a review date.

Follow-ups can often be done by video consult, especially for checking home programmes.

### What a physiatrist cannot promise
Recovery depends on the condition, how long it has been there, your general health and how much rehab you can do. A good physiatrist will tell you honestly what is likely, set realistic goals and change the plan as you progress.

### When to get help urgently
Callout:
> Medical emergency? Call 108 or 112 for sudden weakness on one side, a drooping face, slurred speech, loss of bladder or bowel control, or severe pain after a fall. Do not wait for a rehab appointment.

### FAQs
1. **Is a physiatrist a real doctor?** Yes. A physiatrist has an MBBS degree and a postgraduate degree (MD or DNB) in Physical Medicine and Rehabilitation, and is registered with a State Medical Council.
2. **Do I need a referral to see a physiatrist?** No. You can book directly with Rehabify. If you already have a doctor, we can share updates with them with your consent.
3. **Does a physiatrist do surgery?** No. Physiatrists treat without open surgery. Some, like Dr. Dharshan N A, are trained to do image-guided injections and nerve blocks when suitable.
4. **How is a physiatrist different from a physiotherapist?** A physiatrist is a doctor who diagnoses, prescribes and plans care. A physiotherapist delivers exercise and hands-on therapy. They usually work as a team.
5. **Can I see a physiatrist by video?** Yes, for many follow-ups and some first consults. The doctor may ask you to visit the clinic if an in-person examination is needed.

### Sources
- International Society of Physical and Rehabilitation Medicine (ISPRM), description of the specialty
- World Health Organization, Rehabilitation 2030 initiative and rehabilitation fact sheet
- National Medical Commission, MD Physical Medicine and Rehabilitation curriculum

---

## Post 2 · The first 90 days after a stroke: what rehab looks like

```yaml
title: "First 90 Days After a Stroke: Rehab Guide | Rehabify"
description: "What stroke rehab looks like in the first 3 months: early goals, therapy, stiffness, home safety and warning signs, from a Bengaluru physiatrist."
url: /health-library/first-90-days-after-stroke/
h1: "The first 90 days after a *stroke*"
schema: BlogPosting
author: dr-dharshan-n-a
reviewedBy: dr-dharshan-n-a
datePublished: "[CONFIRM: launch date]"
dateModified: "[CONFIRM: launch date]"
lastReviewed: "[CONFIRM: sign-off date]"
readingTime: "6 min"
about: { type: MedicalCondition, name: "Stroke" }
links: [/neuro-rehabilitation/stroke/, /neuro-rehabilitation/spasticity/]
```

### Intro (answer-first)
The first 3 months after a stroke are when the brain is most ready to relearn, so this is when steady, well-planned rehab matters most. Rehab in this period focuses on safety, regaining movement and daily skills, and preventing problems such as stiffness, shoulder pain and falls. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist, plans stroke rehab with families from the hospital stage onwards.

### Why the first 90 days matter
After a stroke, the brain starts to rewire itself. Healthy areas learn to take over some work from damaged areas. This process is called neuroplasticity. It is most active in the early weeks and months, which is why guidelines advise starting rehab as soon as a person is medically stable.

Recovery does not stop at 90 days. Many people keep improving for a year or longer, and practice still helps years later. But habits set in the first months, good or bad, shape what comes next.

### Weeks 1 to 2: in hospital
- **Medical care first.** The stroke team finds the cause and starts medicines to lower the risk of another stroke.
- **Early, gentle movement.** Sitting up, changing position and short periods out of bed when the team says it is safe.
- **Swallowing check.** Before eating or drinking, to prevent food going into the lungs.
- **Positioning.** The weak arm is supported on a pillow so the shoulder does not hang and strain.
- **Planning.** The family meets the rehab team to discuss goals and going home.

### Weeks 2 to 6: going home and building routine
This is often the hardest stage for families. A clear plan helps.
- **Therapy most days.** Physiotherapy for sitting balance, standing and walking; occupational therapy for dressing, bathing and using the hand; speech therapy if talking or swallowing is affected.
- **A home programme.** Short sessions spread through the day work better than one long session.
- **Home safety.** Clear paths, a chair in the shower, grab rails near the toilet, and good lighting at night.
- **Equipment.** A walking aid, wheelchair or ankle splint if needed, chosen and fitted properly.
- **The carer.** Learn safe ways to help with transfers. Look after your own rest and health too.

### Weeks 6 to 12: getting more independent
- **Harder goals.** Walking outdoors, climbing stairs, preparing simple meals, returning to hobbies.
- **The weak hand.** Repeated task practice, such as picking up objects, helps the hand and arm. In some people, using the weak arm more while the strong arm rests can help, if the doctor and therapist advise it.
- **Thinking and mood.** Memory, attention and low mood are common after a stroke. Tell the doctor; help is available.
- **Work and driving.** Ask before you drive again. Return to work is planned step by step.

### Problems to watch for, and what helps
- **Spasticity (muscle stiffness).** Tight muscles in the arm or leg, often a bent elbow, a clenched fist or a pointed foot. Daily stretching, positioning and splints help. When stiffness gets in the way of care or movement, a physiatrist may offer botulinum toxin injections, combined with therapy.
- **Shoulder pain.** Common on the weak side. Support the arm, avoid pulling on it during transfers, and get it checked early.
- **Falls.** Poor balance and a weak leg raise the risk. Practise balance with a therapist and make the home safer.
- **Swelling, skin and bladder problems.** Report a swollen hand or leg, red skin areas or new bladder problems.
- **Another stroke.** Take medicines as advised, and keep blood pressure, sugar and cholesterol under control.

### How a physiatrist helps
A physiatrist looks at the whole picture: movement, stiffness, pain, swallowing, bladder, mood and home life. They set goals with the family, coordinate therapists, adjust medicines, treat spasticity and plan equipment. At Rehabify, follow-up can be at the clinic or by video consult, so families can get advice without a long trip.

### When to get help urgently
Callout:
> Call 108 or 112 straight away if there is sudden new weakness or numbness, a drooping face, slurred speech, sudden confusion, loss of vision, a severe headache, or a fall with a head injury. Think **BE FAST**: Balance, Eyes, Face, Arm, Speech, Time to call.

### FAQs
1. **When should stroke rehab start?** As soon as the person is medically stable, often within the first days in hospital. Early care focuses on positioning, gentle movement and swallowing safety.
2. **Does recovery stop after 3 months?** No. Recovery is fastest in the first months, but many people keep improving for a year or more with regular practice.
3. **How much therapy is enough?** It depends on the person. Guidelines encourage as much task practice as the person can safely do, spread across the day, plus a home programme.
4. **What is spasticity, and can it be treated?** It is muscle stiffness caused by the stroke. Stretching, positioning and splints help, and botulinum toxin injections may be offered when suitable, always with therapy.
5. **Can stroke rehab be done at home?** Much of it can, with a home programme, therapist visits and video follow-ups. Clinic visits are still needed for examination and some treatments.

### Sources
- American Heart Association and American Stroke Association, Guidelines for Adult Stroke Rehabilitation and Recovery
- National Institute for Health and Care Excellence (NICE) guideline NG236, Stroke rehabilitation in adults, 2023
- World Health Organization, Rehabilitation fact sheet

---

## Post 3 · Low back pain: what helps, and the warning signs to act on

```yaml
title: "Low Back Pain: What Helps and When to Worry | Rehabify"
description: "Most low back pain gets better with movement and time. Learn what helps, what to avoid and the warning signs that need urgent care."
url: /health-library/low-back-pain-when-to-worry/
h1: "Low back pain: what helps, and when to *worry*"
schema: BlogPosting
author: dr-dharshan-n-a
reviewedBy: dr-dharshan-n-a
datePublished: "[CONFIRM: launch date]"
dateModified: "[CONFIRM: launch date]"
lastReviewed: "[CONFIRM: sign-off date]"
readingTime: "5 min"
about: { type: MedicalCondition, name: "Low back pain" }
links: [/pain-and-spine/back-pain/, /pain-and-spine/sciatica/, /pain-and-spine/image-guided-injections/]
```

### Intro (answer-first)
Most low back pain is not caused by serious damage, and most people improve within a few weeks by staying active and avoiding long bed rest. A small number of people have warning signs that need urgent care. At Rehabify in Bengaluru, Dr. Dharshan N A, a physiatrist trained in interventional pain management, helps people with back pain that is not settling, and checks for the signs that need faster action.

### Why backs hurt
The lower back is made of bones (vertebrae), discs, small joints, ligaments, muscles and nerves. Pain can come from any of these. In most people, no single damaged structure is found. Doctors call this "non-specific" back pain. It is real pain, but it is usually not dangerous.

Common triggers include lifting or twisting, long hours of sitting, poor sleep, stress and low fitness. Scans often show disc bulges or "wear and tear", but these are common in people without any pain, so they do not always explain the problem.

### What helps
- **Keep moving.** Walk, do your normal tasks as much as pain allows, and increase step by step. Movement helps the back recover faster than rest.
- **Avoid long bed rest.** A day or two of taking it easy during a bad flare is fine, but staying in bed longer tends to slow recovery.
- **Exercise.** A programme of strengthening, stretching and general fitness, ideally guided by a physiotherapist, helps both pain and future flare-ups. Yoga or Pilates can help some people.
- **Heat.** A warm pack can ease muscle spasm.
- **Pain relief for comfort.** Short-term medicines may help you move. Ask a doctor or pharmacist which is safe for you.
- **Stay at work if you can,** with changes such as breaks from sitting and lighter tasks for a while.
- **Sleep and stress.** Both affect how strongly you feel pain.

### What usually does not help
- Long bed rest
- Routine X-rays or MRI in the first weeks without warning signs
- Belts or braces worn all day for a long time
- Treatments that promise a quick fix or a "permanent cure"

### When to see a doctor
Book a consultation if:
- Pain lasts more than 2 to 3 weeks, or keeps coming back
- Pain spreads below the knee, or there is tingling or numbness in the leg (this may be sciatica)
- Pain wakes you at night, or there is morning stiffness lasting over 30 minutes
- You have osteoporosis, a history of cancer, or take steroid medicines
- Pain stops you working, sleeping or caring for family

### The warning signs to act on now
Callout:
> **Go to an emergency department or call 108 or 112** if back pain comes with:
> - numbness around the private parts, buttocks or inner thighs
> - new difficulty passing urine, or loss of bladder or bowel control
> - weakness in both legs, or a leg that is getting weaker quickly
> - fever, or feeling very unwell
> - a fall or accident
>
> These can be signs of nerve compression (cauda equina syndrome), infection or a fracture, which need care within hours.

Also see a doctor soon if you have unexplained weight loss with back pain, or you are over 50 with new back pain for the first time.

### How Rehabify helps with back pain
1. **Examination** of how your back moves, nerve tests, strength and the hips and pelvis.
2. **Review of scans,** with new ones only if they will change your treatment.
3. **A plan that starts with movement:** a graded exercise programme, work and posture advice, and medicines for comfort.
4. **Image-guided injections or nerve blocks** when pain clearly comes from a specific joint or nerve and has not settled. These are used to calm pain so rehab can work, not as the only treatment.
5. **Prevention:** a home programme to lower the chance of the next flare.

### FAQs
1. **How long does low back pain last?** Many episodes improve within 2 to 6 weeks. Some people have pain that lasts longer or returns, and they benefit from a planned exercise programme.
2. **Do I need an MRI for back pain?** Not usually at first. An MRI helps if warning signs are present, there is leg weakness or numbness, or pain has not improved after 4 to 6 weeks of treatment.
3. **Is it safe to exercise with back pain?** Yes, for most people. Start gently and build up. Some discomfort is normal; sharp or spreading pain means slow down and ask your doctor.
4. **When is an injection useful?** When pain comes from a specific joint or nerve and has not settled with exercise and medicines. Results vary from person to person.
5. **Will I need surgery?** Most people with back pain do not. Surgery is considered for specific problems, such as severe nerve compression, and the doctor will refer you to a spine surgeon if needed.

### Sources
- National Institute for Health and Care Excellence (NICE) guideline NG59, Low back pain and sciatica in over 16s
- American College of Physicians guideline on non-invasive treatment of low back pain, 2017
- WHO guideline on management of chronic primary low back pain in adults, 2023

---

### Confirmations raised in this part
- Legal entity name and full address (all 7 legal pages, Terms jurisdiction clause: courts in Bengaluru)
- Single clinic email (privacy contact, complaints, accessibility, corrections)
- Legal review of the 7 pages, or "approved as written"
- Policies "Last updated" date, set at launch
- List of data processors, including the video consult platform name; whether video consults are ever recorded
- Medical records retention beyond 3 years; GA4 data retention (proposed 14 months)
- Formats offered (video consults) for the Telemedicine notice
- Karnataka Medical Council registration number
- Content review cycle (proposed every 12 months)
- Written approval of AI-assisted portraits, and how AI-assisted images are labelled (alt text or caption)
- Time to provide copies of records (proposed 72 hours)
- Charter of Patients' Rights displayed at reception
- Fees policy (D3), payment methods, advance payment for video consults
- Booking confirmation time; consultation and video consult hours
- Cancellation notice period (proposed 12 hours), late-arrival limit (15 min), video no-show limit (10 min) and late-cancellation rule
- Whether a video fee is adjusted against a needed clinic visit; procedure advance payments
- Refund time (proposed 7 working days)
- Accessibility test date; clinic access facts (lift, ramp, wheelchair, toilet, parking)
- Launch date (datePublished for the 3 posts) and doctor sign-off dates

---

# Part 8 · Review guide for Dr. Dharshan and open confirmations

How to review: read each page as a patient would. Mark anything that is not how you work. You do not need to fix wording; tell us what is wrong and we rewrite. We never ask about drug names, machine models or protocols.

Open confirmations so far:
1. Address, landmark, hours, video consult hours, Sunday rule
2. KMC registration number; fellowship year; languages
3. Email; legal entity; founding year
4. Formats offered (clinic, video, home programme, home visits)
5. In-house physiotherapists or partner therapists
6. PRP and prolotherapy offered? Cardiopulmonary, oncology, pelvic or post-COVID rehab offered?
7. Video platform; consult length; recording policy; prescription by video
8. Booking confirmation time; first visit length; usual review interval
9. Approval of each AI portrait used
10. D1 AI tools removal · D2 hospital names on profile · D3 fees
