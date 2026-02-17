import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './navbar.css';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navigate = useNavigate();

  const handleNav = useCallback((path) => {
    // Kill all GSAP ScrollTriggers and revert pin-spacer DOM changes
    ScrollTrigger.getAll().forEach((st) => st.kill(true));
    gsap.globalTimeline.clear();
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.width = '';
    document.documentElement.style.width = '';
    window.scrollTo(0, 0);
    navigate(path);
  }, [navigate]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <a className="nav-logo" onClick={() => handleNav('/')}>Mayank.</a>
      </div>
      <div className="nav-center">
        <div className="main-links">
          <a className="nav-link active" onClick={() => handleNav('/')}>Home</a>
          <a className="nav-link active" onClick={() => handleNav('/gallery')}>Gallery</a>
          <a className="nav-link active" onClick={() => handleNav('/team')}>Team</a>
          <a className="nav-link active" onClick={() => handleNav('/events')}>Events</a>
          <a className="nav-link active" onClick={() => handleNav('/sponsors')}>Sponsors</a>
          <a className="nav-link active" onClick={() => handleNav('/about')}>About</a>
        </div>
      </div>
      <div className="nav-right"></div>
    </nav>
  );
}
