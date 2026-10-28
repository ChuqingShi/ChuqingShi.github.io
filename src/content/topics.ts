import type { NoteType, Topic } from './types'

// Topic folders for "What's on My Mind", in the order listed in plan.md.
// A note's `topic` (and optional `subtopic`) must match an id here; the unit
// tests in src/content/content.test.ts fail if one does not.

export const topics: Topic[] = [
  {
    id: 'tech-stack',
    label: 'Tech Stack',
    description: 'The tools behind the work, starting with the ones this site is built from.',
    subtopics: [
      { id: 'react-typescript', label: 'React & TypeScript' },
      { id: 'git', label: 'Git' },
      { id: 'sql', label: 'SQL' },
      { id: 'docker', label: 'Docker' },
    ],
  },
  { id: 'leetcode', label: 'LeetCode', description: 'Problems worked through, and the patterns behind them.' },
  {
    id: 'quant-finance-probability',
    label: 'Quant, Finance & Probability',
    description: 'Markets, risk, and the probability underneath them.',
  },
  { id: 'ml-algorithms', label: 'ML & Algorithms', description: 'Models and algorithms, from first principles to practice.' },
  { id: 'ds-statistics', label: 'DS & Statistics', description: 'Data science methods and the statistics that keep them honest.' },
  {
    id: 'llms-ai-agents',
    label: 'LLMs, AI & Agents',
    description: 'Retrieval, embeddings, agents and evaluation.',
  },
  { id: 'computer-vision', label: 'Computer Vision', description: 'Images, video, and models that work with them.' },
  {
    id: 'mathematics-research',
    label: 'Mathematics & Research',
    description: 'Mathematics, research, and the habits of mind they build.',
  },
]

/** Labels for the three content types in plan.md. */
export const noteTypeLabels: Record<NoteType, string> = {
  'study-note': 'Study note',
  'deep-dive': 'Technical deep dive',
  reflection: 'Reflection',
}

export function findTopic(id: string): Topic | undefined {
  return topics.find((topic) => topic.id === id)
}
