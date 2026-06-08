import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="navbar-brand" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <span className="brand-name">Meridian Watch Co.</span>
              <span className="brand-tagline">Expert Watch Services</span>
            </div>
            <p>
              Ottawa's premier watch service boutique. We bring precision craftsmanship
              and generations of horological expertise to every timepiece we touch.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/booking">Book an Appointment</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services#battery">Battery Replacement</Link></li>
              <li><Link to="/services#cleaning">Cleaning &amp; Polishing</Link></li>
              <li><Link to="/services#parts">Parts Repair</Link></li>
              <li><Link to="/booking">Book Now</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Meridian Watch Co. All rights reserved.</p>
          <p className="footer-designer">
            Designed by <span>Anojan Sivaranjan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
