import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SUPPORT_URL } from '../../config/site'
import { posts } from '../../content/posts'
import Logo from './Logo'

const Wrapper = styled.footer`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: rgba(0, 0, 0, 0.18);
`

const Inner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 40px 20px 24px;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 32px 16px 16px;
  }
`

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  strong {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 1.05rem;
  }

  p {
    max-width: 320px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1 / -1;
  }
`

const Column = styled.div`
  h2 {
    margin-bottom: 10px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text.muted};
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  a {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};

    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`

const Languages = styled.ul`
  && {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px 14px;
  }
`

const Bottom = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 16px 20px 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 8px 16px calc(24px + env(safe-area-inset-bottom));
  }
`

const guides = posts.filter((post) => post.translationGroup === 'pomodoro-guide')

const Footer: React.FC = () => (
  <Wrapper>
    <Inner>
      <Brand>
        <strong>
          <Logo size={22} /> PausePad
        </strong>
        <p>A free, distraction-free Pomodoro timer with tasks and focus music. No sign-up, no ads.</p>
      </Brand>

      <Column>
        <h2>PausePad</h2>
        <ul>
          <li><Link to="/">Pomodoro timer</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/privacy">Privacy</Link></li>
          <li><a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">Buy me a coffee</a></li>
        </ul>
      </Column>

      <Column>
        <h2>Pomodoro guide</h2>
        <Languages>
          {guides.map((post) => (
            <li key={post.path}>
              <Link to={post.path} lang={post.lang}>
                {post.languageLabel}
              </Link>
            </li>
          ))}
        </Languages>
      </Column>
    </Inner>
    <Bottom>
      <span>© {new Date().getFullYear()} PausePad</span>
      <span>Made for deep work</span>
    </Bottom>
  </Wrapper>
)

export default Footer
