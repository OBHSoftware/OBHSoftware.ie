import {
  AnimatedSection,
  Button,
  Docket,
  Section,
  SectionHeader,
  StaggerChildren,
  FadeInUp,
} from '../common';
import home from '../../data/home.json';
import servicesData from '../../data/services.json';
import pricingData from '../../data/pricing.json';
import serviceDetails from '../../data/serviceDetails.json';
import styles from './Services.module.css';

export function Services() {
  const { services: copy } = home;

  return (
    <Section id="services" ruled>
      <SectionHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        subtitle={copy.subtitle}
      />

      <StaggerChildren className={styles.grid} staggerDelay={0.08}>
        {servicesData.services.map((service) => {
          const detail = serviceDetails.services.find((d) => d.slug === service.slug);
          const deliverables = detail?.features.slice(0, 4) ?? [];

          return (
            <FadeInUp className={styles.card} key={service.slug}>
              <Docket
                className={styles.card}
                serial={service.slug.replace('-', ' ')}
                stamp="Service"
                stampTone="accent"
                interactive
              >
                <h3 className={styles.name}>{service.title}</h3>
                <p className={styles.description}>{service.description}</p>

                <div className={styles.deliverables}>
                  {deliverables.map((f) => (
                    <span className={styles.deliverable} key={f.title}>
                      <span className={styles.tick} aria-hidden="true">
                        ✓
                      </span>
                      {f.title}
                    </span>
                  ))}
                </div>

                <div className={styles.actions}>
                  <Button to={`/services/${service.slug}`} variant="ghost">
                    What this involves →
                  </Button>
                </div>
              </Docket>
            </FadeInUp>
          );
        })}
      </StaggerChildren>

      {/* How you actually engage us. Kept short — the detail belongs on a call. */}
      <AnimatedSection className={styles.engage}>
        <span className={styles.engageLabel}>Ways to engage</span>
        <div className={styles.engageGrid}>
          {pricingData.plans.map((plan) => (
            <div className={styles.engageItem} key={plan.name}>
              <span className={styles.engageName}>{plan.name}</span>
              <span className={styles.engageNote}>{plan.footnote}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </Section>
  );
}
