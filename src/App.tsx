import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'

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

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <GlobalStyles />
          <Router>
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