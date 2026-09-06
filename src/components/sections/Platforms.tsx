import {
  Button,
  Docket,
  ProductPane,
  Section,
  SectionHeader,
  StaggerChildren,
  FadeInUp,
} from '../common';
import type { PaneKind, StampTone } from '../common';
import home from '../../data/home.json';
import styles from './Platforms.module.css';

export function Platforms() {
  const { platforms } = home;

  return (
    <Section id="platforms" ruled>
      <SectionHeader
        eyebrow={platforms.eyebrow}
        title={platforms.title}
        subtitle={platforms.subtitle}
      />

      <StaggerChildren className={styles.grid} staggerDelay={0.06}>
        {platforms.items.map((p) => (
          <FadeInUp className={styles.card} key={p.id}>
            <Docket
              serial={p.tagline}
              stamp={p.stamp}
              stampTone={p.stampTone as StampTone}
              fields={p.fields}
              interactive
            >
              <div className={styles.row}>
                <div className={styles.left}>
                  <h3 className={styles.name}>{p.serial}</h3>
                  <p className={styles.description}>{p.description}</p>
                  <div className={styles.actions}>
                    <Button href={p.cta.href} variant="ghost">
                      {p.cta.label} →
                    </Button>
                  </div>
                </div>

                <div className={styles.pane}>
                  <ProductPane kind={p.pane as PaneKind} />
                </div>
              </div>
            </Docket>
          </FadeInUp>
        ))}
      </StaggerChildren>
    </Section>
  );
}
