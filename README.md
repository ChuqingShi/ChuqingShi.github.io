# chuqingshi.github.io

Chuqing Shi's personal website: an interactive record of the journey from a PhD in Mathematics to data science and AI.

- **My Journey**: a scroll-driven timeline and featured projects
- **What's on My Mind**: notes, deep dives and reflections, by date or by topic
- **The Human Side**: the person behind the work

Built with React, TypeScript and Vite, and published with GitHub Pages.

## Run it locally

Requires Node.js 22.22 or newer.

```bash
npm install
npm run dev        # http://localhost:5173, drafts visible
```

| Command                                | What it does                                                            |
| -------------------------------------- | ----------------------------------------------------------------------- |
| `npm run dev`                          | Development server with instant reload                                  |
| `npm run check`                        | Lint, typecheck, unit tests and production build: run before committing |
| `npm test`                             | Unit and content tests only                                             |
| `npm run build` then `npm run preview` | Build and serve exactly what will be published                          |
| `npm run format`                       | Format the code with Prettier                                           |

## Editing content

All content lives in `src/content/`. Add a note by creating `src/content/notes/YYYY-MM-DD-title.md`; see `learning/06-content.md`.

## Learning guides

This site doubles as a frontend learning project. Start with [`learning/00-start-here.md`](learning/00-start-here.md).

Product plan: [`plan.md`](plan.md) · How work is done here: [`CLAUDE.md`](CLAUDE.md)
