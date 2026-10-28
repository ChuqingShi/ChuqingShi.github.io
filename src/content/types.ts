// Shared shapes for the site's content.
//
// Content (what the site says) lives in src/content/; components (how it
// looks) live in src/components/ and src/pages/. These types are the contract
// between the two, so TypeScript can catch a typo in a project id or a
// missing field before the site is ever built.

/**
 * Text that Chuqing still needs to write.
 *
 * Any field typed `Fillable` holds either real text (a string) or a
 * placeholder object. Components render placeholders as a visible dashed
 * "To fill in" box, so nothing invented ever looks like real content.
 */
export type Placeholder = { placeholder: string }
export type Fillable = string | Placeholder

/**
 * Type guard: tells TypeScript whether a value is still a placeholder.
 * `T` is a type parameter (like Python's TypeVar), so the same function works
 * for placeholder text (`Fillable`) and placeholder dates (`MonthRange | Placeholder`).
 */
export function isPlaceholder<T extends object | string>(value: T | Placeholder): value is Placeholder {
  return typeof value === 'object' && 'placeholder' in value
}

/** A link shown on a card. `kind` decides the wording and icon. */
export type LinkKind = 'demo' | 'repo' | 'article' | 'video'

export type ExternalLink = {
  kind: LinkKind
  label: string
  url: string
}

/** The four statuses from plan.md, in the order they are explained on the page. */
export type ProjectStatus = 'live' | 'local' | 'in-development' | 'experimental'

/**
 * A month-precision date range. Dates are strings like "2024-12" so they sort
 * correctly as plain text and never shift with the reader's time zone.
 */
export type MonthRange = {
  start: string
  end?: string
  /** Shown next to the date when it came from GitHub activity, not from Chuqing. */
  needsConfirming?: boolean
}

export type Project = {
  id: string
  title: string
  dates: MonthRange
  /** One line under the title. */
  tagline: string
  /** Problem or motivation. */
  problem: Fillable
  /** Technical approach, a few short points. */
  approach: string[]
  /** Outcomes Chuqing can point to. Never invented: placeholder until supplied. */
  outcomes: Fillable
  tech: string[]
  status: ProjectStatus
  /** Why the status is what it is, in a few words (e.g. "Runs locally with Docker"). */
  statusNote?: string
  links: ExternalLink[]
  /** Slugs of notes in the knowledge garden that discuss this project. */
  relatedNotes?: string[]
}

export type Milestone = {
  id: string
  /** A placeholder when the dates are not known yet; the card says so. */
  dates: MonthRange | Placeholder
  title: string
  /** Shown while the card is collapsed. */
  summary: Fillable
  /** Shown when the card is expanded. */
  story: Fillable
  highlights?: string[]
  /** Projects to link from this milestone. Must match an id in projects.ts. */
  projectIds?: string[]
  /** Other links (e.g. course repos) that are not featured projects. */
  links?: ExternalLink[]
}

export type Topic = {
  id: string
  label: string
  description: string
  subtopics?: { id: string; label: string }[]
}

export type NoteType = 'study-note' | 'deep-dive' | 'reflection'

/** A note after its Markdown file has been read and its metadata checked. */
export type Note = {
  slug: string
  title: string
  /** Full date, "YYYY-MM-DD". */
  date: string
  type: NoteType
  topic: string
  subtopic?: string
  tags: string[]
  summary: string
  /** Drafts show up in local development only, never in the production build. */
  draft: boolean
  /** Project ids this note relates to. */
  projects: string[]
  /** The Markdown body, without the metadata block. */
  body: string
}
