import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import CleanPomodoroTimer from '../components/Timer/CleanPomodoroTimer'
import CleanTaskPanel from '../components/Tasks/CleanTaskPanel'
import YouTubePlayer from '../components/Music/YouTubePlayer'
import SEO from '../components/SEO'

const TimerContainer = styled(motion.div)`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  padding-top: 80px;
  position: relative;
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 70px;
    padding-bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm};
    padding-top: 65px;
    padding-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xs};
    padding-top: 60px;
    padding-bottom: 240px; /* Space for YouTube player */
  }

  @media (max-width: 400px) {
    padding: 8px;
    padding-top: 58px;
    padding-bottom: 250px;
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
    gap: ${({ theme }) => theme.spacing.md};
    align-items: center;
    justify-content: flex-start;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 12px;
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

const SrOnlyHeading = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`

const CleanTimer: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState(0)

  const handleTaskComplete = (completed: boolean) => {
    setCompletedTasks(prev => completed ? prev + 1 : Math.max(0, prev - 1))
  }

  // Prevent unused variable warning
  console.log('Completed tasks:', completedTasks)

  return (
    <>
      <SEO
        title="Free Online Pomodoro Timer with Music & Tasks | PausePad"
        description="Free Pomodoro timer with lofi music, task management, and focus tracking. Boost productivity with 25-minute work sessions and relaxing breaks. No signup required. Perfect for studying and work."
        canonical="/timer"
        keywords="free pomodoro timer, online timer, study timer, focus timer, productivity timer, lofi music timer, task manager, pomodoro technique, work timer, concentration timer"
        schemaType="WebApplication"
      />
      <TimerContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
      <SrOnlyHeading>Free Online Pomodoro Timer with Music and Tasks</SrOnlyHeading>
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
    </>
  )
}

export default CleanTimer
