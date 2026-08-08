import React from 'react';

export default function Footer({ currentPage, setCurrentPage, siteSettings = {} }) {
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
              {siteSettings.about_text || 'Your trusted partner for premium outstation cabs, family SUV bookings, and customized group traveler packages from Pune since 2018.'}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', marginBottom: '20px' }}>
              <li>
                <button 
                  onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  style={{ 
                    border: 'none', 
                    background: 'transparent', 
                    padding: 0, 
                    textAlign: 'left', 
                    cursor: 'pointer', 
                    color: currentPage === 'home' ? '#00b4d8' : '#475569',
                    fontWeight: currentPage === 'home' ? 'bold' : 'normal',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }} 
                  className="hover:text-[#00b4d8] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#00b4d8] after:transition-all after:duration-300"
                >
                  {currentPage === 'home' && <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#00b4d8', display: 'inline-block' }} />}
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('fleet-details'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  style={{ 
                    border: 'none', 
                    background: 'transparent', 
                    padding: 0, 
                    textAlign: 'left', 
                    cursor: 'pointer', 
                    color: currentPage === 'fleet-details' ? '#00b4d8' : '#475569',
                    fontWeight: currentPage === 'fleet-details' ? 'bold' : 'normal',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }} 
                  className="hover:text-[#00b4d8] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#00b4d8] after:transition-all after:duration-300"
                >
                  {currentPage === 'fleet-details' && <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#00b4d8', display: 'inline-block' }} />}
                  Our Fleet
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('packages'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  style={{ 
                    border: 'none', 
                    background: 'transparent', 
                    padding: 0, 
                    textAlign: 'left', 
                    cursor: 'pointer', 
                    color: currentPage === 'packages' ? '#00b4d8' : '#475569',
                    fontWeight: currentPage === 'packages' ? 'bold' : 'normal',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }} 
                  className="hover:text-[#00b4d8] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#00b4d8] after:transition-all after:duration-300"
                >
                  {currentPage === 'packages' && <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#00b4d8', display: 'inline-block' }} />}
                  Packages
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  style={{ 
                    border: 'none', 
                    background: 'transparent', 
                    padding: 0, 
                    textAlign: 'left', 
                    cursor: 'pointer', 
                    color: currentPage === 'contact' ? '#00b4d8' : '#475569',
                    fontWeight: currentPage === 'contact' ? 'bold' : 'normal',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }} 
                  className="hover:text-[#00b4d8] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#00b4d8] after:transition-all after:duration-300"
                >
                  {currentPage === 'contact' && <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#00b4d8', display: 'inline-block' }} />}
                  Contact Us
                </button>
              </li>
            </ul>

            <h4 style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
              <li><button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} style={{ border: 'none', background: 'transparent', padding: 0, textAlign: 'left', cursor: 'pointer', color: '#475569' }} className="hover:text-[#00b4d8] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#00b4d8] after:transition-all after:duration-300">Our Services</button></li>
              <li><button onClick={() => setCurrentPage('privacy-policy')} style={{ border: 'none', background: 'transparent', padding: 0, textAlign: 'left', cursor: 'pointer', color: '#475569' }} className="hover:text-[#00b4d8] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#00b4d8] after:transition-all after:duration-300">Privacy Policy</button></li>
              <li><button onClick={() => setCurrentPage('terms-conditions')} style={{ border: 'none', background: 'transparent', padding: 0, textAlign: 'left', cursor: 'pointer', color: '#475569' }} className="hover:text-[#00b4d8] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#00b4d8] after:transition-all after:duration-300">Terms & Conditions</button></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px' }}>Contact Info</h4>
            <p style={{ fontSize: '0.82rem', lineHeight: '1.6', color: '#475569', margin: 0 }}>
              <strong>📍 Address:</strong><br />
              <a href="https://maps.google.com/?q=Bhugaon+Bavdhan+Pune+Maharashtra+412115" target="_blank" rel="noopener noreferrer" style={{ color: '#475569', textDecoration: 'none' }} className="hover:text-[#00b4d8] transition-colors duration-300">
                BHUGAON ON MULSHI RD,<br />
                Bhugaon, Bavdhan, Pune,<br />
                Maharashtra 412115
              </a><br /><br />
              <strong>✉️ Email:</strong><br />
              <a href={`mailto:${siteSettings.contact_email || 'booking.poojatravel@gmail.com'}`} style={{ color: '#475569', textDecoration: 'none' }} className="hover:text-[#00b4d8] transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#00b4d8] after:transition-all after:duration-300">
                {siteSettings.contact_email || 'booking.poojatravel@gmail.com'}
              </a>
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
                  className="focus:outline-none focus:border-[#00b4d8] focus:ring-2 focus:ring-[#00b4d8]/10 transition-all font-semibold"
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
                  className="hover:bg-[#d04a00] hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
                >
                  Join
                </button>
              </div>
            </div>

            {/* Quick Helplines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.62rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>24/7 Support</span>
                <a href={`tel:${siteSettings.contact_phone || '+917387129287'}`} style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ea580c', textDecoration: 'none' }} className="hover:underline hover:text-[#d04a00] transition-colors">{siteSettings.contact_phone || '+91 73871 29287'}</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.62rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>WhatsApp Chat</span>
                <a href={`https://wa.me/${(siteSettings.contact_phone_alt || '919623324139').replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#16a34a', textDecoration: 'none' }} className="hover:underline hover:text-[#15803d] transition-colors">{siteSettings.contact_phone_alt || '+91 96233 24139'}</a>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '14px', alignItems: 'center' }}>
                <a 
                  href="https://instagram.com/pooja_travels_official" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    background: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                  }} 
                  className="hover:border-[#00b4d8] hover:scale-110 active:scale-95 hover:shadow-[0_2px_8px_rgba(0,180,216,0.15)] transition-all duration-300"
                  title="Follow us on Instagram"
                >
                  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" fill="none">
                    <defs>
                      <radialGradient id="ig-grad-c" cx="30%" cy="107%" r="130%" fx="30%" fy="107%">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="5%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="60%" stopColor="#d6249f" />
                        <stop offset="90%" stopColor="#285AEB" />
                      </radialGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig-grad-c)" />
                    <rect x="5.5" y="5.5" width="13" height="13" rx="3" ry="3" stroke="#ffffff" strokeWidth="1.5" fill="none" />
                    <circle cx="12" cy="12" r="3" stroke="#ffffff" strokeWidth="1.5" fill="none" />
                    <circle cx="16.5" cy="7.5" r="0.75" fill="#ffffff" />
                  </svg>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    background: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                  }} 
                  className="hover:border-[#00b4d8] hover:scale-110 active:scale-95 hover:shadow-[0_2px_8px_rgba(0,180,216,0.15)] transition-all duration-300"
                  title="Like us on Facebook"
                >
                  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#1877F2" />
                    <path d="M14.5 12h-2v7h-3v-7h-1.5v-2.5h1.5v-1.7c0-2 1.2-3.3 3.2-3.3.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.7h2.3l-.3 2.5z" fill="#ffffff" />
                  </svg>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    background: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                  }} 
                  className="hover:border-[#00b4d8] hover:scale-110 active:scale-95 hover:shadow-[0_2px_8px_rgba(0,180,216,0.15)] transition-all duration-300"
                  title="Follow us on X"
                >
                  <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#000000" />
                    <path d="M14.2 8h1.2l-2.6 3 3.1 4H13.5l-1.9-2.5-2.2 2.5H8.2l2.8-3.2L8 8h2.5l1.7 2.3L14.2 8zm-.4 6.3h.7L10.3 8.7H9.6l4.2 5.6z" fill="#ffffff" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Social links & Copyright */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '0.78rem' }}>
          <span style={{ color: '#64748b' }}>© 2026 Pooja Travels. All rights reserved. Registered under Maharashtra Travel Guidelines.</span>
        </div>
      </div>
    </footer>
  );
}
