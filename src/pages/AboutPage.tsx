import {
  Button,
  Masthead,
  Section,
  SectionHeader,
  StaggerChildren,
  FadeInUp,
} from '../components/common';
import aboutData from '../data/about.json';
import styles from './AboutPage.module.css';

/* Crew cards. Two people, named, with their actual job on the card — the
   opposite of a "meet the team" grid of twelve stock portraits. */
const crew = [
  {
    name: "Ethan O'Brien",
    role: 'Co-founder',
    photo: '/images/team/ethan-obrien.png',
    ticket: 'Technical direction',
    bio: "Serial entrepreneur and Electronic and Computer Engineering student from the University of Galway. Ethan specialises in turning complex ideas into practical software products, leading technical direction from concept through to delivery. He thrives on solving technical challenges, building products from the ground up and turning ideas into real working systems.",
  },
  {
    name: 'Sarah Jane Hughes',
    role: 'Co-founder',
    photo: '/images/team/sarah-jane-hughes.jpeg',
    ticket: 'Delivery and client lead',
    bio: 'Innovation driven Electronic and Computer Engineering student and collaborative leader from the University of Galway. Sarah Jane combines technical thinking with strong client leadership, guiding projects from early conversations through to delivery. She is both a builder and a bridge between clients and technology, helping turn complex ideas into solutions that create impact.',
  },
];

const method = [
  {
    title: 'Understand the problem first',
    text: "We start by understanding how your business actually works — the real workflows, bottlenecks and pain points — before writing any code.",
  },
  {
    title: 'Build practical solutions',
    text: 'We build software that solves the problem at hand. No unnecessary complexity, no over-engineering. Practical tools that people actually use.',
  },
  {
    title: 'Work closely with you',
    text: "We keep communication clear and frequent. You'll always know where things stand, what's being worked on and what's coming next.",
  },
  {
    title: 'Support what we build',
    text: "We don't disappear after launch. We provide ongoing support, fix issues quickly and help you evolve the platform as your business grows.",
  },
];

export function AboutPage() {
  return (
    <main>
      <Masthead
        tone="plate"
        serial="Company plate"
        stamp="Galway, Ireland"
        title="Two engineers from Galway."
        lede="Founded by engineers. Driven by the stuff nobody else wanted to fix."
        fields={[
          { key: 'Founded', value: 'Galway' },
          { key: 'Crew', value: '2' },
          { key: 'Built on', value: 'Real operations' },
        ]}
      />

      <Section ruled>
        <div className={styles.story}>
          {aboutData.intro.map((paragraph) => (
            <p className={styles.paragraph} key={paragraph.slice(0, 40)}>
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section ruled sunk>
        <SectionHeader eyebrow="Crew" title="Who you actually deal with." />

        <StaggerChildren className={styles.crew} staggerDelay={0.1}>
          {crew.map((person) => (
            <FadeInUp key={person.name}>
              <article className={styles.card}>
                <div className={styles.cardStrip}>
                  <span className={styles.cardRole}>{person.role}</span>
                  <span className={styles.cardTicket}>{person.ticket}</span>
                </div>
                <div className={styles.cardBody}>
                  <img
                    className={styles.photo}
                    src={person.photo}
                    alt={person.name}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className={styles.cardCopy}>
                    <h3 className={styles.name}>{person.name}</h3>
                    <p className={styles.bio}>{person.bio}</p>
                  </div>
                </div>
              </article>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section ruled>
        <SectionHeader eyebrow="On the record" title={aboutData.highlightsTitle} />
        <ol className={styles.awards}>
          {aboutData.highlights.map((item, i) => (
            <li className={styles.award} key={item.text}>
              <span className={styles.awardNo}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.awardText}>{item.text}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section ruled>
        <SectionHeader eyebrow="Method" title="How we work." />
        <StaggerChildren className={styles.method} staggerDelay={0.06}>
          {method.map((m, i) => (
            <FadeInUp key={m.title}>
              <div className={styles.methodItem}>
                <span className={styles.methodNo}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className={styles.methodTitle}>{m.title}</h3>
                  <p className={styles.methodText}>{m.text}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section ruled tight>
        <div className={styles.tail}>
          <h2 className={styles.tailTitle}>Want to work with us?</h2>
          <p className={styles.tailText}>
            Tell us what you are building. A free half-hour call, and an honest
            answer either way.
          </p>
          <div className={styles.tailActions}>
            <Button href="/#contact">Book a consultation</Button>
            <Button to="/case-studies" variant="ghost">
              See what we have built →
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
