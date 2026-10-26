import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SEO from '../components/SEO'
import { Card, Eyebrow, Lead, Page, PageHeader, PageTitle, PrimaryLink, Prose, SecondaryAnchor, cardStyles } from '../components/Layout/Page'
import { SUPPORT_URL } from '../config/site'

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
`

const Body = styled(Prose)`
  ${cardStyles}
  padding: 32px 36px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 22px 18px;
  }
`

const Support = styled(Card)`
  margin-top: 28px;
  background: ${({ theme }) => theme.colors.accent.primary};

  h2 {
    font-size: 1.2rem;
    margin-bottom: 6px;
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

const About: React.FC = () => (
  <>
    <SEO
      title="About PausePad – a free, simple Pomodoro timer"
      description="PausePad is a free Pomodoro timer with a task list and lofi focus music. No account, no ads: open it and start focusing."
      path="/about"
    />
    <Page $narrow>
      <PageHeader>
        <Eyebrow>About</Eyebrow>
        <PageTitle>A calm place to get work done ✨</PageTitle>
        <Lead>PausePad is a free Pomodoro timer for studying and deep work, built to stay out of your way.</Lead>
      </PageHeader>

      <Body>
        <p>
          Most productivity apps ask you to sign up, set up projects and learn a new system before you can do anything.
          PausePad does the opposite: open the page, write down what you are working on, and press Start.
        </p>

        <h2>What's inside</h2>
        <ul>
          <li><strong>Pomodoro timer</strong> with 25-minute focus sessions, short and long breaks, and a 50-minute deep focus mode.</li>
          <li><strong>Custom durations</strong> and optional auto-start, saved in your browser.</li>
          <li><strong>Task list</strong> to keep the next thing you want to finish in front of you.</li>
          <li><strong>Lofi focus music</strong> from 24/7 live streams.</li>
          <li><strong>Sound and desktop notifications</strong> when a session ends.</li>
          <li><strong>Daily stats</strong> that show how many pomodoros you finished today.</li>
        </ul>

        <h2>The Pomodoro technique in one paragraph</h2>
        <p>
          Work on one task for 25 minutes, then take a 5-minute break. After four rounds, take a longer break of 15 to
          30 minutes. The short, fixed intervals make it easier to start, keep you from multitasking, and help you
          notice how long work really takes. Read the{' '}
          <Link to="/blog/pomodoro-technique-explained">complete guide</Link> to learn more.
        </p>

        <h2>Privacy first</h2>
        <p>
          Your tasks, settings and stats never leave your device. There are no accounts and no ads. See the{' '}
          <Link to="/privacy">privacy policy</Link> for details.
        </p>
      </Body>

      <Support>
        <h2>Support PausePad</h2>
        <p>PausePad is a free side project. If it helps you focus, a coffee keeps it running and ad-free.</p>
        <Actions>
          <SecondaryAnchor href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">
            ☕ Buy me a coffee
          </SecondaryAnchor>
          <PrimaryLink to="/">Open the timer</PrimaryLink>
        </Actions>
      </Support>
    </Page>
  </>
)

export default About
