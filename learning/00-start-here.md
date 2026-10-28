# Start here: morning handoff

Good morning! Phase 1 of your website is built, checked, and waiting on the `phase-1` branch. Nothing is live yet: publishing needs two clicks from you (see "Needs your input"). This page is your map; the review route below takes about an hour.

## Run it (5 minutes)

You need Node.js 22.22 or newer (`node --version`).

```bash
git clone https://github.com/ChuqingShi/ChuqingShi.github.io.git
cd ChuqingShi.github.io
git switch phase-1
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173). The dev server shows draft notes; the published site will not.

## Implemented

| Feature | Where |
| --- | --- |
| React + TypeScript + Vite project with lint, typecheck, test, build and format scripts | `package.json`, `vite.config.ts` |
| Three-page navigation with `HashRouter`, skip link, focus management, 404 page | `src/App.tsx`, `src/components/Layout.tsx`, `src/components/SiteHeader.tsx` |
| **My Journey**: headline, "Jump to projects", LinkedIn QR code + link, scroll-driven expandable timeline, 3 featured projects, "To be continued…" | `src/pages/JourneyPage.tsx`, `src/components/Timeline.tsx`, `src/components/MilestoneCard.tsx`, `src/components/ProjectCard.tsx`, `src/components/LinkedInQr.tsx` |
| **What's on My Mind**: newest-first feed with type filters, eight topic folders with subtopics, note pages with related notes and projects, 4 starter notes (drafts) | `src/pages/MindPage.tsx`, `src/pages/TopicsPage.tsx`, `src/pages/TopicPage.tsx`, `src/pages/NotePage.tsx`, `src/content/notes/` |
| **The Human Side**: intro, path, motivation, interests, contact | `src/pages/HumanSidePage.tsx`, `src/content/human.ts` |
| Contact links (LinkedIn, GitHub, email) in the footer and on The Human Side | `src/components/ContactLinks.tsx` |
| SEO and social preview tags, favicon, preview image | `index.html`, `public/` |
| GitHub Actions: checks on every pull request, publish from `main` | `.github/workflows/deploy.yml` |
| Light and dark mode, mobile-first layout, reduced-motion support | `src/styles/` |

## Verified

All run on the final code (details and earlier runs in `build-log.md`):

- `npm run lint`: no warnings or errors.
- `npm run typecheck`: no errors.
- `npm test`: 33 tests passed (helpers in `src/lib/lib.test.ts`, content integrity in `src/content/content.test.ts`).
- `npm run build`: succeeded. Main bundle about 105 KB gzipped; the note page's Markdown renderer loads separately (about 50 KB).
- `npm run format:check`: all files formatted.
- In a headless browser (phone and desktop sizes): timeline ink and dots follow scrolling, cards expand with mouse and keyboard, "Jump to projects" scrolls and moves focus, the skip link works, filters live in the URL and survive refresh, deep links and unknown addresses behave, no JavaScript errors. Repeated against the production build.
- axe accessibility scan of every page, light and dark mode: no violations.
- No horizontal scrolling at 320, 390, 768 or 1280 pixels wide.
- The QR code was rendered and decoded back to `https://www.linkedin.com/in/chuqingshi`.
- Every GitHub link resolves to a real public repository.

Not verified: the Groupz live demo (`group-map-share.onrender.com`) could not be reached from my environment; please open it once.

## Decisions

- **Content is data, separate from components.** All text lives in `src/content/`, so you can update the site without touching React code.
- **Placeholders instead of invented details.** Anything personal I could not verify is a dashed "To fill in" box with a writing prompt. Dates taken from GitHub commit history say "from GitHub activity, to confirm".
- **Starter notes are drafts.** I wrote four notes to give the garden real structure, but they are not your words, so they stay hidden on the live site until you edit them and set `draft: false`. The reflection is only a template of prompts.
- **ApplyPeace is not featured.** It is a strong project, but its description involves H-1B sponsorship, which is personal. Add it to `src/content/projects.ts` if you would like it shown.
- **Dependencies**, each for one job: `react-router` (pages), `react-markdown` + `remark-gfm` (safe Markdown rendering, no raw HTML), `qrcode` (QR encoding), `@fontsource/*` (fonts bundled with the site instead of loaded from Google), `vitest` (tests), `oxlint` (lint, from the Vite template), `prettier` (formatting).
- **A hand-written front-matter reader** (`src/lib/frontmatter.ts`) instead of a YAML library: fewer dependencies, and small enough to read and test.
- **Design: ink on graph paper.** STIX Two Text (a typeface made for mathematics) for headings and notes, Atkinson Hyperlegible Next for interface text, fountain-pen blue as the accent. The timeline line is the one bold element.

