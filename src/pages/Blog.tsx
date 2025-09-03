import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import GlassCard from '../components/UI/GlassCard';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const BlogContainer = styled(motion.div)`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

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
`;

const BlogCard = styled(GlassCard)`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: left;
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Blog: React.FC = () => {
  return (
    <>
      <SEO
        title="PausePad Blog - Productivity Tips & Study Techniques"
        description="Read articles about productivity, study techniques, and the science of focus. Learn how to use the Pomodoro Technique effectively for better concentration and work-life balance."
        canonical="/blog"
      />
      <BlogContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
      <ContentWrapper>
        <PageTitle>PausePad Blog</PageTitle>
        
        <BlogCard>
          <BlogMeta>
            <span>August 5, 2025</span>
            <span>5 min read</span>
          </BlogMeta>
          <h2>How to Chill Effectively Between Study Sessions</h2>
          <p>
            Taking proper breaks is crucial for maintaining focus during long study sessions. 
            Learn science-backed techniques to relax your mind and recharge your energy.
          </p>
          <p>
            Discover how short meditation, light stretching, and mindful breathing can transform 
            your 5-minute breaks into powerful recharging sessions.
          </p>
          <Link to="/blog/how-to-chill">Read more →</Link>
        </BlogCard>
        
        <BlogCard>
          <BlogMeta>
            <span>August 1, 2025</span>
            <span>7 min read</span>
          </BlogMeta>
          <h2>The Science of Focus: Study Techniques That Work</h2>
          <p>
            Explore proven methods to enhance your concentration and retention while studying. 
            From the Pomodoro Technique to active recall, we break down what really works.
          </p>
          <p>
            Understand how your brain processes information and how to create the optimal 
            environment for deep focus sessions.
          </p>
          <Link to="/blog/science-of-focus">Read more →</Link>
        </BlogCard>
        
        <BlogCard>
          <BlogMeta>
            <span>July 28, 2025</span>
            <span>6 min read</span>
          </BlogMeta>
          <h2>Relaxation Methods for Programmers and Creatives</h2>
          <p>
            High-intensity mental work requires equally intentional relaxation. 
            Discover techniques specifically designed for developers and creative professionals.
          </p>
          <p>
            Learn how to combat screen fatigue, reduce eye strain, and maintain mental clarity 
            during long coding sessions.
          </p>
          <Link to="/blog/relaxation-for-programmers">Read more →</Link>
        </BlogCard>
      </ContentWrapper>
    </BlogContainer>
    </>
  );
};

export default Blog;