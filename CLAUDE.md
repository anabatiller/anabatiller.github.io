# CLAUDE.md — Ana Batiller's portfolio (anabatiller.github.io)

Guidance for Claude sessions maintaining this site. Every rule here was earned
in the session that built and launched it — the "why" tells you what breaks if
you skip it.

## What this repo is

The **live site** is served by GitHub Pages straight from the root of `main`
(user site, so the URL is https://anabatiller.github.io/ — no subpath). Every
push to `main` auto-deploys in ~30 seconds. The repo was previously named
`anabatillerportfolio`; the old name still redirects on GitHub's side.

| Path | Role |
|---|---|
| `index.html` | Landing page (hero, work index, footer) |
| `global-payments/`, `hybrid-credit-debit-card/`, `podd/` | Case-study pages, one `index.html` each |
| `assets/site.css` | The only stylesheet — tokens + base flattened from `design/` |
| `assets/motion.js` | All animation (reveals, tilt, magnetic links, marquee, click stamp) |
| `assets/Palmios.woff2` | Self-hosted display font for h1–h3 |
| `images/` | Final imagery, WebP, named `ab-<case>-<slot>.webp` |
| `design/` | **Design reference prototypes** — the source of truth for look & copy, not served to visitors. Uses a component runtime (`support.js`) with `{{ }}` holes; needs React from a CDN to preview |
| `DESIGN_SYSTEM.md`, `README.md` | Full design-system docs — read before any visual change |

## Hard rules

1. **Never re-type a base64 or data-URI string — not into a file, not into an
   API call.** Copy it programmatically (`cp`, python string ops, `git`) and
   verify with `md5sum`/`git hash-object` before and after. Why: the custom
   cursor PNG was corrupted **twice** by transcription — once when the CSS was
   first flattened, and again when the "fix" was re-typed through the GitHub
   API, which reproduced the identical corruption and shipped a no-op commit.
   Model transcription of long base64 fails deterministically; checksums are
   the only proof.

2. **Every copy change lands in two places: the live page AND its matching
   `design/` file.** Why: `design/` is the design reference future work is
   rebuilt from; if it drifts from the live site, the next redesign silently
   reverts the owner's copy edits.

3. **Verify in a real browser before pushing.** Serve the repo root
   (`python3 -m http.server`) and load the changed pages in headless Chromium
   at ~1280px and ~390px. Check: every image loads (`naturalWidth > 0`), zero
   console errors, no horizontal scroll, and the specific thing you changed is
   visibly correct. Why: this caught a squashed hero (a slot's 160px default
   height), a broken portrait ring, and confirmed both copy edits — none of
   which a file diff would show.

4. **Match the existing markup style exactly.** Pages use inline styles with
   CSS variables (`var(--ink)`, `var(--accent)`), not classes; copy an
   existing sibling element and edit it rather than inventing new structure.
   Why: consistency is what keeps the site pixel-faithful to the design.

5. **Commit as `Claude <noreply@anthropic.com>`** (`git config user.email
   noreply@anthropic.com && git config user.name Claude`). Why: anything else
   shows as Unverified on GitHub and trips this repo owner's checks.

## Design guardrails (summary — DESIGN_SYSTEM.md is the full law)

- **Colors:** only the tokens in `assets/site.css` (`--ink #371B05`, cream
  `#FFFEFA`, periwinkle `#6E82DB`, gold `#9E8D35`, tints). Case accents:
  GCash Global `#4F63E3`, Hybrid Card `#F2643C`, PODD `#C98A2E`. The coral
  `#FB885B` is for the cursor/click-stamp only — never fill or text.
- **Type:** Palmios renders all h1–h3 (via a `base`-CSS `!important` override;
  headings still *declare* `'DM Mono'` inline — leave that as is). DM Sans for
  body, DM Mono for every eyebrow/label/caption/stat.
- **No icon libraries, no SVG icon sets, no emoji.** The only "icons" are the
  blurred CSS dot, middots (·), and ASCII emoticons (`:-)`) in contact links.
- **One easing curve everywhere:** `cubic-bezier(.16,1,.3,1)`.
- **Voice:** first person, plain, evidence-led; numbers do the bragging;
  sentence case; lowercase tracked mono eyebrows.
- **Motion must fail open:** content visible if JS never runs, and
  `prefers-reduced-motion` respected (the `js-anim` gate + the reduced-motion
  block in `site.css` handle this — don't bypass them with new inline
  animations).

## Common tasks

### Copy edit
1. Edit the live page (`index.html` or `<case>/index.html`).
2. Apply the same change to the matching `design/*.dc.html` (and `design/cases.js`
   if it's a title/summary/category — those feed both the case hero and the
   landing index row in the prototypes).
3. Verify in browser (rule 3), commit, push.

### Image swap
1. Replace the file in `images/` keeping the same `ab-…` name, WebP, roughly
   the same aspect ratio (pages auto-size to natural ratio via `height:auto`).
2. Keep files small (the current set is 12–276 KB each).
3. Verify the page, push. The `design/` slots reference the same files via
   `src="../images/…"`, so no second edit is needed for images.

### Adding a case study
1. **Live page:** copy the closest existing case directory (e.g. `podd/`) to a
   new kebab-case directory; edit content in place. Update: `<title>`, meta
   description, OG tags (`og:image` → the case hero), the accent color (both
   the `--accent` inline on the wrapper div AND the `initMotion({accent})`
   call at the bottom), the hero number/category/title/tagline, and sections.
2. **Landing index:** add a row in `index.html`'s work index — copy an
   existing `.ab-idx-row`, set `href`, `data-num`, `data-cat`, the row's
   inline `--accent`, title, and summary.
3. **Design side:** add the entry to `design/cases.js` (single source of truth
   for the prototypes) and create the case's `.dc.html` from
   `design/Case Template.dc.html` per the instructions in that file.
4. **Images:** name them `ab-<caseid>-<slot>.webp` in `images/`.
5. Section anatomy, spacing, and card patterns are documented in `README.md`
   ("Screens / Views") — mirror an existing case rather than improvising.

## Deploy & troubleshooting

- Pushing to `main` triggers the `pages build and deployment` workflow
  (visible in the Actions tab / via the GitHub API). Green in ~30s.
- **Deploy failed with "Deployment failed, try again later"?** It's usually
  transient. Don't fight a stalled re-run (one sat "queued" for 10+ minutes
  and never started); push a fresh commit instead — any commit triggers a
  clean new run.
- **Site looks stale after a green deploy?** GitHub's CDN caches assets for up
  to ~10 minutes; hard-refresh before assuming the deploy failed.
- **`git push` rejected (403/503) while fetch works?** The session's git
  gateway credential can lag behind permission or repo-name changes. Retry
  with backoff; if it persists after a rename, re-add the repo under its
  current name rather than routing file contents through typed API calls
  (see rule 1 for why typed content is dangerous).
- `robots.txt` allows everything; `.nojekyll` makes Pages serve files as-is —
  keep both.
