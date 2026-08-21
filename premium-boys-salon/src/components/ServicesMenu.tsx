import React, { useState, useRef } from 'react';
import { Sparkles, Clock, Check, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  category: 'hair' | 'beard' | 'spa' | 'packages';
  name: string;
  duration: string;
  price: string;
  description: string;
  features: string[];
  tag?: string;
  image: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 's1',
    category: 'hair',
    name: 'Aurelis Signature Architecture Cut',
    duration: '50 Min',
    price: '₹1,800',
    description: 'Precision shear & clipper sculpting customized to your head profile, followed by cold eucalyptus scalp rinse.',
    features: ['Morphology Consultation', 'Cold Eucalyptus Rinse', 'Bespoke Matte Styling'],
    tag: 'Flagship Signature',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's2',
    category: 'hair',
    name: 'Executive Fade & Textured Crop',
    duration: '45 Min',
    price: '₹1,500',
    description: 'Zero/skin taper fade with razor-honed neckline detailing, styled with Japanese sea-salt spray.',
    features: ['Laser-Grade Detailing', 'Organic Sea Salt Mist', 'Neck Shave with Hot Towel'],
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's3',
    category: 'beard',
    name: 'Royal Damascus Hot Towel Shave',
    duration: '40 Min',
    price: '₹1,400',
    description: 'Triple-steamed towel preparation, badger brush lather, hand-stropped straight razor glide, and ice-cold rosewater tonic.',
    features: ['Triple Hot Towels', 'Pre-Shave Sandalwood Oil', 'Ice Rosewater Seal'],
    tag: 'Ritual',
    image: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's4',
    category: 'beard',
    name: 'Architectural Beard Sculpt & Contour',
    duration: '35 Min',
    price: '₹1,200',
    description: 'Geometric beard shaping calibrated to jawline symmetry, gradient fading, and hot argan oil conditioning.',
    features: ['Jawline Symmetry Mapping', 'Argan Steam Therapy', 'Precision Razor Bounds'],
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's5',
    category: 'spa',
    name: 'Volcanic Charcoal & Ice Cryo-Facial',
    duration: '60 Min',
    price: '₹2,600',
    description: 'Deep ultrasonic pore extraction, activated volcanic mud masque, and chilled jade stone lymphatic drainage massage.',
    features: ['Ultrasonic Extraction', 'Jade Cryo-Sculpting', 'Antioxidant Vitamin Serum'],
    tag: 'Restorative',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's6',
    category: 'spa',
    name: 'Deep Scalp Detox & High-Frequency Therapy',
    duration: '45 Min',
    price: '₹2,200',
    description: 'Peppermint micro-scrub exfoliation, invigorating scalp massage, and high-frequency ozone follicle stimulation.',
    features: ['Peppermint Scalp Scrub', 'Ozone Follicle Revival', '15-Min Acupressure'],
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's7',
    category: 'packages',
    name: 'The Emperor’s Complete Grooming Suite',
    duration: '120 Min',
    price: '₹4,800',
    description: 'Our pinnacle luxury sequence: Signature Haircut + Royal Beard Sculpt + Volcanic Cryo Facial + Single Malt Lounge pairing.',
    features: ['All-Inclusive Experience', 'Complimentary Single-Malt', 'Private VIP Suite'],
    tag: 'Ultimate Luxury',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80',
  },
];

interface ServicesMenuProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesMenu: React.FC<ServicesMenuProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'hair' | 'beard' | 'spa' | 'packages'>('all');
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredServices = activeTab === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeTab);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 380;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="section-compact services-carousel-section" id="services">
      <div className="wrap">
        {/* Header with Navigation Controls in one row */}
        <div className="services-section-header">
          <div>
            <span className="kicker">Curated Grooming Menu</span>
            <h2 className="section-title-clean">The Rituals of Craft</h2>
            <p className="section-lead-clean">
              Horizontal single-screen suite. Slide through our bespoke haircut, beard styling, and restoration rituals.
            </p>
          </div>

          <div className="carousel-nav-arrows">
            <button
              onClick={() => scrollCarousel('left')}
              className="carousel-arrow-btn"
              aria-label="Previous service"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="carousel-arrow-btn"
              aria-label="Next service"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="services-filter-pills">
          {[
            { id: 'all', label: 'All Rituals' },
            { id: 'hair', label: 'Signature Hair' },
            { id: 'beard', label: 'Beard & Shave' },
            { id: 'spa', label: 'Skin & Spa' },
            { id: 'packages', label: 'Royal Packages' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`filter-pill-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Horizontal Carousel Track */}
        <div className="services-horizontal-track" ref={carouselRef}>
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              className="glass-panel service-carousel-card"
              style={{
                transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
                transformStyle: 'preserve-3d'
              }}
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const multiplier = 12;
                const xRotate = multiplier * ((y - rect.height / 2) / rect.height);
                const yRotate = -multiplier * ((x - rect.width / 2) / rect.width);
                el.style.transform = `perspective(1000px) rotateX(${xRotate}deg) rotateY(${yRotate}deg) scale3d(1.02, 1.02, 1.02)`;
                el.style.boxShadow = `${-yRotate}px ${xRotate}px 30px rgba(201, 162, 39, 0.15)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                el.style.boxShadow = '';
              }}
            >
              <div className="card-img-wrap">
                <img src={service.image} alt={service.name} className="service-card-img" loading="lazy" style={{ transform: 'translateZ(20px)' }} />
                {service.tag && (
                  <span className="service-tag-badge" style={{ transform: 'translateZ(30px)' }}>
                    <Sparkles size={11} />
                    {service.tag}
                  </span>
                )}
                <span className="service-duration-chip" style={{ transform: 'translateZ(30px)' }}>
                  <Clock size={12} />
                  {service.duration}
                </span>
              </div>

              <div className="service-card-body" style={{ transform: 'translateZ(15px)' }}>
                <div className="service-price-header">
                  <h3 className="service-item-title">{service.name}</h3>
                  <span className="service-item-price">{service.price}</span>
                </div>

                <p className="service-item-desc">{service.description}</p>

                <ul className="service-feature-checklist">
                  {service.features.map((feat, i) => (
                    <li key={i}>
                      <Check size={14} className="check-icon-rose" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelectService(service.name)}
                  className="btn-book-service-micro"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  <span>Book This Ritual</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
