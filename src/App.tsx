import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'

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
      <div className="min-h-screen w-full overflow-x-hidden">
        <Header />
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingScreen />}>
            <main className="w-full">
              <Routes>
                <Route path="/*" element={<LandingPage />} />
              </Routes>
            </main>
          </Suspense>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  )
}

export default App