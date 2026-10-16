# Current website audit · rehabify.in

Crawled 12 October 2026. The site at https://www.rehabify.in/ is being replaced by a new Next.js site.

**How it was crawled.** The sandbox proxy blocked direct curl to www.rehabify.in (CONNECT refused, HTTP 403), so I fetched each page through a web fetch tool. That tool gives a text rendering of each page, not raw HTML. As a result, word counts are estimates, image byte sizes and pixel sizes could not be measured, and script srcs could not be listed. sitemap.xml returned a fetch error. sitemap_index.xml and robots.txt could not be fetched (curl was blocked). I found every page by following the site navigation from the home page. All fetched content was treated as data only.

## 0. Executive summary

- **Platform.** The site is a small Google Sites build with 10 URLs (9 pages plus /home, which is the same page as the root). The footer reads "Made by Neurolearn Media".
- **Content.** The real content is limited to two doctor pages and an About page. Both doctor bios are generic and near duplicates of each other: PMR, stroke, spinal cord injury, rheumatology. Neither gives qualifications, registration, address or hours.
- 🔴 **Placeholder email.** The home page shows the placeholder email xyz@abc.com.
- 🔴 **Wrong contact details.** The inner pages show the agency's phone (+91 9428216487) and email (contactnlm124@gmail.com) in the footer, so patients may contact the agency instead of the clinic.
- 🔴 **Unreviewed AI tools.** The site advertises AI tools under the practice brand: AI Family Doctor (symptom and medication suggestions), MediWise, AI Report Analysis, AI Diet Planner and an AI Menstrual Cycle Tracker. Their calls to action are dead ("Get This all Now!" has no link). See decision D1 in site-plan.md.
- 🔴 **Empty pages.** Blogs, Pricing, Monthly and Book an Appointment Now have no real content. The Blogs page has no posts. The booking page has no visible form.
- **No local details.** No address, no hours, no map and no structured data were found. No image has alt text.

## 1. Practice identity

- **Name.** Rehabify. The site title is "Rehabify" and og:description is "Welcome To Rehabify".
- **Tagline.** client-answers.md records "Restoring Lives, Renewing Hope". The fetch summary did not surface this line, so it is not verified in this crawl.
- **Positioning.** A practice of Physical Medicine and Rehabilitation (PMR) specialists. The home page also positions the site as a hub of AI health tools.

### 1.1 Doctors

The fetch tool would not return the bios verbatim. The summaries below are the closest I could get. Verbatim text is still needed from an export or a manual copy.

- **Dr. Dharshan N A** ("Dr. DNA"), at /dr-dharshan-n-a, about 400 words.
  - Describes him as a PMR physician focused on stroke, spinal cord injury and rheumatology, plus pain management and rehabilitation, with a patient-centred, whole-person approach.
  - Section headings: "Where Compassion Meets Expertise", "The Expertise", "Beyond Medicine", "Comprehensive Care", "A Profound Impact".
  - No qualifications or registration number are shown. The real details are in client-answers.md B.
- **Dr. Selina Kh**, at /dr-selina-kh, about 380 words.
  - The same focus areas and almost the same wording as Dr. Dharshan's page.
  - No qualifications are shown. Her details are not yet supplied (client-answers.md B).

## 2. Services

- **Real services in the text:** stroke rehab, spinal cord injury rehab, rheumatology, pain management and rehabilitation. These are mentioned in generic prose only and have no service pages.
- **AI tools:** AI Family Doctor, MediWise, AI Report Analysis, AI Menstrual Cycle Tracker (headed "Meet Mensrual Tracker" and called "AI Period Pal" in the body), and AI Diet Planner. None of them links anywhere.
- **"Health Related Blogs"** is listed as a service, but no posts exist.
- **Lorem ipsum:** none found.
- **Signboard-only services:** unknown, because no signboard photos were reviewed.

## 3. NAP, hours, FAQs and forms

