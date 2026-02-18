import { Link } from 'react-router-dom';

export default function About() {
  const videoSrc = new URL('../../assets/fest/Hmritm.mp4', import.meta.url).href;

  return (
    <div style={{ position: 'relative', width: '100%', overflowX: 'hidden', background: '#000' }}>
      {/* fixed full-screen video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        src={videoSrc}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          zIndex: 0
        }}
      />
      {/* fixed dark overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%)',
          zIndex: 1
        }}
      />

      {/* spacer – first full screen is just the video */}
      <div style={{ height: '100dvh', position: 'relative', zIndex: 2 }} />

      {/* sticky about box – slides up from bottom, sticks at top: 20vh */}
      <div
        style={{
          position: 'sticky',
          top: '20vh',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 3vw',
          paddingBottom: '8dvh'
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(15,10,40,0.78) 0%, rgba(30,15,60,0.72) 100%)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 'clamp(12px, 3vw, 22px)',
            padding: 'clamp(1rem, 5vw, 2.6rem)',
            color: '#e8e8ef',
            lineHeight: 1.8,
            fontSize: 'clamp(0.95rem, 2.8vw, 1.06rem)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)'
          }}
        >
          <h1 style={{ marginBottom: '1rem', color: '#ff7eb3', fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', textShadow: '0 2px 12px rgba(255,126,179,0.35)' }}>About</h1>
          <p style={{ marginBottom: '0.9rem' }}>
            HMR Institute of Technology &amp; Management was established in the year 2002. It is spread over a sprawling lush green campus 5 acres of land.
          </p>
          <p style={{ marginBottom: '0.9rem' }}>
            HMRITM exists for nurturing the Technical Spirit – conceived in 2002, to provide exceptional facilities for students of Engineering and Technology, the HMR Institute of Technology and Management boasts of being among the reputed institutes even in its early stages. The Institute recognises the need for bringing up a new age cerebral workforce in today&apos;s highly competitive environment.
          </p>
          <p style={{ marginBottom: '0.9rem' }}>
            The name HMR stands for the founders of this institution Late Sh. Hiralal, Late Smt. Mohan Devi and Late Smt. Rita Gupta. The Institute provides an atmosphere that ensures academic excellence and industry exposure that helps equip the students with the technical skills and emotional intelligence to successfully grapple with the complexities of a dynamic technology-driven environment. This endeavour is greatly aided by the local location of the institute in Delhi that is home to several corporate houses and industries.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            The institute stands for quality embedded higher education at par with global standard and an excellent learning environment backed by innovative state-of-the-art infrastructure. Further, it aims to add greater value to the world of crucial engineering developments and technological breakthroughs through an active focus on research and development activities. With a bird&apos;s eye-view of all-encompassing development, it strives to achieve faster progress for students, and for itself.
          </p>
          <Link to="/" style={{ color: '#ffb347', fontWeight: 600, textDecoration: 'none' }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
