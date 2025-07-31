import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import GlassCard from '../UI/GlassCard'
import { useTheme } from '../../contexts/ThemeContext'

const StatsContainer = styled(GlassCard)`
  position: fixed;
  left: ${({ theme }) => theme.spacing.lg};
  top: ${({ theme }) => theme.spacing.lg};
  z-index: ${({ theme }) => theme.zIndex.docked};
  min-width: 200px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: relative;
    left: auto;
    top: auto;
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`

const StatItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};

  &:last-child {
    margin-bottom: 0;
  }
`

const StatIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  min-width: 30px;
  text-align: center;
`

const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const StatValue = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-left: auto;
`

const Divider = styled.hr`
  margin: ${({ theme }) => theme.spacing.md} 0;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`

const ThemeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md};
`

const ThemeToggle = styled.div<{ $active: boolean }>`
  position: relative;
  width: 50px;
  height: 25px;
  background: ${({ $active, theme }) => 
    $active ? theme.colors.accent.primary : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: ${({ theme }) => theme.spacing.sm};

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    top: 2.5px;
    left: ${({ $active }) => $active ? '27.5px' : '2.5px'};
    transition: all 0.3s ease;
  }
`

interface StatsData {
  pomodoroCount: number
  completedTasksCount: number
  totalMinutes: number
  date: string
}

interface StatsPanelProps {
  className?: string
  completedSessions?: number
  completedTasks?: number
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  className,
  completedSessions = 0,
  completedTasks = 0,
}) => {
  const { isDarkTheme, toggleTheme } = useTheme()
  const [stats, setStats] = useState<StatsData>({
    pomodoroCount: 0,
    completedTasksCount: 0,
    totalMinutes: 0,
    date: new Date().toDateString()
  })

  // Load stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('pausepad-stats')
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats)
        if (parsedStats.date === new Date().toDateString()) {
          setStats(parsedStats)
        }
      } catch (error) {
        console.error('Error loading stats:', error)
      }
    }
  }, [])

  // Update stats when props change
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      pomodoroCount: completedSessions,
      completedTasksCount: completedTasks,
    }))
  }, [completedSessions, completedTasks])

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem('pausepad-stats', JSON.stringify(stats))
  }, [stats])

  const formatTotalTime = (): string => {
    const hours = Math.floor(stats.totalMinutes / 60)
    const minutes = stats.totalMinutes % 60
    return `${hours}h ${minutes}m`
  }

  const handleThemeToggle = () => {
    toggleTheme()
  }

  return (
    <StatsContainer className={className} padding="lg">
      <StatItem
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <StatIcon>🍅</StatIcon>
        <div>
          <StatLabel>Pomodoros</StatLabel>
          <StatValue>{stats.pomodoroCount}</StatValue>
        </div>
      </StatItem>

      <StatItem
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <StatIcon>✅</StatIcon>
        <div>
          <StatLabel>Tasks</StatLabel>
          <StatValue>{stats.completedTasksCount}</StatValue>
        </div>
      </StatItem>

      <StatItem
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <StatIcon>⏱️</StatIcon>
        <div>
          <StatLabel>Time</StatLabel>
          <StatValue>{formatTotalTime()}</StatValue>
        </div>
      </StatItem>

      <Divider />

      <ThemeToggleContainer>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StatIcon>{isDarkTheme ? '🌙' : '☀️'}</StatIcon>
          <StatLabel>Theme</StatLabel>
        </div>
        <ThemeToggle 
          $active={!isDarkTheme} 
          onClick={handleThemeToggle}
        />
      </ThemeToggleContainer>
    </StatsContainer>
  )
}

export default StatsPanel