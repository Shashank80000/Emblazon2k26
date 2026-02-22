import { motion } from 'motion/react';
import emblazonText from '../../assets/fest/emblazon text.webp';
import './home.css';
import LogoLoop from './LogoLoop';
import CurvedLoop from './CurvedLoop';
import InteractiveMascot from './InteractiveMascot';
import TextCursor from './TextCursor';

// Social Media Icons
import xLogo from '../../assets/social media/x.png';
import facebookLogo from '../../assets/social media/facebook.png';
import instagramLogo from '../../assets/social media/instagram.png';

const socialLogos = [
  { src: instagramLogo, alt: "Instagram", href: "https://instagram.com/emblazon_2k25/" },
  { src: xLogo, alt: "X", href: "https://x.com/emblazon2k25/" },
  { src: facebookLogo, alt: "Facebook", href: "https://facebook.com/emblazon_2k25/" },
];

export default function Home() {
  return (
    <div className="home-container">
      {/* Background Ambience */}
      <div className="ambient-glow ambient-glow-1"></div>
      <div className="ambient-glow ambient-glow-2"></div>
      <div className="ambient-glow ambient-glow-3"></div>
      <div className="dot-grid"></div>

      <CurvedLoop
        marqueeText="EMBLAZON 2K26 ✦"
        speed={2}
        curveAmount={400}
        direction="right"
        interactive
      />

      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.5 }}
            className="hero-logo-wrapper"
          >
            <img
              src={emblazonText}
              alt="Emblazon 2K26"
              className="hero-text-image"
            />
          </motion.div>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          >
            The Cultural Fest of HMRITM
          </motion.p>

          <motion.div
            className="hero-social-loop"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
            style={{ width: '100%', maxWidth: '600px', marginTop: '3rem', position: 'relative', overflow: 'hidden' }}
          >
            <LogoLoop
              logos={socialLogos}
              speed={50}
              direction="left"
              logoHeight={40}
              gap={50}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#030308"
              ariaLabel="Social Media links"
            />
          </motion.div>
        </div>

        {/* Interactive Stressed Mascot */}
        <InteractiveMascot />
        <TextCursor spacing={60} followMouseDirection randomFloat exitDuration={0.4} removalInterval={25} maxPoints={6} />
      </section>

      {/* About EMBLAZON Section */}
      <section className="about-emblazon-section">
        <div className="about-emblazon-content">
          <motion.h2
            className="about-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ✨ About <span>EMBLAZON</span>
          </motion.h2>

          <div className="about-text-container">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              EMBLAZON is the flagship cultural fest of HMR Institute of Technology & Management, celebrating creativity, talent, and passion across music, dance, fashion, art, and innovation.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              More than just a fest, EMBLAZON is a legacy — a platform where students from across colleges come together to perform, compete, collaborate, and create unforgettable memories.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              From electrifying stage performances and fashion parades to rap battles, treasure hunts, and tech-creative showcases, EMBLAZON brings every form of expression under one vibrant celebration.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              Every year, EMBLAZON lights up the HMRITM campus with energy, talent, and excitement — making it one of the most awaited events of the season.
            </motion.p>

            <motion.h3
              className="about-tagline"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            >
              Not just a fest. A legacy.
            </motion.h3>
          </div>
        </div>
      </section>
    </div>
  );
}
