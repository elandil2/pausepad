// Single source of truth for the public URL. Switch back to https://www.pausepad.com once the domain is re-registered
// (or set VITE_SITE_URL in Vercel).
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://pausepad.vercel.app').replace(/\/$/, '')
export const SITE_NAME = 'PausePad'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`
export const SUPPORT_URL = 'https://buymeacoffee.com/saficengiz7'

export const absoluteUrl = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)
