# Product Requirements Document (PRD)
## Luxury Saloon Website Redesign — Cinematic Experience

**Version:** 1.0
**Status:** Draft for Review
**Owner:** Product / Design Team
**Last Updated:** August 20, 2026

---

## 1. Overview

### 1.1 Purpose
Redesign the saloon (salon) website into a premium, cinematic, story-driven digital experience. The site should feel less like a booking form and more like a short film — rich motion, elegant typography, deep imagery, and buttery-smooth scroll storytelling — while still converting visitors into bookings.

### 1.2 Vision Statement
"A website that feels like walking into the saloon itself — dim lights rising, mirrors catching motion, every scroll revealing the next scene."

### 1.3 Goals
- Deliver a visually stunning, cinematic-grade website that reflects a premium salon brand.
- Increase appointment bookings and inquiry conversions.
- Improve brand perception (luxury, trust, craftsmanship).
- Ensure fast load times despite heavy animation/visual content.
- Fully responsive across desktop, tablet, and mobile.

### 1.4 Non-Goals
- Building a full backend booking/CRM system (assume integration with existing/third-party booking tool, e.g., Calendly, Fresha, Booksy).
- E-commerce/product store (unless explicitly requested in future phase).

---

## 2. Target Audience

| Persona | Description | Needs |
|---|---|---|
| The Bride/Event Client | Booking for a special occasion | Portfolio, trust signals, easy booking |
| The Regular Client | Repeat haircuts/grooming/styling | Fast booking, service list, pricing |
| The Luxury Seeker | Wants a premium experience | Atmosphere, storytelling, staff credibility |
| Mobile-First Browser | Discovers via Instagram/Google | Fast load, thumb-friendly nav, tap-to-call/book |

---

## 3. Brand & Art Direction

### 3.1 Visual Tone — REVISED: Clean White + 3D Premium Theme
Per stakeholder feedback, the original dark/gold theme has been replaced with a **bright, minimal, white-based palette** — softer, more modern, more "premium spa/studio" than "moody nightclub." 3D elements now carry the cinematic feel instead of dark lighting.

- **Mood:** Clean, airy, high-end studio feel — think Apple.com or a modern spa brand. Light-filled, spacious, soft shadows instead of heavy black.
- **Typography:** Elegant serif for headlines (still premium/editorial) + clean modern sans-serif for body — but now set in dark text on white/light backgrounds instead of light-on-dark.

- **New Color Palette (White-based):**
  - Primary Background: Pure/Off White `#FAFAF8`
  - Secondary Background: Soft Warm Grey `#F1EFEA`
  - Primary Text: Deep Charcoal `#1A1A1A` (not pure black — softer)
  - Accent 1 (brand color): Rose Gold / Blush `#D9A9A0` — used sparingly for CTAs, highlights, icons
  - Accent 2 (depth/luxury): Muted Sage or Champagne Gold `#C9A66B` at low opacity — for 3D object tints, hover glows
  - Dividers/Borders: Light Grey `#E4E1DA`
  - Dark Section (used sparingly, e.g. footer or one contrast band): Deep Charcoal `#1A1A1A` with white text — for visual rhythm/breathing room only, not the whole site

- **Imagery Style:** Bright, soft-lit studio photography (natural light look, not moody/dark), clean backgrounds, and **3D rendered elements** (glass/frosted shapes, floating objects, abstract blobs) replacing heavy video-loop backgrounds in places — lighter to load, more "premium tech" feel.

### 3.2 3D Design Language (New)
This is now a core visual pillar, not just a video background.

- **3D hero object:** One signature 3D centerpiece per key section (e.g., a floating glass/frosted sphere, an abstract ribbon/hair-strand shape, a stylized 3D comb/scissors) rendered in Three.js/WebGL — soft rose-gold and champagne tones, subtle rotation, reacts to mouse movement (parallax tilt).
- **Depth over darkness:** Instead of "cinematic = dark," cinematic here = **depth, light refraction, soft shadows, glassmorphism cards** (frosted-glass panels floating over the white background).
- **Micro 3D accents:** Small floating 3D icons (scissors, comb, leaf, mirror) with gentle idle animation (float up/down loop) sprinkled near section headings.
- **Keep it light:** 3D assets must stay low-poly / optimized GLB models (not heavy cinematic video) so the site stays fast — 3D replaces heaviness, it doesn't add more.

