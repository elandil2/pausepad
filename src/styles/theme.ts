export const theme = {
  colors: {
    bg: {
      primary: '#0c0d16',
      secondary: '#13141f',
      elevated: '#191a28',
    },
    surface: {
      base: 'rgba(255, 255, 255, 0.04)',
      raised: 'rgba(255, 255, 255, 0.07)',
      hover: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.09)',
      borderStrong: 'rgba(255, 255, 255, 0.16)',
    },
    text: {
      primary: '#f4f4f8',
      secondary: '#b3b5c8',
      muted: '#8a8ca3',
    },
    accent: {
      primary: '#ff6b5b',
      primaryHover: '#ff7f71',
      success: '#34d399',
      error: '#f87171',
    },
    mode: {
      focus: '#ff6b5b',
      longFocus: '#ff9f43',
      shortBreak: '#38bdf8',
      longBreak: '#34d399',
    },
  },

  fonts: {
    primary: `'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },

  shadows: {
    card: '0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 12px 32px rgba(0, 0, 0, 0.28)',
  },

  transitions: {
    fast: '0.15s ease',
    normal: '0.25s ease',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  layout: {
    maxWidth: '1120px',
    proseWidth: '720px',
    headerHeight: '64px',
  },
} as const

export type Theme = typeof theme
export type TimerModeColor = keyof typeof theme.colors.mode
