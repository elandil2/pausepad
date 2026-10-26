import React, { useEffect, useId, useState } from 'react'
import styled, { css } from 'styled-components'
import { formatTime, usePomodoro } from '../../hooks/usePomodoro'
import { MODE_LABELS, TimerConfig, TimerMode, isFocusMode } from '../../types/timer'
import { theme } from '../../styles/theme'
import { Window, buttonBase } from '../Layout/Page'

const MODES: { mode: TimerMode; emoji: string; bubble: string }[] = [
  { mode: 'focus', emoji: '🍅', bubble: 'Focus!' },
  { mode: 'shortBreak', emoji: '☕', bubble: 'Sip!' },
  { mode: 'longBreak', emoji: '🌴', bubble: 'Relax!' },
  { mode: 'longFocus', emoji: '🧠', bubble: 'Deep!' },
]

const SUBTITLES: Record<TimerMode, string> = {
  focus: 'One task, no distractions 👋',
  longFocus: 'Long, deep work session 🔒',
  shortBreak: 'Stand up, stretch, drink water 💧',
  longBreak: 'You earned it. Step away 🌿',
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  padding: 26px 24px 22px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 20px;
    padding: 20px 14px 16px;
  }
`

const Badges = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
  padding-top: 14px;

  @media (max-width: 400px) {
    gap: 10px;
  }
`

const Badge = styled.button<{ $color: string; $active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  color: ${({ theme, $active }) => ($active ? theme.colors.ink : theme.colors.text.muted)};

  .circle {
    width: 64px;
    height: 64px;
    display: grid;
    place-items: center;
    border: ${({ theme }) => theme.border};
    border-radius: 50%;
    background: ${({ $color }) => $color};
    font-size: 1.9rem;
    line-height: 1;
    box-shadow: ${({ theme, $active }) => ($active ? theme.shadows.small : 'none')};
    transform: ${({ $active }) => ($active ? 'translate(-2px, -2px)' : 'none')};
    opacity: ${({ $active }) => ($active ? 1 : 0.55)};
    filter: ${({ $active }) => ($active ? 'none' : 'saturate(0.6)')};
    transition:
      transform ${({ theme }) => theme.transitions.fast},
      opacity ${({ theme }) => theme.transitions.fast};
  }

  &:hover .circle {
    opacity: 1;
    filter: none;
  }

  .bubble {
    position: absolute;
    top: -16px;
    left: 42px;
    padding: 2px 8px;
    border: ${({ theme }) => theme.borderThin};
    border-radius: 10px 10px 10px 2px;
    background: #fff;
    color: ${({ theme }) => theme.colors.ink};
    font-size: 0.7rem;
    font-weight: 800;
    white-space: nowrap;
    box-shadow: ${({ theme }) => theme.shadows.pressed};
  }

  @media (max-width: 400px) {
    .circle {
      width: 54px;
      height: 54px;
      font-size: 1.55rem;
    }

    .bubble {
      left: 34px;
    }
  }
`

const Time = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(4.2rem, 19vw, 7.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.ink};
`

const Status = styled.p`
  margin-top: -8px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`

const Cycle = styled.div`
  display: flex;
  gap: 6px;
  font-size: 1.5rem;
  line-height: 1;

  span[data-done='false'] {
    filter: grayscale(1);
    opacity: 0.3;
  }
`

const Progress = styled.div`
  width: min(100%, 460px);
  height: 22px;
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.full};
  background: #fff;
  overflow: hidden;

  div {
    height: 100%;
    background: var(--mode);
    transition: width 0.35s linear;
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`

const roundButton = css`
  ${buttonBase}
  width: 56px;
  min-height: 56px;
  padding: 0;
  background: #fff;
`

const IconButton = styled.button`
  ${roundButton}
`

const MainButton = styled.button`
  ${buttonBase}
  min-width: 180px;
  min-height: 64px;
  padding: 0 32px;
  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: 0.01em;
  background: var(--mode);

  @media (max-width: 380px) {
    min-width: 150px;
  }
`

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 12px;
  padding-top: 16px;
  border-top: 2px dashed ${({ theme }) => theme.colors.surface.borderSoft};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};

  strong {
    color: ${({ theme }) => theme.colors.ink};
    font-weight: 800;
  }
`

const FooterEnd = styled.span`
  display: flex;
  align-items: center;
  gap: 14px;
`

const Hint = styled.span`
  @media (hover: none) {
    display: none;
  }

  kbd {
    padding: 1px 6px;
    border: ${({ theme }) => theme.borderThin};
    border-radius: 6px;
    background: #fff;
    font-family: inherit;
    font-size: 0.8em;
    font-weight: 700;
  }
`

const SettingsToggle = styled.button<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 12px;
  border: ${({ theme }) => theme.borderThin};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme, $open }) => ($open ? theme.colors.accent.primary : '#fff')};
  box-shadow: ${({ theme }) => theme.shadows.pressed};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`

