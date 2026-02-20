import { Section, SectionHeader, PlanCard, AnimatedSection, StaggerChildren, FadeInUp } from '../common';
import styles from './Pricing.module.css';
import pricingData from '../../data/pricing.json';

export function Pricing() {
  return (
    <Section id="pricing">
      <AnimatedSection>
        <SectionHeader
          title={pricingData.sectionTitle}
          subtitle={pricingData.sectionSubtitle}
        />
      </AnimatedSection>

      <StaggerChildren className={styles.plans} staggerDelay={0.15}>
        {pricingData.plans.map((plan, index) => (
          <FadeInUp key={index}>
            <PlanCard
              name={plan.name}
              price={'price' in plan ? (plan as { price: string }).price : undefined}
              contactUs={'contactUs' in plan ? (plan as { contactUs: boolean }).contactUs : undefined}
              features={plan.features}
              footnote={plan.footnote}
            />
          </FadeInUp>
        ))}
      </StaggerChildren>
    </Section>
  );
}
