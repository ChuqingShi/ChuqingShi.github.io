# 07 · Deployment: from your laptop to chuqingshi.github.io

## Concept

- `npm run build` turns the source into a folder of static files, `dist/`: one `index.html`, JavaScript and CSS files with content hashes in their names (like `index-BuNYnt79.js`, so browsers never use a stale copy), fonts, and everything from `public/`.
- **GitHub Actions** runs scripts on GitHub's computers when something happens in the repo. A *workflow* file describes them.
- **GitHub Pages** serves a folder of static files at `https://<username>.github.io`. It can be fed by a branch, or (as here) by a workflow that uploads `dist/`.

## Why here

You should never have to build and upload by hand. Merge to `main`, and a few minutes later the site is live, but only if every check passes.

## Find it in code

`.github/workflows/deploy.yml`:

- **On every pull request:** install with `npm ci` (exact versions from `package-lock.json`), then `npm run check` (lint, typecheck, unit tests, production build). Nothing is published.
- **On a push or merge to `main`** (or "Run workflow" in the Actions tab): the same checks, then `actions/upload-pages-artifact` uploads `dist/` and `actions/deploy-pages` publishes it.
- `vite.config.ts` sets `base: '/'`, correct for a *user site* repository named `ChuqingShi.github.io` that is served from the domain root.

## What still needs you (not done, by design)

These change your GitHub account or make the site public, so they wait for you:

1. **Turn on Pages for Actions:** repo → Settings → Pages → Build and deployment → Source → **GitHub Actions**. Do this *before* merging, otherwise GitHub may try to publish the branch as raw files.
2. **Review and merge** the `phase-1` pull request into `main`. The merge triggers the first deployment; watch it under the Actions tab.
3. Optional later: a custom domain (Settings → Pages → Custom domain).

## Try it yourself

Before merging, preview exactly what will be published:

```bash
npm run build
npm run preview
```

## Verify

The preview (usually http://localhost:4173) is the production build: drafts are not included, and the notes feed shows its empty state until a note is in `src/content/notes/`. After the first real deployment, open https://chuqingshi.github.io, refresh on a deep page like `/#/about`, and paste the address into LinkedIn's post composer to see the social preview image (`public/social-preview.png`).
