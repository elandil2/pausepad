import React from 'react'
import { Helmet } from 'react-helmet-async'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from '../config/site'

const OG_LOCALES: Record<string, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  es: 'es_ES',
  it: 'it_IT',
  ru: 'ru_RU',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ar: 'ar_AR',
  ur: 'ur_PK',
}

interface SEOProps {
  title: string
  description: string
  /** Path of this page, e.g. "/blog". Used for canonical and og:url. */
  path: string
  image?: string
  type?: 'website' | 'article'
  robots?: string
  lang?: string
  dir?: 'ltr' | 'rtl'
  /** hreflang alternates for translated versions of this page. */
  alternates?: { lang: string; path: string }[]
  article?: {
    published: string
    modified?: string
    section?: string
  }
  jsonLd?: object[]
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  robots = 'index, follow, max-image-preview:large',
  lang = 'en',
  dir = 'ltr',
  alternates,
  article,
  jsonLd = [],
}) => {
  const url = absoluteUrl(path)
  const english = alternates?.find((alt) => alt.lang === 'en')

  const articleSchema = article && {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    inLanguage: lang,
    datePublished: article.published,
    dateModified: article.modified || article.published,
    articleSection: article.section,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icons/icon-512x512.png` },
    },
  }

  const schemas = articleSchema ? [articleSchema, ...jsonLd] : jsonLd

  return (
    <Helmet>
      <html lang={lang} dir={dir} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {!robots.includes('noindex') && <link rel="canonical" href={url} />}

      {alternates?.map((alt) => (
        <link key={alt.lang} rel="alternate" hrefLang={alt.lang} href={absoluteUrl(alt.path)} />
      ))}
      {english && <link rel="alternate" hrefLang="x-default" href={absoluteUrl(english.path)} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={OG_LOCALES[lang] || 'en_US'} />
      {article && <meta property="article:published_time" content={article.published} />}
      {article && <meta property="article:modified_time" content={article.modified || article.published} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

export default SEO
