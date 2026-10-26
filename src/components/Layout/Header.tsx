import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Logo from './Logo'

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.bg.primary};
  border-bottom: ${({ theme }) => theme.border};
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
    height: 60px;
    padding: 0 16px;
  }
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.onBg.primary};

  svg {
    border: ${({ theme }) => theme.borderThin};
    border-radius: 50%;
    background: #fff;
    padding: 2px;
    box-shadow: ${({ theme }) => theme.shadows.pressed};
  }
`

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

const Item = styled(NavLink)`
  padding: 7px 16px;
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.radius.full};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.onBg.primary};
  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.16);
  }

  &.active {
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.surface.base};
    border: ${({ theme }) => theme.borderThin};
    box-shadow: ${({ theme }) => theme.shadows.pressed};
  }
`

const MenuButton = styled.button`
  display: none;
  width: 44px;
  height: 44px;
  margin-right: -4px;
  border: ${({ theme }) => theme.borderThin};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface.base};
  box-shadow: ${({ theme }) => theme.shadows.pressed};
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.ink};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: inline-flex;
  }
`

const MobilePanel = styled.nav`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px 16px 18px;
    border-top: ${({ theme }) => theme.border};
    background: ${({ theme }) => theme.colors.bg.deep};

    ${Item} {
      padding: 12px 16px;
      border-radius: ${({ theme }) => theme.radius.md};
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }
  }
`

const navItems = [
  { to: '/', label: 'Timer', end: true },
  { to: '/how-it-works', label: 'How it works', end: true },
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
