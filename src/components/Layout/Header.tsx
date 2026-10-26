import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Logo from './Logo'

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(12, 13, 22, 0.8);
  backdrop-filter: saturate(160%) blur(16px);
  -webkit-backdrop-filter: saturate(160%) blur(16px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.border};
`

const Inner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: ${({ theme }) => theme.layout.headerHeight};
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 56px;
    padding: 0 16px;
  }
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text.primary};
`

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

const Item = styled(NavLink)`
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.surface.raised};
  }

  &.active {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.surface.hover};
  }
`

const MenuButton = styled.button`
  display: none;
  width: 44px;
  height: 44px;
  margin-right: -10px;
  border-radius: ${({ theme }) => theme.radius.md};
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.raised};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: inline-flex;
  }
`

const MobilePanel = styled.nav`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 12px 16px;
    border-top: 1px solid ${({ theme }) => theme.colors.surface.border};

    ${Item} {
      padding: 12px 14px;
      border-radius: ${({ theme }) => theme.radius.md};
      font-size: ${({ theme }) => theme.fontSizes.base};
    }
  }
`

const navItems = [
  { to: '/', label: 'Timer', end: true },
  { to: '/blog', label: 'Blog', end: false },
  { to: '/about', label: 'About', end: true },
]

const Header: React.FC = () => {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <Bar>
      <Inner>
        <Brand to="/" aria-label="PausePad home">
          <Logo />
          PausePad
        </Brand>

        <DesktopNav aria-label="Main">
          {navItems.map((item) => (
            <Item key={item.to} to={item.to} end={item.end}>
              {item.label}
            </Item>
          ))}
        </DesktopNav>

        <MenuButton
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </MenuButton>
      </Inner>

      {open && (
        <MobilePanel id="mobile-nav" aria-label="Main">
          {navItems.map((item) => (
            <Item key={item.to} to={item.to} end={item.end}>
              {item.label}
            </Item>
          ))}
        </MobilePanel>
      )}
    </Bar>
  )
}

export default Header
