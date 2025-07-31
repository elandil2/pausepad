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