## Needs your input or approval

1. **Turn on Pages:** GitHub repo → Settings → Pages → Source → **GitHub Actions**.
2. **Review and merge** the `phase-1` pull request; the merge publishes the site to https://chuqingshi.github.io.
3. **Fill the placeholders.** Search the code for `placeholder:` to find them all:
   - `src/pages/JourneyPage.tsx`: the role you are looking for (recruiters will look for this first).
   - `src/content/journey.ts`: milestone stories, the financial ML research (summary and dates), and dates to confirm.
   - `src/content/projects.ts`: CaseBoard outcomes; confirm project dates.
   - `src/content/human.ts`: intro, what connects your path, motivation, interest stories.
4. **Photos** for the interests on The Human Side: put them in `public/photos/` and add `photo: { src: '/photos/triathlon.jpg', alt: '…' }` to an interest in `src/content/human.ts`.
5. **Check the wording** I used for facts: the hero paragraph in `src/pages/JourneyPage.tsx`, and "Mathematics PhD building with data science and AI" in `src/content/profile.ts` (your LinkedIn says Applied Mathematics; `plan.md` says Mathematics).
6. **Groupz hackathon:** `plan.md` lists it as a hackathon project, but I found no hackathon name. Add it to `src/content/journey.ts` if you want it shown.

## Known issues and next steps

1. Publish at least one real note (`learning/06-content.md`, "Try it yourself"); until then, the live notes feed shows an empty state.
2. Fill the recruiter line and the Phase 1 placeholders above.
3. The workflow uses `actions/checkout@v4`, `setup-node@v4`, `upload-pages-artifact@v3` and `deploy-pages@v4`; if GitHub reports a newer major version, update them.
4. Phase 2 from `plan.md`: an interactive playground, deeper timeline animations, more project–note connections.

## Your review route (about an hour)

One concept per stop. Each stop says what to read first and why.

1. **Explore (10 min).** Run the site. Visit all three pages on a narrow window and a wide one. Press Tab from the top of a page to see the focus ring and the skip link. Open a few milestones.
2. **Architecture (15 min).** Read `learning/01-architecture.md`, then `src/main.tsx` → `src/App.tsx` → `src/pages/JourneyPage.tsx`. That is the path every visit takes.
3. **Trace the timeline (15 min).** Read `learning/02-react-components.md` with `src/components/MilestoneCard.tsx` open beside it. This is the single most useful React idea on the site: state changes, the screen follows.
4. **Make a change (15 min).** Add a milestone: copy one object in `src/content/journey.ts`, give it a new `id`, keep the list in date order, and save. Watch it appear. Run `npm test`: the content checks confirm the order and the project links.
5. **Rebuild and commit (5 min).**
   ```bash
   npm run check
   git add src/content/journey.ts
   git commit -m "Add a milestone"
   git push
   ```
   `src/content/notes/2026-10-27-saving-a-change-with-git.md` explains each of these commands.

## Learn tomorrow

- **Concept:** React state, through `useState` in `src/components/MilestoneCard.tsx`.
- **Exercise:** the "Try it yourself" in `learning/02-react-components.md`: make the first milestone start open, by adding a prop.

## The other guides

`01-architecture.md` · `02-react-components.md` · `03-typescript.md` · `04-routing.md` · `05-styling.md` · `06-content.md` · `07-deployment.md` · `build-log.md` (what happened tonight, in order, with every check result)
