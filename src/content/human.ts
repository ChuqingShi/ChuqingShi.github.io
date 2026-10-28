import type { Fillable } from './types'

// Content for The Human Side. Only facts from plan.md are written out;
// everything personal beyond that is a placeholder for Chuqing to fill in.

export const intro: Fillable = {
  placeholder:
    'A few sentences about yourself in your own voice: what you care about, and what you would like a visitor to know about you.',
}

export const pathSteps: { title: string; text: string }[] = [
  {
    title: 'Mathematics',
    text: 'A PhD in Mathematics at UC San Diego, finished in December 2024.',
  },
  {
    title: 'Data science',
    text: 'Applied machine learning, financial ML research and model evaluation.',
  },
  {
    title: 'AI engineering',
    text: 'Retrieval-augmented generation, agents, and apps that people can actually use.',
  },
]

export const pathStory: Fillable = {
  placeholder: 'What connects the three steps for you? One short paragraph.',
}

export const motivation: Fillable = {
  placeholder: 'What motivates you to learn, experiment and build?',
}

export type Interest = {
  id: string
  title: string
  /** One short factual line, if there is one. */
  detail?: string
  story: Fillable
  /** Path to a photo in /public, once Chuqing adds one. */
  photo?: { src: string; alt: string }
}

export const interests: Interest[] = [
  {
    id: 'triathlon',
    title: 'Triathlon',
    detail: 'Swimming, biking and running.',
    story: { placeholder: 'How you got into triathlon, or a race you remember.' },
  },
  {
    id: 'volleyball',
    title: 'Volleyball',
    detail: 'Haikyu!! included.',
    story: { placeholder: 'What you love about volleyball, on the court or on screen.' },
  },
  {
    id: 'travel',
    title: 'Travel',
    story: { placeholder: 'A favorite place, or the next one on your list.' },
  },
  {
    id: 'cat',
    title: 'My cat',
    story: { placeholder: "Your cat's name and one thing about them." },
  },
]
