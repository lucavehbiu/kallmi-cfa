import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Lazy-loaded landing page
const LandingPage = lazy(() => import('./components/LandingPage'))

// Simple loading component (we'll make it elegant)
const LoadingScreen = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-stone-900">
    <div className="text-stone-100 font-cormorant text-3xl tracking-[0.25em] animate-pulse">
      KALLMI ESTATE
    </div>
  </div>
)

const App: React.FC = () => {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/*" element={<LandingPage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Router>
  )
}

export default App