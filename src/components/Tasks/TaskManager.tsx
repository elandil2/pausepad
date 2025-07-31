import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../UI/GlassCard'
import Button from '../UI/Button'

const TaskContainer = styled(GlassCard)`
  max-width: 400px;
  width: 100%;
`

const TaskHeader = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`

const TaskInputWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const TaskInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    border-color: ${({ theme }) => theme.colors.accent.primary};
  }
`

const AddButton = styled(Button)`
  border-radius: 50px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
`

const TaskList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.spacing.xs};

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent.primary};
    border-radius: 5px;
  }
`

const TaskItem = styled(motion.div)<{ $completed: boolean }>`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: ${({ $completed }) => $completed ? 0.5 : 1};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`

const TaskText = styled.span<{ $completed: boolean }>`
  flex: 1;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: ${({ $completed }) => $completed ? 'line-through' : 'none'};
`

const TaskActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

const TaskButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`

interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

interface TaskManagerProps {
  className?: string
  onTaskComplete?: (completed: boolean) => void
}

const TaskManager: React.FC<TaskManagerProps> = ({ className, onTaskComplete }) => {
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
        // Notify parent component about task completion change
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
        onTaskComplete(false) // Decrement completed count
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
    <TaskContainer className={className} padding="lg">
      <TaskHeader>Today's Tasks ({completedCount}/{tasks.length})</TaskHeader>
      
      <TaskInputWrapper>
        <TaskInput
          type="text"
          placeholder="What are you working on?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <AddButton
          variant="primary"
          size="sm"
          onClick={addTask}
          disabled={!inputValue.trim()}
        >
          Add
        </AddButton>
      </TaskInputWrapper>

      <TaskList>
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              $completed={task.completed}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
            >
              <TaskText $completed={task.completed}>
                {task.text}
              </TaskText>
              <TaskActions>
                <TaskButton
                  onClick={() => toggleTask(task.id)}
                  title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  ✓
                </TaskButton>
                <TaskButton
                  onClick={() => deleteTask(task.id)}
                  title="Delete task"
                >
                  ✕
                </TaskButton>
              </TaskActions>
            </TaskItem>
          ))}
        </AnimatePresence>
        
        {tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '2rem',
              color: 'rgba(255, 255, 255, 0.6)',
              fontStyle: 'italic'
            }}
          >
            No tasks yet. Add one to get started! 🚀
          </motion.div>
        )}
      </TaskList>
    </TaskContainer>
  )
}

export default TaskManager