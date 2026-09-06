import styles from './ProductPane.module.css';

export type PaneKind = 'qmechanic' | 'solar' | 'qhaul' | 'cashish';

function Shell({
  title,
  meta,
  children,
}: {
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.pane} aria-hidden="true">
      <div className={styles.paneBar}>
        <span className={styles.paneBarLeft}>
          <span className={styles.paneBarDot} />
          {title}
        </span>
        <span>{meta}</span>
      </div>
      <div className={styles.paneBody}>{children}</div>
    </div>
  );
}

/** DVSA walk-around check — the paper docket qMechanic replaces. */
function QMechanicPane() {
  const items: Array<[string, string, string]> = [
    ['01', 'Mirrors and glass', 'pass'],
    ['02', 'Lights and reflectors', 'pass'],
    ['03', 'Tyres — tread and pressure', 'fail'],
    ['04', 'Service brake response', 'pass'],
    ['05', 'Coupling security', 'n/a'],
  ];

  return (
    <Shell title="Walk-around check" meta="08-G-4471">
      {items.map(([n, label, state]) => (
        <div className={styles.row} key={n}>
          <span className={styles.rowIndex}>{n}</span>
          <span className={styles.rowLabel}>{label}</span>
          <span
            className={`${styles.chip} ${
              state === 'pass'
                ? styles.chipPass
                : state === 'fail'
                  ? styles.chipFail
                  : styles.chipMuted
            }`}
          >
            {state}
          </span>
        </div>
      ))}
      <span className={styles.footNote}>Signed on device · defect raised</span>
    </Shell>
  );
}

/** Delivery board — the shape agencies actually work in. */
function SolarPane() {
  return (
    <Shell title="Sprint board" meta="Client portal">
      <div className={styles.board}>
        <div className={styles.column}>
          <span className={styles.columnHead}>Backlog</span>
          <div className={`${styles.ticket} ${styles.ticketMuted}`}>
            <span className={styles.ticketId}>OBH-118</span>
            <span className={styles.ticketTitle}>Import supplier list</span>
          </div>
          <div className={`${styles.ticket} ${styles.ticketMuted}`}>
            <span className={styles.ticketId}>OBH-121</span>
            <span className={styles.ticketTitle}>Driver sign-off</span>
          </div>
        </div>
        <div className={styles.column}>
          <span className={styles.columnHead}>In progress</span>
          <div className={styles.ticket}>
            <span className={styles.ticketId}>OBH-114</span>
            <span className={styles.ticketTitle}>PDF report layout</span>
          </div>
        </div>
        <div className={styles.column}>
          <span className={styles.columnHead}>Done</span>
          <div className={`${styles.ticket} ${styles.ticketPass}`}>
            <span className={styles.ticketId}>OBH-109</span>
            <span className={styles.ticketTitle}>Offline capture</span>
          </div>
        </div>
      </div>
      <span className={styles.footNote}>Agent connected · 3 h logged this week</span>
    </Shell>
  );
}

/** Job list from booking through proof of delivery. */
function QHaulPane() {
  const jobs: Array<[string, string, string, string]> = [
    ['1042', 'Galway → Dublin', 'pod in', 'pass'],
    ['1043', 'Cork → Limerick', 'in transit', 'note'],
    ['1044', 'Sligo → Galway', 'booked', 'muted'],
    ['1045', 'Athlone → Cork', 'booked', 'muted'],
  ];

  return (
    <Shell title="Job board" meta="Today">
      {jobs.map(([id, route, state, tone]) => (
        <div className={styles.row} key={id}>
          <span className={styles.rowIndex}>{id}</span>
          <span className={styles.rowLabel}>{route}</span>
          <span
            className={`${styles.chip} ${
              tone === 'pass'
                ? styles.chipPass
                : tone === 'note'
                  ? styles.chipNote
                  : styles.chipMuted
            }`}
          >
            {state}
          </span>
        </div>
      ))}
      <span className={styles.footNote}>1 ready to invoice</span>
    </Shell>
  );
}

/** A cash-basis VAT return. Figures are illustrative. */
function CashishPane() {
  const lines: Array<[string, string, string]> = [
    ['T1', 'VAT on sales', '€4,000.00'],
    ['T2', 'VAT on purchases', '€1,250.00'],
  ];

  return (
    <Shell title="VAT return" meta="Jul–Aug">
      {lines.map(([code, label, value]) => (
        <div className={styles.ledgerRow} key={code}>
          <span className={styles.ledgerCode}>{code}</span>
          <span className={styles.ledgerLabel}>{label}</span>
          <span className={styles.ledgerValue}>{value}</span>
        </div>
      ))}
      <div className={`${styles.ledgerRow} ${styles.ledgerTotal}`}>
        <span className={styles.ledgerCode}>T3</span>
        <span className={styles.ledgerLabel}>Payable to Revenue</span>
        <span className={styles.ledgerValue}>€2,750.00</span>
      </div>
      <div className={styles.meter}>
        <span className={styles.meterFill} style={{ width: '68%' }} />
      </div>
      <span className={styles.footNote}>Cash receipts basis · 412 rows reconciled</span>
    </Shell>
  );
}

const panes: Record<PaneKind, () => React.JSX.Element> = {
  qmechanic: QMechanicPane,
  solar: SolarPane,
  qhaul: QHaulPane,
  cashish: CashishPane,
};

export function ProductPane({ kind }: { kind: PaneKind }) {
  const Pane = panes[kind];
  return <Pane />;
}
