import type { ReactNode } from 'react';
import styles from './Docket.module.css';

export type StampTone = 'pass' | 'note' | 'accent' | 'muted';

export interface DocketField {
  key: string;
  value: string;
}

interface DocketProps {
  /** Left side of the header strip — a serial, a section ref, a job type. */
  serial: string;
  /** Right side of the header strip — the status stamp. */
  stamp?: string;
  stampTone?: StampTone;
  fields?: DocketField[];
  /** Lifts on hover. Use for cards that link somewhere. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}

const stampClass: Record<StampTone, string> = {
  pass: styles.stampPass,
  note: styles.stampNote,
  accent: styles.stampAccent,
  muted: styles.stampMuted,
};

export function Docket({
  serial,
  stamp,
  stampTone = 'muted',
  fields,
  interactive = false,
  className = '',
  children,
}: DocketProps) {
  return (
    <article
      className={`${styles.docket} ${interactive ? styles.interactive : ''} ${className}`}
    >
      <header className={styles.strip}>
        <span className={styles.serial}>{serial}</span>
        {stamp && (
          <span className={`${styles.stamp} ${stampClass[stampTone]}`}>{stamp}</span>
        )}
      </header>

      <div className={styles.body}>{children}</div>

      {fields && fields.length > 0 && (
        <dl className={styles.fields}>
          {fields.map((f) => (
            <div className={styles.field} key={f.key}>
              <dt className={styles.fieldKey}>{f.key}</dt>
              <span className={styles.fieldLeader} aria-hidden="true" />
              <dd className={styles.fieldValue}>{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
