# Sitemap · www.rehabify.in

Final URL list for the coding agent. `trailingSlash: true`, lowercase, final host `https://www.rehabify.in`. Generated from `site-plan.md` (the single source). `app/sitemap.ts` must output exactly the **Indexable** rows below, each with `lastModified` from the content file's `lastReviewed` or `dateModified`.

| # | Page | URL | Group | In sitemap.xml |
|---|---|---|---|---|
| 1 | Home | `/` | Core | Yes |
| 2 | About Rehabify | `/about/` | Core | Yes |
| 3 | Our doctors | `/doctors/` | Core | Yes |
| 4 | Dr. Dharshan N A | `/dr-dharshan-n-a/` | Core | Yes |
| 4b | Dr. Selina Kh | `/dr-selina-kh/` | Core | Yes |
| 5 | All care | `/care/` | Core | Yes |
| 6 | Conditions A to Z (Care section) | `/care/#a-z` | Section | No separate URL |
| 7 | Video consultation | `/video-consultation/` | Core | Yes |
| 8 | Plan your visit | `/plan-your-visit/` | Core | Yes |
| 9 | Contact and book | `/contact/` | Core | Yes |
| 10 | FAQs | `/faqs/` | Core | Yes |
| 11 | Guides | `/guides/` | Core | Yes |
| 12 | Thank you (noindex) | `/thank-you/` | Core | No (noindex) |
| 14 | Pain and spine | `/pain-and-spine/` | Care | Yes |
| 15 | Back pain | `/pain-and-spine/back-pain/` | Care | Yes |
| 16 | Neck pain | `/pain-and-spine/neck-pain/` | Care | Yes |
| 17 | Sciatica | `/pain-and-spine/sciatica/` | Care | Yes |
| 18 | Image-guided injections and nerve blocks | `/pain-and-spine/image-guided-injections/` | Care | Yes |
| 19 | Neuro rehabilitation | `/neuro-rehabilitation/` | Care | Yes |
| 20 | Stroke rehabilitation | `/neuro-rehabilitation/stroke/` | Care | Yes |
| 21 | Spinal cord injury rehab | `/neuro-rehabilitation/spinal-cord-injury/` | Care | Yes |
| 22 | Head injury rehab | `/neuro-rehabilitation/head-injury/` | Care | Yes |
| 23 | Parkinson's disease rehab | `/neuro-rehabilitation/parkinsons/` | Care | Yes |
| 24 | Spasticity care | `/neuro-rehabilitation/spasticity/` | Care | Yes |
| 25 | Joints and sports | `/joints-and-sports/` | Care | Yes |
| 26 | Knee pain and osteoarthritis | `/joints-and-sports/knee-pain/` | Care | Yes |
| 27 | Shoulder pain and frozen shoulder | `/joints-and-sports/shoulder-pain/` | Care | Yes |
| 28 | Sports injuries | `/joints-and-sports/sports-injuries/` | Care | Yes |
| 29 | Rehab after a fracture or surgery | `/joints-and-sports/after-fracture-or-surgery/` | Care | Yes |
| 30 | PRP and prolotherapy | `/joints-and-sports/prp-and-prolotherapy/` | Care | Yes |
| 31 | Amputation and prosthetic rehab | `/joints-and-sports/prosthetic-rehab/` | Care | Yes |
| 32 | Children's rehabilitation | `/childrens-rehabilitation/` | Care | Yes |
| 33 | Cerebral palsy | `/childrens-rehabilitation/cerebral-palsy/` | Care | Yes |
| 34 | Muscular dystrophy | `/childrens-rehabilitation/muscular-dystrophy/` | Care | Yes |
| 35 | Developmental delay and autism support | `/childrens-rehabilitation/developmental-delay/` | Care | Yes |
| 36 | Older adults | `/older-adults/` | Care | Yes |
| 37 | Falls and balance | `/older-adults/falls-and-balance/` | Care | Yes |
| 38 | Osteoporosis | `/older-adults/osteoporosis/` | Care | Yes |
| 39 | Privacy Policy | `/privacy-policy/` | Legal | Yes |
| 40 | Terms of Use | `/terms-of-use/` | Legal | Yes |
| 41 | Medical Disclaimer | `/medical-disclaimer/` | Legal | Yes |
| 42 | Editorial and Medical Review Policy (incl. AI-assisted images) | `/editorial-policy/` | Legal | Yes |
| 43 | Patient Rights and Responsibilities | `/patient-rights/` | Legal | Yes |
| 44 | Appointments, Cancellation and Refund (incl. video consults) | `/appointments-cancellation-refund/` | Legal | Yes |
| 45 | Accessibility Statement | `/accessibility/` | Legal | Yes |
| post | What is a physiatrist, and when should you see one? | `/guides/what-is-a-physiatrist/` | Guides | Yes |
| post | The first 90 days after a stroke: what rehab looks like | `/guides/first-90-days-after-stroke/` | Guides | Yes |
| post | Low back pain: what helps, and the warning signs to act on | `/guides/low-back-pain-when-to-worry/` | Guides | Yes |

Not in the sitemap: `/thank-you/` (noindex), `/styleguide/` (noindex, remove or password-protect before launch), 404, any `?` URLs.

Also generated at build time:
- `/robots.txt` from `app/robots.ts`: `Disallow: /` until `SITE_INDEXABLE=true`. At launch, allow all, plus the AI crawlers listed in master prompt Part 8 (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended), and point to the sitemap.
- `/llms.txt` and `/llms-full.txt` (draft in `docs/llms.txt`).
- `/sitemap.xml`.

Total URLs listed: 48.