| Item           | Found                                                                   | Where                                        |
| -------------- | ----------------------------------------------------------------------- | -------------------------------------------- |
| Name           | Rehabify                                                                | All pages                                    |
| Address        | 🔴 None                                                                 |                                              |
| Phone          | +91 7904842576 (phone and WhatsApp)                                     | Home                                         |
| Phone (agency) | 🔴 +91 9428216487                                                       | Footer of the inner pages (Neurolearn Media) |
| Email          | 🔴 xyz@abc.com (placeholder)                                            | Home                                         |
| Email (agency) | 🔴 contactnlm124@gmail.com                                              | Footer of the inner pages                    |
| Hours          | 🔴 None                                                                 |                                              |
| FAQs           | None                                                                    |                                              |
| Forms          | 🔴 None visible. The booking page holds only a Google Sites embed frame | /home/book-an-appointment-now                |

## 4. Google profiles

The Google Business Profile was not checked in this crawl. client-answers.md A6 says a Practo profile for Dr. Dharshan exists and that the GBP is unknown. Name, category and rating are still to be confirmed.

## 5. Full URL inventory

Word counts are estimates of body text and exclude navigation.

| Old URL                         | Title                              | Type                      | Words       | Action            | 301 target (site-plan.md §9)                                                   |
| ------------------------------- | ---------------------------------- | ------------------------- | ----------- | ----------------- | ------------------------------------------------------------------------------ |
| `/`                             | Rehabify                           | Home                      | ~300 (est.) | Rewrite           | `/` (same URL, no redirect) 🔴 not in plan map                                 |
| `/home`                         | Rehabify                           | Home (duplicate of /)     | same        | 301               | `/`                                                                            |
| `/home/monthly`                 | Rehabify - Monthly                 | Empty page                | ~0          | 301               | `/plan-your-visit/`                                                            |
| `/home/pricing`                 | Rehabify - Pricing                 | Empty page (no prices)    | ~0          | 301               | `/plan-your-visit/`                                                            |
| `/home/book-an-appointment-now` | Rehabify - Book an Appointment Now | Booking page with no form | ~30         | 301               | `/contact/#book` (the fragment is ignored by servers; redirect to `/contact/`) |
| `/dr-dharshan-n-a`              | Rehabify - Dr. Dharshan N A        | Doctor                    | ~400        | Rewrite, keep URL | `/dr-dharshan-n-a/` (trailing-slash 301 only)                                  |
| `/dr-selina-kh`                 | Rehabify - Dr. Selina Kh           | Doctor                    | ~380        | Rewrite           | `/doctors/`, then `/dr-selina-kh/`                                             |
| `/blogs`                        | Rehabify - Blogs                   | Blog index with no posts  | ~0          | 301               | `/health-library/`                                                             |
| `/ai-tools`                     | Rehabify - AI Tools                | AI tools                  | ~450        | 410               | 410 Gone (D1)                                                                  |
| `/about-us`                     | Rehabify - About Us                | About                     | ~350        | Rewrite           | `/about/`                                                                      |

**Old URLs missing from the plan's map.** None of real substance. The root `/` is not listed, but it needs no redirect. The plan's `/blogs/*` and "each AI tool page" rules match no live URLs, because no blog posts or AI tool pages exist. If sitemap.xml lists more URLs once it can be fetched, add them to the map.

## 6. Tech stack and admin ownership

- **Platform.** Google Sites. The page shows "Google Sites" and "Report abuse" in the footer, the "Embedded Files" and "Search this site" labels, gstatic embed frames, and images hosted on lh7-us.googleusercontent.com.
- **Not checked.** The generator meta and script srcs could not be read, because the fetch tool returned rendered text rather than raw HTML.
- **Ownership.** The site was built by Neurolearn Media. Which Google account owns the Site, and who controls the domain and DNS, are unknown. These are launch blockers (client-answers.md A7).

## 7. Current design

