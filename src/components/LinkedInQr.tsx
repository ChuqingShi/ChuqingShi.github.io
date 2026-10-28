import { useMemo } from 'react'
import { profile } from '../content/profile'
import { buildQrDrawing } from '../lib/qr'
import './LinkedInQr.css'

// A scannable QR code for Chuqing's LinkedIn, next to a normal link.
//
// The code is generated from the same `profile.linkedinUrl` the link uses, so
// the two can never disagree. `useMemo` remembers the drawing between
// renders: the encoding only needs to run again if the URL changes.

export default function LinkedInQr() {
  const drawing = useMemo(() => buildQrDrawing(profile.linkedinUrl), [])

  return (
    <aside className="linkedin-qr" aria-labelledby="linkedin-qr-heading">
      <svg
        className="linkedin-qr__code"
        viewBox={`0 0 ${drawing.viewBoxSize} ${drawing.viewBoxSize}`}
        role="img"
        aria-label="QR code that opens Chuqing's LinkedIn profile"
        shapeRendering="crispEdges"
      >
        {/* QR codes must stay dark-on-light to scan, even in dark mode. */}
        <rect width="100%" height="100%" fill="#ffffff" />
        <path d={drawing.path} fill="#17212b" />
      </svg>
      <div>
        <h2 id="linkedin-qr-heading" className="linkedin-qr__heading">
          Let's connect on LinkedIn
        </h2>
        <p className="linkedin-qr__text">Scan the code with your phone, or</p>
        <a href={profile.linkedinUrl}>open my LinkedIn profile</a>
      </div>
    </aside>
  )
}
