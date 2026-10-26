import React, { useEffect, useId, useState } from 'react'
import styled from 'styled-components'
import { formatTime, usePomodoro } from '../../hooks/usePomodoro'
import { MODE_LABELS, TimerConfig, TimerMode, isFocusMode } from '../../types/timer'
import { theme } from '../../styles/theme'

const MODES: TimerMode[] = ['focus', 'shortBreak', 'longBreak', 'longFocus']

const Wrapper = styled.section<{ $color: string }>`
  --mode: ${({ $color }) => $color};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding: 28px 28px 24px;
  border-radius: ${({ theme }) => theme.radius.xl};
  background:
    radial-gradient(120% 80% at 50% 0%, color-mix(in srgb, var(--mode) 16%, transparent), transparent 70%),
    ${({ theme }) => theme.colors.surface.base};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: background 0.4s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 22px;
    padding: 18px 14px 18px;
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 4px;
  padding: 4px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  max-width: 100%;

  @media (max-width: 420px) {
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`

const Tab = styled.button<{ $active: boolean }>`
  min-height: 38px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  white-space: nowrap;
  color: ${({ theme, $active }) => ($active ? '#16110f' : theme.colors.text.secondary)};
  background: ${({ $active }) => ($active ? 'var(--mode)' : 'transparent')};
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme, $active }) => ($active ? '#16110f' : theme.colors.text.primary)};
  }

  @media (max-width: 420px) {
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 0 8px;
  }
`

const Dial = styled.div`
  position: relative;
  width: clamp(236px, 74vw, 340px);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
`

const Ring = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);

  circle {
    fill: none;
    stroke-width: 8;
  }

  .track {
    stroke: rgba(255, 255, 255, 0.07);
  }

  .bar {
    stroke: var(--mode);
    stroke-linecap: round;
    transition:
      stroke-dashoffset 0.35s linear,
      stroke 0.4s ease;
    filter: drop-shadow(0 0 10px color-mix(in srgb, var(--mode) 55%, transparent));
  }
`

const Readout = styled.div`
  position: relative;
  text-align: center;
`

const Time = styled.div`
  font-size: clamp(3.4rem, 15vw, 5rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.text.primary};
`

const Label = styled.div`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

const IconButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.surface.raised};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.surface.hover};
  }
`

const MainButton = styled.button`
  min-width: 168px;
  height: 60px;
  padding: 0 28px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #16110f;
  background: var(--mode);
  box-shadow: 0 10px 30px color-mix(in srgb, var(--mode) 35%, transparent);
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    filter ${({ theme }) => theme.transitions.fast};

  &:hover {
    filter: brightness(1.07);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 380px) {
    min-width: 140px;
  }
`

const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.surface.border};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
  }
`

const Hint = styled.span`
  @media (hover: none) {
    display: none;
  }

  kbd {
    padding: 1px 6px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.surface.borderStrong};
    font-family: inherit;
    font-size: 0.8em;
  }
`

const SettingsToggle = styled.button<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 12px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme, $open }) => ($open ? theme.colors.text.primary : theme.colors.text.secondary)};
  background: ${({ theme, $open }) => ($open ? theme.colors.surface.hover : theme.colors.surface.raised)};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.surface.hover};
  }
`

const FooterEnd = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const Settings = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: rgba(0, 0, 0, 0.22);
  border: 1px solid ${({ theme }) => theme.colors.surface.border};

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  input[type='number'] {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    border-radius: ${({ theme }) => theme.radius.sm};
    border: 1px solid ${({ theme }) => theme.colors.surface.borderStrong};
    background: ${({ theme }) => theme.colors.bg.secondary};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-variant-numeric: tabular-nums;

    &:focus {
      outline: none;
      border-color: var(--mode);
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
    cursor: pointer;
  }

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    accent-color: var(--mode);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const durationFields: { key: keyof TimerConfig; label: string; max: number }[] = [
  { key: 'focusTime', label: 'Pomodoro', max: 120 },
  { key: 'shortBreakTime', label: 'Short break', max: 60 },
  { key: 'longBreakTime', label: 'Long break', max: 90 },
  { key: 'longFocusTime', label: 'Deep focus', max: 180 },
]

const RADIUS = 140
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const Timer: React.FC = () => {
  const { state, config, stats, progress, toggle, reset, skip, setMode, setConfig } = usePomodoro()
  const [showSettings, setShowSettings] = useState(false)
  const settingsId = useId()
  const color = theme.colors.mode[state.mode]

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

  const mainLabel = state.status === 'running' ? 'Pause' : state.status === 'paused' ? 'Resume' : 'Start'
  const round = state.completedSessions + (isFocusMode(state.mode) ? 1 : 0)

  return (
    <Wrapper $color={color} aria-label="Pomodoro timer">
      <Tabs role="tablist" aria-label="Timer mode">
        {MODES.map((mode) => (
          <Tab
            key={mode}
            type="button"
            role="tab"
            aria-selected={state.mode === mode}
            $active={state.mode === mode}
            onClick={() => setMode(mode)}
          >
            {MODE_LABELS[mode]}
          </Tab>
        ))}
      </Tabs>

      <Dial>
        <Ring viewBox="0 0 300 300" aria-hidden="true">
          <circle className="track" cx="150" cy="150" r={RADIUS} />
          <circle
            className="bar"
            cx="150"
            cy="150"
            r={RADIUS}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          />
        </Ring>
        <Readout>
          <Time role="timer" aria-live="off">
            {formatTime(state.timeRemaining)}
          </Time>
          <Label>
            {isFocusMode(state.mode) ? `Focus · round ${round}` : MODE_LABELS[state.mode]}
            {state.status === 'paused' && ' · paused'}
          </Label>
        </Readout>
      </Dial>

      <Controls>
        <IconButton type="button" onClick={reset} aria-label="Reset timer" title="Reset">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
          Today: <strong>{stats.pomodoros}</strong> {stats.pomodoros === 1 ? 'pomodoro' : 'pomodoros'} ·{' '}
          <strong>{stats.focusMinutes}</strong> min
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
            </svg>
            <span>Settings</span>
          </SettingsToggle>
        </FooterEnd>
      </Footer>
    </Wrapper>
  )
}

export default Timer
