import { useParams, Navigate } from 'react-router-dom';
import {
  Button,
  Masthead,
  Section,
  SectionHeader,
  StaggerChildren,
  FadeInUp,
} from '../components/common';
import partnersData from '../data/partners.json';
import styles from './PartnerDetailPage.module.css';

interface Highlight {
  title: string;
  description: string;
}

interface Partner {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  services: string[];
  highlights: Highlight[];
  colors: { primary: string; secondary: string };
}

/* A supplier record. Same register language as the index, opened up. */
export function PartnerDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const partner = (partnersData.partners as Partner[]).find((p) => p.slug === slug);

  if (!partner) {
    return <Navigate to="/partners" replace />;
  }

  const short = partner.name.split(' ')[0];

  return (
    <main>
      <div
        style={
          {
            '--partner-primary': partner.colors.primary,
            '--partner-secondary': partner.colors.secondary,
          } as React.CSSProperties
        }
      >
        <Masthead
          serial="Supplier record"
          stamp="Approved"
          crumbs={[{ label: 'Partners', to: '/partners' }, { label: partner.name }]}
          title={partner.name}
          lede={partner.tagline}
          aside={
            <span className={styles.mark} aria-hidden="true">
              {partner.name.charAt(0)}
            </span>
          }
          actions={<Button href="/#contact">Work with {short}</Button>}
        />

        <Section ruled>
          <div className={styles.about}>
            <SectionHeader eyebrow="Record" title="Who they are." />
            <p className={styles.body}>{partner.description}</p>
          </div>
        </Section>

        <Section ruled sunk>
          <SectionHeader eyebrow="Capability" title={`What ${short} does.`} />
          <ul className={styles.services}>
            {partner.services.map((service) => (
              <li className={styles.service} key={service}>
                <span className={styles.tick} aria-hidden="true" />
                {service}
              </li>
            ))}
          </ul>
        </Section>

        <Section ruled>
          <SectionHeader eyebrow="Why them" title={`What sets ${short} apart.`} />
          <StaggerChildren className={styles.highlights} staggerDelay={0.06}>
            {partner.highlights.map((highlight) => (
              <FadeInUp key={highlight.title}>
                <div className={styles.highlight}>
                  <h3 className={styles.highlightTitle}>{highlight.title}</h3>
                  <p className={styles.highlightText}>{highlight.description}</p>
                </div>
              </FadeInUp>
            ))}
          </StaggerChildren>
        </Section>

        <Section ruled tight>
          <div className={styles.tail}>
            <h2 className={styles.tailTitle}>Bring {short} onto your job.</h2>
            <p className={styles.tailText}>
              As an OBH partner they already know how we work, so there is no
              handover tax when we run a job together.
            </p>
            <div className={styles.tailActions}>
              <Button href="/#contact">Get in touch</Button>
              <Button to="/partners" variant="ghost">
                ← All partners
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
