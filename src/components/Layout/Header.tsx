import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(15, 15, 35, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: 10px ${({ theme }) => theme.spacing.sm};
  }
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    gap: 6px;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    gap: 4px;
  }
`

const Navigation = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled(Link)<{ $active: boolean }>`
  color: ${({ theme, $active }) => 
    $active ? theme.colors.text.primary : theme.colors.text.secondary};
  text-decoration: none;
  font-weight: ${({ theme, $active }) => 
    $active ? theme.fontWeights.semibold : theme.fontWeights.medium};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: ${({ theme }) => theme.transitions.fast};
  position: relative;
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: ${({ theme }) => theme.gradients.primary};
  border-radius: 1px;
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  min-height: 44px;
  min-width: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const MobileMenu = styled(motion.div)<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(15, 15, 35, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const MobileNavigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const Header: React.FC = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const navItems = [
    { path: '/timer', label: 'Timer', icon: '🍅' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/blog', label: 'Blog', icon: '📝' },
    { path: '/privacy', label: 'Privacy', icon: '🔒' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/timer">
          🍅 PausePad
        </Logo>

        <Navigation>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={item.path}
                to={item.path}
                $active={isActive}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="hide-mobile">{item.icon}</span> {item.label}
                {isActive && (
                  <ActiveIndicator
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </NavLink>
            )
          })}
        </Navigation>

        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </HeaderContent>

      <MobileMenu
        $isOpen={isMobileMenuOpen}
        initial={false}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -10 }}
        transition={{ duration: 0.2 }}
      >
        <MobileNavigation>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={`mobile-${item.path}`}
                to={item.path}
                $active={isActive}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon} {item.label}
              </NavLink>
            )
          })}
        </MobileNavigation>
      </MobileMenu>
    </HeaderContainer>
  )
}

export default Header