import type { ComponentProps } from 'react'
import Markdown, { type Components } from 'react-markdown'
import { Link } from 'react-router'
import remarkGfm from 'remark-gfm'
import { scrollToElement } from '../lib/scrollToElement'
import './MarkdownBody.css'

// Renders a note's Markdown as React elements.
//
// react-markdown builds real React elements instead of pasting an HTML
// string into the page, so a note can never inject scripts. remark-gfm adds
// GitHub-style extras: tables, task lists, ~~strikethrough~~ and footnotes.

function MarkdownLink({ href = '', children }: ComponentProps<'a'>) {
  // "/mind/topics/git": a page on this site. Use the router's Link so the
  // click does not reload the whole site.
  if (href.startsWith('/')) return <Link to={href}>{children}</Link>

  // "#some-heading" (footnotes use these): with HashRouter, a real "#" link
  // would change the route, so scroll to the element instead.
  if (href.startsWith('#')) {
    const id = href.slice(1)
    return (
      <a
        href={href}
        onClick={(event) => {
          event.preventDefault()
          scrollToElement(id)
        }}
      >
        {children}
      </a>
    )
  }

  return <a href={href}>{children}</a>
}

const components: Components = {
  a: MarkdownLink,
  // The page title is the only <h1>; a "# Heading" inside a note becomes <h2>.
  h1: ({ children }) => <h2>{children}</h2>,
}

export default function MarkdownBody({ markdown }: { markdown: string }) {
  return (
    <div className="markdown">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </Markdown>
    </div>
  )
}
