import { motion } from 'framer-motion';
import { Button } from '../common';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.gridBg} />
      <div className={styles.glow} />

      <div className={styles.container}>
        <div className={styles.main}>
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.badgeDot} />
            Software Engineering &amp; Consulting
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            We Build Software
            <br />
            That Helps Businesses
            <br />
            <span className={styles.titleAccent}>Grow.</span>
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Custom software, web design and business-process automation
            that brings your ideas to life using technology and design thinking.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button href="#contact" size="lg">
              Book a Consultation
            </Button>
            <Button href="#services" size="lg" variant="secondary">
              Our Services
            </Button>
          </motion.div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.proofWrapper}>
            <motion.div
              className={styles.proofCallout}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.proofCalloutText}>Read the article</span>
              <svg className={styles.proofArrow} width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 4C32 12 34 22 28 30C24 36 18 34 18 28C18 22 22 18 20 26C18 34 14 40 8 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M14 42L8 46L10 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </motion.div>
            <motion.a
              href="https://www.independent.ie/business/irish/thirty-under-30-the-sunday-independent-hails-irelands-young-entrepreneurs-of-the-year/a249802745.html"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.foundersProof}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.proofLabel}>Irish Independent 30 Under 30 — 2025</span>
              <span className={styles.proofNames}>Ethan O'Brien &amp; Sarah Jane Hughes</span>
            </motion.a>
          </div>

          <motion.div
            className={styles.terminal}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.terminalHeader}>
            <div className={styles.terminalDots}>
              <span />
              <span />
              <span />
            </div>
            <span className={styles.terminalTitle}>terminal</span>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.terminalLine}>
              <span className={styles.terminalPrompt}>$</span>
              <span>npx create-obh-project</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalCheck}>&#10003;</span>
              <span className={styles.terminalMuted}>Analyzing requirements...</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalCheck}>&#10003;</span>
              <span className={styles.terminalMuted}>Designing solution architecture...</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalCheck}>&#10003;</span>
              <span className={styles.terminalMuted}>Engineering &amp; iterating...</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalCheck}>&#10003;</span>
              <span className={styles.terminalMuted}>Deployed to production</span>
            </div>
            <div className={styles.terminalLine}>
              <span className={styles.terminalPrompt}>$</span>
              <span className={styles.terminalCursor}>_</span>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
