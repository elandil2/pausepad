import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

const TaskPanelContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  max-height: 80vh;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px;
  z-index: 100;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: relative;
    right: auto;
    top: auto;
    transform: none;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    margin-top: ${({ theme }) => theme.spacing.xl};
  }
`

const TaskHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const TaskTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`

const TaskCount = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
`

const TaskInputContainer = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const TaskInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: all 0.2s ease;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.08);
  }
`

const AddButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #667eea;
  border: none;
  border-radius: 8px;
  color: white;
  padding: 8px 12px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #5a6fd8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const TaskList = styled.div`
  max-height: 400px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`

const TaskItem = styled(motion.div)<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`

const TaskCheckbox = styled.button<{ $completed: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ $completed }) => $completed ? '#667eea' : 'rgba(255, 255, 255, 0.3)'};
  background: ${({ $completed }) => $completed ? '#667eea' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &:hover {
    border-color: #667eea;
  }
  
  &::after {
    content: '✓';
    color: white;
    font-size: 12px;
    opacity: ${({ $completed }) => $completed ? 1 : 0};
    transition: opacity 0.2s ease;
  }
`

const TaskText = styled.span<{ $completed: boolean }>`
  flex: 1;
  color: ${({ theme, $completed }) => 
    $completed ? theme.colors.text.muted : theme.colors.text.primary};
  text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: ${({ $completed }) => $completed ? 0.6 : 1};
  transition: all 0.2s ease;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.muted};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  opacity: 0;
  transition: all 0.2s ease;
  
  ${TaskItem}:hover & {
    opacity: 1;
  }
  
  &:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

interface CleanTaskPanelProps {
  className?: string
  onTaskComplete?: (completed: boolean) => void
}

const CleanTaskPanel: React.FC<CleanTaskPanelProps> = ({ 
  className, 
  onTaskComplete 
}) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState('')

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('pausepad-tasks')
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }))
        setTasks(parsedTasks)
      } catch (error) {
        console.error('Error loading tasks:', error)
      }
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('pausepad-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    const trimmedText = inputValue.trim()
    if (trimmedText) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: trimmedText,
        completed: false,
        createdAt: new Date()
      }
      setTasks(prev => [...prev, newTask])
      setInputValue('')
    }
  }

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: !task.completed }
        if (onTaskComplete) {
          onTaskComplete(updatedTask.completed)
        }
        return updatedTask
      }
      return task
    }))
  }

  const deleteTask = (taskId: string) => {
    setTasks(prev => {
      const taskToDelete = prev.find(task => task.id === taskId)
      if (taskToDelete?.completed && onTaskComplete) {
        onTaskComplete(false)
      }
      return prev.filter(task => task.id !== taskId)
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const completedCount = tasks.filter(task => task.completed).length

  return (
    <TaskPanelContainer className={className}>
      <TaskHeader>
        <TaskTitle>Tasks</TaskTitle>
        <TaskCount>{completedCount}/{tasks.length}</TaskCount>
      </TaskHeader>
      
      <TaskInputContainer>
        <TaskInput
          type="text"
          placeholder="Add here the task you will focus on"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <AddButton
          onClick={addTask}
          disabled={!inputValue.trim()}
        >
          Add
        </AddButton>
      </TaskInputContainer>

      <TaskList>
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              $completed={task.completed}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
            >
              <TaskCheckbox
                $completed={task.completed}
                onClick={() => toggleTask(task.id)}
              />
              <TaskText $completed={task.completed}>
                {task.text}
              </TaskText>
              <DeleteButton
                onClick={() => deleteTask(task.id)}
              >
                ✕
              </DeleteButton>
            </TaskItem>
          ))}
        </AnimatePresence>
        
        {tasks.length === 0 && (
          <EmptyState>
            No tasks yet. Add one to get started! 🎯
          </EmptyState>
        )}
      </TaskList>
    </TaskPanelContainer>
  )
}

export default CleanTaskPanel