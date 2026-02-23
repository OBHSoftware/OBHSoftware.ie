import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section, SectionHeader, PageHero, AnimatedSection, StaggerChildren, FadeInUp, Button } from '../components/common';
import { ShieldIcon, MoneyIcon, CertificateIcon, BuildingIcon, TruckIcon, TeamIcon } from '../components/icons';
import sectorsData from '../data/sectors.json';
import styles from './SectorDetailPage.module.css';

const iconMap: { [key: string]: React.ComponentType } = {
  shield: ShieldIcon,
  money: MoneyIcon,
  certificate: CertificateIcon,
  building: BuildingIcon,
  truck: TruckIcon,
  team: TeamIcon,
};

interface Feature {
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Sector {
  id: string;
  name: string;
  slug: string;
  icon: string;
  shortDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  features: Feature[];
  challenges: string[];
  stats: Stat[];
}

export function SectorDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const sector = sectorsData.sectors.find((s: Sector) => s.slug === slug);

  if (!sector) {
    return <Navigate to="/sectors" replace />;
  }

  const IconComponent = iconMap[sector.icon] || ShieldIcon;

  return (
    <main>
      <PageHero
        title={sector.heroTitle}
        subtitle={sector.heroSubtitle}
      >
        <div className={styles.heroIcon}>
          <IconComponent />
        </div>
        <Button href="/#contact" size="lg">
          Get Started
        </Button>
      </PageHero>

      <Section>
        <div className={styles.statsRow}>
          {sector.stats.map((stat: Stat, index: number) => (
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
          <SectionHeader title="Overview" />
        </AnimatedSection>
        <FadeInUp>
          <p className={styles.description}>{sector.description}</p>
        </FadeInUp>
      </Section>

      <Section>
        <AnimatedSection>
          <SectionHeader
            title="Key Features"
            subtitle="What we offer for your industry"
          />
        </AnimatedSection>
        <StaggerChildren className={styles.featuresGrid} staggerDelay={0.1}>
          {sector.features.map((feature: Feature, index: number) => (
            <FadeInUp key={index}>
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section>
        <AnimatedSection>
          <SectionHeader
            title="Challenges We Address"
            subtitle="Common IT challenges in your industry"
          />
        </AnimatedSection>
        <StaggerChildren className={styles.challengesList} staggerDelay={0.08}>
          {sector.challenges.map((challenge: string, index: number) => (
            <FadeInUp key={index}>
              <div className={styles.challengeItem}>
                <span className={styles.checkmark}>✓</span>
                <span>{challenge}</span>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section>
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Transform Your IT?</h2>
          <p className={styles.ctaDescription}>
            Let's discuss how we can help your {sector.name.toLowerCase()} organization succeed.
          </p>
          <div className={styles.ctaButtons}>
            <Button href="/#contact" size="lg">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
