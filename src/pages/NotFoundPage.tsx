import { Link } from 'react-router'
import { usePageTitle } from '../hooks/usePageTitle'

// Shown for any address that matches no route, and for unknown notes/topics.

export default function NotFoundPage({
  message = 'There is no page at this address.',
}: {
  message?: string
}) {
  usePageTitle('Page not found')
  return (
    <div className="container page-intro">
      <h1>Page not found</h1>
      <p className="lead">{message}</p>
      <p>
        <Link to="/">Go to My Journey</Link> or <Link to="/mind">read the latest notes</Link>.
      </p>
    </div>
  )
}
