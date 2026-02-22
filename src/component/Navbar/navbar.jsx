import { useNavigate, NavLink } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '../../assets/fest/logo.svg';

import './navbar.css';

const REGISTER_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSceQNyjkvTdnhg_4XZfMQJypM5svwxLRJWI77HHnO1OGL7PdQ/viewform'; // Replace with Google Form link when ready

const NAV_ITEMS = [
  { path: '/', name: 'Home', icon: '🏠' },
  { path: '/gallery', name: 'Gallery', icon: '📸' },
  { path: '/team', name: 'Team', icon: '🚀' },
  { path: '/events', name: 'Events', icon: '🎭' },
  { path: '/sponsors', name: 'Sponsors', icon: '🤝' },
  { path: '/about', name: 'About', icon: '✨' }
];

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [portalContainer, setPortalContainer] = useState(null);

  const handleNav = useCallback((path) => {
    // If already on this route, just scroll to top — don't kill animations
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMenuOpen(false);
      return;
    }

    // Kill all GSAP ScrollTriggers and revert pin-spacer DOM changes
    ScrollTrigger.getAll().forEach((st) => st.kill(true));
    gsap.globalTimeline.clear();
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.width = '';
    document.documentElement.style.width = '';
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
    navigate(path);
  }, [navigate, location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      // lock body scroll when menu opens
      if (next) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return next;
    });
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  useEffect(() => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    setPortalContainer(el);
    return () => {
      document.body.removeChild(el);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 200) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
            setIsFolderOpen(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {(portalContainer && isMenuOpen) && (createPortal(
        <div className="menu-backdrop" onClick={toggleMenu}></div>,
        portalContainer
      ))}
      <nav className={`navbar ${isScrolled ? 'hidden' : ''}`}>
        <div className="nav-left">
          <button className="nav-logo" onClick={() => handleNav('/')} aria-label="Go to home">
            <img src={heroImage} alt="Emblazon 2k26 Logo" className="logo-img" />
          </button>
        </div>
        <div className="nav-center">
          <div className="main-links">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                onClick={(e) => { e.preventDefault(); handleNav(item.path); }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="nav-right">
          <a href={REGISTER_URL} className="register-btn" target="_blank" rel="noopener noreferrer">Register</a>
          <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </nav>

      {(portalContainer && isMenuOpen) && (createPortal(
        <div className="main-links mobile-open" aria-hidden={!isMenuOpen} role="menu">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              onClick={(e) => { e.preventDefault(); handleNav(item.path); }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </NavLink>
          ))}
          <a href={REGISTER_URL} className="register-btn mobile" target="_blank" rel="noopener noreferrer">Register</a>
        </div>,
        portalContainer
      ))}

      {/* Floating Folder Menu */}
      <div
        className={`floating-folder ${isScrolled ? 'visible' : ''} ${isFolderOpen ? 'open' : ''}`}
        onClick={() => setIsFolderOpen(!isFolderOpen)}
      >
        <div className="folder-back">
          <div className="folder-tab"></div>
        </div>
        <div className="folder-papers">
          {NAV_ITEMS.map((item, index) => (
            <div
              key={item.path}
              className="folder-paper"
              style={{ '--i': index }}
              onClick={(e) => {
                e.stopPropagation();
                handleNav(item.path);
                setIsFolderOpen(false);
              }}
            >
              <div className="paper-icon">{item.icon}</div>
              <div className="paper-text">{item.name}</div>
            </div>
          ))}
        </div>
        <div className="folder-front">
        </div>
      </div>
    </>
  );
}
