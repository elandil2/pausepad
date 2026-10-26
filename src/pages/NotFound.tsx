import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SEO from '../components/SEO'
import { Lead, Page, PageTitle, PrimaryLink } from '../components/Layout/Page'

const Center = styled(Page)`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;

  ${Lead} {
    margin-bottom: 20px;
  }

  a.secondary {
    margin-top: 12px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

const Code = styled.p`
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
  color: ${({ theme }) => theme.colors.accent.primary};
`

const NotFound: React.FC = () => (
  <>
    <SEO
      title="Page not found | PausePad"
      description="The page you are looking for does not exist."
      path="/404"
      robots="noindex, follow"
    />
    <Center $narrow>
      <Code aria-hidden="true">404</Code>
      <PageTitle>Page not found</PageTitle>
      <Lead>The link may be broken or the page may have moved.</Lead>
      <PrimaryLink to="/">Go to the timer</PrimaryLink>
      <Link className="secondary" to="/blog">
        Browse the blog
      </Link>
    </Center>
  </>
)

export default NotFound
