# P9 · Client answers and launch

What it does: two prompts. 9A applies the clinic's answers and clears every [CONFIRM] until launch-check reads zero. 9B launches www.rehabify.in, with a hard STOP before any DNS change.
Check before approving: paste 9A with the updated client-answers.md in the repo and approve it before pasting 9B. In 9B the agent stops with a DNS plan and changes nothing until you reply "go"; have the registrar login, Search Console, Bing and the Google Business Profile ready first.

## Prompt 9A · Apply client answers

```
# Phase 9A: Apply client answers and clear [CONFIRM]

Before starting, confirm these paths exist and list them:
- resources/docs/client-answers.md (the updated version, with answers dated after 12 Oct 2026)
- resources/docs/entity-facts.md
- resources/docs/new-website-content.md
- resources/docs/site-plan.md
- lib/site-config.ts
- resources/content/
- scripts/launch-check.mjs (or the launch-check script in package.json)
If any is missing, STOP and tell me. Do not substitute another file.

Branch: phase-9a. Deploy a Vercel preview. Do not merge to main until I approve.

Non-negotiables (short form):
- Night-and-ice design. Fonts: Bricolage Grotesque, Geist, Geist Mono and Instrument Serif italic via next/font, self-hosted.
- Logo PNG only. The shape never changes.
- Aqua and apricot are text colours only on night. No pure black. No red cross. One glow button per viewport.
- Body text at least 17px, tap targets 48px, contrast 4.5:1, visible focus, reduced motion respected, content visible without JS.
- No em or en dashes. Copy only from new-website-content.md and the exact answer lines in client-answers.md. Never invent facts.
- Compliance (IMC 2002, Drugs and Magic Remedies Act 1954, DPDP 2023 and Rules 2025, Telemedicine Guidelines 2020): no testimonials, ratings, AggregateRating or Review schema, before/after, "best", "No. 1", "leading", "guaranteed", "cure", "permanent", "100%", drug or device brands, named referral hospitals, fees unless site-config sets them. Emergency line on every care page and the footer. Unticked consent. No third-party request before consent or a click.

Tasks:
1. Read client-answers.md fully. Build qa/answers-applied.md: a table of every item that changed since the 12 Oct 2026 version: item number, answer, where it goes (site-config key, content file and line, schema property, entity-facts line), status.
2. Apply facts to lib/site-config.ts first (address, geo, hours per doctor, Sunday and holiday rule, phone answering hours, email, confirmation time, founding year, legal entity, registration numbers, languages, formats, socials, legalLastUpdated, Google profile URLs). Every page, the footer, the form, emails and schema must read from site-config, so one change updates everywhere.
3. Apply copy answers to resources/content/ using the exact answer lines. Remove a [CONFIRM: ...] only where the answer covers it fully. If an answer is partial, keep the [CONFIRM] and note what is still missing.
4. Check resources/docs/entity-facts.md against the answers. If they differ, STOP and show me both versions. Do not edit entity-facts.md yourself.
5. Doctor sign-off (item 58) and legal review (item 59): set lastReviewed on each page from the sign-off date recorded in client-answers.md, and legalLastUpdated from the legal approval date. If either approval is not recorded, those items stay open.
6. Photos: if approved Dr. Selina Kh photos or clinic photos are now in resources/images/, run npm run images, replace the "Photo to be added" placeholder, update alt-text.json, face boxes and _todo.md. Use an AI-generated portrait only if client-answers.md records the doctor's written approval of that exact image.
7. Hidden sections: show a section that was hidden for lack of facts only when its facts are now answered (for example the languages chip, Dr. Selina's credentials block, fees per D3, socials).
8. Answers that change the page list (for example a cardiopulmonary hub, item 17) or need new copy: do not write the copy. STOP and list them; I will send the content.
9. Re-run npm run launch-check after each group of changes until it reports zero [CONFIRM] and zero failures. If items remain because the clinic has not answered, list them with their item numbers and stop there. Do not fill them with guesses or placeholders.
10. Re-run all Playwright tests, check-dashes, check-initial-html, the schema test and export-seo.

Acceptance:
- npm run launch-check prints zero [CONFIRM] and zero failures (or a list of unanswered items, each traced to a client-answers.md item number).
- grep -r "\[CONFIRM" over the production build output (.next/server and out) returns nothing.
- NAP test from Phase 7 passes: every phone, address, email and hours string matches entity-facts.md exactly.
- All tests pass. Lighthouse (preview, mobile, median of 3) on / and /contact/: Performance at least 90, Accessibility 100, Best Practices 100.

## Report
- qa/answers-applied.md
- launch-check output (final run)
- Items still open, with client-answers.md item numbers
- Screenshots at 390 and 1440: footer, contact cards, Dr. Selina Kh profile hero, Home doctors section
- Tests run and results; Lighthouse medians
STOP after this. Do not start Phase 9B.
```

