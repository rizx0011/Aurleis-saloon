import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  Scissors,
  Sparkles,
  Sun,
  UserRound,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';

type Service = { id: string; name: string; description: string; price: number; duration: string };
type GalleryImage = { src: string; label: string; alt: string };

const queryClient = new QueryClient();

const services: Service[] = [
  { id: 'signature-cut', name: 'Signature Haircut', description: 'A tailored cut, finished with a hot towel and signature styling.', price: 499, duration: '45 min' },
  { id: 'classic-cut', name: 'Classic Haircut', description: 'Clean lines, considered shape, and a finish that lasts all week.', price: 299, duration: '30 min' },
  { id: 'fade-sculpt', name: 'Fade Sculpt', description: 'A seamless skin, low, mid or high fade built around your features.', price: 499, duration: '45 min' },
  { id: 'beard-ritual', name: 'Beard Ritual', description: 'Precision shaping, warm steam, straight razor and a cooling finish.', price: 349, duration: '35 min' },
  { id: 'haircut-beard', name: 'Haircut + Beard', description: 'The complete AURELIS reset. Hair, beard, hot towel and styling.', price: 699, duration: '65 min' },
  { id: 'royal-shave', name: 'Royal Shave', description: 'An old-school close shave, reimagined with modern restraint.', price: 399, duration: '40 min' },
  { id: 'kids-cut', name: 'Young Gentleman', description: 'Patient, polished haircuts for boys with a little character.', price: 299, duration: '30 min' },
  { id: 'colour-style', name: 'Colour + Style', description: 'Natural-looking colour work paired with a bespoke cut and finish.', price: 899, duration: '90 min' },
];


const galleryImages: GalleryImage[] = [
  { src: '/images/gallery-cut.jpg', label: 'The textured crop', alt: 'Textured crop haircut in warm barbershop light' },
  { src: '/images/gallery-interior.jpeg', label: 'The studio', alt: 'AURELIS barbershop interior with brass mirrors and walnut' },
  { src: '/images/gallery-beard.jpg', label: 'The beard ritual', alt: 'Barber shaping a beard with a straight razor' },
  { src: '/images/gallery-barber.jpg', label: 'The craft', alt: 'Barber working under a brass task lamp' },
  { src: '/images/gallery-grooming.jpg', label: 'The details', alt: 'Premium grooming tools on walnut counter' },
  { src: '/images/gallery-side.jpg', label: 'The slick back', alt: 'Man with slick back haircut in the studio' },
  { src: '/images/gallery-cut.jpg', label: 'The finish', alt: 'Close portrait of a precise haircut' },
];

const reviews = [
  { quote: 'The kind of place where they remember your name, your cut and exactly how you like your coffee. The detail is extraordinary.', name: 'Rishabh Malhotra', detail: 'Signature cut · Andheri West' },
  { quote: 'Finally found a barber who understands texture. I walked out looking like myself, just sharper. AURELIS is now a ritual.', name: 'Arjun Mehta', detail: 'Fade sculpt · Bandra' },
  { quote: 'My son actually asks to go to the barber now. Warm team, beautiful studio, and the haircut is always spot on.', name: 'Niharika Shah', detail: 'Young gentleman · Powai' },
];

const team = [
  { name: 'Aman Sharma', role: 'Founder · Master Barber', image: '/images/team-aman.jpg' },
  { name: 'Vikram Singh', role: 'Senior Stylist · Fade Specialist', image: '/images/team-vikram.jpg' },
  { name: 'Rohan Mehta', role: 'Barber · Texture & Beard', image: '/images/team-rohan.jpg' },
];

function scrollToBooking() {
  document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
}

