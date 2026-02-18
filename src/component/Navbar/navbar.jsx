import { useNavigate, NavLink } from 'react-router-dom';
import { useCallback, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './navbar.css';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [portalContainer, setPortalContainer] = useState(null);

  const handleNav = useCallback((path) => {
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
  }, [navigate]);

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

  useEffect(() => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    setPortalContainer(el);
    return () => {
      document.body.removeChild(el);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      {(portalContainer && isMenuOpen) && (createPortal(
        <div className="menu-backdrop" onClick={toggleMenu}></div>,
        portalContainer
      ))}
      <nav className="navbar">
        <div className="nav-left">
          <a className="nav-logo" onClick={() => handleNav('/')}>HMRITM</a>
        </div>
        <div className="nav-center">
          <div className="main-links">
            <NavLink to="/" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={(e) => { e.preventDefault(); handleNav('/'); }}>Home</NavLink>
            <NavLink to="/gallery" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={(e) => { e.preventDefault(); handleNav('/gallery'); }}>Gallery</NavLink>
            <NavLink to="/team" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={(e) => { e.preventDefault(); handleNav('/team'); }}>Team</NavLink>
            <NavLink to="/events" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={(e) => { e.preventDefault(); handleNav('/events'); }}>Events</NavLink>
            <NavLink to="/sponsors" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={(e) => { e.preventDefault(); handleNav('/sponsors'); }}>Sponsors</NavLink>
            <NavLink to="/about" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={(e) => { e.preventDefault(); handleNav('/about'); }}>About</NavLink>
          </div>
        </div>
        <div className="nav-right">
          <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Render mobile menu as a sibling so it's not trapped by navbar's stacking context */}
      {(portalContainer && isMenuOpen) && (createPortal(
        <div className="main-links mobile-open" aria-hidden={!isMenuOpen} role="menu">
          <NavLink to="/" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={(e) => { e.preventDefault(); handleNav('/'); }}>Home</NavLink>
          <NavLink to="/gallery" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={(e) => { e.preventDefault(); handleNav('/gallery'); }}>Gallery</NavLink>
          <NavLink to="/team" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={(e) => { e.preventDefault(); handleNav('/team'); }}>Team</NavLink>
          <NavLink to="/events" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={(e) => { e.preventDefault(); handleNav('/events'); }}>Events</NavLink>
          <NavLink to="/sponsors" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={(e) => { e.preventDefault(); handleNav('/sponsors'); }}>Sponsors</NavLink>
          <NavLink to="/about" className={({isActive}) => 'nav-link' + (isActive ? ' active' : '')} onClick={(e) => { e.preventDefault(); handleNav('/about'); }}>About</NavLink>
        </div>,
        portalContainer
      ))}
    </>
  );
}
