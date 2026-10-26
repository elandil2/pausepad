import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import SEO from './SEO'
import { Page, PrimaryLink, cardStyles, displayHeading, proseStyles } from './Layout/Page'
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
  margin-bottom: 22px;
  padding: 6px 14px;
  border: ${({ theme }) => theme.borderThin};
  border-radius: ${({ theme }) => theme.radius.full};
  background: #fff;
  box-shadow: ${({ theme }) => theme.shadows.pressed};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`

const Title = styled.h1`
  ${displayHeading}
  font-size: clamp(2rem, 1.3rem + 3vw, 3.2rem);
  color: ${({ theme }) => theme.colors.onBg.primary};
  text-wrap: balance;
`

const Meta = styled.p`
  margin: 14px 0 28px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onBg.secondary};
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
  ${cardStyles}
  ${proseStyles}
  padding: 36px 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 22px 18px;
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
`

const Cta = styled.div`
  ${cardStyles}
  margin-top: 40px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: ${({ theme }) => theme.colors.accent.primary};

  h2 {
    font-size: 1.4rem;
    font-weight: 900;
    margin-bottom: 4px;
  }

  p {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  a {
    background: #fff;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    padding: 20px;
  }
`

const More = styled.nav`
  margin-top: 48px;

  h2 {
    margin-bottom: 16px;
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.onBg.primary};
  }

  ul {
    list-style: none;
    display: grid;
    gap: 12px;
  }

  a {
    ${cardStyles}
    display: block;
    padding: 16px 20px;
    box-shadow: ${({ theme }) => theme.shadows.small};
    font-weight: 700;
    transition: transform ${({ theme }) => theme.transitions.fast};

    &:hover {
      transform: translate(-2px, -2px);
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
          <h2>Try the free Pomodoro timer 🍅</h2>
          <p>25-minute focus sessions, a task list and lofi music. No sign-up.</p>
        </div>
        <PrimaryLink to="/">Start focusing</PrimaryLink>
      </Cta>

      <More aria-label="More articles">
        <h2>Keep reading 📚</h2>
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