function AppContent() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('aurelis-theme') === 'dark');
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [bookingSent, setBookingSent] = useState(false);
  const [formError, setFormError] = useState('');
  const [beforePosition, setBeforePosition] = useState(50);
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', time: '', note: '' });
  const revealObserver = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('aurelis-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    revealObserver.current = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.current?.observe(element));
    return () => {
      window.removeEventListener('scroll', onScroll);
      revealObserver.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const updateForm = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const book = (service?: string) => {
    if (service) updateForm('service', service);
    scrollToBooking();
  };
  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || form.phone.trim().length < 8 || !form.service || !form.date || !form.time) {
      setFormError('Please add your name, a valid phone number, service, date and time.');
      return;
    }
    setFormError('');
    setBookingSent(true);
  };

  return (
    <div className="site-shell grain">
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a className="brand" href="#home" data-testid="link-brand">AURELIS<small>MEN'S GROOMING STUDIO</small></a>
          <div className="nav-actions">
            <button className="icon-button" onClick={() => setDark(!dark)} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} data-testid="button-theme">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button className="button button-accent" onClick={() => book()} data-testid="button-nav-book">Book a chair <ArrowUpRight size={14} /></button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-bg" />
          <div className="wrap hero-container">
            <div className="hero-content">
              <div className="hero-kicker eyebrow">A modern grooming studio · Mumbai</div>
              <h1>YOUR STYLE.<br /><em>YOUR</em> STATEMENT.</h1>
              <p className="hero-support">Premium grooming and modern haircuts for men and boys who know that the details do the talking.</p>
              <div className="hero-actions">
                <button className="button button-accent" onClick={() => book()} data-testid="button-hero-book">Book your appointment <ArrowUpRight size={14} /></button>
                <a className="button button-light" href="#services" data-testid="link-hero-services">Explore services</a>
              </div>
            </div>
            <div className="hero-meta">
              <div className="hero-stat"><strong>5+</strong><span>Years experience</span></div>
              <div className="hero-stat"><strong>10K+</strong><span>Happy clients</span></div>
              <div className="hero-stat"><strong>15+</strong><span>Professional services</span></div>
            </div>
          </div>
          <div className="scroll-cue">Scroll to explore</div>
        </section>

        <section id="about" className="section-pad">
          <div className="wrap about-grid">
            <div className="about-visual reveal">
              <img className="about-card-image" src="/images/gallery-interior.jpeg" alt="The AURELIS barbershop studio" />
              <div className="about-lines">AURELIS · EST. 2021 · MUMBAI</div>
              <div className="about-orbit"><small>Our standard</small><span>01</span></div>
            </div>
            <div className="about-copy reveal">
              <div className="eyebrow">01 / The studio</div>
              <h2 className="section-title">MORE THAN<br />A HAIRCUT.</h2>
              <p className="section-copy">AURELIS is a place to pause, reset and leave a little sharper than you arrived. Every chair is a conversation, every cut is considered, and every finish is built around you.</p>
              <p className="section-copy">From a first school haircut to the style you wear for your next big move, our barbers bring craft, calm and a point of view to the ritual.</p>
              <div className="signature">Aman Sharma</div>
              <div className="eyebrow">Founder · AURELIS</div>
            </div>
          </div>
        </section>

        <section id="services" className="dark-band section-pad">
          <div className="wrap">
            <div className="services-head reveal">
              <div><div className="eyebrow">02 / The menu</div><h2 className="section-title">THE RIGHT<br />KIND OF <i>EXTRA.</i></h2></div>
              <p className="section-copy">No rushed appointments. No one-size-fits-all finishes. Choose your ritual and we’ll take care of the rest.</p>
            </div>
            <div className="services-grid">
              {services.map((service, index) => <article className="service-card reveal" key={service.id}>
                <span className="service-index">0{index + 1}</span>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-bottom"><span className="service-price">₹{service.price}</span><button className="service-book" onClick={() => book(service.name)} data-testid={`button-service-${service.id}`}>Book · {service.duration}</button></div>
              </article>)}
            </div>
          </div>
        </section>



        <section className="split-feature">
          <div className="split-image" role="img" aria-label="AURELIS barber at work" />
          <div className="split-copy reveal"><div className="eyebrow">04 / The difference</div><h2 className="section-title">THE TRANSFORMATION SPEAKS FOR ITSELF.</h2><p className="section-copy">It’s in the way a clean neckline changes your posture. In the extra minute spent on the blend. In the mirror moment before you step back into the world.</p><div className="feature-list"><div className="feature-row"><Sparkles size={16} /><span>Consultation before every cut</span></div><div className="feature-row"><Scissors size={16} /><span>Barbers who know the craft</span></div><div className="feature-row"><Clock3 size={16} /><span>Time held for the details</span></div><div className="feature-row"><UserRound size={16} /><span>Grooming for every generation</span></div></div></div>
        </section>

        <section id="pricing" className="pricing-section section-pad">
          <div className="wrap">
            <div className="pricing-head reveal"><div className="eyebrow">05 / The plans</div><h2 className="section-title">KEEP IT<br /><i>SHARP.</i></h2><p className="section-copy">Straightforward pricing. Premium service. Pick the rhythm that fits your week.</p></div>
            <div className="pricing-grid">
              {[
                { name: 'Essential', price: 299, description: 'For the clean, considered reset.', items: ['Classic haircut', 'Consultation', 'Finish & styling'] },
                { name: 'Premium', price: 499, description: 'Our signature AURELIS experience.', items: ['Signature haircut', 'Hot towel ritual', 'Beard line-up', 'Premium styling'], featured: true },
                { name: 'The Full Works', price: 799, description: 'For the days that call for more.', items: ['Haircut + beard ritual', 'Hot towel shave', 'Scalp massage', 'Finishing product'] },
              ].map((plan) => <article className={`price-card reveal ${plan.featured ? 'featured' : ''}`} key={plan.name}>{plan.featured && <span className="price-badge">Most chosen</span>}<h3>{plan.name}</h3><div className="price">₹{plan.price}<small> / visit</small></div><p>{plan.description}</p><ul>{plan.items.map((item) => <li key={item}>{item}</li>)}</ul><button className={`button ${plan.featured ? 'button-accent' : 'button-light'}`} onClick={() => book(plan.name === 'Essential' ? 'Classic Haircut' : plan.name === 'Premium' ? 'Signature Haircut' : 'Haircut + Beard')} data-testid={`button-pricing-${plan.name.toLowerCase().replaceAll(' ', '-')}`}>Choose this ritual <ArrowUpRight size={14} /></button></article>)}
            </div>
          </div>
        </section>

        <section id="gallery" className="section-pad">
          <div className="wrap">
            <div className="gallery-head reveal"><div><div className="eyebrow">06 / In the chair</div><h2 className="section-title">A LOOK<br /><i>INSIDE.</i></h2></div><p className="section-copy">A glimpse of the cuts, craft and quiet details that make a visit feel like yours.</p></div>
            <div className="gallery-grid">
              {galleryImages.map((image, index) => <button className="gallery-item reveal" key={`${image.label}-${index}`} onClick={() => setLightbox(image)} onKeyDown={(event) => event.key === 'Enter' && setLightbox(image)} aria-label={`Open ${image.label} image`} data-testid={`button-gallery-${index}`}><img src={image.src} alt={image.alt} /><span className="gallery-caption">{image.label}</span></button>)}
            </div>
          </div>
        </section>

        <BeforeAfter beforePosition={beforePosition} setBeforePosition={setBeforePosition} />

        <section id="reviews" className="reviews-section section-pad">
          <div className="wrap review-wrap reveal"><div className="eyebrow">07 / Kind words</div><div className="quote-mark">“</div><blockquote className="review-quote">{reviews[reviewIndex].quote}</blockquote><div className="review-author">{reviews[reviewIndex].name} · {reviews[reviewIndex].detail}</div><div className="review-controls"><button className="icon-button" onClick={() => setReviewIndex((reviewIndex - 1 + reviews.length) % reviews.length)} aria-label="Previous review" data-testid="button-review-previous"><ChevronLeft size={17} /></button><span className="mono" style={{ fontSize: 9, alignSelf: 'center' }}>0{reviewIndex + 1} / 0{reviews.length}</span><button className="icon-button" onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)} aria-label="Next review" data-testid="button-review-next"><ChevronRight size={17} /></button></div></div>
        </section>

        <section id="team" className="section-pad">
          <div className="wrap"><div className="team-head reveal"><div><div className="eyebrow">08 / The hands</div><h2 className="section-title">MEET THE<br /><i>MAKERS.</i></h2></div><p className="section-copy">Three distinct points of view. One shared standard: you leave feeling like the best version of yourself.</p></div><div className="team-grid">{team.map((member, index) => <article className="team-card reveal" key={member.name}><img className="team-photo" src={member.image} alt={`${member.name}, ${member.role}`} /><div className="team-info"><div><h3>{member.name}</h3><p>{member.role}</p></div><span className="eyebrow">0{index + 1}</span></div></article>)}</div></div>
        </section>

        <section id="booking" className="booking-section section-pad">
          <div className="wrap booking-grid">
            <div className="booking-aside reveal"><div className="eyebrow">09 / Your chair awaits</div><h2 className="section-title">MAKE IT<br /><i>YOURS.</i></h2><p className="section-copy">Tell us when you’d like to come in. We’ll confirm your appointment personally, usually within a few minutes.</p><div className="contact-stack"><a className="contact-line" href="tel:+919876543210" data-testid="link-booking-phone"><Phone size={15} /><span>+91 98765 43210</span></a><a className="contact-line" href="https://wa.me/919876543210" target="_blank" rel="noreferrer" data-testid="link-booking-whatsapp"><MessageCircle size={15} /><span>Prefer WhatsApp? Message us directly.</span></a><div className="contact-line"><Clock3 size={15} /><span>Open daily · 10:00 AM – 9:00 PM</span></div></div></div>
            <div className="booking-form reveal">
              {bookingSent ? <div className="success-panel"><Check size={38} /><h3>You’re on the list.</h3><p>Thank you, {form.name.split(' ')[0] || 'there'}. We’ve received your request for {form.date}. AURELIS will call you shortly to confirm your chair.</p><button className="button button-dark" onClick={() => { setBookingSent(false); setForm({ name: '', phone: '', service: '', date: '', time: '', note: '' }); }} data-testid="button-booking-new">Make another booking</button></div> : <form onSubmit={submitBooking} noValidate><div className="form-row"><Field label="Your name" value={form.name} onChange={(value) => updateForm('name', value)} placeholder="Aarav Mehta" id="booking-name" /><Field label="Phone number" value={form.phone} onChange={(value) => updateForm('phone', value)} placeholder="+91 98765 43210" id="booking-phone" type="tel" /></div><div className="form-row"><div className="field"><label htmlFor="booking-service">Choose your service</label><select id="booking-service" value={form.service} onChange={(event) => updateForm('service', event.target.value)} data-testid="select-booking-service"><option value="">Select a service</option>{services.map((service) => <option value={service.name} key={service.id}>{service.name} · ₹{service.price}</option>)}</select></div><Field label="Preferred date" value={form.date} onChange={(value) => updateForm('date', value)} id="booking-date" type="date" /></div><div className="form-row"><div className="field"><label htmlFor="booking-time">Preferred time</label><select id="booking-time" value={form.time} onChange={(event) => updateForm('time', event.target.value)} data-testid="select-booking-time"><option value="">Choose a time</option>{['10:00 AM', '11:30 AM', '1:00 PM', '3:30 PM', '5:00 PM', '7:30 PM'].map((time) => <option value={time} key={time}>{time}</option>)}</select></div><div className="field"><label htmlFor="booking-note">Anything we should know?</label><input id="booking-note" value={form.note} onChange={(event) => updateForm('note', event.target.value)} placeholder="Your usual fade, perhaps" data-testid="input-booking-note" /></div></div>{formError && <span className="field-error" role="alert" data-testid="status-booking-error">{formError}</span>}<div className="form-footer"><span className="form-note">We respect your time. No spam, ever.<br />Or message us on WhatsApp to book instantly.</span><button className="button button-dark" type="submit" data-testid="button-submit-booking">Request appointment <CalendarDays size={15} /></button></div></form>}
            </div>
          </div>
        </section>

        <section id="location" className="location-section section-pad">
          <div className="wrap location-grid"><div className="reveal"><div className="eyebrow">10 / Come find us</div><h2 className="section-title">TAKE A<br /><i>SEAT.</i></h2><p className="section-copy">A little off the main road. A lot worth the visit. Find us in the heart of Andheri West, Mumbai.</p><div className="hours">{['Monday – Friday', 'Saturday', 'Sunday'].map((day) => <div className="hours-row" key={day}><span>{day}</span><span>10:00 AM – 9:00 PM</span></div>)}</div><a className="button button-accent" style={{ marginTop: 28 }} href="https://maps.google.com/?q=Andheri+West+Mumbai" target="_blank" rel="noreferrer" data-testid="link-get-directions">Get directions <ArrowUpRight size={14} /></a></div><div className="map-art reveal"><div className="map-pin"><MapPin size={20} /></div><div className="map-label">AURELIS · 14A Veera Desai Road · Andheri West</div></div></div>
        </section>
      </main>

      <footer id="contact" className="footer" style={{ textAlign: 'center', padding: '40px 0' }}>
        <div className="wrap">
          <div className="copyright" style={{ fontSize: '11px', opacity: 0.8, letterSpacing: '0.05em' }}>
            © 2026 Sumit Kumar • All Rights Reserved
          </div>
        </div>
      </footer>
      <div className="floating-tools" aria-label="Quick actions"><a className="float-button" href="https://wa.me/919876543210" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" data-testid="link-floating-whatsapp"><MessageCircle size={18} /></a><a className="float-button" href="tel:+919876543210" aria-label="Call AURELIS" data-testid="link-floating-call"><Phone size={17} /></a><button className="float-button" onClick={() => book()} aria-label="Book an appointment" data-testid="button-floating-book"><CalendarDays size={17} /></button></div>
      {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.label} onClick={() => setLightbox(null)}><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image" data-testid="button-lightbox-close"><X size={25} /></button><img src={lightbox.src} alt={lightbox.alt} onClick={(event) => event.stopPropagation()} /><div className="lightbox-caption">{lightbox.label}</div></div>}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, id, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; id: string; type?: string }) {
  return <div className="field"><label htmlFor={id}>{label}</label><input id={id} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} data-testid={`input-${id}`} /></div>;
}

