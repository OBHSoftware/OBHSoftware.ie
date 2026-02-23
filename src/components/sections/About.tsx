import { Section, SectionHeader, AnimatedSection, StaggerChildren, FadeInUp } from '../common';
import styles from './About.module.css';
import aboutData from '../../data/about.json';

export function About() {
  return (
    <Section id="about">
      <AnimatedSection>
        <SectionHeader
          title={aboutData.sectionTitle}
          subtitle={aboutData.sectionSubtitle}
        />
      </AnimatedSection>

      <div className={styles.content}>
        <AnimatedSection delay={0.1}>
          {aboutData.intro.map((paragraph, index) => (
            <p key={index} className={styles.intro}>{paragraph}</p>
          ))}
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h3 className={styles.highlightsTitle}>{aboutData.highlightsTitle}</h3>
          <StaggerChildren className={styles.highlights} staggerDelay={0.1}>
            {aboutData.highlights.map((item, index) => (
              <FadeInUp key={index}>
                <li className={styles.highlightItem}>{item.text}</li>
              </FadeInUp>
            ))}
          </StaggerChildren>
        </AnimatedSection>
      </div>
    </Section>
  );
}
