import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  serviceReceived: string;
  artisan: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Aurelis isn’t just a haircut; it is a ritual of restoration. The attention to bone structure and the single-malt lounge experience make it unrivaled in the capital.',
    author: 'Raghavan Singhal',
    role: 'Managing Director',
    company: 'Peak Horizon Capital',
    serviceReceived: 'Aurelis Signature Architecture Cut',
    artisan: 'Aman Sharma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
  },
  {
    id: 't2',
    quote:
      'Finding a barber who understands European texture and beard geometry in Delhi was impossible until I sat in Marcus’s chair. Remarkable craft.',
    author: 'Julian D’Souza',
    role: 'Creative Director',
    company: 'Monolith Design Labs',
    serviceReceived: 'Royal Damascus Hot Towel Shave',
    artisan: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
  },
  {
    id: 't3',
    quote:
      'The Volcanic Cryo Facial and private VIP suite gave me the sharpest look and deepest recharge right before our IPO bell ceremony. Pure distinction.',
    author: 'Vikramaditya Roy',
    role: 'Co-Founder & CEO',
    company: 'Aether Cloud Networks',
    serviceReceived: 'The Emperor’s Complete Suite',
    artisan: 'Devraj Chauhan',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
  },
];

const PRESS_ACCOLADES = [
  { name: 'GQ INDIA', quote: '“The pinnacle of bespoke gentleman grooming in New Delhi.”' },
  { name: 'VOGUE MEN', quote: '“A cinematic sanctuary where craft meets architectural luxury.”' },
  { name: 'MENSXP', quote: '“Best Luxury Barbershop & Grooming Studio 2025.”' },
  { name: 'ROBB REPORT', quote: '“An uncompromising standard of master bladesmithing.”' },
];

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const t = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="section-compact clean-testimonials-section" id="testimonials">
      <div className="wrap">
        <div className="services-section-header text-center-header">
          <span className="kicker">Voices of Distinction</span>
          <h2 className="section-title-clean">Patrons & Press Accolades</h2>
        </div>

        {/* Featured Testimonial Quote Card */}
        <div className="featured-quote-card glass-panel">
          <div className="quote-icon-pill">
            <Quote size={24} className="quote-icon-rose" />
          </div>

          <div className="quote-stars-row">
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} size={18} className="star-fill-gold" />
            ))}
          </div>

          <blockquote className="testimonial-quote-text">
            "{t.quote}"
          </blockquote>

          <div className="testimonial-author-meta">
            <img src={t.avatar} alt={t.author} className="author-avatar-img" />
            <div className="author-info-col">
              <div className="author-name-row">
                <span className="author-name">{t.author}</span>
                <span className="author-verified">
                  <ShieldCheck size={14} /> Verified Patron
                </span>
              </div>
              <span className="author-role">{t.role} • {t.company}</span>
              <span className="author-ritual-tag">
                Ritual: <strong>{t.serviceReceived}</strong> with <strong>{t.artisan}</strong>
              </span>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="quote-nav-controls">
            <button onClick={prev} className="quote-nav-btn" aria-label="Previous testimonial">
              <ChevronLeft size={20} />
            </button>
            <div className="quote-dots-indicator">
              {TESTIMONIALS_DATA.map((_, i) => (
                <span
                  key={i}
                  className={`dot-item ${currentIndex === i ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
            <button onClick={next} className="quote-nav-btn" aria-label="Next testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Press Strip */}
        <div className="press-strip-grid">
          {PRESS_ACCOLADES.map((item, idx) => (
            <div key={idx} className="press-card glass-panel">
              <span className="press-publication-title">{item.name}</span>
              <p className="press-quote-desc">{item.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
