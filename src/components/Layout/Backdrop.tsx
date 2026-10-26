import React from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../../styles/theme'

// Decorative night sky behind the page: gradient sky, sleepy moon, twinkling stars, a shooting star,
// sleepy clouds, a planet and hill silhouettes. Purely visual, so it is hidden from assistive tech.

const INK = theme.colors.ink
const { night } = theme.colors

const twinkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.25; transform: scale(0.6); }
`

const sparkle = keyframes`
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(0.7) rotate(25deg); }
`

const drift = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(22px); }
`

const bob = keyframes`
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(-10px) rotate(4deg); }
`

const shoot = keyframes`
  0% { opacity: 0; transform: rotate(28deg) translateX(0); }
  3% { opacity: 1; }
  11% { opacity: 0; transform: rotate(28deg) translateX(420px); }
  100% { opacity: 0; transform: rotate(28deg) translateX(420px); }
`

const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: linear-gradient(180deg, ${night.top} 0%, ${night.mid} 55%, ${night.bottom} 100%);

  > * {
    position: absolute;
  }
`

const Star = styled.span`
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 8px 1px rgba(255, 255, 255, 0.85);
  animation: ${twinkle} ease-in-out infinite;
`

const Sparkle = styled.svg`
  animation: ${sparkle} 3.4s ease-in-out infinite;
`

const ShootingStar = styled.span`
  top: 14vh;
  left: 18vw;
  width: 140px;
  height: 3px;
  border-radius: 3px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), #fff);
  transform-origin: left center;
  animation: ${shoot} 11s ease-in 2s infinite;
  opacity: 0;

  &::after {
    content: '';
    position: absolute;
    right: -3px;
    top: -3px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.8);
  }
`

const Moon = styled.svg`
  /* Sits in the gutter to the right of the timer window on wide screens */
  top: 84px;
  right: 1vw;
  width: clamp(110px, 10vw, 160px);
  animation: ${bob} 9s ease-in-out infinite;

  @media (max-width: 640px) {
    top: 64px;
    right: -24px;
    width: 74px;
  }
`

const Cloud = styled.svg<{ $delay?: string; $duration?: string }>`
  animation: ${drift} ${({ $duration }) => $duration || '10s'} ease-in-out ${({ $delay }) => $delay || '0s'} infinite alternate;

  /* On phones the content fills the width, so clouds would only show as cut-off blobs */
  @media (max-width: 960px) {
    display: none;
  }
`

const CloudLeft = styled(Cloud)`
  top: 40vh;
  left: -24px;
  width: clamp(130px, 13vw, 210px);
`

const CloudRight = styled(Cloud)`
  top: 66vh;
  right: 1vw;
  width: clamp(110px, 11vw, 180px);
`

const Planet = styled.svg`
  top: 64vh;
  left: 4vw;
  width: clamp(70px, 6vw, 100px);
  animation: ${bob} 7s ease-in-out infinite;

  @media (max-width: 960px) {
    display: none;
  }
`

const Hills = styled.svg`
  bottom: -2px;
  left: 0;
  width: 100%;
  height: clamp(70px, 12vh, 140px);
