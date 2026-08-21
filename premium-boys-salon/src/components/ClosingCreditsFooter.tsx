import React, { useState } from 'react';
import { ArrowUp, Instagram, Youtube, Facebook, Mail, Check } from 'lucide-react';

export const ClosingCreditsFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="closing-credits-footer">
      <div className="wrap">
        <div className="footer-credits-grid">
          {/* Col 1: Brand Creed */}
          <div className="footer-col-brand">
            <div className="footer-brand-lockup">
              <img
                src="/favicon.svg"
                alt="AURELIS Crest"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(201, 162, 39, 0.2)',
                  objectFit: 'contain'
                }}
              />
              <div>
                <h3 className="brand-title" style={{ color: 'var(--color-text-primary)' }}>AURELIS</h3>
                <span className="brand-tag">Boys Grooming Studio</span>
              </div>
            </div>

            <p className="brand-creed">
              An architectural men’s sanctuary dedicated to the mastery of head morphology, straight razor hone, and restorative grooming alchemy.
            </p>

            <div className="footer-social-strip">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-glow-btn" aria-label="Instagram">
                <Instagram size={17} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-glow-btn" aria-label="YouTube">
                <Youtube size={17} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-glow-btn" aria-label="Facebook">
                <Facebook size={17} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h4 className="credits-col-title">Navigation</h4>
            <ul className="credits-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#story">Craft Philosophy</a></li>
              <li><a href="#services">Services & Rituals</a></li>
              <li><a href="#booking">Reserve Chair</a></li>
              <li><a href="#location">Studio Location</a></li>
            </ul>
          </div>

          {/* Col 3: Signature Rituals */}
          <div className="footer-col">
            <h4 className="credits-col-title">Signature Rituals</h4>
            <ul className="credits-links-list">
              <li><a href="#services">Architecture Haircut</a></li>
              <li><a href="#services">Royal Damascus Shave</a></li>
              <li><a href="#services">Volcanic Cryo-Facial</a></li>
              <li><a href="#services">Grey Camouflage Finish</a></li>
              <li><a href="#services">Emperor's Complete Suite</a></li>
            </ul>
          </div>

          {/* Col 4: Aurelis Gazette Newsletter */}
          <div className="footer-col">
            <h4 className="credits-col-title">The Aurelis Gazette</h4>
            <p className="newsletter-explainer">
              Receive seasonal lookbooks, grooming masterclasses, and priority access to limited private suite slots.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleNewsletter} className="newsletter-form-group">
                <div className="newsletter-input-wrap">
                  <Mail size={15} className="newsletter-icon" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-field"
                  />
                </div>
                <button type="submit" className="btn-rose-solid newsletter-submit-btn">
                  <span>Join The Society</span>
                </button>
              </form>
            ) : (
              <div className="newsletter-success-tag">
                <Check size={16} />
                <span>Welcome to The Aurelis Circle.</span>
              </div>
            )}
          </div>
        </div>

        <div className="footer-credits-divider" />

        <div className="footer-bottom-bar">
          <div className="footer-credits-meta">
            <span>© {new Date().getFullYear()} AURELIS Grooming Studio</span>
            <span className="dot-sep">•</span>
            <span>All Rights Reserved</span>
            <span className="dot-sep">•</span>
            <span style={{ color: 'var(--color-gold-accent)', fontWeight: 600 }}>Designed & Built by Sumit Kumar</span>
          </div>

          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Return to top">
            <span>BACK TO TOP</span>
            <div className="back-top-circle">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
