import ContactLinks from '../components/ContactLinks'
import FillableText from '../components/FillableText'
import { interests, intro, motivation, pathSteps, pathStory } from '../content/human'
import { usePageTitle } from '../hooks/usePageTitle'
import './HumanSidePage.css'

// Page 3: the person behind the projects.

export default function HumanSidePage() {
  usePageTitle('The human side')

  return (
    <div className="container">
      <div className="page-intro">
        <h1>The human side</h1>
        <p className="lead">
          Hi, I'm Chuqing. This page is about the person behind the projects: where I come from,
          what keeps me going, and what I do away from the desk.
        </p>
        <FillableText value={intro} />
      </div>

      <section className="section human-section" aria-labelledby="path-heading">
        <h2 id="path-heading">My path</h2>
        <ol className="path">
          {pathSteps.map((step) => (
            <li key={step.title} className="path__step">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <FillableText value={pathStory} />
      </section>

      <section className="section human-section" aria-labelledby="motivation-heading">
        <h2 id="motivation-heading">What keeps me building</h2>
        <FillableText value={motivation} />
      </section>

      <section className="section human-section" aria-labelledby="interests-heading">
        <h2 id="interests-heading">Away from the desk</h2>
        <ul className="interests">
          {interests.map((interest) => (
            <li key={interest.id} className="interest">
              {interest.photo ? (
                <img
                  className="interest__photo"
                  src={interest.photo.src}
                  alt={interest.photo.alt}
                  loading="lazy"
                />
              ) : (
                <div className="interest__photo interest__photo--empty" role="note">
                  Photo to add
                </div>
              )}
              <h3>{interest.title}</h3>
              {interest.detail && <p className="muted">{interest.detail}</p>}
              <FillableText value={interest.story} />
            </li>
          ))}
        </ul>
      </section>

      <section className="section human-section" aria-labelledby="hello-heading">
        <h2 id="hello-heading">Say hello</h2>
        <p className="lead">Find me on LinkedIn or GitHub, or send me an email.</p>
        <ContactLinks className="contact-links--large" />
      </section>
    </div>
  )
}
