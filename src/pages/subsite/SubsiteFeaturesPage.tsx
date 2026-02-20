import { useParams, Navigate, Link } from 'react-router-dom';
import { Section, SectionHeader, AnimatedSection, StaggerChildren, FadeInUp, ServiceCard, BackToTop } from '../../components/common';
import { SubsiteHeader, SubsiteFooter } from '../../components/subsite';
import styles from './SubsiteFeaturesPage.module.css';

// Import subsite data
import qhaulManifest from '../../data/subsites/qhaul.json';
import qhaulFeatures from '../../data/subsites/qhaul/features.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const subsiteMap: Record<string, { manifest: any; features: any }> = {
  qhaul: { manifest: qhaulManifest, features: qhaulFeatures },
};

interface FeatureDetail {
  title: string;
  description: string;
  details?: string[];
}

interface FeatureCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: FeatureDetail[];
}

export function SubsiteFeaturesPage() {
  const { productSlug } = useParams<{ productSlug: string }>();

  const data = productSlug ? subsiteMap[productSlug] : null;

  if (!data) {
    return <Navigate to="/products" replace />;
  }

  const { manifest, features } = data;

  return (
    <main
      style={
        {
          '--color-primary': manifest.branding.colors.primary,
          '--color-secondary': manifest.branding.colors.secondary,
        } as React.CSSProperties
      }
    >
      <SubsiteHeader
        siteName={manifest.site.name}
        siteSlug={manifest.site.slug}
        navigation={manifest.navigation.mainNav}
        primaryColor={manifest.branding.colors.primary}
      />

      <Section className={styles.heroSection}>
        <div className={styles.breadcrumb}>
          <Link to={`/products/${productSlug}/site`} className={styles.breadcrumbLink}>
            {manifest.site.name}
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span>Features</span>
        </div>
        <AnimatedSection>
          <h1 className={styles.title}>{features.hero.title}</h1>
          <p className={styles.subtitle}>{features.hero.description}</p>
        </AnimatedSection>
      </Section>

      {features.featureCategories.map((category: FeatureCategory) => (
        <Section key={category.id} id={category.id} className={styles.categorySection}>
          <AnimatedSection>
            <SectionHeader title={category.title} subtitle={category.description} />
          </AnimatedSection>
          <StaggerChildren className={styles.featuresGrid} staggerDelay={0.08}>
            {category.features.map((feature: FeatureDetail, index: number) => (
              <FadeInUp key={index}>
                <div className={styles.featureCard}>
                  <ServiceCard title={feature.title} description={feature.description} />
                  {feature.details && (
                    <ul className={styles.detailsList}>
                      {feature.details.map((detail: string, detailIndex: number) => (
                        <li key={detailIndex} className={styles.detailItem}>
                          <span className={styles.checkmark}>✓</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FadeInUp>
            ))}
          </StaggerChildren>
        </Section>
      ))}

      <SubsiteFooter
        copyright={manifest.footer.copyright}
        links={manifest.footer.links}
        primaryColor={manifest.branding.colors.primary}
      />

      <BackToTop />
    </main>
  );
}
