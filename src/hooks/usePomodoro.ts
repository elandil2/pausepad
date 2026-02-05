import { useState, useEffect, useCallback, useRef } from 'react'
import { TimerMode, TimerState, TimerConfig, SessionRecord, DEFAULT_TIMER_CONFIG } from '../types/timer'
import { v4 as uuidv4 } from 'uuid'

// Create audio notification sound
const createNotificationSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  
  const playNotificationSound = () => {
    // Create a more pleasant notification sound sequence
    const frequencies = [800, 1000, 800, 1000, 800] // Pleasant bell-like sequence
    const duration = 0.2 // Each tone duration
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * duration)
      oscillator.type = 'sine'
      
      // Envelope for smooth sound
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + index * duration)
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + index * duration + 0.05)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * duration + duration - 0.05)
      
      oscillator.start(audioContext.currentTime + index * duration)
      oscillator.stop(audioContext.currentTime + index * duration + duration)
    })
  }
  
  return playNotificationSound
}

interface UsePomodoroReturn {
  state: TimerState
  config: TimerConfig
  start: () => void
  pause: () => void
  resume: () => void
  stop: () => void
  skip: () => void
  reset: () => void
  setMode: (mode: TimerMode) => void
  setConfig: (config: Partial<TimerConfig>) => void
  setCurrentTask: (taskId?: string) => void
  formatTime: (seconds: number) => string
  getProgress: () => number
  getCurrentSession: () => SessionRecord | null
}

