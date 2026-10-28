// The entry point. index.html loads this file; it loads everything else.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fonts are bundled with the site (no request to Google Fonts), so they load
// from the same server as everything else and visitors are not tracked.
// Only the Latin character set is loaded, which keeps the download small.
import '@fontsource/stix-two-text/latin-400.css'
import '@fontsource/stix-two-text/latin-400-italic.css'
import '@fontsource/stix-two-text/latin-500.css'
import '@fontsource/stix-two-text/latin-600.css'
import '@fontsource/atkinson-hyperlegible-next/latin-400.css'
import '@fontsource/atkinson-hyperlegible-next/latin-600.css'

import './styles/tokens.css'
import './styles/base.css'
import App from './App'

// Find <div id="root"> in index.html and let React take over everything inside it.
const rootElement = document.getElementById('root')
if (rootElement === null) throw new Error('index.html is missing <div id="root">')

createRoot(rootElement).render(
  // StrictMode runs extra checks in development (it renders components twice
  // to surface bugs). It has no effect on the production build.
  <StrictMode>
    <App />
  </StrictMode>,
)
