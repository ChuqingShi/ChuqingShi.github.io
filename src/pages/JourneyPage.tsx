import { Link } from 'react-router'
import FillableText from '../components/FillableText'
import LinkedInQr from '../components/LinkedInQr'
import ProjectCard from '../components/ProjectCard'
import Timeline from '../components/Timeline'
import { currentWork, milestones } from '../content/journey'
import { notes } from '../content/loadNotes'
import { projects } from '../content/projects'
import { usePageTitle } from '../hooks/usePageTitle'
import { scrollToElement } from '../lib/scrollToElement'
import './JourneyPage.css'

// Page 1, the landing page: who Chuqing is (in ten seconds), the journey
// timeline, featured projects, and what comes next.

export default function JourneyPage() {
  usePageTitle()

  return (
    <>
      <section className="container hero" aria-labelledby="hero-heading">
        <div className="hero__text">
          <h1 id="hero-heading">From theory to things that work.</h1>
          <p className="lead">
            I'm Chuqing Shi. I finished my PhD in Mathematics at UC San Diego in December 2024, and
            since then I've been building with data science and AI: retrieval-augmented
            recommenders, live web apps and hackathon prototypes. Come along for the journey.
          </p>
          <FillableText
            value={{ placeholder: 'One line for recruiters: the kind of role you are looking for.' }}
          />
          <div className="hero__actions">
            {/* A button, not an <a href="#projects">: see src/lib/scrollToElement.ts */}
            <button type="button" className="button" onClick={() => scrollToElement('projects')}>
              Jump to projects
            </button>
            <Link to="/mind" className="button button--quiet">
              See what's on my mind
            </Link>
          </div>
        </div>
        <LinkedInQr />
      </section>

      <section className="journey-graph" aria-labelledby="journey-heading">
        <div className="container section">
          <h2 id="journey-heading">The journey so far</h2>
          <p className="muted journey__intro">
            Oldest first. Open any milestone for the story behind it.
          </p>
          <Timeline milestones={milestones} />
        </div>
      </section>

      <section className="container section" aria-labelledby="projects">
        <h2 id="projects" tabIndex={-1} className="projects__heading">
          Featured projects
        </h2>
        <p className="muted projects__intro">
          Projects marked live open in your browser. The others run locally; each repository explains
          how to run it.
        </p>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            notes={notes.filter((note) => project.relatedNotes?.includes(note.slug))}
          />
        ))}
      </section>

      <section className="continued" aria-labelledby="continued-heading">
        <div className="container section">
          <h2 id="continued-heading">To be continued…</h2>
          <ul className="continued__list">
            {currentWork.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <FillableText value={item.description} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
