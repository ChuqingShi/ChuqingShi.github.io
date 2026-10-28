import { Link, NavLink } from 'react-router'
import { profile } from '../content/profile'
import './SiteHeader.css'

// The three pages from plan.md. Add a page here and in App.tsx.
const pages = [
  { to: '/', label: 'My Journey', end: true },
  { to: '/mind', label: "What's on My Mind", end: false },
  { to: '/about', label: 'The Human Side', end: false },
]

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__name">
          {profile.name}
        </Link>
        <nav aria-label="Main">
          <ul className="site-nav">
            {pages.map((page) => (
              <li key={page.to}>
                {/*
                  NavLink is a Link that knows whether it matches the current
                  URL. When it does, it sets aria-current="page", which screen
                  readers announce and the CSS uses to underline the link.
                  `end` makes "/" match only the home page, not every page.
                */}
                <NavLink to={page.to} end={page.end} className="site-nav__link">
                  {page.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
