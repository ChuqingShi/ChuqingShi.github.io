import { useId, useState } from 'react'
import { findProject } from '../content/projects'
import { isPlaceholder, type Milestone } from '../content/types'
import { formatMonthRange } from '../lib/dates'
import { scrollToElement } from '../lib/scrollToElement'
import FillableText, { PlaceholderNote } from './FillableText'

// One point on the journey timeline: a date, a title and a short summary,
// with a button that expands the full story.

type MilestoneCardProps = {
  milestone: Milestone
  /** True once the visitor has scrolled this milestone past the reading line. */
  isReached: boolean
}

export default function MilestoneCard({ milestone, isReached }: MilestoneCardProps) {
  // Each card remembers for itself whether it is open. `useState(false)`
  // returns the current value and a function to change it; calling
  // setIsOpen makes React re-render this card (and only this card).
  const [isOpen, setIsOpen] = useState(false)

  // useId makes an id that is unique on the page, used to connect the
  // button to the panel it controls (aria-controls) for screen readers.
  const panelId = useId()
  const titleId = useId()

  const linkedProjects = (milestone.projectIds ?? []).flatMap((id) => {
    const project = findProject(id)
    return project ? [project] : []
  })

  return (
    <li className="milestone" data-reached={isReached}>
      <span className="milestone__dot" data-timeline-dot aria-hidden="true" />

      <article className="milestone__card" aria-labelledby={titleId}>
        <p className="milestone__date">
          {isPlaceholder(milestone.dates) ? (
            <span className="milestone__confirm">Date to add</span>
          ) : (
            <>
              <time dateTime={milestone.dates.start}>{formatMonthRange(milestone.dates)}</time>
              {milestone.dates.needsConfirming && (
                <span className="milestone__confirm">from GitHub activity, to confirm</span>
              )}
            </>
          )}
        </p>

        <h3 id={titleId} className="milestone__title">
          {milestone.title}
        </h3>
        <FillableText value={milestone.summary} className="milestone__summary" />

        <button
          type="button"
          className="milestone__toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="milestone__toggle-icon" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
          <span className="milestone__toggle-label">{isOpen ? 'Hide the story' : 'Read the story'}</span>
        </button>

        {/* `hidden` removes the panel from view and from screen readers. */}
        <div id={panelId} className="milestone__panel" hidden={!isOpen}>
          <FillableText value={milestone.story} />
          {isPlaceholder(milestone.dates) && <PlaceholderNote placeholder={milestone.dates} />}

          {milestone.highlights && milestone.highlights.length > 0 && (
            <ul className="milestone__highlights">
              {milestone.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}

          {(linkedProjects.length > 0 || (milestone.links?.length ?? 0) > 0) && (
            <ul className="milestone__links">
              {linkedProjects.map((project) => (
                <li key={project.id}>
                  <button
                    type="button"
                    className="text-button"
                    onClick={() => scrollToElement(`project-${project.id}`)}
                  >
                    See {project.title} in projects
                  </button>
                </li>
              ))}
              {milestone.links?.map((link) => (
                <li key={link.url}>
                  <a href={link.url}>{link.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </li>
  )
}
