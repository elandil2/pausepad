export type TimerMode = 'focus' | 'longFocus' | 'shortBreak' | 'longBreak'

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed'

export interface TimerConfig {
  focusTime: number // minutes
  longFocusTime: number // minutes
  shortBreakTime: number // minutes
  longBreakTime: number // minutes
  sessionsUntilLongBreak: number
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
}

export interface TimerState {
  mode: TimerMode
  status: TimerStatus
  timeRemaining: number // seconds
  totalTime: number // seconds
  currentSession: number
  totalSessions: number
  completedSessions: number
  currentTask?: string // task ID
}

export interface SessionRecord {
  id: string
  taskId?: string
  projectId?: string
  startTime: Date
  endTime?: Date
  duration: number // seconds
  mode: TimerMode
  completed: boolean
  interrupted: boolean
  createdAt: Date
}

export interface NotificationAction {
  action: string
  title: string
  icon?: string
}

export interface TimerNotification {
  title: string
  body: string
  icon?: string
  sound?: string
  actions?: NotificationAction[]
}

export interface TimerStats {
  totalFocusTime: number // seconds
  totalBreakTime: number // seconds
  sessionsCompleted: number
  sessionsStarted: number
  averageSessionLength: number // seconds
  longestStreak: number
  currentStreak: number
  productivity: number // 0-100 score
}

export const DEFAULT_TIMER_CONFIG: TimerConfig = {
  focusTime: 25,
  longFocusTime: 45,
  shortBreakTime: 5,
  longBreakTime: 15,
  sessionsUntilLongBreak: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
}

export const TIMER_SOUNDS = {
  tick: '/sounds/tick.mp3',
  complete: '/sounds/complete.mp3',
  break: '/sounds/break.mp3',
  warning: '/sounds/warning.mp3',
} as const

export type TimerSound = keyof typeof TIMER_SOUNDS