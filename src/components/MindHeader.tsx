import { NavLink } from 'react-router'
import './MindHeader.css'

// Shared intro for the knowledge garden, with the switch between its two views.

export default function MindHeader() {
  return (
    <div className="page-intro">
      <h1>What's on my mind</h1>
      <p className="lead">
        Study notes, technical deep dives and reflections: a record of what I am learning and
        thinking about, kept as it grows.
      </p>
      <nav aria-label="Browse notes">
        <ul className="view-switch">
          <li>
            <NavLink to="/mind" end>
              Latest first
            </NavLink>
          </li>
          <li>
            <NavLink to="/mind/topics">By topic</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
