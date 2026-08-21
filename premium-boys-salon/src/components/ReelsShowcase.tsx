import React, { useState, useRef } from 'react';
import { Play, Eye, Sparkles, X, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Reel {
  id: string;
  title: string;
  author: string;
  views: string;
  thumbnail: string;
  videoUrl: string;
  tags: string[];
}

const REELS_DATA: Reel[] = [
  {
    id: 'r1',
    title: 'The Razor Honing & Damascus Shave',
    author: 'Aman Sharma',
    views: '124K views',
    thumbnail: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barber-trimming-a-mans-beard-with-a-machine-42861-large.mp4',
    tags: ['#RazorCraft', '#DamascusBlade', '#HotTowel'],
  },
  {
    id: 'r2',
    title: 'Skin Fade Gradient Architecture',
    author: 'Marcus Vance',
    views: '88K views',
    thumbnail: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hairstylist-cutting-a-mans-hair-in-a-salon-42859-large.mp4',
    tags: ['#TaperFade', '#VidalSassoon', '#PrecisionCut'],
  },
  {
    id: 'r3',
    title: 'Volcanic Cryo Facial & Jade Stone',
    author: 'Devraj Chauhan',
    views: '95K views',
    thumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-getting-his-hair-washed-at-a-salon-42860-large.mp4',
    tags: ['#CryoFacial', '#MenSpa', '#Restoration'],
  },
  {
    id: 'r4',
    title: 'Beard Symmetry & Argan Steam',
    author: 'Zubin Sethi',
    views: '110K views',
    thumbnail: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barber-styling-a-clients-beard-42862-large.mp4',
    tags: ['#BeardArchitect', '#HotSteam', '#OrganicOils'],
  },
];

export const ReelsShowcase: React.FC = () => {
  const [activeReel, setActiveReel] = useState<Reel | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 280;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="section-compact reels-carousel-section" id="reels">
      <div className="wrap">
        <div className="services-section-header">
          <div>
            <span className="kicker">Cinematic Shorts</span>
            <h2 className="section-title-clean">Studio in Motion</h2>
            <p className="section-lead-clean">
              Macro close-ups and transformation reels captured in 4K resolution directly on our studio floor.
            </p>
          </div>

          <div className="carousel-nav-arrows">
            <button
              onClick={() => scrollCarousel('left')}
              className="carousel-arrow-btn"
              aria-label="Previous Reel"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="carousel-arrow-btn"
              aria-label="Next Reel"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Reels Track */}
        <div className="reels-horizontal-track" ref={carouselRef}>
          {REELS_DATA.map((reel) => (
            <div
              key={reel.id}
              className="reel-card-item glass-panel"
              onClick={() => setActiveReel(reel)}
            >
              <img src={reel.thumbnail} alt={reel.title} className="reel-thumb-img" loading="lazy" />
              <div className="reel-card-gradient" />

              <div className="reel-views-badge">
                <Eye size={12} />
                <span>{reel.views}</span>
              </div>

              <div className="reel-play-btn-pulse">
                <Play size={20} fill="#FFFFFF" color="#FFFFFF" />
              </div>

              <div className="reel-info-box">
                <span className="reel-author-tag">{reel.author}</span>
                <h4 className="reel-title-text">{reel.title}</h4>
                <div className="reel-tags-row">
                  {reel.tags.map((t, i) => (
                    <span key={i}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reel Modal Viewer */}
      {activeReel && (
        <div className="reel-modal-backdrop" onClick={() => setActiveReel(null)}>
          <div className="reel-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveReel(null)}
              className="reel-modal-close-btn"
              aria-label="Close reel modal"
            >
              <X size={20} />
            </button>

            <div className="reel-video-wrapper">
              <video
                src={activeReel.videoUrl}
                autoPlay
                loop
                playsInline
                className="reel-video-element"
              />
              <div className="reel-sound-badge">
                <Volume2 size={14} />
                <span>Studio Audio</span>
              </div>
            </div>

            <div className="reel-modal-info">
              <div className="reel-modal-meta">
                <Sparkles size={14} className="sparkle-icon-rose" />
                <span>{activeReel.author} • Master Cut</span>
              </div>
              <h3>{activeReel.title}</h3>
              <div className="reel-tags-modal">
                {activeReel.tags.map((t, i) => (
                  <span key={i} className="reel-tag-chip">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
