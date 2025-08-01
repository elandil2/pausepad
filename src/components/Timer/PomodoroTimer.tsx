import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { usePomodoro } from '../../hooks/usePomodoro'
import Button from '../UI/Button'
import GlassCard from '../UI/GlassCard'

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.lg};
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`

const TimerDisplay = styled(GlassCard)`
  text-align: center;
  width: 100%;
  max-width: 400px;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    max-width: 320px;
  }
  
  @media (max-width: 480px) {
    max-width: 280px;
  }
`

const ModeIndicator = styled.div<{ $mode: string }>`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme, $mode }) => {
    switch ($mode) {
      case 'focus':
        return theme.colors.timer.focus
      case 'longFocus':
        return theme.colors.timer.focus
      case 'shortBreak':
        return theme.colors.timer.shortBreak
      case 'longBreak':
        return theme.colors.timer.longBreak
      default:
        return theme.colors.text.primary
    }
  }};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const TimeDisplay = styled(motion.div)`
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.mono};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  
  @media (max-width: 768px) {
    margin: ${({ theme }) => theme.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(2rem, 10vw, 3rem);
    margin: ${({ theme }) => theme.spacing.sm} 0;
  }
`

const ProgressRing = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(280px, 80vw);
  height: min(280px, 80vw);
  z-index: -1;
  
  @media (max-width: 768px) {
    width: min(240px, 75vw);
    height: min(240px, 75vw);
  }
  
  @media (max-width: 480px) {
    width: min(200px, 70vw);
    height: min(200px, 70vw);
  }
`

const ProgressCircle = styled.circle<{ $progress: number; $mode: string }>`
  fill: none;
  stroke: ${({ theme, $mode }) => {
    switch ($mode) {
      case 'focus':
        return theme.colors.timer.focus
      case 'longFocus':
        return theme.colors.timer.focus
      case 'shortBreak':
        return theme.colors.timer.shortBreak
      case 'longBreak':
        return theme.colors.timer.longBreak
      default:
        return theme.colors.accent.primary
    }
  }};
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 628; /* 2 * π * 100 */
  stroke-dashoffset: ${({ $progress }) => 628 - (628 * $progress) / 100};
  transition: stroke-dashoffset 1s ease;
  opacity: 0.8;
  filter: drop-shadow(0 0 10px currentColor);
`

const BackgroundCircle = styled.circle`
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 4;
`

const SessionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const SessionCounter = styled.div`
  text-align: center;
`

const SessionLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const SessionValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`

const ControlsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    
    > * {
      width: 100%;
      max-width: 200px;
    }
  }
`

const ModeSelector = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.xs};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.xs};
    width: 100%;
  }
`

const ModeButton = styled(Button)<{ $active: boolean }>`
  opacity: ${({ $active }) => $active ? 1 : 0.6};
  transform: ${({ $active }) => $active ? 'scale(1.05)' : 'scale(1)'};
`

interface PomodoroTimerProps {
  className?: string
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ className }) => {
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
        return 'Start'
      case 'running':
        return 'Pause'
      case 'paused':
        return 'Resume'
      default:
        return 'Start'
    }
  }

  return (
    <TimerContainer className={className}>
      <ModeSelector>
        <ModeButton
          variant="ghost"
          size="sm"
          $active={state.mode === 'focus'}
          onClick={() => setMode('focus')}
          disabled={state.status === 'running'}
        >
          Focus
        </ModeButton>
        <ModeButton
          variant="ghost"
          size="sm"
          $active={state.mode === 'longFocus'}
          onClick={() => setMode('longFocus')}
          disabled={state.status === 'running'}
        >
          Long Focus
        </ModeButton>
        <ModeButton
          variant="ghost"
          size="sm"
          $active={state.mode === 'shortBreak'}
          onClick={() => setMode('shortBreak')}
          disabled={state.status === 'running'}
        >
          Short Break
        </ModeButton>
        <ModeButton
          variant="ghost"
          size="sm"
          $active={state.mode === 'longBreak'}
          onClick={() => setMode('longBreak')}
          disabled={state.status === 'running'}
        >
          Long Break
        </ModeButton>
      </ModeSelector>

      <TimerDisplay padding="xl">
        <ProgressRing>
          <BackgroundCircle
            cx="140"
            cy="140"
            r="100"
          />
          <ProgressCircle
            cx="140"
            cy="140"
            r="100"
            $progress={getProgress()}
            $mode={state.mode}
          />
        </ProgressRing>

        <ModeIndicator $mode={state.mode}>
          {getModeLabel(state.mode)}
        </ModeIndicator>

        <TimeDisplay
          key={state.timeRemaining}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {formatTime(state.timeRemaining)}
        </TimeDisplay>

        <SessionInfo>
          <SessionCounter>
            <SessionLabel>Session</SessionLabel>
            <SessionValue>{state.currentSession}</SessionValue>
          </SessionCounter>
          <SessionCounter>
            <SessionLabel>Completed</SessionLabel>
            <SessionValue>{state.completedSessions}</SessionValue>
          </SessionCounter>
        </SessionInfo>
      </TimerDisplay>

      <ControlsContainer>
        <Button
          variant="primary"
          size="lg"
          onClick={handleStartPause}
        >
          {getStartPauseLabel()}
        </Button>

        {state.status !== 'idle' && (
          <Button
            variant="secondary"
            size="lg"
            onClick={stop}
          >
            Stop
          </Button>
        )}

        <Button
          variant="ghost"
          size="lg"
          onClick={skip}
          disabled={state.status === 'idle'}
        >
          Skip
        </Button>

        <Button
          variant="ghost"
          size="lg"
          onClick={reset}
        >
          Reset
        </Button>
      </ControlsContainer>
    </TimerContainer>
  )
}

export default PomodoroTimer