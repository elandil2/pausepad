import { useCallback, useEffect, useRef, useState } from 'react'
import {
  DEFAULT_TIMER_CONFIG,
  DailyStats,
  MODE_LABELS,
  TimerConfig,
  TimerMode,
  TimerState,
  isFocusMode,
} from '../types/timer'
import { readStorage, writeStorage } from '../utils/storage'
import { trackTimerEvent } from '../utils/analytics'

const CONFIG_KEY = 'pausepad-settings'
const STATS_KEY = 'pausepad-stats'
const DEFAULT_TITLE = 'Pomodoro Timer with Tasks & Focus Music | PausePad'

const todayKey = () => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

const emptyStats = (): DailyStats => ({ date: todayKey(), pomodoros: 0, focusMinutes: 0 })

const minutesForMode = (config: TimerConfig, mode: TimerMode) => {
  switch (mode) {
    case 'longFocus':
      return config.longFocusTime
    case 'shortBreak':
      return config.shortBreakTime
    case 'longBreak':
      return config.longBreakTime
    default:
      return config.focusTime
  }
}

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

// A short two-tone chime generated with the Web Audio API, so no audio files are needed.
const playChime = (ctx: AudioContext) => {
  const notes = [660, 880, 660, 880]
  notes.forEach((freq, i) => {
    const start = ctx.currentTime + i * 0.22
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, start)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.25, start + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.2)
    osc.connect(gain).connect(ctx.destination)
    osc.start(start)
    osc.stop(start + 0.21)
  })
}

