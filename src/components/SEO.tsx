import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
}

const SEO: React.FC<SEOProps> = ({
  title = "PausePad - Modern Pomodoro Timer",
  description = "Modern Pomodoro timer for focused studying, relaxing breaks, and chill work sessions. Boost productivity with timed focus intervals and integrated music.",
  canonical,
  ogImage = "https://pausepad.com/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image"
}) => {
  const siteUrl = "https://pausepad.com"
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="PausePad" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#667eea" />
    </Helmet>
  )
}

export default SEO