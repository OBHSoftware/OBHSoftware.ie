import {
  Button,
  Docket,
  Section,
  SectionHeader,
  StaggerChildren,
  FadeInUp,
} from '../common';
import home from '../../data/home.json';
import caseStudies from '../../data/caseStudies.json';
import styles from './Work.module.css';

export function Work() {
  const { work } = home;
  const featured = caseStudies.caseStudies.filter((c) => c.featured);

  return (
    <Section id="work" ruled>
      <SectionHeader
        eyebrow={work.eyebrow}
        title={work.title}
        subtitle={work.subtitle}
      />

      <StaggerChildren className={styles.list} staggerDelay={0.08}>
        {featured.map((c) => (
          <FadeInUp key={c.id}>
            <Docket serial={c.industry} stamp="Delivered" stampTone="pass" interactive>
              <div className={styles.entry}>
                <div>
                  <h3 className={styles.title}>{c.title}</h3>
                  <p className={styles.summary}>{c.summary}</p>
                  <div className={styles.actions}>
                    <Button to={`/case-studies/${c.slug}`} variant="ghost">
                      Read the write-up →
                    </Button>
                  </div>
                </div>

                <div className={styles.stats}>
                  {c.outcome.stats.map((s) => (
                    <div className={styles.stat} key={s.label}>
                      <span className={styles.statValue}>{s.value}</span>
                      <span className={styles.statLabel}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Docket>
          </FadeInUp>
        ))}
      </StaggerChildren>

      <div className={styles.footer}>
        <span className={styles.footerNote}>
          {featured.length} of {caseStudies.caseStudies.length} projects shown
        </span>
        <Button to="/case-studies" variant="secondary">
          See every project
        </Button>
      </div>
    </Section>
  );
}
