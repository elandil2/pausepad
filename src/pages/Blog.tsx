import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SEO from '../components/SEO'
import { Eyebrow, Lead, Page, PageHeader, PageTitle, cardStyles } from '../components/Layout/Page'
import { posts } from '../content/posts'
import { absoluteUrl } from '../config/site'

const Group = styled.section`
  margin-top: 40px;

  > h2 {
    margin-bottom: 18px;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.onBg.primary};
  }
`

const Grid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

const PostCard = styled(Link)`
  ${cardStyles}
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  padding: 24px;
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0 ${({ theme }) => theme.colors.ink};
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 800;
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.colors.ink};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 18px;
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
`

const Meta = styled.span`
  align-self: flex-start;
  padding: 2px 10px;
  border: ${({ theme }) => theme.borderThin};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.surface.tint};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Badge = styled.span`
  align-self: flex-start;
  padding: 2px 10px;
  border: ${({ theme }) => theme.borderThin};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.accent.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 800;
`

const english = posts.filter((p) => p.lang === 'en')
const international = posts.filter((p) => p.lang !== 'en')

const Blog: React.FC = () => (
  <>
    <SEO
      title="Productivity & Pomodoro Blog | PausePad"
      description="Guides on the Pomodoro technique, focus timers, time management and study habits, in English and 8 other languages."
      path="/blog"
      jsonLd={[
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'PausePad Blog',
          url: absoluteUrl('/blog'),
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: absoluteUrl(p.path),
            datePublished: p.published,
            inLanguage: p.lang,
          })),
        },
      ]}
    />
    <Page>
      <PageHeader>
        <Eyebrow>Blog</Eyebrow>
        <PageTitle>Focus, study & time management</PageTitle>
        <Lead>Practical guides to the Pomodoro technique and building better focus habits.</Lead>
      </PageHeader>

      <Group aria-labelledby="en-heading">
        <h2 id="en-heading">📚 Guides</h2>
        <Grid>
          {english.map((post) => (
            <li key={post.path}>
              <PostCard to={post.path}>
                <Meta>⏱ {post.readMinutes} min read</Meta>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </PostCard>
            </li>
          ))}
        </Grid>
      </Group>

      <Group aria-labelledby="intl-heading">
        <h2 id="intl-heading">🌍 Pomodoro guide in other languages</h2>
        <Grid>
          {international.map((post) => (
            <li key={post.path} lang={post.lang} dir={post.rtl ? 'rtl' : undefined}>
              <PostCard to={post.path}>
                <Badge>{post.languageLabel}</Badge>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </PostCard>
            </li>
          ))}
        </Grid>
      </Group>
    </Page>
  </>
)

export default Blog
