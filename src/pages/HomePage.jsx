import { Link } from 'react-router-dom';
import HomepageOpeningPhoto from '../assets/images/Homepage_Opening_Photo.jpg';
import BatteryReplacement1 from '../assets/images/Battery_Replacement1.jpg';
import WatchPolishing1 from '../assets/images/Watch_Polishing1.jpg';
import WatchParts1 from '../assets/images/Watch_Parts1.jpg';
import WatchShop from '../assets/images/Watch_Shop.jpg';
import WatchTools from '../assets/images/Watch_Tools.jpg';
import WatchMacro from '../assets/images/Watch_Macro.jpeg';

const SERVICES = [
  {
    icon: '🔋',
    title: 'Battery Replacement',
    desc: 'Precise, brand-safe battery swaps for quartz and kinetic watches with pressure testing included.',
    price: 'From $25',
    duration: '~30 min',
    id: 'battery',
  },
  {
    icon: '✨',
    title: 'Cleaning & Polishing',
    desc: 'Full ultrasonic cleaning, movement service, and case polishing to restore factory brilliance.',
    price: 'From $85',
    duration: '1–3 days',
    id: 'cleaning',
  },
  {
    icon: '⚙️',
    title: 'Parts Repair',
    desc: 'Crown, crystal, bracelet, and movement repairs by certified horologists using OEM components.',
    price: 'From $120',
    duration: '3–7 days',
    id: 'parts',
  },
];

const WHY_FEATURES = [
  {
    icon: '🏅',
    title: 'Certified Horologists',
    desc: 'All technicians hold recognized certifications and carry 10+ years of hands-on experience.',
  },
  {
    icon: '🔬',
    title: 'Swiss-Grade Equipment',
    desc: 'We use only professional-grade tools sourced directly from Switzerland and Germany.',
  },
  {
    icon: '🛡️',
    title: '90-Day Guarantee',
    desc: 'Every service is backed by our full satisfaction guarantee. No questions asked.',
  },
  {
    icon: '📦',
    title: 'Safe Handling',
    desc: 'Lint-free gloves, padded cases, and full insurance coverage on every timepiece.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-label="Hero section">
        <div className="hero-ambient" aria-hidden="true" />
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-line" aria-hidden="true" />
                <span>Ottawa's Finest Watch Service</span>
              </div>

              <h1>
                Your Watch.<br />
                <em>Restored to Perfection.</em>
              </h1>

              <p className="hero-desc">
                Meridian Watch Co. is Ottawa's premier boutique for professional
                watch servicing — from swift battery swaps to intricate movement
                repairs. Every timepiece leaves our bench as if new.
              </p>

              <div className="hero-actions">
                <Link to="/booking" className="btn-primary" id="hero-book-btn">
                  Book an Appointment
                </Link>
                <Link to="/services" className="btn-outline" id="hero-services-btn">
                  View Services
                </Link>
              </div>

              <div className="hero-stats" aria-label="Key statistics">
                <div>
                  <div className="hero-stat-num">15+</div>
                  <div className="hero-stat-label">Years Experience</div>
                </div>
                <div>
                  <div className="hero-stat-num">4,200+</div>
                  <div className="hero-stat-label">Watches Serviced</div>
                </div>
                <div>
                  <div className="hero-stat-num">98%</div>
                  <div className="hero-stat-label">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="hero-photo-wrap">
                <div className="hero-photo-main">
                  <img src={HomepageOpeningPhoto} alt="Watchmaker at Work" />
                </div>
                <div className="hero-badge">
                  <div className="hero-badge-label">Est.</div>
                  <div className="hero-badge-value">2009</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />
      <section className="section services-preview" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">What We Offer</span>
            <h2 id="services-heading">Our Core Services</h2>
            <p>
              Whether your timepiece needs a simple battery swap or a full movement
              restoration, our master horologists have you covered.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map(svc => (
              <article className="service-card" key={svc.id}>
                <div className="service-card-image">
                  <img src={
                    svc.id === 'battery' ? BatteryReplacement1 :
                      svc.id === 'cleaning' ? WatchPolishing1 :
                        svc.id === 'parts' ? WatchParts1 : null
                  } alt={svc.title} />
                </div>
                <div className="service-card-body">
                  <div className="service-card-icon" aria-hidden="true">{svc.icon}</div>
                  <h3>{svc.title}</h3>
                  <p>{svc.desc}</p>
                  <div className="service-card-footer">
                    <span className="service-price">{svc.price}</span>
                    <span className="service-duration">{svc.duration}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
            <Link to="/services" className="btn-outline" id="services-preview-more-btn">
              See Full Service Details →
            </Link>
          </div>
        </div>
      </section>

      <hr className="divider" />
      <section className="section" aria-labelledby="why-heading">
        <div className="container">
          <div className="why-grid">
            <div className="why-visual" aria-hidden="true">
              <div className="why-photo-main">
                <img src={WatchShop} alt="Workshop Interior" />
              </div>
              <div className="why-photo-row">
                <div className="why-photo-sm">
                  <img src={WatchTools} alt="Watch Tools Close-Up" />
                </div>
                <div className="why-photo-sm">
                  <img src={WatchMacro} alt="Watch Movement Macro" />
                </div>
              </div>
            </div>
            <div className="why-content">
              <span className="eyebrow">Why Choose Us</span>
              <h2 id="why-heading">
                Precision You Can<br />Trust. Every Time.
              </h2>

              <div className="why-features">
                {WHY_FEATURES.map(f => (
                  <div className="why-feature" key={f.title}>
                    <div className="why-feature-icon" aria-hidden="true">{f.icon}</div>
                    <div className="why-feature-text">
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/booking" className="btn-primary" id="why-book-btn">
                Book Your Service
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="testimonial-band" aria-label="Customer testimonial">
        <div className="container">
          <div className="testimonial-stars" aria-label="5 stars">★★★★★</div>
          <blockquote className="testimonial-quote">
            "My grandfather's Rolex came back looking absolutely pristine. The care and attention
            Meridian's team showed was extraordinary. I won't take my watches anywhere else."
          </blockquote>
          <p className="testimonial-author">— Marcus T., Ottawa, ON</p>
        </div>
      </div>
      <section className="section cta-band" aria-labelledby="cta-heading">
        <div className="container">
          <span className="eyebrow">Ready to Begin?</span>
          <h2 id="cta-heading">Book Your Appointment Today</h2>
          <p>
            Online booking is fast, easy, and available 24/7. Select your service,
            pick a time, and we'll take care of the rest.
          </p>
          <Link to="/booking" className="btn-primary" id="cta-book-btn">
            Schedule an Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
