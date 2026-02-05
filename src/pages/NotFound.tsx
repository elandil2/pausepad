import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SEO from '../components/SEO'

const Wrapper = styled.main`
  min-height: calc(100vh - 90px);
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
`

const Card = styled.section`
  width: 100%;
  max-width: 640px;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.glass.bg};
  border: 1px solid ${({ theme }) => theme.colors.glass.border};
  backdrop-filter: blur(10px);
`

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const Description = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const HomeLink = styled(Link)`
  color: ${({ theme }) => theme.colors.accent.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  &:hover {
    text-decoration: underline;
  }
`

const NotFound: React.FC = () => {
  return (
    <>
      <SEO
        title="404 - Page Not Found | PausePad"
        description="The page you requested could not be found."
        robots="noindex, nofollow"
        schemaType="WebPage"
      />
      <Wrapper>
        <Card>
          <Title>Page not found</Title>
          <Description>The URL may be incorrect or the page may have moved.</Description>
          <HomeLink to="/timer">Go to timer</HomeLink>
        </Card>
      </Wrapper>
    </>
  )
}

export default NotFound
