import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ScrollManager } from './components/ScrollManager'
import Home from './pages/Home'

const CaseStudyPage = lazy(() => import('./pages/CaseStudy'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={<div className="min-h-[60dvh]" aria-hidden="true" />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects/:slug" element={<CaseStudyPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
