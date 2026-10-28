import { profile } from '../content/profile'

// LinkedIn, GitHub and email, used in the footer and on The Human Side.
// The links come from src/content/profile.ts, so they are written down once.

type ContactLinksProps = {
  /** Extra class names for layout, e.g. "contact-links--large". */
  className?: string
}

export default function ContactLinks({ className = '' }: ContactLinksProps) {
  const links = [
    { label: 'LinkedIn', href: profile.linkedinUrl, detail: 'linkedin.com/in/chuqingshi' },
    { label: 'GitHub', href: profile.githubUrl, detail: 'github.com/ChuqingShi' },
    { label: 'Email', href: `mailto:${profile.email}`, detail: profile.email },
  ]

  return (
    <ul className={`contact-links ${className}`.trim()}>
      {links.map((link) => (
        <li key={link.label}>
          <a href={link.href}>
            <span className="contact-links__label">{link.label}</span>
            <span className="contact-links__detail">{link.detail}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
