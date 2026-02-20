import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section, SectionHeader, PageHero, AnimatedSection, StaggerChildren, FadeInUp, Button } from '../components/common';
import productsData from '../data/products.json';
import styles from './ProductDetailPage.module.css';

interface Feature {
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  status: string;
  description: string;
  features: Feature[];
  benefits: string[];
  stats: Stat[];
  externalUrl?: string;
}

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = productsData.products.find((p: Product) => p.slug === slug);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <main>
      <PageHero
        title={product.name}
        subtitle={product.tagline}
      >
        <span className={`${styles.statusBadge} ${styles[product.status.replace('-', '')]}`}>
          {product.status === 'available' ? 'Available Now' : 'Coming Soon'}
        </span>
        <Button href="/#contact" size="lg">
          {product.status === 'available' ? 'Get Started' : 'Register Interest'}
        </Button>
      </PageHero>

      <Section>
        <div className={styles.statsRow}>
          {product.stats.map((stat: Stat, index: number) => (
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
          <p className={styles.description}>{product.description}</p>
        </FadeInUp>
      </Section>

      <Section>
        <AnimatedSection>
          <SectionHeader
            title="Features"
            subtitle="What's included"
          />
        </AnimatedSection>
        <StaggerChildren className={styles.featuresGrid} staggerDelay={0.08}>
          {product.features.map((feature: Feature, index: number) => (
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
            subtitle="How it helps your business"
          />
        </AnimatedSection>
        <StaggerChildren className={styles.benefitsList} staggerDelay={0.05}>
          {product.benefits.map((benefit: string, index: number) => (
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
          <h2 className={styles.ctaTitle}>
            {product.status === 'available'
              ? `Ready to Try ${product.name}?`
              : `Interested in ${product.name}?`}
          </h2>
          <p className={styles.ctaDescription}>
            {product.status === 'available'
              ? `Get in touch to schedule a demo and see how ${product.name} can transform your operations.`
              : `Register your interest to be notified when ${product.name} launches and get early access.`}
          </p>
          <div className={styles.ctaButtons}>
            {product.externalUrl ? (
              <a href={product.externalUrl} target="_blank" rel="noopener noreferrer" className={styles.subsiteButton}>
                Visit {product.name} Site →
              </a>
            ) : (
              <Link to={`/products/${product.slug}/site`} className={styles.subsiteButton}>
                Visit {product.name} Site →
              </Link>
            )}
            <Button href="/#contact" size="lg">
              {product.status === 'available' ? 'Schedule a Demo' : 'Register Interest'}
            </Button>
            <Link to="/products" className={styles.secondaryButton}>
              ← Back to Products
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
