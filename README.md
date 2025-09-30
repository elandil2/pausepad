# PausePad - Pomodoro Timer

A modern Pomodoro timer with integrated lofi music streaming and task management. Built with React, TypeScript, and deployed on Vercel.

**Live Site:** https://www.pausepad.com

## Features

### Timer Functionality
- Multiple timer modes: Focus (25min), Long Focus (45min), Short Break (5min), Long Break (15min)
- Visual circular progress indicator
- Audio notifications when sessions complete
- Session counting and tracking

### Music Integration
- Built-in YouTube lofi music player
- Curated focus playlists
- Minimizable player interface

### Task Management
- Add and track tasks during focus sessions
- Task completion tracking
- Local storage persistence

### Design
- Glassmorphic UI with gradient backgrounds
- Smooth animations with Framer Motion
- Fully responsive (mobile, tablet, desktop)
- Progressive Web App (PWA) support

## Technology Stack

- React 18 with TypeScript
- Vite (build tool)
- Styled Components
- Framer Motion (animations)
- React Router
- Google Analytics 4
- Vite PWA Plugin
- Vercel (deployment)

## Development

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
# Clone repository
git clone https://github.com/elandil2/pausepad.git
cd pausepad

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Configuration

### Timer Durations
Edit timer durations in `src/types/timer.ts` if needed.

### Analytics
Google Analytics 4 is configured. Measurement ID: `G-FK0RKNZG4G`

### Music Playlists
Add or modify YouTube streams in `src/components/Music/YouTubePlayer.tsx`

## SEO

The site includes:
- Comprehensive meta tags
- JSON-LD structured data
- Sitemap (`/sitemap.xml`)
- Robots.txt
- Multilingual hreflang tags
- Open Graph & Twitter Card tags

## License

MIT License

## Acknowledgments

- Pomodoro Technique by Francesco Cirillo
- Lofi music community