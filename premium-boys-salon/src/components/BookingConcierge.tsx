import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface BookingConciergeProps {
  initialService?: string;
  initialStylist?: string;
  onResetInitial?: () => void;
}

const SERVICE_CHOICES = [
  { id: 's1', name: 'Aurelis Signature Architecture Cut', price: '₹1,800', duration: '50 Min' },
  { id: 's2', name: 'Executive Fade & Textured Crop', price: '₹1,500', duration: '45 Min' },
  { id: 's3', name: 'Royal Damascus Hot Towel Shave', price: '₹1,400', duration: '40 Min' },
  { id: 's4', name: 'Architectural Beard Sculpt & Contour', price: '₹1,200', duration: '35 Min' },
  { id: 's5', name: 'Volcanic Charcoal & Ice Cryo-Facial', price: '₹2,600', duration: '60 Min' },
  { id: 's6', name: 'The Emperor’s Complete Grooming Suite', price: '₹4,800', duration: '120 Min' },
];

const STYLIST_CHOICES = [
  { id: 'st1', name: 'Aman Sharma', role: 'Founder & Master Barber', fee: '+₹0' },
  { id: 'st2', name: 'Marcus Vance', role: 'Senior Precision Sculptor', fee: '+₹0' },
  { id: 'st3', name: 'Zubin Sethi', role: 'Beard Architect & Colorist', fee: '+₹0' },
  { id: 'st4', name: 'Devraj Chauhan', role: 'Cryo & Spa Aesthetician', fee: '+₹0' },
  { id: 'st0', name: 'First Available Master Artisan', role: 'Earliest Chair Guaranteed', fee: '+₹0' },
];

const TIME_SLOTS = [
  '11:00 AM', '12:15 PM', '01:30 PM', '02:45 PM',
  '04:00 PM', '05:15 PM', '06:30 PM', '07:45 PM'
];

