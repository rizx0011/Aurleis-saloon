import React, { useRef } from 'react';
import { Instagram, Star, Calendar, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface Stylist {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  bio: string;
  avatar: string;
  instagram: string;
  rating: string;
  clientsCount: string;
}

// PRD §6: Authentic male barbers only, with scissors/razors/barber setting evident, non-celebrity
const STYLISTS_DATA: Stylist[] = [
  {
    id: 'st1',
    name: 'Aman Sharma',
    role: 'Founder & Master Barber',
    experience: '14+ Years',
    specialty: 'Head Morphology Mapping & Damascus Straight Razor Shaves',
    bio: 'Pioneer of precision scissor geometry and straight-razor craftsmanship in Delhi NCR.',
    avatar: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    instagram: '@aman.aurelis',
    rating: '5.0',
    clientsCount: '4,200+',
  },
  {
    id: 'st2',
    name: 'Marcus Vance',
    role: 'Senior Precision Sculptor',
    experience: '9 Years',
    specialty: 'European Scissor Architecture & Bespoke Texture Crops',
    bio: 'Specialist in custom scissor balance, bone-structure mapping, and tailored gentleman cuts.',
    avatar: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    instagram: '@marcus.cuts',
    rating: '4.9',
    clientsCount: '2,800+',
  },
  {
    id: 'st3',
    name: 'Zubin Sethi',
    role: 'Beard Architect & Colorist',
    experience: '8 Years',
    specialty: 'Beard Symmetry Fades & Natural Grey Blending Glazes',
    bio: 'Master of organic botanical beard therapy and seamless low-contrast silver blending.',
    avatar: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
    instagram: '@zubin.aurelis',
    rating: '4.9',
    clientsCount: '3,100+',
  },
  {
    id: 'st4',
    name: 'Devraj Chauhan',
    role: 'Scalp & Skin Restoration Specialist',
    experience: '7 Years',
    specialty: 'Volcanic Cryo Facials & High-Frequency Scalp Therapies',
    bio: 'Certified aesthetician dedicated to executive restoration, hot towel rituals, and scalp wellness.',
    avatar: 'https://images.unsplash.com/photo-1517832606589-7929c392f566?auto=format&fit=crop&w=800&q=80',
    instagram: '@devraj.spa',
    rating: '5.0',
    clientsCount: '1,950+',
  },
];

interface StylistsShowcaseProps {
  onBookWithStylist: (stylistName: string) => void;
}

export const StylistsShowcase: React.FC<StylistsShowcaseProps> = ({ onBookWithStylist }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 360;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="section-compact stylists-carousel-section" id="stylists">
      <div className="wrap">
        <div className="services-section-header">
          <div>
            <span className="kicker">The Master Artisans</span>
            <h2 className="section-title-clean">Masters of the Blade</h2>
            <p className="section-lead-clean">
              Senior male barbers with decade-plus pedigrees in bespoke head morphology and straight-razor craftsmanship.
            </p>
          </div>

          <div className="carousel-nav-arrows">
            <button
              onClick={() => scrollCarousel('left')}
              className="carousel-arrow-btn"
              aria-label="Previous Stylist"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="carousel-arrow-btn"
              aria-label="Next Stylist"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Stylist Carousel */}
        <div className="stylists-horizontal-track" ref={carouselRef}>
          {STYLISTS_DATA.map((stylist) => (
            <div key={stylist.id} className="glass-panel stylist-carousel-card">
              <div className="stylist-portrait-box">
                <img src={stylist.avatar} alt={stylist.name} className="stylist-portrait-img" loading="lazy" />
                <div className="stylist-exp-pill">
                  <Award size={12} />
                  <span>{stylist.experience}</span>
                </div>
              </div>

              <div className="stylist-card-body">
                <div className="stylist-meta-row">
                  <div className="stylist-rating-badge">
                    <Star size={13} className="star-fill-gold" />
                    <span>{stylist.rating}</span>
                    <span className="rating-count">({stylist.clientsCount})</span>
                  </div>
                  <a
                    href={`https://instagram.com/${stylist.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="stylist-insta-link"
                    title="Instagram Profile"
                  >
                    <Instagram size={14} />
                    <span>{stylist.instagram}</span>
                  </a>
                </div>

                <h3 className="stylist-name-text">{stylist.name}</h3>
                <span className="stylist-role-text">{stylist.role}</span>
                <p className="stylist-bio-text">{stylist.bio}</p>

                <div className="stylist-spec-box">
                  <strong>Signature Forte:</strong>
                  <span>{stylist.specialty}</span>
                </div>

                <button
                  onClick={() => onBookWithStylist(stylist.name)}
                  className="btn-book-stylist-action"
                >
                  <Calendar size={14} />
                  <span>Reserve Chair with {stylist.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
