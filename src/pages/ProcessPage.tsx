import {
  Button,
  Masthead,
  Section,
  SectionHeader,
  StaggerChildren,
  FadeInUp,
} from '../components/common';
import processData from '../data/process.json';
import styles from './ProcessPage.module.css';

interface Phase {
  step: number;
  title: string;
  duration: string;
  description: string;
  activities: string[];
  deliverables: string[];
}

interface Principle {
  title: string;
  description: string;
}

/* A method statement. The phases run down a rail so the sequence is the
   structure of the page, and each phase states what happens and what you are
   handed at the end of it. */
export function ProcessPage() {
  const phases = processData.phases as Phase[];

  return (
    <main>
      <Masthead
        serial="Method statement"
        stamp={`${phases.length} phases`}
        title={processData.heroTitle}
        lede={processData.intro}
        actions={<Button href="/#contact">Book your free audit</Button>}
      />

      <Section ruled>
        <SectionHeader
          eyebrow="Sequence"
          title="How a job runs."
          subtitle={processData.heroSubtitle}
        />

        <div className={styles.rail}>
          {phases.map((phase) => (
            <FadeInUp key={phase.step}>
              <article className={styles.phase}>
                <div className={styles.marker}>
                  <span className={styles.step}>
                    {String(phase.step).padStart(2, '0')}
                  </span>
                </div>

                <div className={styles.phaseBody}>
                  <div className={styles.phaseHead}>
                    <h3 className={styles.phaseTitle}>{phase.title}</h3>
                    <span className={styles.duration}>{phase.duration}</span>
                  </div>

                  <p className={styles.phaseText}>{phase.description}</p>

                  <div className={styles.columns}>
                    <div>
                      <h4 className={styles.colTitle}>On site</h4>
                      <ul className={styles.list}>
                        {phase.activities.map((a) => (
                          <li className={styles.listItem} key={a}>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className={styles.colTitle}>You are handed</h4>
                      <ul className={styles.list}>
                        {phase.deliverables.map((d) => (
                          <li className={`${styles.listItem} ${styles.delivered}`} key={d}>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </FadeInUp>
          ))}
        </div>
      </Section>

      <Section ruled sunk>
        <SectionHeader eyebrow="Standing rules" title="How we work, every job." />
        <StaggerChildren className={styles.principles} staggerDelay={0.06}>
          {(processData.principles as Principle[]).map((p) => (
            <FadeInUp key={p.title}>
              <div className={styles.principle}>
                <h3 className={styles.principleTitle}>{p.title}</h3>
                <p className={styles.principleText}>{p.description}</p>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section ruled tight>
        <div className={styles.tail}>
          <h2 className={styles.tailTitle}>{processData.cta.title}</h2>
          <p className={styles.tailText}>{processData.cta.description}</p>
          <div className={styles.tailActions}>
            <Button href="/#contact">{processData.cta.buttonText}</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
