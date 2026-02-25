import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import navigationData from '../../data/navigation.json';
import styles from './Header.module.css';

interface DropdownItem {
  label: string;
  href: string;
  external?: boolean;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  // Clear active section when navigating away from home
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionObserver = () => {
      // Only observe sections on the home page
      if (location.pathname !== '/') return undefined;

      const sections = document.querySelectorAll('section[id]');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
      );

      sections.forEach((section) => observer.observe(section));
      return () => sections.forEach((section) => observer.unobserve(section));
    };

    window.addEventListener('scroll', handleScroll);
    const cleanup = handleSectionObserver();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cleanup?.();
    };
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Check if it's an anchor link on the home page
    if (href.startsWith('/#')) {
      const sectionId = href.slice(2);
      // Set active section immediately for instant feedback
      setActiveSection(sectionId);

      if (location.pathname === '/') {
        // Already on home page, scroll to section
        const target = document.querySelector(`#${sectionId}`);
        if (target) {
          const headerHeight = 80;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      } else {
        // Navigate to home and then scroll
        navigate('/', { state: { scrollTo: sectionId } });
      }
    } else {
      // Regular route navigation
      navigate(href);
    }
  };

  // Handle scroll after navigation
  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      // Set active section immediately
      setActiveSection(sectionId);

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

  const navItems: NavItem[] = navigationData.mainNav;

  const isActive = (href: string) => {
    // For anchor links (home page sections)
    if (href.startsWith('/#')) {
      return location.pathname === '/' && activeSection === href.slice(2);
    }
    // For regular routes like /sectors
    if (location.pathname === href) {
      return true;
    }
    // For nested routes like /sectors/healthcare
    if (href !== '/' && location.pathname.startsWith(href + '/')) {
      return true;
    }
    return false;
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src="/logo.png" alt="OBH Software" className={styles.logoImg} />
          <span className={styles.logoText}>OBH Software</span>
        </Link>

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
            {navItems.map((item) => (
              <li
                key={item.href}
                className={item.dropdown ? styles.dropdownContainer : undefined}
                onMouseEnter={item.dropdown ? () => setOpenDropdown(item.label) : undefined}
                onMouseLeave={item.dropdown ? closeDropdown : undefined}
              >
                {item.dropdown ? (
                  <>
                    <button
                      className={`${styles.navLink} ${styles.dropdownTrigger} ${openDropdown === item.label ? styles.dropdownOpen : ''}`}
                      onClick={() => handleDropdownToggle(item.label)}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <span className={styles.dropdownArrow}>&#9662;</span>
                    </button>
                    <ul className={`${styles.dropdown} ${openDropdown === item.label ? styles.dropdownVisible : ''}`}>
                      {item.dropdown.map((dropdownItem) => (
                        <li key={dropdownItem.href}>
                          {(dropdownItem as DropdownItem).external ? (
                            <a
                              href={dropdownItem.href}
                              className={styles.dropdownLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={closeDropdown}
                            >
                              {dropdownItem.label}
                            </a>
                          ) : (
                            <a
                              href={dropdownItem.href}
                              className={`${styles.dropdownLink} ${isActive(dropdownItem.href) ? styles.active : ''}`}
                              onClick={(e) => {
                                handleNavClick(e, dropdownItem.href);
                                closeDropdown();
                              }}
                            >
                              {dropdownItem.label}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a
                    href={item.href}
                    className={`${styles.navLink} ${isActive(item.href) ? styles.active : ''}`}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
