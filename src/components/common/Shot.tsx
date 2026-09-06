import styles from './Shot.module.css';

export type ShotFrame = 'phone' | 'plate';

interface ShotProps {
  /** Path under /shots. */
  src: string;
  /** Describe what the screen shows, not that it is a screenshot. */
  alt: string;
  /**
   * phone — a handset bezel, for the 1290×2796 app captures.
   * plate — a bolted panel, for the wide UI captures.
   */
  frame?: ShotFrame;
  /** Printed under the frame in mono, like a plate caption. */
  caption?: string;
  className?: string;
}

export function Shot({
  src,
  alt,
  frame = 'plate',
  caption,
  className = '',
}: ShotProps) {
  return (
    <figure className={`${styles.shot} ${styles[frame]} ${className}`}>
      <div className={styles.frame}>
        <img className={styles.image} src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

interface ShotRowProps {
  children: React.ReactNode;
  className?: string;
}

/** A run of phone shots, overlapped slightly like prints laid on a bench. */
export function ShotRow({ children, className = '' }: ShotRowProps) {
  return <div className={`${styles.row} ${className}`}>{children}</div>;
}
