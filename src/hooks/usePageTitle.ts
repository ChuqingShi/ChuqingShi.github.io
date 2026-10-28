import { useEffect } from 'react'
import { profile } from '../content/profile'

/**
 * Sets the browser tab's title for the current page.
 * index.html only has one <title>, so each page updates it when it appears.
 */
export function usePageTitle(pageTitle?: string) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${profile.name}` : `${profile.name} | ${profile.headline}`
  }, [pageTitle])
}
