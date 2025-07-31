export const theme = {
  colors: {
    // Background colors
    bg: {
      primary: '#0f0f23',
      secondary: '#1a1a2e',
      tertiary: '#16213e',
      glass: 'rgba(255, 255, 255, 0.1)',
    },
    
    // Text colors
    text: {
      primary: '#ffffff',
      secondary: '#b8b8b8',
      muted: '#888888',
    },
    
    // Accent colors
    accent: {
      primary: '#667eea',
      secondary: '#764ba2',
      success: '#4ade80',
      warning: '#fbbf24',
      error: '#ef4444',
      info: '#3b82f6',
    },
    
    // Timer state colors
    timer: {
      focus: '#f093fb',
      shortBreak: '#4facfe',
      longBreak: '#43e97b',
      paused: '#fbbf24',
    },
    
    // Glass effect
    glass: {
      bg: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    },
  },
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    focus: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    break: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    success: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
    warning: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  },
  
  // Typography
  fonts: {
    primary: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif`,
    mono: `'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', 
      'Courier New', monospace`,
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
    '6xl': '3.75rem',
  },
  
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '5rem',
    '5xl': '6rem',
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    base: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
    glass: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  
  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
    spring: '0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  
  // Animation durations
  animation: {
    duration: {
      fastest: '0.1s',
      faster: '0.2s',
      fast: '0.3s',
      normal: '0.5s',
      slow: '0.7s',
      slower: '1s',
      slowest: '1.5s',
    },
    
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
} as const

export type Theme = typeof theme

// Theme variants for different timer states
export const timerThemes = {
  focus: {
    ...theme,
    colors: {
      ...theme.colors,
      accent: {
        ...theme.colors.accent,
        primary: '#f093fb',
        secondary: '#f5576c',
      },
    },
  },
  
  shortBreak: {
    ...theme,
    colors: {
      ...theme.colors,
      accent: {
        ...theme.colors.accent,
        primary: '#4facfe',
        secondary: '#00f2fe',
      },
    },
  },
  
  longBreak: {
    ...theme,
    colors: {
      ...theme.colors,
      accent: {
        ...theme.colors.accent,
        primary: '#43e97b',
        secondary: '#38f9d7',
      },
    },
  },
} as const

export type TimerTheme = keyof typeof timerThemes