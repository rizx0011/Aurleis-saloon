import React from 'react';
import { Scissors, Coffee, Sparkles, Feather, ArrowRight } from 'lucide-react';

interface StoryProps {
  onBookNow: () => void;
}

export const ParallaxStory: React.FC<StoryProps> = ({ onBookNow }) => {
  return (
    <section className="section-compact clean-story-section" id="story">
      <div className="wrap">
        <div className="story-split-grid">
          {/* Left Column: Atmospheric Studio Visual Card (3D Tilt effect) */}
          <div 
            className="story-media-card glass-panel"
            style={{ 
              transform: 'perspective(1000px) rotateX(2deg) rotateY(-2deg)', 
              transition: 'transform 0.4s ease-out, box-shadow 0.4s ease-out',
              boxShadow: '20px 20px 60px rgba(0, 0, 0, 0.05), -20px -20px 60px rgba(255, 255, 255, 0.8)'
            }}
            onMouseMove={(e) => {
              const el = e.currentTarget;
              const rect = el.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const multiplier = 10;
              const xRotate = multiplier * ((y - rect.height / 2) / rect.height);
              const yRotate = -multiplier * ((x - rect.width / 2) / rect.width);
              el.style.transform = `perspective(1000px) rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(-2deg)';
            }}
          >
            <div className="story-img-container">
              <img
                src="/images/salon-interior.jpg"
                alt="Aurelis Studio Interior"
                className="story-featured-img"
                loading="lazy"
              />
              <div className="story-stamp-badge">
                <span className="stamp-year">EST. 2019</span>
                <span className="stamp-loc">NEW DELHI</span>
              </div>
            </div>

            <div className="story-caption-bar">
              <div>
                <strong>Aman Sharma</strong>
                <span>Founder & Master Craftsman</span>
              </div>
              <div className="founder-signature-text">Aman Sharma</div>
            </div>
          </div>

          {/* Right Column: Narrative & 4 Pillars */}
          <div className="story-copy-col">
            <span className="kicker">The Aurelis Philosophy</span>
            <h2 className="section-title-clean">Grooming as an Architectural Craft</h2>
            <p className="story-quote-lead">
              "We didn't build Aurelis to be another bustling salon. We engineered a serene sanctuary where time slows down, and every scissor stroke is calculated with geometric precision."
            </p>

            <div className="story-pillars-grid">
              <div className="pillar-item glass-panel">
                <div className="pillar-icon-box">
                  <Scissors size={18} />
                </div>
                <div className="pillar-text">
                  <h4>Head Morphology Mapping</h4>
                  <p>Every cut begins with bone structure analysis to highlight your natural jawline.</p>
                </div>
              </div>

              <div className="pillar-item glass-panel">
                <div className="pillar-icon-box">
                  <Coffee size={18} />
                </div>
                <div className="pillar-text">
                  <h4>Single-Malt Lounge Bar</h4>
                  <p>Complimentary pour of aged single-malts, artisanal pour-over coffee, or sparkling water.</p>
                </div>
              </div>

              <div className="pillar-item glass-panel">
                <div className="pillar-icon-box">
                  <Sparkles size={18} />
                </div>
                <div className="pillar-text">
                  <h4>Organic Botanical Alchemy</h4>
                  <p>100% paraben-free organic pomades, cold-pressed argan oils, and therapeutic clays.</p>
                </div>
              </div>

              <div className="pillar-item glass-panel">
                <div className="pillar-icon-box">
                  <Feather size={18} />
                </div>
                <div className="pillar-text">
                  <h4>Damascus Steel Honing</h4>
                  <p>Japanese and Damascus steel straight razors hand-stropped before every single shave.</p>
                </div>
              </div>
            </div>

            <div className="story-footer-cta">
              <button onClick={onBookNow} className="btn-rose-solid">
                <span>Experience The Difference</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
