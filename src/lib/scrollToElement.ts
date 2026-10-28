// Scroll to an element on the current page and move keyboard focus to it.
//
// Why not a normal `<a href="#projects">` link? With HashRouter, everything
// after "#" is the route, so that link would navigate to a page called
// "projects" (and show "Page not found"). See learning/04-routing.md.

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToElement(id: string): void {
  const target = document.getElementById(id)
  if (target === null) return

  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })

  // Move focus too, so keyboard and screen-reader users continue from there.
  // The target needs tabIndex={-1} to be focusable without joining the Tab order.
  target.focus({ preventScroll: true })
}
