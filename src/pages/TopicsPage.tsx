import { Link } from 'react-router'
import MindHeader from '../components/MindHeader'
import { notes } from '../content/loadNotes'
import { topics } from '../content/topics'
import { usePageTitle } from '../hooks/usePageTitle'
import { countByTopic } from '../lib/notes'
import './TopicsPage.css'

// Page 2, second view: the topic folders from plan.md, with note counts.

export default function TopicsPage() {
  usePageTitle('Topics')
  const counts = countByTopic(notes)

  return (
    <div className="container">
      <MindHeader />
      <h2 className="visually-hidden">Topics</h2>
      <ul className="folders">
        {topics.map((topic) => {
          const count = counts[topic.id] ?? 0
          return (
            <li key={topic.id} className="folder">
              <h3 className="folder__title">
                <Link to={`/mind/topics/${topic.id}`}>{topic.label}</Link>
              </h3>
              <p className="folder__description">{topic.description}</p>
              <p className="folder__count">
                {count === 0 ? 'No notes yet' : count === 1 ? '1 note' : `${count} notes`}
              </p>
              {topic.subtopics && (
                <p className="folder__subtopics muted">
                  Includes {topic.subtopics.map((sub) => sub.label).join(', ')}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
