// A tiny "front matter" reader for the Markdown notes.
//
// Each note starts with a metadata block between two `---` lines:
//
//   ---
//   title: Why this site's URLs have a # in them
//   date: 2026-10-27
//   tags: [routing, github-pages]
//   ---
//   The Markdown body starts here.
//
// Libraries like `gray-matter` parse full YAML, but they expect Node.js and
// add weight to the browser bundle. The notes only need four kinds of value,
// so this file reads exactly those, and nothing more:
//
//   key: some text          -> 'some text'
//   key: "quoted text"      -> 'quoted text'
//   key: [a, b, c]          -> ['a', 'b', 'c']
//   key: true / false       -> true / false

export type FrontmatterValue = string | string[] | boolean

export type ParsedMarkdown = {
  data: Record<string, FrontmatterValue>
  body: string
}

export class FrontmatterError extends Error {}

function stripQuotes(text: string): string {
  const quoted = /^(["'])(.*)\1$/.exec(text)
  return quoted ? quoted[2] : text
}

function parseValue(raw: string): FrontmatterValue {
  const text = raw.trim()
  if (text === 'true') return true
  if (text === 'false') return false
  if (text.startsWith('[') && text.endsWith(']')) {
    const inner = text.slice(1, -1).trim()
    if (inner === '') return []
    return inner.split(',').map((item) => stripQuotes(item.trim()))
  }
  return stripQuotes(text)
}

/**
 * Split a Markdown file into its metadata and its body.
 * Throws a FrontmatterError that names the problem line when something is off,
 * so a typo in a note fails loudly instead of silently dropping the note.
 */
export function parseFrontmatter(source: string): ParsedMarkdown {
  // Windows editors save "\r\n" line endings; treat them like "\n".
  const lines = source.replace(/\r\n/g, '\n').split('\n')

  if (lines[0]?.trim() !== '---') {
    throw new FrontmatterError('The file must start with a line containing only ---')
  }

  const closingIndex = lines.indexOf('---', 1)
  if (closingIndex === -1) {
    throw new FrontmatterError('The metadata block is never closed with a second --- line')
  }

  const data: Record<string, FrontmatterValue> = {}
  for (const [offset, line] of lines.slice(1, closingIndex).entries()) {
    if (line.trim() === '' || line.trimStart().startsWith('#')) continue
    const colon = line.indexOf(':')
    if (colon === -1) {
      throw new FrontmatterError(`Line ${offset + 2} has no "key: value" colon: ${line}`)
    }
    const key = line.slice(0, colon).trim()
    data[key] = parseValue(line.slice(colon + 1))
  }

  const body = lines
    .slice(closingIndex + 1)
    .join('\n')
    .trim()
  return { data, body }
}
