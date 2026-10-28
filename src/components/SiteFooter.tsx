import ContactLinks from './ContactLinks'
import './SiteFooter.css'

type SiteFooterProps = {
  /** The Human Side has its own "Say hello" section, so it hides these. */
  showContact: boolean
}

export default function SiteFooter({ showContact }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        {showContact && (
          <div>
            <h2 className="site-footer__heading">Get in touch</h2>
            <ContactLinks />
          </div>
        )}
        <p className="site-footer__built muted">
          Built with React, TypeScript and Vite.{' '}
          <a href="https://github.com/ChuqingShi/ChuqingShi.github.io">See how this site is made</a>.
        </p>
      </div>
    </footer>
  )
}
