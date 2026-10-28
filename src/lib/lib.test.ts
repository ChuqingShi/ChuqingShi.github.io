import { describe, expect, it } from 'vitest'
import { formatFullDate, formatMonth, formatMonthRange } from './dates'
import { FrontmatterError, parseFrontmatter } from './frontmatter'
import {
  countByTopic,
  filterNotes,
  NoteError,
  parseNote,
  publishedOnly,
  relatedNotes,
  slugFromPath,
  sortNewestFirst,
} from './notes'
import { buildQrDrawing, QUIET_ZONE } from './qr'
import { countReached, timelineProgress } from './scroll'
import type { Note } from '../content/types'

// Unit tests for the pure helpers in src/lib/. Run with `npm test`.
// Each `it(...)` is one small claim about the code, like a pytest function.

describe('parseFrontmatter', () => {
  it('reads text, quoted text, lists and booleans', () => {
    const { data, body } = parseFrontmatter(
      [
        '---',
        'title: "Hello: world"',
        'tags: [a, b]',
        'empty: []',
        'draft: true',
        '---',
        '',
        'Body text',
      ].join('\n'),
    )
    expect(data).toEqual({ title: 'Hello: world', tags: ['a', 'b'], empty: [], draft: true })
    expect(body).toBe('Body text')
  })

  it('ignores comment lines and handles Windows line endings', () => {
    const { data } = parseFrontmatter('---\r\n# a comment\r\ntitle: Hi\r\n---\r\nBody')
    expect(data).toEqual({ title: 'Hi' })
  })

  it('fails loudly on malformed metadata', () => {
    expect(() => parseFrontmatter('no metadata here')).toThrow(FrontmatterError)
    expect(() => parseFrontmatter('---\ntitle: Hi\n')).toThrow(/never closed/)
    expect(() => parseFrontmatter('---\njust words\n---\n')).toThrow(/Line 2/)
  })
})

function note(overrides: Partial<Note>): Note {
  return {
    slug: 'slug',
    title: 'Title',
    date: '2026-01-01',
    type: 'study-note',
    topic: 'tech-stack',
    tags: [],
    summary: 'Summary',
    draft: false,
    projects: [],
    body: '',
    ...overrides,
  }
}

