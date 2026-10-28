import { Link, useSearchParams } from 'react-router'
import MindHeader from '../components/MindHeader'
import NoteList from '../components/NoteList'
import { notes } from '../content/loadNotes'
import { noteTypeLabels } from '../content/topics'
import type { NoteType } from '../content/types'
import { usePageTitle } from '../hooks/usePageTitle'
import { filterNotes, isNoteType } from '../lib/notes'

// Page 2, default view: every note, newest first, filterable by type.
//
// The filter lives in the URL (/#/mind?type=reflection) rather than in React
// state. That way it survives a refresh and can be shared as a link.

const filters: { type?: NoteType; label: string }[] = [
  { label: 'All' },
  { type: 'study-note', label: 'Study notes' },
  { type: 'deep-dive', label: 'Deep dives' },
  { type: 'reflection', label: 'Reflections' },
]

export default function MindPage() {
  usePageTitle("What's on my mind")
  const [searchParams] = useSearchParams()
  const typeParam = searchParams.get('type')
  // Ignore unknown values (e.g. a mistyped link) instead of showing nothing.
  const activeType = isNoteType(typeParam) ? typeParam : undefined
  const visible = filterNotes(notes, { type: activeType })

  return (
    <div className="container">
      <MindHeader />

      <h2 className="visually-hidden">Notes, newest first</h2>
      {/* Filters only make sense once there is something to filter. */}
      {notes.length > 0 && (
        <ul className="filter-bar" aria-label="Show">
          {filters.map((filter) => (
            <li key={filter.label}>
              <Link
                to={filter.type ? `/mind?type=${filter.type}` : '/mind'}
                aria-current={filter.type === activeType ? 'true' : undefined}
              >
                {filter.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <NoteList
        notes={visible}
        emptyMessage={
          activeType ? (
            `No ${noteTypeLabels[activeType].toLowerCase()}s yet. Try another filter, or browse by topic.`
          ) : (
            <>
              The first notes are being written. <Link to="/mind/topics">Browse the topics</Link> to see what
              is coming.
            </>
          )
        }
      />
    </div>
  )
}
