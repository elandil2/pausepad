import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../UI/Button'
import GlassCard from '../UI/GlassCard'

interface YouTubePlayerProps {
  className?: string
}

const PlayerContainer = styled.div`
  position: fixed;
  bottom: calc(20px + env(safe-area-inset-bottom));
  left: 20px;
  z-index: 999;
  width: 280px;
  max-width: calc(100vw - 40px);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 260px;
    bottom: calc(14px + env(safe-area-inset-bottom));
    left: 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: calc(100vw - 32px);
    max-width: 340px;
    bottom: calc(10px + env(safe-area-inset-bottom));
    left: 50%;
    transform: translateX(-50%);
  }

  @media (max-width: 400px) {
    width: calc(100vw - 24px);
    max-width: 320px;
    bottom: calc(8px + env(safe-area-inset-bottom));
  }
`

const PlayerCard = styled(GlassCard)`
  padding: ${({ theme }) => theme.spacing.md};
  backdrop-filter: blur(20px);
  background: rgba(0, 0, 0, 0.3);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`

const PlayerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  gap: ${({ theme }) => theme.spacing.sm};
`

const PlayerTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  flex: 1;
  letter-spacing: 0.2px;
`

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`

const ToggleButton = styled(Button)`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const VideoFrame = styled.iframe`
  width: 100%;
  height: 157px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 180px;
  }

  @media (max-width: 400px) {
    height: 170px;
  }
`

const PlaylistContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  max-height: 160px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
`

const PlaylistItem = styled.div<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  background: ${({ $active }) =>
    $active ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  border: 1px solid
    ${({ $active }) => ($active ? 'rgba(102, 126, 234, 0.3)' : 'transparent')};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const PlaylistItemTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: 2px;
`

const PlaylistItemDescription = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  opacity: 0.8;
`

const focusPlaylists = [
  {
    id: 'jfKfPfyJRdk',
    title: 'Lofi Hip Hop Radio',
    description: 'Beats to relax/study to',
  },
  {
    id: '4xDzrJKXOOY',
    title: 'Jazz Vibes',
    description: 'Smooth jazz for focus',
  },
  {
    id: 'SXySxLgCV-8',
    title: 'Chill Beats',
    description: 'Relaxing background music',
  },
  {
    id: 'HuFYqnbVbzY',
    title: 'Study Music',
    description: 'Perfect for concentration',
  },
  {
    id: '28KRPhVzCus',
    title: 'Focus Flow',
    description: 'Deep work soundtrack',
  },
]

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ className }) => {
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(focusPlaylists[0])
  const [showPlaylist, setShowPlaylist] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)')
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMinimized(event.matches)
      if (event.matches) {
        setShowPlaylist(false)
      }
    }

    handleChange(mediaQuery)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev)
  }

  const togglePlaylist = () => {
    setShowPlaylist(prev => !prev)
  }

  const selectVideo = (video: typeof focusPlaylists[0]) => {
    setCurrentVideo(video)
    setShowPlaylist(false)
  }

  return (
    <PlayerContainer className={className}>
      <PlayerCard>
        <PlayerHeader>
          <PlayerTitle>Focus Music</PlayerTitle>
          <HeaderActions>
            <ToggleButton
              variant="ghost"
              size="sm"
              onClick={togglePlaylist}
              aria-label={showPlaylist ? 'Hide playlist' : 'Show playlist'}
            >
              {showPlaylist ? 'List' : 'Music'}
            </ToggleButton>
            <ToggleButton
              variant="ghost"
              size="sm"
              onClick={toggleMinimize}
              aria-label={isMinimized ? 'Expand music player' : 'Minimize music player'}
            >
              {isMinimized ? 'Open' : 'Hide'}
            </ToggleButton>
          </HeaderActions>
        </PlayerHeader>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VideoFrame
                src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=0&loop=1&playlist=${currentVideo.id}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={currentVideo.title}
              />

              <AnimatePresence>
                {showPlaylist && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PlaylistContainer>
                      {focusPlaylists.map(video => (
                        <PlaylistItem
                          key={video.id}
                          $active={currentVideo.id === video.id}
                          onClick={() => selectVideo(video)}
                        >
                          <PlaylistItemTitle>{video.title}</PlaylistItemTitle>
                          <PlaylistItemDescription>{video.description}</PlaylistItemDescription>
                        </PlaylistItem>
                      ))}
                    </PlaylistContainer>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </PlayerCard>
    </PlayerContainer>
  )
}

export default YouTubePlayer
