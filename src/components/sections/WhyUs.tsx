import { Section, SectionHeader, FeatureItem, AnimatedSection, StaggerChildren, FadeInUp } from '../common';
import styles from './WhyUs.module.css';
import { ClockIcon, TeamIcon, MoneyIcon, TruckIcon, LightbulbIcon } from '../icons';
import whyUsData from '../../data/whyUs.json';

const iconMap: Record<string, React.ReactNode> = {
  clock: <ClockIcon />,
  lightbulb: <LightbulbIcon />,
  team: <TeamIcon />,
  money: <MoneyIcon />,
  truck: <TruckIcon />,
};

export function WhyUs() {
  return (
    <Section id="why-us">
      <AnimatedSection>
        <SectionHeader
          title={whyUsData.sectionTitle}
          subtitle={whyUsData.sectionSubtitle}
        />
      </AnimatedSection>

      <div className={styles.content}>
        <AnimatedSection delay={0.1}>
          <p className={styles.intro}>{whyUsData.intro}</p>
        </AnimatedSection>

        <StaggerChildren className={styles.features} staggerDelay={0.15}>
          {whyUsData.features.map((feature, index) => (
            <FadeInUp key={index}>
              <FeatureItem icon={iconMap[feature.icon]} text={feature.text} />
            </FadeInUp>
          ))}
        </StaggerChildren>
      </div>
    </Section>
  );
}
