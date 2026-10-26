// Renders every route to static HTML after `vite build`, so crawlers and link previews get real content.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8')
const { render, routes, posts, getTranslations, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

const toFile = (route) => (route === '/' ? 'index.html' : `${route.replace(/^\//, '')}.html`)

const renderPage = (url) => {
  const { html, styles, head, htmlAttributes } = render(url)
  return template
    .replace(/<html[^>]*>/, `<html ${htmlAttributes}>`)
    .replace(/<!--app-head-->[\s\S]*?<!--\/app-head-->/, head)
    .replace('</head>', `${styles}</head>`)
    .replace('<!--app-html-->', html)
}

const pages = routes.filter((r) => r.path !== '*')
for (const route of pages) {
  const file = path.join(dist, toFile(route.path))
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, renderPage(route.path))
}
fs.writeFileSync(path.join(dist, '404.html'), renderPage('/404'))

// Sitemap with hreflang alternates for translated posts.
const today = new Date().toISOString().slice(0, 10)
const abs = (p) => (p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`)
const urls = pages
  .filter((r) => r.priority !== undefined)
  .map((r) => {
    const post = posts.find((p) => p.path === r.path)
    const translations = post ? getTranslations(post) : []
    const alternates =
      translations.length > 1
        ? [
            ...translations.map((t) => `    <xhtml:link rel="alternate" hreflang="${t.lang}" href="${abs(t.path)}" />`),
            `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(translations.find((t) => t.lang === 'en').path)}" />`,
          ].join('\n') + '\n'
        : ''
    return `  <url>
    <loc>${abs(r.path)}</loc>
    <lastmod>${post ? post.published : today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
${alternates}  </url>`
  })

fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`,
)

fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
)

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`Prerendered ${pages.length} pages + 404, sitemap.xml and robots.txt for ${SITE_URL}`)
