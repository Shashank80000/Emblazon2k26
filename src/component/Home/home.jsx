import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import emblazonText from '../../assets/fest/emblazon text.webp';
import './home.css';
import LogoLoop from './LogoLoop';
import CurvedLoop from './CurvedLoop';
import TextCursor from './TextCursor';
import ImageTrail from './ImageTrail';
import VideoScrollZoom from './VideoScrollZoom';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import shashankVideo from '../../assets/social media/shashank.mp4';

// Social Media Icons
import xLogo from '../../assets/social media/x.png';
import facebookLogo from '../../assets/social media/facebook.png';
import instagramLogo from '../../assets/social media/instagram.png';

// Event Images
import fashionParadeImg from '../../assets/events/fashion parade.png';
import rappingImg from '../../assets/events/rapping.png';

// Fest Images
import festImg1 from '../../assets/fest/1.jpeg';
import festImg2 from '../../assets/fest/2.jpeg';
import festImg3 from '../../assets/fest/3.jpeg';
import festImg6 from '../../assets/fest/6.jpeg';
import festImg9 from '../../assets/fest/9.jpeg';
import festImg11 from '../../assets/fest/011.jpeg';
import festImg01 from '../../assets/fest/01.JPG';
import festImg02 from '../../assets/fest/02.JPG';
import festImg03 from '../../assets/fest/03.JPG';
import festImg04 from '../../assets/fest/04.JPG';
import festImg05 from '../../assets/fest/05.JPG';
import festImg06 from '../../assets/fest/06.jpg';
import festImg07 from '../../assets/fest/07.jpg';
import festImg08 from '../../assets/fest/08.jpg';
import festImg010 from '../../assets/fest/010.jpg';
import festImg012 from '../../assets/fest/012.png';
import festImg013 from '../../assets/fest/013.jpg';
import festImg014 from '../../assets/fest/014.jpg';

const trailImages = [
  festImg1,
  festImg2,
  festImg3,
  festImg6,
  festImg9,
  festImg11,
];

const socialLogos = [
  { src: instagramLogo, alt: "Instagram", href: "https://instagram.com/emblazon_2k25/" },
  { src: xLogo, alt: "X", href: "https://x.com/emblazon2k25/" },
  { src: facebookLogo, alt: "Facebook", href: "https://facebook.com/emblazon_2k25/" },
];

// Featured Events Data
const featuredEvents = [
  { id: 1, title: 'Fashion Parade', description: 'Walk the ramp and dazzle with your style.', image: fashionParadeImg, category: 'Cultural', date: 'Day 1' },
  { id: 2, title: 'Rapping', description: 'Drop bars, own the mic and set the stage on fire.', image: rappingImg, category: 'Music', date: 'Day 1' },
  { id: 3, title: 'Mr. & Ms. Emblazon', description: 'The ultimate personality contest.', image: null, category: 'Cultural', date: 'Day 2' },
];

// Event Categories
const eventCategories = [
  { name: 'Cultural', color: '#8a2be2', icon: '🎭' },
  { name: 'Music', color: '#ec4899', icon: '🎵' },
  { name: 'Dance', color: '#f59e0b', icon: '💃' },
  { name: 'Drama', color: '#06b6d4', icon: '🎬' },
  { name: 'Fun', color: '#22c55e', icon: '🎉' },
  { name: 'Literary/Fine Arts', color: '#a855f7', icon: '🎨' },
  { name: 'Star Evening', color: '#ef4444', icon: '⭐' },
];

// Stats Data
const statsData = [
  { number: '32+', label: 'Events', icon: '🎪' },
  { number: '2000+', label: 'Participants', icon: '👥' },
  { number: '50K+', label: 'Prize Pool', icon: '🏆' },
  { number: '2', label: 'Days', icon: '📅' },
];

