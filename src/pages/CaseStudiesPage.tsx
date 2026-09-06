import { Link } from 'react-router-dom';
import {
  Button,
  Masthead,
  Section,
  StaggerChildren,
  FadeInUp,
} from '../components/common';
import caseStudiesData from '../data/caseStudies.json';
import styles from './CaseStudiesPage.module.css';

interface Stat {
  value: string;
  label: string;
}

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  summary: string;
  outcome: { stats: Stat[] };
  featured: boolean;
}

/* A register of completed jobs. Each row is a filed docket: reference on the
   left, what it was in the middle, what came out of it on the right. */
export function CaseStudiesPage() {
  const studies = caseStudiesData.caseStudies as CaseStudy[];

  return (
    <main>
      <Masthead
        serial="Register — completed jobs"
        stamp={`${studies.length} on file`}
        title={caseStudiesData.heroTitle}
        lede={caseStudiesData.intro}
      />

      <Section>
        <div className={styles.head} aria-hidden="true">
          <span>Ref</span>
          <span>Job</span>
          <span>Outcome</span>
        </div>

        <StaggerChildren className={styles.register} staggerDelay={0.06}>
          {studies.map((study, i) => (
            <FadeInUp key={study.id}>
              <Link className={styles.row} to={`/case-studies/${study.slug}`}>
                <div className={styles.ref}>
                  <span className={styles.refNo}>
                    {String(i + 1).padStart(3, '0')}
                  </span>
                  <span className={styles.refIndustry}>{study.industry}</span>
                  {study.featured && <span className={styles.flag}>Featured</span>}
                </div>

                <div className={styles.job}>
                  <h2 className={styles.title}>{study.title}</h2>
                  <p className={styles.client}>{study.client}</p>
                  <p className={styles.summary}>{study.summary}</p>
                  <ul className={styles.services}>
                    {study.services.map((s) => (
                      <li className={styles.service} key={s}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.outcome}>
                  {study.outcome.stats.slice(0, 3).map((stat) => (
                    <div className={styles.stat} key={stat.label}>
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  ))}
                  <span className={styles.open}>Open docket →</span>
                </div>
              </Link>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section ruled tight>
        <div className={styles.tail}>
          <div>
            <h2 className={styles.tailTitle}>{caseStudiesData.cta.title}</h2>
            <p className={styles.tailText}>{caseStudiesData.cta.description}</p>
          </div>
          <Button href="/#contact">{caseStudiesData.cta.buttonText}</Button>
        </div>
      </Section>
    </main>
  );
}