export const usePomodoro = (initialConfig?: Partial<TimerConfig>): UsePomodoroReturn => {
  const [config, setConfigState] = useState<TimerConfig>({
    ...DEFAULT_TIMER_CONFIG,
    ...initialConfig,
  })

  const [state, setState] = useState<TimerState>({
    mode: 'focus',
    status: 'idle',
    timeRemaining: config.focusTime * 60,
    totalTime: config.focusTime * 60,
    currentSession: 1,
    totalSessions: 0,
    completedSessions: 0,
  })

  const [currentSessionRecord, setCurrentSessionRecord] = useState<SessionRecord | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<Date | null>(null)
  const playNotificationSoundRef = useRef<(() => void) | null>(null)

  // Initialize audio notification
  useEffect(() => {
    try {
      playNotificationSoundRef.current = createNotificationSound()
    } catch (error) {
      console.warn('Audio notification not available:', error)
    }
  }, [])

  // Get time for current mode
  const getTimeForMode = useCallback((mode: TimerMode): number => {
    switch (mode) {
      case 'focus':
        return config.focusTime * 60
      case 'longFocus':
        return config.longFocusTime * 60
      case 'shortBreak':
        return config.shortBreakTime * 60
      case 'longBreak':
        return config.longBreakTime * 60
      default:
        return config.focusTime * 60
    }
  }, [config])

  // Determine next mode
  const getNextMode = useCallback((currentMode: TimerMode, completedSessions: number): TimerMode => {
    if (currentMode === 'focus' || currentMode === 'longFocus') {
      // After focus, determine break type
      return (completedSessions % config.sessionsUntilLongBreak === 0) ? 'longBreak' : 'shortBreak'
    } else {
      // After any break, return to focus
      return 'focus'
    }
  }, [config.sessionsUntilLongBreak])

  // Timer tick function
  const tick = useCallback(() => {
    setState(prevState => {
      if (prevState.status !== 'running' || prevState.timeRemaining <= 0) {
        return prevState
      }

      const newTimeRemaining = prevState.timeRemaining - 1

      if (newTimeRemaining <= 0) {
        // Timer completed
        const isBreakMode = prevState.mode !== 'focus' && prevState.mode !== 'longFocus'
        const newCompletedSessions = isBreakMode ? prevState.completedSessions : prevState.completedSessions + 1
        const nextMode = getNextMode(prevState.mode, newCompletedSessions)
        const nextTime = getTimeForMode(nextMode)

        // Complete current session record
        if (currentSessionRecord) {
          const completedRecord: SessionRecord = {
            ...currentSessionRecord,
            endTime: new Date(),
            duration: Math.floor((Date.now() - currentSessionRecord.startTime.getTime()) / 1000),
            completed: true,
          }
          
          // Save session record (you can implement storage here)
          console.log('Session completed:', completedRecord)
        }

        // Trigger notifications
        const isFocusMode = prevState.mode === 'focus' || prevState.mode === 'longFocus'
        const title = isFocusMode ? 'PausePad - Focus session completed!' : 'PausePad - Break time over!'
        const body = isFocusMode
          ? `Great work! Time for a ${nextMode === 'longBreak' ? 'long' : 'short'} break.`
          : 'Ready to focus again?'
        
        // Play audio notification
        if (playNotificationSoundRef.current) {
          try {
            playNotificationSoundRef.current()
          } catch (error) {
            console.warn('Could not play notification sound:', error)
          }
        }
        
        // Show browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(title, {
            body,
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75">🍅</text></svg>'
          })
        }

        return {
          ...prevState,
          status: config.autoStartBreaks || config.autoStartPomodoros ? 'running' : 'idle',
          mode: nextMode,
          timeRemaining: nextTime,
          totalTime: nextTime,
          completedSessions: newCompletedSessions,
          currentSession: prevState.currentSession + 1,
        }
      }

      return {
        ...prevState,
        timeRemaining: newTimeRemaining,
      }
    })
  }, [config, currentSessionRecord, getNextMode, getTimeForMode])

  // Start timer
  const start = useCallback(() => {
    if (state.status === 'idle') {
      // Create new session record
      const sessionRecord: SessionRecord = {
        id: uuidv4(),
        taskId: state.currentTask,
        startTime: new Date(),
        duration: 0,
        mode: state.mode,
        completed: false,
        interrupted: false,
        createdAt: new Date(),
      }
      setCurrentSessionRecord(sessionRecord)
      startTimeRef.current = new Date()
    }

    setState(prevState => ({
      ...prevState,
      status: 'running',
    }))

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [state.status, state.mode, state.currentTask])

  // Pause timer
  const pause = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      status: 'paused',
    }))
  }, [])

  // Resume timer
  const resume = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      status: 'running',
    }))
  }, [])

  // Stop timer
  const stop = useCallback(() => {
    if (currentSessionRecord) {
      const stoppedRecord: SessionRecord = {
        ...currentSessionRecord,
        endTime: new Date(),
        duration: Math.floor((Date.now() - currentSessionRecord.startTime.getTime()) / 1000),
        completed: false,
        interrupted: true,
      }
      
      console.log('Session stopped:', stoppedRecord)
      setCurrentSessionRecord(null)
    }

    setState(prevState => ({
      ...prevState,
      status: 'idle',
      timeRemaining: getTimeForMode(prevState.mode),
    }))
  }, [currentSessionRecord, getTimeForMode])

  // Skip to next mode
  const skip = useCallback(() => {
    const nextMode = getNextMode(state.mode, state.completedSessions)
    const nextTime = getTimeForMode(nextMode)

    if (currentSessionRecord) {
      const skippedRecord: SessionRecord = {
        ...currentSessionRecord,
        endTime: new Date(),
        duration: Math.floor((Date.now() - currentSessionRecord.startTime.getTime()) / 1000),
        completed: false,
        interrupted: true,
      }
      
      console.log('Session skipped:', skippedRecord)
      setCurrentSessionRecord(null)
    }

    setState(prevState => ({
      ...prevState,
      status: 'idle',
      mode: nextMode,
      timeRemaining: nextTime,
      totalTime: nextTime,
      currentSession: prevState.currentSession + 1,
    }))
  }, [state.mode, state.completedSessions, currentSessionRecord, getNextMode, getTimeForMode])

  // Reset timer
  const reset = useCallback(() => {
    if (currentSessionRecord) {
      setCurrentSessionRecord(null)
    }

    setState({
      mode: 'focus',
      status: 'idle',
      timeRemaining: config.focusTime * 60,
      totalTime: config.focusTime * 60,
      currentSession: 1,
      totalSessions: 0,
      completedSessions: 0,
    })
  }, [config.focusTime, currentSessionRecord])

  // Set mode manually
  const setMode = useCallback((mode: TimerMode) => {
    const time = getTimeForMode(mode)
    setState(prevState => ({
      ...prevState,
      mode,
      timeRemaining: time,
      totalTime: time,
      status: 'idle',
    }))
  }, [getTimeForMode])

  // Update config
  const setConfig = useCallback((newConfig: Partial<TimerConfig>) => {
    setConfigState(prevConfig => {
      const updatedConfig = { ...prevConfig, ...newConfig }
      
      // Update current timer if idle
      setState(prevState => {
        if (prevState.status === 'idle') {
          const time = getTimeForMode(prevState.mode)
          return {
            ...prevState,
            timeRemaining: time,
            totalTime: time,
          }
        }
        return prevState
      })
      
      return updatedConfig
    })
  }, [getTimeForMode])

  // Set current task
  const setCurrentTask = useCallback((taskId?: string) => {
    setState(prevState => ({
      ...prevState,
      currentTask: taskId,
    }))
  }, [])

  // Format time as MM:SS
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  // Get progress percentage
  const getProgress = useCallback((): number => {
    if (state.totalTime === 0) return 0
    return ((state.totalTime - state.timeRemaining) / state.totalTime) * 100
  }, [state.timeRemaining, state.totalTime])

  // Get current session record
  const getCurrentSession = useCallback((): SessionRecord | null => {
    return currentSessionRecord
  }, [currentSessionRecord])

  // Set up interval
  useEffect(() => {
    if (state.status === 'running') {
      intervalRef.current = setInterval(tick, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [state.status, tick])

  // Update timer when config changes
  useEffect(() => {
    if (state.status === 'idle') {
      const time = getTimeForMode(state.mode)
      setState(prevState => ({
        ...prevState,
        timeRemaining: time,
        totalTime: time,
      }))
    }
  }, [config, state.mode, state.status, getTimeForMode])

  // Update tab title with countdown
  useEffect(() => {
    const getModeEmoji = (mode: TimerMode) => {
      switch (mode) {
        case 'focus':
        case 'longFocus':
          return '🍅'
        case 'shortBreak':
          return '☕'
        case 'longBreak':
          return '🌟'
        default:
          return '🍅'
      }
    }

    const getModeLabel = (mode: TimerMode) => {
      switch (mode) {
        case 'focus':
          return 'Focus'
        case 'longFocus':
          return 'Long Focus'
        case 'shortBreak':
          return 'Short Break'
        case 'longBreak':
          return 'Long Break'
        default:
          return 'Focus'
      }
    }

    if (state.status === 'running' || state.status === 'paused') {
      const timeStr = formatTime(state.timeRemaining)
      const emoji = getModeEmoji(state.mode)
      const modeLabel = getModeLabel(state.mode)
      const statusIndicator = state.status === 'paused' ? ' (Paused)' : ''
      
      document.title = `${emoji} ${timeStr} - ${modeLabel}${statusIndicator} | PausePad`
    } else {
      document.title = 'Free Online Pomodoro Timer with Music & Tasks | PausePad'
    }

    // Cleanup on unmount
    return () => {
      document.title = 'Free Online Pomodoro Timer with Music & Tasks | PausePad'
    }
  }, [state.timeRemaining, state.status, state.mode, formatTime])

  return {
    state,
    config,
    start,
    pause,
    resume,
    stop,
    skip,
    reset,
    setMode,
    setConfig,
    setCurrentTask,
    formatTime,
    getProgress,
    getCurrentSession,
  }
}
