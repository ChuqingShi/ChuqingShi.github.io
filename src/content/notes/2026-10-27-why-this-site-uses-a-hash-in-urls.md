---
# Starter draft written by Claude from this repo's code. Rewrite it in your own voice, then set draft: false.
title: Why this site's URLs have a # in them
date: 2026-10-27
type: study-note
topic: tech-stack
subtopic: react-typescript
tags: [routing, github-pages, react-router]
summary: GitHub Pages only serves files that exist. A hash router keeps every page inside one file, so refreshing never breaks.
draft: true
---

Every page on this site has an address like `chuqingshi.github.io/#/mind`. The `#` looks odd, but it solves a real problem with static hosting.

## The problem: there is only one HTML file

A React app built with Vite is one `index.html` plus some JavaScript. "Pages" such as *What's on My Mind* are not separate files. They are components that React swaps in and out depending on the URL.

GitHub Pages is a static file server. When a browser asks for `/mind`, Pages looks for a file called `mind` (or `mind/index.html`). There isn't one, so it returns a 404, before React ever gets a chance to run.

Clicking links inside the app works fine, because React changes the URL without asking the server. The trouble starts when someone refreshes the page or opens a shared link.

## The fix: put the route after the #

Browsers never send the part of a URL after `#` to the server. So for `/#/mind`:

1. The browser asks GitHub Pages for `/`, which is `index.html`. That file exists.
2. React starts, reads `#/mind` from the address bar, and shows the right page.

That is what `HashRouter` from React Router does. In Python terms, picture a Flask app with a single route that always returns the same page; the page itself then decides what to show, based on a part of the URL the server never sees.

## The trade-off

- Pros: no server configuration, and refreshing or sharing any page always works.
- Cons: the URLs are less pretty, and `#` can no longer jump to a heading on the page, because the router owns it. That is why the "Jump to projects" button scrolls with JavaScript instead of linking to `#projects`.

A "clean URL" setup is possible later (for example, copying `index.html` to `404.html` during the build), but it adds moving parts. For a first version, the hash is the simple, reliable choice.
