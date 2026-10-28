import { describe, expect, it } from 'vitest'
import { milestones } from './journey'
import { everyNote } from './loadNotes'
import { profile } from './profile'
import { projects } from './projects'
import { topics } from './topics'
import { isPlaceholder } from './types'

// Content integrity checks. These catch the mistakes that are easy to make
// when editing content by hand: a typo in a topic id, a milestone out of
// order, a project linked from the timeline that does not exist.

const projectIds = new Set(projects.map((project) => project.id))

describe('notes', () => {
  it('has unique slugs', () => {
    const slugs = everyNote.map((note) => note.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it.each(everyNote.map((note) => [note.slug, note] as const))(
    '%s uses a known topic and subtopic',
    (_slug, note) => {
      const topic = topics.find((t) => t.id === note.topic)
      expect(topic, `unknown topic "${note.topic}"`).toBeDefined()
      if (note.subtopic !== undefined) {
        expect(
          topic?.subtopics?.some((sub) => sub.id === note.subtopic),
          `unknown subtopic "${note.subtopic}" for topic "${note.topic}"`,
        ).toBe(true)
      }
    },
  )

  it.each(everyNote.map((note) => [note.slug, note] as const))(
    '%s links only to known projects',
    (_slug, note) => {
      for (const id of note.projects) expect(projectIds.has(id), `unknown project "${id}"`).toBe(true)
    },
  )

  it('starts each file name with the note date, so files sort by date too', () => {
    for (const note of everyNote) expect(note.slug.startsWith(note.date)).toBe(true)
  })
})

describe('journey', () => {
  it('has unique milestone ids', () => {
    const ids = milestones.map((m) => m.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('lists dated milestones oldest first', () => {
    const starts = milestones.flatMap((m) => (isPlaceholder(m.dates) ? [] : [m.dates.start]))
    expect(starts).toEqual([...starts].sort())
  })

  it('links only to projects that exist', () => {
    for (const milestone of milestones) {
      for (const id of milestone.projectIds ?? []) {
        expect(projectIds.has(id), `${milestone.id} links to unknown project "${id}"`).toBe(true)
      }
    }
  })
})

describe('projects', () => {
  it('has unique ids and at least one link each', () => {
    expect(projectIds.size).toBe(projects.length)
    for (const project of projects) expect(project.links.length).toBeGreaterThan(0)
  })

  it('points related notes at notes that exist', () => {
    const slugs = new Set(everyNote.map((note) => note.slug))
    for (const project of projects) {
      for (const slug of project.relatedNotes ?? [])
        expect(slugs.has(slug), `${project.id} -> ${slug}`).toBe(true)
    }
  })

  it('only marks a project live when it has a demo link', () => {
    for (const project of projects.filter((p) => p.status === 'live')) {
      expect(
        project.links.some((link) => link.kind === 'demo'),
        project.id,
      ).toBe(true)
    }
  })
})

describe('profile', () => {
  it('uses https links', () => {
    expect(profile.linkedinUrl).toMatch(/^https:\/\//)
    expect(profile.githubUrl).toMatch(/^https:\/\//)
  })
})
