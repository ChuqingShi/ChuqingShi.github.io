# CLAUDE.md — Personal Website Engineering & Learning Guide

## Mission and source of truth

Build and maintain my personal website as **both a professional portfolio and a hands-on frontend learning project**. Read `plan.md` before planning or changing the site. Treat it as the source of truth for product goals, pages, content, priorities, and roadmap. This file defines **how** to work; `plan.md` defines **what** to build. If the two conflict, explain the conflict in the build log and follow `plan.md` for product requirements, while preserving the safety rules here.

My website should complement, not duplicate, LinkedIn and GitHub: visitors should experience projects, follow my evolving thinking, and get to know the person behind the work.

## My background and teaching preferences

- I have a PhD in Mathematics and substantial Python/data science experience.
- I am learning JavaScript, TypeScript, React, CSS, and frontend engineering. Do not assume familiarity with browser or Node.js concepts.
- Favor **simple, readable, maintainable code** over clever abstractions or unnecessary dependencies.
- Teach through this repository's actual code, not generic tutorials. Use Python comparisons where they clarify an idea, but explain differences accurately.
- I want to wake up to a working, reviewable increment **and** understand how it was built.

## Technical defaults

- Frontend: React + TypeScript + Vite.
- Styling: straightforward CSS (or existing project styling); avoid adding a UI framework without a concrete need.
- Hosting target: GitHub Pages, with GitHub Actions deployment workflow prepared for review.
- Routing: prefer `HashRouter` for uncomplicated GitHub Pages compatibility, unless the existing codebase has a verified alternative.
- Notes: Markdown first. Add MDX or Notion integration only if justified by the plan and current phase.
- GitHub Pages is static hosting. Do not assume it can run Python/FastAPI, PostgreSQL, or private server-side LLM inference. Link to separately hosted services when necessary.
- Keep dependencies minimal and document why each nontrivial one is introduced.

## Product priorities: Phase 1

Implement Phase 1 from `plan.md` before optional polish or advanced features. In particular:

1. **My Journey**: recruiter-friendly landing page, interactive chronological timeline, project cards, a prominent “Jump to Projects” link, and a LinkedIn QR code with a clickable text link.
2. **What's on My Mind**: **both** a reverse-chronological feed of notes/posts **and** topic-based browsing. Preserve the topic categories in `plan.md` and make new notes easy to add.
3. **The Human Side**: warm, concise personal introduction and interests without inventing autobiographical details.
4. Responsive navigation, keyboard accessibility, reasonable performance, and functioning local build.

Never invent personal achievements, dates, photos, project outcomes, working demo URLs, email addresses, or LinkedIn profile URLs. Use clearly labeled placeholders and record what needs my input. A QR code must encode the verified public LinkedIn URL; until supplied, use a visible placeholder rather than a fake QR code. Do not imply local-only projects are live deployments.

## Autonomous work protocol

For an unattended or overnight session:

1. Inspect repository status, existing files, package scripts, and `plan.md` before making changes.
2. Write a concise prioritized checklist in `learning/build-log.md` (or update the existing checklist).
3. Work in small, coherent milestones; implement, run checks, fix issues, and commit when a milestone is stable.
4. Prefer reversible choices and continue past noncritical blockers by documenting them.
5. Stop at actions requiring authorization; do not evade permissions or claim to have completed blocked work.
6. Finish with a clear handoff in `learning/00-start-here.md` and a summary of verified results.

**Unattended does not mean unrestricted.** Never use `--dangerously-skip-permissions`, disable safety checks, expose credentials, or attempt to bypass approval prompts. Do not push, publish/deploy, change repository visibility, configure paid services, or modify external accounts without explicit authorization. Do not delete user work, rewrite shared history, force-push, or overwrite important files without approval. Prefer a dedicated feature branch when practical; if a branch cannot be created, document the reason and avoid risky Git operations. If approvals, rate limits, sleep, or session termination interrupt work, leave the repository in a recoverable state.

## Engineering quality bar

- Use clear component boundaries and descriptive names; avoid unnecessary global state.
- Keep data/content separate from rendering components where practical.
- Make interactions genuinely functional, not decorative.
- Use semantic HTML, accessible labels, keyboard support, and visible focus states.
- Design mobile-first and respect reduced-motion preferences for animation.
- Handle missing data, broken links, and unavailable demos gracefully.
- Keep secrets out of source code and browser bundles.
- Run the available lint, typecheck, tests, and production build; add reasonable scripts if missing. Report exactly which checks ran and their results. Do not claim success without verification.
- Add focused tests for meaningful logic where practical; avoid building a large testing framework solely for a first MVP.

## Learning deliverables (required)

Maintain a `learning/` directory. Keep documents concise, cumulative, and tied to real files:

- `00-start-here.md`: morning handoff, what changed, how to run it, where to look first, and a 30–60 minute review route.
- `01-architecture.md`: app entry point, folder structure, data flow, and why the architecture fits GitHub Pages.
- `02-react-components.md`: components, props, state, hooks, and one real interaction traced through the code.
- `03-typescript.md`: types/interfaces and JS/TS syntax used here, with helpful Python analogies.
- `04-routing.md`: navigation, routes, and GitHub Pages implications.
- `05-styling.md`: CSS layout, responsiveness, and accessibility choices.
- `06-content.md`: how Markdown notes, dates, tags, topic folders, and chronological feed work.
- `07-deployment.md`: build output, GitHub Actions, GitHub Pages setup, and what still requires approval.
- `build-log.md`: chronological implementation notes, decisions, commands/check results, known issues, and blockers.

For each teaching document, include:

1. **Concept** — beginner-friendly explanation.
2. **Why here** — why this website needs it.
3. **Find it in code** — actual file paths and important symbols (verify paths exist).
4. **Try it yourself** — a small safe change I can make.
5. **Verify** — expected result and the command or browser action to check it.

Explain consequential choices and surprising bugs; do not narrate every trivial line. If a topic is not yet implemented, mark it “Not implemented yet” rather than inventing code references.

## Morning review: optimize for learning

The handoff should let me:

1. Run the website locally and explore all three pages (~10 min).
2. Understand the architecture and entry point (~15 min).
3. Trace one interactive feature (for example, timeline expansion using React state) (~15 min).
4. Make one small change myself (add a milestone or note, or adjust styling) (~15 min).
5. Rebuild, verify, and commit my change (~5 min).

Prefer **one high-value concept per review session** over overwhelming me with everything. Point out which files I should read first and why.

## Completion and handoff format

At the end of a session, report:

- **Implemented:** concrete features and relevant files.
- **Verified:** exact commands/tests run and results; local preview instructions.
- **Decisions:** key tradeoffs, dependencies, and reasons.
- **Needs my input/approval:** URLs, assets, content, deployment, permissions, or external services.
- **Known issues / next steps:** prioritize clearly.
- **Learn tomorrow:** one recommended concept and one hands-on exercise.

A successful session leaves code that works **and that I can eventually explain and maintain myself**. Do not sacrifice clarity merely to finish more features overnight.
