import { Link } from 'react-router-dom';
import {
  Button,
  Masthead,
  ProductPane,
  Section,
  Shot,
  ShotRow,
  StaggerChildren,
  FadeInUp,
} from '../components/common';
import type { PaneKind } from '../components/common';
import productsData from '../data/products.json';
import styles from './ProductsPage.module.css';

interface ShotItem {
  src: string;
  alt: string;
  caption?: string;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  status: string;
  description: string;
  externalUrl?: string;
  shots?: { frame: string; items: ShotItem[] };
}

/* The page is a stock list: four numbered entries, each one showing what the
   thing actually looks like. Where we have real screens we show real screens;
   qHaul is not built yet, so it gets the drawn pane and says so. */
function Figure({ product }: { product: Product }) {
  if (product.shots) {
    const { frame, items } = product.shots;

    if (frame === 'phone') {
      return (
        <ShotRow>
          {items.map((s) => (
            <Shot key={s.src} src={s.src} alt={s.alt} frame="phone" />
          ))}
        </ShotRow>
      );
    }

    return (
      <div className={styles.plateStack}>
        {items.map((s) => (
          <Shot key={s.src} src={s.src} alt={s.alt} frame="plate" caption={s.caption} />
        ))}
      </div>
    );
  }

  return <ProductPane kind={product.slug as PaneKind} />;
}

export function ProductsPage() {
  const products = productsData.products as Product[];
  const live = products.filter((p) => p.status === 'available').length;

  return (
    <main>
      <Masthead
        tone="hazard"
        serial="Catalogue — what you can buy"
        stamp={`${live} live · ${products.length - live} in build`}
        title={productsData.heroTitle}
        lede={productsData.intro}
      />

      <Section>
        <StaggerChildren className={styles.list} staggerDelay={0.08}>
          {products.map((product, i) => {
            const available = product.status === 'available';

            return (
              <FadeInUp key={product.id}>
                <article className={styles.entry}>
                  <div className={styles.strip}>
                    <span className={styles.index}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.stripName}>{product.tagline}</span>
                    <span
                      className={`${styles.stamp} ${
                        available ? styles.stampLive : styles.stampSoon
                      }`}
                    >
                      {available ? 'Live' : 'In build'}
                    </span>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.copy}>
                      <h2 className={styles.name}>{product.name}</h2>
                      <p className={styles.description}>{product.description}</p>

                      <div className={styles.actions}>
                        <Button to={`/products/${product.slug}`} variant="secondary">
                          Read the spec
                        </Button>
                        {product.externalUrl && (
                          <Button href={product.externalUrl} variant="ghost">
                            Open {product.name} →
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className={styles.figure}>
                      <Figure product={product} />
                    </div>
                  </div>
                </article>
              </FadeInUp>
            );
          })}
        </StaggerChildren>
      </Section>

      <Section ruled tight>
        <div className={styles.tail}>
          <div>
            <h2 className={styles.tailTitle}>{productsData.cta.title}</h2>
            <p className={styles.tailText}>{productsData.cta.description}</p>
          </div>
          <div className={styles.tailActions}>
            <Button href="/#contact">{productsData.cta.buttonText}</Button>
            <Link className={styles.tailLink} to="/case-studies">
              See what we built for people →
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
