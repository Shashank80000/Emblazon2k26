import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import emblazonLogo from '../../assets/fest/logo.svg';
import './Footer.css';

// Social Media Icons
import xLogo from '../../assets/social media/x.png';
import facebookLogo from '../../assets/social media/facebook.png';
import instagramLogo from '../../assets/social media/instagram.png';

function Footer() {
    return (
        <footer className="footer-section">
            {/* Ambient Background Glows */}
            <div className="footer-glow footer-glow-left"></div>
            <div className="footer-glow footer-glow-right"></div>

            <div className="footer-container">
                {/* Logo and About */}
                <motion.div
                    className="footer-column"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="footer-logo">
                        <img src={emblazonLogo} alt="Emblazon 2K26" />
                        <span>EMBLAZON 2K26</span>
                    </div>
                    <p className="footer-tagline">
                        The Cultural Fest of HMRITM
                    </p>
                    <div className="footer-description">
                        <h3 className="footer-heading">VISIT US</h3>
                        <p className="footer-address">
                            HMR INSTITUTE OF TECHNOLOGY AND MANAGEMENT<br />
                            Plot No. 326, Bakoli HMRITM Rd, Hamidpur,<br />
                            New Delhi, Delhi, 110036, India
                        </p>
                    </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                    className="footer-column"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="footer-heading">QUICK LINKS</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/team">Our Team</Link></li>
                        <li><Link to="/events">Events</Link></li>
                        <li><Link to="/sponsors">Sponsors</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                </motion.div>

                {/* Contact Us */}
                <motion.div
                    className="footer-column"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="footer-heading">CONTACT US</h3>
                    <div className="footer-contact">
                        <p className="contact-label">For General Inquiries:</p>
                        <a href="mailto:info@hmritm.ac.in" className="contact-email">
                            info@hmritm.ac.in
                        </a>

                        <p className="contact-label">For Sponsorship:</p>
                        <a href="mailto:sponsorship@hmritm.ac.in" className="contact-email">
                            sponsorship@hmritm.ac.in
                        </a>
                    </div>
                </motion.div>

                {/* Follow Us */}
                <motion.div
                    className="footer-column"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <h3 className="footer-heading">FOLLOW US</h3>
                    <ul className="footer-social">
                        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <a href="https://instagram.com/emblazon_2k25/" target="_blank" rel="noopener noreferrer">
                                <span className="social-icon">
                                    <img
                                        className="social-icon-img"
                                        src={instagramLogo}
                                        alt="Instagram"
                                    />
                                </span>
                                Instagram
                            </a>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <a href="https://facebook.com/emblazon_2k25/" target="_blank" rel="noopener noreferrer">
                                <span className="social-icon">
                                    <img
                                        className="social-icon-img"
                                        src={facebookLogo}
                                        alt="Facebook"
                                    />
                                </span>
                                Facebook
                            </a>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <a href="https://x.com/emblazon2k25/" target="_blank" rel="noopener noreferrer">
                                <span className="social-icon">
                                    <img
                                        className="social-icon-img"
                                        src={xLogo}
                                        alt="X"
                                    />
                                </span>
                                X
                            </a>
                        </motion.li>
                    </ul>
                </motion.div>
            </div>

            {/* Copyright */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Emblazon HMRITM. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
