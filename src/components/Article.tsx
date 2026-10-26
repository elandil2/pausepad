import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import SEO from './SEO'
import { Card, Page, PrimaryLink, proseStyles } from './Layout/Page'
import { getPost, getTranslations, posts } from '../content/posts'
import { absoluteUrl } from '../config/site'

const formatDate = (iso: string, lang: string) => {
  try {
    return new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(
      new Date(iso),
    )
  } catch {
    return iso
  }
}

const usePost = () => getPost(useLocation().pathname)

const READ_LABEL: Record<string, string> = {
  en: 'min read',
  tr: 'dk okuma',
  es: 'min de lectura',
  it: 'min di lettura',
  ru: 'мин чтения',
  hi: 'मिनट पढ़ें',
  zh: '分钟阅读',
  ar: 'دقائق قراءة',
  ur: 'منٹ مطالعہ',
}

export const PostSEO: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  const post = usePost()
  if (!post) return null
  const translations = getTranslations(post)

  return (
    <SEO
      title={title}
      description={description}
      path={post.path}
      type="article"
      lang={post.lang}
      alternates={translations.length > 1 ? translations.map((p) => ({ lang: p.lang, path: p.path })) : undefined}
      article={{ published: post.published, section: 'Productivity' }}
      jsonLd={[
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'PausePad', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
            { '@type': 'ListItem', position: 3, name: post.title },
          ],
        },
      ]}
    />
  )
}

const ArticleBody = styled.article`
  display: flex;
  flex-direction: column;
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const BackLink = styled(Link)`
  align-self: flex-start;
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.muted};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

const Title = styled.h1`
  font-size: clamp(1.75rem, 1.2rem + 2.4vw, 2.6rem);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text.primary};
  text-wrap: balance;
`

const Meta = styled.p`
  margin: 14px 0 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.border};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`

export const PageTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const post = usePost()
  return (
    <>
      <Title>{children}</Title>
      {post && (
        <Meta>
          <time dateTime={post.published}>{formatDate(post.published, post.lang)}</time>
          {' · '}
          {post.readMinutes} {READ_LABEL[post.lang] || READ_LABEL.en}
        </Meta>
      )}
    </>
  )
}

export const BlogCard = styled.div`
  ${proseStyles}
`

const Cta = styled(Card)`
  margin-top: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: linear-gradient(135deg, rgba(255, 107, 91, 0.14), rgba(255, 107, 91, 0.04));
  border-color: rgba(255, 107, 91, 0.28);

  h2 {
    font-size: 1.2rem;
    margin-bottom: 4px;
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
`

const More = styled.nav`
  margin-top: 48px;

  h2 {
    margin-bottom: 14px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.text.muted};
  }

  ul {
    list-style: none;
    display: grid;
    gap: 10px;
  }

  a {
    display: block;
    padding: 14px 18px;
    border-radius: ${({ theme }) => theme.radius.md};
    border: 1px solid ${({ theme }) => theme.colors.surface.border};
    background: ${({ theme }) => theme.colors.surface.base};
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 500;
    transition: background ${({ theme }) => theme.transitions.fast};

    &:hover {
      background: ${({ theme }) => theme.colors.surface.raised};
    }
  }
`

export const BlogContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const post = usePost()
  const related = posts.filter((p) => p.lang === 'en' && p.path !== post?.path).slice(0, 3)

  return (
    <Page $narrow>
      <ArticleBody lang={post?.lang} dir={post?.rtl ? 'rtl' : undefined}>
        {children}
      </ArticleBody>

      <Cta>
        <div>
          <h2>Try the free Pomodoro timer</h2>
          <p>25-minute focus sessions, a task list and lofi music. No sign-up.</p>
        </div>
        <PrimaryLink to="/">Start focusing</PrimaryLink>
      </Cta>

      <More aria-label="More articles">
        <h2>Keep reading</h2>
        <ul>
          {related.map((p) => (
            <li key={p.path}>
              <Link to={p.path}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </More>
    </Page>
  )
}
