# GoCWGL — Revenue Engine Landing Page

Marketing site for Go CWGL's "Revenue Engine" package (pipeline, funnel, automation, content system, daily reporting). Single-page, one goal: get a visitor to book a discovery call.

Built with [Next.js](https://nextjs.org) (App Router, Turbopack), React 19, TypeScript, and Sass — no Tailwind, no CSS-in-JS.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

> **First install on a new machine:** pnpm may prompt about ignored build scripts (`@parcel/watcher`, `sharp`, `unrs-resolver`). These are pre-approved in [`pnpm-workspace.yaml`](pnpm-workspace.yaml)'s `allowBuilds` block — if pnpm still blocks, run `pnpm approve-builds` once.

Other scripts:

```bash
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # eslint
```

## Project structure

```
src/
  app/                     # Next.js App Router — routing only
    layout.tsx             # root layout: fonts (next/font/google), metadata, global.scss import
    page.tsx               # composes the landing page from src/features/landing

  components/              # generic, reusable UI — not page-specific
    ui/
      Button/               # pill CTA: amber / outlineLight / outlineDark variants, optional sheen sweep
      Logo/                 # wordmark / icon, wraps next/image
    layout/
      Header/               # sticky nav
      Footer/

  features/landing/        # one folder per page section, each self-contained
    Hero/ Marquee/ Stats/ Story/ HowItWorks/ Benefits/
    Pricing/ Timeline/ Faq/ CtaBlock/
    index.ts               # barrel export, imported by app/page.tsx

  styles/
    abstracts/              # Sass-only — no CSS output on their own
      _variables.scss       # design tokens: color, type, spacing, radii, easing
      _mixins.scss          # container(), auto-grid(), button variants, card hover, drift-glow, sheen
      _keyframes.scss       # keyframe mixins — see "CSS Modules + keyframes" below
      _functions.scss       # reserved for future Sass helpers
    base/
      _reset.scss
      _typography.scss
      _global.scss          # body-level rules, the shared @keyframes, the scroll-reveal system
    main.scss               # entry point — imported once, from app/layout.tsx
```

Every component/section owns a colocated `*.module.scss` file and reaches the tokens above via:

```scss
@use "abstracts/variables" as v;
@use "abstracts/mixins" as m;
```

This resolves without a relative path thanks to `sassOptions.loadPaths` in [`next.config.ts`](next.config.ts) pointing at `src/styles`.

## Styling conventions

- **Colors, type scale, spacing, radii** live in [`abstracts/_variables.scss`](src/styles/abstracts/_variables.scss) — add new tokens there rather than hardcoding values in a component.
- **Layout/behavior patterns** (centered container, auto-fit card grid, button chrome, card hover lift, drifting background glow, CTA sheen sweep) are Sass mixins in [`abstracts/_mixins.scss`](src/styles/abstracts/_mixins.scss).
- **Fonts** (Archivo, IBM Plex Mono) are self-hosted via `next/font/google` in `app/layout.tsx`, exposed as `--font-archivo` / `--font-mono` CSS variables and consumed through the `$font-heading` / `$font-mono` tokens.
- **Per-CTA variance** (shadow size, hover lift distance, sheen duration) that doesn't fit a fixed mixin is passed in as inline CSS custom properties (`--btn-shadow`, `--sheen-duration`, etc.) from the component, rather than adding more mixin parameters.

### CSS Modules + shared `@keyframes` (read this before adding an animation)

Next's Turbopack/Lightning CSS pipeline scopes **every** identifier in an `animation`/`animation-name` declaration inside a `*.module.scss` file to that module — even when the `@keyframes` it names lives elsewhere. There is no working `:global(...)` escape for this in the current toolchain (confirmed against `node_modules/next/dist/docs/01-app/03-api-reference/08-turbopack.md`).

Two valid patterns, depending on how the animation is triggered:

1. **Inline `style={{ animationName: "..." }}`** (used by every scroll-triggered `data-reveal` element) — bypasses CSS Modules entirely, so it can reference the plain global keyframes in `base/_global.scss` directly. Prefer this for one-off, per-element triggers.
2. **A CSS Modules class with an `animation:` property** (used by decorative loops like the marquee, drifting glows, pulsing dots, the button sheen) — `@include` the matching mixin from [`abstracts/_keyframes.scss`](src/styles/abstracts/_keyframes.scss) once, at the top level of that module file, so the `@keyframes` rule and its usage get scoped together consistently. See any of `Marquee.module.scss`, `Hero.module.scss`, or `Pricing.module.scss` for the pattern.

### Scroll-driven reveals

Any element with a `data-reveal` attribute and an `animationName` plays that animation tied to its own scroll position via the CSS `animation-timeline: view()` API — no IntersectionObserver needed. The shared rule (`animation-range: cover 0% cover 100%`, in `base/_global.scss`) spans the element's entire visible lifetime, so it animates in on the way down **and** reverses on the way back up. Browsers without support fall back to `opacity: 1` (via `@supports`), and `prefers-reduced-motion: reduce` disables all of it — both guarantees must be preserved if this is touched.

## Assets

Logo and icon PNGs live in `public/images/`, served via `next/image` through the `Logo` component.

## Known follow-ups

- Every "book a call" CTA currently points at `mailto:info@GoCWGL.com`. Swap in a real scheduler link (Cal.com / Calendly / HubSpot) before launch.
- `tailwindcss` / `@tailwindcss/postcss` are still installed but unused — the whole page is styled with the SCSS system above. Safe to remove if nothing else in the project needs them.
- No privacy/terms pages, OG image, or analytics yet.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Sass Documentation](https://sass-lang.com/documentation/)
