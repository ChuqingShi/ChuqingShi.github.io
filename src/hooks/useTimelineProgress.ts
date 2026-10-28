import { useEffect, useState, type RefObject } from 'react'
import { countReached, READING_LINE, timelineProgress } from '../lib/scroll'

/**
 * Tracks how far the visitor has scrolled through the timeline.
 *
 * Returns how many milestones have been "reached" (React state, because the
 * cards change when it changes), and also writes the exact progress into a
 * CSS variable `--progress` on the timeline element. Progress changes on
 * every scroll frame, so it skips React entirely: re-rendering all the cards
 * 60 times a second just to move one line would be wasted work.
 *
 * A "hook" is a function whose name starts with `use` and that calls React's
 * own hooks (here useState and useEffect). It packages up behavior so a
 * component can use it in one line.
 */
export function useTimelineProgress(timelineRef: RefObject<HTMLElement | null>): number {
  const [reached, setReached] = useState(0)

  useEffect(() => {
    const timeline = timelineRef.current
    if (timeline === null) return

    let frame = 0

    function measure() {
      frame = 0
      if (timeline === null) return
      const lineY = window.innerHeight * READING_LINE
      const box = timeline.getBoundingClientRect()
      timeline.style.setProperty('--progress', String(timelineProgress(box.top, box.height, lineY)))

      const dots = timeline.querySelectorAll('[data-timeline-dot]')
      const dotTops = Array.from(dots, (dot) => dot.getBoundingClientRect().top)
      // React skips the re-render when the new value equals the old one.
      setReached(countReached(dotTops, lineY))
    }

    // Scroll events can fire many times per frame. requestAnimationFrame
    // batches them: measure at most once per frame, right before painting.
    function onScrollOrResize() {
      if (frame === 0) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    // Opening or closing a card changes the timeline's height without any
    // scrolling, so also re-measure whenever the timeline itself resizes.
    const resizeObserver = new ResizeObserver(onScrollOrResize)
    resizeObserver.observe(timeline)

    // The cleanup function runs when the component leaves the page, so the
    // listeners do not pile up (like closing a file in a `finally` block).
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      resizeObserver.disconnect()
      if (frame !== 0) cancelAnimationFrame(frame)
    }
  }, [timelineRef])

  return reached
}
