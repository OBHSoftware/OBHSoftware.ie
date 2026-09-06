import styles from './Section.module.css';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Hairline rule across the top of the band. */
  ruled?: boolean;
  /** Recessed background, for bands that should sit back. */
  sunk?: boolean;
  tight?: boolean;
}

export function Section({
  children,
  className = '',
  id,
  ruled = false,
  sunk = false,
  tight = false,
}: SectionProps) {
  const classes = [
    styles.section,
    ruled ? styles.ruled : '',
    sunk ? styles.sunk : '',
    tight ? styles.tight : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} id={id}>
      <div className={styles.container}>{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  /** Mono field label, e.g. "Section 02 — What you can buy". */
  eyebrow?: string;
  /** Plain text, or JSX so one word can carry the italic serif. */
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = '',
}: SectionHeaderProps) {
  return (
    <header className={`${styles.header} ${className}`}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}
