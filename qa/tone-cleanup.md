# Tone cleanup log — Phase 8

Sweep of all rendered text across the built site (61 pages) for the blacklist:
delve, navigate (metaphor), embark, realm, tapestry, testament, seamless,
comprehensive, holistic, robust, leverage, empower, elevate, unlock, tailored,
cutting-edge, state-of-the-art, world-class, top-notch, game-changer,
peace of mind, rest assured, one-stop, "it's important to note",
"in today's fast-paced world", "whether you're", "not just", "look no further",
sentence-starters Furthermore/Moreover/Additionally, rhetorical-question
headings, exclamation marks, emojis, Title Case headings.

## Needs approval (unchanged)

| Page                                                                                          | Original                                                       | Proposed                                                       | Status                                            |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------- |
| /dr-selina-kh/                                                                                | "Her care is built around the person, not just the diagnosis." | "Her care is built around the person and the diagnosis."       | needs approval — wording change                   |
| /guides/what-is-a-physiatrist/                                                                | "...balance and daily activities, not just one scan finding."  | "...balance and daily activities, not one scan finding alone." | needs approval — wording change                   |
| /video-consultation/                                                                          | "the doctor sees how you move, not just your face."            | "the doctor sees how you move, not only your face."            | needs approval — wording change                   |
| /accessibility/, /editorial-policy/, /appointments-cancellation-refund/ and other legal pages | heading "Something unclear?"                                   | "Questions" or "Contact us"                                    | needs approval — heading is a rhetorical question |

## Reviewed and allowed by the spec

- FAQ-style headings such as "Questions about cerebral palsy?" and guide
  section headings phrased as patient questions ("Will my child walk and
  talk?", "What is a physiatrist?") are allowed — the spec exempts
  patient-phrased questions from the rhetorical-heading rule.
- "A question a guide can't answer?" on guide pages is a patient question,
  allowed for the same reason.

## Clean

- All blacklist words: zero occurrences.
- Exclamation marks: zero. Emojis: zero.
- Title Case headings: none (the one match, "International Journal of
  Scientific Research", is a proper noun).
- Em/en dashes: zero in rendered HTML, JSON-LD, llms.txt, llms-full.txt,
  sitemap, OG strings and the email template (scripts/check-dashes.mjs).

## Applied

None — all three "not just" uses are ordinary phrases in approved medical
copy, not hype, and swapping them changes the wording, so they stay flagged
for approval.