function BeforeAfter({ beforePosition, setBeforePosition }: { beforePosition: number; setBeforePosition: (value: number) => void }) {
  return <section className="section-pad" style={{ background: 'hsl(var(--background))' }}><div className="wrap reveal"><div className="eyebrow">05 / The proof</div><div style={{ display: 'flex', justifyContent: 'space-between', gap: 25, alignItems: 'end', marginBottom: 35 }}><h2 className="section-title" style={{ marginBottom: 0 }}>BEFORE.<br /><i>AFTER.</i></h2><p className="section-copy">Drag the line. See the difference a considered cut can make.</p></div><div className="comparison"><img src="/images/gallery-side.jpg" alt="After transformation: slick back haircut and beard" /><div className="comparison-before" style={{ width: `${beforePosition}%` }}><img src="/images/gallery-cut.jpg" alt="Before transformation: haircut before styling" /></div><div className="comparison-line" style={{ left: `${beforePosition}%` }}><span>↔</span></div><input className="comparison-range" type="range" min="0" max="100" value={beforePosition} onChange={(event) => setBeforePosition(Number(event.target.value))} aria-label="Drag to compare before and after" data-testid="input-before-after" /></div></div></section>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><AppContent /></TooltipProvider></QueryClientProvider>;
}

export default App;