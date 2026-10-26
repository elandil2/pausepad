import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SEO from '../components/SEO'
import Timer from '../components/Timer/Timer'
import TaskList from '../components/Tasks/TaskList'
import MusicPlayer from '../components/Music/MusicPlayer'
import { Card, Eyebrow } from '../components/Layout/Page'
import { SITE_NAME, SITE_URL } from '../config/site'
import { posts } from '../content/posts'

const Main = styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 28px 20px 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px 12px 56px;
  }
`

const Intro = styled.div`
  margin-bottom: 20px;
  text-align: center;

  h1 {
    font-size: clamp(1.35rem, 1rem + 1.6vw, 2rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  p {
    margin-top: 6px;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 14px;

    p {
      font-size: ${({ theme }) => theme.fontSizes.sm};
    }
  }
`

const AppGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 20px;
  align-items: start;

  @media (max-width: 920px) {
    grid-template-columns: minmax(0, 1fr);
    max-width: 600px;
    margin: 0 auto;
    gap: 14px;
  }
`

const Side = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 920px) {
    gap: 14px;
  }
`

const Section = styled.section`
  margin-top: 88px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 64px;
  }

  > h2 {
    font-size: clamp(1.4rem, 1.1rem + 1.2vw, 1.9rem);
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }

  > p {
    max-width: 680px;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 28px;
  }
`

const Steps = styled.ol`
  list-style: none;
  counter-reset: step;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
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
    width: 32px;
    height: 32px;
    margin-bottom: 14px;
    border-radius: 50%;
    background: rgba(255, 107, 91, 0.15);
    color: ${({ theme }) => theme.colors.accent.primary};
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.base};
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
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }

  ${Card} {
    height: 100%;
    padding: 22px;
  }

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: ${({ theme }) => theme.fontSizes.base};
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
  gap: 10px;
  max-width: 820px;

  details {
    border-radius: ${({ theme }) => theme.radius.md};
    border: 1px solid ${({ theme }) => theme.colors.surface.border};
    background: ${({ theme }) => theme.colors.surface.base};
  }

  summary {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 20px;
    font-weight: 600;
    cursor: pointer;

    &::-webkit-details-marker {
      display: none;
    }

    &::after {
      content: '+';
      flex-shrink: 0;
      font-size: 1.3rem;
      font-weight: 400;
      line-height: 1;
      color: ${({ theme }) => theme.colors.text.muted};
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
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }

  a {
    display: block;
    height: 100%;
    padding: 22px;
    border-radius: ${({ theme }) => theme.radius.lg};
    border: 1px solid ${({ theme }) => theme.colors.surface.border};
    background: ${({ theme }) => theme.colors.surface.base};
    transition: background ${({ theme }) => theme.transitions.fast};

    &:hover {
      background: ${({ theme }) => theme.colors.surface.raised};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin-bottom: 6px;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`

const MoreLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent.primary};
`

const steps = [
  { title: 'Pick one task', text: 'Write down the single thing you want to move forward, and add it to your task list.' },
  { title: 'Focus for 25 minutes', text: 'Press Start and work only on that task until the timer rings. No email, no phone.' },
  { title: 'Take a 5-minute break', text: 'Stand up, stretch, get water. Short breaks keep your attention fresh for the next round.' },
  { title: 'Long break after four', text: 'After four pomodoros PausePad suggests a 15-minute break so you can recharge.' },
]

const features = [
  { icon: '⏱️', title: 'Accurate timer', text: 'Keeps exact time even in a background tab, and shows the countdown in the browser tab title.' },
  { icon: '✅', title: 'Simple task list', text: 'Plan what to work on next. Tasks are saved in your browser, no account needed.' },
  { icon: '🎧', title: 'Lofi focus music', text: 'Pick a 24/7 lofi, jazz or synthwave stream and keep it playing while you work.' },
  { icon: '⚙️', title: 'Custom durations', text: 'Change the length of pomodoros and breaks, or switch to a 50-minute deep focus session.' },
  { icon: '🔔', title: 'Sound & notifications', text: 'A gentle chime and a desktop notification tell you when it is time to switch.' },
  { icon: '🔒', title: 'Free & private', text: 'No sign-up, no ads, no tracking of your tasks. Everything stays on your device.' },
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
      <Intro>
        <h1>Free online Pomodoro timer</h1>
        <p>Focus in 25-minute sessions, keep a task list and play lofi music.</p>
      </Intro>

      <AppGrid>
        <Timer />
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
                <h3>
                  <span aria-hidden="true">{feature.icon}</span>
                  {feature.title}
                </h3>
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
