import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section, SectionHeader, PageHero, AnimatedSection, StaggerChildren, FadeInUp, Button } from '../components/common';
import caseStudiesData from '../data/caseStudies.json';
import styles from './CaseStudyDetailPage.module.css';

interface Stat {
  value: string;
  label: string;
}

interface Testimonial {
  quote: string;
  author: string;
}

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  sectorSlug: string;
  industry: string;
  services: string[];
  summary: string;
  challenge: string;
  approach: string[];
  outcome: {
    stats: Stat[];
    testimonial: Testimonial;
  };
}

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = caseStudiesData.caseStudies.find((c: CaseStudy) => c.slug === slug);

  if (!caseStudy) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <main>
      <PageHero
        title={caseStudy.title}
        subtitle={caseStudy.summary}
      >
        <span className={styles.industry}>{caseStudy.industry}</span>
        <Button href="/#contact" size="lg">
          Discuss Your Project
        </Button>
      </PageHero>

      <Section>
        <div className={styles.statsRow}>
          {caseStudy.outcome.stats.map((stat: Stat, index: number) => (
            <motion.div
              key={index}
              className={styles.stat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <AnimatedSection>
          <SectionHeader title="The Challenge" />
        </AnimatedSection>
        <FadeInUp>
          <p className={styles.content}>{caseStudy.challenge}</p>
        </FadeInUp>
      </Section>

      <Section>
        <AnimatedSection>
          <SectionHeader title="Our Approach" />
        </AnimatedSection>
        <StaggerChildren className={styles.approachList} staggerDelay={0.08}>
          {caseStudy.approach.map((item: string, index: number) => (
            <FadeInUp key={index}>
              <div className={styles.approachItem}>
                <span className={styles.approachNumber}>{index + 1}</span>
                <span>{item}</span>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section>
        <AnimatedSection>
          <SectionHeader title="The Results" />
        </AnimatedSection>
        <FadeInUp>
          <div className={styles.testimonialCard}>
            <blockquote className={styles.quote}>
              <p>{caseStudy.outcome.testimonial.author ? `"${caseStudy.outcome.testimonial.quote}"` : caseStudy.outcome.testimonial.quote}</p>
              {caseStudy.outcome.testimonial.author && (
                <footer className={styles.quoteAuthor}>
                  <cite>— {caseStudy.outcome.testimonial.author}</cite>
                </footer>
              )}
            </blockquote>
          </div>
        </FadeInUp>
      </Section>

      <Section>
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready for Similar Results?</h2>
          <p className={styles.ctaDescription}>
            Let's discuss how we can help transform your IT operations.
          </p>
          <div className={styles.ctaButtons}>
            <Button href="/#contact" size="lg">
              Start the Conversation
            </Button>
            <Link to="/case-studies" className={styles.secondaryButton}>
              ← More Case Studies
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
