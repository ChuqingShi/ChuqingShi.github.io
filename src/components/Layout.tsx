import { useEffect, useRef, type MouseEvent } from 'react'
import { Outlet, useLocation } from 'react-router'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'
import './Layout.css'

// The frame around every page: skip link, header, the page itself, footer.
//
// <Outlet /> is where React Router puts the page that matches the current
// URL (see the nested <Route>s in App.tsx).
export default function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const previousPathname = useRef(pathname)

  // A single-page app never reloads, so the browser does not reset scroll or
  // focus when you change pages. Do it here: start each new page at the top,
  // and move keyboard/screen-reader focus to the main content.
  //
  // Comparing with the previous pathname (instead of a "first render" flag)
  // matters: in development, StrictMode runs every effect twice on purpose,
  // and a flag would make the second run steal focus on the very first load.
  useEffect(() => {
    if (previousPathname.current === pathname) return
    previousPathname.current = pathname
    window.scrollTo(0, 0)
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="layout">
      <a className="skip-link" href="#main" onClick={skipToMain}>
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" ref={mainRef} tabIndex={-1} className="layout__main">
        <Outlet />
      </main>
      <SiteFooter showContact={pathname !== '/about'} />
    </div>
  )
}

// With HashRouter, a plain link to "#main" would be treated as a route
// called "main". So the skip link moves focus itself and keeps the URL as is.
function skipToMain(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
  const main = document.getElementById('main')
  main?.focus()
  main?.scrollIntoView()
}
