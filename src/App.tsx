import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import { routes } from './routes'
import { theme } from './styles/theme'
import { trackPageView } from './utils/analytics'

// Sends a GA4 page_view for every route, including the first one, and resets scroll on navigation.
const RouteEffects: React.FC = () => {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
    // Let react-helmet update document.title first.
    const id = window.setTimeout(() => trackPageView(pathname + search), 100)
    return () => window.clearTimeout(id)
  }, [pathname, search, hash])

  return null
}

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <RouteEffects />
    <a className="skip-link" href="#main">
      Skip to content
    </a>
    <Header />
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
    <Footer />
    <Analytics />
    <SpeedInsights />
  </ThemeProvider>
)

export default App
