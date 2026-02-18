import { Link } from 'react-router-dom';
import './sponsors.css';

const sampleSponsors = [
  { id: 1, name: 'Gold Sponsor', logo: 'https://via.placeholder.com/240x120?text=Gold+Sponsor', tier: 'Gold', website: '#' },
  { id: 2, name: 'Silver Sponsor', logo: 'https://via.placeholder.com/240x120?text=Silver+Sponsor', tier: 'Silver', website: '#' },
  { id: 3, name: 'Bronze Sponsor', logo: 'https://via.placeholder.com/240x120?text=Bronze+Sponsor', tier: 'Bronze', website: '#' },
  { id: 4, name: 'Community Partner', logo: 'https://via.placeholder.com/240x120?text=Partner', tier: 'Partner', website: '#' },
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="sponsors-section">
      <div className="container">
        <header className="sponsors-header">
          <h2 className="sponsors-title">Our Sponsors</h2>
          <p className="sponsors-sub">We thank the organizations that support Emblazon — their contribution makes the event possible.</p>
        </header>

        <div className="sponsors-hero">
          <div className="hero-box">
            <div className="hero-inner">
              <span className="hero-small-label">OUR SPONSORS</span>
              <h1 className="hero-title">BOLD PARTNERS, BOLD STAGES</h1>
              <p className="hero-text">From fashion houses to tech labs, the collaborators powering Emblazon believe in city-scale creativity. Expect branded lounges, immersive pop-ups, and curated gifts that mirror the aesthetic of the festival.</p>
            </div>

            {[
              { top: '18%', left: '22%' },
              { top: '26%', left: '62%' },
              { top: '50%', left: '45%' },
            ].map((pos, i) => (
              <span key={i} className="hero-star" style={{ top: pos.top, left: pos.left }}>✦</span>
            ))}
          </div>
        </div>

        <div className="sponsors-grid">
          {sampleSponsors.map((s) => (
            <a key={s.id} className="sponsor-card" href={s.website} target="_blank" rel="noreferrer">
              <div className="sponsor-logo">
                <img src={s.logo} alt={s.name} />
              </div>
              <div className="sponsor-body">
                <div className="sponsor-name">{s.name}</div>
                <div className={`sponsor-tier tier-${s.tier.toLowerCase()}`}>{s.tier}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="sponsors-cta">
          <p>Want to sponsor Emblazon? <Link to="/contact" className="cta-link">Get in touch</Link></p>
        </div>
      </div>
    </section>
  );
}