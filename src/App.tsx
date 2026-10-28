import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import HumanSidePage from './pages/HumanSidePage'
import JourneyPage from './pages/JourneyPage'
import MindPage from './pages/MindPage'
import NotFoundPage from './pages/NotFoundPage'
import TopicPage from './pages/TopicPage'
import TopicsPage from './pages/TopicsPage'

// Note pages need the Markdown renderer, the largest part of the code. `lazy`
// splits them into a separate file that is only downloaded when a visitor
// opens a note, so the landing page loads faster.
const NotePage = lazy(() => import('./pages/NotePage'))

// The site map: which URL shows which page.
//
// HashRouter keeps the route after a "#" (e.g. chuqingshi.github.io/#/mind),
// because GitHub Pages can only serve files that exist. See learning/04-routing.md.
export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Every page renders inside Layout (header, footer, skip link). */}
        <Route element={<Layout />}>
          <Route index element={<JourneyPage />} />
          <Route path="mind" element={<MindPage />} />
          <Route path="mind/topics" element={<TopicsPage />} />
          <Route path="mind/topics/:topicId" element={<TopicPage />} />
          <Route
            path="mind/notes/:slug"
            element={
              <Suspense fallback={<p className="container page-intro muted">Loading the note…</p>}>
                <NotePage />
              </Suspense>
            }
          />
          <Route path="about" element={<HumanSidePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
