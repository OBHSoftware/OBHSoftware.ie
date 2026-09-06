import { useState } from 'react';
import { Button, Masthead, Section, StaggerChildren, FadeInUp } from '../components/common';
import resourcesData from '../data/resources.json';
import styles from './ResourcesPage.module.css';

interface Resource {
  id: string;
  slug: string;
  title: string;
  type: string;
  description: string;
  downloadUrl: string;
  requiresEmail: boolean;
  featured: boolean;
}

interface Category {
  name: string;
  resources: Resource[];
}

const typeLabels: Record<string, string> = {
  checklist: 'Checklist',
  template: 'Template',
  spreadsheet: 'Spreadsheet',
  guide: 'Guide',
};

const typeLabel = (type: string) => typeLabels[type] || type;

/* A stores list. Every item has a stock code, a type stamp and a state:
   either it is on the shelf or you sign for it with an email first. */
export function ResourcesPage() {
  const [emails, setEmails] = useState<Record<string, string>>({});
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = resourcesData.categories as Category[];
  const total = categories.reduce((n, c) => n + c.resources.length, 0);

  /* Stock codes run straight through every category, so a category needs the
     count of everything before it. Computed rather than carried in a running
     counter mutated during render. */
  const offsetOf = (index: number) =>
    categories.slice(0, index).reduce((n, c) => n + c.resources.length, 0);

  const setEmail = (id: string, value: string) => {
    setEmails((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const unlock = (id: string) => {
    const email = emails[id] || '';
    if (!email.includes('@')) {
      setErrors((prev) => ({ ...prev, [id]: 'Enter a valid email address' }));
      return;
    }
    setUnlocked((prev) => new Set(prev).add(id));
  };

  return (
    <main>
      <Masthead
        serial="Stores — free to take"
        stamp={`${total} items`}
        title={resourcesData.heroTitle}
        lede={resourcesData.intro}
      />

      {categories.map((category, catIndex) => (
        <Section key={category.name} ruled>
          <h2 className={styles.category}>
            <span className={styles.categoryName}>{category.name}</span>
            <span className={styles.categoryCount}>
              {String(category.resources.length).padStart(2, '0')} items
            </span>
          </h2>

          <StaggerChildren className={styles.stores} staggerDelay={0.05}>
            {category.resources.map((resource, i) => {
              const code = offsetOf(catIndex) + i + 1;
              const open = !resource.requiresEmail || unlocked.has(resource.id);

              return (
                <FadeInUp key={resource.id}>
                  <article className={styles.item}>
                    <div className={styles.itemHead}>
                      <span className={styles.code}>
                        OBH-{String(code).padStart(3, '0')}
                      </span>
                      <span className={styles.type}>{typeLabel(resource.type)}</span>
                      {resource.featured && <span className={styles.popular}>Popular</span>}
                    </div>

                    <h3 className={styles.title}>{resource.title}</h3>
                    <p className={styles.description}>{resource.description}</p>

                    {open ? (
                      <a
                        className={styles.download}
                        href={resource.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Take {typeLabel(resource.type).toLowerCase()} →
                      </a>
                    ) : (
                      <div className={styles.gate}>
                        <label className={styles.gateLabel} htmlFor={`email-${resource.id}`}>
                          Sign for it
                        </label>
                        <div className={styles.gateRow}>
                          <input
                            id={`email-${resource.id}`}
                            className={`${styles.input} ${errors[resource.id] ? styles.inputError : ''}`}
                            type="email"
                            placeholder="you@company.ie"
                            value={emails[resource.id] || ''}
                            onChange={(e) => setEmail(resource.id, e.target.value)}
                            aria-invalid={Boolean(errors[resource.id])}
                            aria-describedby={
                              errors[resource.id] ? `err-${resource.id}` : undefined
                            }
                          />
                          <button
                            className={styles.unlock}
                            type="button"
                            onClick={() => unlock(resource.id)}
                          >
                            Unlock
                          </button>
                        </div>
                        {errors[resource.id] && (
                          <span className={styles.error} id={`err-${resource.id}`} role="alert">
                            {errors[resource.id]}
                          </span>
                        )}
                      </div>
                    )}
                  </article>
                </FadeInUp>
              );
            })}
          </StaggerChildren>
        </Section>
      ))}

      <Section ruled tight>
        <div className={styles.tail}>
          <h2 className={styles.tailTitle}>{resourcesData.cta.title}</h2>
          <p className={styles.tailText}>{resourcesData.cta.description}</p>
          <div className={styles.tailActions}>
            <Button href="/#contact">{resourcesData.cta.buttonText}</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
