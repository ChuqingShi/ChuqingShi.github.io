import { useRef } from 'react'
import type { Milestone } from '../content/types'
import { useTimelineProgress } from '../hooks/useTimelineProgress'
import MilestoneCard from './MilestoneCard'
import './Timeline.css'

// The journey as a vertical line. As you scroll, the line "inks in" and each
// milestone's dot fills when you reach it.

export default function Timeline({ milestones }: { milestones: Milestone[] }) {
  // A ref gives the hook direct access to the <ol> element in the page, so it
  // can measure where the timeline is on screen.
  const timelineRef = useRef<HTMLOListElement>(null)
  const reachedCount = useTimelineProgress(timelineRef)

  if (milestones.length === 0) {
    return <p className="muted">Milestones are on their way.</p>
  }

  return (
    // The line itself is drawn in Timeline.css (::before and ::after), so it
    // adds nothing for screen readers, which hear a plain ordered list.
    <ol className="timeline" ref={timelineRef}>
      {milestones.map((milestone, index) => (
        <MilestoneCard key={milestone.id} milestone={milestone} isReached={index < reachedCount} />
      ))}
    </ol>
  )
}
