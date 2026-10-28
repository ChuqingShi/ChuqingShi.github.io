# 06 · Content: notes, dates, topics and the feed

## Concept

Notes are plain Markdown files with a small **metadata block** ("front matter") at the top:

```markdown
---
title: Why LyricLens splits lyrics by section, not by length
date: 2026-10-27
type: deep-dive
topic: llms-ai-agents
tags: [rag, embeddings]
summary: One or two sentences shown in the feed.
draft: true
projects: [lyriclens]
---

The note itself, in Markdown.
```

| Field | Required | Allowed values |
| --- | --- | --- |
| `title` | yes | any text |
| `date` | yes | `YYYY-MM-DD`; the file name must start with it |
| `type` | yes | `study-note`, `deep-dive` or `reflection` |
| `topic` | yes | an `id` from `src/content/topics.ts` |
| `subtopic` | no | a subtopic `id` belonging to that topic (e.g. `git` under `tech-stack`) |
| `tags` | no | a list like `[rag, embeddings]` |
| `summary` | yes | one or two sentences, shown in the feed |
| `draft` | no | `true` shows the note only in `npm run dev`; default `false` |
| `projects` | no | project `id`s from `src/content/projects.ts` |

A line starting with `#` inside the metadata block is a comment. Comments must be on their own line, not after a value.

At build time, Vite collects every file in `src/content/notes/`, the metadata is checked, and the notes are sorted. Both browsing views are just different filters over the same sorted list.

## Why here

`plan.md` asks for Markdown stored in GitHub, with dates and topic metadata powering a chronological feed and topic folders. Writing a note should never require touching code.

## Find it in code

The path of a note from file to screen:

1. `src/content/loadNotes.ts`: `import.meta.glob('./notes/*.md', { query: '?raw', … })` makes Vite bundle every note's text at build time. No server needed.
2. `src/lib/frontmatter.ts`: `parseFrontmatter` splits the metadata from the body. It reads only the four value kinds used here (text, quoted text, `[lists]`, `true/false`) instead of pulling in a full YAML library.
3. `src/lib/notes.ts`: `parseNote` checks every field and throws a clear error naming the file if something is wrong (a bad date, an unknown type). `sortNewestFirst` sorts by the date string: `"YYYY-MM-DD"` sorts correctly as text. `publishedOnly` drops drafts.
4. `loadNotes.ts` exports `notes`: drafts included only when `import.meta.env.DEV` is true (`npm run dev`), never in `npm run build`.
5. The **feed**, `src/pages/MindPage.tsx`, shows `notes` with an optional `?type=` filter (`filterNotes`).
6. The **folders**, `src/pages/TopicsPage.tsx`, count notes per topic (`countByTopic`); `src/pages/TopicPage.tsx` filters by topic and `?sub=`.
7. `src/pages/NotePage.tsx` renders the body with `src/components/MarkdownBody.tsx` and lists related notes (`relatedNotes`: same topic first, then shared tags) and the linked projects.

Dates: `src/lib/dates.ts` formats `2026-10-27` as "October 27, 2026" in UTC on purpose. `new Date('2026-10-27')` means midnight UTC, which is still October 26 in Hawaii, so formatting it in local time would show the wrong day.

Safety net: `src/content/content.test.ts` fails if a note uses an unknown topic, subtopic or project, if two notes share a file name, or if a file name does not start with its date.

The other content files work the same way, minus Markdown: `src/content/journey.ts` (milestones), `src/content/projects.ts`, `src/content/topics.ts`, `src/content/human.ts`. Anything not yet written is a `{ placeholder: '…' }`, which renders as a dashed "To fill in" box (`src/components/FillableText.tsx`).

## Try it yourself

Publish your first note:

1. Open `src/content/notes/2026-10-27-from-proofs-to-products.md`.
2. Replace the prompts with a few sentences of your own, and update `summary`.
3. Change `draft: true` to `draft: false`. If you write it on a different day, update `date` and rename the file to start with that date.

## Verify

```bash
npm test          # the content checks still pass
npm run build     # production build
npm run preview   # serves the production build, usually at http://localhost:4173
```

In the preview, open What's on My Mind: your note is listed (drafts are not), and the Mathematics & Research folder says "1 note".
