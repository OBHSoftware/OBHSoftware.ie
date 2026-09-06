import type { ReactNode } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Button, Masthead, Section } from '../components/common';
import blogData from '../data/blog.json';
import styles from './BlogPostPage.module.css';

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: string;
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-IE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/* Inline **bold** only. Split on the delimiter and render the odd segments as
   <strong> — the previous version pushed the line through
   dangerouslySetInnerHTML, which is a needless HTML injection sink for a
   feature that needs exactly one tag. */
function inline(text: string): ReactNode[] {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
  );
}

/* A very small subset of markdown: h2, h3, unordered and ordered lists, and
   paragraphs. That is everything the posts actually use. */
function renderContent(content: string): ReactNode[] {
  const out: ReactNode[] = [];
  let list: string[] = [];

  const flush = () => {
    if (!list.length) return;
    out.push(
      <ul className={styles.list} key={`list-${out.length}`}>
        {list.map((item) => (
          <li key={item}>{inline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  content.split('\n').forEach((line, i) => {
    const t = line.trim();

    if (t.startsWith('## ')) {
      flush();
      out.push(
        <h2 className={styles.h2} key={i}>
          {t.slice(3)}
        </h2>,
      );
    } else if (t.startsWith('### ')) {
      flush();
      out.push(
        <h3 className={styles.h3} key={i}>
          {t.slice(4)}
        </h3>,
      );
    } else if (t.startsWith('- ') || t.startsWith('* ')) {
      list.push(t.slice(2));
    } else if (/^\d+\.\s/.test(t)) {
      list.push(t.replace(/^\d+\.\s/, ''));
    } else if (t) {
      flush();
      out.push(
        <p className={styles.p} key={i}>
          {inline(t)}
        </p>,
      );
    }
  });

  flush();
  return out;
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = (blogData.posts as Post[]).find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/insights" replace />;
  }

  return (
    <main>
      <Masthead
        serial={post.category}
        stamp={post.readTime}
        crumbs={[{ label: 'Insights', to: '/insights' }, { label: post.category }]}
        title={post.title}
        lede={post.excerpt}
        fields={[
          { key: 'Written by', value: post.author },
          { key: 'Filed', value: formatDate(post.publishedAt) },
        ]}
      />

      <Section>
        <article className={styles.article}>{renderContent(post.content)}</article>

        {post.tags.length > 0 && (
          <div className={styles.tags}>
            <span className={styles.tagsLabel}>Topics</span>
            <ul className={styles.tagList}>
              {post.tags.map((tag) => (
                <li className={styles.tag} key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      <Section ruled tight>
        <div className={styles.tail}>
          <h2 className={styles.tailTitle}>Found this useful?</h2>
          <p className={styles.tailText}>
            We write about what we actually run into. If any of it applies to your
            business, we are happy to talk it through.
          </p>
          <div className={styles.tailActions}>
            <Button href="/#contact">Get in touch</Button>
            <Button to="/insights" variant="ghost">
              ← More entries
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
