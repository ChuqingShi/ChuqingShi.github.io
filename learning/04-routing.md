# 04 · Routing: pages, URLs and the `#`

## Concept

**Routing** decides which page to show for a URL. In a single-page app, the router watches the address bar and swaps page components without reloading.

This site uses React Router's `HashRouter`, so routes live after a `#`:

| URL | Page |
| --- | --- |
| `chuqingshi.github.io/#/` | My Journey (`src/pages/JourneyPage.tsx`) |
| `/#/mind` | What's on My Mind, newest first (`MindPage.tsx`) |
| `/#/mind?type=reflection` | the same, filtered |
| `/#/mind/topics` | topic folders (`TopicsPage.tsx`) |
| `/#/mind/topics/tech-stack?sub=git` | one folder, one subtopic (`TopicPage.tsx`) |
| `/#/mind/notes/<file name>` | one note (`NotePage.tsx`) |
| `/#/about` | The Human Side (`HumanSidePage.tsx`) |
| anything else | Page not found (`NotFoundPage.tsx`) |

## Why here

GitHub Pages only serves files that exist. Without the `#`, refreshing `chuqingshi.github.io/mind` asks the server for a file called `mind`, which does not exist: a 404. The browser never sends the part after `#` to the server, so every request is for `index.html`, and React reads the rest. The starter note `src/content/drafts/2026-10-27-why-this-site-uses-a-hash-in-urls.md` explains this in more depth.

## Find it in code

- `src/App.tsx`: the route table. `<Route element={<Layout />}>` wraps every page in the header and footer; `:topicId` and `:slug` are URL parameters.
- `src/pages/TopicPage.tsx`: `useParams()` reads `:topicId`; `useSearchParams()` reads `?sub=`.
- `src/components/SiteHeader.tsx`: `NavLink` marks the current page with `aria-current="page"`, and `end` stops "My Journey" (`/`) from matching every page.
- `src/components/Layout.tsx`: after each page change, scrolls to the top and moves focus to `<main>` (a real page load would do this; a single-page app must do it itself).

### The surprising part: `#` links no longer jump

Because the router owns the `#`, a normal `<a href="#projects">` would navigate to a *route* called `projects` and show "Page not found". Three places work around this:

- the **Jump to projects** button in `src/pages/JourneyPage.tsx` calls `scrollToElement('projects')` from `src/lib/scrollToElement.ts`;
- the **Skip to content** link in `src/components/Layout.tsx` uses `skipToMain` to move focus by hand;
- `src/components/MarkdownBody.tsx` turns `#…` links inside notes (such as footnotes) into scrolling links, and `/…` links into router links.

### Code splitting

`src/App.tsx` loads `NotePage` with `lazy(() => import('./pages/NotePage'))`. The Markdown renderer is the biggest piece of code on the site, so it is downloaded only when someone opens a note. `<Suspense>` shows "Loading the note…" for that moment.

## Try it yourself

Add a route alias so `/#/projects` opens My Journey: in `src/App.tsx`, add `<Route path="projects" element={<JourneyPage />} />` next to the other routes.

## Verify

`npm run dev`, then open `http://localhost:5173/#/projects`: My Journey appears instead of "Page not found". Open `http://localhost:5173/#/nope`: "Page not found" still works. (Remove the alias afterwards if you don't want two addresses for the same page.)

## Later: clean URLs

If URLs without `#` become important, the usual GitHub Pages approach is `BrowserRouter` plus a copy of `index.html` saved as `404.html` during the build. Not implemented yet; the plan says to reconsider only if clean URLs matter.
