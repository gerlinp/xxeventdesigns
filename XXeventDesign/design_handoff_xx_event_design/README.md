# Handoff: XX Event Design — Website Redesign

## Overview
Redesign of the XX Event Design website (a New England event design/decor studio). Replaces a retired Instagram-embed gallery with an on-site portfolio, and gives the site a stronger visual identity built around the client's real logo and brand colors. Two parallel design explorations are included — see **Screens / Views** below for which files map to which.

## About the Design Files
The files in this bundle are **design references built as standalone HTML/React (Babel-in-browser) prototypes** — they demonstrate intended look, layout, copy, and basic interaction, but are **not production code to copy directly**. The task is to **recreate these HTML designs in the target codebase's actual environment** (whatever framework/CMS the client's site will run on — e.g. React, Webflow, WordPress, plain static site) using that environment's conventions, build tooling, and component patterns. If no environment/framework has been chosen yet, pick the most appropriate one for a small marketing site (a static site generator or lightweight React/Next app is a reasonable default) and implement there.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and copy are final/near-final. Recreate pixel-close using the target codebase's own styling system (CSS/Tailwind/styled-components/etc.) rather than inlining the prototype's raw inline-style objects.

There are **two competing directions** in this bundle — the client has not yet picked a final one:

1. **"Polished" direction** (`XX Event Design - Polished.html` + `directionA-polished.jsx`) — an elegant-editorial, Amorology-weddings-inspired layout: minimal thin nav, full-bleed cinematic photo hero, generous whitespace, single italic serif voice, portrait-oriented photography throughout (design with portrait/4:5 aspect images in mind — client confirmed most real photos will be portrait). Mobile-first; includes a working hamburger nav and touch-sized tap targets.
2. **"Dribbble" direction** (`XX Event Design - Dribbble Style.html` + `dreamland-style.jsx`) — a recreation of a specific Dribbble reference layout ("Dreamland Wedding Planner" style): rounded floating pill nav, icon-badge feature list, card-based services grid, 3-tier pricing cards, blog/journal cards, rounded-corner photo treatment throughout.

Confirm with the client which direction (or which elements of each) to build before finalizing.

## Screens / Views

Both directions cover the same site map: **Home, Services, Gallery, Contact** (Polished direction) or **Home + a combined "more" page with testimonials/blog/contact** (Dribbble direction — see file for exact section order).

### Shared brand elements (`shared.jsx`)
- **Logo**: real uploaded client logo image (`assets/logo.jpg` — placeholder resolution; client will provide a high-res version later). Rendered via the `XXLogo` component, which just renders an `<img>` — swap the src for the final asset.
- **Brand colors** (sampled from the real logo + live site, see Design Tokens below).
- **Copy content**: `SERVICES` (4 categories, 22 total services), `TESTIMONIALS` (4 client quotes), `PACKAGES` (3-tier pricing: Soirée / Celebration / Signature), `FAQ`, `GALLERY` (9 sample entries with category tags), `SITE` (contact info — email, phone, Instagram handle, service area).
- **`Photo` component**: a generated gradient+pattern placeholder standing in for real photography everywhere. **Every instance needs a real photo dropped in** — the `label` prop on each says what should go there (e.g. "Featured · Summer reception", "Tablescape inspiration").

### Home
- Full-bleed hero: background photo, dark gradient scrim, logo/wordmark, tagline, 1–2 CTA buttons.
- About section: portrait photo + serif copy, alternating layout in "Polished," icon-badge trio in "Dribbble."
- Portfolio/services teaser rows.
- Stats strip (16 years / 420+ events / 38 vendors / 100% satisfaction).
- Testimonial quotes (plain in "Polished," card-based in "Dribbble").
- Pricing (3 tiers, "Dribbble" only on the shared home; "Polished" puts pricing on the Services page).
- Closing CTA band.

### Services (Polished direction only — separate page)
- Text-only 4-column service list (no cards), full 22-item breakdown.
- 3-tier pricing cards below.

### Gallery (Polished direction only — separate page)
- Filterable portrait-oriented photo grid (filter chips: All / by category).
- Instagram CTA strip at the bottom (site retired the live IG embed but still links out).

### Contact (both directions)
- Contact info (email / phone / Instagram) + portrait photo.
- Inquiry form: Name, Email (validated), Phone (optional), Message — with inline error states and a success confirmation message. "Dribbble" direction's form is simpler (Name / Email / Services dropdown / message).

