# Build log

Chronological notes from building the site. Times are Hawaii time (HST, UTC−10).

## Phase 1 checklist (prioritized)

1. [x] Scaffold React + TypeScript + Vite on branch `phase-1`, with lint / typecheck / test / build scripts
2. [x] Ground project content in facts from the public repos (LyricLens, CaseBoard, Groupz, LLM Zoomcamp)
3. [x] Layout: header, three-page navigation, skip link, footer contact links, 404 page, `HashRouter`
4. [x] My Journey: hero, "Jump to projects", LinkedIn QR + link, expandable scroll-driven timeline, featured projects, "To be continued…"
5. [x] What's on My Mind: Markdown notes with metadata, newest-first feed, topic folders, note pages, starter notes
6. [x] The Human Side: intro, path, interests from `plan.md`, contact links, with no invented details
7. [x] SEO + social preview metadata; GitHub Actions deploy workflow (prepared, not enabled)
8. [x] Checks: lint, typecheck, unit tests, production build, browser checks at phone and desktop sizes, axe accessibility scan, keyboard and link checks
9. [x] Learning docs `learning/00`–`07`, every code path checked against the repo
10. [ ] Push branch `phase-1` (authorized) and open a pull request for review

## Inputs received

- `plan.md` and `CLAUDE.md` (copied into the repo root so future sessions can read them).
- LinkedIn: Chuqing sent `http://www.linkedin.com/in/chuqingshi` and a screenshot of her LinkedIn QR code. That QR decodes to `https://www.linkedin.com/in/chuqingshi?fromQR=1`, so the site uses `https://www.linkedin.com/in/chuqingshi` (https, tracking parameter removed).
- Email: Chuqing confirmed `chuqingshi@gmail.com` may be shown publicly.
- Push: Chuqing authorized pushing to branch `phase-1`. Not authorized, so not done: merging to `main`, enabling GitHub Pages, deploying.

## Major achievements (HST)

| Time | What |
| --- | --- |
| 18:23 | Session start. Repo was empty; created an empty first commit on `main` and the `phase-1` branch |
| 18:26 | Push to `phase-1` authorized; LinkedIn and email confirmed |
| 18:28 | Project scaffolded (Vite template: React 19, TypeScript 7, Vite 8, oxlint); React Router 8, Vitest 5 added |
| 18:30 | Read the READMEs and Git history of LyricLens, CaseBoard, Group Map Share, ApplyPeace and LLM Zoomcamp for verified project facts |
| 18:33 | Content model, Markdown note loader and helpers done; 33 unit and content tests passing |
| 18:40 | All three pages, timeline, project cards, QR code and knowledge garden built; first production build |
| 18:45 | Browser review at phone and desktop sizes; one bug found and fixed; all behavior and accessibility checks pass |
| 18:46 | First milestone commits |
| 18:50 | Social preview image, GitHub Actions workflow and Prettier formatting committed |
| 18:55 | Learning guides `00`–`07` written; every referenced path checked |

## Decisions

- **Design: ink on graph paper.** The subject is a mathematician's path into engineering, so the page borrows from a mathematician's notebook: STIX Two Text (made for mathematical typesetting) for headings and long reading, Atkinson Hyperlegible Next for interface text, one fountain-pen blue accent on a cool off-white "paper" (a blue-slate "chalkboard" in dark mode). The one bold element is the timeline line that inks in as you scroll; everything else stays quiet. Projects are rows separated by rules rather than a grid of identical cards.
- **Fonts are bundled** (`@fontsource/*`) instead of loaded from Google Fonts: no third-party request, no visitor tracking. Only the Latin subset is imported (CSS dropped from 55 KB to 21 KB).
- **Markdown:** `react-markdown` + `remark-gfm` render notes as React elements, so a note can never inject a script. No MDX or Notion yet (not needed for Phase 1).
- **Front matter:** an 80-line reader (`src/lib/frontmatter.ts`) instead of `gray-matter`, which targets Node.js and parses far more YAML than the notes use.
- **QR code:** generated at runtime from `profile.linkedinUrl` with `qrcode`, rendered as one SVG `<path>`, so the code and the link can never disagree.
- **Code splitting:** note pages load lazily; the landing page's JavaScript went from 154 KB to 105 KB gzipped.
- **Drafts** live in `src/content/drafts/`, visible only in `npm run dev` and absent from the production build. The four starter notes are drafts because they are not Chuqing's words.
- **Placeholders** (`{ placeholder: '…' }` in `src/content/`) render as visible "To fill in" boxes. Dates derived from GitHub commit history are labelled "from GitHub activity, to confirm".
- **ApplyPeace is not featured**: it involves H-1B sponsorship, which is personal; left for Chuqing to decide.
- **Groupz is marked Live** because its README links a deployed app on Render. CaseBoard and LyricLens are marked "Runs locally".
- **CLAUDE.md vs plan.md:** no conflicts found. One judgment call: `plan.md` asks to "publish 3–5 initial dated notes", while CLAUDE.md forbids inventing personal content. I wrote 4 notes but kept them as drafts until Chuqing rewrites them.
- **Prettier** added (`npm run format`, `npm run format:check`) so formatting is never a manual chore. It is not part of `npm run check`, so a formatting difference never blocks a deploy.

