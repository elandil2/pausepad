import React from 'react'
import styled from 'styled-components'
import Header from './Header'

const LayoutContainer = styled.div`
  min-height: 100vh;
  position: relative;
  z-index: 1;
`

const MainContent = styled.main`
  position: relative;
  z-index: 2;
  padding-top: 80px; /* Account for fixed header */
  padding-left: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 768px) {
    padding-top: 70px;
    padding-left: ${({ theme }) => theme.spacing.sm};
    padding-right: ${({ theme }) => theme.spacing.sm};
  }
  
  @media (max-width: 480px) {
    padding-top: 65px;
    padding-left: ${({ theme }) => theme.spacing.xs};
    padding-right: ${({ theme }) => theme.spacing.xs};
  }
`

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  )
}

export default MainLayout