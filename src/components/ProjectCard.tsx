import { Link } from 'react-router'
import type { Note, Project } from '../content/types'
import { formatMonthRange } from '../lib/dates'
import FillableText from './FillableText'
import StatusBadge from './StatusBadge'
import './ProjectCard.css'

// One featured project: what it is, why it exists, how it works, and where
// to see it. Props (short for "properties") are the inputs a parent passes
// in, like the arguments of a function.

type ProjectCardProps = {
  project: Project
  /** Knowledge-garden notes about this project, already looked up by the parent. */
  notes: Note[]
}

export default function ProjectCard({ project, notes }: ProjectCardProps) {
  const headingId = `project-${project.id}`

  return (
    <article className="project" aria-labelledby={headingId}>
      <div className="project__meta">
        <StatusBadge status={project.status} />
        <p className="project__dates">
          <time dateTime={project.dates.start}>{formatMonthRange(project.dates)}</time>
          {project.dates.needsConfirming && <span className="visually-hidden"> (date to confirm)</span>}
        </p>
        {project.statusNote && <p className="project__status-note">{project.statusNote}</p>}
      </div>

      <div className="project__body">
        {/* tabIndex={-1} lets "See … in projects" buttons move focus here. */}
        <h3 id={headingId} className="project__title" tabIndex={-1}>
          {project.title}
        </h3>
        <p className="project__tagline">{project.tagline}</p>

        <h4 className="project__label">The problem</h4>
        <FillableText value={project.problem} />

        <details className="project__details">
          <summary>How it works</summary>
          <ul>
            {project.approach.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </details>

        <h4 className="project__label">Outcomes</h4>
        <FillableText value={project.outcomes} />

        <h4 className="visually-hidden">Built with</h4>
        <ul className="inline-list project__tech">
          {project.tech.map((tool) => (
            <li key={tool} className="chip">
              {tool}
            </li>
          ))}
        </ul>

        <ul className="project__links">
          {project.links.map((link) => (
            <li key={link.url}>
              <a className={link.kind === 'demo' ? 'button' : 'button button--quiet'} href={link.url}>
                {link.label}
              </a>
            </li>
          ))}
          {notes.map((note) => (
            <li key={note.slug}>
              <Link className="button button--quiet" to={`/mind/notes/${note.slug}`}>
                Read: {note.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
