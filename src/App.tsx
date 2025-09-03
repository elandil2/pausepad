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