export const BookingConcierge: React.FC<BookingConciergeProps> = ({
  initialService,
  initialStylist,
  onResetInitial,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>(initialService || 'Aurelis Signature Architecture Cut');
  const [selectedStylist, setSelectedStylist] = useState<string>(initialStylist || 'First Available Master Artisan');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>('05:15 PM');
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [refreshment, setRefreshment] = useState<string>('Single-Malt Scotch (12 Yr)');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  useEffect(() => {
    if (initialService) setSelectedService(initialService);
    if (initialStylist) setSelectedStylist(initialStylist);
  }, [initialService, initialStylist]);

  const handleNext = () => {
    setValidationError('');
    if (step === 1 && !selectedService) {
      setValidationError('Please select a ritual to continue.');
      return;
    }
    if (step === 2 && !selectedStylist) {
      setValidationError('Please choose a master artisan.');
      return;
    }
    if (step === 3 && (!selectedDate || !selectedTime)) {
      setValidationError('Please select both a date and time slot.');
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setValidationError('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) {
      setValidationError('Please enter your full name and phone number for reservation verification.');
      return;
    }
    setIsSubmitted(true);
  };

  const generateWhatsAppMessage = () => {
    const text = encodeURIComponent(
      `Hello AURELIS Concierge, I would like to reserve an appointment:\n\n` +
      `👤 Name: ${guestName}\n` +
      `📞 Phone: ${guestPhone}\n` +
      `✂️ Ritual: ${selectedService}\n` +
      `💈 Artisan: ${selectedStylist}\n` +
      `📅 Date: ${selectedDate} at ${selectedTime}\n` +
      `🥃 Lounge Refreshment: ${refreshment}\n` +
      `📝 Notes: ${notes || 'None'}\n\n` +
      `Please confirm my chair availability. Thank you!`
    );
    return `https://wa.me/919876543210?text=${text}`;
  };

  return (
    <section className="section-compact clean-booking-section" id="booking">
      <div className="wrap">
        {/* PRD §7: Copy headline and subline */}
        <div className="services-section-header text-center-header">
          <span className="kicker">Appointment Desk</span>
          <h2 className="section-title-clean">Reserve your private chair in our light-filled studio.</h2>
          <p className="section-lead-clean">
            4 concise steps to tailor your experience.
          </p>
        </div>

        <div className="booking-concierge-card glass-panel">
          {/* PRD §7: 4 Concise Steps Overview Timeline */}
          <div className="booking-steps-overview-bar">
            <div className={`step-overview-item ${step === 1 ? 'active' : ''}`}>
              <span className="step-overview-num">STEP 01</span>
              <span className="step-overview-title">Choose Service</span>
            </div>
            <div className={`step-overview-item ${step === 2 ? 'active' : ''}`}>
              <span className="step-overview-num">STEP 02</span>
              <span className="step-overview-title">Pick Barber</span>
            </div>
            <div className={`step-overview-item ${step === 3 ? 'active' : ''}`}>
              <span className="step-overview-num">STEP 03</span>
              <span className="step-overview-title">Select Time</span>
            </div>
            <div className={`step-overview-item ${step === 4 ? 'active' : ''}`}>
              <span className="step-overview-num">STEP 04</span>
              <span className="step-overview-title">Confirm</span>
            </div>
          </div>

          {!isSubmitted ? (
            <>
              {validationError && (
                <div className="concierge-error-banner" role="alert">
                  {validationError}
                </div>
              )}

              {/* Step 1: Service selection */}
              {step === 1 && (
                <div className="step-pane">
                  <div className="step-pane-header">
                    <Sparkles size={18} className="sparkle-icon-rose" />
                    <h3>Select Your Desired Ritual</h3>
                  </div>

                  <div className="service-selection-grid">
                    {SERVICE_CHOICES.map((srv) => (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedService(srv.name)}
                        className={`service-option-card ${selectedService === srv.name ? 'selected' : ''}`}
                      >
                        <div className="option-top">
                          <span className="option-name">{srv.name}</span>
                          <span className="option-price">{srv.price}</span>
                        </div>
                        <div className="option-meta">
                          <span>
                            <Clock size={12} /> {srv.duration}
                          </span>
                          {selectedService === srv.name && (
                            <span className="option-checked">
                              <CheckCircle2 size={15} /> Selected
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Stylist selection */}
              {step === 2 && (
                <div className="step-pane">
                  <div className="step-pane-header">
                    <Sparkles size={18} className="sparkle-icon-rose" />
                    <h3>Choose Your Master Barber</h3>
                  </div>

                  <div className="stylist-selection-grid">
                    {STYLIST_CHOICES.map((sty) => (
                      <div
                        key={sty.id}
                        onClick={() => setSelectedStylist(sty.name)}
                        className={`stylist-option-card ${selectedStylist === sty.name ? 'selected' : ''}`}
                      >
                        <div className="stylist-option-details">
                          <h4>{sty.name}</h4>
                          <span className="stylist-option-role">{sty.role}</span>
                        </div>
                        {selectedStylist === sty.name && (
                          <div className="stylist-check">
                            <CheckCircle2 size={18} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Date & Time */}
              {step === 3 && (
                <div className="step-pane">
                  <div className="step-pane-header">
                    <CalendarIcon size={18} className="sparkle-icon-rose" />
                    <h3>Select Date & Private Slot</h3>
                  </div>

                  <div className="datetime-selection-layout">
                    <div className="date-picker-col">
                      <label className="input-field-label">Preferred Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="concierge-input-field"
                      />
                      <small className="input-helper-note">Studio open Tuesday – Sunday (10 AM to 9 PM)</small>
                    </div>

                    <div className="time-picker-col">
                      <label className="input-field-label">Available Time Slots</label>
                      <div className="time-chips-grid">
                        {TIME_SLOTS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSelectedTime(t)}
                            className={`time-chip-btn ${selectedTime === t ? 'selected' : ''}`}
                          >
                            <Clock size={12} />
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Details & Refreshment */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="step-pane">
                  <div className="step-pane-header">
                    <ShieldCheck size={18} className="sparkle-icon-rose" />
                    <h3>Guest Credentials & Lounge Preferences</h3>
                  </div>

                  <div className="summary-banner-card">
                    <div className="summary-row">
                      <span className="sum-label">Ritual:</span>
                      <span className="sum-val">{selectedService}</span>
                    </div>
                    <div className="summary-row">
                      <span className="sum-label">Artisan:</span>
                      <span className="sum-val">{selectedStylist}</span>
                    </div>
                    <div className="summary-row">
                      <span className="sum-label">Slot:</span>
                      <span className="sum-val">
                        {selectedDate} at {selectedTime}
                      </span>
                    </div>
                  </div>

                  <div className="guest-inputs-grid">
                    <div className="input-group">
                      <label className="input-field-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Siddharth Rao"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="concierge-input-field"
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-field-label">Phone (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="concierge-input-field"
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-field-label">Email (Optional)</label>
                      <input
                        type="email"
                        placeholder="siddharth@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="concierge-input-field"
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-field-label">Complimentary Lounge Refreshment</label>
                      <select
                        value={refreshment}
                        onChange={(e) => setRefreshment(e.target.value)}
                        className="concierge-input-field"
                      >
                        <option value="Single-Malt Scotch (12 Yr)">Single-Malt Scotch (12 Yr Glenfiddich)</option>
                        <option value="Artisanal Pour-Over Coffee">Artisanal Ethiopian Pour-Over Coffee</option>
                        <option value="Matcha Ceremonial Tea">Japanese Ceremonial Matcha Tea</option>
                        <option value="Sparkling San Pellegrino">Chilled Sparkling San Pellegrino</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label className="input-field-label">Special Requests / Preferences</label>
                      <textarea
                        rows={2}
                        placeholder="Hair history, scalp sensitivities, or quiet service preference..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="concierge-input-field"
                      />
                    </div>
                  </div>

                  <div className="concierge-nav-buttons">
                    <button type="button" onClick={handleBack} className="btn-glass-subtle">
                      <ArrowLeft size={16} />
                      <span>Previous Step</span>
                    </button>
                    <button type="submit" className="btn-rose-solid">
                      <Send size={16} />
                      <span>Confirm Reservation Request</span>
                    </button>
                  </div>
                </form>
              )}

              {step < 4 && (
                <div className="concierge-nav-buttons">
                  {step > 1 ? (
                    <button type="button" onClick={handleBack} className="btn-glass-subtle">
                      <ArrowLeft size={16} />
                      <span>Previous Step</span>
                    </button>
                  ) : (
                    <div />
                  )}
                  <button type="button" onClick={handleNext} className="btn-rose-solid">
                    <span>Continue to Step 0{step + 1}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Confirmation Stage */
            <div className="concierge-confirmation-stage">
              <div className="confirmed-icon-box">
                <CheckCircle2 size={44} className="check-icon-rose" />
              </div>

              <span className="kicker">Reservation Request Logged</span>
              <h3 className="confirmed-title">Your Private Chair is Awaiting</h3>
              <p className="confirmed-desc">
                Thank you, <strong>{guestName}</strong>. Your appointment request has been scheduled for{' '}
                <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> with{' '}
                <strong>{selectedStylist}</strong>.
              </p>

              <div className="confirmed-details-card">
                <div className="detail-item">
                  <span className="detail-k">Ritual:</span>
                  <span className="detail-v">{selectedService}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-k">Artisan:</span>
                  <span className="detail-v">{selectedStylist}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-k">Lounge Refreshment:</span>
                  <span className="detail-v">{refreshment}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-k">Contact:</span>
                  <span className="detail-v">{guestPhone}</span>
                </div>
              </div>

              <div className="confirmed-actions-grid">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-rose-solid"
                  style={{ background: '#25D366', borderColor: '#25D366', color: '#FFFFFF' }}
                >
                  <MessageSquare size={18} />
                  <span>Sync Instantly with WhatsApp Desk</span>
                </a>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                    if (onResetInitial) onResetInitial();
                  }}
                  className="btn-glass-subtle"
                >
                  <span>Book Another Ritual</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
