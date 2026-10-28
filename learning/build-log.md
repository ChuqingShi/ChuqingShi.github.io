# Build log

Chronological notes from building the site. Times are Hawaii time (HST, UTC−10).
Newest entries are at the bottom of each section.

## Phase 1 checklist (prioritized)

1. [ ] Scaffold React + TypeScript + Vite on branch `phase-1`, with lint / typecheck / test / build scripts
2. [ ] Ground project content in facts from the public repos (LyricLens, CaseBoard, Groupz, LLM Zoomcamp)
3. [ ] Layout: header, three-page navigation, skip link, footer contact links, 404 page, `HashRouter`
4. [ ] My Journey: hero, "Jump to projects", LinkedIn QR + link, expandable scroll-driven timeline, featured projects, "To be continued"
5. [ ] What's on My Mind: Markdown notes with metadata, reverse-chronological feed, topic folders, note pages, 3–5 starter notes
6. [ ] The Human Side: intro, path, interests from `plan.md`, connect links — no invented details
7. [ ] SEO + social preview metadata; GitHub Actions deploy workflow (prepared, not enabled)
8. [ ] Checks: lint, typecheck, unit tests, production build, browser screenshots (mobile + desktop), axe accessibility scan, keyboard and link checks
9. [ ] Learning docs `learning/00`–`07`, every code path verified to exist
10. [ ] Push branch `phase-1` (authorized by Chuqing at 18:26 HST)

## Inputs received

- `plan.md` and `CLAUDE.md` (copied into the repo root so future sessions can read them).
- LinkedIn URL: Chuqing sent `http://www.linkedin.com/in/chuqingshi` and a screenshot of her LinkedIn QR code. Decoding that QR gives `https://www.linkedin.com/in/chuqingshi?fromQR=1`, so the verified URL is `https://www.linkedin.com/in/chuqingshi` (https, tracking parameter removed).
- Email: Chuqing confirmed `chuqingshi@gmail.com` may be shown publicly.
- Push: Chuqing authorized pushing to branch `phase-1`. Not authorized: merging to `main`, enabling GitHub Pages, deploying.

## Timeline

### 2026-10-27 18:23 HST — Session start
- Repo `ChuqingShi/ChuqingShi.github.io` was empty. Created an empty initial commit on `main` and switched to a new branch `phase-1` for all work (CLAUDE.md: prefer a feature branch).
- Tools found: Node 22.23, npm 10.9. No system browser; installed a bundled headless Chromium from npm (`@sparticuz/chromium`) in a scratch folder outside the repo for screenshots and accessibility scans. It is not a project dependency.
