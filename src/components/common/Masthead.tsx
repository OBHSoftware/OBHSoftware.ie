import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Masthead.module.css';

export type MastheadTone = 'plate' | 'ground' | 'hazard';

export interface MastheadField {
  key: string;
  value: string;
}

interface Crumb {
  label: string;
  to?: string;
}

interface MastheadProps {
  /** Mono strip, top-left. A section ref, a job type, a serial. */
  serial?: string;
  /** Mono strip, top-right. A status, a count, a date. */
  stamp?: string;
  /** Trail back up the tree. Rendered as a stencilled run of links. */
  crumbs?: Crumb[];
  title: ReactNode;
  /** One paragraph under the title. Keep it to two lines. */
  lede?: string;
  /** Spec rows printed under the lede, leader-dotted like a docket. */
  fields?: MastheadField[];
  actions?: ReactNode;
  /** Sits to the right of the title on wide screens — a shot, a pane, a figure. */
  aside?: ReactNode;
  /**
   * plate  — reversed out of the ink slab. For pages about us.
   * ground — printed on the concrete. The default.
   * hazard — ground, but the boundary below is a hazard rail. For notices.
   */
  tone?: MastheadTone;
  className?: string;
}

export function Masthead({
  serial,
  stamp,
  crumbs,
  title,
  lede,
  fields,
  actions,
  aside,
  tone = 'ground',
  className = '',
}: MastheadProps) {
  const classes = [styles.masthead, styles[tone], aside ? styles.split : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes}>
      <div className={styles.container}>
        {(serial || stamp) && (
          <div className={styles.strip}>
            {serial && <span className={styles.serial}>{serial}</span>}
            {stamp && <span className={styles.stamp}>{stamp}</span>}
          </div>
        )}

        <div className={styles.body}>
          <div className={styles.main}>
            {crumbs && crumbs.length > 0 && (
              <nav className={styles.crumbs} aria-label="Breadcrumb">
                {crumbs.map((c, i) => (
                  <span className={styles.crumb} key={c.label}>
                    {c.to ? (
                      <Link className={styles.crumbLink} to={c.to}>
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page">{c.label}</span>
                    )}
                    {i < crumbs.length - 1 && (
                      <span className={styles.crumbSep} aria-hidden="true">
                        /
                      </span>
                    )}
                  </span>
                ))}
              </nav>
            )}

            <h1 className={styles.title}>{title}</h1>

            {lede && <p className={styles.lede}>{lede}</p>}

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

            {actions && <div className={styles.actions}>{actions}</div>}
          </div>

          {aside && <div className={styles.aside}>{aside}</div>}
        </div>
      </div>
    </header>
  );
}
