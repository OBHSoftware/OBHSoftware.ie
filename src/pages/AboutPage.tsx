import { Section, SectionHeader, PageHero, AnimatedSection, StaggerChildren, FadeInUp, Button } from '../components/common';
import aboutData from '../data/about.json';
import styles from './AboutPage.module.css';

export function AboutPage() {
  return (
    <main>
      <PageHero
        title="About OBH Software"
        subtitle="Founded by Engineers. Driven by Innovation."
      />

      <Section>
        <AnimatedSection>
          <div className={styles.story}>
            {aboutData.intro.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>{paragraph}</p>
            ))}
          </div>
        </AnimatedSection>
      </Section>

      <Section>
        <AnimatedSection>
          <SectionHeader title="Who We Are" subtitle="The people behind OBH Software" />
        </AnimatedSection>
        <div className={styles.founders}>
          <FadeInUp>
            <div className={styles.founderCard}>
              <img src="/images/team/ethan-obrien.png" alt="Ethan O'Brien" className={styles.founderPhoto} />
              <h3 className={styles.founderName}>Ethan O'Brien</h3>
              <p className={styles.founderRole}>Co-Founder</p>
              <p className={styles.founderBio}>Serial entrepreneur and Electronic and Computer Engineering student from the University of Galway. Ethan specialises in turning complex ideas into practical software products, leading technical direction from concept through to delivery. He thrives on solving technical challenges, building products from the ground up and turning ideas into real working systems.</p>
            </div>
          </FadeInUp>
          <FadeInUp>
            <div className={styles.founderCard}>
              <img src="/images/team/sarah-jane-hughes.jpeg" alt="Sarah Jane Hughes" className={styles.founderPhoto} />
              <h3 className={styles.founderName}>Sarah Jane Hughes</h3>
              <p className={styles.founderRole}>Co-Founder</p>
              <p className={styles.founderBio}>Innovation driven Electronic and Computer Engineering student and collaborative leader from the University of Galway. Sarah Jane combines technical thinking with strong client leadership, guiding projects from early conversations through to delivery. She is both a builder and a bridge between clients and technology, helping turn complex ideas into solutions that create impact.</p>
            </div>
          </FadeInUp>
        </div>
      </Section>

      <Section>
        <AnimatedSection>
          <SectionHeader title={aboutData.highlightsTitle} subtitle="Awards and recognition" />
        </AnimatedSection>
        <StaggerChildren className={styles.highlights} staggerDelay={0.1}>
          {aboutData.highlights.map((item, index) => (
            <FadeInUp key={index}>
              <li className={styles.highlightItem}>{item.text}</li>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section>
        <AnimatedSection>
          <SectionHeader title="How We Work" subtitle="Our approach to building software" />
        </AnimatedSection>
        <StaggerChildren className={styles.approachGrid} staggerDelay={0.1}>
          <FadeInUp>
            <div className={styles.approachCard}>
              <h3 className={styles.approachTitle}>Understand the Problem First</h3>
              <p className={styles.approachDescription}>We start by understanding how your business actually works — the real workflows, bottlenecks and pain points — before writing any code.</p>
            </div>
          </FadeInUp>
          <FadeInUp>
            <div className={styles.approachCard}>
              <h3 className={styles.approachTitle}>Build Practical Solutions</h3>
              <p className={styles.approachDescription}>We build software that solves the problem at hand. No unnecessary complexity, no over-engineering. Practical tools that people actually use.</p>
            </div>
          </FadeInUp>
          <FadeInUp>
            <div className={styles.approachCard}>
              <h3 className={styles.approachTitle}>Work Closely With You</h3>
              <p className={styles.approachDescription}>We keep communication clear and frequent. You'll always know where things stand, what's being worked on and what's coming next.</p>
            </div>
          </FadeInUp>
          <FadeInUp>
            <div className={styles.approachCard}>
              <h3 className={styles.approachTitle}>Support What We Build</h3>
              <p className={styles.approachDescription}>We don't disappear after launch. We provide ongoing support, fix issues quickly and help you evolve the platform as your business grows.</p>
            </div>
          </FadeInUp>
        </StaggerChildren>
      </Section>

      <Section>
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Want to Work With Us?</h2>
          <p className={styles.ctaDescription}>We'd love to hear about what you're building. Get in touch for a free consultation.</p>
          <Button href="/#contact" size="lg">
            Book a Consultation
          </Button>
        </div>
      </Section>
    </main>
  );
}
