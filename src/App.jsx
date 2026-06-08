import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="page-content" id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '120px 24px' }}>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '80px', color: 'var(--color-gold)', margin: 0 }}>404</h1>
              <p style={{ color: 'var(--color-text-muted)', marginTop: 16 }}>Page not found.</p>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
