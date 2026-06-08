import { useState } from 'react';
import WatchShopMap from '../assets/images/Watch_Shop_Map.png';

const HOURS = [
  { days: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
  { days: 'Saturday', time: '10:00 AM – 4:00 PM' },
  { days: 'Sunday', time: null },
];

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSent(true);
  };

  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="eyebrow">Get In Touch</span>
          <h1>Contact Us</h1>
          <p>
            Have a question about a service or your watch? We're here to help.
            Drop by the boutique or send us a message.
          </p>
        </div>
      </header>

      <section className="section" aria-label="Contact information and form">
        <div className="container">
          <div className="contact-layout">
            <div>
              <div className="contact-info-card">
                <h2>Visit Our Boutique</h2>
                <p>
                  We are located in the heart of downtown Ottawa. Walk-ins are welcome
                  for consultations and battery replacements. All other services are
                  by appointment.
                </p>

                <div className="contact-details">
                  <div className="contact-detail">
                    <div className="contact-detail-icon" aria-hidden="true">📍</div>
                    <div className="contact-detail-body">
                      <h4>Address</h4>
                      <p>
                        123 Imaginary Street, Suite 3<br />
                        Ottawa, ON  A1B 2C3<br />
                        Canada
                      </p>
                    </div>
                  </div>
                  <div className="contact-detail">
                    <div className="contact-detail-icon" aria-hidden="true">📞</div>
                    <div className="contact-detail-body">
                      <h4>Phone</h4>
                      <a href="tel:+16131112345">(613) 111-2345</a>
                    </div>
                  </div>
                  <div className="contact-detail">
                    <div className="contact-detail-icon" aria-hidden="true">✉️</div>
                    <div className="contact-detail-body">
                      <h4>Email</h4>
                      <a href="mailto:hello@meridianwatchco.ca">hello@meridianwatchco.ca</a>
                    </div>
                  </div>
                  <div className="contact-detail">
                    <div className="contact-detail-icon" aria-hidden="true">🅿️</div>
                    <div className="contact-detail-body">
                      <h4>Parking</h4>
                      <p>Street parking available.</p>
                    </div>
                  </div>
                </div>
                <div className="hours-grid">
                  <h3>Business Hours</h3>
                  {HOURS.map(row => (
                    <div className="hours-row" key={row.days}>
                      <span className="days">{row.days}</span>
                      {row.time
                        ? <span className="time">{row.time}</span>
                        : <span className="closed">Closed</span>
                      }
                    </div>
                  ))}
                </div>
                <div className="map-placeholder">
                  <img src={WatchShopMap} alt="Boutique location map at 142 Sparks St, Ottawa" />
                </div>
              </div>
            </div>
            <div className="contact-form-card">
              <h3>Send Us a Message</h3>
              <p>We typically respond within one business day.</p>

              {sent ? (
                <div className="form-success" aria-live="polite">
                  <div className="form-success-icon" aria-hidden="true">✅</div>
                  <h4>Message Sent!</h4>
                  <p>Thank you, {form.name.split(' ')[0]}. We'll be in touch within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Your Name</label>
                    <input
                      id="contact-name" name="name" className="form-input"
                      placeholder="e.g. Sarah Chen"
                      value={form.name} onChange={handleInput}
                      aria-describedby={errors.name ? 'name-err' : undefined}
                    />
                    {errors.name && (
                      <span id="name-err" style={{ color: 'var(--color-error)', fontSize: 12 }}>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email" name="email" type="email" className="form-input"
                      placeholder="you@email.com"
                      value={form.email} onChange={handleInput}
                      aria-describedby={errors.email ? 'email-err' : undefined}
                    />
                    {errors.email && (
                      <span id="email-err" style={{ color: 'var(--color-error)', fontSize: 12 }}>
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-subject">Subject</label>
                    <input
                      id="contact-subject" name="subject" className="form-input"
                      placeholder="e.g. Question about movement repair"
                      value={form.subject} onChange={handleInput}
                      aria-describedby={errors.subject ? 'subject-err' : undefined}
                    />
                    {errors.subject && (
                      <span id="subject-err" style={{ color: 'var(--color-error)', fontSize: 12 }}>
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message" name="message" className="form-input"
                      placeholder="Tell us about your watch or question…"
                      rows={5}
                      style={{ resize: 'vertical' }}
                      value={form.message} onChange={handleInput}
                      aria-describedby={errors.message ? 'message-err' : undefined}
                    />
                    {errors.message && (
                      <span id="message-err" style={{ color: 'var(--color-error)', fontSize: 12 }}>
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} id="contact-submit-btn">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
