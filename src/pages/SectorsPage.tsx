import { Link } from 'react-router-dom';
import { Masthead, Section, StaggerChildren, FadeInUp } from '../components/common';
import {
  ShieldIcon,
  MoneyIcon,
  CertificateIcon,
  BuildingIcon,
  TruckIcon,
  TeamIcon,
} from '../components/icons';
import sectorsData from '../data/sectors.json';
import styles from './SectorsPage.module.css';

const iconMap: { [key: string]: React.ComponentType } = {
  shield: ShieldIcon,
  money: MoneyIcon,
  certificate: CertificateIcon,
  building: BuildingIcon,
  truck: TruckIcon,
  team: TeamIcon,
};

interface Sector {
  id: string;
  name: string;
  slug: string;
  icon: string;
  shortDescription: string;
}

/* A notice board. Each sector is a posted notice, and the first one is posted
   large because transport is where most of the work comes from. */
export function SectorsPage() {
  const sectors = sectorsData.sectors as Sector[];

  return (
    <main>
      <Masthead
        tone="hazard"
        serial="Notice — where we work"
        stamp={`${sectors.length} sectors`}
        title={sectorsData.title}
        lede={sectorsData.subtitle}
      />

      <Section>
        <StaggerChildren className={styles.board} staggerDelay={0.07}>
          {sectors.map((sector, i) => {
            const Icon = iconMap[sector.icon] || ShieldIcon;

            return (
              <FadeInUp
                className={i === 0 ? styles.wide : undefined}
                key={sector.id}
              >
                <Link className={styles.notice} to={`/sectors/${sector.slug}`}>
                  <div className={styles.head}>
                    <span className={styles.no}>
                      Sector {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.pin} aria-hidden="true" />
                  </div>

                  <div className={styles.bodyArea}>
                    <span className={styles.icon} aria-hidden="true">
                      <Icon />
                    </span>
                    <h2 className={styles.name}>{sector.name}</h2>
                    <p className={styles.description}>{sector.shortDescription}</p>
                  </div>

                  <span className={styles.more}>See the work →</span>
                </Link>
              </FadeInUp>
            );
          })}
        </StaggerChildren>
      </Section>
    </main>
  );
}
