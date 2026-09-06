import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

/* The letters are drawn as paths, not SVG <text>, so the mark renders
   identically before the webfont arrives and inside a favicon or an OG image
   where no font is available at all. */

const O =
  'M8 12.5C8 9.46 10.46 7 13.5 7S19 9.46 19 12.5v15C19 30.54 16.54 33 13.5 33S8 30.54 8 27.5v-15Zm5.5 1.2a1.3 1.3 0 0 0-1.3 1.3v10c0 .72.58 1.3 1.3 1.3s1.3-.58 1.3-1.3v-10c0-.72-.58-1.3-1.3-1.3Z';
const B =
  'M22 7h7.2c3.2 0 5.3 2.1 5.3 5.2v2.6c0 1.5-.6 2.7-1.6 3.5 1.2.8 1.9 2.1 1.9 3.8v3.5c0 3.3-2.2 5.4-5.6 5.4H22V7Zm4.2 4v5h2.4c.9 0 1.4-.5 1.4-1.4v-2.2c0-.9-.5-1.4-1.4-1.4h-2.4Zm0 9v6h2.6c1 0 1.5-.5 1.5-1.5v-3c0-1-.5-1.5-1.5-1.5h-2.6Z';
const H = 'M38 7h4.2v9.6h4.6V7H51v24h-4.2v-10H42.2v10H38V7Z';

export function LogoMark({
  size = 34,
  onDark = false,
}: {
  size?: number;
  /** On the ink header and footer the plate flips to enamel white. */
  onDark?: boolean;
}) {
  /* The enamel plate has to stay light in both themes — the raised surface
     token goes dark after sunset, which buried the letters. */
  const plate = onDark ? 'var(--color-text-invert)' : 'var(--color-ink)';
  const letters = onDark ? 'var(--color-ink)' : 'var(--color-text-invert)';
  const backing = onDark ? 'var(--color-hivis)' : 'var(--color-accent)';
  const chamfer = onDark ? 'var(--color-accent)' : 'var(--color-hivis)';

  return (
    <svg
      className={styles.mark}
      style={{ height: size }}
      viewBox="0 0 59 40"
      role="img"
      aria-label="OBH"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Colour showing through the cut corner */}
      <rect x="0" y="0" width="59" height="40" fill={backing} />
      {/* The plate, with its top-right corner cut away */}
      <path d="M0 0h46.5L59 12.5V40H0V0Z" fill={plate} />
      {/* The cut edge, caught so it reads at small sizes */}
      <path d="M46.5 0 59 12.5h-12.5V0Z" fill={chamfer} />
      <g fill={letters}>
        <path d={O} />
        <path d={B} />
        <path d={H} />
      </g>
    </svg>
  );
}

interface LogoProps {
  /** Reverses the wordmark for use on the ink footer. */
  invert?: boolean;
  /** Mark only, no wordmark. */
  compact?: boolean;
  size?: number;
  className?: string;
}

export function Logo({ invert = false, compact = false, size, className = '' }: LogoProps) {
  const classes = [
    styles.logo,
    invert ? styles.invert : '',
    compact ? styles.compact : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link to="/" className={classes} aria-label="OBH Software — home">
      <LogoMark size={size} onDark={invert} />
      <span className={styles.wordmark} aria-hidden="true">
        <span className={styles.wordTop}>O&rsquo;Brien Hughes</span>
        <span className={styles.wordSub}>Software</span>
      </span>
    </Link>
  );
}
