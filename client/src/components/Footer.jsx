import React from 'react';
import Logo from './Logo';

export default function Footer({ setCurrentPage }) {
  return (
    <footer style={{
      background: '#f8fafc',
      padding: '40px 0 20px 0',
      borderTop: '1px solid #e2e8f0',
      color: '#475569',
      width: '100%'
    }}>
      {/* Email Subscription Bar & Contact Hotlines */}
      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '30px', marginBottom: '30px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
          
          {/* Newsletter (Left) */}
          <div style={{ flex: '1.2', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <h4 style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>Get Exclusive Offers & Travel Tips</h4>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 0 0' }}>Subscribe to our newsletter and never miss a deal!</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', maxWidth: '400px' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '0.85rem',
                  color: '#0f172a',
                  flex: 1
                }}
              />
              <button 
                type="button" 
                style={{
                  background: '#ea580c',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Quick Helplines (Right) */}
          <div style={{ flex: '0.8', minWidth: '280px', display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>24/7 Call Support</span>
              <a href="tel:+917387129287" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ea580c', textDecoration: 'none' }}>+91 73871 29287</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>WhatsApp Chat</span>
              <a href="https://wa.me/919623324139" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a', textDecoration: 'none' }}>+91 96233 24139</a>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', marginBottom: '30px' }}>
        {/* Brand block */}
        <div>
          {/* Owner Logo Image - Transparent Clean Sticker */}
          <img 
            src="/pooja-logo-clean.png" 
            alt="Pooja Tours and Travels Logo" 
            style={{ height: '76px', width: 'auto', objectFit: 'contain', marginBottom: '12px' }} 
          />
          <h3 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px' }}>POOJA TOURS AND TRAVELS</h3>
          <p style={{ fontSize: '0.82rem', lineHeight: '1.6', color: '#475569' }}>
            Your trusted partner for premium outstation cabs, family SUV bookings, and customized group traveler packages from Pune since 2018.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
            <li><button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ border: 'none', background: 'transparent', padding: 0, textOrigin: 'left', textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Home</button></li>
            <li><button onClick={() => { setCurrentPage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ border: 'none', background: 'transparent', padding: 0, textOrigin: 'left', textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Our Fleet</button></li>
            <li><button onClick={() => { setCurrentPage('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ border: 'none', background: 'transparent', padding: 0, textOrigin: 'left', textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Packages</button></li>
            <li><button onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ border: 'none', background: 'transparent', padding: 0, textOrigin: 'left', textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Contact Us</button></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
            <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ border: 'none', background: 'transparent', padding: 0, textOrigin: 'left', textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Our Services</button></li>
            <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('why-us-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ border: 'none', background: 'transparent', padding: 0, textOrigin: 'left', textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Privacy Policy</button></li>
            <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('why-us-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ border: 'none', background: 'transparent', padding: 0, textOrigin: 'left', textAlign: 'left', cursor: 'pointer', color: '#475569' }}>Terms & Conditions</button></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Contact Info</h4>
          <p style={{ fontSize: '0.82rem', lineHeight: '1.6', color: '#475569' }}>
            Address: BHUGAON ON MULSHI RD, Bhugaon, Bavdhan, Bhugaon, Maharashtra 412115<br />
            Call Desk: +91 73871 29287<br />
            WhatsApp: +91 96233 24139<br />
            Email: booking@poojatravels.com
          </p>
        </div>
      </div>

      {/* Social links & Copyright */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', marginTop: '20px' }}>
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