### 3.3 Motion Language
- Motion should feel smooth, fluid, and effortless — like liquid glass moving, not slow "movie fade" darkness anymore.
- Easing: soft cubic-bezier ease-out for most transitions — snappier than the old cinematic-drift, but never abrupt.
- **Buttery-smooth scrolling is mandatory** (see Section 6.1) — this was flagged as a key gap in the previous draft.
- Scroll-triggered reveals, gentle parallax on 3D objects, soft crossfades between sections.
- Cursor-aware micro-interactions on desktop (magnetic buttons, 3D object tilt-follow, hover glows in rose-gold).

---

## 4. Site Structure / Sitemap

1. Home (Cinematic Landing)
2. About / Our Story
3. Services & Pricing
4. Stylists / Team
5. Gallery / Portfolio (Before-After, Reels)
6. Testimonials / Reviews
7. Booking / Appointment
8. Contact / Location
9. Blog / Journal (optional, for SEO)

---

## 5. Page-by-Page & Section Requirements

### 5.1 Header (Navigation)
**Goal:** Elegant, minimal, always accessible without breaking immersion.

- Transparent/glass-blur header over hero video, transitions to solid dark background on scroll (smooth 300–400ms fade).
- Logo center OR left-aligned (brand choice) with subtle glow/gold shimmer on load.
- Navigation links: Home | About | Services | Gallery | Stylists | Contact.
- Sticky "Book Now" CTA button — gold-filled, magnetic hover effect, always visible.
- Hamburger menu on mobile opens as full-screen cinematic overlay (staggered text-reveal animation for each link).
- Optional: subtle animated underline/gold line sweep on nav hover.
- Scroll progress indicator (thin gold line at top, fills as user scrolls) — optional premium touch.

### 5.2 Hero Section (Home)
- Full-viewport looping cinematic video or high-quality animated sequence (salon ambience: scissors, mirror reflections, hands styling hair, golden light rays).
- Headline with animated text reveal (letters/words fade + rise in staggered sequence).
- Subheadline + CTA ("Book Your Transformation").
- Subtle Ken Burns zoom effect on background if video unavailable, using still imagery.
- Scroll-down indicator (animated mouse icon or arrow with looping bounce).

### 5.3 About / Our Story
- Split-screen scroll storytelling: image pins in place while text scrolls alongside (parallax storytelling section).
- Founder/brand story with fade-in-up text blocks triggered on scroll.
- Optional short cinematic video snippet (15–30s) embedded, autoplay muted with sound-on toggle.

### 5.4 Services & Pricing — REVISED: Horizontal Scroll Carousel (not a long vertical list)
**Problem fixed:** The service/rate list was previously a tall vertical block that added several extra scrolls to the page. It is now a **horizontal-scrolling carousel row** contained within one screen height.

- Single-screen-height section: heading + one row of service cards that scroll **sideways** (drag, swipe, or scroll-wheel horizontal) instead of stacking vertically.
- Filter/tab navigation (Hair | Skin | Nails | Men | Women) above the carousel — switching tabs cross-fades the carousel content, doesn't add page length.
- Each card: glassmorphism frosted panel, price, short description, "Book This Service" micro-CTA, image zoom-on-hover, rose-gold border glow on hover.
- Small dot/progress indicator under the carousel shows position (like a slider), plus subtle arrow controls for desktop.
- Result: full service/pricing list is accessible without adding a single extra full-page scroll.

### 5.5 Stylists / Team — Horizontal Carousel
- Same horizontal-scroll carousel pattern as Services — one screen-height section, team cards scroll sideways.
- Full-bleed portrait cards with grayscale-to-color hover transition; name, specialty, Instagram link fade in from bottom on hover/tap.
- Keeps the team section from adding extra vertical scroll length regardless of how many stylists are added later.

### 5.6 Gallery / Portfolio — Horizontal Carousel + Lightbox
**Problem fixed:** Photo grids were previously taking excessive vertical space. Now contained to one section height.

