// Google Analytics 4 Setup
// Your GA4 Measurement ID: G-FK0RKNZG4G

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export const GA_TRACKING_ID = 'G-FK0RKNZG4G'
let webVitalsInitialized = false

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return

  // Load gtag script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(script)

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_TRACKING_ID, {
    page_path: window.location.pathname,
    send_page_view: false, // We'll send page views manually
  })
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window.gtag === 'undefined') return

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
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
  action: 'start' | 'pause' | 'resume' | 'stop' | 'skip' | 'complete',
  mode: 'focus' | 'longFocus' | 'shortBreak' | 'longBreak'
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

// Track user sessions
export const trackSession = (
  sessionsCompleted: number,
  tasksCompleted: number
) => {
  trackEvent('session_end', 'productivity', undefined, sessionsCompleted)
  trackEvent('tasks_completed', 'productivity', undefined, tasksCompleted)
}
