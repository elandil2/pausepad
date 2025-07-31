# 🍅 PausePad - Modern Pomodoro Timer

A beautiful, feature-rich Pomodoro timer application with integrated music streaming, task management, and a clean, sophisticated design inspired by modern productivity tools.

![PausePad Screenshot](https://via.placeholder.com/800x400/667eea/ffffff?text=PausePad+Pomodoro+Timer)

## ✨ Features

### 🎯 Core Timer Functionality
- **Multiple Timer Modes**: Focus (25min), Long Focus (45min), Short Break (5min), Long Break (15min)
- **Visual Progress**: Beautiful circular progress indicator with smooth animations
- **Tab Countdown**: Real-time countdown in browser tab with mode-specific emojis
- **Audio Notifications**: Pleasant bell sound alerts when sessions complete
- **Session Tracking**: Automatic session counting and completion tracking

### 🎵 Integrated Music Streaming
- **YouTube Integration**: Built-in lofi music streams for focus sessions
- **Curated Playlists**: Hand-picked lofi hip-hop streams for optimal concentration
- **Seamless Playback**: Music continues across timer sessions

### ✅ Task Management
- **Clean Task Interface**: Add, complete, and track tasks during focus sessions
- **Real-time Counters**: Live task completion tracking in header
- **Persistent Storage**: Tasks saved locally across browser sessions

### 🎨 Beautiful Design
- **Glassmorphic UI**: Modern frosted glass design elements
- **Gradient Backgrounds**: Sophisticated purple-to-blue gradients
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Layout**: Perfect on desktop, tablet, and mobile devices
- **Clean Typography**: Carefully chosen fonts for optimal readability

### 🔧 Advanced Features
- **Progressive Web App**: Install on mobile devices like a native app
- **Theme Support**: Built-in theme system (expandable)
- **Keyboard Shortcuts**: Quick access to timer controls
- **Browser Notifications**: Desktop notifications when timer completes
- **Local Storage**: All data persisted locally for privacy

## 🚀 Live Demo

Visit the live application: **[PausePad Timer](https://yourusername.github.io/pausepad/)**

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Styled Components with theme support
- **Animations**: Framer Motion for smooth transitions
- **Routing**: React Router for navigation
- **State Management**: React Context + Custom Hooks
- **PWA**: Vite PWA plugin for app-like experience
- **Deployment**: GitHub Pages with GitHub Actions

## 📦 Installation & Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/pausepad.git
cd pausepad

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development URLs
- **Local**: http://localhost:5173/pausepad/
- **Network**: Available on your local network for mobile testing

## 🚀 Deployment

### GitHub Pages (Free)
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Push to main branch - automatic deployment via GitHub Actions
4. Access at: `https://yourusername.github.io/pausepad/`

### Alternative Hosting
- **Vercel**: Connect GitHub repo for instant deployment
- **Netlify**: Drag & drop the `dist` folder
- **Surge.sh**: `npm run build && surge dist/`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🎯 Usage

### Basic Timer Usage
1. **Select Mode**: Choose Focus, Long Focus, Short Break, or Long Break
2. **Start Timer**: Click the START button to begin your session
3. **Stay Focused**: Use the integrated music to maintain concentration
4. **Track Tasks**: Add tasks to work on during focus sessions
5. **Take Breaks**: Timer automatically suggests break types

### Advanced Features
- **Tab Monitoring**: Keep track of time remaining in browser tab
- **Audio Alerts**: Get notified when sessions complete
- **Task Tracking**: Monitor productivity with task completion counters
- **PWA Install**: Add to home screen on mobile devices

## 🎨 Design Philosophy

PausePad combines the proven Pomodoro Technique with modern web design principles:

- **Minimalist Interface**: Clean, distraction-free design
- **Intuitive Controls**: Self-explanatory interface requiring no learning curve
- **Visual Feedback**: Clear progress indicators and status updates
- **Accessibility**: High contrast, readable fonts, keyboard navigation
- **Performance**: Optimized for fast loading and smooth interactions

## 🔧 Configuration

### Customizing Timer Durations
Edit `src/types/timer.ts`:
```typescript
export const DEFAULT_TIMER_CONFIG: TimerConfig = {
  focusTime: 25,        // Focus session minutes
  longFocusTime: 45,    // Long focus session minutes
  shortBreakTime: 5,    // Short break minutes
  longBreakTime: 15,    // Long break minutes
  sessionsUntilLongBreak: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
}
```

### Adding Custom Music Streams
Edit `src/components/Music/YouTubePlayer.tsx` to add your preferred streams.

## 📱 Progressive Web App

PausePad is a full PWA with:
- **Offline Support**: Basic functionality works without internet
- **Install Prompt**: Add to home screen on mobile devices
- **App Icons**: Custom icons for different screen sizes
- **Splash Screen**: Branded loading experience
- **Background Sync**: Data syncs when connection restored

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
1. Follow TypeScript best practices
2. Use Styled Components for styling
3. Maintain responsive design principles
4. Add proper error handling
5. Include tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pomodoro Technique**: Created by Francesco Cirillo
- **Design Inspiration**: pomodorotimer.online and modern productivity apps
- **Music**: Lofi hip-hop community for focus-enhancing streams
- **Icons**: Emoji icons for cross-platform compatibility

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/pausepad/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/pausepad/discussions)
- **Email**: your.email@example.com

---

**Made with ❤️ for productivity enthusiasts**

*Start your focused work session now with PausePad!*