describe('notes', () => {
  const valid = [
    '---',
    'title: A note',
    'date: 2026-10-27',
    'type: deep-dive',
    'topic: llms-ai-agents',
    'summary: Short',
    '---',
    'Body',
  ].join('\n')

  it('derives the slug from the file name', () => {
    expect(slugFromPath('./notes/2026-10-27-hello-world.md')).toBe('2026-10-27-hello-world')
  })

  it('parses a valid note with defaults for optional fields', () => {
    const parsed = parseNote('./notes/2026-10-27-a-note.md', valid)
    expect(parsed).toMatchObject({
      slug: '2026-10-27-a-note',
      type: 'deep-dive',
      draft: false,
      tags: [],
      projects: [],
    })
  })

  it('marks files in the drafts folder as drafts', () => {
    expect(parseNote('./drafts/2026-10-27-a-note.md', valid).draft).toBe(true)
    expect(parseNote('./notes/2026-10-27-a-note.md', valid).draft).toBe(false)
  })

  it('rejects the old "draft:" line with a pointer to the drafts folder', () => {
    expect(() => parseNote('x.md', valid.replace('---\nBody', 'draft: true\n---\nBody'))).toThrow(/drafts/)
  })

  it('rejects bad dates, unknown types and missing titles', () => {
    expect(() => parseNote('x.md', valid.replace('2026-10-27', 'Oct 27'))).toThrow(NoteError)
    expect(() => parseNote('x.md', valid.replace('deep-dive', 'essay'))).toThrow(/type/)
    expect(() => parseNote('x.md', valid.replace('title: A note\n', ''))).toThrow(/title/)
  })

  it('sorts newest first, breaking ties by title', () => {
    const sorted = sortNewestFirst([
      note({ slug: 'old', date: '2025-01-01' }),
      note({ slug: 'b', date: '2026-05-01', title: 'B' }),
      note({ slug: 'a', date: '2026-05-01', title: 'A' }),
    ])
    expect(sorted.map((n) => n.slug)).toEqual(['a', 'b', 'old'])
  })

  it('hides drafts unless asked to include them', () => {
    const all = [note({ slug: 'draft', draft: true }), note({ slug: 'live' })]
    expect(publishedOnly(all, false).map((n) => n.slug)).toEqual(['live'])
    expect(publishedOnly(all, true)).toHaveLength(2)
  })

  it('filters by topic, subtopic and type together', () => {
    const all = [
      note({ slug: 'git', subtopic: 'git' }),
      note({ slug: 'react', subtopic: 'react-typescript' }),
      note({ slug: 'essay', topic: 'mathematics-research', type: 'reflection' }),
    ]
    expect(filterNotes(all, { topic: 'tech-stack' }).map((n) => n.slug)).toEqual(['git', 'react'])
    expect(filterNotes(all, { topic: 'tech-stack', subtopic: 'git' }).map((n) => n.slug)).toEqual(['git'])
    expect(filterNotes(all, { type: 'reflection' }).map((n) => n.slug)).toEqual(['essay'])
    expect(filterNotes(all, {})).toHaveLength(3)
  })

  it('counts notes per topic', () => {
    expect(countByTopic([note({}), note({}), note({ topic: 'leetcode' })])).toEqual({
      'tech-stack': 2,
      leetcode: 1,
    })
  })

  it('finds related notes by topic and shared tags, never the note itself', () => {
    const current = note({ slug: 'current', tags: ['rag'] })
    const all = [
      current,
      note({ slug: 'same-topic' }),
      note({ slug: 'shared-tag', topic: 'llms-ai-agents', tags: ['rag'] }),
      note({ slug: 'unrelated', topic: 'leetcode' }),
    ]
    expect(relatedNotes(current, all).map((n) => n.slug)).toEqual(['same-topic', 'shared-tag'])
  })
})

describe('dates', () => {
  it('formats months and month ranges', () => {
    expect(formatMonth('2024-12')).toBe('Dec 2024')
    expect(formatMonth('2025')).toBe('2025')
    expect(formatMonthRange({ start: '2026-07', end: '2026-09' })).toBe('Jul – Sep 2026')
    expect(formatMonthRange({ start: '2025-11', end: '2026-02' })).toBe('Nov 2025 – Feb 2026')
    expect(formatMonthRange({ start: '2026-10' })).toBe('Oct 2026')
  })

  it('keeps the written day regardless of time zone', () => {
    // A naive `new Date('2026-10-27')` would print October 26 in Hawaii.
    expect(formatFullDate('2026-10-27')).toBe('October 27, 2026')
  })
})

describe('timeline scroll math', () => {
  it('reports how much of the timeline has passed the reading line', () => {
    expect(timelineProgress(500, 1000, 400)).toBe(0) // not reached yet
    expect(timelineProgress(-100, 1000, 400)).toBe(0.5) // halfway
    expect(timelineProgress(-2000, 1000, 400)).toBe(1) // scrolled past
    expect(timelineProgress(0, 0, 400)).toBe(0) // empty timeline
  })

  it('counts the dots above the reading line', () => {
    expect(countReached([100, 300, 500], 400)).toBe(2)
    expect(countReached([], 400)).toBe(0)
  })
})

describe('QR code drawing', () => {
  it('draws a square code with a quiet zone, the same way every time', () => {
    const first = buildQrDrawing('https://www.linkedin.com/in/chuqingshi')
    const second = buildQrDrawing('https://www.linkedin.com/in/chuqingshi')
    // This URL needs a version-3 QR code (29 modules wide), plus the quiet zone on both sides.
    expect(first.viewBoxSize).toBe(29 + QUIET_ZONE * 2)
    expect(first.path.startsWith(`M${QUIET_ZONE} ${QUIET_ZONE}`)).toBe(true) // top-left finder pattern
    expect(first).toEqual(second)
  })
})
