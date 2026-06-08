import { Link } from 'react-router-dom';
import BatteryReplacement2 from '../assets/images/Battery_Replacement2.jpg';
import WatchPolishing2 from '../assets/images/Watch_Polishing2.jpg';
import WatchParts2 from '../assets/images/Watch_Parts2.jpg';

const SERVICES = [
  {
    id: 'battery',
    icon: '🔋',
    title: 'Battery Replacement',
    desc: `A flat battery doesn't have to mean a trip to the jeweller who doesn't know your watch. 
    Our technicians open every case with precision tools, fit the correct cell — sourced directly 
    from Swiss and Japanese suppliers — and pressure-test water-resistant cases before reassembly. 
    We also inspect the gaskets and crown seal during every battery service at no extra charge.`,
    turnaround: '~30 minutes',
    warranty: '1 Year',
    priceFrom: '$25',
    includes: [
      'Full case opening with professional tools',
      'Correct OEM-equivalent battery fitted',
      'Gasket and crown seal inspection',
      'Water resistance pressure test (if applicable)',
      'Case and crystal wipe-down',
    ],
  },
  {
    id: 'cleaning',
    icon: '✨',
    title: 'Cleaning & Polishing',
    desc: `Over time, everyday wear dulls even the finest watch. Our cleaning service combines 
    ultrasonic bath treatment with hand-polishing of case and bracelet to bring your watch back 
    to showroom condition. For movements, we fully disassemble, degrease, lubricate, and reassemble 
    to manufacturer tolerances. A timing machine ensures accuracy is within ±5 seconds per day 
    before your watch leaves our bench.`,
    turnaround: '1–3 business days',
    warranty: '90 Days',
    priceFrom: '$85',
    includes: [
      'Ultrasonic cleaning bath (case & bracelet)',
      'Case and bracelet hand-polishing',
      'Full movement disassembly, cleaning & lubrication',
      'Timing machine accuracy test (±5 sec/day)',
      'Water resistance pressure test',
      'Final quality inspection',
    ],
  },
  {
    id: 'parts',
    icon: '⚙️',
    title: 'Parts Repair',
    desc: `From a snapped crown to a shattered crystal, from a broken bracelet link to a full 
    escapement rebuild — our horologists handle repairs at every level of complexity. We source 
    OEM or high-grade compatible parts for most major brands and keep an in-house stock of common 
    components. A detailed written quote is provided before any repair work begins, so you're never 
    surprised by the bill.`,
    turnaround: '3–7 business days',
    warranty: '90 Days',
    priceFrom: '$120',
    includes: [
      'Free written quote before work commences',
      'OEM or high-grade compatible parts',
      'Crown, stem & pusher replacement',
      'Crystal replacement (mineral & sapphire)',
      'Bracelet & clasp repair',
      'Movement overhaul & escapement service',
    ],
  },
];

const PRICING_ROWS = [
  { service: 'Standard Quartz Battery', category: 'Battery', time: '30 min', price: '$25–$45' },
  { service: 'Kinetic / Solar Battery', category: 'Battery', time: '45 min', price: '$45–$75' },
  { service: 'Luxury / Complex Case', category: 'Battery', time: '1 hr', price: '$65–$120' },
  { service: 'Case & Bracelet Ultrasonic Clean', category: 'Cleaning', time: '1 day', price: '$85' },
  { service: 'Full Movement Service (Quartz)', category: 'Cleaning', time: '2 days', price: '$145' },
  { service: 'Full Movement Service (Mechanical)', category: 'Cleaning', time: '3 days', price: '$220' },
  { service: 'Crown / Stem Replacement', category: 'Repair', time: '1–2 days', price: '$120' },
  { service: 'Crystal Replacement (Mineral)', category: 'Repair', time: '1 day', price: '$65' },
  { service: 'Crystal Replacement (Sapphire)', category: 'Repair', time: '2 days', price: '$140' },
  { service: 'Bracelet Link / Clasp Repair', category: 'Repair', time: '1 day', price: '$80' },
  { service: 'Full Escapement Overhaul', category: 'Repair', time: '5–7 days', price: 'From $350' },
];

export default function ServicesPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="eyebrow">What We Do</span>
          <h1>Our Services</h1>
          <p>
            Three core services, delivered by certified horologists using
            Swiss-grade equipment and genuine components.
          </p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 'var(--space-3xl)' }} aria-labelledby="service-details-heading">
        <div className="container">
          <div className="services-full-grid">
            {SERVICES.map(svc => (
              <article className="service-full-card" key={svc.id} id={svc.id}>
                <div className="sfc-image">
                  <img src={
                    svc.id === 'battery' ? BatteryReplacement2 :
                      svc.id === 'cleaning' ? WatchPolishing2 :
                        svc.id === 'parts' ? WatchParts2 : null
                  } alt={svc.title} />
                </div>
                <div className="sfc-body">
                  <div className="sfc-icon" aria-hidden="true">{svc.icon}</div>
                  <h2>{svc.title}</h2>
                  <p>{svc.desc}</p>

                  <div className="sfc-details">
                    <div className="sfc-detail-item">
                      <span className="sfc-detail-label">Starting From</span>
                      <span className="sfc-detail-value gold">{svc.priceFrom}</span>
                    </div>
                    <div className="sfc-detail-item">
                      <span className="sfc-detail-label">Turnaround</span>
                      <span className="sfc-detail-value">{svc.turnaround}</span>
                    </div>
                    <div className="sfc-detail-item">
                      <span className="sfc-detail-label">Warranty</span>
                      <span className="sfc-detail-value">{svc.warranty}</span>
                    </div>
                    <div className="sfc-detail-item">
                      <span className="sfc-detail-label">Brands</span>
                      <span className="sfc-detail-value">All Brands</span>
                    </div>
                  </div>

                  <div className="sfc-includes">
                    <h4>Included in This Service</h4>
                    <ul>
                      {svc.includes.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Link to={`/booking?service=${svc.id}`} className="btn-primary" id={`book-${svc.id}-btn`}>
                      Book This Service
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />
      <section className="section-sm pricing-section" aria-labelledby="pricing-heading">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Transparent Pricing</span>
            <h2 id="pricing-heading">Service Price Guide</h2>
            <p>All prices are estimates. A firm quote is always provided before work begins.</p>
          </div>

          <table className="pricing-table" aria-label="Service pricing guide">
            <thead>
              <tr>
                <th scope="col">Service</th>
                <th scope="col">Category</th>
                <th scope="col">Turnaround</th>
                <th scope="col" className="price-col">Price</th>
              </tr>
            </thead>
            <tbody>
              {PRICING_ROWS.map(row => (
                <tr key={row.service}>
                  <td>{row.service}</td>
                  <td>{row.category}</td>
                  <td>{row.time}</td>
                  <td className="price-col">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className="divider" />
      <section className="section cta-band" aria-labelledby="services-cta-heading">
        <div className="container">
          <span className="eyebrow">Ready to Get Started?</span>
          <h2 id="services-cta-heading">Book Your Service Online</h2>
          <p>Select a service, pick a time slot, and bring your watch in. It's that simple.</p>
          <Link to="/booking" className="btn-primary" id="services-cta-btn">
            Book an Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
