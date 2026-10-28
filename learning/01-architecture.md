# 01 · Architecture: how the pieces fit

## Concept

A React + Vite site is a **single-page app**: one HTML file, `index.html`, plus JavaScript that builds every page in the browser.

The chain of events when someone opens the site:

1. The browser downloads `index.html`. It contains an empty `<div id="root">` and one script tag.
2. That script is `src/main.tsx`. It loads the fonts and global styles, then hands the `#root` div to React.
3. React renders `<App />` (`src/App.tsx`), which reads the URL and picks a page.
4. The page component reads its content from `src/content/` and renders it with components from `src/components/`.

Python analogy: `main.tsx` is like `if __name__ == "__main__":`, `App.tsx` is a URL dispatcher (like Flask's routes), and the pages are view functions. The big difference is *where* this runs: in the visitor's browser, not on a server.

## Why here

GitHub Pages can only serve files. It cannot run Python, a database, or any server code. A single-page app fits that perfectly: `npm run build` turns everything into plain files in `dist/`, and Pages serves them as-is.

## Find it in code

```
index.html                  the one HTML page (also holds SEO + social preview tags)
src/
  main.tsx                  entry point: fonts, global CSS, render <App />
  App.tsx                   routes: which URL shows which page
  styles/
    tokens.css              every color, font and size, defined once
    base.css                defaults for plain HTML elements + shared helpers
  content/                  WHAT the site says (data, no layout)
    profile.ts              name, LinkedIn, GitHub, email
    journey.ts              timeline milestones + "To be continued"
    projects.ts             featured projects
    topics.ts               knowledge-garden folders
    human.ts                The Human Side text and interests
    notes/*.md              the notes themselves (Markdown)
    loadNotes.ts            collects the .md files at build time
    types.ts                the shapes all of the above must follow
    content.test.ts         checks the content for typos and broken references
  lib/                      plain TypeScript helpers, no React (easy to test)
    frontmatter.ts, notes.ts, dates.ts, qr.ts, scroll.ts, scrollToElement.ts
    lib.test.ts             unit tests for the helpers
  hooks/                    reusable React behavior
    useTimelineProgress.ts  scroll-driven timeline
    usePageTitle.ts         browser tab title
  components/               HOW things look: reusable building blocks
  pages/                    one component per page, assembled from components
public/                     copied into the build untouched (favicon, social image)
.github/workflows/deploy.yml  builds and publishes on GitHub (see 07-deployment.md)
```

The rule of thumb that keeps this maintainable: **content in `src/content/`, rendering in `src/components/` and `src/pages/`**. To add a milestone you edit `journey.ts` and never touch a component.

## Try it yourself

Open `src/content/profile.ts` and change `headline`. Save. Look at the browser tab title on the home page (it comes from `usePageTitle` in `src/hooks/usePageTitle.ts`).

## Verify

```bash
npm run dev
```

Open the address it prints (usually http://localhost:5173). The tab title updates as soon as you save. Change the headline back afterwards (or keep it, if you like yours better).
