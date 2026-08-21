import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { MessageSquare, Phone, CalendarDays } from 'lucide-react';
import Lenis from 'lenis';

import { CustomCursor } from './components/CustomCursor';
import { CinematicHeader } from './components/CinematicHeader';
import { CinematicHero } from './components/CinematicHero';
import { BrandFilmModal } from './components/BrandFilmModal';
import { ParallaxStory } from './components/ParallaxStory';
import { ServicesMenu } from './components/ServicesMenu';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { BookingConcierge } from './components/BookingConcierge';
import { LocationMap } from './components/LocationMap';
import { ClosingCreditsFooter } from './components/ClosingCreditsFooter';

const queryClient = new QueryClient();

function AppContent() {
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [selectedStylist, setSelectedStylist] = useState<string | undefined>(undefined);

  // PRD §5: Slowed-down, deliberate cinematic smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.75,
      touchMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    scrollToBooking();
  };

  return (
    <div className="site-shell">
      {/* Trailing luxury ring cursor */}
      <CustomCursor />

      {/* Clean Glass Navigation (Essential 4 links, no Book button in header) */}
      <CinematicHeader onBookNow={scrollToBooking} />

      <main>
        {/* Scene 01: Hero Centerpiece */}
        <CinematicHero
          onBookNow={scrollToBooking}
          onOpenFilm={() => setIsFilmOpen(true)}
        />

        {/* Scene 02: Philosophy & The Rituals of Craft */}
        <ParallaxStory onBookNow={scrollToBooking} />

        {/* Scene 03: Horizontal Single-Screen Rituals Suite */}
        <ServicesMenu onSelectService={handleSelectService} />

        {/* Scene 04: Testimonials & Accolades */}
        <TestimonialsCarousel />

        {/* Scene 08: 4-Step Concierge Reservation Desk */}
        <BookingConcierge
          initialService={selectedService}
          initialStylist={selectedStylist}
          onResetInitial={() => {
            setSelectedService(undefined);
            setSelectedStylist(undefined);
          }}
        />

        {/* Scene 09: Studio Sanctuary & Contact */}
        <LocationMap />
      </main>

      {/* Scene 10: Closing Credits Contrast Footer */}
      <ClosingCreditsFooter />

      {/* Brand Film Modal Experience */}
      <BrandFilmModal
        isOpen={isFilmOpen}
        onClose={() => setIsFilmOpen(false)}
        onBookNow={scrollToBooking}
      />

      {/* Floating Quick Concierge Dock */}
      <div className="floating-quick-dock" aria-label="Quick Concierge Access">
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          className="dock-btn dock-whatsapp"
          aria-label="WhatsApp Concierge"
          title="Direct WhatsApp Concierge"
        >
          <MessageSquare size={19} />
        </a>
        <a
          href="tel:+919876543210"
          className="dock-btn"
          aria-label="Call Reception"
          title="Call Studio Sanctuary"
        >
          <Phone size={17} />
        </a>
        <button
          onClick={scrollToBooking}
          className="dock-btn"
          aria-label="Reserve Chair"
          title="Reserve Chair"
        >
          <CalendarDays size={17} />
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
