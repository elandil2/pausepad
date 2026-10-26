import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Blog from './pages/Blog'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

import PomodoroTechniqueExplained from './pages/blog/PomodoroTechniqueExplained'
import BestStudyTimerApps from './pages/blog/BestStudyTimerApps'
import FocusTimerProductivity from './pages/blog/FocusTimerProductivity'
import TimeManagementPomodoro from './pages/blog/TimeManagementPomodoro'
import ConcentrationTimerTechniques from './pages/blog/ConcentrationTimerTechniques'
import WorkTimerBetterFocus from './pages/blog/WorkTimerBetterFocus'
import PomodoroTeknigiAciklama from './pages/blog/tr/PomodoroTeknigiAciklama'
import TecnicaPomodoroExplicada from './pages/blog/es/TecnicaPomodoroExplicada'
import PomodoroArabic from './pages/blog/ar/pomodoro-arabic-guide'
import PomodoroItalian from './pages/blog/it/tecnica-pomodoro-completa'
import PomodoroChinese from './pages/blog/zh/pomodoro-technique-guide'
import PomodoroHindi from './pages/blog/hi/pomodoro-ka-complete-guide'
import PomodoroUrdu from './pages/blog/ur/pomodoro-technique-urdu-guide'
import PomodoroRussian from './pages/blog/ru/pomodoro-tehnika-polnoe-rukovodstvo'

export interface AppRoute {
  path: string
  element: React.ReactElement
  /** Sitemap priority; routes without one are left out of the sitemap. */
  priority?: number
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

export const routes: AppRoute[] = [
  { path: '/', element: <Home />, priority: 1.0, changefreq: 'weekly' },
  { path: '/how-it-works', element: <HowItWorks />, priority: 0.8, changefreq: 'monthly' },
  { path: '/blog', element: <Blog />, priority: 0.8, changefreq: 'weekly' },
  { path: '/about', element: <About />, priority: 0.5, changefreq: 'monthly' },
  { path: '/privacy', element: <Privacy />, priority: 0.3, changefreq: 'yearly' },

  { path: '/blog/pomodoro-technique-explained', element: <PomodoroTechniqueExplained />, priority: 0.8, changefreq: 'monthly' },
  { path: '/blog/best-study-timer-apps', element: <BestStudyTimerApps />, priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/focus-timer-productivity', element: <FocusTimerProductivity />, priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/time-management-pomodoro', element: <TimeManagementPomodoro />, priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/concentration-timer-techniques', element: <ConcentrationTimerTechniques />, priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/work-timer-better-focus', element: <WorkTimerBetterFocus />, priority: 0.7, changefreq: 'monthly' },

  { path: '/blog/tr/pomodoro-teknigi-aciklama', element: <PomodoroTeknigiAciklama />, priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/es/tecnica-pomodoro-explicada', element: <TecnicaPomodoroExplicada />, priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/ar/pomodoro-arabic-guide', element: <PomodoroArabic />, priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/it/tecnica-pomodoro-completa', element: <PomodoroItalian />, priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/zh/pomodoro-technique-guide', element: <PomodoroChinese />, priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/hi/pomodoro-ka-complete-guide', element: <PomodoroHindi />, priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/ur/pomodoro-technique-urdu-guide', element: <PomodoroUrdu />, priority: 0.7, changefreq: 'monthly' },
  { path: '/blog/ru/pomodoro-tehnika-polnoe-rukovodstvo', element: <PomodoroRussian />, priority: 0.7, changefreq: 'monthly' },

  { path: '*', element: <NotFound /> },
]
