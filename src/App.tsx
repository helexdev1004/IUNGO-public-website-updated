import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'

/* The home page ships in the main bundle — it is what most visitors land on.
   Everything else is split out and fetched on navigation. */
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const AiSolutions = lazy(() => import('@/pages/AiSolutions'))
const Technology = lazy(() => import('@/pages/Technology'))
const Projects = lazy(() => import('@/pages/Projects'))
const Team = lazy(() => import('@/pages/Team'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

/** Holds the viewport height while a route chunk loads, so nothing jumps. */
function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-label="Loading">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-brand-green" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<RouteFallback />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="services"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="ai-solutions"
            element={
              <Suspense fallback={<RouteFallback />}>
                <AiSolutions />
              </Suspense>
            }
          />
          <Route
            path="technology"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Technology />
              </Suspense>
            }
          />
          <Route
            path="projects"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Projects />
              </Suspense>
            }
          />
          <Route
            path="team"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Team />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
