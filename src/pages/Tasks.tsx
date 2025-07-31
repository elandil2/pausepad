import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const TasksContainer = styled(motion.div)`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const TasksCard = styled.div`
  background: ${({ theme }) => theme.colors.glass.bg};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.glass};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Tasks: React.FC = () => {
  return (
    <TasksContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <TasksCard>
        <Title>📝 Task Management</Title>
        <p>Task management system coming soon...</p>
      </TasksCard>
    </TasksContainer>
  )
}

export default Tasks