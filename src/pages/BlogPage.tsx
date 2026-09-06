import { Link } from 'react-router-dom';
import { Button, Masthead, Section, StaggerChildren, FadeInUp } from '../components/common';
import blogData from '../data/blog.json';
import styles from './BlogPage.module.css';

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: string;
  featured: boolean;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-IE', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

/* A logbook. Entries run newest first with the date set in mono down the
   left, so the page reads as a record rather than a content marketing grid.
   Featured entries are simply set larger — they are not a separate section. */
export function BlogPage() {
  const posts = [...(blogData.posts as Post[])].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );

  return (
    <main>
      <Masthead
        serial="Logbook — what we have learned"
        stamp={`${posts.length} entries`}
        title={blogData.heroTitle}
        lede={blogData.intro}
      />

      <Section>
        <StaggerChildren className={styles.log} staggerDelay={0.05}>
          {posts.map((post) => (
            <FadeInUp key={post.id}>
              <Link
                className={`${styles.entry} ${post.featured ? styles.featured : ''}`}
                to={`/insights/${post.slug}`}
              >
                <div className={styles.stamp}>
                  <time className={styles.date} dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <span className={styles.category}>{post.category}</span>
                  {post.featured && <span className={styles.flag}>Pinned</span>}
                </div>

                <div className={styles.entryBody}>
                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.excerpt}>{post.excerpt}</p>
                  <div className={styles.meta}>
                    <span>{post.author}</span>
                    <span className={styles.dot} aria-hidden="true" />
                    <span>{post.readTime}</span>
                    <span className={styles.read}>Read →</span>
                  </div>
                </div>
              </Link>
            </FadeInUp>
          ))}
        </StaggerChildren>
      </Section>

      <Section ruled tight>
        <div className={styles.tail}>
          <h2 className={styles.tailTitle}>{blogData.cta.title}</h2>
          <p className={styles.tailText}>{blogData.cta.description}</p>
          <div className={styles.tailActions}>
            <Button href="/#contact">{blogData.cta.buttonText}</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
