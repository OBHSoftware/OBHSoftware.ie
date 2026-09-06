import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { Button, Docket } from '../common';
import type { StampTone } from '../common';
import home from '../../data/home.json';
import styles from './Hero.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { hero } = home;

  return (
    <section className={styles.hero}>
      <div className={styles.rule} />
      <div className={styles.glow} />

      <div className={styles.container}>
        <div className={styles.intro}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className={styles.eyebrowDot} />
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          >
            {hero.titleLead}{' '}
            <span className={styles.titleAccent}>{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          >
            {hero.description}
          </motion.p>
        </div>

        {/* Two dockets, torn apart down a perforation. DOM order carries the
            layout so the grid can collapse to a single column on small screens. */}
        <div className={styles.split}>
          {hero.dockets.map((d, i) => (
            <Fragment key={d.id}>
              {i > 0 && (
                <motion.div
                  className={styles.perforation}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
                >
                  <span className={styles.perforationLabel}>or</span>
                </motion.div>
              )}
              <motion.div
                className={styles.docketWrap}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: EASE }}
              >
                <Docket
                  className={styles.docket}
                  serial={d.serial}
                  stamp={d.stamp}
                  stampTone={d.stampTone as StampTone}
                  fields={d.fields}
                  interactive
                >
                  <h2 className={styles.docketTitle}>{d.title}</h2>
                  <p className={styles.docketBody}>{d.body}</p>
                  <div className={styles.docketActions}>
                    <Button
                      href={d.cta.href}
                      size="lg"
                      variant={d.cta.variant as 'primary' | 'secondary'}
                    >
                      {d.cta.label}
                    </Button>
                  </div>
                </Docket>
              </motion.div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
