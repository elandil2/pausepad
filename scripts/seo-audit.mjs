import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value] = arg.split('=')
    return [key.replace(/^--/, ''), value ?? 'true']
  }),
)

const baseUrl = (args.base || 'https://www.pausepad.com').replace(/\/$/, '')
const sitemapUrl = args.sitemap || `${baseUrl}/sitemap.xml`
const maxUrls = Number(args.max || 30)
const timeoutMs = Number(args.timeout || 15000)

const reportDir = path.join(process.cwd(), 'reports')
const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const outputPath = path.join(reportDir, `seo-audit-${stamp}.json`)

const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

const parseSitemapLocs = (xml) => {
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
  return matches.map((m) => m[1].trim())
}

const extractMeta = (html, name) => {
  const regex = new RegExp(
    `<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`,
    'i',
  )
  return html.match(regex)?.[1] || null
}

const extractCanonical = (html) =>
  html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ||
  null

const extractTitle = (html) =>
  html.match(/<title>(.*?)<\/title>/i)?.[1]?.trim() || null

const auditUrl = async (url) => {
  const record = {
    url,
    statusHead: null,
    statusGet: null,
    contentType: null,
    title: null,
    canonical: null,
    robots: null,
    issues: [],
  }

  try {
    const head = await fetchWithTimeout(url, { method: 'HEAD', redirect: 'follow' })
    record.statusHead = head.status
  } catch (err) {
    record.issues.push(`HEAD failed: ${err.message}`)
  }

  try {
    const res = await fetchWithTimeout(url, { method: 'GET', redirect: 'follow' })
    record.statusGet = res.status
    record.contentType = res.headers.get('content-type')
    const text = await res.text()

    if (record.contentType?.includes('text/html')) {
      record.title = extractTitle(text)
      record.canonical = extractCanonical(text)
      record.robots = extractMeta(text, 'robots')
    }
  } catch (err) {
    record.issues.push(`GET failed: ${err.message}`)
  }

  if (record.statusGet !== 200) {
    record.issues.push(`GET is ${record.statusGet}, expected 200`)
  }
  if (record.statusHead !== null && record.statusHead !== 200) {
    record.issues.push(`HEAD is ${record.statusHead}, expected 200`)
  }
  if (record.url.includes('/404') || record.url.includes('not-found')) {
    if (!record.robots?.toLowerCase().includes('noindex')) {
      record.issues.push('404-like URL should be noindex')
    }
  }

  return record
}

const main = async () => {
  const startedAt = new Date().toISOString()
  const sitemapRes = await fetchWithTimeout(sitemapUrl)
  if (!sitemapRes.ok) {
    throw new Error(`Failed to fetch sitemap: ${sitemapRes.status}`)
  }

  const sitemapXml = await sitemapRes.text()
  const urls = parseSitemapLocs(sitemapXml).slice(0, maxUrls)
  const results = []
  for (const url of urls) {
    // Sequential keeps this friendly to hosting/CDN rate limits.
    const item = await auditUrl(url)
    results.push(item)
  }

  const failed = results.filter((r) => r.issues.length > 0)
  const summary = {
    startedAt,
    finishedAt: new Date().toISOString(),
    baseUrl,
    sitemapUrl,
    auditedUrls: results.length,
    failedUrls: failed.length,
    passRate: results.length
      ? `${Math.round(((results.length - failed.length) / results.length) * 100)}%`
      : '0%',
  }

  const report = { summary, results }

  await mkdir(reportDir, { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  console.log(JSON.stringify(summary, null, 2))
  console.log(`Report written: ${outputPath}`)
}

main().catch((err) => {
  console.error(err.message)
  process.exitCode = 1
})
