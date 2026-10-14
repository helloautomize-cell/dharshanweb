# Resend DNS for rehabify.in — document only, do not apply

**Rules:** never edit or delete any existing MX record. If an SPF `v=spf1`
record already exists on the apex, do not create a second one — merge
`include:` values into the existing record instead.

## Current DNS snapshot (taken during Phase 6, before any change)

| Record                  | Value                                                                  |
| ----------------------- | ---------------------------------------------------------------------- |
| A `rehabify.in`         | 15.197.142.173, 3.33.152.147 (GoDaddy parked)                          |
| AAAA `rehabify.in`      | none returned                                                          |
| CNAME `www.rehabify.in` | ghs.googlehosted.com                                                   |
| MX `rehabify.in`        | none returned                                                          |
| TXT `rehabify.in`       | `google-site-verification=aQW6NfMasNvrLHkbA7RMbGEzjasOVoOp3bG-S47iXKg` |
| NS `rehabify.in`        | ns75.domaincontrol.com, ns76.domaincontrol.com (GoDaddy)               |

## Records to add once the Resend domain is registered

The exact values come from the Resend dashboard after adding `rehabify.in`.
Substitute the dashboard values — do not guess.

| Type | Host                                | Value                                                    | Purpose                     |
| ---- | ----------------------------------- | -------------------------------------------------------- | --------------------------- |
| TXT  | `rehabify.in` or `send.rehabify.in` | `v=spf1 include:amazonses.com ~all` (per Resend)         | SPF                         |
| MX   | `send.rehabify.in`                  | `10 feedback-smtp.ap-south-1.amazonses.com` (per Resend) | bounce                      |
| TXT  | `resend._domainkey.rehabify.in`     | `p=...` DKIM key from Resend                             | DKIM                        |
| TXT  | `_dmarc.rehabify.in`                | `v=DMARC1; p=none; rua=mailto:[clinic email]`            | DMARC (only if none exists) |

After adding, wait for Resend to show "Verified", then set
`BOOKING_FROM_EMAIL` to an address on the verified domain.

Until verified, preview deploys must use Resend's test sender and send only to
`AGENCY_TEST_EMAIL`.
