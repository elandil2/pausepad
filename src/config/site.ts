// Single source of truth for the public URL. Override with VITE_SITE_URL in Vercel if the domain changes.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.pausepad.com').replace(/\/$/, '')
export const SITE_NAME = 'PausePad'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`
export const SUPPORT_URL = 'https://buymeacoffee.com/saficengiz7'

export const absoluteUrl = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)
