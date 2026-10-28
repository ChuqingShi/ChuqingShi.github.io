# Personal Website — Development Plan

## Vision

Build a personal website that is an **interactive record of my journey from mathematics to data science to AI**, rather than another resume, LinkedIn profile, or GitHub project index.

- **LinkedIn:** Where people discover my professional updates and connect with me.
- **GitHub:** Where people inspect my code and technical implementation.
- **My website:** Where people *experience* my projects, follow my thinking and current work, and get to know the person behind the work.

**Primary goal:** Support my current job search by demonstrating technical ability, problem-solving, growth, and personality, while creating a website that remains useful beyond job hunting.

## Site Structure

### 1. My Journey — Landing Page

**Purpose:** Invite visitors to follow my evolving path since earning my PhD in Mathematics in December 2024.

**Design and interactions:**

- A vertical, scroll-driven, interactive timeline.
- An opening invitation such as “Come along for the journey” or “From theory to things that work.”
- Expandable milestone cards with dates, short stories, and relevant achievements.
- Links to live project demos, interactive playgrounds, GitHub repositories, and technical case studies.
- A “Jump to Projects” shortcut for recruiters.
- A LinkedIn QR code near the introduction or timeline, alongside a clickable LinkedIn profile link.
- A closing “To be continued…” section featuring current experiments and future directions.

**Potential milestones:**

- December 2024 — PhD in Mathematics, UC San Diego.
- Transition into data science and applied machine learning.
- Financial ML research and model evaluation experiments.
- LyricLens — Semantic music recommendation system.
- Hackathons — CaseBoard and Group Map Share.
- AI agents and ongoing engineering projects.

**Project card information:**

- Date and title.
- Problem or motivation.
- Technical approach and outcomes.
- Technologies used.
- Project status: Live, Local, In Development, or Experimental.
- Relevant demo, repository, or article link.

Exact dates and project ordering should be verified before publishing.

### 2. What’s on My Mind — Knowledge Garden

**Purpose:** Organize technical study notes, experiments, insights, and longer reflections, while documenting my development over time.

**Initial topic folders:**

- Tech Stack (subtopics such as React & TypeScript, Git, SQL, and Docker)
- LeetCode
- Quant, Finance & Probability
- ML & Algorithms
- DS & Statistics
- LLMs, AI & Agents
- Computer Vision
- Mathematics & Research

**Two complementary browsing views:**

- **Chronological feed (default):** Display all published notes and posts in reverse chronological order, with dates and topic tags, so visitors can follow my learning and development over time.
- **Topic folders:** Let visitors browse notes by subject, with subtopics where useful.

**Visitor experience:**

1. Browse the chronological feed or choose a topic folder.
2. Filter or select a note or reflection.
3. Open the full article.
4. Explore related notes, code examples, diagrams, and projects.

**Content types:**

- **Study Notes:** Explanations and references for concepts I’m learning.
- **Technical Deep Dives:** Experiments, implementation choices, and technical findings.
- **Reflections:** Thoughts on research, career transitions, learning, uncertainty, and growth.

**Publishing strategy:**

- Start with Markdown or MDX pages stored in GitHub, with dates, titles, and topic metadata.
- Optionally link to public Notion pages.
- Later, consider using Notion as a content source while rendering notes directly on the website; synchronize or export content at build time rather than exposing private integration credentials in the browser.
- Add search and richer filtering as content grows.
- Keep private notes separate from published content.

### 3. The Human Side — About Me

**Purpose:** Introduce the person behind the technical projects, without duplicating a resume or writing a generic cover letter.

**Content:**

- A concise personal introduction.
- My path from mathematical research to data science and AI engineering.
- What motivates me to learn, experiment, and build.
- Interests outside work, including triathlon (swimming, biking, running), volleyball (including *Haikyu!!*), travel, and my cat.
- Selected personal photos or stories.
- Ways to connect through LinkedIn, GitHub, and email.

**Tone:** Warm, authentic, curious, and conversational.

Share personal details selectively and avoid turning the page into an exhaustive autobiography.

## Cross-Page Connections

Each page should offer a different perspective on the same work.

**Example — LyricLens:**

- **My Journey:** Why I built it, what I achieved, and a link to the demo or repository.
- **What’s on My Mind:** Technical notes about embeddings, retrieval, vector databases, or reranking.
- **The Human Side:** My interests in music, creativity, and exploration.

## Technical Architecture

### Hosting — GitHub Pages

- Host the website for free through GitHub Pages (subject to GitHub's current usage limits and policies).
- Use a public repository named `username.github.io`, replacing `username` with my GitHub username.
- Publish at `https://username.github.io`.
- Configure GitHub Actions to build and deploy automatically on pushes to the main branch.
- Consider a custom domain later.

### Frontend

- React
- TypeScript
- Vite
- React Router with `HashRouter` for straightforward GitHub Pages compatibility; reconsider routing if clean URLs become important.
- Responsive layout and reusable components.

### Content Management

- Markdown/MDX for notes and articles.
- Optional Notion integration later.
- Static content generated at build time.
- Store publication dates and topic metadata to support both the chronological feed and topic folders.

### Project Playground Hosting

GitHub Pages supports browser-based interactive applications but not persistent server-side services.

- Browser-only demos can run directly on the website.
- Backend-dependent projects such as FastAPI applications or database-backed tools require separate hosting.
- Link to external live demos where appropriate.
- Never expose API keys or private credentials in frontend code.
- Provide clear status indicators and fallbacks for unavailable demos.

### Quality Requirements

- Mobile-friendly and accessible.
- Fast-loading, with subtle animations and reduced-motion support.
- Keyboard-accessible interactions.
- SEO metadata and social sharing previews.
- Reliable project and contact links.
- No requirement to publish a resume PDF.

## Development Roadmap

### Phase 1 — Minimum Viable Website

- [ ] Create the GitHub Pages repository.
- [ ] Initialize React + TypeScript + Vite.
- [ ] Configure GitHub Actions deployment.
- [ ] Build the three-page navigation.
- [ ] Create the interactive journey timeline.
- [ ] Add verified milestones and 3–5 featured projects.
- [ ] Add a “Jump to Projects” shortcut.
- [ ] Add a LinkedIn QR code and clickable link (using my verified public profile URL).
- [ ] Build the knowledge garden with a chronological feed and topic folders.
- [ ] Publish 3–5 initial dated notes or reflections.
- [ ] Create The Human Side page.
- [ ] Add contact links.
- [ ] Test mobile responsiveness, accessibility, routing, and links.

### Phase 2 — Interactive Playground

- [ ] Add an interactive technical demonstration, such as an A/B testing simulator or ETF clustering explorer.
- [ ] Deploy or link a usable flagship project.
- [ ] Improve timeline animations and milestone interactions.
- [ ] Connect relevant projects to related technical notes.

### Phase 3 — Knowledge Garden Expansion

- [ ] Add full-text search and richer topic filtering.
- [ ] Add related-article navigation.
- [ ] Evaluate Notion-backed publishing.
- [ ] Expand experiments and demonstrations selectively.

## Success Criteria

Visitors should be able to:

1. Understand my professional direction within 10 seconds.
2. Find my strongest projects within one click.
3. Experience at least one project without installing anything once the playground phase is complete.
4. Read an example of my technical reasoning or personal reflection.
5. Understand something about my personality and know how to contact me.

## Guiding Principle

**LinkedIn is where people discover me. GitHub is where they inspect my code. My website is where they experience what I build, follow how I think, and get to know who I am.**
