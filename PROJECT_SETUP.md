# Project Setup Guide - Pomodoro Timer App

## Initial Setup Commands

### 1. Create React Project with Vite
```bash
npm create vite@latest pomodore_app -- --template react-ts
cd pomodore_app
npm install
```

### 2. Install Core Dependencies
```bash
# UI and Styling
npm install styled-components framer-motion
npm install @types/styled-components

# State Management and Data
npm install @tanstack/react-query dexie react-dexie-hooks
npm install zustand immer

# Routing
npm install react-router-dom

# Audio and Media
npm install howler
npm install @types/howler

# Charts and Analytics
npm install chart.js react-chartjs-2 date-fns

# Utilities
npm install clsx uuid
npm install @types/uuid

# PWA and Service Worker
npm install workbox-webpack-plugin workbox-window

# Development Dependencies
npm install -D @types/node
npm install -D eslint-plugin-react-hooks
npm install -D @typescript-eslint/eslint-plugin
npm install -D @typescript-eslint/parser
npm install -D prettier eslint-config-prettier
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event
npm install -D vitest jsdom
```

### 3. Environment Configuration
Create `.env.local`:
```env
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/callback
VITE_APP_NAME=Pomodore Timer
VITE_APP_VERSION=1.0.0
```

## Project Structure Setup

### Directory Structure
```
src/
├── components/
│   ├── Timer/
│   │   ├── PomodoroTimer.tsx
│   │   ├── TimerDisplay.tsx
│   │   ├── TimerControls.tsx
│   │   └── SessionIndicator.tsx
│   ├── Tasks/
│   │   ├── TaskManager.tsx
│   │   ├── ProjectList.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskForm.tsx
│   │   └── SubtaskManager.tsx
│   ├── Music/
│   │   ├── MusicPlayer.tsx
│   │   ├── SpotifyPlayer.tsx
│   │   ├── AmbientSounds.tsx
│   │   ├── PlaylistBrowser.tsx
│   │   └── AudioControls.tsx
│   ├── Analytics/
│   │   ├── Dashboard.tsx
│   │   ├── ProductivityChart.tsx
│   │   ├── TimeTracker.tsx
│   │   ├── StatsCards.tsx
│   │   └── ExportTools.tsx
│   ├── Background/
│   │   ├── AnimatedBackground.tsx
│   │   ├── ParticleSystem.tsx
│   │   ├── ThemeSelector.tsx
│   │   └── CanvasRenderer.tsx
│   ├── UI/
│   │   ├── GlassCard.tsx
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Input.tsx
│   │   ├── Slider.tsx
│   │   ├── Toggle.tsx
│   │   └── LoadingSpinner.tsx
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MainLayout.tsx
│   │   └── MobileNav.tsx
│   └── Settings/
│       ├── SettingsPanel.tsx
│       ├── TimerSettings.tsx
│       ├── ThemeSettings.tsx
│       ├── AudioSettings.tsx
│       └── DataSettings.tsx
├── hooks/
│   ├── usePomodoro.ts
│   ├── useTaskManager.ts
│   ├── useSpotify.ts
│   ├── useAnalytics.ts
│   ├── useNotifications.ts
│   ├── useLocalStorage.ts
│   ├── useKeyboardShortcuts.ts
│   └── useAnimationFrame.ts
├── services/
│   ├── database.ts
│   ├── spotify.ts
│   ├── notifications.ts
│   ├── audio.ts
│   ├── analytics.ts
│   ├── storage.ts
│   └── sync.ts
├── stores/
│   ├── timerStore.ts
│   ├── taskStore.ts
│   ├── settingsStore.ts
│   ├── musicStore.ts
│   └── themeStore.ts
├── types/
│   ├── timer.ts
│   ├── tasks.ts
│   ├── music.ts
│   ├── analytics.ts
│   ├── settings.ts
│   └── api.ts
├── styles/
│   ├── globals.css
│   ├── themes.css
│   ├── glassmorphism.css
│   ├── animations.css
│   └── responsive.css
├── utils/
│   ├── time.ts
│   ├── storage.ts
│   ├── validation.ts
│   ├── formatting.ts
│   ├── constants.ts
│   └── helpers.ts
├── workers/
│   ├── timer.worker.ts
│   ├── analytics.worker.ts
│   └── sync.worker.ts
└── pages/
    ├── Dashboard.tsx
    ├── Timer.tsx
    ├── Tasks.tsx
    ├── Analytics.tsx
    ├── Settings.tsx
    └── SpotifyCallback.tsx
```

## Configuration Files

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/services/*": ["src/services/*"],
      "@/stores/*": ["src/stores/*"],
      "@/types/*": ["src/types/*"],
      "@/utils/*": ["src/utils/*"],
      "@/styles/*": ["src/styles/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Vite Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.spotify\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'spotify-api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Pomodore Timer',
        short_name: 'Pomodore',
        description: 'Modern Pomodoro timer with music and task management',
        theme_color: '#667eea',
        background_color: '#1a1a2e',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/hooks': resolve(__dirname, 'src/hooks'),
      '@/services': resolve(__dirname, 'src/services'),
      '@/stores': resolve(__dirname, 'src/stores'),
      '@/types': resolve(__dirname, 'src/types'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/styles': resolve(__dirname, 'src/styles')
    }
  },
  server: {
    port: 5173,
    host: true
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['styled-components', 'framer-motion'],
          charts: ['chart.js', 'react-chartjs-2'],
          audio: ['howler']
        }
      }
    }
  }
})
```

### ESLint Configuration (`.eslintrc.cjs`)
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    'no-var': 'error'
  },
}
```

### Prettier Configuration (`.prettierrc`)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "type-check": "tsc --noEmit",
    "analyze": "npx vite-bundle-analyzer"
  }
}
```

## Development Workflow

### 1. Initial Setup
```bash
# Clone and setup
git clone <repository-url>
cd pomodore_app
npm install
cp .env.example .env.local
# Add your Spotify credentials to .env.local
```

### 2. Development Commands
```bash
# Start development server
npm run dev

# Run tests
npm run test

# Type checking
npm run type-check

# Linting and formatting
npm run lint
npm run format
```

### 3. Build and Deploy
```bash
# Production build
npm run build

# Preview production build
npm run preview

# Analyze bundle size
npm run analyze
```

## Spotify Developer Setup

### 1. Create Spotify App
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URI: `http://localhost:5173/callback`
4. Note down Client ID

### 2. Required Scopes
- `streaming` - Control playback
- `user-read-playback-state` - Read current playback
- `user-modify-playback-state` - Control playback
- `playlist-read-private` - Access private playlists
- `playlist-read-collaborative` - Access collaborative playlists

## Testing Strategy

### Unit Tests
- Timer logic and state management
- Task CRUD operations
- Utility functions
- Component rendering

### Integration Tests
- Spotify API integration
- Database operations
- Component interactions
- Service worker functionality

### E2E Tests (Optional)
- Complete user workflows
- Timer functionality
- Task management flows
- Music integration

## Performance Monitoring

### Metrics to Track
- Bundle size and loading times
- Animation frame rates
- Memory usage
- API response times
- Database query performance

### Tools
- Lighthouse for performance audits
- React DevTools Profiler
- Chrome DevTools Performance tab
- Bundle analyzer for size optimization

This setup guide provides everything needed to start development of the comprehensive Pomodoro timer application.