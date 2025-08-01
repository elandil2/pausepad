import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const StyledButton = styled(motion.button)<{
  $variant: string
  $size: string
  $disabled: boolean
  $loading: boolean
}>`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: ${props => props.$disabled || props.$loading ? 'not-allowed' : 'pointer'};
  transition: ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;
  
  /* Size variants */
  ${({ theme, $size }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSizes.sm};
          min-height: 36px;
        `
      case 'md':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.fontSizes.base};
          min-height: 44px;
        `
      case 'lg':
        return `
          padding: ${theme.spacing.lg} ${theme.spacing.xl};
          font-size: ${theme.fontSizes.lg};
          min-height: 48px;
        `
      default:
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.fontSizes.base};
          min-height: 44px;
        `
    }
  }}
  
  /* Mobile touch optimizations */
  @media (max-width: 768px) {
    ${({ $size }) => {
      switch ($size) {
        case 'sm':
          return `min-height: 40px;`
        case 'md':
          return `min-height: 48px;`
        case 'lg':
          return `min-height: 52px;`
        default:
          return `min-height: 48px;`
      }
    }}
  }
  
  /* Variant styles */
  ${({ theme, $variant, $disabled, $loading }) => {
    const opacity = $disabled || $loading ? 0.5 : 1
    
    switch ($variant) {
      case 'primary':
        return `
          background: ${theme.gradients.primary};
          color: ${theme.colors.text.primary};
          opacity: ${opacity};
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.lg};
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `
      case 'secondary':
        return `
          background: ${theme.colors.glass.bg};
          color: ${theme.colors.text.primary};
          border: 1px solid ${theme.colors.glass.border};
          backdrop-filter: blur(10px);
          opacity: ${opacity};
          
          &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-1px);
          }
        `
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.text.secondary};
          opacity: ${opacity};
          
          &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.1);
            color: ${theme.colors.text.primary};
          }
        `
      case 'danger':
        return `
          background: ${theme.gradients.error};
          color: ${theme.colors.text.primary};
          opacity: ${opacity};
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.lg};
          }
          
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `
      default:
        return `
          background: ${theme.gradients.primary};
          color: ${theme.colors.text.primary};
          opacity: ${opacity};
        `
    }
  }}
  
  /* Focus styles for accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent.primary};
    outline-offset: 2px;
  }
  
  /* Disabled state */
  &:disabled {
    transform: none !important;
    box-shadow: none !important;
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    
    &:hover:not(:disabled) {
      transform: none;
    }
    
    &:active:not(:disabled) {
      transform: none;
    }
  }
  
  @media (prefers-contrast: high) {
    border: 2px solid ${({ theme }) => theme.colors.text.primary};
  }
  
  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    &:hover:not(:disabled) {
      transform: none;
    }
    
    &:active:not(:disabled) {
      transform: scale(0.95);
      transition: transform 0.1s ease;
    }
  }
`

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: ${({ theme }) => theme.spacing.sm};
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const ButtonContent = styled.span<{ $loading: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$loading ? 0.7 : 1};
`

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className,
  type = 'button',
  ...props
}) => {
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick()
    }
  }

  return (
    <StyledButton
      className={className}
      $variant={variant}
      $size={size}
      $disabled={disabled}
      $loading={loading}
      disabled={disabled || loading}
      onClick={handleClick}
      type={type}
      whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
      {...props}
    >
      <ButtonContent $loading={loading}>
        {loading && <LoadingSpinner />}
        {children}
      </ButtonContent>
    </StyledButton>
  )
}

export default Button