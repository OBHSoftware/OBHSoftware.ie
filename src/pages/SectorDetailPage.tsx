import { useParams, Navigate } from 'react-router-dom';
import {
  Button,
  Masthead,
  Section,
  SectionHeader,
  StaggerChildren,
  FadeInUp,
} from '../components/common';
import {
  ShieldIcon,
  MoneyIcon,
  CertificateIcon,
  BuildingIcon,
  TruckIcon,
  TeamIcon,
} from '../components/icons';
import sectorsData from '../data/sectors.json';
import styles from './SectorDetailPage.module.css';

const iconMap: { [key: string]: React.ComponentType } = {
  shield: ShieldIcon,
  money: MoneyIcon,
  certificate: CertificateIcon,
  building: BuildingIcon,
  truck: TruckIcon,
  team: TeamIcon,
};

interface Feature {
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Sector {
  id: string;
  name: string;
  slug: string;
  icon: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  features: Feature[];
  challenges: string[];
  stats: Stat[];
}

/* The sector notice: what goes wrong in this industry, then what we put in
   its place. Faults are marked as faults — that is the point of the page. */
export function SectorDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const sector = (sectorsData.sectors as Sector[]).find((s) => s.slug === slug);

  if (!sector) {
    return <Navigate to="/sectors" replace />;
  }

  const Icon = iconMap[sector.icon] || ShieldIcon;

  return (
    <main>
      <Masthead
        tone="hazard"
        serial={sector.name}
        stamp="Sector notice"
        crumbs={[{ label: 'Industries', to: '/sectors' }, { label: sector.name }]}
        title={sector.heroTitle}
        lede={sector.heroSubtitle}
        fields={sector.stats.map((s) => ({ key: s.label, value: s.value }))}
        aside={
          <span className={styles.mark} aria-hidden="true">
            <Icon />
          </span>
        }
        actions={<Button href="/#contact">Book a consultation</Button>}
      />

      <Section ruled>
        <div className={styles.overview}>
          <SectionHeader eyebrow="Overview" title={`The ${sector.name} picture.`} />
          <p className={styles.body}>{sector.description}</p>
        </div>
      </Section>

      {/* Faults first. Every one of these is something an operator told us. */}
      <Section ruled sunk>
        <SectionHeader
          eyebrow="Faults found"
          title="What goes wrong."
          subtitle="The problems that keep coming up in this sector."
        />

        <StaggerChildren className={styles.faults} staggerDelay={0.05}>
          {sector.challenges.map((challenge, i) => (
            <FadeInUp key={challenge}>
              <div className={styles.fault}>
                <span className={styles.faultNo}>{String(i + 1).padStart(2, '0')}</span>
                <p className={styles.faultText}>{challenge}</p>
                <span className={styles.faultStamp}>Fault</span>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section ruled>
        <SectionHeader
          eyebrow="Remedy"
          title="What we put in its place."
        />

        <StaggerChildren className={styles.remedies} staggerDelay={0.06}>
          {sector.features.map((feature) => (
            <FadeInUp key={feature.title}>
              <div className={styles.remedy}>
                <h3 className={styles.remedyTitle}>{feature.title}</h3>
                <p className={styles.remedyText}>{feature.description}</p>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section ruled tight>
        <div className={styles.tail}>
          <h2 className={styles.tailTitle}>
            Working in {sector.name.toLowerCase()}?
          </h2>
          <p className={styles.tailText}>
            Half an hour on the phone and we will tell you whether software fixes
            your problem or whether it does not.
          </p>
          <div className={styles.tailActions}>
            <Button href="/#contact">Book a consultation</Button>
            <Button to="/sectors" variant="ghost">
              ← All sectors
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