- Horizontal-scrolling image carousel (not a tall masonry grid) — click any image to open a full-screen lightbox for closer viewing.
- Before/After slider component (draggable divider reveal) — flagship visual feature, shown as the first "slide" in the carousel.
- Video reels shown as a secondary horizontal carousel row (auto-loop short clips), not a stacked grid.
- Smooth lazy-load with blur-up image loading (no jarring pop-in) as the carousel scrolls.

### 5.7 Testimonials
- Cinematic quote carousel — large serif typography, soft crossfade between testimonials.
- Optional client photo/video testimonial cards.
- Star rating with subtle gold shimmer animation on load.

### 5.8 Booking Section
- Prominent, distraction-free booking module (embedded booking widget or custom form).
- Step-based animated form (Service → Stylist → Date/Time → Confirm) with progress bar transitions.
- Confirmation screen with celebratory micro-animation (gold confetti/particle burst, subtle).

### 5.9 Contact / Location
- Embedded stylized map (custom-themed dark map matching brand palette).
- Address, phone (tap-to-call), hours, social icons with hover glow.
- Contact form with floating label inputs and animated focus states.

### 5.10 Footer
**Goal:** Feel like the closing credits of the film — elegant, complete, not an afterthought.

- Dark background matching header, subtle top border (thin gold line).
- Structured 4-column layout (desktop):
  1. Brand column — logo, tagline, short mission statement.
  2. Quick Links — site navigation repeated.
  3. Services — top service categories linked.
  4. Contact & Social — address, phone, email, social icons with hover animation (icon fill/gold glow).
- Newsletter signup with animated input focus + success micro-animation on subscribe.
- Bottom bar: copyright, privacy policy, terms — subtle divider line.
- Optional: subtle looping background texture (film grain / soft particles) fading at the very bottom.
- "Back to top" button — smooth scroll with fade-in appearance after scrolling past hero.
- Mobile: columns stack into accordion-style collapsible sections to save space.

---

## 6. Smooth Scrolling & Page Length (New — Direct Fix for Feedback)

### 6.1 Target Page Length
**Previous issue:** Full site took ~10 vertical scrolls to reach the footer — too long, felt like scrolling through a document rather than a fast, premium experience.

**New target:** Full homepage should complete in **4–5 vertical scrolls max** on desktop, 5–6 on mobile. This is achieved by:
- Converting Services, Stylists, and Gallery from stacked vertical lists into **horizontal-scroll carousels** (see Section 5.4–5.6) — each becomes one screen-height section instead of 2–3 scrolls' worth of stacked cards.
- Combining thin sections where possible (e.g., Testimonials can live inside the About/Story section as a floating card rather than its own full section).
- Using tabs/accordions instead of stacking all content for sections with multiple sub-categories.

### 6.2 Smooth Scroll Implementation
- Implement **inertia-based smooth scrolling** site-wide using a library like **Lenis** (recommended, lightweight, pairs well with GSAP ScrollTrigger) or **Locomotive Scroll**.
- Scroll should feel like it has gentle "weight" and glide — not the default browser jump-scroll, but also not so slow/heavy it feels laggy.
- Horizontal carousels (Services/Stylists/Gallery) should support: mouse-wheel-to-horizontal-scroll on desktop, natural swipe on touch devices, and snap-to-card behavior so cards don't stop mid-way.
- Scroll performance must stay at 60fps — test on the target hardware (mid-range mobile, not just high-end desktop).
- Respect `prefers-reduced-motion`: fall back to standard scroll behavior for users who need it.

---

## 7. Animation & Interaction Specification

| Element | Animation Type | Trigger |
|---|---|---|
| Hero text | Staggered fade + rise | On load |
| Section headings | Fade-in-up | On scroll into view |
| Images | Blur-up lazy load + subtle zoom-out on reveal | On scroll into view |
| Buttons | Magnetic cursor pull + gold fill sweep | On hover |
| Nav underline | Gold line sweep left-to-right | On hover |
| Before/After slider | Drag-to-reveal | User interaction |
| Page transitions | Crossfade / cinematic wipe | On route change |
| Footer newsletter | Success checkmark burst | On submit |
| Scroll progress bar | Width fill animation | On scroll |
| Mobile menu | Full-screen overlay with staggered link reveal | On tap |

