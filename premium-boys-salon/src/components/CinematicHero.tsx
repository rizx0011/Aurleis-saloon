import React from 'react';
import { Sparkles, ArrowRight, Play, Clock, Award, ShieldCheck } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';

interface HeroProps {
  onBookNow: () => void;
  onOpenFilm: () => void;
}

export const CinematicHero: React.FC<HeroProps> = ({ onBookNow, onOpenFilm }) => {
  return (
    <section className="clean-hero-section" id="home">
      {/* Soft studio ambient light glows */}
      <div className="hero-glow-blob blob-rose" aria-hidden="true" />
      <div className="hero-glow-blob blob-champagne" aria-hidden="true" />

      <div className="wrap hero-layout-grid">
        {/* Left Column: Editorial Headline & Actions */}
        <div className="hero-copy-col">
          <div className="hero-badge-pill">
            <span className="live-pulse-dot" />
            <span className="badge-text">Flagship Studio • Luxury Men's Sanctuary</span>
          </div>

          <h1 className="hero-main-heading">
            The Craft of <br />
            <span className="heading-gradient-serif">Distinction.</span>
          </h1>

          <p className="hero-subtext">
            A light-filled sanctuary where classical barbering meets modern architectural aesthetics.
            Bespoke haircuts, sculpted beards, and restorative grooming rituals designed for the modern gentleman.
          </p>

          <div className="hero-cta-cluster">
            <button onClick={onBookNow} className="btn-rose-solid">
              <span>Reserve Your Chair</span>
              <ArrowRight size={16} />
            </button>
            <button onClick={onOpenFilm} className="btn-glass-subtle">
              <Play size={15} className="play-icon-rose" />
              <span>Experience The Studio</span>
            </button>
          </div>

          {/* Micro Trust Matrix */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <Award size={18} className="trust-icon" />
              <div className="trust-text">
                <strong>Voted Top Barbershop</strong>
                <span>GQ India & Vogue Men</span>
              </div>
            </div>
            <div className="trust-item">
              <ShieldCheck size={18} className="trust-icon" />
              <div className="trust-text">
                <strong>Master Artisans</strong>
                <span>12+ Yrs Senior Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Centerpiece & Floating Glass Cards */}
        <div className="hero-3d-wrapper">
          <Hero3DCanvas />

          {/* Floating Glassmorphism Micro-Card (Left) */}
          <div className="floating-glass-badge badge-left">
            <div className="glass-icon-circle">
              <Sparkles size={16} />
            </div>
            <div className="badge-info">
              <span className="badge-title">Single-Malt Lounge</span>
              <span className="badge-sub">Complimentary Refreshments</span>
            </div>
          </div>

          {/* Floating Glassmorphism Micro-Card (Right) */}
          <div className="floating-glass-badge badge-right">
            <div className="glass-icon-circle">
              <Clock size={16} />
            </div>
            <div className="badge-info">
              <span className="badge-title">Private Suite Booking</span>
              <span className="badge-sub">Only 8 Slots / Day</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