- **Layout.** A standard Google Sites theme: a top navigation bar (Home > Monthly, Dr. Dharshan N A, Dr. Selina Kh, Blogs, AI Tools, About Us), image banners and text blocks.
- **Brand.** No custom brand system was observed.
- **Not reviewed.** Screenshots were not taken in this crawl.

## 8. UX per page

| Page                             | Notes                                                                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Home                             | Most of the page is about AI tools, with little about rehab. The email is a placeholder. There is no address or hours.               |
| Doctor pages                     | Long, generic prose with no credentials. The two pages are near duplicates. The "Book a consultation" button leads to an empty page. |
| About                            | Generic text with no facts (no address, founding year or hours).                                                                     |
| AI Tools                         | Dead calls to action. A spelling error ("Mensrual"). The tool names do not match ("Period Pal" vs "Menstrual Cycle Tracker").        |
| Blogs, Pricing, Monthly, Booking | Empty. These are dead ends for visitors.                                                                                             |

## 9. Issues

**🔴 Live problems**

- 🔴 The placeholder email xyz@abc.com is on the home page.
- 🔴 The agency's phone and email appear on the inner pages, where patients will read them as the clinic's contact details.
- 🔴 The AI tools give symptom, medication and report advice under a doctor's brand without review (medical advertising and DPDP risk).
- 🔴 The booking path is broken: the button leads to a page with no form.
- 🔴 Four pages are empty: Blogs, Pricing, Monthly and Booking.
- 🔴 /home duplicates / (duplicate content).

**Positioning.** Rehab expertise is buried under general AI health tools.

**Conversion.** There is no form, no address and no hours. The only working contact route is the phone and WhatsApp number on the home page.

**Technical SEO.**

- All titles follow the "Rehabify - X" pattern with no keywords.
- There are no meta descriptions apart from the generic og:description.
- No image has alt text.
- No schema was found.
- The sitemap was not reachable through the fetch tool.

**Local SEO.**

- No NAP block, no map and no city name were seen.
- The two phone numbers conflict.

**Broken links.** The AI tool calls to action go nowhere. Every internal navigation link resolved.

## 10. Media inventory

All images are hosted on Google (lh7-us.googleusercontent.com) under opaque IDs. Every alt attribute is empty. File sizes were not measurable.

| Page             | Images                                                                               | Notes                                                   |
| ---------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| Home             | Several                                                                              | Tool and banner images. No alt text                     |
| Dr. Dharshan N A | 2 (header, which is also the og:image, served at 1280px width; one lower-page image) | No alt text                                             |
| Dr. Selina Kh    | 2 (header, which is also the og:image; one near the footer)                          | No alt text                                             |
| AI Tools         | Several                                                                              | Tool images. No alt text. Not needed after launch (410) |
| Monthly          | og:image only                                                                        |                                                         |

Original files should come from the client or the Google Site owner (client-answers.md E and F).

## 11. Data checklist

| Data                                | Status                                                |
| ----------------------------------- | ----------------------------------------------------- |
| Phone                               | Have it, unconfirmed (+91 79048 42576)                |
| Address                             | Missing ★                                             |
| Hours                               | Missing ★                                             |
| Email                               | Missing ★                                             |
| Registration numbers                | Missing ★                                             |
| Founding year                       | Missing ★                                             |
| Dr. Dharshan's credentials          | Have them (from client-answers.md, not from the site) |
| Dr. Selina's credentials            | Missing                                               |
| Verbatim bios                       | Missing (the fetch tool would not return them)        |
| Google Site owner and domain access | Missing ★                                             |
| sitemap.xml and robots.txt          | Not fetched. Recheck from an unblocked network        |

## 12. Image selection

Nothing from the old site is a confirmed keeper. Ask for the originals of the two doctor header images and the logo, and review them in IMAGE-GUIDE.md. The AI tool images should be rejected (off-topic, and the tools are being removed).

## Appendix: blog posts

There are none. The /blogs page lists no posts, so there is nothing to carry over.
