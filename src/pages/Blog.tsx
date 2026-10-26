import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SEO from '../components/SEO'
import { Eyebrow, Lead, Page, PageHeader, PageTitle } from '../components/Layout/Page'
import { posts } from '../content/posts'
import { absoluteUrl } from '../config/site'

const Group = styled.section`
  margin-top: 40px;

  > h2 {
    margin-bottom: 16px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text.muted};
  }
`

const Grid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`

const PostCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  padding: 24px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  background: ${({ theme }) => theme.colors.surface.base};
  transition:
    background ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.raised};
    border-color: ${({ theme }) => theme.colors.surface.borderStrong};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: 1.35;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 18px;
  }
`

const Meta = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
`

const Badge = styled.span`
  align-self: flex-start;
  padding: 2px 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: rgba(255, 107, 91, 0.14);
  color: ${({ theme }) => theme.colors.accent.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
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
        <h2 id="en-heading">Guides</h2>
        <Grid>
          {english.map((post) => (
            <li key={post.path}>
              <PostCard to={post.path}>
                <Meta>{post.readMinutes} min read</Meta>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </PostCard>
            </li>
          ))}
        </Grid>
      </Group>

      <Group aria-labelledby="intl-heading">
        <h2 id="intl-heading">Pomodoro guide in other languages</h2>
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
