import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { findTopic, noteTypeLabels } from '../content/topics'
import type { Note } from '../content/types'
import { formatFullDate } from '../lib/dates'
import './NoteList.css'

// A list of notes as they appear in the feed and in topic folders.

type NoteListProps = {
  notes: Note[]
  /** Shown when there is nothing to list. */
  emptyMessage: ReactNode
  /** Hide the topic link when every note is from the same topic. */
  showTopic?: boolean
}

export default function NoteList({ notes, emptyMessage, showTopic = true }: NoteListProps) {
  if (notes.length === 0) {
    return <p className="note-list__empty">{emptyMessage}</p>
  }

  return (
    <ol className="note-list">
      {notes.map((note) => {
        const topic = findTopic(note.topic)
        return (
          <li key={note.slug} className="note-item">
            <p className="note-item__meta">
              <time dateTime={note.date}>{formatFullDate(note.date)}</time>
              <span>{noteTypeLabels[note.type]}</span>
              {showTopic && topic && <Link to={`/mind/topics/${topic.id}`}>{topic.label}</Link>}
              {note.draft && <span className="note-item__draft">Draft, only visible locally</span>}
            </p>
            <h3 className="note-item__title">
              <Link to={`/mind/notes/${note.slug}`}>{note.title}</Link>
            </h3>
            <p className="note-item__summary">{note.summary}</p>
            {note.tags.length > 0 && (
              <ul className="inline-list" aria-label="Tags">
                {note.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ol>
  )
}
