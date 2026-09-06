import { useParams, Navigate } from 'react-router-dom';
import {
  Button,
  Masthead,
  Section,
  SectionHeader,
  StaggerChildren,
  FadeInUp,
} from '../components/common';
import caseStudiesData from '../data/caseStudies.json';
import styles from './CaseStudyDetailPage.module.css';

interface Stat {
  value: string;
  label: string;
}

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  sectorSlug: string;
  industry: string;
  services: string[];
  summary: string;
  challenge: string;
  approach: string[];
  outcome: {
    stats: Stat[];
    testimonial: { quote: string; author: string };
  };
}

/* One completed docket: what came in, what we did about it, what it produced.
   The stamp says DELIVERED because it was. */
export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = (caseStudiesData.caseStudies as CaseStudy[]).find(
    (c) => c.slug === slug,
  );

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  const { testimonial, stats } = study.outcome;

  return (
    <main>
      <Masthead
        serial={study.industry}
        stamp="Delivered"
        crumbs={[
          { label: 'Case studies', to: '/case-studies' },
          { label: study.client },
        ]}
        title={study.title}
        lede={study.summary}
        fields={[
          { key: 'Client', value: study.client },
          { key: 'Sector', value: study.industry },
          ...study.services.map((s, i) => ({ key: `Scope ${i + 1}`, value: s })),
        ]}
      />

      {/* The numbers first — they are the reason to read the rest. */}
      <Section tight sunk ruled>
        <div className={styles.results}>
          {stats.map((stat) => (
            <div className={styles.result} key={stat.label}>
              <span className={styles.resultValue}>{stat.value}</span>
              <span className={styles.resultLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section ruled>
        <div className={styles.split}>
          <SectionHeader eyebrow="Reported fault" title="The problem." />
          <p className={styles.body}>{study.challenge}</p>
        </div>
      </Section>

      <Section ruled>
        <SectionHeader
          eyebrow="Work carried out"
          title="What we did."
          subtitle="In order, and nothing that was not asked for."
        />

        <StaggerChildren className={styles.steps} staggerDelay={0.06}>
          {study.approach.map((item, i) => (
            <FadeInUp key={item}>
              <div className={styles.step}>
                <span className={styles.stepNo}>{String(i + 1).padStart(2, '0')}</span>
                <p className={styles.stepText}>{item}</p>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      {testimonial.quote && (
        <Section ruled>
          <figure className={styles.signoff}>
            <span className={styles.signoffLabel}>Signed off by the client</span>
            <blockquote className={styles.quote}>{testimonial.quote}</blockquote>
            {testimonial.author && (
              <figcaption className={styles.attribution}>
                {testimonial.author}
              </figcaption>
            )}
          </figure>
        </Section>
      )}

      <Section ruled tight>
        <div className={styles.tail}>
          <h2 className={styles.tailTitle}>Got one like this?</h2>
          <p className={styles.tailText}>
            Tell us what it costs you today. We will tell you straight whether it is
            worth building.
          </p>
          <div className={styles.tailActions}>
            <Button href="/#contact">Book a consultation</Button>
            <Button to="/case-studies" variant="ghost">
              ← Back to the register
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