**Performance rule:** All animations must respect `prefers-reduced-motion` for accessibility — provide a reduced/static fallback.

---

## 8. Technical Requirements

- **Framework:** React/Next.js (recommended) or equivalent modern framework.
- **Animation Libraries:** GSAP (ScrollTrigger) and/or Framer Motion for scroll-based and micro-interactions.
- **3D Library:** Three.js (via React Three Fiber for React projects) for hero 3D object, floating glass shapes, and micro 3D icons. Keep models low-poly and compressed (GLB/GLTF with Draco compression) to protect load time.
- **Smooth Scroll Library:** Lenis (recommended) for inertia-based smooth scrolling site-wide; pairs cleanly with GSAP ScrollTrigger and React Three Fiber.
- **Video Handling:** Compressed MP4/WebM hero video with poster fallback image; lazy-load below-fold videos. Video usage is now secondary to 3D — use only where 3D can't convey the moment (e.g., a real client testimonial clip).
- **Image Optimization:** WebP/AVIF formats, responsive `srcset`, blur-up placeholders.
- **Performance Targets:**
  - Lighthouse Performance score ≥ 85 (mobile), ≥ 90 (desktop).
  - Largest Contentful Paint (LCP) < 2.5s.
  - Cumulative Layout Shift (CLS) < 0.1.
- **Responsiveness:** Fully responsive breakpoints — 320px, 768px, 1024px, 1440px, 1920px.
- **Accessibility:** WCAG 2.1 AA compliance — alt text, keyboard navigation, reduced-motion support, sufficient color contrast.
- **SEO:** Semantic HTML, meta tags, structured data (LocalBusiness schema), sitemap.xml.
- **CMS (optional):** Headless CMS (Sanity/Contentful) for services, stylists, gallery, testimonials to allow non-dev content updates.
- **Booking Integration:** Third-party booking API/widget (e.g., Fresha, Booksy, Calendly, Square Appointments) or custom form → email/CRM.
- **Hosting:** Vercel/Netlify recommended for edge performance with Next.js.

---

## 9. Content & Asset Requirements

- Professional photography: hero shots, service shots, stylist portraits, before/after pairs.
- Short-form video clips (10–30s loops) for hero and reels section.
- Copywriting: brand story, service descriptions, stylist bios, testimonials.
- Logo assets (SVG, transparent PNG, favicon set).
- Icon set matching brand style (line icons in gold/cream).

---

## 10. Success Metrics (KPIs)

| Metric | Target |
|---|---|
| Booking conversion rate | +25% vs. current site |
| Avg. session duration | +40% |
| Bounce rate | -20% |
| Mobile Lighthouse score | ≥ 85 |
| Page load time (LCP) | < 2.5s |
| Newsletter signups | +30% |

---

## 11. Milestones / Phased Rollout

| Phase | Deliverable | Est. Timeline |
|---|---|---|
| Phase 1 | UX wireframes + sitemap approval | Week 1–2 |
| Phase 2 | Visual design (hero, header, footer, key sections) | Week 3–4 |
| Phase 3 | Motion/animation prototyping | Week 4–5 |
| Phase 4 | Full frontend development | Week 5–8 |
| Phase 5 | CMS + booking integration | Week 8–9 |
| Phase 6 | QA, performance optimization, accessibility audit | Week 9–10 |
| Phase 7 | Launch | Week 11 |

---

## 12. Open Questions

- Which booking platform should be integrated (existing vendor or new)?
- Is a CMS required for the client to edit content post-launch?
- Do we have licensed video/photography assets, or does this require a shoot?
- Final brand color palette and font selection — confirmed or exploratory?
- Multi-location support needed, or single saloon location?

---

## 13. Appendix — Reference Moodboard (Real Assets)

**Note on images:** These are real reference images sourced from the web to guide the new white/3D direction — not AI-generated mockups. Use them as mood/style reference for the design team; final production imagery should be the salon's own branded photography shot to match this direction.

