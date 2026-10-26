import React from 'react'
import styled, { keyframes } from 'styled-components'

// Decorative sticker-style scenery behind the page: sun, clouds, sparkles, a planet and hills.
// Purely visual, so it is hidden from assistive tech and ignores pointer events.

const INK = '#16132b'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const drift = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(26px); }
`

const twinkle = keyframes`
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(0.75) rotate(20deg); }
`

const bob = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;

  > * {
    position: absolute;
  }
`

const Sun = styled.svg`
  top: 92px;
  right: -40px;
  width: clamp(130px, 17vw, 250px);

  .rays {
    transform-origin: 100px 100px;
    animation: ${spin} 80s linear infinite;
  }

  /* On phones only half the sun peeks in from the edge so it never sits behind the heading */
  @media (max-width: 640px) {
    top: 56px;
    right: -42px;
    width: 84px;
  }
`

const Cloud = styled.svg<{ $delay?: string; $duration?: string }>`
  animation: ${drift} ${({ $duration }) => $duration || '9s'} ease-in-out ${({ $delay }) => $delay || '0s'} infinite alternate;
`

const CloudLeft = styled(Cloud)`
  top: 34vh;
  left: -46px;
  width: clamp(130px, 15vw, 230px);

  @media (max-width: 640px) {
    top: 46vh;
    left: -54px;
    width: 120px;
  }
`

const CloudRight = styled(Cloud)`
  top: 68vh;
  right: -30px;
  width: clamp(110px, 12vw, 190px);

  @media (max-width: 640px) {
    top: 78vh;
    width: 96px;
  }
`

const CloudSmall = styled(Cloud)`
  top: 14vh;
  left: 30vw;
  width: clamp(70px, 7vw, 110px);

  @media (max-width: 960px) {
    display: none;
  }
`

const Sparkle = styled.svg<{ $delay: string }>`
  animation: ${twinkle} 3.2s ease-in-out ${({ $delay }) => $delay} infinite;
`

const Planet = styled.svg`
  top: 58vh;
  left: 3vw;
  width: clamp(70px, 7vw, 110px);
  animation: ${bob} 6s ease-in-out infinite;

  @media (max-width: 960px) {
    display: none;
  }
`

const Hills = styled.svg`
  bottom: -2px;
  left: 0;
  width: 100%;
  height: clamp(80px, 14vh, 160px);
`

const CloudShape: React.FC = () => (
  <>
    <path
      d="M38 92c-16 0-28-11-28-25 0-13 11-24 25-24 3-17 18-29 36-29 16 0 30 10 35 24 3-1 6-1 9-1 18 0 32 13 32 29 0 1 0 2 0 3 9 3 15 10 15 19 0 12-11 22-25 22H38z"
      fill="#ffffff"
      stroke={INK}
      strokeWidth="5"
      strokeLinejoin="round"
      transform="translate(0 -8)"
    />
    <path d="M52 70c4 5 12 5 16 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <circle cx="48" cy="58" r="3.5" fill={INK} />
    <circle cx="72" cy="58" r="3.5" fill={INK} />
  </>
)

const SparkleShape: React.FC<{ color: string }> = ({ color }) => (
  <path
    d="M20 2c1.6 9 4 11.4 13 13-9 1.6-11.4 4-13 13-1.6-9-4-11.4-13-13 9-1.6 11.4-4 13-13z"
    fill={color}
    stroke={INK}
    strokeWidth="2.6"
    strokeLinejoin="round"
  />
)

const sparkles = [
  { top: '18vh', left: '6vw', size: 34, color: '#ffcf33', delay: '0s' },
  { top: '46vh', right: '5vw', size: 26, color: '#ffffff', delay: '0.8s' },
  { top: '80vh', left: '12vw', size: 30, color: '#ffffff', delay: '1.6s' },
  { top: '9vh', left: '48vw', size: 22, color: '#ffcf33', delay: '2.2s' },
  { top: '88vh', right: '22vw', size: 24, color: '#ffcf33', delay: '1.1s' },
]

const Backdrop: React.FC = () => (
  <Layer aria-hidden="true">
    <Sun viewBox="0 0 200 200">
      <g className="rays">
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x="92"
            y="4"
            width="16"
            height="34"
            rx="8"
            fill="#ffcf33"
            stroke={INK}
            strokeWidth="4"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}
      </g>
      <circle cx="100" cy="100" r="56" fill="#ffcf33" stroke={INK} strokeWidth="5" />
      <circle cx="78" cy="112" r="9" fill="#ff9f9f" opacity="0.8" />
      <circle cx="122" cy="112" r="9" fill="#ff9f9f" opacity="0.8" />
      <ellipse cx="84" cy="94" rx="5" ry="7" fill={INK} />
      <ellipse cx="116" cy="94" rx="5" ry="7" fill={INK} />
      <path d="M86 116c8 10 20 10 28 0" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    </Sun>

    <CloudLeft viewBox="0 0 170 100">
      <CloudShape />
    </CloudLeft>
    <CloudRight viewBox="0 0 170 100" $delay="-4s" $duration="11s">
      <CloudShape />
    </CloudRight>
    <CloudSmall viewBox="0 0 170 100" $delay="-2s" $duration="13s">
      <CloudShape />
    </CloudSmall>

    <Planet viewBox="0 0 120 100">
      <ellipse cx="60" cy="54" rx="56" ry="15" fill="none" stroke={INK} strokeWidth="5" />
      <circle cx="60" cy="50" r="30" fill="#ff6fb1" stroke={INK} strokeWidth="5" />
      <circle cx="50" cy="40" r="6" fill="#ffffff" opacity="0.6" />
      <path d="M8 56c10 10 94 10 104-2" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    </Planet>

    {sparkles.map(({ size, color, delay, ...pos }, i) => (
      <Sparkle key={i} viewBox="0 0 40 30" width={size} height={size} $delay={delay} style={pos}>
        <SparkleShape color={color} />
      </Sparkle>
    ))}

    <Hills viewBox="0 0 1440 160" preserveAspectRatio="none">
      <path
        d="M0 90C160 40 300 40 470 80s300 60 470 10 320-70 500-20v100H0z"
        fill="#8577f7"
        stroke={INK}
        strokeWidth="4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0 130c180-50 380-60 560-20s340 40 520 0 280-40 360-20v90H0z"
        fill="#5546d6"
        stroke={INK}
        strokeWidth="4"
        vectorEffect="non-scaling-stroke"
      />
    </Hills>
  </Layer>
)

export default Backdrop
