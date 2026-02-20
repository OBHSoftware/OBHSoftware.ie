import { Link } from 'react-router-dom';
import styles from './SubsiteFooter.module.css';

interface FooterLink {
  label: string;
  href: string;
}

interface SubsiteFooterProps {
  copyright: string;
  links?: FooterLink[];
  primaryColor?: string;
}

export function SubsiteFooter({
  copyright,
  links = [],
  primaryColor = '#234E01',
}: SubsiteFooterProps) {
  return (
    <footer className={styles.footer} style={{ '--primary-color': primaryColor } as React.CSSProperties}>
      <div className={styles.container}>
        <p className={styles.copyright}>{copyright}</p>
        {links.length > 0 && (
          <nav className={styles.links}>
            {links.map((link, index) => (
              <Link key={index} to={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
