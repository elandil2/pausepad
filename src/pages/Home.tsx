import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SEO from '../components/SEO'
import Timer from '../components/Timer/Timer'
import TaskList from '../components/Tasks/TaskList'
import MusicPlayer from '../components/Music/MusicPlayer'
import { Card, Eyebrow, PrimaryLink, cardStyles, displayHeading } from '../components/Layout/Page'
import { SITE_NAME, SITE_URL } from '../config/site'
import { posts } from '../content/posts'

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
  gap: 24px 32px;
  align-items: start;

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

  @media (min-width: 961px) {
    position: sticky;
    top: calc(${({ theme }) => theme.layout.headerHeight} + 20px);
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

const Section = styled.section`
  margin-top: 96px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 64px;
  }

  > h2 {
    ${displayHeading}
    font-size: clamp(1.8rem, 1.2rem + 2vw, 2.6rem);
    color: ${({ theme }) => theme.colors.onBg.primary};
    margin-bottom: 10px;
  }

  > p {
    max-width: 640px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.onBg.secondary};
    margin-bottom: 28px;
  }
`

const Steps = styled.ol`
  list-style: none;
  counter-reset: step;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  li {
    counter-increment: step;
  }

  ${Card} {
    height: 100%;
    padding: 22px;
  }

  ${Card}::before {
    content: counter(step);
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    margin-bottom: 14px;
    border: ${({ theme }) => theme.borderThin};
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent.primary};
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 900;
    font-size: 1.1rem;
  }

  h3 {
    font-size: 1.15rem;
    font-weight: 800;
    margin-bottom: 6px;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

const Features = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  ${Card} {
    height: 100%;
    padding: 22px;
  }

  .icon {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    margin-bottom: 14px;
    border: ${({ theme }) => theme.borderThin};
    border-radius: 50%;
    font-size: 1.4rem;
  }

  h3 {
    font-size: 1.15rem;
    font-weight: 800;
    margin-bottom: 6px;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

const Faq = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 820px;

  details {
    ${cardStyles}
    box-shadow: ${({ theme }) => theme.shadows.small};
  }

  summary {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 20px;
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: 1.1rem;
    font-weight: 800;
    cursor: pointer;

    &::-webkit-details-marker {
      display: none;
    }

    &::after {
      content: '+';
      flex-shrink: 0;
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      border: ${({ theme }) => theme.borderThin};
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.accent.primary};
      font-size: 1.1rem;
      line-height: 1;
    }
  }

  details[open] summary::after {
    content: '−';
  }

  details p {
    padding: 0 20px 18px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

const PostGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  a {
    ${cardStyles}
    display: block;
    height: 100%;
    padding: 22px;
    transition:
      transform ${({ theme }) => theme.transitions.fast},
      box-shadow ${({ theme }) => theme.transitions.fast};

    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: 8px 8px 0 ${({ theme }) => theme.colors.ink};
    }
  }

  h3 {
    font-size: 1.15rem;
    font-weight: 800;
    margin-bottom: 6px;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

const MoreLink = styled(PrimaryLink)`
  margin-top: 28px;
`

const steps = [
  { title: 'Pick one task', text: 'Write down the single thing you want to move forward, and add it to your task list.' },
  { title: 'Focus for 25 minutes', text: 'Press Start and work only on that task until the timer rings. No email, no phone.' },
  { title: 'Take a 5-minute break', text: 'Stand up, stretch, get water. Short breaks keep your attention fresh for the next round.' },
  { title: 'Long break after four', text: 'After four pomodoros PausePad suggests a 15-minute break so you can recharge.' },
]

const features = [
  { icon: '⏱️', color: '#ff7a59', title: 'Accurate timer', text: 'Keeps exact time even in a background tab, and shows the countdown in the browser tab title.' },
  { icon: '✅', color: '#58d68d', title: 'Simple task list', text: 'Plan what to work on next. Tasks are saved in your browser, no account needed.' },
  { icon: '🎧', color: '#ff6fb1', title: 'Lofi focus music', text: 'Pick a 24/7 lofi, jazz or synthwave stream and keep it playing while you work.' },
  { icon: '⚙️', color: '#4fb6ff', title: 'Custom durations', text: 'Change the length of pomodoros and breaks, or switch to a 50-minute deep focus session.' },
  { icon: '🔔', color: '#ffcf33', title: 'Sound & notifications', text: 'A gentle chime and a desktop notification tell you when it is time to switch.' },
  { icon: '🔒', color: '#c4b5fd', title: 'Free & private', text: 'No sign-up, no ads, no tracking of your tasks. Everything stays on your device.' },
]

const faqs = [
  {
    q: 'What is a Pomodoro timer?',
    a: 'A Pomodoro timer splits your work into focused intervals, usually 25 minutes long, separated by 5-minute breaks. After four intervals you take a longer 15–30 minute break. The method was created by Francesco Cirillo and helps you concentrate without burning out.',
  },
  {
    q: 'Is PausePad free?',
    a: 'Yes. PausePad is completely free, has no ads and does not require an account. Just open the page and press Start.',
  },
  {
    q: 'Can I change the timer length?',
    a: 'Yes. Open Settings under the timer to set your own focus, short break, long break and deep focus durations. Your settings are remembered in this browser.',
  },
  {
    q: 'Does the timer keep running in a background tab?',
    a: 'Yes. PausePad calculates the remaining time from the clock instead of counting ticks, so it stays accurate even when the tab is in the background. The countdown is also shown in the tab title.',
  },
  {
    q: 'Does PausePad work on my phone?',
    a: 'Yes. PausePad works in any modern mobile browser, and you can add it to your home screen to use it like an app.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

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
      jsonLd={[appSchema, websiteSchema, faqSchema]}
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

      <Section aria-labelledby="how-heading">
        <Eyebrow>How it works</Eyebrow>
        <h2 id="how-heading">How to use the Pomodoro technique</h2>
        <p>
          The Pomodoro technique is a simple way to beat procrastination: work in short, focused sprints and rest
          before you get tired. Here is how to do it with PausePad.
        </p>
        <Steps>
          {steps.map((step) => (
            <li key={step.title}>
              <Card>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Card>
            </li>
          ))}
        </Steps>
      </Section>

      <Section aria-labelledby="features-heading">
        <Eyebrow>Features</Eyebrow>
        <h2 id="features-heading">Everything you need to focus, nothing you don't</h2>
        <p>PausePad is built to stay out of your way. Open it, press Start, and get to work.</p>
        <Features>
          {features.map((feature) => (
            <li key={feature.title}>
              <Card>
                <span className="icon" style={{ background: feature.color }} aria-hidden="true">
                  {feature.icon}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </Card>
            </li>
          ))}
        </Features>
      </Section>

      <Section aria-labelledby="faq-heading">
        <Eyebrow>FAQ</Eyebrow>
        <h2 id="faq-heading">Frequently asked questions</h2>
        <Faq>
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </Faq>
      </Section>

      <Section aria-labelledby="blog-heading">
        <Eyebrow>From the blog</Eyebrow>
        <h2 id="blog-heading">Learn to focus better</h2>
        <PostGrid>
          {posts
            .filter((post) => post.lang === 'en')
            .slice(0, 3)
            .map((post) => (
              <li key={post.path}>
                <Link to={post.path}>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </Link>
              </li>
            ))}
        </PostGrid>
        <MoreLink to="/blog">All articles →</MoreLink>
      </Section>
    </Main>
  </>
)

export default Home
