// Math for the scroll-driven timeline, kept separate from React so it can be
// unit tested without a browser.
//
// Picture a horizontal "reading line" across the screen, 60% of the way
// down. As you scroll, the timeline moves up past that line:
//
//   - `progress` is how much of the timeline is above the line (0 to 1).
//     The CSS uses it to draw the inked part of the timeline's spine.
//   - a milestone counts as "reached" once its dot is above the line.

/** Where the reading line sits, as a fraction of the viewport height. */
export const READING_LINE = 0.6

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/**
 * @param top      the timeline's top edge, in px from the top of the viewport
 *                 (negative once it has scrolled off the top)
 * @param height   the timeline's height in px
 * @param lineY    the reading line, in px from the top of the viewport
 */
export function timelineProgress(top: number, height: number, lineY: number): number {
  if (height <= 0) return 0
  return clamp((lineY - top) / height, 0, 1)
}

/** How many dots (given top-to-bottom) are at or above the reading line. */
export function countReached(dotTops: number[], lineY: number): number {
  return dotTops.filter((dotTop) => dotTop <= lineY).length
}
