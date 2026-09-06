import { Docket, Section, SectionHeader, AnimatedSection } from '../common';
import home from '../../data/home.json';
import aboutData from '../../data/about.json';
import styles from './About.module.css';

export function About() {
  const { about } = home;

  return (
    <Section id="about" ruled>
      <SectionHeader eyebrow={about.eyebrow} title={about.title} />

      <div className={styles.content}>
        <AnimatedSection>
          <div>
            {aboutData.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className={styles.intro}>
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className={styles.side}>
            <Docket
              serial="The two of us"
              stamp="Galway"
              stampTone="accent"
              fields={[
                { key: 'Founded', value: 'University of Galway' },
                { key: 'Met via', value: 'Stanford Innovation Fellowship' },
              ]}
            >
              <div className={styles.founders}>
                {about.founders.map((f) => (
                  <div className={styles.founder} key={f.name}>
                    <span className={styles.founderName}>{f.name}</span>
                    <span className={styles.founderRole}>{f.role}</span>
                  </div>
                ))}
              </div>
            </Docket>

            <p className={styles.note}>
              One of us was building compliance systems for construction, the other
              for haulage. Same problem, different sector.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  );
}
