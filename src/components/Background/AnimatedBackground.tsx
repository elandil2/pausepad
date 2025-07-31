import React from 'react'
import styled, { keyframes } from 'styled-components'

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
`

const FloatingShape = styled.div<{ size: number; left: number; top: number; delay: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  backdrop-filter: blur(1px);
`

const RotatingShape = styled.div<{ size: number; left: number; top: number; delay: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  border: 2px solid rgba(102, 126, 234, 0.1);
  border-radius: 50%;
  animation: ${rotate} 20s linear infinite;
  animation-delay: ${props => props.delay}s;
`

const AnimatedBackground: React.FC = () => {
  // Generate random shapes
  const floatingShapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 6,
  }))

  const rotatingShapes = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: Math.random() * 150 + 100,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 20,
  }))

  return (
    <BackgroundContainer>
      {floatingShapes.map(shape => (
        <FloatingShape
          key={`float-${shape.id}`}
          size={shape.size}
          left={shape.left}
          top={shape.top}
          delay={shape.delay}
        />
      ))}
      {rotatingShapes.map(shape => (
        <RotatingShape
          key={`rotate-${shape.id}`}
          size={shape.size}
          left={shape.left}
          top={shape.top}
          delay={shape.delay}
        />
      ))}
    </BackgroundContainer>
  )
}

export default AnimatedBackground