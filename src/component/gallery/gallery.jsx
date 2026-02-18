import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Flip, ScrollTrigger } from 'gsap/all';
import './gallery.css';

gsap.registerPlugin(Flip, ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    const section = sectionRef.current;
    if (!gallery || !section) return;

    // Exact same logic as the reference site
    const galleryItems = document.querySelectorAll('.gallery-page .gallery div');

    galleryItems.forEach((el) => el.classList.add('flip'));

    const state = Flip.getState(
      ['.gallery-page .gallery div', '.gallery-page .gallery div .img'],
      { props: 'borderRadius' }
    );

    galleryItems.forEach((el) => el.classList.remove('flip'));

    Flip.to(state, {
      scale: true,
      simple: true,
      scrollTrigger: {
        trigger: section,
        start: 'center center',
        end: '+=300%',
        scrub: 2,
        pin: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="gallery-page">
      <section className="header-container">
        <div className="title">
          <h1>Gallery <span>Zoom</span> effect</h1>
          <p>using GSAP Flip plug-in</p>
        </div>
      </section>

      <section className="gallery-container" ref={sectionRef}>
        <div className="gallery" ref={galleryRef}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div>
            <div className="img"></div>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>

      <section>
        <div className="title">
          <h1><span>End</span></h1>
        </div>
      </section>
    </div>
  );
}
