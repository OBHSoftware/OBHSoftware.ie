import { useParams, Navigate, Link } from 'react-router-dom';
import { Section, SectionHeader, PageHero, AnimatedSection, StaggerChildren, FadeInUp, Button } from '../components/common';
import partnersData from '../data/partners.json';
import styles from './PartnerDetailPage.module.css';

interface Highlight {
  title: string;
  description: string;
}

interface Partner {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  services: string[];
  highlights: Highlight[];
  colors: {
    primary: string;
    secondary: string;
  };
}

export function PartnerDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const partner = partnersData.partners.find((p: Partner) => p.slug === slug);

  if (!partner) {
    return <Navigate to="/partners" replace />;
  }

  return (
    <main>
      <PageHero
        title={partner.name}
        subtitle={partner.tagline}
      >
        <div
          className={styles.heroBadge}
          style={{
            '--partner-primary': partner.colors.primary,
            '--partner-secondary': partner.colors.secondary
          } as React.CSSProperties}
        >
          <span className={styles.badgeInitial}>{partner.name.charAt(0)}</span>
        </div>
        <Button href="/#contact" size="lg">
          Work With {partner.name.split(' ')[0]}
        </Button>
      </PageHero>

      <Section>
        <AnimatedSection>
          <SectionHeader title="About" />
        </AnimatedSection>
        <FadeInUp>
          <p className={styles.description}>{partner.description}</p>
        </FadeInUp>
      </Section>

      <Section>
        <AnimatedSection>
          <SectionHeader
            title="Services"
            subtitle={`What ${partner.name.split(' ')[0]} offers`}
          />
        </AnimatedSection>
        <StaggerChildren className={styles.servicesGrid} staggerDelay={0.05}>
          {partner.services.map((service: string, index: number) => (
            <FadeInUp key={index}>
              <div
                className={styles.serviceCard}
                style={{ '--partner-primary': partner.colors.primary } as React.CSSProperties}
              >
                <span className={styles.serviceCheck}>✓</span>
                <span>{service}</span>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section>
        <AnimatedSection>
          <SectionHeader
            title={`Why Choose ${partner.name.split(' ')[0]}`}
            subtitle="What sets them apart"
          />
        </AnimatedSection>
        <StaggerChildren className={styles.highlightsGrid} staggerDelay={0.1}>
          {partner.highlights.map((highlight: Highlight, index: number) => (
            <FadeInUp key={index}>
              <div className={styles.highlightCard}>
                <h3 className={styles.highlightTitle}>{highlight.title}</h3>
                <p className={styles.highlightDescription}>{highlight.description}</p>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section>
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaDescription}>
            Contact us to discuss how {partner.name} can help with your project.
            As an OBH Software partner, they understand our clients' needs and deliver exceptional results.
          </p>
          <div className={styles.ctaButtons}>
            <Button href="/#contact" size="lg">
              Get in Touch
            </Button>
            <Link to="/partners" className={styles.secondaryButton}>
              ← Back to Partners
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