### 13.1 White / Minimal Salon Interior Reference (New Theme Direction)
- Minimalist white salon interior — for the new light, airy background mood (replaces the old dark interior reference)
- Soft-lit, clean-background studio photography — this is the lighting style hero/service photography should match: bright, natural, uncluttered

### 13.2 3D / Glass Design Reference (New — for hero object & card style)
- Abstract 3D glass/geometric shapes — reference for the floating 3D hero object style (frosted glass, soft light refraction, rose-gold/champagne tint)
- This glass/frosted-panel look should also inform the **glassmorphism cards** used across Services, Stylists, and Gallery carousels

### 13.3 Close-Up / Detail Shots (for service cards, transitions)
- Hairstylist cutting hair — close-up of hands with scissors (macro detail shot style, shoot in bright/soft light to match new palette, not dark/moody)
- Hairdresser with client in salon — for "Our Story" section

### 13.4 Before / After (for Gallery slider)
- Before/after hair transformation examples — reference for the drag-reveal slider component

### 13.5 Free Stock Video & 3D Asset Sources
- Pexels — Hair Salon videos: https://www.pexels.com/search/videos/hair%20salon/
- Pexels — Beauty Salon videos: https://www.pexels.com/search/videos/beauty%20salon/
- Getty Images — Hair Salon Background footage (licensed): https://www.gettyimages.com/videos/hair-salon-background
- Adobe Stock — Salon Background video/photo library (licensed): https://stock.adobe.com/search?k=salon+background
- **Sketchfab** (https://sketchfab.com) and **Poly Haven** (https://polyhaven.com) — free/low-cost low-poly 3D models (glass shapes, abstract objects) usable as a starting point for the hero 3D object, before commissioning a custom one.

**Recommendation:** For the new direction, prioritize sourcing/shooting **bright, evenly-lit photography** (not moody/dark) and commission or source one clean, brand-specific 3D hero asset rather than relying on stock video — 3D is now the site's signature visual element.

## 14. Pre-Launch Technical Cleanup (Platform Branding Removal)

If the current/old site (or any prototype) was built or hosted via Replit, the following cleanup must be completed before the redesigned site goes live — these are common leftover defaults that hurt SEO, branding, and professionalism.

### 13.1 Fix Meta Tags (Critical)
Replace default placeholder meta content (e.g., *"— built on Replit. Update this description to reflect the app."*) with real, brand-specific copy.

**Example (plain HTML — `index.html`):**
```html
<meta name="description" content="AURELIS - Premium Boys Salon in [City]. Book haircuts, grooming, styling & spa services. Modern salon experience for men.">
<meta property="og:title" content="AURELIS — Premium Boys Salon">
<meta property="og:description" content="Book your next haircut or grooming session at AURELIS - premium salon experience for men.">
```

**React/Next.js:** Update meta tags in `public/index.html`, `layout.tsx`, or `_document.tsx` depending on framework.

### 13.2 Remove "Made with Replit" Badge
- This badge typically only appears in Replit's dev/preview environment and should auto-disappear on a proper production deployment.
- If it persists after deployment, locate and remove the injected `<script>`/`<div>` element (often labeled `replit-badge` or similar) from the build output.

### 13.3 Update Title & Favicon
```html
<title>AURELIS — Premium Boys Salon</title>
<link rel="icon" href="/favicon.ico">
```
Replace the default favicon with the brand's own icon/logo asset.

### 13.4 Move to a Custom Domain (Recommended)
Replace the auto-generated deployment URL (e.g., `aurleis-saloon-premium-boys-salon-1hm479be4.vercel.app`) with a proper branded domain (e.g., `aurelissalon.com`) via Vercel Dashboard → Project → Settings → Domains.

### 13.5 QA Checklist Before Launch
- [ ] No placeholder/default text remains anywhere in code (meta tags, footer, alt text)
- [ ] No dev-platform badges/watermarks visible in production
- [ ] Favicon and page title reflect the brand
- [ ] Custom domain connected and SSL active
- [ ] Social share preview (OG image/description) tested via a link-preview debugger

---

*End of Document*