`

// Deterministic pseudo-random star field so server and client render the same sky.
const rand = (() => {
  let seed = 42
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
})()

const stars = Array.from({ length: 90 }, () => ({
  top: `${(rand() * 88).toFixed(2)}%`,
  left: `${(rand() * 100).toFixed(2)}%`,
  size: 2 + rand() * 3,
  duration: `${(2.5 + rand() * 3.5).toFixed(2)}s`,
  delay: `${(-rand() * 5).toFixed(2)}s`,
}))

const sparkles = [
  { top: '16vh', left: '5vw', size: 42, color: '#ffcf33', delay: '0s' },
  { top: '30vh', right: '16vw', size: 30, color: '#ffffff', delay: '0.7s' },
  { top: '52vh', right: '4vw', size: 36, color: '#ffcf33', delay: '1.4s' },
  { top: '78vh', left: '10vw', size: 34, color: '#ffffff', delay: '2.1s' },
  { top: '8vh', left: '44vw', size: 22, color: '#ffffff', delay: '1s' },
  { top: '86vh', right: '24vw', size: 26, color: '#ffcf33', delay: '2.6s' },
  { top: '24vh', left: '24vw', size: 18, color: '#ffcf33', delay: '0.4s' },
]

const SleepyCloud: React.FC = () => (
  <>
    <path
      d="M38 84c-16 0-28-11-28-25 0-13 11-24 25-24 3-17 18-29 36-29 16 0 30 10 35 24 3-1 6-1 9-1 18 0 32 13 32 29v3c9 3 15 10 15 19 0 12-11 22-25 22H38z"
      fill="#cbc2ff"
      stroke={INK}
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <path d="M42 56q6 5 12 0M68 56q6 5 12 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <path d="M54 68q6 4 12 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
  </>
)

const Backdrop: React.FC = () => (
  <Layer aria-hidden="true">
    {stars.map((s, i) => (
      <Star
        key={i}
        style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDuration: s.duration, animationDelay: s.delay }}
      />
    ))}

    <ShootingStar />

    {sparkles.map(({ size, color, delay, ...pos }, i) => (
      <Sparkle key={i} viewBox="0 0 40 40" width={size} height={size} style={{ ...pos, animationDelay: delay }}>
        <path
          d="M20 2c1.8 10.5 5.5 14.2 16 16-10.5 1.8-14.2 5.5-16 16-1.8-10.5-5.5-14.2-16-16 10.5-1.8 14.2-5.5 16-16z"
          fill={color}
          stroke={INK}
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
      </Sparkle>
    ))}

    <Moon viewBox="0 0 200 180">
      <path
        d="M102.8 40.1A60 60 0 1 0 154.2 125.8A50 50 0 0 1 102.8 40.1Z"
        fill="#ffe27a"
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <circle cx="60" cy="112" r="6" fill="#ffb3b3" opacity="0.85" />
      <path d="M53 94q7 6 14 0" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M62 124q6 4 12 -1" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      {/* Sleepy "z z", drawn as strokes so they don't depend on a font */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M140 22h16l-16 18h16" stroke={INK} strokeWidth="9" />
        <path d="M140 22h16l-16 18h16" stroke="#fff" strokeWidth="4" />
        <path d="M166 4h11l-11 12h11" stroke={INK} strokeWidth="8" />
        <path d="M166 4h11l-11 12h11" stroke="#fff" strokeWidth="3.5" />
      </g>
    </Moon>

    <CloudLeft viewBox="0 0 170 92">
      <SleepyCloud />
    </CloudLeft>
    <CloudRight viewBox="0 0 170 92" $delay="-5s" $duration="12s">
      <SleepyCloud />
    </CloudRight>

    <Planet viewBox="0 0 120 100">
      <ellipse cx="60" cy="54" rx="56" ry="15" fill="none" stroke={INK} strokeWidth="5" />
      <circle cx="60" cy="50" r="30" fill="#ff6fb1" stroke={INK} strokeWidth="5" />
      <circle cx="50" cy="40" r="6" fill="#ffffff" opacity="0.6" />
      <path d="M8 56c10 10 94 10 104-2" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    </Planet>

    <Hills viewBox="0 0 1440 160" preserveAspectRatio="none">
      <path
        d="M0 90C160 40 300 40 470 80s300 60 470 10 320-70 500-20v100H0z"
        fill="#2c2186"
        stroke={INK}
        strokeWidth="4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0 130c180-50 380-60 560-20s340 40 520 0 280-40 360-20v90H0z"
        fill="#1d1562"
        stroke={INK}
        strokeWidth="4"
        vectorEffect="non-scaling-stroke"
      />
    </Hills>
  </Layer>
)

export default Backdrop
