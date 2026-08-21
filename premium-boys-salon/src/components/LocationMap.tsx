import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ExternalLink, Navigation } from 'lucide-react';

export const LocationMap: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;
    setIsSent(true);
  };

  return (
    <section className="section-compact clean-location-section" id="location">
      <div className="wrap">
        <div className="services-section-header">
          <div>
            <span className="kicker">Studio Sanctuary</span>
            <h2 className="section-title-clean">Visit Our Haven</h2>
            <p className="section-lead-clean">
              Located in the heart of South Delhi, featuring dedicated valet parking, private VIP grooming suites, and a single-malt lounge.
            </p>
          </div>
        </div>

        <div className="location-master-grid">
          {/* Left Column: Real Interactive Google Map & Contact Info */}
          <div className="location-details-panel">
            <div className="clean-map-card glass-panel">
              <div className="map-artistic-visual">
                {/* Real Interactive Google Maps Embed */}
                <iframe
                  title="AURELIS Studio Location Map"
                  src="https://maps.google.com/maps?q=M-Block+Market,+Greater+Kailash+II,+New+Delhi,+Delhi+110048&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <div className="map-location-tag">
                  <strong>AURELIS FLAGSHIP SANCTUARY</strong>
                  <span>M-Block Market, Greater Kailash II, New Delhi, 110048</span>
                </div>

                <a
                  href="https://maps.google.com/?q=M-Block+Market+Greater+Kailash+2+New+Delhi"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-open-maps"
                >
                  <Navigation size={13} />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

            <div className="location-info-tiles-grid">
              <div className="info-tile glass-panel">
                <Clock size={20} className="info-icon" />
                <div>
                  <strong>Hours of Craft</strong>
                  <span>Tue – Sun: 10:00 AM – 9:00 PM</span>
                  <small>Monday: Sanitization & Honing</small>
                </div>
              </div>

              <div className="info-tile glass-panel">
                <Phone size={20} className="info-icon" />
                <div>
                  <strong>Direct Concierge</strong>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                  <small>Valet assistance available on arrival</small>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Discrete Inquiry Form */}
          <div className="location-inquiry-panel glass-panel">
            {!isSent ? (
              <form onSubmit={handleInquirySubmit} className="inquiry-form-stack">
                <div className="inquiry-card-header">
                  <span className="card-mini-kicker">Discrete Inquiries</span>
                  <h3>Private Consultation / VIP Bookings</h3>
                  <p>Inquire regarding groom packages, photoshoot staging, or private studio buyouts.</p>
                </div>

                <div className="floating-input-wrap">
                  <input
                    type="text"
                    required
                    placeholder=" "
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="floating-input-element"
                  />
                  <label className="floating-label-text">Full Name *</label>
                </div>

                <div className="floating-input-wrap">
                  <input
                    type="tel"
                    required
                    placeholder=" "
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="floating-input-element"
                  />
                  <label className="floating-label-text">Phone (WhatsApp) *</label>
                </div>

                <div className="floating-input-wrap">
                  <textarea
                    rows={3}
                    placeholder=" "
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    className="floating-input-element"
                  />
                  <label className="floating-label-text">Your Note / Requirements</label>
                </div>

                <button type="submit" className="btn-rose-solid">
                  <Send size={15} />
                  <span>Send Confidential Inquiry</span>
                </button>
              </form>
            ) : (
              <div className="inquiry-sent-state">
                <CheckCircle2 size={42} className="check-icon-rose" />
                <h4>Inquiry Received</h4>
                <p>Our Studio Manager will reach out via WhatsApp/Phone within 30 minutes.</p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setInquiryName('');
                    setInquiryPhone('');
                    setInquiryMsg('');
                  }}
                  className="btn-glass-subtle"
                >
                  <span>Send Another Message</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
