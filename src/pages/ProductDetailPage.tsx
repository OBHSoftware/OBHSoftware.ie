import { useParams, Navigate } from 'react-router-dom';
import {
  Button,
  Masthead,
  ProductPane,
  Section,
  SectionHeader,
  Shot,
  ShotRow,
  StaggerChildren,
  FadeInUp,
} from '../components/common';
import type { PaneKind } from '../components/common';
import productsData from '../data/products.json';
import styles from './ProductDetailPage.module.css';

interface Feature {
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface ShotItem {
  src: string;
  alt: string;
  caption?: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  status: string;
  description: string;
  features: Feature[];
  benefits: string[];
  stats: Stat[];
  externalUrl?: string;
  shots?: { frame: string; items: ShotItem[] };
}

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = (productsData.products as Product[]).find((p) => p.slug === slug);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const available = product.status === 'available';
  const shots = product.shots;

  /* The masthead carries one screen. The rest are laid out below, so the
     opener stays a header rather than turning into a gallery. */
  const lead = shots ? (
    shots.frame === 'phone' ? (
      <ShotRow>
        {shots.items.map((s) => (
          <Shot key={s.src} src={s.src} alt={s.alt} frame="phone" />
        ))}
      </ShotRow>
    ) : (
      <Shot
        src={shots.items[0].src}
        alt={shots.items[0].alt}
        frame="plate"
        caption={shots.items[0].caption}
      />
    )
  ) : (
    <ProductPane kind={product.slug as PaneKind} />
  );

  const rest = shots && shots.frame !== 'phone' ? shots.items.slice(1) : [];

  return (
    <main>
      <Masthead
        serial={product.tagline}
        stamp={available ? 'Live' : 'In build'}
        crumbs={[{ label: 'Products', to: '/products' }, { label: product.name }]}
        title={product.name}
        lede={product.description}
        fields={product.stats.map((s) => ({ key: s.label, value: s.value }))}
        aside={lead}
        actions={
          <>
            <Button href="/#contact">
              {available ? 'Book a demo' : 'Register interest'}
            </Button>
            {product.externalUrl ? (
              <Button href={product.externalUrl} variant="secondary">
                Open {product.name} →
              </Button>
            ) : (
              <Button to={`/products/${product.slug}/site`} variant="secondary">
                Visit the {product.name} site →
              </Button>
            )}
          </>
        }
      />

      {rest.length > 0 && (
        <Section tight>
          <div className={styles.plates}>
            {rest.map((s) => (
              <Shot key={s.src} src={s.src} alt={s.alt} frame="plate" caption={s.caption} />
            ))}
          </div>
        </Section>
      )}

      <Section ruled>
        <SectionHeader
          eyebrow="Specification"
          title="What it does."
          subtitle="Every line here is built and running, not planned."
        />

        <StaggerChildren className={styles.specList} staggerDelay={0.05}>
          {product.features.map((feature, i) => (
            <FadeInUp key={feature.title}>
              <div className={styles.spec}>
                <span className={styles.specIndex}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.specBody}>
                  <h3 className={styles.specTitle}>{feature.title}</h3>
                  <p className={styles.specText}>{feature.description}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section ruled sunk>
        <div className={styles.outcome}>
          <SectionHeader eyebrow="Outcome" title="What changes." />
          <ul className={styles.benefits}>
            {product.benefits.map((benefit) => (
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
          <h2 className={styles.tailTitle}>
            {available
              ? `Put ${product.name} in front of your team.`
              : `${product.name} is still in build.`}
          </h2>
          <p className={styles.tailText}>
            {available
              ? `A half-hour call, a live walkthrough, and an honest answer on whether it fits how you work.`
              : `Tell us how you run today and we will build toward it. Early users shape what ships.`}
          </p>
          <div className={styles.tailActions}>
            <Button href="/#contact">
              {available ? 'Book a demo' : 'Register interest'}
            </Button>
            <Button to="/products" variant="ghost">
              ← All products
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