export const usePomodoro = () => {
  const [config, setConfigState] = useState<TimerConfig>(DEFAULT_TIMER_CONFIG)
  const [stats, setStats] = useState<DailyStats>(emptyStats)
  const [state, setState] = useState<TimerState>({
    mode: 'focus',
    status: 'idle',
    timeRemaining: DEFAULT_TIMER_CONFIG.focusTime * 60,
    totalTime: DEFAULT_TIMER_CONFIG.focusTime * 60,
    completedSessions: 0,
  })

  // Wall-clock end time while running; makes the countdown immune to background-tab throttling.
  const endsAtRef = useRef<number | null>(null)
  const audioRef = useRef<AudioContext | null>(null)
  const configRef = useRef(config)
  const stateRef = useRef(state)
  stateRef.current = state
  const statsRef = useRef(stats)
  statsRef.current = stats

  const commit = (next: TimerState) => {
    stateRef.current = next
    setState(next)
  }

  // Restore saved settings and today's stats after mount (keeps prerendered HTML deterministic).
  useEffect(() => {
    const saved = readStorage<Partial<TimerConfig>>(CONFIG_KEY, {})
    const merged = { ...DEFAULT_TIMER_CONFIG, ...saved }
    configRef.current = merged
    setConfigState(merged)
    commit({ ...stateRef.current, timeRemaining: merged.focusTime * 60, totalTime: merged.focusTime * 60 })

    const savedStats = readStorage<DailyStats>(STATS_KEY, emptyStats())
    setStats(savedStats.date === todayKey() ? savedStats : emptyStats())
  }, [])

  const unlockAudio = () => {
    try {
      if (!audioRef.current) {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioRef.current = new Ctx()
      }
      if (audioRef.current.state === 'suspended') void audioRef.current.resume()
    } catch {
      audioRef.current = null
    }
  }

  const notify = (finished: TimerMode, next: TimerMode) => {
    if (configRef.current.sound && audioRef.current) {
      try {
        playChime(audioRef.current)
      } catch {
        // Audio is best-effort.
      }
    }
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = isFocusMode(finished) ? 'Focus session complete 🍅' : 'Break is over'
      const body = isFocusMode(finished) ? `Time for a ${MODE_LABELS[next].toLowerCase()}.` : 'Ready for the next pomodoro?'
      try {
        new Notification(title, { body, icon: '/icons/icon-192x192.png', tag: 'pausepad' })
      } catch {
        // Some mobile browsers only allow notifications from a service worker.
      }
    }
  }

  const nextModeAfter = (mode: TimerMode, completedSessions: number): TimerMode => {
    if (!isFocusMode(mode)) return 'focus'
    return completedSessions % configRef.current.sessionsUntilLongBreak === 0 ? 'longBreak' : 'shortBreak'
  }

  const complete = useCallback(() => {
    const prev = stateRef.current
    const cfg = configRef.current
    const finishedFocus = isFocusMode(prev.mode)
    const completedSessions = finishedFocus ? prev.completedSessions + 1 : prev.completedSessions
    const next = nextModeAfter(prev.mode, completedSessions)
    const total = minutesForMode(cfg, next) * 60

    if (finishedFocus) {
      const base = statsRef.current.date === todayKey() ? statsRef.current : emptyStats()
      const updated = {
        ...base,
        pomodoros: base.pomodoros + 1,
        focusMinutes: base.focusMinutes + Math.round(prev.totalTime / 60),
      }
      writeStorage(STATS_KEY, updated)
      setStats(updated)
    }

    notify(prev.mode, next)
    trackTimerEvent('complete', prev.mode)

    endsAtRef.current = cfg.autoStart ? Date.now() + total * 1000 : null
    commit({
      mode: next,
      status: cfg.autoStart ? 'running' : 'idle',
      timeRemaining: total,
      totalTime: total,
      completedSessions,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Countdown loop: derive remaining time from the end timestamp.
  useEffect(() => {
    if (state.status !== 'running') return

    const update = () => {
      if (endsAtRef.current === null) return
      const remaining = Math.max(0, Math.ceil((endsAtRef.current - Date.now()) / 1000))
      if (remaining <= 0) complete()
      else if (stateRef.current.timeRemaining !== remaining) commit({ ...stateRef.current, timeRemaining: remaining })
    }

    update()
    const id = window.setInterval(update, 250)
    document.addEventListener('visibilitychange', update)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', update)
    }
  }, [state.status, complete])

  const start = useCallback(() => {
    const prev = stateRef.current
    if (prev.status === 'running') return
    unlockAudio()
    if ('Notification' in window && Notification.permission === 'default') {
      void Notification.requestPermission()
    }
    endsAtRef.current = Date.now() + prev.timeRemaining * 1000
    trackTimerEvent(prev.status === 'paused' ? 'resume' : 'start', prev.mode)
    commit({ ...prev, status: 'running' })
  }, [])

  const pause = useCallback(() => {
    const prev = stateRef.current
    if (prev.status !== 'running') return
    const remaining = endsAtRef.current
      ? Math.max(1, Math.ceil((endsAtRef.current - Date.now()) / 1000))
      : prev.timeRemaining
    endsAtRef.current = null
    trackTimerEvent('pause', prev.mode)
    commit({ ...prev, status: 'paused', timeRemaining: remaining })
  }, [])

  const toggle = useCallback(() => {
    if (stateRef.current.status === 'running') pause()
    else start()
  }, [pause, start])

  const goTo = (mode: TimerMode, cfg: TimerConfig = configRef.current) => {
    endsAtRef.current = null
    const total = minutesForMode(cfg, mode) * 60
    commit({ ...stateRef.current, mode, status: 'idle', timeRemaining: total, totalTime: total })
  }

  const reset = useCallback(() => goTo(stateRef.current.mode), [])

  const skip = useCallback(() => {
    const prev = stateRef.current
    trackTimerEvent('skip', prev.mode)
    goTo(nextModeAfter(prev.mode, prev.completedSessions + 1))
  }, [])

  const setMode = useCallback((mode: TimerMode) => goTo(mode), [])

  const setConfig = useCallback((patch: Partial<TimerConfig>) => {
    const next = { ...configRef.current, ...patch }
    configRef.current = next
    writeStorage(CONFIG_KEY, next)
    setConfigState(next)
    if (stateRef.current.status === 'idle') goTo(stateRef.current.mode, next)
  }, [])

  // Live countdown in the tab title.
  useEffect(() => {
    if (state.status === 'idle') {
      document.title = DEFAULT_TITLE
      return
    }
    const icon = isFocusMode(state.mode) ? '🍅' : '☕'
    const paused = state.status === 'paused' ? ' (paused)' : ''
    document.title = `${icon} ${formatTime(state.timeRemaining)}${paused} · ${MODE_LABELS[state.mode]}`
  }, [state.timeRemaining, state.status, state.mode])

  useEffect(
    () => () => {
      document.title = DEFAULT_TITLE
    },
    [],
  )

  const progress = state.totalTime === 0 ? 0 : (state.totalTime - state.timeRemaining) / state.totalTime

  return { state, config, stats, progress, start, pause, toggle, reset, skip, setMode, setConfig }
}
