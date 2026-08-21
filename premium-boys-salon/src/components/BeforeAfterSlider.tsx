import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle2 } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  stylist: string;
  duration: string;
  transformation: string;
  beforeImg: string;
  afterImg: string;
  highlights: string[];
}

// PRD §4: Matching before/after transformation pairs (matching subject, matching lighting & barber chair context)
const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'The Signature Low-Skin Taper & Scissor Crop',
    client: 'Rohan Mehta (Tech Executive)',
    stylist: 'Aman Sharma',
    duration: '50 Min',
    transformation: 'Tamed overgrown bulk and uneven crown density into an architectural matte crop with precision gradient taper.',
    beforeImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    highlights: ['Micro-scissor texturing', 'Low skin taper fade', 'Matte clay styling'],
  },
  {
    id: 'case-2',
    title: 'Architectural Beard Sculpture & Hot Towel Finish',
    client: 'Vikramaditya Roy (Design Director)',
    stylist: 'Zubin Sethi',
    duration: '45 Min',
    transformation: 'Reshaped patchiness along the jawline, carved crisp cheek symmetry, and conditioned with steam argan ritual.',
    beforeImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
    highlights: ['Damascus razor lines', 'Argan steam infusion', 'Gradient cheek taper'],
  },
  {
    id: 'case-3',
    title: 'Distinguished Grey Camouflage & Executive Contour',
    client: 'Kabir Singhania (Managing Partner)',
    stylist: 'Marcus Vance',
    duration: '60 Min',
    transformation: 'Blended scattered silver strands with low-contrast demi glaze, paired with clean razor-tapered neckline.',
    beforeImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    highlights: ['Low-contrast demi color', 'Volume blowout', 'Silk shine pomade'],
  },
];

export const BeforeAfterSlider: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCase = CASE_STUDIES[activeCaseIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="section-compact gallery-portfolio-section" id="gallery">
      <div className="wrap">
        <div className="services-section-header">
          <div>
            <span className="kicker">Proof of Craftsmanship</span>
            <h2 className="section-title-clean">The Transformation Studio</h2>
            <p className="section-lead-clean">
              Drag the interactive slider horizontally to inspect the geometric precision behind our signature cuts and beard sculptures.
            </p>
          </div>

          <div className="case-selector-pills">
            {CASE_STUDIES.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPos(50);
                }}
                className={`case-pill-btn ${activeCaseIndex === idx ? 'active' : ''}`}
              >
                Case 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="comparison-interactive-grid">
          {/* Draggable Dual-Layer Frame */}
          <div
            ref={containerRef}
            className="slider-frame-wrapper glass-panel"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Full Background) */}
            <div className="slider-img-layer after-layer">
              <img src={currentCase.afterImg} alt={`${currentCase.title} After`} className="slider-img" />
              <span className="slider-badge badge-after">AFTER • AURELIS</span>
            </div>

            {/* Before Image (Clipped Left Layer) */}
            <div
              className="slider-img-layer before-layer"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <img src={currentCase.beforeImg} alt={`${currentCase.title} Before`} className="slider-img" />
              <span className="slider-badge badge-before">BEFORE</span>
            </div>

            {/* Draggable Divider Line & Golden Handle */}
            <div className="slider-divider-bar" style={{ left: `${sliderPos}%` }}>
              <div className="slider-handle-pill" aria-label="Drag slider">
                <MoveHorizontal size={18} />
              </div>
            </div>
          </div>

          {/* Transformation Meta Details */}
          <div className="case-details-card glass-panel">
            <div className="case-header-row">
              <span className="case-num-tag">Case Study 0{activeCaseIndex + 1}</span>
              <span className="case-dur-tag">{currentCase.duration}</span>
            </div>

            <h3 className="case-title-text">{currentCase.title}</h3>
            <p className="case-client-text">Client: <strong>{currentCase.client}</strong></p>
            <p className="case-stylist-text">Master Artisan: <strong>{currentCase.stylist}</strong></p>

            <div className="case-narrative-box">
              <strong>The Transformation:</strong>
              <p>{currentCase.transformation}</p>
            </div>

            <div className="case-highlights-list">
              <strong>Key Techniques Executed:</strong>
              {currentCase.highlights.map((h, i) => (
                <div key={i} className="highlight-row">
                  <CheckCircle2 size={15} className="check-icon-rose" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="drag-helper-hint">
              <Sparkles size={14} />
              <span>Drag divider left & right to reveal transformation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
