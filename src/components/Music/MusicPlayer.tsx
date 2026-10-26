import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { readStorage, writeStorage } from '../../utils/storage'
import { trackMusicEvent } from '../../utils/analytics'
import { Window } from '../Layout/Page'

interface Station {
  id: string
  name: string
  description: string
  emoji: string
  color: string
}

// 24/7 live streams from Lofi Girl. IDs verified via YouTube oEmbed.
const stations: Station[] = [
  { id: 'jfKfPfyJRdk', name: 'Lofi', description: 'Beats to relax / study to', emoji: '🎧', color: '#ff9f59' },
  { id: 'HuFYqnbVbzY', name: 'Jazz', description: 'Smooth jazz beats', emoji: '🎷', color: '#ffcf33' },
  { id: '28KRPhVzCus', name: 'Sleepy', description: 'Slow, calm beats', emoji: '😴', color: '#4fb6ff' },
  { id: 'SXySxLgCV-8', name: 'Summer', description: 'Warm, sunny beats', emoji: '☀️', color: '#58d68d' },
  { id: '4xDzrJKXOOY', name: 'Synth', description: 'Retro synthwave', emoji: '🌆', color: '#ff6fb1' },
]

const STORAGE_KEY = 'pausepad-station'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Screen = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  border: ${({ theme }) => theme.borderThin};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.ink};

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`

const Poster = styled.button<{ $color: string }>`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: ${({ $color }) => $color};
  background-image: radial-gradient(rgba(22, 19, 43, 0.12) 1.5px, transparent 1.5px);
  background-size: 14px 14px;
  color: ${({ theme }) => theme.colors.ink};

  .emoji {
    font-size: 2.6rem;
    line-height: 1;
  }

  strong {
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.3rem;
    font-weight: 900;
    letter-spacing: -0.01em;
  }

  .play {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 6px;
    padding: 6px 16px;
    border: ${({ theme }) => theme.borderThin};
    border-radius: ${({ theme }) => theme.radius.full};
    background: #fff;
    box-shadow: ${({ theme }) => theme.shadows.pressed};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 800;
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover .play {
    transform: translate(-1px, -1px);
  }
`

const Stations = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  gap: 6px;
`

const Avatar = styled.button<{ $color: string; $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  color: ${({ theme, $active }) => ($active ? theme.colors.ink : theme.colors.text.muted)};

  span {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border: ${({ theme }) => theme.borderThin};
    border-radius: 50%;
    background: ${({ $color }) => $color};
    font-size: 1.35rem;
    line-height: 1;
    box-shadow: ${({ theme, $active }) => ($active ? theme.shadows.small : 'none')};
    transform: ${({ $active }) => ($active ? 'translate(-2px, -2px)' : 'none')};
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover span {
    transform: translate(-2px, -2px);
  }
`

const Note = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.muted};
`

const MusicPlayer: React.FC = () => {
  const [station, setStation] = useState<Station>(stations[0])
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const savedId = readStorage<string | null>(STORAGE_KEY, null)
    const saved = stations.find((s) => s.id === savedId)
    if (saved) setStation(saved)
  }, [])

  const choose = (next: Station) => {
    setStation(next)
    setPlaying(true)
    writeStorage(STORAGE_KEY, next.id)
    trackMusicEvent('change_video', next.name)
  }

  return (
    <Window
      icon="🎶"
      iconColor="#ff6fb1"
      title="Focus music"
      subtitle={playing ? `Now playing: ${station.name} ${station.emoji}` : '24/7 live lofi streams'}
      headingId="music-heading"
      tint
    >
      <Body>
        <Screen>
          {playing ? (
            <iframe
              key={station.id}
              src={`https://www.youtube-nocookie.com/embed/${station.id}?autoplay=1&rel=0&modestbranding=1`}
              title={`${station.name} live stream`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Poster
              type="button"
              $color={station.color}
              onClick={() => {
                setPlaying(true)
                trackMusicEvent('play', station.name)
              }}
              aria-label={`Play ${station.name}: ${station.description}`}
            >
              <span className="emoji" aria-hidden="true">
                {station.emoji}
              </span>
              <strong>{station.name}</strong>
              <span>{station.description}</span>
              <span className="play" aria-hidden="true">
                ▶ Play
              </span>
            </Poster>
          )}
        </Screen>

        <Stations aria-label="Stations">
          {stations.map((s) => (
            <li key={s.id}>
              <Avatar
                type="button"
                $color={s.color}
                $active={s.id === station.id}
                aria-pressed={s.id === station.id}
                onClick={() => choose(s)}
                title={s.description}
              >
                <span aria-hidden="true">{s.emoji}</span>
                {s.name}
              </Avatar>
            </li>
          ))}
        </Stations>

        <Note>Streams by Lofi Girl on YouTube. Music keeps playing while the timer runs.</Note>
      </Body>
    </Window>
  )
}

export default MusicPlayer
