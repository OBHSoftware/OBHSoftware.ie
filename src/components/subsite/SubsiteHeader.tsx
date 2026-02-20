import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './SubsiteHeader.module.css';

interface NavItem {
  label: string;
  href: string;
}

interface SubsiteHeaderProps {
  siteName: string;
  siteSlug: string;
  navigation: NavItem[];
  primaryColor?: string;
}

export function SubsiteHeader({
  siteName,
  siteSlug,
  navigation,
  primaryColor = '#234E01',
}: SubsiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const basePath = `/products/${siteSlug}/site`;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Check if it's an anchor link
    if (href.startsWith('#')) {
      const sectionId = href.slice(1);
      // If we're on the subsite home, scroll to section
      if (location.pathname === basePath) {
        const target = document.querySelector(`#${sectionId}`);
        if (target) {
          const headerHeight = 80;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      } else {
        // Navigate to home and then scroll
        navigate(basePath, { state: { scrollTo: sectionId } });
      }
    } else if (href.startsWith('/')) {
      // It's a subsite page path like /faq
      navigate(`${basePath}${href}`);
    } else {
      // External or absolute URL
      navigate(href);
    }
  };

  // Handle scroll after navigation
  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const target = document.querySelector(`#${sectionId}`);
        if (target) {
          const headerHeight = 80;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return false; // Don't highlight anchor links
    }
    const fullPath = `${basePath}${href}`;
    return location.pathname === fullPath;
  };

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      style={{ '--primary-color': primaryColor } as React.CSSProperties}
    >
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link to="/" className={styles.parentLink}>
            <img src="/logo.png" alt="OBH Software Consulting" className={styles.parentLogo} />
          </Link>
          <span className={styles.divider}>|</span>
          <Link to={basePath} className={styles.siteName}>
            {siteName}
          </Link>
        </div>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`} />
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href.startsWith('#') ? item.href : `${basePath}${item.href}`}
                  className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
