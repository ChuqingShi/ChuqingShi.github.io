import type { ProjectStatus } from '../content/types'
import './StatusBadge.css'

// Wording for each status. "Live" is only ever used for something visitors
// can open right now; a project that runs on a laptop says so.
const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  local: 'Runs locally',
  'in-development': 'In development',
  experimental: 'Experimental',
}

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  // The color is a hint; the text carries the meaning, so the badge still
  // works for colorblind visitors and screen readers.
  return (
    <span className={`status status--${status}`}>
      <span className="status__marker" aria-hidden="true" />
      {statusLabels[status]}
    </span>
  )
}