## Interactions & Behavior
- **Mobile nav**: hamburger toggle opens a full-width dropdown/overlay with nav links + contact info; animates in with a short slide/fade (`navSlide` keyframe, ~0.25s ease).
- **Buttons**: subtle hover lift + shadow on desktop; `onTouchStart`/`onTouchEnd` opacity feedback for mobile taps (no reliance on hover-only affordances).
- **Gallery filter chips**: click toggles active category filter, client-side array filter, no animation needed beyond a re-render.
- **Contact form validation**: required-field + email-regex validation on submit; invalid fields get a red label + inline error text; valid submit shows a success banner for ~2.2s then resets the form. No real backend wired up — needs a real submit handler (email service, form backend, etc.) in production.
- **Responsive breakpoints used in prototype**: Desktop 1280px, Tablet 820px, Mobile 390px — logic is a simple `R(device, desktopValue, tabletValue, mobileValue)` helper function per style property, not real CSS media queries. **Recreate with actual CSS breakpoints** (e.g. `@media` or a responsive framework), not JS-computed inline styles.

## State Management
Minimal — this is a marketing site, not an app:
- `device` toggle (dev-only, for previewing breakpoints — remove in production; real responsiveness should be CSS-driven).
- `menuOpen` boolean per nav instance (mobile hamburger state).
- `filter` string (Gallery page category filter).
- Contact form: `form` object (name/email/phone/message), `errors` object, `submitted` boolean.

## Design Tokens

### Colors (sampled from the real client logo + live xxeventdesign.com)
- Magenta: `#C43D8E`
- Purple: `#8E3FA6` (dark: `#6B2C82`)
- Orange: `#E8792E` (dark: `#C75A16`)
- Gold: `#D9A441` (dark: `#8B5E2E`)
- Burgundy (primary accent/CTA color): `#7A2048`
- Ink (body text): `#3D2A1F` / `#33261E` (Polished direction uses a slightly lighter `#241A14` variant in Dribbble direction)
- Ink soft (secondary text): `#6B5240`
- Cream/background: `#FFFDF9`, `#F7F1E6`, `#FAF3EA`
- Brand gradient: `linear-gradient(115deg, #C43D8E 0%, #8E3FA6 32%, #E8792E 68%, #D9A441 100%)` — used sparingly as an accent (script headings, stat numbers), not as large fills.

### Typography
- Serif (headings/quotes): "Cormorant Garamond" / "Playfair Display" (Google Fonts), italic weight used heavily for a hand-written feel.
- Sans (UI/body/nav): "Inter", system-ui.
- Script (Dribbble direction accent only): none currently loaded — "Alex Brush"/"Dancing Script" referenced in code comments but not actually loaded via Google Fonts link in the HTML head; add if picking up the script-heading treatment.
- Type scale (Polished, desktop → mobile): H1 ~68px → 34px, H2 ~40px → 24px, body ~15px → 13px, eyebrow labels 10–11px with 0.2–0.34em letter-spacing, uppercase.

### Spacing / Radius / Shadow
- No formal spacing scale — prototype uses ad-hoc px values, mostly multiples of 4. Recommend establishing a real scale (e.g. 4/8/12/16/24/32/48/64/96/120px) when rebuilding.
- Border radius: Polished direction is radius-0 (sharp edges) or `2–4px` on photos; Dribbble direction uses `10–24px` rounded corners throughout (cards, buttons, nav pill).
- Shadows: soft, warm-toned (`rgba(61,42,31,0.08–0.2)`), used sparingly — floating nav bar, elevated pricing card, image hover-lift.

## Assets
- `assets/logo.jpg` — real client logo, currently placeholder resolution. **Client will supply a high-resolution version — swap in before production.**
- `assets/photo-*.png`, `assets/ref-*.png`, `assets/dribbble-ref.png` — screenshots/crops from the client's OLD website and the Dribbble reference used only for design-process reference. **Do not ship these to production.** All final photography needs to be supplied by the client (they confirmed most will be portrait-orientation, ~4:5 aspect ratio) and dropped into the `Photo` component instances (search each file for `<Photo label="...">` to find every placeholder slot and what it should contain).

## Files
- `shared.jsx` — brand colors, logo component, copy content (services/testimonials/packages/FAQ/gallery/site info), and the `Photo` placeholder component. Shared by both directions.
- `directionA-polished.jsx` + `XX Event Design - Polished.html` — "Polished"/Amorology-style direction (Home, Services, Gallery, Contact).
- `dreamland-style.jsx` + `XX Event Design - Dribbble Style.html` — "Dribbble"-recreation direction (Home + combined testimonial/blog/contact page).

Both HTML files load React 18 + Babel standalone from unpkg CDN and transpile JSX in-browser — this is a prototyping convenience only. The production rebuild should use a proper build step (Vite/Next/whatever the target stack is), not in-browser Babel.
