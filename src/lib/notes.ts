import type { Note, NoteType } from '../content/types'
import { parseFrontmatter, type FrontmatterValue } from './frontmatter'

// Pure functions for notes: turning a Markdown file into a checked `Note`,
// then sorting, filtering and grouping. "Pure" means they only use their
// arguments (no global state), which makes them easy to unit test.

const NOTE_TYPES: readonly NoteType[] = ['study-note', 'deep-dive', 'reflection']
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

export class NoteError extends Error {}

function requireString(data: Record<string, FrontmatterValue>, key: string, file: string): string {
  const value = data[key]
  if (typeof value !== 'string' || value.trim() === '') {
    throw new NoteError(`${file}: "${key}" is required and must be text`)
  }
  return value
}

function optionalList(data: Record<string, FrontmatterValue>, key: string, file: string): string[] {
  const value = data[key]
  if (value === undefined) return []
  if (!Array.isArray(value)) {
    throw new NoteError(`${file}: "${key}" must be a list like [a, b]`)
  }
  return value
}

/** "src/content/notes/2026-10-27-hello.md" -> "2026-10-27-hello" */
export function slugFromPath(path: string): string {
  const fileName = path.split('/').pop() ?? path
  return fileName.replace(/\.md$/, '')
}

/** Read one Markdown file into a Note, checking every metadata field. */
export function parseNote(path: string, source: string): Note {
  const file = path.split('/').pop() ?? path
  const { data, body } = parseFrontmatter(source)

  const date = requireString(data, 'date', file)
  if (!DATE_PATTERN.test(date)) {
    throw new NoteError(`${file}: "date" must look like 2026-10-27, got "${date}"`)
  }

  const type = requireString(data, 'type', file)
  if (!NOTE_TYPES.includes(type as NoteType)) {
    throw new NoteError(`${file}: "type" must be one of ${NOTE_TYPES.join(', ')}, got "${type}"`)
  }

  const subtopic = data.subtopic
  if (subtopic !== undefined && typeof subtopic !== 'string') {
    throw new NoteError(`${file}: "subtopic" must be text`)
  }

  const draft = data.draft ?? false
  if (typeof draft !== 'boolean') {
    throw new NoteError(`${file}: "draft" must be true or false`)
  }

  return {
    slug: slugFromPath(path),
    title: requireString(data, 'title', file),
    date,
    type: type as NoteType,
    topic: requireString(data, 'topic', file),
    subtopic,
    tags: optionalList(data, 'tags', file),
    summary: requireString(data, 'summary', file),
    draft,
    projects: optionalList(data, 'projects', file),
    body,
  }
}

/**
 * Newest first. "YYYY-MM-DD" strings sort correctly as plain text, so no Date
 * objects (and no time-zone surprises) are needed. Ties are broken by title so
 * the order never changes between builds.
 */
export function sortNewestFirst(notes: Note[]): Note[] {
  return [...notes].sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
}

/** Drop drafts unless asked to keep them (the dev server keeps them). */
export function publishedOnly(notes: Note[], includeDrafts: boolean): Note[] {
  return includeDrafts ? notes : notes.filter((note) => !note.draft)
}

export type NoteFilter = {
  topic?: string
  subtopic?: string
  type?: NoteType
}

/** Keep notes that match every filter that is set. */
export function filterNotes(notes: Note[], filter: NoteFilter): Note[] {
  return notes.filter(
    (note) =>
      (filter.topic === undefined || note.topic === filter.topic) &&
      (filter.subtopic === undefined || note.subtopic === filter.subtopic) &&
      (filter.type === undefined || note.type === filter.type),
  )
}

/** How many notes each topic has, e.g. { 'tech-stack': 2 }. */
export function countByTopic(notes: Note[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const note of notes) {
    counts[note.topic] = (counts[note.topic] ?? 0) + 1
  }
  return counts
}

/** Up to `limit` other notes: same topic first, then shared tags. */
export function relatedNotes(note: Note, all: Note[], limit = 3): Note[] {
  const score = (other: Note) =>
    (other.topic === note.topic ? 2 : 0) + other.tags.filter((tag) => note.tags.includes(tag)).length
  return sortNewestFirst(all)
    .filter((other) => other.slug !== note.slug && score(other) > 0)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit)
}

export function isNoteType(value: string | null): value is NoteType {
  return value !== null && NOTE_TYPES.includes(value as NoteType)
}
