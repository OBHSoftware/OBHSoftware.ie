import home from '../../data/home.json';
import styles from './Proof.module.css';

export function Proof() {
  const { proof } = home;

  return (
    <aside className={styles.band} aria-label="Awards and recognition">
      <div className={styles.container}>
        <span className={styles.label}>{proof.label}</span>
        <ul className={styles.list}>
          {proof.items.map((item) => (
            <li className={styles.item} key={item.text}>
              {item.href ? (
                <a
                  className={styles.link}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.text}
                </a>
              ) : (
                <span>{item.text}</span>
              )}
              {item.year && <span className={styles.year}>{item.year}</span>}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
