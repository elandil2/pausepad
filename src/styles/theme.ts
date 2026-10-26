// Playful "sticker" look: purple canvas, white cards with a thick ink outline and a hard offset shadow.
const ink = '#16132b'

export const theme = {
  colors: {
    ink,
    bg: {
      primary: '#6b5bf0',
      deep: '#5546d6',
    },
    // Text that sits directly on the purple canvas
    onBg: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.82)',
    },
    surface: {
      base: '#ffffff',
      tint: '#f1efff',
      raised: '#f1efff',
      hover: '#e6e1ff',
      border: ink,
      borderSoft: '#d9d4f5',
    },
    // Text inside cards
    text: {
      primary: ink,
      secondary: '#4b4669',
      muted: '#7c7799',
    },
    accent: {
      primary: '#ffcf33',
      primaryHover: '#ffd84f',
      success: '#3ecf72',
      error: '#ef4444',
    },
    mode: {
      focus: '#ff7a59',
      shortBreak: '#58d68d',
      longBreak: '#4fb6ff',
      longFocus: '#ff6fb1',
    },
  },

  fonts: {
    display: `'Outfit', 'DM Sans', system-ui, sans-serif`,
    body: `'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif`,
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
    sm: '10px',
    md: '14px',
    lg: '20px',
    xl: '28px',
    full: '9999px',
  },

  border: `3px solid ${ink}`,
  borderThin: `2px solid ${ink}`,

  shadows: {
    card: `6px 6px 0 ${ink}`,
    small: `3px 3px 0 ${ink}`,
    pressed: `1px 1px 0 ${ink}`,
  },

  transitions: {
    fast: '0.12s ease',
    normal: '0.25s ease',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  layout: {
    maxWidth: '1160px',
    proseWidth: '760px',
    headerHeight: '72px',
  },
} as const

export type Theme = typeof theme
export type TimerModeColor = keyof typeof theme.colors.mode
