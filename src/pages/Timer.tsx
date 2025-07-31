import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import PomodoroTimer from '../components/Timer/PomodoroTimer'
import YouTubePlayer from '../components/Music/YouTubePlayer'
import TaskManager from '../components/Tasks/TaskManager'
import StatsPanel from '../components/Stats/StatsPanel'
import { usePomodoro } from '../hooks/usePomodoro'

const TimerContainer = styled(motion.div)`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 1200px;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  flex: 1;
`

const TimerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`

const TaskSection = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
`

const MusicSection = styled.div`
  width: 100%;
  max-width: 400px;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 350px;
    flex-shrink: 0;
  }
`

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`

const Timer: React.FC = () => {
  const { state } = usePomodoro()
  const [completedTasks, setCompletedTasks] = useState(0)

  const handleTaskComplete = (completed: boolean) => {
    setCompletedTasks(prev => completed ? prev + 1 : Math.max(0, prev - 1))
  }

  return (
    <TimerContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <StatsPanel
        completedSessions={state.completedSessions}
        completedTasks={completedTasks}
      />
      
      <PageTitle>🍅 PausePad - Cozy Pomodoro Timer</PageTitle>
      
      <ContentWrapper>
        <MainContent>
          <TimerSection>
            <PomodoroTimer />
          </TimerSection>
          
          <TaskSection>
            <TaskManager onTaskComplete={handleTaskComplete} />
          </TaskSection>
        </MainContent>
        
        <MusicSection>
          <YouTubePlayer />
        </MusicSection>
      </ContentWrapper>
    </TimerContainer>
  )
}

export default Timer