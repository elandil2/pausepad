import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const Page = styled.main<{ $narrow?: boolean }>`
  width: 100%;
  max-width: ${({ theme, $narrow }) => ($narrow ? `calc(${theme.layout.proseWidth} + 40px)` : theme.layout.maxWidth)};
  margin: 0 auto;
  padding: 40px 20px 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px 16px 56px;
  }
`

export const PageHeader = styled.header`
  margin-bottom: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 24px;
  }
`

// Small yellow "sticker" label above headings
export const Eyebrow = styled.p`
  display: inline-block;
  margin-bottom: 14px;
  padding: 4px 12px;
  border: ${({ theme }) => theme.borderThin};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.accent.primary};
  box-shadow: ${({ theme }) => theme.shadows.pressed};
  color: ${({ theme }) => theme.colors.ink};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transform: rotate(-2deg);
`

export const displayHeading = css`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.05;
  /* Ink drop shadow keeps headings readable over the backdrop scenery */
  text-shadow: 3px 3px 0 ${({ theme }) => theme.colors.ink};
`

export const PageTitle = styled.h1`
  ${displayHeading}
  font-size: clamp(2.1rem, 1.3rem + 3.4vw, 3.6rem);
  color: ${({ theme }) => theme.colors.onBg.primary};
  text-wrap: balance;
`

export const Lead = styled.p`
  margin-top: 14px;
  max-width: 640px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.onBg.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`

export const cardStyles = css`
  background: ${({ theme }) => theme.colors.surface.base};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  color: ${({ theme }) => theme.colors.text.primary};
`

export const Card = styled.div`
  ${cardStyles}
  padding: 26px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 20px;
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
`

/* Window: a card with a title bar (icon bubble, title, subtitle), like a little app window. */
const WindowFrame = styled.section`
  ${cardStyles}
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
`

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.colors.surface.base};
`

const IconBubble = styled.span<{ $color: string }>`
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: ${({ theme }) => theme.borderThin};
  border-radius: 50%;
  background: ${({ $color }) => $color};
  font-size: 1.15rem;
  line-height: 1;
`

const TitleText = styled.div`
  flex: 1;
  min-width: 0;
  line-height: 1.2;

  h2 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.colors.ink};
  }

  p {
    margin-top: 2px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.muted};
  }
`

const WindowBody = styled.div<{ $tint: boolean; $pad: boolean }>`
  flex: 1;
  padding: ${({ $pad }) => ($pad ? '20px' : '0')};
  background: ${({ theme, $tint }) => ($tint ? theme.colors.surface.tint : theme.colors.surface.base)};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ $pad }) => ($pad ? '16px' : '0')};
  }
`

interface WindowProps {
  icon: string
  iconColor?: string
  title: React.ReactNode
  subtitle?: React.ReactNode
  actions?: React.ReactNode
  tint?: boolean
  padded?: boolean
  headingId?: string
  className?: string
  as?: 'section' | 'article' | 'div'
  children: React.ReactNode
}

export const Window: React.FC<WindowProps> = ({
  icon,
  iconColor = '#ffcf33',
  title,
  subtitle,
  actions,
  tint = false,
  padded = true,
  headingId,
  className,
  as,
  children,
}) => (
  <WindowFrame className={className} as={as} aria-labelledby={headingId}>
    <TitleBar>
      <IconBubble $color={iconColor} aria-hidden="true">
        {icon}
      </IconBubble>
      <TitleText>
        <h2 id={headingId}>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </TitleText>
      {actions}
    </TitleBar>
    <WindowBody $tint={tint} $pad={padded}>
      {children}
    </WindowBody>
  </WindowFrame>
)

export const proseStyles = css`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.0625rem;
  line-height: 1.75;
  overflow-wrap: break-word;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
  }

  h2 {
    margin: 2em 0 0.5em;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.6rem;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.ink};
  }

  h3 {
    margin: 1.6em 0 0.4em;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.ink};
  }

  h2:first-child,
  h3:first-child {
    margin-top: 0;
  }

  p,
  ul,
  ol,
  blockquote {
    margin-bottom: 1.1em;
  }

  ul,
  ol {
    padding-inline-start: 1.4em;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  li {
    margin-bottom: 0.45em;
  }

  li::marker {
    color: ${({ theme }) => theme.colors.bg.primary};
    font-weight: 700;
  }

  strong {
    color: ${({ theme }) => theme.colors.ink};
    font-weight: 700;
  }

  a {
    color: ${({ theme }) => theme.colors.bg.deep};
    font-weight: 600;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
  }

  blockquote {
    padding: 14px 18px;
    border: ${({ theme }) => theme.borderThin};
    border-radius: ${({ theme }) => theme.radius.md};
    background: ${({ theme }) => theme.colors.accent.primary};
    color: ${({ theme }) => theme.colors.ink};
    font-weight: 500;
  }

  table {
    width: 100%;
    margin-bottom: 1.2em;
    border-collapse: collapse;
    font-size: 0.95em;
    display: block;
    overflow-x: auto;
  }

  th,
  td {
    padding: 8px 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.surface.borderSoft};
    text-align: start;
  }

  > :last-child {
    margin-bottom: 0;
  }
`

export const Prose = styled.div`
  ${proseStyles}
`

export const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 22px;
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.full};
  box-shadow: ${({ theme }) => theme.shadows.small};
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 800;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.ink};
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translate(-1px, -1px);
    box-shadow: 4px 4px 0 ${({ theme }) => theme.colors.ink};
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: ${({ theme }) => theme.shadows.pressed};
  }
`

export const PrimaryLink = styled(Link)`
  ${buttonBase}
  background: ${({ theme }) => theme.colors.accent.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.accent.primaryHover};
  }
`

export const SecondaryAnchor = styled.a`
  ${buttonBase}
  background: ${({ theme }) => theme.colors.surface.base};
`