## Surprising bugs (and fixes)

1. **StrictMode stole focus on first load.** `<StrictMode>` runs effects twice in development. The page-change effect in `src/components/Layout.tsx` used a "first render" flag, so its second run moved focus into `<main>`, and the first Tab skipped the skip link. Fix: compare the pathname with the previous one (safe no matter how many times it runs). Caught by the browser check "skip link: first Tab stop".
2. **`#` links and HashRouter.** `<a href="#projects">` would navigate to a route called `projects`. "Jump to projects", the skip link and in-note `#` links scroll with JavaScript instead (`src/lib/scrollToElement.ts`).
3. **The timeline went stale when a card opened.** Expanding a card changes the timeline's height without any scroll event. A `ResizeObserver` in `src/hooks/useTimelineProgress.ts` now re-measures.
4. **Draft text was shipping to visitors.** At first, drafts were marked with a `draft: true` line and filtered out at runtime. Searching the production JavaScript showed the draft text was still inside it: hidden on the page, but downloadable by anyone. Drafts now live in `src/content/drafts/`, which `src/content/loadNotes.ts` reads only when `import.meta.env.DEV` is true; Vite drops that branch from production builds. Verified by searching `dist/` for each draft's title: 0 matches.
5. **Hidden `<details>` marker.** Styling the "How it works" summary as `inline-flex` removed the browser's disclosure triangle; replaced with the same `+`/`−` circle the timeline uses.

## Check results (final run)

| Command | Result |
| --- | --- |
| `npm run lint` | 0 warnings, 0 errors |
| `npm run typecheck` | 0 errors |
| `npm test` | 2 files, 35 tests passed |
| `npm run build` | success; `index` JS 315 KB (102 KB gzip), `NotePage` JS 165 KB (50 KB gzip, lazy), CSS 21 KB (5 KB gzip); no draft text in `dist/` |
| GitHub Actions on pull request #1 | build job passed (lint, typecheck, tests, build); deploy job skipped, as intended for pull requests |
| `npm run format:check` | all files formatted |

Browser checks (headless Chromium with Playwright, scripts kept outside the repo), run against both `npm run dev` and the production build (`npm run preview`):

- Timeline: dots fill and the ink line grows as you scroll (0 → 4 milestones reached, progress 0.62 mid-page).
- Milestone card: collapsed by default; click opens it (`aria-expanded`, label and panel update); Enter closes it.
- Jump to projects: scrolls the heading to the top, moves focus there, and leaves the URL unchanged. Timeline "See … in projects" links focus the right project.
- Skip link is the first Tab stop and moves focus to `<main>` without changing the route.
- Navigation scrolls to the top, focuses `<main>`, and marks the current page.
- Feed filter narrows the list (4 → 1 reflection in dev), lives in the URL, and survives a refresh. Topic folders (8), topic page and subtopic filter work.
- A note opened directly by URL renders its Markdown. Unknown routes, notes and topics show "Page not found".
- axe-core (WCAG 2.1 A/AA + best practices) on 7 routes × light and dark mode: 0 violations.
- No horizontal overflow at 320, 390, 768 and 1280 px. No JavaScript errors.
- QR code rendered to an image and decoded with OpenCV: `https://www.linkedin.com/in/chuqingshi`.
- `git ls-remote` confirms all 8 linked GitHub repositories exist. The Groupz demo URL could not be fetched from this environment (network allowlist): unverified.

## Known issues

- The live notes feed is empty until a note is published (`draft: false`).
- Placeholders remain (listed in `00-start-here.md`); they are visible on the page by design.
- The first Actions run warned that `checkout@v4` and `setup-node@v4` target the deprecated Node 20 runtime; both were moved to `@v5`. `upload-pages-artifact@v3` and `deploy-pages@v4` are unchanged; check for newer major versions if GitHub warns about them.
