import { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

interface BrandFilmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export function BrandFilmModal({ isOpen, onClose, onBookNow }: BrandFilmModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { title: 'The Arrival', time: '0:00', desc: 'Warm amber glow, walnut leather chairs, signature espresso.' },
    { title: 'The Consultation', time: '0:45', desc: 'Understanding your bone structure, hair growth, and lifestyle.' },
    { title: 'The Ritual', time: '1:30', desc: 'Japanese steel scissors, warm steam towels, straight razor precision.' },
    { title: 'The Reveal', time: '2:15', desc: 'A bespoke silhouette that commands presence.' },
  ];

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="brand-film-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="AURELIS Cinematic Brand Film">
      <div className="brand-film-container" onClick={(e) => e.stopPropagation()}>
        <button className="film-close-btn" onClick={onClose} aria-label="Close brand film">
          <X size={20} />
        </button>

        <div className="film-viewport">
          <div className="film-ambient-glow" />
          <div className="film-screen">
            {/* Visual simulation of cinematic 4K salon footage */}
            <div className={`film-video-frame ${isPlaying ? 'playing' : 'paused'}`}>
              <img
                src="/images/hero-salon-new.jpg"
                alt="AURELIS Studio Ambience"
                className="film-video-poster"
              />
              <div className="film-grain-layer" />
              <div className="film-cinematic-bars">
                <span className="aspect-badge">2.39:1 CINEMASCOPE</span>
                <span className="resolution-badge">4K MASTER • 60 FPS</span>
              </div>
              <div className="film-overlay-text">
                <span className="film-scene-badge">SCENE 0{activeChapter + 1} — {chapters[activeChapter].title.toUpperCase()}</span>
                <h3 className="film-scene-title">{chapters[activeChapter].desc}</h3>
              </div>
            </div>

            <div className="film-controls-bar">
              <button
                className="film-play-toggle"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause film' : 'Play film'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              
              <div className="film-timeline">
                <div className="film-timeline-progress" style={{ width: `${(activeChapter + 1) * 25}%` }} />
              </div>

              <button
                className="film-restart-btn"
                onClick={() => setActiveChapter(0)}
                aria-label="Restart film"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="film-chapters-panel">
          <div className="film-chapters-header">
            <span className="film-kicker"><Sparkles size={14} /> CHAPTERS OF CRAFT</span>
            <h4>THE AURELIS RITUAL EXPERIENCE</h4>
          </div>
          <div className="film-chapters-list">
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                className={`film-chapter-item ${activeChapter === idx ? 'active' : ''}`}
                onClick={() => setActiveChapter(idx)}
              >
                <div className="chapter-meta">
                  <span className="chapter-num">0{idx + 1}</span>
                  <span className="chapter-time">{ch.time}</span>
                </div>
                <div className="chapter-info">
                  <h5>{ch.title}</h5>
                  <p>{ch.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="film-cta-bar">
            <button
              className="button button-gold-glow w-full"
              onClick={() => {
                onClose();
                onBookNow();
              }}
            >
              Step Into The Chair &bull; Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
