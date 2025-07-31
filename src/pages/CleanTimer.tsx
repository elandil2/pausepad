import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import CleanPomodoroTimer from '../components/Timer/CleanPomodoroTimer'
import CleanTaskPanel from '../components/Tasks/CleanTaskPanel'
import YouTubePlayer from '../components/Music/YouTubePlayer'

const TimerContainer = styled(motion.div)`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  padding-top: 120px;
  position: relative;
  overflow-y: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 100px;
  }
`

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const TimerSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`

const TaskSection = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    max-width: 500px;
  }
`

const MusicPlayerWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    left: 10px;
    bottom: 10px;
  }
`

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`

const CleanTimer: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState(0)

  const handleTaskComplete = (completed: boolean) => {
    setCompletedTasks(prev => completed ? prev + 1 : Math.max(0, prev - 1))
  }

  // Prevent unused variable warning
  console.log('Completed tasks:', completedTasks)

  return (
    <TimerContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BackgroundOverlay />
      
      <ContentWrapper>
        <MainContent>
          <TimerSection>
            <CleanPomodoroTimer />
          </TimerSection>
          
          <TaskSection>
            <CleanTaskPanel onTaskComplete={handleTaskComplete} />
          </TaskSection>
        </MainContent>
      </ContentWrapper>

      <MusicPlayerWrapper>
        <YouTubePlayer />
      </MusicPlayerWrapper>
    </TimerContainer>
  )
}

export default CleanTimer