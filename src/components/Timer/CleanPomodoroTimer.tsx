import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { usePomodoro } from '../../hooks/usePomodoro'

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`

const ModeSelector = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 4px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const ModeTab = styled.button<{ $active: boolean }>`
  padding: 12px 24px;
  border: none;
  background: ${({ $active }) => $active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.colors.text.primary : theme.colors.text.secondary};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${({ $active }) => $active ? 600 : 400};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const TimerCircle = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 250px;
    height: 250px;
  }
`

const CircularProgress = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`

const ProgressTrack = styled.circle`
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 3;
`

const ProgressBar = styled.circle<{ $progress: number; $mode: string }>`
  fill: none;
  stroke: ${({ $mode }) => {
    switch ($mode) {
      case 'focus':
      case 'longFocus':
        return '#667eea'
      case 'shortBreak':
        return '#4facfe'
      case 'longBreak':
        return '#43e97b'
      default:
        return '#667eea'
    }
  }};
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 880; /* 2 * π * 140 */
  stroke-dashoffset: ${({ $progress }) => 880 - (880 * $progress) / 100};
  transition: stroke-dashoffset 1s ease;
  filter: drop-shadow(0 0 8px currentColor);
`

const TimerDisplay = styled(motion.div)`
  text-align: center;
  z-index: 1;
`

const TimeText = styled.div`
  font-size: 3.5rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.8rem;
  }
`

const ModeLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
`

const SessionInfo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const SessionStat = styled.div`
  text-align: center;
`

const SessionNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`

const SessionLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

const ControlButton = styled(motion.button)<{ $variant?: 'primary' | 'secondary' }>`
  padding: 16px 32px;
  border: none;
  border-radius: 50px;
  background: ${({ $variant }) =>
    $variant === 'primary' ? '#667eea' : 'rgba(255, 255, 255, 0.1)'};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ $variant }) =>
    $variant === 'primary' ? '#667eea' : 'rgba(255, 255, 255, 0.2)'};
  min-width: 120px;

  &:hover {
    background: ${({ $variant }) =>
      $variant === 'primary' ? '#5a6fd8' : 'rgba(255, 255, 255, 0.15)'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 12px 20px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    min-width: 100px;
  }
`

const ControlsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

interface CleanPomodoroTimerProps {
  className?: string
}

const CleanPomodoroTimer: React.FC<CleanPomodoroTimerProps> = ({ className }) => {
  const {
    state,
    start,
    pause,
    resume,
    stop,
    skip,
    reset,
    setMode,
    formatTime,
    getProgress,
  } = usePomodoro()

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case 'focus':
        return 'Focus Time'
      case 'longFocus':
        return 'Long Focus'
      case 'shortBreak':
        return 'Short Break'
      case 'longBreak':
        return 'Long Break'
      default:
        return 'Focus Time'
    }
  }

  const handleStartPause = () => {
    if (state.status === 'idle') {
      start()
    } else if (state.status === 'running') {
      pause()
    } else if (state.status === 'paused') {
      resume()
    }
  }

  const getStartPauseLabel = () => {
    switch (state.status) {
      case 'idle':
        return 'START'
      case 'running':
        return 'PAUSE'
      case 'paused':
        return 'RESUME'
      default:
        return 'START'
    }
  }

  return (
    <TimerContainer className={className}>
      <ModeSelector>
        <ModeTab
          $active={state.mode === 'focus'}
          onClick={() => setMode('focus')}
          disabled={state.status === 'running'}
        >
          Pomodoro
        </ModeTab>
        <ModeTab
          $active={state.mode === 'longFocus'}
          onClick={() => setMode('longFocus')}
          disabled={state.status === 'running'}
        >
          Long Focus
        </ModeTab>
        <ModeTab
          $active={state.mode === 'shortBreak'}
          onClick={() => setMode('shortBreak')}
          disabled={state.status === 'running'}
        >
          Short Break
        </ModeTab>
        <ModeTab
          $active={state.mode === 'longBreak'}
          onClick={() => setMode('longBreak')}
          disabled={state.status === 'running'}
        >
          Long Break
        </ModeTab>
      </ModeSelector>

      <TimerCircle>
        <CircularProgress>
          <ProgressTrack
            cx="150"
            cy="150"
            r="140"
          />
          <ProgressBar
            cx="150"
            cy="150"
            r="140"
            $progress={getProgress()}
            $mode={state.mode}
          />
        </CircularProgress>

        <TimerDisplay
          key={state.timeRemaining}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <TimeText>{formatTime(state.timeRemaining)}</TimeText>
          <ModeLabel>{getModeLabel(state.mode)}</ModeLabel>
        </TimerDisplay>
      </TimerCircle>

      <SessionInfo>
        <SessionStat>
          <SessionNumber>{state.currentSession}</SessionNumber>
          <SessionLabel>Session</SessionLabel>
        </SessionStat>
        <SessionStat>
          <SessionNumber>{state.completedSessions}</SessionNumber>
          <SessionLabel>Completed</SessionLabel>
        </SessionStat>
      </SessionInfo>

      <ControlsContainer>
        <ControlButton
          $variant="primary"
          onClick={handleStartPause}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {getStartPauseLabel()}
        </ControlButton>

        {state.status !== 'idle' && (
          <ControlButton
            onClick={stop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            STOP
          </ControlButton>
        )}

        {state.status !== 'idle' && (
          <ControlButton
            onClick={skip}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            SKIP
          </ControlButton>
        )}

        <ControlButton
          onClick={reset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          RESET
        </ControlButton>
      </ControlsContainer>
    </TimerContainer>
  )
}

export default CleanPomodoroTimer