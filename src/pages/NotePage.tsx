import { Link, useParams } from 'react-router'
import MarkdownBody from '../components/MarkdownBody'
import NoteList from '../components/NoteList'
import { findNote, notes } from '../content/loadNotes'
import { findProject } from '../content/projects'
import { findTopic, noteTypeLabels } from '../content/topics'
import { usePageTitle } from '../hooks/usePageTitle'
import { formatFullDate } from '../lib/dates'
import { relatedNotes } from '../lib/notes'
import NotFoundPage from './NotFoundPage'
import './NotePage.css'

// A single note, e.g. /#/mind/notes/2026-10-27-why-this-site-uses-a-hash-in-urls

export default function NotePage() {
  const { slug = '' } = useParams()
  const note = findNote(slug)
  usePageTitle(note?.title ?? 'Note not found')

  if (note === undefined) {
    return <NotFoundPage message="There is no note at this address. It may have been renamed." />
  }

  const topic = findTopic(note.topic)
  const subtopic = topic?.subtopics?.find((sub) => sub.id === note.subtopic)
  const projects = note.projects.flatMap((id) => {
    const project = findProject(id)
    return project ? [project] : []
  })
  const related = relatedNotes(note, notes)

  return (
    <article className="container note-page">
      <header className="page-intro">
        <p className="note-page__breadcrumb">
          <Link to="/mind">What's on my mind</Link>
          {topic && (
            <>
              <span aria-hidden="true"> / </span>
              <Link to={`/mind/topics/${topic.id}`}>{topic.label}</Link>
            </>
          )}
          {topic && subtopic && (
            <>
              <span aria-hidden="true"> / </span>
              <Link to={`/mind/topics/${topic.id}?sub=${subtopic.id}`}>{subtopic.label}</Link>
            </>
          )}
        </p>
        <h1 className="note-page__title">{note.title}</h1>
        <p className="note-page__meta muted">
          <time dateTime={note.date}>{formatFullDate(note.date)}</time>
          <span>{noteTypeLabels[note.type]}</span>
          {note.draft && <span className="note-item__draft">Draft, only visible locally</span>}
        </p>
      </header>

      <MarkdownBody markdown={note.body} />

      {note.tags.length > 0 && (
        <ul className="inline-list note-page__tags" aria-label="Tags">
          {note.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
      )}

      {projects.length > 0 && (
        <section className="note-page__section" aria-labelledby="note-projects">
          <h2 id="note-projects">The project behind this note</h2>
          <ul className="note-page__projects">
            {projects.map((project) => (
              <li key={project.id}>
                <h3>{project.title}</h3>
                <p className="muted">{project.tagline}</p>
                <ul className="inline-list">
                  {project.links.map((link) => (
                    <li key={link.url}>
                      <a href={link.url}>{link.label}</a>
                    </li>
                  ))}
                  <li>
                    <Link to="/">See it on my journey</Link>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="note-page__section" aria-labelledby="note-related">
          <h2 id="note-related">Related notes</h2>
          <NoteList notes={related} emptyMessage="" />
        </section>
      )}
    </article>
  )
}
