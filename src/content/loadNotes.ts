import { parseNote, publishedOnly, sortNewestFirst } from '../lib/notes'

// Collects every Markdown note at build time.
//
// `import.meta.glob` is a Vite feature: while building, Vite finds every file
// matching the pattern and inlines its text into the JavaScript bundle. There
// is no server and no fetching at runtime, which is exactly what static
// GitHub Pages hosting needs.
//
// To add a note, create src/content/notes/YYYY-MM-DD-some-title.md.
// No code change needed: the next `npm run dev` or `npm run build` picks it up.

const files = import.meta.glob<string>('./notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** Every note, drafts included, newest first. Used by the content tests. */
export const everyNote = sortNewestFirst(
  Object.entries(files).map(([path, source]) => parseNote(path, source)),
)

/**
 * The notes visitors see. The dev server (`npm run dev`) shows drafts so you
 * can preview them; the production build (`npm run build`) leaves them out.
 */
export const notes = publishedOnly(everyNote, import.meta.env.DEV)

export function findNote(slug: string) {
  return notes.find((note) => note.slug === slug)
}
