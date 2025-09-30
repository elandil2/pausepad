import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  keywords?: string
  schemaType?: 'WebApplication' | 'Article' | 'WebPage'
  articleData?: {
    author?: string
    publishedTime?: string
    modifiedTime?: string
    section?: string
    tags?: string[]
  }
}

const SEO: React.FC<SEOProps> = ({
  title = "PausePad - Free Online Pomodoro Timer with Music",
  description = "Free online Pomodoro timer with lofi music, task management, and focus tracking. Boost productivity with 25-minute work sessions and relaxing breaks. Perfect for studying and work.",
  canonical,
  ogImage = "https://pausepad.com/og-image.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  keywords = "pomodoro timer, focus timer, study timer, productivity timer, task manager",
  schemaType = 'WebApplication',
  articleData
}) => {
  const siteUrl = "https://www.pausepad.com"
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl

  // Generate structured data based on schema type
  const generateStructuredData = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "name": "PausePad",
      "url": fullCanonical,
      "description": description,
      "image": ogImage
    }

    if (schemaType === 'WebApplication') {
      return {
        ...baseSchema,
        "@type": "WebApplication",
        "applicationCategory": "ProductivityApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Pomodoro Timer",
          "Task Management",
          "Lofi Music Player",
          "Focus Tracking",
          "Break Reminders"
        ],
        "browserRequirements": "Requires JavaScript. Requires HTML5."
      }
    }

    if (schemaType === 'Article' && articleData) {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": ogImage,
        "author": {
          "@type": "Organization",
          "name": articleData.author || "PausePad"
        },
        "publisher": {
          "@type": "Organization",
          "name": "PausePad",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.pausepad.com/logo.png"
          }
        },
        "datePublished": articleData.publishedTime,
        "dateModified": articleData.modifiedTime || articleData.publishedTime,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": fullCanonical
        },
        "articleSection": articleData.section,
        "keywords": articleData.tags?.join(', ')
      }
    }

    return baseSchema
  }

  const structuredData = generateStructuredData()

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="PausePad" />
      <meta property="og:locale" content="en_US" />

      {/* Article specific OG tags */}
      {articleData && (
        <>
          <meta property="article:published_time" content={articleData.publishedTime} />
          <meta property="article:modified_time" content={articleData.modifiedTime || articleData.publishedTime} />
          <meta property="article:author" content={articleData.author || "PausePad"} />
          {articleData.section && <meta property="article:section" content={articleData.section} />}
          {articleData.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="theme-color" content="#667eea" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Additional Organization Schema */}
      {schemaType === 'WebApplication' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PausePad",
            "url": "https://www.pausepad.com",
            "logo": "https://www.pausepad.com/logo.png",
            "sameAs": []
          })}
        </script>
      )}
    </Helmet>
  )
}

export default SEO