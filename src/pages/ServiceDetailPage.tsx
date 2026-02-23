import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section, SectionHeader, PageHero, AnimatedSection, StaggerChildren, FadeInUp, Button } from '../components/common';
import { ShieldIcon, MoneyIcon, CertificateIcon, BuildingIcon, TruckIcon, TeamIcon } from '../components/icons';
import serviceDetailsData from '../data/serviceDetails.json';
import styles from './ServiceDetailPage.module.css';

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

interface Service {
  id: string;
  name: string;
  slug: string;
  icon: string;
  shortDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  features: Feature[];
  benefits: string[];
  stats: Stat[];
}

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = serviceDetailsData.services.find((s: Service) => s.slug === slug);

  if (!service) {
    return <Navigate to="/#services" replace />;
  }

  const IconComponent = iconMap[service.icon] || ShieldIcon;

  return (
    <main>
      <PageHero
        title={service.heroTitle}
        subtitle={service.heroSubtitle}
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
          {service.stats.map((stat: Stat, index: number) => (
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
          <p className={styles.description}>{service.description}</p>
        </FadeInUp>
      </Section>

      <Section>
        <AnimatedSection>
          <SectionHeader
            title="Key Features"
            subtitle="What's included in this service"
          />
        </AnimatedSection>
        <StaggerChildren className={styles.featuresGrid} staggerDelay={0.1}>
          {service.features.map((feature: Feature, index: number) => (
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
            title="Benefits"
            subtitle="How this service helps your business"
          />
        </AnimatedSection>
        <StaggerChildren className={styles.benefitsList} staggerDelay={0.08}>
          {service.benefits.map((benefit: string, index: number) => (
            <FadeInUp key={index}>
              <div className={styles.benefitItem}>
                <span className={styles.checkmark}>✓</span>
                <span>{benefit}</span>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section>
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaDescription}>
            Let's discuss how {service.name.toLowerCase()} can strengthen your business.
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
