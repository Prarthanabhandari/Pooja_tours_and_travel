import React from 'react';

export default function Footer({ setCurrentPage }) {
  return (
    <footer style={{
      background: '#f8fafc',
      borderTop: '1px solid #e2e8f0',
      color: '#475569',
      width: '100%'
    }}>
      
      {/* Centered Horizontal Office Map Location Container */}
      <div className="container" style={{ marginTop: '20px', marginBottom: '10px' }}>
        <div style={{ 
          width: '100%', 
          height: '240px', 
          overflow: 'hidden', 
          border: '1px solid #cbd5e1',
          borderRadius: '0px',
          boxShadow: '0 2px 8px rgba(15,23,42,0.02)'
        }}>
          <iframe 
            src="https://maps.google.com/maps?q=Bhugaon,%20Bavdhan,%20Pune,%20Maharashtra%20412115&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Pooja Travels Office Location Map"
          />
        </div>
      </div>

      {/* Main Footer Content */}
      <div style={{ padding: '40px 0 20px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '30px' }}>
          
          {/* Column 1: Brand block */}
          <div>
            {/* Owner Logo Image - Transparent Clean Sticker */}
            <img 
              src="/pooja-logo-clean.png" 
              alt="Pooja Tours and Travels Logo" 
              style={{ height: '76px', width: 'auto', objectFit: 'contain', marginBottom: '12px' }} 
            />
            <h3 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px' }}>POOJA TOURS AND TRAVELS</h3>
            <p style={{ fontSize: '0.8rem', lineHeight: '1.6', color: '#475569', margin: 0 }}>
              Your trusted partner for premium outstation cabs, family SUV bookings, and customized group traveler packages from Pune since 2018.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', marginBottom: '20px' }}>
              <li><button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ border: 'none', background: 'transparent', padding: 0, textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Home</button></li>
              <li><button onClick={() => { setCurrentPage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ border: 'none', background: 'transparent', padding: 0, textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Our Fleet</button></li>
              <li><button onClick={() => { setCurrentPage('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ border: 'none', background: 'transparent', padding: 0, textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Packages</button></li>
              <li><button onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ border: 'none', background: 'transparent', padding: 0, textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Contact Us</button></li>
            </ul>

            <h4 style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
              <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ border: 'none', background: 'transparent', padding: 0, textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Our Services</button></li>
              <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('why-us-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ border: 'none', background: 'transparent', padding: 0, textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Privacy Policy</button></li>
              <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('why-us-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ border: 'none', background: 'transparent', padding: 0, textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Terms & Conditions</button></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Contact Info</h4>
            <p style={{ fontSize: '0.82rem', lineHeight: '1.6', color: '#475569', margin: 0 }}>
              <strong>Address:</strong><br />
              BHUGAON ON MULSHI RD,<br />
              Bhugaon, Bavdhan, Pune,<br />
              Maharashtra 412115<br /><br />
              <strong>Email:</strong><br />
              booking@poojatoursandtravels.com
            </p>
          </div>

          {/* Column 4: Newsletter & Quick Helplines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Newsletter Subscription */}
            <div>
              <h4 style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px', margin: 0 }}>Subscribe & Offers</h4>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 10px 0' }}>Subscribe to get exclusive travel deals.</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '6px 10px',
                    fontSize: '0.8rem',
                    color: '#0f172a',
                    flex: 1,
                    minWidth: 0
                  }}
                />
                <button 
                  type="button" 
                  style={{
                    background: '#ea580c',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: 'none'
                  }}
                >
                  Join
                </button>
              </div>
            </div>

            {/* Quick Helplines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.62rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>24/7 Support</span>
                <a href="tel:+917387129287" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ea580c', textDecoration: 'none' }}>+91 73871 29287</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.62rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>WhatsApp Chat</span>
                <a href="https://wa.me/919623324139" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#16a34a', textDecoration: 'none' }}>+91 96233 24139</a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Social links & Copyright */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '0.78rem' }}>
          <span style={{ color: '#64748b' }}>© 2026 Pooja Travels. All rights reserved. Registered under Maharashtra Travel Guidelines.</span>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="https://instagram.com/pooja_travels_official" target="_blank" rel="noopener noreferrer" style={{ color: '#475569', textDecoration: 'none' }}>Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#475569', textDecoration: 'none' }}>Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#475569', textDecoration: 'none' }}>Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
