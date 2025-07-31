import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import GlassCard from '../components/UI/GlassCard'

const AboutContainer = styled(motion.div)`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
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

const AboutCard = styled(GlassCard)`
  text-align: center;
`

const AboutText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const FeatureIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  min-width: 30px;
`

const ContactInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const About: React.FC = () => {
  return (
    <AboutContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ContentWrapper>
        <PageTitle>About PausePad</PageTitle>
        
        <AboutCard padding="xl">
          <AboutText>
            <p>
              <strong>PausePad</strong> is a cozy and modern Pomodoro timer designed to help you stay focused and productive while maintaining a healthy work-life balance.
            </p>
            
            <p>
              Built with love using React, TypeScript, and modern web technologies, PausePad combines beautiful glassmorphic design with powerful productivity features to create the perfect focus companion.
            </p>
            
            <p>
              Whether you're studying, working, or pursuing personal projects, PausePad provides the tools you need to maintain focus, track progress, and take meaningful breaks.
            </p>
          </AboutText>
          
          <FeatureList>
            <FeatureItem>
              <FeatureIcon>🍅</FeatureIcon>
              <span>Customizable Pomodoro Timer</span>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>📝</FeatureIcon>
              <span>Task Management</span>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>🎵</FeatureIcon>
              <span>Focus Music Integration</span>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>📊</FeatureIcon>
              <span>Progress Tracking</span>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>🌙</FeatureIcon>
              <span>Theme Switching</span>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>💾</FeatureIcon>
              <span>Local Data Persistence</span>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>📱</FeatureIcon>
              <span>Responsive Design</span>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>🔔</FeatureIcon>
              <span>Smart Notifications</span>
            </FeatureItem>
          </FeatureList>
          
          <AboutText>
            <p>
              <strong>The Pomodoro Technique</strong> is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. This technique helps improve focus and productivity while preventing burnout.
            </p>
          </AboutText>
          
          <ContactInfo>
            <p>Made with ❤️ for productivity enthusiasts</p>
            <p>Version 1.0.0 • Built with React & TypeScript</p>
          </ContactInfo>
        </AboutCard>
      </ContentWrapper>
    </AboutContainer>
  )
}

export default About