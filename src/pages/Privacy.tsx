import React from 'react'
import styled from 'styled-components'
import SEO from '../components/SEO'
import { Eyebrow, Lead, Page, PageHeader, PageTitle, Prose, cardStyles } from '../components/Layout/Page'

const Body = styled(Prose)`
  ${cardStyles}
  padding: 32px 36px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 22px 18px;
  }
`

const Privacy: React.FC = () => (
  <>
    <SEO
      title="Privacy Policy | PausePad"
      description="How PausePad handles your data: tasks and settings stay on your device, with anonymous analytics and optional YouTube music."
      path="/privacy"
    />
    <Page $narrow>
      <PageHeader>
        <Eyebrow>Legal</Eyebrow>
        <PageTitle>Privacy policy</PageTitle>
        <Lead>Short version: your tasks and settings stay on your device. We only collect anonymous usage statistics.</Lead>
      </PageHeader>

      <Body>
        <h2>Data stored on your device</h2>
        <p>
          Your tasks, timer settings, selected music station and daily focus statistics are saved in your browser's
          local storage. They are never sent to us. You can delete them at any time by clearing this site's data in
          your browser settings.
        </p>

        <h2>Analytics</h2>
        <p>To understand how many people use PausePad and which pages are useful, we use:</p>
        <ul>
          <li>
            <strong>Vercel Web Analytics and Speed Insights</strong>: cookie-free, anonymous page view and performance
            measurements.
          </li>
          <li>
            <strong>Google Analytics 4</strong>: anonymous usage statistics such as page views, country, device type and
            timer events (for example "timer started"). Google may set cookies for this. The content of your tasks is
            never sent.
          </li>
        </ul>
        <p>
          You can block analytics with any standard content blocker or by enabling "Do Not Track" style protections in
          your browser. PausePad works the same either way.
        </p>

        <h2>Music</h2>
        <p>
          The music player embeds YouTube streams using YouTube's privacy-enhanced mode (youtube-nocookie.com). Nothing
          is loaded from YouTube until you press Play. Once you do, YouTube's{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            privacy policy
          </a>{' '}
          applies to the player.
        </p>

        <h2>Notifications</h2>
        <p>
          If you allow notifications, your browser shows an alert when a session ends. Notifications are created
          locally and no data is sent anywhere.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Open an issue on{' '}
          <a href="https://github.com/elandil2/pausepad" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>

        <p>
          <em>Last updated: October 26, 2026</em>
        </p>
      </Body>
    </Page>
  </>
)

export default Privacy
