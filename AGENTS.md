# Agent guide

Notes for AI assistants working in this repo. The site is a personal
photo blog: an Astro 5 static site with a hero landing page and a posts
collection.

## Adding a new post — the standard flow

1. **Pick a slug.** Posts live in `src/content/posts/<slug>/`. The slug
   becomes the URL: `/posts/<slug>`. Numbered (`0`, `1`, …) or named
   (`paris-jan-2026`) are both fine; the user has used numbers so far.

2. **Drop the photos in.** The user will hand off a set of phone photos
   in that directory. They may be a mix of `.jpg` and `.heic`.

3. **Resize and convert.** Always run the resize script before doing
   anything else with images. It strips EXIF (privacy), bakes orientation
   in, downscales to a 2400px-longest-edge max, JPEG-encodes at quality
   85 with mozjpeg, and converts HEIC → JPG (removing the originals):
   ```bash
   yarn resize src/content/posts/<slug>
   ```
   Phone JPEGs typically shrink ~80%. HEIC files become same-name JPGs.

4. **Create `index.md`** in the same directory with frontmatter
   referencing each image by relative path. Minimum viable post:
   ```yaml
   ---
   date: 2026-06-14
   images:
     - src: ./1.jpg
     - src: ./2.jpg
   ---
   ```
   Optional fields: `title`, `description`, `tags`, per-image `caption`
   and `alt`. Schema is in `src/content.config.ts`.

5. **Verify** by opening `/posts/<slug>` in the dev server. The post
   card should also appear on the homepage at `/#posts` with thumbnail
   previews of the first three images.

## Conventions worth knowing

- **Slug from folder name**: posts use `<slug>/index.md` and the loader
  in `src/content.config.ts` strips the `/index` so the URL is clean.
  Don't put `slug:` in frontmatter.

- **Image src is a relative path**, not a URL. The schema uses Astro's
  `image()` helper, so Astro processes the file (WebP conversion,
  responsive `srcset`, automatic `width`/`height`). External URLs would
  break the pipeline.

- **Title is optional.** If omitted, the post is rendered with date as
  the lead element. Both the card on the overview page and the detail
  page handle the missing title gracefully.

- **EXIF is stripped by the resize script.** Don't re-add metadata; the
  user's phone photos contain GPS by default.

- **No need to specify image dimensions** in frontmatter. Astro reads
  intrinsic dimensions from the imported file at build time.

## File layout

```
src/
├── content.config.ts            # post collection schema
├── content/posts/
│   └── <slug>/
│       ├── index.md             # frontmatter + body
│       └── *.jpg                # photos (processed)
├── layouts/Base.astro           # shared shell; globe, citation,
│                                # scroll indicator, scroll-to-top live here
├── pages/
│   ├── index.astro              # hero + posts overview
│   └── posts/[...slug].astro    # detail page + lightbox
├── components/Background.tsx    # the 3D spinning globe (React island)
└── styles/global.css            # Tailwind v4 entry + custom @theme tokens
```

## Things that are *not* automatic

- **Resizing**: the dev server does NOT resize source images. Always
  run `yarn resize` first or the repo will balloon with phone-original
  files (3–5 MB each).
- **Committing**: the user does this manually. Don't `git add`/`commit`
  on their behalf unless asked.

## Stack — quick reference

- Astro 5 (static output), Tailwind v4, React 19 (only for the
  3D globe — a `client:only="react"` island in `Base.astro`).
- Three.js via `@react-three/fiber@9` + `@react-three/drei`.
- View transitions are on (`<ClientRouter />` in `Base.astro`). Each
  post card has `transition:name="post-<id>"` and morphs into the
  detail page's title block.
- `astro check` should pass with 0/0/0 before any commit.

## Don't touch unless asked

- The hero box (Carbonyl logo + intro/Linktree). The user has iterated
  on the SVG positioning carefully.
- The wheel/touch snap behavior in `src/pages/index.astro` (`setup()`)
  — handles the hero ↔ posts transition. Fragile.
- The lightbox keyboard/touch/scroll snap interactions in
  `src/pages/posts/[...slug].astro` (`setupLightbox()`).
- The `view-transition-name="post-<id>"` shared element morph.
- Tailwind v4 utility names — the user gets warnings from the
  IntelliSense extension; canonical forms are `grow`, `bg-linear-to-*`,
  `bg-black/30` etc. Don't write `flex-grow` or `bg-gradient-to-*`.

## When in doubt

Ask. The user iterates on UX details and is happy to clarify. Don't
silently rewrite functioning code.