export default function Home() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const glimpsesRef = useRef(null);

  useEffect(() => {
    const targetDate = new Date('2026-03-17T00:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Glimpse tiles fade-in on scroll
  useEffect(() => {
    const grid = glimpsesRef.current;
    if (!grid) return;
    const items = grid.querySelectorAll('.glimpse-item');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.1 }
    );
    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
        {/* Image Trail Effect - Move mouse to see images trail */}
        <ImageTrail
          items={trailImages}
          variant={4}
          className="hero-image-trail"
        />

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


        <TextCursor spacing={60} followMouseDirection randomFloat exitDuration={0.4} removalInterval={25} maxPoints={6} />
      </section>

      {/* Scroll Zoom Video Section */}
      <VideoScrollZoom video={shashankVideo} />

      {/* ── Scroll-Stack Info Cards ── */}
      <div className="scroll-stack-section">
        <div className="scroll-stack-heading">
          <h2>Discover <span>EMBLAZON 2K26</span></h2>
          <p>Scroll to explore the fest</p>
        </div>

        <ScrollStack
          useWindowScroll
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={25}
          stackPosition="15%"
          scaleEndPosition="8%"
          baseScale={0.84}
          rotationAmount={0}
          blurAmount={0}
        >
          {/* Card 1 — About */}
          <ScrollStackItem itemClassName="ss-card-purple">
            <div className="ss-card-icon">
              <img src={festImg1} alt="Emblazon Fest" className="ss-card-img" />
            </div>
            <div className="ss-card-text">
              <span className="ss-card-label">✨ About</span>
              <h2 className="ss-card-title">Not just a fest.<br />A Legacy.</h2>
              <p className="ss-card-body">
                EMBLAZON is the flagship cultural fest of HMR Institute of Technology &amp; Management —
                a vibrant celebration of creativity, talent, and passion across music, dance, fashion,
                art, and innovation.
              </p>
              <div className="ss-badge-row">
                <span className="ss-badge">🎭 Cultural</span>
                <span className="ss-badge">🎵 Music</span>
                <span className="ss-badge">💃 Dance</span>
                <span className="ss-badge">🎬 Drama</span>
                <span className="ss-badge">🎨 Fine Arts</span>
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 2 — Stats */}
          <ScrollStackItem itemClassName="ss-card-pink">
            <div className="ss-card-icon">
              <img src={festImg2} alt="Emblazon Fest" className="ss-card-img" />
            </div>
            <div className="ss-card-text">
              <span className="ss-card-label">📊 By the Numbers</span>
              <h2 className="ss-card-title">Big Numbers,<br />Bigger Energy.</h2>
              <div className="ss-stat-grid" style={{ position: 'relative', zIndex: 2 }}>
                {statsData.map(stat => (
                  <div className="ss-stat-box" key={stat.label}>
                    <span className="ss-stat-box-icon">{stat.icon}</span>
                    <span className="ss-stat-box-number">{stat.number}</span>
                    <span className="ss-stat-box-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 3 — Featured Events */}
          <ScrollStackItem itemClassName="ss-card-cyan">
            <div className="ss-card-icon">
              <img src={festImg3} alt="Emblazon Events" className="ss-card-img" />
            </div>
            <div className="ss-card-text">
              <span className="ss-card-label">🔥 Featured Events</span>
              <h2 className="ss-card-title">Don't miss<br />these moments.</h2>
              <p className="ss-card-body">
                From fashion parades to rap battles — every event on stage is a memory in the making.
              </p>
              <div className="ss-badge-row">
                {featuredEvents.map(ev => (
                  <span className="ss-badge" key={ev.id}>{ev.title} · {ev.date}</span>
                ))}
              </div>
            </div>
          </ScrollStackItem>

          {/* Card 4 — Countdown */}
          <ScrollStackItem itemClassName="ss-card-gold">
            <div className="ss-card-icon">
              <img src={festImg6} alt="Emblazon Countdown" className="ss-card-img" />
            </div>
            <div className="ss-card-text">
              <span className="ss-card-label">⏰ Countdown</span>
              <h2 className="ss-card-title">Happening<br />March 17–18, 2026</h2>
              <span className="ss-coming-soon">🚀 Coming Soon</span>
              <div className="ss-countdown-row">
                {Object.entries(countdown).map(([unit, value], i) => (
                  <>
                    <div className="ss-countdown-block" key={unit}>
                      <span className="ss-countdown-number">{String(value).padStart(2, '0')}</span>
                      <span className="ss-countdown-label">{unit}</span>
                    </div>
                    {i < 3 && <span className="ss-countdown-sep" key={unit + 'sep'}>:</span>}
                  </>
                ))}
              </div>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>

      {/* ── Glimpses Section ── */}
      <section className="glimpses-section">
        <div className="glimpses-header">
          <span className="glimpses-label">📸 Last Year</span>
          <h2 className="glimpses-title">Glimpses of <span>Emblazon</span></h2>
          <p className="glimpses-sub">Moments that made history — relive the magic of the last edition.</p>
        </div>

        <div className="glimpses-grid" ref={glimpsesRef}>
          {[
            festImg01, festImg02, festImg03, festImg04, festImg05,
            festImg06, festImg07, festImg08, festImg010,
            festImg9, festImg11, festImg012, festImg013, festImg014,
          ].map((src, i) => (
            <div className="glimpse-item" key={i}>
              <img src={src} alt={`Emblazon glimpse ${i + 1}`} loading="lazy" />
              <div className="glimpse-overlay" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
