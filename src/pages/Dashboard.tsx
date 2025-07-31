import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const DashboardContainer = styled(motion.div)`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xl};
`

const WelcomeCard = styled.div`
  background: ${({ theme }) => theme.colors.glass.bg};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
  max-width: 600px;
  box-shadow: ${({ theme }) => theme.shadows.glass};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 800px;
`

const ActionCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.glass.bg};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  }
`

const ActionIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ActionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ActionDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Dashboard: React.FC = () => {
  const quickActions = [
    {
      icon: '🍅',
      title: 'Start Timer',
      description: 'Begin a focused work session',
      action: () => console.log('Start timer')
    },
    {
      icon: '📝',
      title: 'Manage Tasks',
      description: 'Organize your projects and tasks',
      action: () => console.log('Manage tasks')
    },
    {
      icon: '🎵',
      title: 'Play Music',
      description: 'Set the perfect focus atmosphere',
      action: () => console.log('Play music')
    },
    {
      icon: '📊',
      title: 'View Analytics',
      description: 'Track your productivity insights',
      action: () => console.log('View analytics')
    }
  ]

  return (
    <DashboardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <WelcomeCard>
        <Title>Welcome to Pomodore</Title>
        <Subtitle>
          Your modern productivity companion with focus timer, task management, 
          and ambient music to help you achieve deep work and maintain balance.
        </Subtitle>
      </WelcomeCard>

      <QuickActions>
        {quickActions.map((action, index) => (
          <ActionCard
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.action}
          >
            <ActionIcon>{action.icon}</ActionIcon>
            <ActionTitle>{action.title}</ActionTitle>
            <ActionDescription>{action.description}</ActionDescription>
          </ActionCard>
        ))}
      </QuickActions>
    </DashboardContainer>
  )
}

export default Dashboard