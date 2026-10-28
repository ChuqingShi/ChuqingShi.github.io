import { parseNote, publishedOnly, sortNewestFirst } from '../lib/notes'

// Collects every Markdown note at build time.
//
// `import.meta.glob` is a Vite feature: while building, Vite finds every file
// matching the pattern and inlines its text into the JavaScript bundle. There
// is no server and no fetching at runtime, which is exactly what static
// GitHub Pages hosting needs.
//
// To add a note, create src/content/drafts/YYYY-MM-DD-some-title.md and preview
// it with `npm run dev`. To publish it, move the file to src/content/notes/.
// No code change needed: the next `npm run dev` or `npm run build` picks it up.

const publishedFiles = import.meta.glob<string>('./notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// Drafts live in src/content/drafts/. Only the dev server (`npm run dev`) and
// the tests read them. In a production build `import.meta.env.DEV` is false,
// Vite removes this branch, and the draft text never reaches visitors at all:
// it is not just hidden, it is not in the published files.
const draftFiles = import.meta.env.DEV
  ? import.meta.glob<string>('./drafts/*.md', { query: '?raw', import: 'default', eager: true })
  : {}

/** Every note this build can see, newest first. Used by the content tests. */
export const everyNote = sortNewestFirst(
  Object.entries({ ...publishedFiles, ...draftFiles }).map(([path, source]) => parseNote(path, source)),
)

/** The notes visitors see: published notes, plus drafts when running `npm run dev`. */
export const notes = publishedOnly(everyNote, import.meta.env.DEV)

export function findNote(slug: string) {
  return notes.find((note) => note.slug === slug)
}
