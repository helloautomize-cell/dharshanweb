# P6 · Forms, analytics and integrations

What it does: makes the booking form real (Server Action + Resend email), adds consent-gated Google Analytics, click-to-load Maps and YouTube, Speed Insights, security headers and a locked preview.
Check before approving: submit the form yourself on the preview (adult, under-18, video consult), check the email table arrives with the consent text and IST time, try it with JavaScript off, and confirm DevTools shows zero Google requests before you click Accept. Add the Resend DNS records only after checking the agent's `docs/dns-resend.md` against the live DNS. Never change MX.

```
# Phase 6: Booking form, email, consent analytics, Maps, video, headers, preview lock

Before starting, confirm these paths exist and list them:
- resources/docs/design-development-plan.md
- resources/docs/site-plan.md
- resources/docs/new-website-content.md
- resources/docs/client-answers.md
- resources/design/rehabify-design-v3.html
- lib/site-config.ts
- lib/booking-context.ts
- lib/whatsapp.ts
- lib/consent.ts
- app/contact/page.tsx
- app/thank-you/page.tsx
If any is missing, STOP and tell me. Do not substitute another file.

Branch: phase-6. Deploy a Vercel preview. Do not merge to main until I approve.

Read resources/docs/design-development-plan.md section 0 again before you start. The form, its states and the cookie banner must look like the night-and-ice design in resources/design/rehabify-design-v3.html, not a generic form.

Non-negotiables (short form):
- Night-and-ice design. Fonts: Bricolage Grotesque, Geist, Geist Mono and Instrument Serif italic via next/font, self-hosted.
- Logo PNG only. The shape never changes. Recolour per surface.
- Aqua and apricot are text colours only on night. No pure black. No red cross. One glow button per viewport.
- Body text at least 17px, tap targets 48px, contrast 4.5:1, visible focus, prefers-reduced-motion respected everywhere, content visible without JS.
- No em or en dashes in UI strings, emails or JSON-LD. Copy only from new-website-content.md and site-plan.md. Never invent facts, hours, fees or response times: unknown values stay [CONFIRM: ...].
- Compliance (IMC Regulations 2002, Drugs and Magic Remedies Act 1954, DPDP Act 2023 and DPDP Rules 2025, Telemedicine Practice Guidelines 2020): no testimonials, ratings, AggregateRating or Review schema, before/after, "best", "No. 1", "leading", "guaranteed", "cure", "permanent", "100%", drug or device brands, or named referral hospitals. No fees unless site-config sets them. "Medical emergency? Call 108 or 112." on every care page, the thank-you page and the footer. Consent boxes are never pre-ticked. No third-party request (GA, Maps, YouTube) before consent or a click.
- No Framer Motion, GSAP or Lenis. No database.

Tasks:

1. Shared schema. Create lib/booking-schema.ts with one Zod schema used by both the client and the Server Action. Fields, in this order on the form:
   a. Doctor (radio cards, required): Dr. Dharshan N A · Dr. Selina Kh · No preference. Default "No preference". Prefill from lib/booking-context.ts (Dr. Selina's profile and her cards prefill her; Dr. Dharshan's prefill him) and from ?doctor=.
   b. Format (segmented control, required): Clinic visit · Video consult. Prefill from ?format= (finder bar) and booking-context.
   c. Reason (select, required): exactly the list in site-plan.md section 6, in that order, ending with "Other". Prefill from ?reason= and booking-context. Unknown values fall back to no selection, never to "Other".
   d. Patient name (required, 2 to 80 characters, letters, spaces, dots and apostrophes).
   e. Mobile (required). Normalise before validating: strip spaces, hyphens, brackets and dots; remove a leading +91, 91 (when 12 digits) or 0 (when 11 digits). The result must be 10 digits starting with 6, 7, 8 or 9. Store and email it as +91XXXXXXXXXX. Show a fixed "+91" prefix inside the field. inputmode="tel", autocomplete="tel-national".
   f. Age (required): a number plus a Years/Months select. Years 0 to 110; Months 0 to 23. Months always counts as under 18.
   g. Preferred date (required): native date input, min today and max today + 60 days, both computed in Asia/Kolkata. If a Sunday is picked, show the Sunday note from site-config ([CONFIRM: Sunday rule] until answered; until then show no note and do not block Sundays).
   h. Time of day (required): Morning · Afternoon · Evening, derived from site-config hours for the chosen date. While hours are [CONFIRM], show all three.
   i. City (optional, max 60 characters).
   j. "The patient is under 18" checkbox. When ticked: Guardian name (required) and a guardian consent checkbox (required, unticked) appear. Guardian consent text, exactly: "I am the parent or legal guardian of this patient, and I agree that Rehabify may use these details to contact me about the appointment, as explained in the Privacy Policy." (Privacy Policy links to /privacy-policy/.) If the age is under 18 years, or the unit is Months, and the box is unticked, block submission with an error on the under-18 box.
   k. Consent checkbox (required, unticked), text exactly as site-plan.md section 4: "I agree that Rehabify may use these details to contact me about my appointment, as explained in the Privacy Policy." (Privacy Policy links to /privacy-policy/.)
   l. Submit button label: "Request a time".
   Under the form, exactly: "Please do not include detailed medical information here. You can share it with the doctor at your consultation."
   There is no free-text message field. Do not add one.

2. Spam protection (all three, server side):
   a. Honeypot: a text input named "website", visually hidden off-screen, aria-hidden="true", tabindex="-1", autocomplete="off". If filled, return the normal success redirect and send nothing.
   b. Minimum fill time 3 seconds: a hidden field carrying the render time, HMAC-signed with FORM_SECRET so it cannot be forged. Under 3 seconds, or a bad signature, is rejected like the honeypot (silent success, nothing sent).
   c. Cloudflare Turnstile (managed widget, night theme on the form) when TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY are set. Verify the token server side with siteverify. If the keys are not set, skip Turnstile and log one server warning. Turnstile is a security service: it loads on /contact/ without analytics consent, as the Privacy Policy already says.

3. Server Action + Resend (app/contact/actions.ts):
   a. Validate with the shared schema. Never trust client values.
   b. Send with the Resend SDK. From: BOOKING_FROM_EMAIL (for example bookings@rehabify.in, on the verified domain). To: BOOKING_TO_EMAIL (the single clinic email in site-config, still [CONFIRM]). Until the domain is verified, preview deploys use Resend's test sender and send only to AGENCY_TEST_EMAIL.
   c. Subject: "Booking request: [Reason] · [Clinic visit or Video consult] · [Doctor or No preference]".
   d. Body: an HTML table plus a plain-text version. Rows: Doctor, Format, Reason, Patient name, Mobile (as a tel:+91... link and a https://wa.me/91... link), Age with unit, Under 18 (Yes/No), Guardian name, Preferred date (for example "Mon 19 Oct 2026"), Time of day, City, Source page (the path the visitor came from, plus booking-context reason if any), Submitted at (IST, for example "12 Oct 2026, 4:05 pm IST"), Consent (the exact consent text shown, then "Ticked at [IST time]"), Guardian consent (exact text and IST time, only when under 18).
   e. No health details beyond the reason chosen from the list. Do not log form values to the console or to Vercel logs. Log only an anonymous request id and the outcome.
   f. Set the Vercel function region to bom1.

4. Form states:
   a. Client validation on blur and on submit. On submit with errors: an error summary at the top of the form (role="alert", focused, each item links to its field), plus field errors tied with aria-describedby and aria-invalid. Write short, plain error messages (for example "Enter a 10-digit mobile number") and list every one in your report for approval.
   b. Pending: the button shows a spinner and is disabled; no layout shift.
   c. Success: redirect (303) to /thank-you/?type=clinic or /thank-you/?type=video. The thank-you page is noindex, hides the mobile dock, shows the copy from new-website-content.md Page 12 (the confirmation time stays [CONFIRM] until answered), the emergency line, and its two buttons. When analytics consent exists it fires generate_lead once with form_type only.
   d. Failure (Resend error, timeout over 10 seconds, Turnstile failure): stay on the page, keep every value the visitor typed, and show the failure copy exactly: "Something went wrong. Your details are still here. Call or WhatsApp +91 79048 42576 and we will book you straight away." with two buttons: Call (tel:+917904842576) and WhatsApp (lib/whatsapp.ts pre-fill).
   e. Works without JS: the form posts to the Server Action natively; errors and kept values render from the server; success redirects. Turnstile's no-JS case: the server treats a missing token as a failure and shows the Call and WhatsApp buttons.
   f. While any form field has focus on mobile, the dock stays hidden (already built; re-test).

5. Resend domain DNS (document only, do not change DNS):
   Write docs/dns-resend.md with the exact records Resend shows for rehabify.in: the SPF TXT and the bounce MX on Resend's own send subdomain, the DKIM TXT (resend._domainkey), and a DMARC TXT at _dmarc (p=none, rua to the clinic email) if none exists. Above the table, record a snapshot of the current records (dig for A, AAAA, CNAME, MX, TXT and NS on rehabify.in and www.rehabify.in). Rules written at the top: do not edit or delete any existing MX record; if an SPF record already exists on the apex, do not create a second one. I will add the records and tell you when Resend shows "Verified".

6. Consent-gated analytics (lib/consent.ts, components/analytics/):
   a. Nothing from googletagmanager.com or google-analytics.com loads before the visitor clicks Accept in the cookie banner. Reject and Settings have equal weight with Accept. "Cookie settings" in the footer reopens the banner.
   b. On Accept: set Consent Mode v2 defaults first (ad_storage, ad_user_data, ad_personalization denied, always; analytics_storage granted), then inject gtag with NEXT_PUBLIC_GA_ID. If the ID is not set, inject nothing.
   c. On a later Reject: update analytics_storage to denied, delete _ga and _ga_* cookies, and stop sending events.
   d. Page views are sent manually on route change. page_location keeps only utm_* query parameters; every other parameter and the hash are stripped.
   e. Events (lib/analytics.ts, a typed track() that no-ops without consent): book_click (cta_location: nav, hero, finder, card, dock, cta_band, sticky_card), call_click, whatsapp_click, directions_click, map_load, video_play, generate_lead (form_type: clinic or video). No names, mobiles, ages, doctors, reasons, dates or any health data in any event or parameter.
   f. The stored consent records the choice, a version number and the time. Ask again after 12 months or when the version changes.

7. Google Maps click-to-load (Plan your visit strip, /plan-your-visit/, /contact/):
   A static placeholder (night card with the ice mark, the address from site-config and a "Show map" button). On click, insert the Google Maps embed iframe for the address and fire map_load. "Get directions" is a plain link to https://www.google.com/maps/dir/?api=1&destination=... and fires directions_click. While the address is [CONFIRM], hide both the map button and the directions link in production.

8. YouTube-nocookie facade (components/video-facade.tsx):
   A self-hosted thumbnail (public/images/video/), a play button with an accessible name, and the title and "Video: [channel]" below the frame. On click, load https://www.youtube-nocookie.com/embed/[id]?autoplay=1 and fire video_play. No request to youtube.com, ytimg.com or youtube-nocookie.com before the click. Videos come from site-config.videos; it is empty now, so render the facade only on /styleguide with a sample and render nothing on live pages. Emit VideoObject JSON-LD only for real entries.

9. Vercel Speed Insights: add @vercel/speed-insights (cookieless, no consent needed). Confirm it sends no personal data. If the Privacy Policy text in new-website-content.md does not cover it, tell me in the report. Do not edit legal copy yourself.

10. Security headers (next.config, all routes):
   - Strict-Transport-Security: max-age=31536000; includeSubDomains (no preload yet)
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()
   - X-Frame-Options: DENY
   - Content-Security-Policy allowing only: self; www.googletagmanager.com and *.google-analytics.com / *.analytics.google.com (script and connect, used only after consent); challenges.cloudflare.com (script and frame); www.youtube-nocookie.com and www.google.com/maps (frame, used only after click); Vercel Speed Insights endpoints. Also object-src 'none', base-uri 'self', form-action 'self', frame-ancestors 'none', upgrade-insecure-requests.
   - Do not switch every route to dynamic rendering just to use nonces. Choose the approach that keeps static pages static, and explain your choice in the report.
   - poweredByHeader: false. productionBrowserSourceMaps: false.

11. Lock the preview:
   - Turn on Vercel Deployment Protection for preview deployments. If the plan does not allow it, add middleware Basic Auth on every host that is not www.rehabify.in, using PREVIEW_USER and PREVIEW_PASS. Send me the credentials privately, never in the repo.
   - The SITE_INDEXABLE switch stays false: X-Robots-Tag noindex, meta noindex and robots.txt Disallow: / on every host. On any host other than www.rehabify.in, noindex stays even when SITE_INDEXABLE is true.
   - Add .env.example listing every variable from this phase with no values.

12. Playwright tests (tests/forms.spec.ts, tests/consent.spec.ts, tests/headers.spec.ts). Use Turnstile's official test keys (always-pass and always-fail) and a RESEND_MODE=mock|fail switch so tests never send real email.
   Forms:
   - Required-field errors, the summary gets focus, each summary link moves focus to its field.
   - Mobile normalisation: "+91 98765 43210", "098765 43210", "919876543210", "98765-43210" all become +919876543210; "5876543210", "98765432" and "+1 2025550123" are rejected.
   - Age 16 Years with the under-18 box unticked is blocked; 8 Months unticked is blocked; ticked without guardian name or guardian consent is blocked; ticked and complete passes and the email includes the guardian consent text.
   - Consent unticked blocks submission. Both consent boxes render unticked.
   - Date outside today to +60 days (IST) is rejected server side even if the client is bypassed.
   - Honeypot filled: redirect to success, mock mailer called 0 times. Submission under 3 seconds: same.
   - Success redirects to /thank-you/?type=clinic and ?type=video; the thank-you page has meta robots noindex and no mobile dock.
   - RESEND_MODE=fail: the failure copy shows, Call and WhatsApp buttons work, every typed value is still in the fields.
   - JavaScript disabled (javaScriptEnabled: false), Turnstile keys unset: a valid submission reaches /thank-you/; an invalid one re-renders with errors and kept values. With Turnstile keys set and JS off: the failure state with Call and WhatsApp shows, values kept.
   - Prefill: /dr-selina-kh/ Book leads to the form with Dr. Selina Kh selected; /contact/?reason=Knee%20pain&format=video preselects both.
   - Email snapshot: the mock email HTML contains the IST time, the exact consent text and tel: and wa.me links.
   Consent:
   - On every route, before any click: zero requests to googletagmanager.com, google-analytics.com, analytics.google.com, google.com/maps, youtube.com, youtube-nocookie.com, ytimg.com.
   - After Reject: still zero. After Accept: gtag loads and a page_view is sent; its URL has no query except utm_*.
   - No GA request contains the test patient's name, mobile, age, reason or doctor.
   - Map loads only after "Show map"; the video iframe only after play.
   Headers:
   - Every header in task 10 is present on /, /contact/ and one care page. No CSP violation in the console on any route, including /contact/ with Turnstile and the styleguide video facade after click.
   - Preview host returns 401 or the Vercel protection page without credentials, and X-Robots-Tag: noindex with them.

Acceptance:
- All Playwright tests pass, plus every earlier test (overflow, nested interactives, section height, reduced motion).
- curl -sI on the preview /contact/ shows all headers from task 10 and X-Robots-Tag: noindex.
- One real end-to-end submission from the preview reaches AGENCY_TEST_EMAIL with the full table (forward me the email).
- Lighthouse on /contact/ (preview, mobile, median of 3): Accessibility 100, Best Practices 100, Performance at least 90.
- Home first-load JS still under 120 KB gzipped; /contact/ under 150 KB gzipped (report both numbers).
- Zero em or en dashes in rendered HTML and in the email template.

## Report
- What was built, by task number; deviations and why (including the CSP approach)
- Screenshots at 390 and 1440: the empty form, the error summary state, the under-18 state, the failure state, the thank-you page, the cookie banner, the map placeholder and the loaded map
- The full list of error messages for approval
- docs/dns-resend.md contents
- Tests run and results; Lighthouse medians; JS sizes
- Environment variables I must set in Vercel, by environment
- Remaining issues and [CONFIRM] items this phase depends on (email, hours, Sunday rule, confirmation time, address)
STOP after this. Do not start Phase 7.
```
