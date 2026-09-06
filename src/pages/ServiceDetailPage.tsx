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
import serviceDetailsData from '../data/serviceDetails.json';
import styles from './ServiceDetailPage.module.css';

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

interface Service {
  id: string;
  name: string;
  slug: string;
  icon: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  features: Feature[];
  benefits: string[];
  stats: Stat[];
}

/* A work order. The masthead is the ink slab so this reads as the thing you
   sign, not the thing you browse. */
export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = (serviceDetailsData.services as Service[]).find(
    (s) => s.slug === slug,
  );

  if (!service) {
    return <Navigate to="/#services" replace />;
  }

  const Icon = iconMap[service.icon] || ShieldIcon;

  return (
    <main>
      <Masthead
        tone="plate"
        serial="Work order"
        stamp={service.name}
        crumbs={[{ label: 'Services', to: '/#services' }, { label: service.name }]}
        title={service.heroTitle}
        lede={service.heroSubtitle}
        fields={service.stats.map((s) => ({ key: s.label, value: s.value }))}
        aside={
          <span className={styles.mark} aria-hidden="true">
            <Icon />
          </span>
        }
        actions={<Button href="/#contact">Scope a job</Button>}
      />

      <Section ruled>
        <div className={styles.overview}>
          <SectionHeader eyebrow="Scope" title="What this covers." />
          <p className={styles.body}>{service.description}</p>
        </div>
      </Section>

      <Section ruled sunk>
        <SectionHeader
          eyebrow="Line items"
          title="What you get."
          subtitle="Priced and scoped before anything is built."
        />

        <StaggerChildren className={styles.items} staggerDelay={0.05}>
          {service.features.map((feature, i) => (
            <FadeInUp key={feature.title}>
              <div className={styles.item}>
                <span className={styles.itemNo}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.itemBody}>
                  <h3 className={styles.itemTitle}>{feature.title}</h3>
                  <p className={styles.itemText}>{feature.description}</p>
                </div>
                <span className={styles.itemLeader} aria-hidden="true" />
                <span className={styles.itemMark}>Included</span>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section ruled>
        <div className={styles.outcome}>
          <SectionHeader eyebrow="On completion" title="What you end up with." />
          <ul className={styles.benefits}>
            {service.benefits.map((benefit) => (
              <li className={styles.benefit} key={benefit}>
                <span className={styles.tick} aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section ruled tight>
        <div className={styles.tail}>
          <h2 className={styles.tailTitle}>Start the job.</h2>
          <p className={styles.tailText}>
            A free half-hour call. We scope it properly before quoting, and we will
            say so if you do not need us.
          </p>
          <div className={styles.tailActions}>
            <Button href="/#contact">Book a consultation</Button>
            <Button to="/how-we-work" variant="ghost">
              How we work →
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
