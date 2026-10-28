import { Link, useParams, useSearchParams } from 'react-router'
import NoteList from '../components/NoteList'
import { notes } from '../content/loadNotes'
import { findTopic } from '../content/topics'
import { usePageTitle } from '../hooks/usePageTitle'
import { filterNotes } from '../lib/notes'
import NotFoundPage from './NotFoundPage'

// One topic folder, e.g. /#/mind/topics/tech-stack?sub=git

export default function TopicPage() {
  // useParams reads the ":topicId" part of the route defined in App.tsx.
  const { topicId = '' } = useParams()
  const [searchParams] = useSearchParams()
  const topic = findTopic(topicId)
  usePageTitle(topic?.label ?? 'Topic not found')

  if (topic === undefined) {
    return <NotFoundPage message="There is no topic folder at this address." />
  }

  const subParam = searchParams.get('sub')
  const activeSub = topic.subtopics?.find((sub) => sub.id === subParam)
  const visible = filterNotes(notes, { topic: topic.id, subtopic: activeSub?.id })

  return (
    <div className="container">
      <div className="page-intro">
        <p>
          <Link to="/mind/topics">All topics</Link>
        </p>
        <h1>{topic.label}</h1>
        <p className="lead">{topic.description}</p>
      </div>

      {topic.subtopics && (
        <ul className="filter-bar" aria-label="Subtopic">
          <li>
            <Link to={`/mind/topics/${topic.id}`} aria-current={activeSub === undefined ? 'true' : undefined}>
              All of {topic.label}
            </Link>
          </li>
          {topic.subtopics.map((sub) => (
            <li key={sub.id}>
              <Link
                to={`/mind/topics/${topic.id}?sub=${sub.id}`}
                aria-current={sub.id === activeSub?.id ? 'true' : undefined}
              >
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <h2 className="visually-hidden">Notes in {activeSub?.label ?? topic.label}</h2>
      <NoteList
        notes={visible}
        showTopic={false}
        emptyMessage={
          <>
            No notes in {activeSub?.label ?? topic.label} yet.{' '}
            <Link to="/mind">See the latest notes from every topic</Link>.
          </>
        }
      />
    </div>
  )
}
