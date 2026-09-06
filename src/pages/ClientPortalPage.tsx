import { Masthead, Section, StaggerChildren, FadeInUp } from '../components/common';
import clientPortalData from '../data/clientPortal.json';
import styles from './ClientPortalPage.module.css';

interface PortalItem {
  title: string;
  description: string;
  icon: string;
  linkType: string;
  url: string;
  buttonText: string;
}

interface PortalSection {
  title: string;
  items: PortalItem[];
}

interface ResourceLink {
  title: string;
  url: string;
}

/* A control panel. Every tile is a switch that does one thing, and the
   emergency line is marked as an emergency line — hazard rail, fail colour,
   the number set large enough to read off a screen at arm's length. */
export function ClientPortalPage() {
  const { emergencySupport, resources } = clientPortalData;

  return (
    <main>
      <Masthead
        tone="plate"
        serial="Client access"
        stamp="Existing clients"
        title={clientPortalData.heroTitle}
        lede={clientPortalData.intro}
      />

      {(clientPortalData.sections as PortalSection[]).map((section) => (
        <Section key={section.title} ruled>
          <h2 className={styles.sectionTitle}>{section.title}</h2>

          <StaggerChildren className={styles.panel} staggerDelay={0.05}>
            {section.items.map((item) => {
              const external = item.linkType === 'external';
              return (
                <FadeInUp key={item.title}>
                  <a
                    className={styles.switch}
                    href={item.url}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <span className={styles.switchTitle}>{item.title}</span>
                    <span className={styles.switchText}>{item.description}</span>
                    <span className={styles.switchAction}>
                      {item.buttonText}
                      {external && <span aria-hidden="true"> ↗</span>}
                    </span>
                  </a>
                </FadeInUp>
              );
            })}
          </StaggerChildren>
        </Section>
      ))}

      <Section ruled>
        <aside className={styles.emergency}>
          <div className={styles.emergencyRail} aria-hidden="true" />
          <div className={styles.emergencyBody}>
            <span className={styles.emergencyLabel}>Emergency</span>
            <h2 className={styles.emergencyTitle}>{emergencySupport.title}</h2>
            <p className={styles.emergencyText}>{emergencySupport.description}</p>

            <ol className={styles.instructions}>
              {emergencySupport.instructions.map((instruction: string) => (
                <li key={instruction}>{instruction}</li>
              ))}
            </ol>

            <a
              className={styles.phone}
              href={`tel:${emergencySupport.phone.replace(/\s/g, '')}`}
            >
              {emergencySupport.phone}
            </a>
            <p className={styles.note}>{emergencySupport.note}</p>
          </div>
        </aside>
      </Section>

      <Section ruled tight>
        <h2 className={styles.sectionTitle}>{resources.title}</h2>
        <p className={styles.resourcesText}>{resources.description}</p>
        <ul className={styles.links}>
          {(resources.links as ResourceLink[]).map((link) => (
            <li key={link.title}>
              <a className={styles.link} href={link.url}>
                {link.title}
                <span className={styles.linkLeader} aria-hidden="true" />
                <span className={styles.linkGo}>Open →</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
