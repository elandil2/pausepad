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
            <span>September 3, 2024</span>
            <span>8 min read</span>
          </BlogMeta>
          <h2>Pomodoro Technique Explained: Complete Guide</h2>
          <p>
            Master the complete Pomodoro Technique with this comprehensive guide. Learn how this
            time management method can transform your productivity and focus.
          </p>
          <p>
            Discover the science behind Pomodoro, implementation strategies, and tips for
            maximizing your concentration during work and study sessions.
          </p>
          <Link to="/blog/pomodoro-technique-explained">Read more →</Link>
        </BlogCard>

        <BlogCard>
          <BlogMeta>
            <span>September 2, 2024</span>
            <span>6 min read</span>
          </BlogMeta>
          <h2>Best Study Timer Apps 2024: Top Pomodoro Tools</h2>
          <p>
            Discover the best study timer apps for students in 2024. Compare top Pomodoro timers,
            focus apps, and productivity tools to boost your study sessions.
          </p>
          <p>
            From integrated music streaming to task management features, find the perfect study
            companion for your learning style and academic goals.
          </p>
          <Link to="/blog/best-study-timer-apps">Read more →</Link>
        </BlogCard>

        <BlogCard>
          <BlogMeta>
            <span>September 1, 2024</span>
            <span>7 min read</span>
          </BlogMeta>
          <h2>Focus Timer for Productivity: Master Your Concentration</h2>
          <p>
            Learn how focus timers can dramatically improve your productivity. Discover techniques,
            tools, and strategies for maintaining concentration during work sessions.
          </p>
          <p>
            Explore the science of concentration, advanced timing strategies, and practical tips
            for building sustainable focus habits in your daily routine.
          </p>
          <Link to="/blog/focus-timer-productivity">Read more →</Link>
        </BlogCard>

        <BlogCard>
          <BlogMeta>
            <span>August 31, 2024</span>
            <span>9 min read</span>
          </BlogMeta>
          <h2>Time Management with Pomodoro: Master Your Schedule</h2>
          <p>
            Transform your time management skills with the Pomodoro Technique. Learn how to prioritize
            tasks, eliminate distractions, and create sustainable work rhythms.
          </p>
          <p>
            Discover advanced strategies for daily planning, task estimation, and maintaining
            work-life balance while maximizing your productivity potential.
          </p>
          <Link to="/blog/time-management-pomodoro">Read more →</Link>
        </BlogCard>

        <BlogCard>
          <BlogMeta>
            <span>August 30, 2024</span>
            <span>6 min read</span>
          </BlogMeta>
          <h2>Concentration Timer Techniques: Master Your Focus</h2>
          <p>
            Discover concentration timer techniques to improve focus and productivity. Learn methods
            for better concentration, attention management, and sustained mental performance.
          </p>
          <p>
            Explore the science of concentration, practical techniques, and tools for building
            stronger focus muscles and achieving deeper levels of concentration.
          </p>
          <Link to="/blog/concentration-timer-techniques">Read more →</Link>
        </BlogCard>

        <BlogCard>
          <BlogMeta>
            <span>August 29, 2024</span>
            <span>8 min read</span>
          </BlogMeta>
          <h2>Work Timer for Better Focus: Transform Your Productivity</h2>
          <p>
            Learn how work timers can dramatically improve your focus and productivity at work.
            Discover strategies for better concentration, time management, and work performance.
          </p>
          <p>
            Explore professional focus techniques, workplace applications, and tools designed
            specifically for maintaining concentration in office environments.
          </p>
          <Link to="/blog/work-timer-better-focus">Read more →</Link>
        </BlogCard>
      </ContentWrapper>
    </BlogContainer>
    </>
  );
};

export default Blog;