const Settings = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 16px;
  border: ${({ theme }) => theme.borderThin};
  border-radius: ${({ theme }) => theme.radius.md};
  background: #fff;

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  input[type='number'] {
    width: 100%;
    height: 42px;
    padding: 0 10px;
    border: ${({ theme }) => theme.borderThin};
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme }) => theme.colors.surface.tint};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.colors.ink};

    &:focus {
      outline: none;
      background: #fff;
      box-shadow: ${({ theme }) => theme.shadows.pressed};
    }
  }

  .switches {
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
  }

  .switches label {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.ink};
    cursor: pointer;
  }

  input[type='checkbox'] {
    width: 20px;
    height: 20px;
    accent-color: ${({ theme }) => theme.colors.bg.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Root = styled.div<{ $color: string }>`
  --mode: ${({ $color }) => $color};
`

const durationFields: { key: keyof TimerConfig; label: string; max: number }[] = [
  { key: 'focusTime', label: 'Pomodoro', max: 120 },
  { key: 'shortBreakTime', label: 'Short break', max: 60 },
  { key: 'longBreakTime', label: 'Long break', max: 90 },
  { key: 'longFocusTime', label: 'Deep focus', max: 180 },
]

const Timer: React.FC = () => {
  const { state, config, stats, progress, toggle, reset, skip, setMode, setConfig } = usePomodoro()
  const [showSettings, setShowSettings] = useState(false)
  const settingsId = useId()
  const color = theme.colors.mode[state.mode]
  const current = MODES.find((m) => m.mode === state.mode)!

  // Space toggles the timer unless the user is typing or on a control.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || event.repeat) return
      const target = event.target as HTMLElement
      if (target.closest('input, textarea, select, button, a, iframe, [contenteditable="true"]')) return
      event.preventDefault()
      toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])

  const mainLabel = state.status === 'running' ? 'PAUSE' : state.status === 'paused' ? 'RESUME' : 'START'
  const round = state.completedSessions + (isFocusMode(state.mode) ? 1 : 0)
  const cycleLength = config.sessionsUntilLongBreak
  const doneInCycle = state.completedSessions % cycleLength

  return (
    <Root $color={color}>
      <Window
        icon={current.emoji}
        iconColor={color}
        title="PausePad timer"
        subtitle={SUBTITLES[state.mode]}
        tint
        padded={false}
        headingId="timer-heading"
      >
        <Body>
          <Badges role="tablist" aria-label="Timer mode">
            {MODES.map(({ mode, emoji, bubble }) => {
              const active = state.mode === mode
              return (
                <Badge
                  key={mode}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  $active={active}
                  $color={theme.colors.mode[mode]}
                  onClick={() => setMode(mode)}
                >
                  {active && (
                    <span className="bubble" aria-hidden="true">
                      {bubble}
                    </span>
                  )}
                  <span className="circle" aria-hidden="true">
                    {emoji}
                  </span>
                  {MODE_LABELS[mode]}
                </Badge>
              )
            })}
          </Badges>

          <Time role="timer" aria-live="off">
            {formatTime(state.timeRemaining)}
          </Time>

          <Status>
            {current.emoji} {isFocusMode(state.mode) ? `Round ${round}` : MODE_LABELS[state.mode]}
            {state.status === 'paused' && ' · paused'}
          </Status>

          <Cycle role="img" aria-label={`${doneInCycle} of ${cycleLength} pomodoros done before the long break`}>
            {Array.from({ length: cycleLength }, (_, i) => (
              <span key={i} data-done={i < doneInCycle}>
                🍅
              </span>
            ))}
          </Cycle>

          <Progress
            role="progressbar"
            aria-label="Session progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <div style={{ width: `${progress * 100}%` }} />
          </Progress>

          <Controls>
            <IconButton type="button" onClick={reset} aria-label="Reset timer" title="Reset">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <path d="M3 4v5h5" />
              </svg>
            </IconButton>
            <MainButton type="button" onClick={toggle}>
              {mainLabel}
            </MainButton>
            <IconButton type="button" onClick={skip} aria-label="Skip to next session" title="Skip">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M5 5.5v13a1 1 0 0 0 1.5.86L16 13.7V18a1 1 0 0 0 2 0V6a1 1 0 0 0-2 0v4.3L6.5 4.64A1 1 0 0 0 5 5.5z" />
              </svg>
            </IconButton>
          </Controls>

          {showSettings && (
            <Settings id={settingsId} onSubmit={(e) => e.preventDefault()} aria-label="Timer settings">
              {durationFields.map((field) => (
                <label key={field.key}>
                  {field.label} (min)
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={field.max}
                    value={config[field.key] as number}
                    onChange={(e) => {
                      const value = Math.round(Number(e.target.value))
                      if (value >= 1 && value <= field.max) setConfig({ [field.key]: value })
                    }}
                  />
                </label>
              ))}
              <div className="switches">
                <label>
                  <input type="checkbox" checked={config.autoStart} onChange={(e) => setConfig({ autoStart: e.target.checked })} />
                  Auto-start next session
                </label>
                <label>
                  <input type="checkbox" checked={config.sound} onChange={(e) => setConfig({ sound: e.target.checked })} />
                  Sound when a session ends
                </label>
              </div>
            </Settings>
          )}

          <Footer>
            <span>
              Today: <strong>{stats.pomodoros}</strong> 🍅 · <strong>{stats.focusMinutes}</strong> min focused
            </span>
            <FooterEnd>
              <Hint>
                <kbd>Space</kbd> start / pause
              </Hint>
              <SettingsToggle
                type="button"
                $open={showSettings}
                aria-expanded={showSettings}
                aria-controls={settingsId}
                onClick={() => setShowSettings((v) => !v)}
              >
                ⚙️ Settings
              </SettingsToggle>
            </FooterEnd>
          </Footer>
        </Body>
      </Window>
    </Root>
  )
}

export default Timer
