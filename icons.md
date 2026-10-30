# P7s: Desktop quick actions (WhatsApp and Book, bottom right)

Branch: create phase-7s-desktop-actions from the latest phase branch.

Why: on phones the site has a floating dock (.mobile-dock) with Book, Call and WhatsApp. From 900px up the dock is hidden (display: none), so desktop visitors have no WhatsApp shortcut at all. Add a small desktop version in the bottom-right corner.

Do not change the mobile dock. Its markup, styles, breakpoints, icons and behaviour below 900px stay exactly as they are. The new element only exists from 900px up, so the two never show together.

Rules: port, don't re-interpret; reuse the existing tokens (--night, --ice, --aqua, --wa for the WhatsApp green, the body font), the existing lucide icons (CalendarDays as in .dock-book, MessageCircle as in .dock-wa) and the existing hrefs (/contact/#book and the existing wa.me link with its current prefilled text, if any). No new libraries. Keep any analytics events the dock links already fire, and use the same event names with a "desktop" location parameter.

---

## 1. Component

- A new shared component, for example `DesktopQuickActions`, rendered once in the site layout next to the mobile dock so it appears on every page.
- Markup: `<nav class="quick-actions" aria-label="Quick actions">` with two links, in this order top to bottom:
  1. Book: `<a class="qa-book" href="/contact/#book">` with the CalendarDays icon (20px) and the visible text "Book a consultation".
  2. WhatsApp: `<a class="qa-wa" href="(existing wa.me link)" aria-label="Chat with Rehabify on WhatsApp">` with the MessageCircle icon (24px), no visible text.
- Display: hidden below 900px (display: none), shown from 900px up.

## 2. Design

- Position: fixed, right `calc(24px + env(safe-area-inset-right, 0px))`, bottom `calc(24px + env(safe-area-inset-bottom, 0px))`, z-index 40 (same layer as the mobile dock; below the cookie banner, modals and the mobile menu).
- Layout: a vertical stack, aligned right, gap 12px.
- Book pill: 52px tall, padding 0 20px, radius 999px, background --night, text --ice, font 600 15px body font, icon in --aqua, 1px border rgba(217,237,243,.14), shadow 0 10px 30px rgba(10,22,38,.18). Hover: background a touch lighter (the existing night hover tone), no glow, no animated border.
- WhatsApp button: 56 x 56px circle, background --wa, icon white, the same shadow. Hover: scale 1.04 over 150ms. Focus-visible on both: 2px --aqua outline with 3px offset.
- Tooltip on the WhatsApp button: on hover and on keyboard focus, a small label "Chat on WhatsApp" appears to its left (night background, ice text, 13px, radius 8px, 8px gap, fade 150ms). It is decorative, aria-hidden, because the link already has an aria-label.
- On light and dark sections both stay readable (night pill with ice text, green circle with white icon), so no colour switching is needed.

## 3. When it shows

- Hidden while the hero (#top) is in view on Home, because the hero has its own Book button. Fade and slide in (opacity 0 to 1, translateY 12px to 0, 250ms) once the hero has scrolled out. On every other page it shows from the start.
- Hidden while the booking close card or the footer is in view (IntersectionObserver, any part visible), because they already show Book and WhatsApp. It comes back when they leave the view.
- Hidden while the cookie banner is open, while a modal or the mega menu is open, and while focus is inside the booking form, using the same rules the mobile dock uses today (reuse the same conditions or the same hook).
- When hidden: visibility hidden and pointer-events none, so it cannot be clicked or tabbed to. Use `inert` if the project already supports it.
- Reduced motion: show and hide without the slide, with an instant opacity change.

## 4. Nothing gets covered

- At 1440 x 900 and 1024 x 768, check that the stack never covers the "Back to top" link (if there is one), the cookie banner buttons, form submit buttons, or the last line of any FAQ answer. If something is covered, add bottom padding to main on desktop equal to the stack height plus 24px.
- The stack must not cover the scrollbar area or sit outside the viewport at 900px wide.

## 5. Print

- Hide it in print styles.

---

## Verification (once, at the end only)

1. At 1440 x 900 and 1024 x 768 on /, /care/, /doctors/ and /guides/what-is-a-physiatrist/: the stack is bottom-right, 24px from the edges; on Home it is hidden in the hero and appears after it; it hides when the booking card or footer is in view and comes back after.
2. Both links go to the right place (/contact/#book and the wa.me link, opening as they do on mobile).
3. Keyboard: Tab reaches both links when visible and skips them when hidden; the focus ring shows; the tooltip shows on focus.
4. At 899px and below: the new stack is not rendered or not visible, and the mobile dock looks and behaves exactly as before (compare a 390px screenshot before and after).
5. Cookie banner open: the stack is hidden.
6. No console errors; lint, typecheck, format, tests and build pass.

Save screenshots at 1440 (Home scrolled to #why, and /doctors/) and 390 (Home, to show the dock is unchanged) in artifacts/phase7s/.

Report: one line per section (1 to 5), the verification results and the screenshot paths. Commit on branch phase-7s-desktop-actions and push for a preview.
