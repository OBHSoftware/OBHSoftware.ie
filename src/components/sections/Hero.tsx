import { motion } from 'framer-motion';
import { Button } from '../common';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background} />
      <div className={styles.overlay} />
      <div className={styles.container}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Innovating Industries Through
          <br />
          Sustainable Technology.
        </motion.h1>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.description}>
            Custom software, web design and business-process automation
            that brings your ideas to life using technology and design thinking.
          </p>
          <p className={styles.description}>
            Empowering businesses to streamline operations, enhance productivity
            and stay ahead in a rapidly evolving digital world.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button href="#contact" size="lg">
            Book Your Free Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
