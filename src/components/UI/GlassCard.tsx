import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  blur?: number
  opacity?: number
  onClick?: () => void
}

const StyledGlassCard = styled(motion.div)<{
  $hover: boolean
  $padding: string
  $blur: number
  $opacity: number
}>`
  background: rgba(255, 255, 255, ${props => props.$opacity});
  backdrop-filter: blur(${props => props.$blur}px);
  -webkit-backdrop-filter: blur(${props => props.$blur}px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.glass};
  padding: ${({ theme, $padding }) => {
    switch ($padding) {
      case 'sm': return theme.spacing.md
      case 'md': return theme.spacing.lg
      case 'lg': return theme.spacing.xl
      case 'xl': return theme.spacing['2xl']
      default: return theme.spacing.lg
    }
  }};
  transition: ${({ theme }) => theme.transitions.normal};
  cursor: ${props => props.$hover ? 'pointer' : 'default'};
  
  ${props => props.$hover && `
    &:hover {
      background: rgba(255, 255, 255, ${props.$opacity + 0.05});
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-4px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
    }
  `}
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:hover {
      transform: none;
    }
  }
  
  @media (prefers-contrast: high) {
    background: rgba(0, 0, 0, 0.9);
    border: 2px solid ${({ theme }) => theme.colors.text.primary};
  }
`

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hover = false,
  padding = 'lg',
  blur = 10,
  opacity = 0.1,
  onClick,
  ...props
}) => {
  return (
    <StyledGlassCard
      className={className}
      $hover={hover}
      $padding={padding}
      $blur={blur}
      $opacity={opacity}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02 } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </StyledGlassCard>
  )
}

export default GlassCard