import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const Page = styled.main<{ $narrow?: boolean }>`
  width: 100%;
  max-width: ${({ theme, $narrow }) => ($narrow ? `calc(${theme.layout.proseWidth} + 40px)` : theme.layout.maxWidth)};
  margin: 0 auto;
  padding: 48px 20px 72px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 28px 16px 56px;
  }
`

export const PageHeader = styled.header`
  margin-bottom: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 24px;
  }
`

export const Eyebrow = styled.p`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent.primary};
`

export const PageTitle = styled.h1`
  font-size: clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem);
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text.primary};
  text-wrap: balance;
`

export const Lead = styled.p`
  margin-top: 14px;
  max-width: 640px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface.base};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 28px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 20px;
    border-radius: ${({ theme }) => theme.radius.md};
  }
`

export const proseStyles = css`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.0625rem;
  line-height: 1.75;
  overflow-wrap: break-word;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
  }

  h2 {
    margin: 2.2em 0 0.6em;
    font-size: 1.5rem;
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  h3 {
    margin: 1.8em 0 0.5em;
    font-size: 1.2rem;
    line-height: 1.35;
    color: ${({ theme }) => theme.colors.text.primary};
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
    color: ${({ theme }) => theme.colors.accent.primary};
  }

  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
  }

  a {
    color: ${({ theme }) => theme.colors.accent.primary};
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  blockquote {
    padding: 12px 18px;
    border-inline-start: 3px solid ${({ theme }) => theme.colors.accent.primary};
    background: ${({ theme }) => theme.colors.surface.base};
    border-radius: 0 ${({ theme }) => theme.radius.sm} ${({ theme }) => theme.radius.sm} 0;
    font-style: italic;
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
    border-bottom: 1px solid ${({ theme }) => theme.colors.surface.border};
    text-align: start;
  }

  > :last-child {
    margin-bottom: 0;
  }
`

export const Prose = styled.div`
  ${proseStyles}
`

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 22px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition:
    background ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  &:active {
    transform: translateY(1px);
  }
`

export const PrimaryLink = styled(Link)`
  ${buttonBase}
  background: ${({ theme }) => theme.colors.accent.primary};
  color: #1b0d0b;

  &:hover {
    background: ${({ theme }) => theme.colors.accent.primaryHover};
  }
`

export const SecondaryAnchor = styled.a`
  ${buttonBase}
  background: ${({ theme }) => theme.colors.surface.raised};
  border: 1px solid ${({ theme }) => theme.colors.surface.borderStrong};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.hover};
  }
`
