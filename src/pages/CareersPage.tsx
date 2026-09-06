import {
  Button,
  Masthead,
  Section,
  SectionHeader,
  StaggerChildren,
  FadeInUp,
} from '../components/common';
import careersData from '../data/careers.json';
import styles from './CareersPage.module.css';

interface CultureItem {
  title: string;
  description: string;
}

interface RoleType {
  title: string;
  description: string;
}

/* A vacancy notice. There are no numbered openings to list, so the page is
   honest about that and posts the kinds of people we want to hear from. */
export function CareersPage() {
  const email = careersData.cta.email;

  return (
    <main>
      <Masthead
        tone="hazard"
        serial="Vacancy notice"
        stamp="Open speculative"
        title={careersData.heroTitle}
        lede={careersData.heroSubtitle}
        actions={<Button href={`mailto:${email}`}>Get in touch</Button>}
      />

      <Section ruled>
        <div className={styles.about}>
          <SectionHeader eyebrow="The shop" title={careersData.about.title} />
          <p className={styles.body}>{careersData.about.description}</p>
        </div>
      </Section>

      <Section ruled>
        <SectionHeader eyebrow="Conditions" title="What it is like here." />
        <StaggerChildren className={styles.culture} staggerDelay={0.06}>
          {(careersData.about.culture as CultureItem[]).map((item) => (
            <FadeInUp key={item.title}>
              <div className={styles.cultureItem}>
                <h3 className={styles.cultureTitle}>{item.title}</h3>
                <p className={styles.cultureText}>{item.description}</p>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section ruled sunk>
        <SectionHeader
          eyebrow="Posts"
          title={careersData.roles.title}
          subtitle={careersData.roles.description}
        />

        <div className={styles.roles}>
          {(careersData.roles.types as RoleType[]).map((role, i) => (
            <FadeInUp key={role.title}>
              <article className={styles.role}>
                <div className={styles.roleStrip}>
                  <span className={styles.roleNo}>
                    Post {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.roleStamp}>Speculative</span>
                </div>
                <div className={styles.roleBody}>
                  <h3 className={styles.roleTitle}>{role.title}</h3>
                  <p className={styles.roleText}>{role.description}</p>
                  <a className={styles.apply} href={`mailto:${email}`}>
                    Apply for this →
                  </a>
                </div>
              </article>
            </FadeInUp>
          ))}
        </div>
      </Section>

      <Section ruled>
        <div className={styles.benefitsWrap}>
          <SectionHeader eyebrow="Terms" title={careersData.benefits.title} />
          <ul className={styles.benefits}>
            {careersData.benefits.items.map((benefit: string) => (
              <li className={styles.benefit} key={benefit}>
                <span className={styles.tick} aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section ruled tight>
        <div className={styles.tail}>
          <h2 className={styles.tailTitle}>{careersData.cta.title}</h2>
          <p className={styles.tailText}>{careersData.cta.description}</p>
          <a className={styles.email} href={`mailto:${email}`}>
            {email}
          </a>
          <div className={styles.tailActions}>
            <Button href={`mailto:${email}`}>{careersData.cta.buttonText}</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
