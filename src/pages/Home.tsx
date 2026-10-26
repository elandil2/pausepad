import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SEO from '../components/SEO'
import Timer from '../components/Timer/Timer'
import TaskList from '../components/Tasks/TaskList'
import MusicPlayer from '../components/Music/MusicPlayer'
import { displayHeading } from '../components/Layout/Page'
import { SITE_NAME, SITE_URL } from '../config/site'

const Main = styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 36px 20px 88px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 20px 14px 56px;
  }
`

const AppGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 380px) minmax(0, 1fr);
  grid-template-areas:
    'intro timer'
    'side timer';
  grid-template-rows: auto 1fr;
  gap: 28px 56px;
  align-items: start;

  @media (max-width: 1100px) {
    column-gap: 36px;
  }

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'intro' 'timer' 'side';
    grid-template-rows: none;
    max-width: 620px;
    margin: 0 auto;
    gap: 18px;
  }
`

const Intro = styled.div`
  grid-area: intro;

  h1 {
    ${displayHeading}
    font-size: clamp(2.2rem, 1.4rem + 3vw, 3.4rem);
    color: ${({ theme }) => theme.colors.onBg.primary};
  }

  p {
    margin-top: 10px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.onBg.secondary};
  }

  @media (max-width: 960px) {
    text-align: center;

    p {
      font-size: ${({ theme }) => theme.fontSizes.base};
    }
  }
`

const TimerArea = styled.div`
  grid-area: timer;

  /* On desktop the timer window stretches to the full height of the left column */
  @media (min-width: 961px) {
    align-self: stretch;
    display: flex;
    flex-direction: column;
  }
`

const Side = styled.div`
  grid-area: side;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 960px) {
    gap: 18px;
  }
`

const LearnMore = styled.p`
  margin-top: 40px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.onBg.secondary};

  a {
    margin-left: 6px;
    color: ${({ theme }) => theme.colors.onBg.primary};
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
  }
`

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  description: 'Free online Pomodoro timer with a task list and lofi focus music.',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
}

const Home: React.FC = () => (
  <>
    <SEO
      title="Pomodoro Timer with Tasks & Focus Music | PausePad"
      description="Free online Pomodoro timer with a task list and lofi focus music. 25-minute focus sessions, short and long breaks, custom durations. No sign-up, no ads."
      path="/"
      jsonLd={[appSchema, websiteSchema]}
    />
    <Main id="main">
      <AppGrid>
        <Intro>
          <h1>Pomodoro timer 🍅</h1>
          <p>Free, no sign-up. Focus in 25-minute sessions, keep a task list and play lofi music.</p>
        </Intro>
        <TimerArea>
          <Timer />
        </TimerArea>
        <Side>
          <TaskList />
          <MusicPlayer />
        </Side>
      </AppGrid>

      <LearnMore>
        New to the Pomodoro technique?
        <Link to="/how-it-works">See how it works →</Link>
      </LearnMore>
    </Main>
  </>
)

export default Home
