import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { readStorage, writeStorage } from '../../utils/storage'
import { trackMusicEvent } from '../../utils/analytics'

interface Station {
  id: string
  name: string
  description: string
  colors: [string, string]
}

// 24/7 live streams from Lofi Girl. IDs verified via YouTube oEmbed.
const stations: Station[] = [
  { id: 'jfKfPfyJRdk', name: 'Lofi hip hop', description: 'Beats to relax / study to', colors: ['#7c5cff', '#ff6b5b'] },
  { id: 'HuFYqnbVbzY', name: 'Jazz lofi', description: 'Smooth jazz beats', colors: ['#f59e0b', '#b45309'] },
  { id: '28KRPhVzCus', name: 'Sleepy lofi', description: 'Slow, calm beats', colors: ['#1e3a8a', '#6366f1'] },
  { id: 'SXySxLgCV-8', name: 'Summer lofi', description: 'Warm, sunny beats', colors: ['#fb7185', '#fbbf24'] },
  { id: '4xDzrJKXOOY', name: 'Synthwave', description: 'Retro electronic', colors: ['#db2777', '#0ea5e9'] },
]

const STORAGE_KEY = 'pausepad-station'

const Panel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface.base};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px;
  }
`

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: 600;
  }
`

const Live = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.muted};

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent.primary};
  }
`

const Screen = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  background: #000;

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`

const Poster = styled.button`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 2px;
  padding: 18px;
  text-align: start;
  color: #fff;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -20%;
    background:
      radial-gradient(40% 50% at 25% 30%, rgba(255, 255, 255, 0.25), transparent 70%),
      repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.12) 0 2px, transparent 2px 9px);
    opacity: 0.6;
  }

  strong,
  small,
  span {
    position: relative;
  }

  strong {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 700;
  }

  small {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    opacity: 0.85;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.95);
    color: #111;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover span {
    transform: translate(-50%, -50%) scale(1.06);
  }
`

const Stations = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Chip = styled.button<{ $active: boolean }>`
  min-height: 36px;
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  border: 1px solid
    ${({ theme, $active }) => ($active ? 'rgba(255, 107, 91, 0.6)' : theme.colors.surface.border)};
  background: ${({ $active }) => ($active ? 'rgba(255, 107, 91, 0.14)' : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.text.primary : theme.colors.text.secondary)};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme, $active }) => ($active ? 'rgba(255, 107, 91, 0.18)' : theme.colors.surface.raised)};
  }
`

const Note = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
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
    <Panel aria-labelledby="music-heading">
      <Head>
        <h2 id="music-heading">Focus music</h2>
        <Live>Live</Live>
      </Head>

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
            onClick={() => {
              setPlaying(true)
              trackMusicEvent('play', station.name)
            }}
            style={{ background: `linear-gradient(135deg, ${station.colors[0]}, ${station.colors[1]})` }}
            aria-label={`Play ${station.name}`}
          >
            <span aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
              </svg>
            </span>
            <strong>{station.name}</strong>
            <small>{station.description}</small>
          </Poster>
        )}
      </Screen>

      <Stations aria-label="Stations">
        {stations.map((s) => (
          <li key={s.id}>
            <Chip type="button" $active={s.id === station.id} aria-pressed={s.id === station.id} onClick={() => choose(s)} title={s.description}>
              {s.name}
            </Chip>
          </li>
        ))}
      </Stations>

      <Note>Streams by Lofi Girl on YouTube. Music keeps playing while the timer runs.</Note>
    </Panel>
  )
}

export default MusicPlayer
