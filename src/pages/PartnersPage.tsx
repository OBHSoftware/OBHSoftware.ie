import { Link } from 'react-router-dom';
import { Button, Masthead, Section, StaggerChildren, FadeInUp } from '../components/common';
import partnersData from '../data/partners.json';
import styles from './PartnersPage.module.css';

interface Partner {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  colors: { primary: string; secondary: string };
}

/* An approved-supplier register. The partner's own colour is allowed onto
   their plate and nowhere else — it is their mark, not ours. */
export function PartnersPage() {
  const partners = partnersData.partners as Partner[];

  return (
    <main>
      <Masthead
        serial="Approved suppliers"
        stamp={`${partners.length} on the list`}
        title={partnersData.heroTitle}
        lede={partnersData.intro}
        actions={<Button href="/#contact">Work with us</Button>}
      />

      <Section>
        <StaggerChildren className={styles.register} staggerDelay={0.08}>
          {partners.map((partner, i) => (
            <FadeInUp key={partner.id}>
              <Link
                className={styles.row}
                to={`/partners/${partner.slug}`}
                style={
                  {
                    '--partner-primary': partner.colors.primary,
                    '--partner-secondary': partner.colors.secondary,
                  } as React.CSSProperties
                }
              >
                <div className={styles.markCol}>
                  <span className={styles.mark} aria-hidden="true">
                    {partner.name.charAt(0)}
                  </span>
                  <span className={styles.no}>
                    S-{String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className={styles.body}>
                  <h2 className={styles.name}>{partner.name}</h2>
                  <p className={styles.tagline}>{partner.tagline}</p>
                  <p className={styles.description}>{partner.description}</p>
                  <span className={styles.more}>Read the record →</span>
                </div>

                <span className={styles.approved}>Approved</span>
              </Link>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section ruled tight>
        <div className={styles.tail}>
          <div>
            <h2 className={styles.tailTitle}>{partnersData.cta.title}</h2>
            <p className={styles.tailText}>{partnersData.cta.description}</p>
          </div>
          <Button href="/#contact">{partnersData.cta.buttonText}</Button>
        </div>
      </Section>
    </main>
  );
}
