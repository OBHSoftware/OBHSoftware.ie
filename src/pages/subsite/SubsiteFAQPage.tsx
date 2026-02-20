import { useParams, Navigate, Link } from 'react-router-dom';
import { Section, SectionHeader, AnimatedSection, FadeInUp, BackToTop } from '../../components/common';
import { SubsiteHeader, SubsiteFooter } from '../../components/subsite';
import styles from './SubsiteFAQPage.module.css';

// Import subsite data
import qhaulManifest from '../../data/subsites/qhaul.json';
import qhaulFaq from '../../data/subsites/qhaul/faq.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const subsiteMap: Record<string, { manifest: any; faq: any }> = {
  qhaul: { manifest: qhaulManifest, faq: qhaulFaq },
};

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  faqs: FAQ[];
}

export function SubsiteFAQPage() {
  const { productSlug } = useParams<{ productSlug: string }>();

  const data = productSlug ? subsiteMap[productSlug] : null;

  if (!data) {
    return <Navigate to="/products" replace />;
  }

  const { manifest, faq } = data;

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
          <span>FAQ</span>
        </div>
        <AnimatedSection>
          <h1 className={styles.title}>{faq.title}</h1>
          <p className={styles.subtitle}>{faq.subtitle}</p>
        </AnimatedSection>
      </Section>

      {faq.categories.map((category: FAQCategory, categoryIndex: number) => (
        <Section key={categoryIndex} className={styles.categorySection}>
          <AnimatedSection>
            <SectionHeader title={category.name} />
          </AnimatedSection>
          <div className={styles.faqList}>
            {category.faqs.map((item: FAQ, faqIndex: number) => (
              <FadeInUp key={faqIndex}>
                <details className={styles.faqItem}>
                  <summary className={styles.question}>{item.question}</summary>
                  <p className={styles.answer}>{item.answer}</p>
                </details>
              </FadeInUp>
            ))}
          </div>
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
