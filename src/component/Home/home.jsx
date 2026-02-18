import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './home.css';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
if (window.matchMedia('(max-width: 768px)').matches) {
  gsap.ticker.lagSmoothing(1000, 16);
}

export default function Home() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section1',
        start: '50% 50%',
        end: '300% 50%',
        scrub: isMobile ? 0.5 : 1,
        pin: true,
      },
    });

    tl.to('.section1', { backgroundColor: 'black' }, 'hello')
      .to('.section1 p', { opacity: 1, scale: 1 }, 'hello')
      .to('.section1 img', { opacity: 0 }, 'hello2')
      .to('.content h4', { opacity: 0 }, 'hello2')
      .to('.content ul', { opacity: 0 }, 'hello2')
      .to('.content h1', { scale: 1.3, opacity: 0 })
      .to('.section1 p', { scale: 0.8, opacity: 0 });

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.section2',
        start: '10% 90%',
        end: '60% 60%',
        scrub: isMobile ? 1.5 : 3,
      },
    });

    tl1
      .to('.content1', { scale: 1 }, 'da')
      .to('.para p', { filter: 'blur(0px)' }, 'da')
      .to('.paragraph1', { transform: ' translateX(0px)' }, 'da')
      .to('.paragraph2', { transform: ' translateX(0px)' }, 'da');

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.section3',
        start: '25% 80%',
        end: '80% 80%',
        scrub: isMobile ? 1.5 : 3,
      },
    });

    tl2
      .to('.mid-one', { transform: 'translateX(60px)', opacity: '1' }, 'yaya')
      .to('.mid-two', { transform: 'translateX(60px)' }, 'yaya')
      .to('.paras', { color: 'black' }, 'yya2')
      .to('.section3', { backgroundColor: 'white' }, 'yya2');

    const tl3ka = gsap.timeline({
      scrollTrigger: {
        trigger: '.forheading',
        start: '30% 50%',
        end: '100% 50%',
        scrub: 2,
      },
    });

    tl3ka.to('#creativehead', { xPercent: -35 });

    const tl4kanext = gsap.timeline({
      scrollTrigger: {
        trigger: '.section4',
        start: '5% 0%',
        end: '120% 50%',
        scrub: 2,
        pin: true,
      },
    });

    tl4kanext
      .to('#Branding', { transform: ' translateX(0px)', opacity: ' 1' })
      .to('#Design', { transform: ' translateX(0px)', opacity: ' 1' })
      .to('#Marketing', { transform: ' translateX(0px)', opacity: ' 1' }, 'hellobhai')
      .to('.section4', { backgroundColor: 'black' }, 'hellobhai')
      .to('.section4-cont', { color: 'white' }, 'hellobhai')
      .to('.section4', { backgroundColor: 'white' }, 'forinter')
      .to('.section4-cont', { color: 'black' }, 'forinter');

    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: '.main-blank',
        start: '50% 50%',
        end: '200% 60%',
        scrub: isMobile ? 1 : 2,
        pin: true,
      },
    });

    tl5
      .to('.card1', {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%) rotateX(0deg)',
      }, 'forheading')
      .to('.card2', {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }, 'forone')
      .to('.card1', {
        scale: 0.7,
        transform: 'translate(-50%,-50%) rotate(3deg)',
        opacity: 0,
      }, 'forone')
      .to('.card3', {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }, 'fortwo')
      .to('.card2', {
        scale: 0.7,
        transform: 'translate(-50%,-50%) rotate(-3deg)',
        opacity: 0,
      }, 'fortwo')
      .to('.card4', {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
      }, 'forthree')
      .to('.card3', {
        scale: 0.7,
        transform: 'translate(-50%,-50%) rotate(3deg)',
        opacity: 0,
      }, 'forthree')
      .to('.card4', { scale: 0.8, opacity: 0.4 });

    const tl6 = gsap.timeline({
      scrollTrigger: {
        trigger: '.section7',
        start: '65% 50%',
        end: '110% 50%',
        pin: true,
        scrub: isMobile ? 1.5 : 3,
      },
    });

    tl6
      .to('.left', { filter: 'blur(0px)', opacity: 1, y: 0 }, 'apit')
      .to('.right', { filter: 'blur(0px)', opacity: 1, y: 0 }, 'apit');

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill(true));
      gsap.globalTimeline.clear();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.width = '';
      document.documentElement.style.width = '';
    };
  }, []);

  return (
    <>
      <div className="section1">
        <img src="https://via.placeholder.com/1200x1000?text=Placeholder" alt="" loading="lazy" decoding="async" />
        <div className="content">
          <h4>Design Agency®</h4>
          <h1>Creative</h1>
          <ul type="none">
            <li>UX/UI Design</li>
            <li>Development</li>
            <li>Problem Solving</li>
          </ul>
        </div>
        <p>
          For over a decade, we've partnered worldwide with founders to shape bold
          identities that redefine markets.
        </p>
      </div>

      <div className="section2">
        <div className="content1">
          <h4>Profile</h4>
          <h1>
            We transform bold ideas into standout brands through strategy, design,
            and marketing — all seamlessly integrated
          </h1>
          <div className="para">
            <p className="paragraph1">
              From day one, our mission has been to craft timeless identities that
              cut through the noise. Each year we collaborate with five teams to
              ensure unrivaled attention and dedication
            </p>
            <p className="paragraph2">
              For over a decade, we've partnered worldwide with founders to shape
              bold identities that redefine markets.
            </p>
          </div>
        </div>
      </div>

      <div className="section3">
        <div className="top">
          <h5>Expertise</h5>
          <h1>Expertise speaks volumes.</h1>
          <p>2025®</p>
        </div>
        <div className="mid">
          <div className="mid-one"></div>
          <div className="mid-two"></div>
        </div>
        <div className="botom">
          <div className="paras">
            <p id="paras1">
              Our approach blends strategy and design to build brands that stand
              <br />the test of time. We dive deep into every detail to create
              <br />
              meaningful, lasting connections.
            </p>
            <p id="paras2">
              Driven by precision and purpose, we shape bold <br />
              visual systems that empower brands to lead. Every <br />
              project reflects our passion for clarity and excellence.
            </p>
          </div>
        </div>
      </div>

      <div className="forheading">
        <h1 id="creativehead">Creative ® Studio Creative ® Studio</h1>
      </div>

      <div className="section4">
        <div className="section4-cont">
          <h2 id="Branding">Branding</h2>
          <h2 id="Design">Design</h2>
          <h2 id="Marketing">Marketing</h2>
        </div>
      </div>

      <div className="blank blank1"></div>
      <div className="main-blank">
        <h6>Featured Works</h6>
        <div className="card card1">
          <h1>Reisfel</h1>
          <div className="fordate">
            <p>Branding</p>
            <p>December 30, 2025</p>
          </div>
        </div>
        <div className="card card2">
          <h1>Delvyes</h1>
          <div className="fordate">
            <p>Branding</p>
            <p>December 30, 2025</p>
          </div>
        </div>
        <div className="card card3">
          <h1>Clairvy</h1>
          <div className="fordate">
            <p>Branding</p>
            <p>December 30, 2025</p>
          </div>
        </div>
        <div className="card card4">
          <h1>Racely</h1>
          <div className="fordate">
            <p>Branding</p>
            <p>December 30, 2025</p>
          </div>
        </div>
      </div>

      <div className="section6">
        <h3>Trusted by Clients</h3>

        <div className="prof">
          <div className="cardsp cardsp1">
            <div className="img"></div>
            <p>
              "The team is efficient and reliable. They delivered everything they
              promised. I will definitely hire them again for future projects."
            </p>
            <h3>H. Rackham, Carrot</h3>
          </div>
          <div className="cardsp cardsp2">
            <div className="img"></div>
            <p>
              "The team is efficient and reliable. They delivered everything they
              promised. I will definitely hire them again for future projects."
            </p>
            <h3>H. Rackham, Carrot</h3>
          </div>
          <div className="cardsp cardsp3">
            <div className="img"></div>
            <p>
              "The team is efficient and reliable. They delivered everything they
              promised. I will definitely hire them again for future projects."
            </p>
            <h3>H. Rackham, Carrot</h3>
          </div>
        </div>
      </div>

      <div className="section7">
        <h3>Pricing Plans</h3>
        <p>Clear, transparent pricing for every stage.</p>
        <div className="pricecart">
          <div className="left">
            <h4>Initial</h4>
            <h1>$750</h1>
            <p>
              Perfect for entrepreneurs or small brands building their identity
              from scratch.
            </p>
            <h3>What's included ?</h3>
            <div className="list">
              <p><i className="ri-add-line"></i>Basic visual identity</p>
              <p><i className="ri-add-line"></i>Very light market research</p>
              <p><i className="ri-add-line"></i>UX/UI layout for up to 1 pages</p>
              <p><i className="ri-add-line"></i>Simple landing page</p>
              <p><i className="ri-add-line"></i>Simple website setup</p>
              <p><i className="ri-add-line"></i>One monthly support message via email</p>
              <p><i className="ri-add-line"></i>Simple intro micro-animation (5–8 seconds)</p>
              <p><i className="ri-add-line"></i>No brand strategy or additional assets included</p>
              <p><i className="ri-add-line"></i>Limited revisions and adjustments</p>
            </div>
          </div>
          <div className="right">
            <h4>Custom Project</h4>
            <h1>$1.499</h1>
            <p>
              Ideal for established brands or corporations needing full-scale
              strategic support.
            </p>
            <h3>What's included ?</h3>
            <div className="list">
              <p><i className="ri-add-line"></i>Full brand strategy + identity system</p>
              <p><i className="ri-add-line"></i>Comprehensive market research</p>
              <p><i className="ri-add-line"></i>UX/UI design for complete website experience</p>
              <p><i className="ri-add-line"></i>Full development (Webflow or custom)</p>
              <p><i className="ri-add-line"></i>Advanced motion design & animations</p>
              <p><i className="ri-add-line"></i>3D visual assets or product renders</p>
              <p><i className="ri-add-line"></i>Marketing strategy & content direction</p>
              <p><i className="ri-add-line"></i>Dedicated account manager</p>
              <p><i className="ri-add-line"></i>Priority support & weekly progress reviews</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section8">
        <h2>Why Work With Us</h2>
        <div className="container">
          <div className="lft">
            <h1>Why us?</h1>

            <p>
              Elevate your brand with a studio that brings strategy, design,
              motion, and technology together — delivering visuals that stand out,
              stories that resonate, and digital experiences built to perform.
            </p>
            <h2 className="horn">
              Choosing the right studio matters — especially when your brand needs
              to stand out, move, and perform. We combine design, motion, and web
              to deliver work that makes an instant impact and keeps your audience
              engaged.
            </h2>
          </div>
          <div className="rht">
            <h1>Metrics</h1>
            <div className="img"></div>
            <div className="imgbottom">
              <div className="peop peop1"></div>
              <div className="peop peop2"></div>
              <div className="peop peop3"></div>
              <p>2M+ Happy Clients</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section9">
        <div className="top">
          <h1>Let's Talk</h1>
          <button>Start</button>
        </div>
        <div className="bottom">
          <h1>Veauly Studio</h1>
          <div className="footercontent">
            <div className="left">
              <a href="#">Nicodev</a>
              <a href="#">From Webflow</a>
              <a href="#">Licences</a>
            </div>
            <div className="rht">
              <div className="point"><i className="ri-instagram-line"></i></div>
              <div className="point"><i className="ri-youtube-line"></i></div>
              <div className="point"><i className="ri-facebook-fill"></i></div>
              <div className="point"><i className="ri-twitter-fill"></i></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
