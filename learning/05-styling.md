# 05 · Styling: CSS, layout, responsiveness and accessibility

## Concept

- **CSS** rules pick elements with a *selector* (`.milestone__title`, `a:hover`) and set properties on them.
- **Custom properties** (CSS variables) such as `--color-pen` are defined once and used everywhere with `var(--color-pen)`.
- **Flexbox** (`display: flex`) lays things out in a row or column; **Grid** (`display: grid`) lays them out in rows *and* columns.
- **Media queries** (`@media (min-width: 48rem) { … }`) apply rules only on screens at least that wide. This site is **mobile first**: the default rules are for phones, and media queries add the wider layouts.
- `rem` is a size relative to the root font size (16px by default), so `48rem` = 768px and everything scales if a visitor enlarges text.

## Why here

Recruiters will open the site on a phone and on a laptop. It has to read well on both, in light and dark mode, and for people who navigate with a keyboard or a screen reader.

## Find it in code

- `src/styles/tokens.css`: the palette (ink on graph paper, fountain-pen blue), fonts, type scale and spacing. Dark mode redefines the same variables inside `@media (prefers-color-scheme: dark)`, so no component needs dark-mode code.
- `src/styles/base.css`: element defaults, the `.button` and `.text-button` styles, the keyboard focus ring (`:focus-visible`), `.visually-hidden`, and the reduced-motion rule.
- Component styles sit next to their component: `src/components/Timeline.css`, `src/components/ProjectCard.css`, and so on. Class names follow a `block__element` pattern (`.milestone__title` belongs to `.milestone`) so it is clear which file a rule lives in.
- `src/components/Timeline.css`: the timeline line is drawn with `::before` (grey track) and `::after` (blue ink). The ink uses `transform: scaleY(var(--progress, 0))`, and `--progress` comes from `src/hooks/useTimelineProgress.ts`.
- `src/pages/JourneyPage.css`: `.journey-graph` draws the graph paper with two `linear-gradient` backgrounds, no image file needed.
- `src/components/SiteHeader.css`: on phones the three links sit in equal grid columns; from `48rem` they move into one row beside the name.

### Accessibility choices

- Visible focus ring on everything focusable (`:focus-visible` in `base.css`).
- Touch targets at least 44px tall (`min-height: 2.75rem` on buttons and links).
- Status badges use text, not only color (`src/components/StatusBadge.tsx`); "Live" also gets a filled dot.
- Text colors meet WCAG AA contrast; the automated axe scan (see `build-log.md`) found no violations in light or dark mode.
- `@media (prefers-reduced-motion: reduce)` in `base.css` turns off smooth scrolling and animations.
- The QR code stays dark-on-white in dark mode, because inverted QR codes often fail to scan.

## Try it yourself

Change the accent color. In `src/styles/tokens.css`, set `--color-pen` (light mode) to `#0f6e6e`, a deep teal.

## Verify

`npm run dev` in light mode (dark mode sets its own `--color-pen` further down `tokens.css`): links, buttons, the timeline ink and the focus ring all turn teal at once, because they all use `var(--color-pen)`. Press Tab a few times to see the focus ring. Check the hover color too: `--color-pen-strong` should be a darker shade of whatever you choose (try `#0a5252` for teal).