---

## Prompt 9B · Launch www.rehabify.in

```
# Phase 9B: Launch

Before starting, confirm these paths exist and list them:
- resources/docs/redirects.json
- resources/docs/entity-facts.md
- docs/dns-resend.md
- qa/gbp-launch.md
- scripts/indexnow.mjs
- app/robots.ts
- app/sitemap.ts
If any is missing, STOP and tell me. Do not substitute another file.

Branch: main (Phase 9A is merged). Production deploys come from main only.

Non-negotiables (short form):
- Night-and-ice design. Fonts: Bricolage Grotesque, Geist, Geist Mono and Instrument Serif italic via next/font, self-hosted.
- Logo PNG only. The shape never changes.
- Aqua and apricot are text colours only on night. No pure black. No red cross. One glow button per viewport.
- Body text at least 17px, tap targets 48px, contrast 4.5:1, visible focus, reduced motion respected, content visible without JS.
- No em or en dashes. Copy only from new-website-content.md. Never invent facts.
- Compliance (IMC 2002, Drugs and Magic Remedies Act 1954, DPDP 2023 and Rules 2025, Telemedicine Guidelines 2020): no testimonials, ratings, AggregateRating or Review schema, before/after, "best", "cure", "guaranteed", "100%", drug or device brands, named referral hospitals, fees unless site-config sets them. Emergency line on every care page and the footer. Unticked consent. No third-party request before consent or a click.
- DNS changes happen ONLY after I reply "go". Never edit or delete MX records. Never change any record that is not in the approved DNS plan.

Step 1. Pre-flight (no DNS changes)
a. Confirm: Phase 9A approved and merged; npm run launch-check reports zero; the Resend domain shows Verified; production Turnstile keys, NEXT_PUBLIC_GA_ID, RESEND_API_KEY, BOOKING_TO_EMAIL and BOOKING_FROM_EMAIL are set in the Vercel Production environment; Deployment Protection still covers previews. If any item fails, STOP and tell me.
b. Add www.rehabify.in and rehabify.in to the Vercel project. Set www.rehabify.in as the primary domain and rehabify.in to redirect permanently (301 or 308) to https://www.rehabify.in.
c. Snapshot the live DNS: dig +noall +answer for A, AAAA, CNAME, MX, TXT, CAA and NS on rehabify.in, www.rehabify.in, _dmarc.rehabify.in and the Resend subdomain records. Save it as qa/launch/dns-before.txt. This is the rollback copy.
d. Write qa/launch/dns-plan.md with a table: host, type, current value, new value, TTL, reason. It contains only:
   - www CNAME to the value Vercel shows (usually cname.vercel-dns.com), replacing the old Google Sites target (often ghs.googlehosted.com)
   - apex A record(s) to the value Vercel shows (usually 76.76.21.21), replacing any old A/AAAA on the apex
   - a CAA record only if one exists and blocks Let's Encrypt
   - the Google Search Console domain verification TXT (I will give you the value)
   List separately "Records that must not change": every MX, SPF, DKIM, DMARC and other TXT record. If possible, lower the TTL of the two changing records to 300 at least 24 hours before the switch, and say so in the plan.
e. Production deploy from main with SITE_INDEXABLE=false. Check the production deployment on its vercel.app URL: all routes 200, form works with the real mailer to AGENCY_TEST_EMAIL, noindex present.

STOP. Send me qa/launch/dns-before.txt, qa/launch/dns-plan.md and qa/launch/rollback.md (Step 7) and wait. Do not change any DNS record until I reply "go".

Step 2. DNS switch (only after I reply "go")
a. Apply exactly the records in the approved plan, nothing else (or tell me the exact values to enter if I make the change at the registrar).
b. Poll until both hosts resolve to Vercel (dig @1.1.1.1 and @8.8.8.8) and Vercel shows the certificate issued for both. Then check:
   curl -sI http://rehabify.in/ → one 301/308 to https://www.rehabify.in/
   curl -sI https://rehabify.in/ → one 301/308 to https://www.rehabify.in/
   curl -sI http://www.rehabify.in/ → one redirect to https://www.rehabify.in/
   curl -sI https://www.rehabify.in/ → 200
c. Confirm MX and TXT records are identical to qa/launch/dns-before.txt (diff the dig output). Send a test email to the clinic address and confirm it arrives.

Step 3. Turn indexing on
a. Set SITE_INDEXABLE=true in the Vercel Production environment only. Redeploy production.
b. Verify on https://www.rehabify.in: no X-Robots-Tag noindex header, meta robots allows indexing, robots.txt shows the AI bot allowlist and the Sitemap line, sitemap.xml lists only https://www.rehabify.in/ URLs with trailing slashes.
c. Verify the vercel.app production URL and any preview URL still send X-Robots-Tag: noindex and previews still require authentication.

Step 4. Verify every old URL
For every row in resources/docs/redirects.json, plus /home/, /about-us/ and /blogs/ with a trailing slash, and the apex versions:
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" https://www.rehabify.in[source]
Each must return 301 (or 308) directly to the final URL, and that URL must return 200 in one hop (no chains). /ai-tools and /ai-tools/anything return 410. Save the output table to qa/launch/redirects-check.txt. Any failure: fix and re-run before continuing.

Step 5. Search engines and listings (I do the clicks; you prepare and verify)
a. Google Search Console: Domain property for rehabify.in (verified by the TXT record in the plan). Submit https://www.rehabify.in/sitemap.xml. Request indexing for /, /about/, /doctors/, /dr-dharshan-n-a/, /dr-selina-kh/, /care/, the 5 hubs and /contact/. Write the exact steps for me in qa/launch/search-console.md and confirm afterwards that the sitemap shows "Success".
b. Bing Webmaster Tools: import from Search Console, submit the same sitemap.
c. IndexNow: run node scripts/indexnow.mjs for all sitemap URLs. Expect HTTP 200 or 202. Save the response.
d. Google Business Profile, Practo and Justdial: I apply qa/gbp-launch.md (website link with UTM, appointment link with UTM, name exactly "Rehabify", hours and NAP exactly as entity-facts.md). Afterwards, check the public GBP listing and confirm the website link opens https://www.rehabify.in/ with the UTM parameters and that GA4 (with consent) records the source as google / organic / gbp.

Step 6. Post-launch smoke tests (production)
Run tests/smoke.spec.ts against https://www.rehabify.in:
- Every sitemap URL returns 200 with a self-canonical and no noindex.
- Zero GA, Maps or YouTube requests before consent or a click; GA loads after Accept.
- Security headers present (HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options, CSP) and no CSP errors on /, /contact/ and one care page.
- One real booking submission with production Turnstile, marked "TEST, please ignore" in the patient name, using the agency's mobile. Tell me before you send it so I can warn the clinic. The email arrives at the clinic address with SPF, DKIM and DMARC all "pass" in its headers.
- /thank-you/?type=clinic is noindex; the 404 page returns 404; /llms.txt and /llms-full.txt return 200.
- OG preview of / and one care page renders (check with a social card debugger).
- Lighthouse on production, mobile, median of 3, on the six Phase 8 pages: Performance at least 90, Accessibility 100, Best Practices 100, SEO 100.

Step 7. Rollback plan (write it to qa/launch/rollback.md before Step 2, keep it ready)
- Triggers: the site is down or shows certificate errors for more than 10 minutes; booking emails do not arrive; wrong phone, address or hours are live; a compliance problem is found on a live page.
- Code problem: use Vercel Instant Rollback to the previous production deployment, then fix on a branch.
- Wrong content indexed: fix and redeploy; if a page must disappear, return 410 and use the Search Console removals tool. Do not set SITE_INDEXABLE false for a single page problem.
- DNS problem: restore the two changed records from qa/launch/dns-before.txt (only after I say so), and tell me the expected propagation time.
- Keep the old Google Site intact (unpublished from the custom domain, not deleted) for 30 days after launch.

Acceptance:
- dns-plan.md approved by me before any DNS change, and dns-before.txt saved.
- Apex and http redirect to https://www.rehabify.in in one hop; MX and TXT records unchanged (diff attached).
- redirects-check.txt shows every old URL 301 in one hop to a 200, and 410 for the AI tools.
- robots.txt shows the AI bot allowlist; no noindex on www.rehabify.in; noindex on every other host.
- Sitemap submitted to Google and Bing; IndexNow returned 200 or 202.
- Smoke tests pass; Lighthouse production medians meet the targets; the test booking email passed SPF, DKIM and DMARC.

## Report
- Step 1 pre-flight results, dns-before.txt and dns-plan.md (first STOP)
- After "go": dig and curl outputs, the MX/TXT diff, redirects-check.txt, robots.txt and sitemap check, IndexNow response
- Search Console and Bing status, GBP link check
- Smoke test results and Lighthouse production medians
- rollback.md
- Remaining issues
STOP after this. Do not start Phase 10.
```
