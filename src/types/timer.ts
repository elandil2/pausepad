export type TimerMode = 'focus' | 'longFocus' | 'shortBreak' | 'longBreak'

export type TimerStatus = 'idle' | 'running' | 'paused'

export interface TimerConfig {
  focusTime: number // minutes
  longFocusTime: number // minutes
  shortBreakTime: number // minutes
  longBreakTime: number // minutes
  sessionsUntilLongBreak: number
  autoStart: boolean
  sound: boolean
}

export interface TimerState {
  mode: TimerMode
  status: TimerStatus
  timeRemaining: number // seconds
  totalTime: number // seconds
  completedSessions: number
}

export interface DailyStats {
  date: string // YYYY-MM-DD, local time
  pomodoros: number
  focusMinutes: number
}

export const DEFAULT_TIMER_CONFIG: TimerConfig = {
  focusTime: 25,
  longFocusTime: 50,
  shortBreakTime: 5,
  longBreakTime: 15,
  sessionsUntilLongBreak: 4,
  autoStart: false,
  sound: true,
}

export const MODE_LABELS: Record<TimerMode, string> = {
  focus: 'Pomodoro',
  longFocus: 'Deep focus',
  shortBreak: 'Short break',
  longBreak: 'Long break',
}

export const isFocusMode = (mode: TimerMode) => mode === 'focus' || mode === 'longFocus'
