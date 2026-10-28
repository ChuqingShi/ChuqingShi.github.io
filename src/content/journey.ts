import type { Fillable, Milestone } from './types'

// The journey timeline, oldest first (the page reads top to bottom like a story).
//
// To add a milestone: copy one object, give it a unique `id`, and put it in
// date order. The unit test in src/content/content.test.ts checks the order
// and that every `projectIds` entry exists in projects.ts.
//
// plan.md: "Exact dates and project ordering should be verified before
// publishing." Dates taken from GitHub activity are marked `needsConfirming`.

export const milestones: Milestone[] = [
  {
    id: 'phd',
    dates: { start: '2024-12' },
    title: 'PhD in Mathematics, UC San Diego',
    summary: 'Where the journey starts: years of proofs, research and careful reasoning.',
    story: {
      placeholder:
        'Your research area in a sentence or two, and the habit from mathematical research you rely on most today.',
    },
  },
  {
    id: 'into-data-science',
    dates: { start: '2025-01', end: '2025-04', needsConfirming: true },
    title: 'Into data science and applied machine learning',
    summary: 'Working through deep learning and machine learning material in public on GitHub.',
    story: {
      placeholder:
        'Why you moved from research toward data science, and what the first months of learning looked like.',
    },
    highlights: [
      'Public GitHub repositories from this period include forks of MIT Intro to Deep Learning and the fastai book, plus machine learning exercises.',
    ],
    links: [
      {
        kind: 'repo',
        label: 'Machine learning exercises',
        url: 'https://github.com/ChuqingShi/machine_learning_exercises',
      },
    ],
  },
  {
    id: 'financial-ml',
    dates: { placeholder: 'Add the dates of this research' },
    title: 'Financial ML research and model evaluation',
    summary: {
      placeholder: 'One line on the financial ML research and what you evaluated.',
    },
    story: {
      placeholder:
        'The question you were investigating, the models or methods you compared, and what you found. Add exact dates.',
    },
  },
  {
    id: 'llm-zoomcamp',
    dates: { start: '2026-06', end: '2026-07', needsConfirming: true },
    title: 'LLM Zoomcamp: retrieval, agents and evaluation',
    summary:
      'Course projects on retrieval-augmented generation: keyword search, vector search, agents and evaluation.',
    story: {
      placeholder: 'What you wanted from the course and the idea that stuck with you most.',
    },
    highlights: [
      'Built a simple RAG pipeline with keyword search, then made it agentic.',
      'Separate repositories for vector search and for evaluation.',
    ],
    links: [
      {
        kind: 'repo',
        label: 'Agentic RAG',
        url: 'https://github.com/ChuqingShi/LLM-zoomcamp-agentic-RAG',
      },
      {
        kind: 'repo',
        label: 'Vector search',
        url: 'https://github.com/ChuqingShi/LLM-zoomcamp-vectorsearch',
      },
      {
        kind: 'repo',
        label: 'Evaluation',
        url: 'https://github.com/ChuqingShi/LLM-zoomcamp-evaluation',
      },
    ],
  },
  {
    id: 'lyriclens',
    dates: { start: '2026-07', end: '2026-09', needsConfirming: true },
    title: 'LyricLens: semantic music recommendations',
    summary:
      'A song recommender that matches how you feel against what lyrics actually say, using retrieval-augmented generation.',
    story: {
      placeholder: 'Why you built it, the hardest problem along the way, and what you would do differently.',
    },
    projectIds: ['lyriclens'],
  },
  {
    id: 'hackathons',
    dates: { start: '2026-10', needsConfirming: true },
    title: 'Hackathons: CaseBoard and Groupz',
    summary: 'Two builds in one month: a role-aware legal case dashboard and a live group map.',
    story: {
      placeholder:
        'What the hackathons were like, who you built with, and what you took away from building fast.',
    },
    highlights: ['CaseBoard was built at the Law Di Gras 2026 Applied AI Hackathon.'],
    projectIds: ['caseboard', 'groupz'],
  },
]

/** Shown in the closing "To be continued…" section. */
export const currentWork: { title: string; description: Fillable }[] = [
  {
    title: 'This website',
    description:
      'Learning React, TypeScript and frontend engineering by building the site you are reading, one reviewed change at a time.',
  },
  {
    title: 'AI agents and ongoing engineering projects',
    description: { placeholder: 'What you are building or exploring right now.' },
  },
  {
    title: 'A playground on this site',
    description:
      'Planned next: a project you can try right here in the browser, such as an A/B testing simulator or an ETF clustering explorer.',
  },
]
