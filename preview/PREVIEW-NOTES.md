# taste-skill preview — what the skill did to the landing page

This folder is a **throwaway preview**, not the live site. Nothing in the repo
root (`index.html`, `assets/`, case pages) was touched. Open `preview/index.html`
in a browser to compare against the live `index.html`.

## Design Read (the skill's first move)

> Reading this as: a **redesign — preserve** of a solo product-designer portfolio
> for hiring managers, with a warm editorial / kinetic-personal language, leaning
> toward native CSS on the existing periwinkle-on-cream brand system, evolved for
> rhythm and restraint.

**Dials** (redesign-preserve → match the existing site, motion +1):
`DESIGN_VARIANCE 7 · MOTION_INTENSITY 6 · VISUAL_DENSITY 3`.

Because the brand is strong and recognizable, the skill runs in **preserve** mode:
keep the palette, type families, copy, and contact links; evolve the structure.
The palette, Palmios/DM type system, all copy, and both contact links are **carried
over verbatim** — nothing in Ana's voice or brand was rewritten.

## What the skill changed (structure only)

1. **Hero decluttered to 4 elements.** The live hero packs an eyebrow, the
   `ana batiller` wordmark, `people not pixels*`, a 60-word bio, two CTAs, and a
   status pill into one screen. The skill's hero-stack discipline caps the hero at
   eyebrow + headline + one-line subtext + one CTA. So the hero now leads with
   `people not pixels*`, one line of positioning, and a single "email me" CTA
   beside the portrait.
2. **Bio moved to its own "about" block.** Ana's full paragraph (unchanged, word
   for word) and the `currently on summer break in tokyo` status now sit in a
   dedicated section right below the hero, at a comfortable reading measure.
3. **Work index now shows real imagery.** Each of the three cases carries its real
   case-hero thumbnail (`ab-gp-hero`, `ab-card-hero`, `ab-podd-hero`) plus its own
   accent chip — the skill bans text-only lists and rewards real visual variety.
4. **Sticky one-line nav** (wordmark + single CTA, 66px tall) replaces the bare
   top-of-page wordmark, per the skill's nav discipline.
5. **Eyebrows rationed.** The live page labels most sections with a mono eyebrow;
   the skill caps eyebrows at ~1 per 3 sections, so only the hero and "selected
   work" keep one.
6. **CTAs made WCAG-safe.** The primary CTA is now a filled ink pill with cream
   text (~12:1 contrast) instead of a low-contrast periwinkle link as the sole
   call to action.
7. **Custom cursor dropped.** The skill flags custom cursors as accessibility- and
   performance-hostile (AI Tells §9.A), so the preview removes the coral cursor to
   show that opinion. The click-stamp, paper grain, squiggle, tilt, magnetic links,
   marquee, and pulse dot are all kept.

## Where the skill conflicts with Ana's locked brand (kept the brand)

These are places the skill's generic rules disagree with this site's owner-locked
identity. In every case the **brand won** and the copy/voice is untouched — worth
knowing before treating any of this as a recommendation:

- **Em-dash ban.** The skill bans `—` outright; Ana's bio uses one
  ("isn't the launch — it's the research"). The bio is owner-locked copy, so it
  stays exactly as written.
- **Serif / Fraunces ban.** The skill discourages serif displays and names
  Fraunces specifically; Palmios (with Fraunces fallback) is Ana's licensed,
  owner-locked display face and is preserved.
- **Middots and ASCII emoticons.** The skill rations `·` separators and discourages
  emoji-style marks; `:-)` / `:-D` and the middot rhythm are part of Ana's voice
  and are kept.

## Verified

Checked in headless Chromium at 1280px and 390px: all four images load, reveals
fire on scroll, no horizontal scroll, no page console errors. Fonts load over the
network (DM Sans / DM Mono / Fraunces via Google Fonts; Palmios self-hosted); with
no network they fall back gracefully to system serif/mono.

## Scope

Only the **landing page** was redesigned, as the clearest single demonstration of
the skill. The three case-study pages were left as-is.
