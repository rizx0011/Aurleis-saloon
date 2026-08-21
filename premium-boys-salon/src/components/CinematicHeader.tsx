import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { AmbientSound } from './AmbientSound';

interface HeaderProps {
  onBookNow: () => void;
}

export const CinematicHeader: React.FC<HeaderProps> = ({ onBookNow }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 40);
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Philosophy', href: '#story' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#location' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`clean-glass-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="wrap nav-inner">
          {/* Brand Logo with Crown & Shears Emblem */}
          <a href="#home" className="brand-logo-lockup" onClick={() => handleLinkClick('#home')}>
            <img
              src="/favicon.svg"
              alt="AURELIS Crest"
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(201, 162, 39, 0.2)',
                objectFit: 'contain'
              }}
            />
            <div className="brand-text-col">
              <span className="brand-title">AURELIS</span>
              <span className="brand-tag">Boys Grooming Studio</span>
            </div>
          </a>

          {/* Desktop Navigation (Essential 4 Links) */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="clean-nav-links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="clean-nav-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions & Utilities (PRD §3: "Book a Chair" button removed from desktop header) */}
          <div className="nav-actions-wrap">
            {/* Ambient luxury audio generator */}
            <AmbientSound />

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-hamburger-btn"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="scroll-progress-line" style={{ width: `${scrollProgress}%` }} />
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay-menu">
          <div className="mobile-menu-inner">
            <div className="mobile-menu-brand">
              <Sparkles size={16} className="sparkle-icon-rose" />
              <span>AURELIS STUDIO</span>
            </div>

            <ul className="mobile-menu-links">
              {navLinks.map((link, idx) => (
                <li key={link.label} style={{ animationDelay: `${idx * 0.08}s` }}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                  >
                    <span className="mobile-link-num">0{idx + 1}</span>
                    <span className="mobile-link-text">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-menu-footer">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookNow();
                }}
                className="btn-rose-solid mobile-book-btn"
              >
                <span>Reserve Chair</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
