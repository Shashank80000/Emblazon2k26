import { motion } from 'motion/react';
import emblazonText from '../../assets/fest/emblazon text.webp';
import './home.css';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <motion.img
            src={emblazonText}
            alt="Emblazon 2K26"
            className="hero-text-image"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.5 }}
          />
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          >
            The Annual Cultural Fest of SGGSCC
          </motion.p>
        </div>
      </section>
    </div>
  );
}
