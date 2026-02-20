import { Link } from 'react-router-dom';
import navigationData from '../../data/navigation.json';
import styles from './Footer.module.css';

interface LinkItem {
  label: string;
  href: string;
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { quickLinks, services, sectors, clients } = navigationData.footerLinks;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <img src="/logo.png" alt="OBH Software Consulting" className={styles.logoImg} />
            </Link>
            <p className={styles.tagline}>
              Innovating industries through sustainable technology solutions.
            </p>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              {quickLinks.map((link: LinkItem) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Services</h4>
            <ul className={styles.linksList}>
              {services.map((link: LinkItem) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Industries</h4>
            <ul className={styles.linksList}>
              {sectors.map((link: LinkItem) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Connect</h4>
            <ul className={styles.linksList}>
              {clients.map((link: LinkItem) => (
                <li key={link.href + link.label}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} OBH Software. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
