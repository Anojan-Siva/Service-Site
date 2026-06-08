import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const SERVICES = [
  {
    id: 'battery',
    icon: '🔋',
    title: 'Battery Replacement',
    desc: 'OEM battery + gasket/seal inspection',
    price: 25,
    duration: '~30 min',
  },
  {
    id: 'cleaning',
    icon: '✨',
    title: 'Cleaning & Polishing',
    desc: 'Ultrasonic clean + movement service',
    price: 85,
    duration: '1–3 days',
  },
  {
    id: 'parts',
    icon: '⚙️',
    title: 'Parts Repair',
    desc: 'Crown, crystal, bracelet, or movement repair',
    price: 120,
    duration: '3–7 days',
  },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM',
];

const UNAVAILABLE_SLOTS = ['10:00 AM', '11:30 AM', '2:00 PM'];

function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function formatDate(d) {
  if (!d) return null;
  return `${MONTHS[d.month]} ${d.day}, ${d.year}`;
}

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const preselect = searchParams.get('service');

  const [step, setStep] = useState(1);

  const [selectedService, setSelectedService] = useState(
    SERVICES.find(s => s.id === preselect) || null
  );

  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', notes: '' });
  const [formErrors, setFormErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const match = SERVICES.find(s => s.id === preselect);
    if (match) { setSelectedService(match); }
  }, [preselect]);

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  };

  const calCells = buildCalendar(calYear, calMonth);

  const isPast = (day) => {
    const d = new Date(calYear, calMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };
  const isWeekend = (day) => {
    const dow = new Date(calYear, calMonth, day).getDay();
    return dow === 0 || dow === 6;
  };
  const isDisabled = (day) => !day || isPast(day) || isWeekend(day);
  const isToday = (day) => {
    if (!day) return false;
    const t = new Date();
    return calYear === t.getFullYear() && calMonth === t.getMonth() && day === t.getDate();
  };
  const isSelected = (day) =>
    selectedDate &&
    day === selectedDate.day &&
    calMonth === selectedDate.month &&
    calYear === selectedDate.year;

  const handleDayClick = (day) => {
    if (isDisabled(day)) return;
    setSelectedDate({ day, month: calMonth, year: calYear });
    setSelectedTime(null);
  };

  const canGoNext = () => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedDate && !!selectedTime;
    if (step === 3) return true;
    return false;
  };

  const validateDetails = () => {
    const errors = {};
    if (!form.firstName.trim()) errors.firstName = 'Required';
    if (!form.lastName.trim()) errors.lastName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Valid email required';
    if (!form.phone.trim()) errors.phone = 'Required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 3) {
      if (!validateDetails()) return;
    }
    if (step === 3) { setSubmitted(true); setStep(4); return; }
    setStep(s => s + 1);
  };
  const handleBack = () => setStep(s => s - 1);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (formErrors[name]) setFormErrors(err => ({ ...err, [name]: null }));
  };

  const handleBookAnother = () => {
    setStep(1); setSelectedService(null); setSelectedDate(null);
    setSelectedTime(null); setForm({ firstName: '', lastName: '', email: '', phone: '', notes: '' });
    setFormErrors({}); setSubmitted(false);
  };

  const dateStr = formatDate(selectedDate);

  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="eyebrow">Schedule a Visit</span>
          <h1>Book an Appointment</h1>
          <p>Three easy steps to get your watch the care it deserves.</p>
        </div>
      </header>

      <section className="section" aria-label="Booking form">
        <div className="container">
          {submitted ? (
            <div className="booking-confirmation">
              <div className="confirmation-icon" aria-label="Success">✓</div>
              <h2>Appointment Confirmed!</h2>
              <p>
                We've received your booking and sent a confirmation to <strong>{form.email}</strong>.
                We look forward to seeing your timepiece.
              </p>
              <div className="confirmation-details" aria-label="Booking summary">
                <div className="summary-rows">
                  <div className="summary-row">
                    <span className="summary-row-label">Service</span>
                    <span className="summary-row-value">{selectedService?.title}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-row-label">Date</span>
                    <span className="summary-row-value">{dateStr}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-row-label">Time</span>
                    <span className="summary-row-value">{selectedTime}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-row-label">Name</span>
                    <span className="summary-row-value">{form.firstName} {form.lastName}</span>
                  </div>
                  <div className="summary-divider" />
                  <div className="summary-row">
                    <span className="summary-total-label">Estimated Cost</span>
                    <span className="summary-total-price">From ${selectedService?.price}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-outline" onClick={handleBookAnother} id="book-another-btn">
                  Book Another
                </button>
                <Link to="/" className="btn-primary" id="confirm-home-btn">Back to Home</Link>
              </div>
            </div>
          ) : (
            <div className="booking-layout">
              <div>
                <div className="booking-steps" aria-label="Booking progress">
                  {[
                    { num: 1, label: 'Service' },
                    { num: 2, label: 'Date & Time' },
                    { num: 3, label: 'Your Details' },
                  ].map((s, i, arr) => (
                    <>
                      <div className="booking-step" key={s.num}>
                        <div className={`step-num${step === s.num ? ' active' : step > s.num ? ' done' : ''}`} aria-current={step === s.num ? 'step' : undefined}>
                          {step > s.num ? '✓' : s.num}
                        </div>
                        <span className={`step-label${step === s.num ? ' active' : ''}`}>{s.label}</span>
                      </div>
                      {i < arr.length - 1 && <div className="step-connector" key={`conn-${i}`} aria-hidden="true" />}
                    </>
                  ))}
                </div>

                <div className="booking-form-section">
                  {step === 1 && (
                    <div>
                      <h2 className="form-section-title">Select a Service</h2>
                      <div className="service-options" role="radiogroup" aria-label="Choose a service">
                        {SERVICES.map(svc => (
                          <button
                            key={svc.id}
                            className={`service-option${selectedService?.id === svc.id ? ' selected' : ''}`}
                            onClick={() => setSelectedService(svc)}
                            role="radio"
                            aria-checked={selectedService?.id === svc.id}
                            id={`service-opt-${svc.id}`}
                          >
                            <span className="service-option-icon" aria-hidden="true">{svc.icon}</span>
                            <span className="service-option-info">
                              <span className="service-option-info"><strong style={{ color: 'var(--color-heading)', fontSize: 15 }}>{svc.title}</strong></span>
                              <p>{svc.desc}</p>
                            </span>
                            <span className="service-option-meta">
                              <span className="service-option-price">From ${svc.price}</span>
                              <br />
                              <span className="service-option-time">{svc.duration}</span>
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="form-actions">
                        <span />
                        <button
                          className="btn-primary"
                          onClick={handleNext}
                          disabled={!canGoNext()}
                          id="step1-next-btn"
                          style={{ opacity: canGoNext() ? 1 : 0.4, cursor: canGoNext() ? 'pointer' : 'not-allowed' }}
                        >
                          Continue →
                        </button>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div>
                      <h2 className="form-section-title">Choose a Date & Time</h2>
                      <div className="calendar-wrap">
                        <div className="calendar-header">
                          <button className="cal-nav-btn" onClick={prevMonth} aria-label="Previous month">‹</button>
                          <span className="calendar-month" aria-live="polite">{MONTHS[calMonth]} {calYear}</span>
                          <button className="cal-nav-btn" onClick={nextMonth} aria-label="Next month">›</button>
                        </div>

                        <div className="calendar-grid" role="grid" aria-label="Calendar">
                          {DAYS.map(d => (
                            <div className="cal-day-name" key={d} role="columnheader" aria-label={d}>{d}</div>
                          ))}
                          {calCells.map((day, i) => (
                            <button
                              key={i}
                              className={`cal-day${!day ? ' empty' : ''}${isDisabled(day) ? ' disabled' : ''}${isToday(day) ? ' today' : ''}${isSelected(day) ? ' selected' : ''}`}
                              onClick={() => handleDayClick(day)}
                              disabled={isDisabled(day)}
                              aria-label={day ? `${MONTHS[calMonth]} ${day}, ${calYear}${isDisabled(day) ? ' (unavailable)' : ''}` : undefined}
                              aria-pressed={isSelected(day)}
                              role="gridcell"
                              id={day ? `cal-day-${calYear}-${calMonth + 1}-${day}` : undefined}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 8 }}>
                          We are open Monday–Friday. Weekends are unavailable.
                        </p>
                      </div>
                      {selectedDate && (
                        <>
                          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
                            Available Times — {dateStr}
                          </h3>
                          <div className="time-slots" role="group" aria-label="Select a time slot">
                            {TIME_SLOTS.map(t => (
                              <button
                                key={t}
                                className={`time-slot${selectedTime === t ? ' selected' : ''}${UNAVAILABLE_SLOTS.includes(t) ? ' unavailable' : ''}`}
                                onClick={() => !UNAVAILABLE_SLOTS.includes(t) && setSelectedTime(t)}
                                disabled={UNAVAILABLE_SLOTS.includes(t)}
                                aria-label={`${t}${UNAVAILABLE_SLOTS.includes(t) ? ' (unavailable)' : ''}`}
                                aria-pressed={selectedTime === t}
                                id={`time-${t.replace(/[: ]/g, '-')}`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                      <div className="form-actions">
                        <button className="btn-outline" onClick={handleBack} id="step2-back-btn">← Back</button>
                        <button
                          className="btn-primary"
                          onClick={handleNext}
                          disabled={!canGoNext()}
                          id="step2-next-btn"
                          style={{ opacity: canGoNext() ? 1 : 0.4, cursor: canGoNext() ? 'pointer' : 'not-allowed' }}
                        >
                          Continue →
                        </button>
                      </div>
                    </div>
                  )}
                  {step === 3 && (
                    <div>
                      <h2 className="form-section-title">Your Details</h2>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="firstName">First Name</label>
                          <input
                            id="firstName" name="firstName" className="form-input"
                            placeholder="e.g. Marcus"
                            value={form.firstName} onChange={handleInput}
                            aria-describedby={formErrors.firstName ? 'firstName-err' : undefined}
                          />
                          {formErrors.firstName && (
                            <span id="firstName-err" style={{ color: 'var(--color-error)', fontSize: 12 }}>
                              {formErrors.firstName}
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="lastName">Last Name</label>
                          <input
                            id="lastName" name="lastName" className="form-input"
                            placeholder="e.g. Thompson"
                            value={form.lastName} onChange={handleInput}
                            aria-describedby={formErrors.lastName ? 'lastName-err' : undefined}
                          />
                          {formErrors.lastName && (
                            <span id="lastName-err" style={{ color: 'var(--color-error)', fontSize: 12 }}>
                              {formErrors.lastName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="email">Email Address</label>
                          <input
                            id="email" name="email" type="email" className="form-input"
                            placeholder="you@email.com"
                            value={form.email} onChange={handleInput}
                            aria-describedby={formErrors.email ? 'email-err' : undefined}
                          />
                          {formErrors.email && (
                            <span id="email-err" style={{ color: 'var(--color-error)', fontSize: 12 }}>
                              {formErrors.email}
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="phone">Phone Number</label>
                          <input
                            id="phone" name="phone" type="tel" className="form-input"
                            placeholder="(613) 555-0100"
                            value={form.phone} onChange={handleInput}
                            aria-describedby={formErrors.phone ? 'phone-err' : undefined}
                          />
                          {formErrors.phone && (
                            <span id="phone-err" style={{ color: 'var(--color-error)', fontSize: 12 }}>
                              {formErrors.phone}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="notes">Additional Notes (Optional)</label>
                        <textarea
                          id="notes" name="notes" className="form-input"
                          placeholder="Tell us about your watch — brand, model, issue, or any special requests…"
                          rows={4}
                          style={{ resize: 'vertical' }}
                          value={form.notes} onChange={handleInput}
                        />
                      </div>

                      <div className="form-actions">
                        <button className="btn-outline" onClick={handleBack} id="step3-back-btn">← Back</button>
                        <button className="btn-primary" onClick={handleNext} id="step3-submit-btn">
                          Confirm Booking
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <aside className="booking-summary" aria-label="Booking summary">
                <h3>Your Booking</h3>
                <div className="summary-rows">
                  <div className="summary-row">
                    <span className="summary-row-label">Service</span>
                    <span className={`summary-row-value${!selectedService ? ' placeholder' : ''}`}>
                      {selectedService ? selectedService.title : 'Not yet selected'}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-row-label">Date</span>
                    <span className={`summary-row-value${!dateStr ? ' placeholder' : ''}`}>
                      {dateStr || 'Not yet selected'}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-row-label">Time</span>
                    <span className={`summary-row-value${!selectedTime ? ' placeholder' : ''}`}>
                      {selectedTime || 'Not yet selected'}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-row-label">Duration</span>
                    <span className={`summary-row-value${!selectedService ? ' placeholder' : ''}`}>
                      {selectedService ? selectedService.duration : '—'}
                    </span>
                  </div>
                </div>

                <div className="summary-divider" />

                <div className="summary-total">
                  <span className="summary-total-label">Estimated Price</span>
                  <span className="summary-total-price">
                    {selectedService ? `From $${selectedService.price}` : '—'}
                  </span>
                </div>

                <div className="booking-note">
                  💡 A final quote will be provided at drop-off after our technician inspects your watch.
                  No work is started without your approval.
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
