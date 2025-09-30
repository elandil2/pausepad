import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { initGA, trackPageView } from './utils/analytics'

// Import pages
import CleanTimer from './pages/CleanTimer'
import About from './pages/About'
import Blog from './pages/Blog'
import Privacy from './pages/Privacy'

// Import blog pages
import PomodoroTechniqueExplained from './pages/blog/PomodoroTechniqueExplained'
import BestStudyTimerApps from './pages/blog/BestStudyTimerApps'
import FocusTimerProductivity from './pages/blog/FocusTimerProductivity'
import TimeManagementPomodoro from './pages/blog/TimeManagementPomodoro'
import ConcentrationTimerTechniques from './pages/blog/ConcentrationTimerTechniques'
import WorkTimerBetterFocus from './pages/blog/WorkTimerBetterFocus'

// Import localized blog pages
import PomodoroTeknigiAciklama from './pages/blog/tr/PomodoroTeknigiAciklama'
import TecnicaPomodoroExplicada from './pages/blog/es/TecnicaPomodoroExplicada'
import PomodoroArabic from './pages/blog/ar/pomodoro-arabic-guide'
import PomodoroItalian from './pages/blog/it/tecnica-pomodoro-completa'
import PomodoroChinese from './pages/blog/zh/pomodoro-technique-guide'
import PomodoroHindi from './pages/blog/hi/pomodoro-ka-complete-guide'
import PomodoroUrdu from './pages/blog/ur/pomodoro-technique-urdu-guide'
import PomodoroRussian from './pages/blog/ru/pomodoro-tehnika-polnoe-rukovodstvo'

// Import layout components
import Header from './components/Layout/Header'

// Import theme context and global styles
import { ThemeProvider } from './contexts/ThemeContext'
import GlobalStyles from '@/styles/GlobalStyles'

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

// Component to track page views
const Analytics: React.FC = () => {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  return null
}

const App: React.FC = () => {
  useEffect(() => {
    // Initialize Google Analytics on mount
    initGA()
  }, [])

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <GlobalStyles />
          <Router>
            <Analytics />
            <div className="app">
              <Header />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Navigate to="/timer" replace />} />
                  <Route path="/timer" element={<CleanTimer />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/privacy" element={<Privacy />} />

                  {/* Blog Routes */}
                  <Route path="/blog/pomodoro-technique-explained" element={<PomodoroTechniqueExplained />} />
                  <Route path="/blog/best-study-timer-apps" element={<BestStudyTimerApps />} />
                  <Route path="/blog/focus-timer-productivity" element={<FocusTimerProductivity />} />
                  <Route path="/blog/time-management-pomodoro" element={<TimeManagementPomodoro />} />
                  <Route path="/blog/concentration-timer-techniques" element={<ConcentrationTimerTechniques />} />
                  <Route path="/blog/work-timer-better-focus" element={<WorkTimerBetterFocus />} />

                  {/* Localized Blog Routes */}
                  <Route path="/blog/tr/pomodoro-teknigi-aciklama" element={<PomodoroTeknigiAciklama />} />
                  <Route path="/blog/es/tecnica-pomodoro-explicada" element={<TecnicaPomodoroExplicada />} />
                  <Route path="/blog/ar/pomodoro-arabic-guide" element={<PomodoroArabic />} />
                  <Route path="/blog/it/tecnica-pomodoro-completa" element={<PomodoroItalian />} />
                  <Route path="/blog/zh/pomodoro-technique-guide" element={<PomodoroChinese />} />
                  <Route path="/blog/hi/pomodoro-ka-complete-guide" element={<PomodoroHindi />} />
                  <Route path="/blog/ur/pomodoro-technique-urdu-guide" element={<PomodoroUrdu />} />
                  <Route path="/blog/ru/pomodoro-tehnika-polnoe-rukovodstvo" element={<PomodoroRussian />} />
                </Routes>
              </AnimatePresence>
            </div>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App