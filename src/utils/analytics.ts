import type { TimerMode } from '../types/timer'

// Google Analytics 4 Setup

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export const GA_TRACKING_ID = 'G-FK0RKNZG4G'
let webVitalsInitialized = false

// gtag.js is loaded from index.html (before React) so the very first page view is never lost.
export const trackPageView = (path: string) => {
  if (typeof window.gtag === 'undefined') return

  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export const initWebVitalsTracking = async () => {
  if (typeof window === 'undefined') return
  if (webVitalsInitialized) return
  if (typeof window.gtag === 'undefined') return

  webVitalsInitialized = true

  const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals')

  const reportToGA = ({
    name,
    delta,
    value,
    id,
  }: {
    name: string
    delta: number
    value: number
    id: string
  }) => {
    window.gtag?.('event', name, {
      value: Math.round(delta),
      metric_id: id,
      metric_value: Math.round(value),
      metric_delta: Math.round(delta),
    })
  }

  onCLS(reportToGA)
  onINP(reportToGA)
  onLCP(reportToGA)
  onFCP(reportToGA)
  onTTFB(reportToGA)
}

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window.gtag === 'undefined') return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Pomodoro specific tracking events
export const trackTimerEvent = (
  action: 'start' | 'pause' | 'resume' | 'skip' | 'complete',
  mode: TimerMode
) => {
  trackEvent(action, 'timer', mode)
}

export const trackTaskEvent = (
  action: 'add' | 'complete' | 'delete',
  label?: string
) => {
  trackEvent(action, 'tasks', label)
}

export const trackMusicEvent = (
  action: 'play' | 'pause' | 'change_video' | 'toggle_playlist',
  label?: string
) => {
  trackEvent(action, 'music', label)
}
