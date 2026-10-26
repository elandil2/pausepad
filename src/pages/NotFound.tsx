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
    font-weight: 600;
    color: ${({ theme }) => theme.colors.onBg.secondary};
    text-decoration: underline;
  }
`

const Code = styled.p`
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(5rem, 20vw, 8rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.accent.primary};
  -webkit-text-stroke: 3px ${({ theme }) => theme.colors.ink};
  text-shadow: 6px 6px 0 ${({ theme }) => theme.colors.ink};
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
      <PageTitle>Oops, page not found 🙈</PageTitle>
      <Lead>The link may be broken or the page may have moved.</Lead>
      <PrimaryLink to="/">Go to the timer</PrimaryLink>
      <Link className="secondary" to="/blog">
        Browse the blog
      </Link>
    </Center>
  </>
)

export default NotFound
