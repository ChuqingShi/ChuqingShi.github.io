import type { Project } from './types'

// Featured projects, strongest first. The journey timeline links to these by id.
//
// Every fact below comes from the project's own public README or Git history
// (read on 2026-10-27). Dates come from first/last commit dates, so they are
// marked `needsConfirming` until Chuqing checks them. Anything that could not
// be verified is a `{ placeholder }`.

export const projects: Project[] = [
  {
    id: 'lyriclens',
    title: 'LyricLens',
    dates: { start: '2026-07', end: '2026-09', needsConfirming: true },
    tagline: 'Song recommendations from how you feel, matched on what the lyrics actually say.',
    problem:
      'Search a streaming app for "stressed" and you tend to get songs about heartbreak. LyricLens matches a described mood, situation or vibe against the meaning of song lyrics, rather than genre or keywords.',
    approach: [
      'Built a song catalog from Billboard Hot 100 charts (1958 to today), with lyrics from the LRCLIB API.',
      'Cleaned messy chart records: folded formatting differences, gave each (title, performer) pair a stable hashed ID, and re-engineered popularity so different chart eras compare fairly.',
      'Split lyrics along their natural sections (verse, chorus, bridge) instead of fixed-length chunks.',
      'Embedded chunks with all-MiniLM-L6-v2 through ONNX Runtime (no PyTorch) and searched them with pgvector.',
      'Reranked songs by a weighted mix of similarity and popularity; an LLM explains each match in its own words, without reproducing lyrics.',
    ],
    outcomes:
      'Three tagged releases (v0.1.0 to v0.2.1), a Streamlit app with thumbs-up/down feedback saved to Postgres, and demo videos in the repository.',
    tech: ['Python', 'PostgreSQL + pgvector', 'ONNX Runtime', 'OpenAI API', 'Streamlit', 'Docker'],
    status: 'local',
    statusNote: 'With Docker; demo videos are in the repository',
    links: [{ kind: 'repo', label: 'LyricLens on GitHub', url: 'https://github.com/ChuqingShi/LyricLens' }],
    relatedNotes: ['2026-10-27-why-lyriclens-chunks-by-section'],
  },
  {
    id: 'caseboard',
    title: 'CaseBoard',
    dates: { start: '2026-10', needsConfirming: true },
    tagline:
      'One live dashboard for a personal-injury case that shows each person only what they need. Built at the Law Di Gras 2026 Applied AI Hackathon.',
    problem:
      'A law firm, the medical providers and the client all work on the same case, but each needs different information, and some of it must never reach the others.',
    approach: [
      'Reads the case from Clio Manage (read-only) and stores it in SQLite.',
      'A rule-based digest pulls facts out of the case PDFs, each tied to the document and page it came from.',
      'Full-text search over every page, ranked with BM25 (SQLite FTS5).',
      "The server trims the record for each role with whitelists, so a provider's or client's browser never receives the full case.",
      'An assistant built on the Claude API answers questions, and falls back to keyword rules when no API key is set.',
    ],
    outcomes: {
      placeholder: 'What happened at the hackathon? Team, result or feedback, if you would like to share it.',
    },
    tech: ['Python', 'FastAPI', 'SQLite', 'Next.js', 'Claude API'],
    status: 'local',
    statusNote: 'A hackathon demo',
    links: [{ kind: 'repo', label: 'CaseBoard on GitHub', url: 'https://github.com/ChuqingShi/CaseBoard' }],
  },
  {
    id: 'groupz',
    title: 'Groupz (Group Map Share)',
    dates: { start: '2026-10', needsConfirming: true },
    tagline:
      'A shared, game-style live map: see where your group is, share a mood, and plant a flag to meet.',
    problem:
      'Agreeing where a group should meet usually means a long chat thread. Groupz puts everyone on one map with no account and no app to install: scan a QR code, allow location, and you are in.',
    approach: [
      'React, TypeScript and Vite client with MapLibre GL and a custom "game board" map style.',
      'Node.js WebSocket server that keeps rooms in memory; nothing is written to disk by default.',
      'Browser APIs for location, sound, speech and notifications.',
      'Random 128-bit room links, an optional host key, origin checks and flood limits.',
      'Tested with 35 end-to-end scenes in two phone-sized browser windows.',
    ],
    outcomes: 'Released as v1.0.0 and hosted on Render.',
    tech: ['React', 'TypeScript', 'Vite', 'MapLibre GL', 'Node.js', 'WebSockets', 'Playwright'],
    status: 'live',
    statusNote: "Hosted on Render's free plan, so it can take a moment to wake up",
    links: [
      { kind: 'demo', label: 'Open the Groupz app', url: 'https://group-map-share.onrender.com/' },
      { kind: 'repo', label: 'Groupz on GitHub', url: 'https://github.com/ChuqingShi/group-map-share' },
    ],
  },
]

/** Look up a project by id. Returns undefined if the id is unknown. */
export function findProject(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}
