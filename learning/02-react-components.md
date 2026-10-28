# 02 · React: components, props, state and hooks

## Concept

- A **component** is a function that returns what should appear on screen, written in JSX (HTML-like syntax inside TypeScript). `function StatusBadge(...) { return <span>…</span> }`.
- **Props** are a component's inputs, passed like HTML attributes: `<StatusBadge status="live" />`. Like keyword arguments to a Python function. A component never changes its own props.
- **State** is memory that belongs to a component and survives re-renders: `const [isOpen, setIsOpen] = useState(false)`. Calling `setIsOpen(true)` stores the new value *and* tells React to run the component function again, so the screen matches the new state.
- **Hooks** are the functions starting with `use` (`useState`, `useEffect`, `useRef`, `useMemo`, `useId`, and our own `useTimelineProgress`). They can only be called at the top level of a component, never inside an `if` or a loop, because React tells them apart by call order.

The mental model: **UI = f(props, state)**. You never reach into the page and change it by hand; you change state, and React redraws.

## Why here

The timeline cards open and close, the journey line fills as you scroll, and the note filters change what is listed. Each is a small piece of state with the screen derived from it.

## Find it in code

| File | What to look for |
| --- | --- |
| `src/components/StatusBadge.tsx` | The simplest component: one prop, no state. Start here. |
| `src/components/ProjectCard.tsx` | Props with a type (`ProjectCardProps`), lists rendered with `.map(...)` and a `key` |
| `src/components/MilestoneCard.tsx` | `useState` for open/closed, `useId` for accessible ids |
| `src/components/Timeline.tsx` | `useRef` to reach the real `<ol>` element; passes `isReached` down as a prop |
| `src/hooks/useTimelineProgress.ts` | A custom hook: `useEffect` with a cleanup function, `useState` for the reached count |
| `src/components/FillableText.tsx` | Returning different JSX depending on the data (real text vs placeholder) |
| `src/components/Layout.tsx` | `useEffect` that runs when the route changes |

### Trace one interaction: opening a milestone

1. `src/components/MilestoneCard.tsx` starts with `const [isOpen, setIsOpen] = useState(false)`. Every card has its own `isOpen`, so opening one never opens another.
2. The button has `onClick={() => setIsOpen(!isOpen)}`. Clicking it (or pressing Enter or Space, which buttons handle for free) flips the value.
3. React re-runs `MilestoneCard` with `isOpen === true`. Three things in the returned JSX depend on it:
   - `aria-expanded={isOpen}` tells screen readers the panel is now open;
   - the label switches from "Read the story" to "Hide the story", and the icon from `+` to `−`;
   - `hidden={!isOpen}` on the panel becomes `hidden={false}`, so the story appears.
4. `src/components/Timeline.css` has `.milestone__panel:not([hidden]) { animation: milestone-open … }`: the panel fades in, which shows what changed. People who turned on "reduce motion" in their OS settings skip this (see `src/styles/base.css`).
5. The card is now taller, so the timeline line would be measured wrong. `useTimelineProgress` watches the timeline's size with a `ResizeObserver` and re-measures.

### Two design decisions worth noticing

- **Not everything belongs in state.** `useTimelineProgress` stores the *reached count* in state (it changes a few times per page, and the cards must re-render). The *exact progress* changes on every scroll frame, so it is written straight into a CSS variable with `timeline.style.setProperty('--progress', …)`. Putting it in state would re-render every card 60 times a second.
- **A bug that only exists in development.** In `src/main.tsx`, `<StrictMode>` deliberately runs every effect twice in development to expose bugs. The first version of the focus effect in `Layout.tsx` used a "first render" flag, so the second run moved keyboard focus on the very first page load. The fix compares the current pathname with the previous one, which gives the same answer no matter how many times it runs. The general lesson: effects should be safe to run twice.

## Try it yourself

Make the first milestone start open. In `src/components/MilestoneCard.tsx`, add a prop `startOpen?: boolean` to `MilestoneCardProps`, use `useState(startOpen ?? false)`, and in `src/components/Timeline.tsx` pass `startOpen={index === 0}`.

## Verify

`npm run dev`, open the home page: the first card shows "Hide the story" and its story is visible; the others are closed. `npm run typecheck` passes (TypeScript checks the new prop). Undo the change if you prefer the original behavior.
