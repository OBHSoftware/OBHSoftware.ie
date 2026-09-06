import { Button, Masthead, Section } from '../components/common';
import faqsData from '../data/faqs.json';
import styles from './FAQPage.module.css';

interface FAQ {
  question: string;
  answer: string;
}

interface Category {
  name: string;
  faqs: FAQ[];
}

/* A register of questions, numbered straight through so it reads as one index
   rather than four disconnected accordions.
   Built on <details name="…">, which gives exclusive open/close natively — no
   state, no aria wiring, and it is keyboard-operable and findable by in-page
   search for free. Browsers without the grouping behaviour just allow more
   than one open at a time, which is not a failure. */
export function FAQPage() {
  const categories = faqsData.categories as Category[];
  const total = categories.reduce((n, c) => n + c.faqs.length, 0);

  /* Entries are numbered straight through the whole index, so a category needs
     to know how many came before it. Computed rather than carried in a running
     counter — mutating one across .map during render is exactly the pattern
     the compiler warns about. */
  const offsetOf = (index: number) =>
    categories.slice(0, index).reduce((n, c) => n + c.faqs.length, 0);

  return (
    <main>
      <Masthead
        serial="Index — straight answers"
        stamp={`${total} entries`}
        title={faqsData.heroTitle}
        lede={faqsData.heroSubtitle}
      />

      {categories.map((category, catIndex) => (
        <Section key={category.name} ruled>
          <h2 className={styles.category}>
            <span className={styles.categoryName}>{category.name}</span>
            <span className={styles.categoryCount}>
              {String(category.faqs.length).padStart(2, '0')} entries
            </span>
          </h2>

          <div className={styles.register}>
            {category.faqs.map((faq, i) => {
              const no = offsetOf(catIndex) + i + 1;
              return (
                <details className={styles.entry} key={faq.question} name="faq">
                  <summary className={styles.question}>
                    <span className={styles.no}>{String(no).padStart(2, '0')}</span>
                    <span className={styles.questionText}>{faq.question}</span>
                    <span className={styles.toggle} aria-hidden="true" />
                  </summary>
                  <div className={styles.answer}>
                    <p>{faq.answer}</p>
                  </div>
                </details>
              );
            })}
          </div>
        </Section>
      ))}

      <Section ruled tight>
        <div className={styles.tail}>
          <h2 className={styles.tailTitle}>{faqsData.cta.title}</h2>
          <p className={styles.tailText}>{faqsData.cta.description}</p>
          <div className={styles.tailActions}>
            <Button href="/#contact">{faqsData.cta.buttonText}</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
