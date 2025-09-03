import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import GlassCard from '../components/UI/GlassCard'
import SEO from '../components/SEO'

const PrivacyContainer = styled(motion.div)`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`

const PrivacyCard = styled(GlassCard)`
  text-align: left;

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  ul {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.lg};

    li {
      margin-bottom: ${({ theme }) => theme.spacing.sm};
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }
`

const Privacy: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy - PausePad"
        description="Learn about how PausePad protects your privacy and handles your data. We are committed to keeping your information safe and secure."
        canonical="/privacy"
      />
      <PrivacyContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <ContentWrapper>
          <PageTitle>Privacy Policy</PageTitle>

          <PrivacyCard padding="xl">
            <h2>Information We Collect</h2>
            <p>
              PausePad is designed with privacy in mind. We collect minimal information necessary to provide our services:
            </p>
            <ul>
              <li><strong>Local Data:</strong> All timer sessions, tasks, and preferences are stored locally on your device</li>
              <li><strong>Usage Analytics:</strong> Optional anonymous usage statistics to improve the app</li>
              <li><strong>Error Reports:</strong> Automatic error reporting to help us fix issues</li>
            </ul>

            <h2>Data Storage</h2>
            <p>
              Your data never leaves your device unless you explicitly choose to:
            </p>
            <ul>
              <li>All timer data is stored in your browser's local storage</li>
              <li>No personal information is transmitted to our servers</li>
              <li>You can export your data at any time for backup</li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>
              When you connect external services:
            </p>
            <ul>
              <li><strong>YouTube:</strong> We embed YouTube videos for background music</li>
              <li><strong>Spotify:</strong> Optional integration for music streaming (requires your consent)</li>
              <li>These services have their own privacy policies which we encourage you to review</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
              We use minimal cookies for functionality:
            </p>
            <ul>
              <li>Essential cookies for app functionality</li>
              <li>No tracking or advertising cookies</li>
              <li>No third-party analytics by default</li>
            </ul>

            <h2>Your Rights</h2>
            <p>
              You have full control over your data:
            </p>
            <ul>
              <li>Delete all local data through browser settings</li>
              <li>Export your data for backup or migration</li>
              <li>Opt-out of any optional data collection</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our GitHub repository or support channels.
            </p>

            <h3>Last Updated</h3>
            <p>September 3, 2024</p>
          </PrivacyCard>
        </ContentWrapper>
      </PrivacyContainer>
    </>
  )
}

export default Privacy