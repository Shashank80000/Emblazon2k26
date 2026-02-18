import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Flip, ScrollTrigger } from 'gsap/all';
import './gallery.css';

gsap.registerPlugin(Flip, ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef(null);
  const initRef = useRef(false);

  useEffect(() => {
    // Guard against StrictMode double-invocation
    if (initRef.current) return;
    initRef.current = true;

    const galleryItems = document.querySelectorAll('.gallery div');

    galleryItems.forEach((el) => el.classList.add('flip'));

    const state = Flip.getState(
      ['.gallery div', '.gallery div .img'],
      { props: 'borderRadius' }
    );

    galleryItems.forEach((el) => el.classList.remove('flip'));

    Flip.to(state, {
      scale: true,
      simple: true,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'center center',
        end: '+=300%',
        scrub: 2,
        pin: true,
      },
    });
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
        <div className="gallery">
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
