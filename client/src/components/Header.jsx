import React, { useState } from 'react';

export default function Header({ 
  currentPage, 
  setCurrentPage, 
  currentUser, 
  handleLogout, 
  setShowAuthModal, 
  setAuthMode 
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        {/* Logo block */}
        <div 
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="flex items-center gap-2 cursor-pointer"
        >
          {/* Logo badge representing sunset and palm trees */}
          <div className="relative w-[36px] h-[36px] rounded-full overflow-hidden flex items-center justify-center shadow-sm shadow-orange-500/15">
            <div className="absolute inset-0 bg-gradient-to-b from-[#f97316] to-[#fbbf24] z-1" />
            <svg width="36" height="36" viewBox="0 0 100 100" className="relative z-[2]">
              <circle cx="50" cy="65" r="16" fill="rgba(255, 255, 255, 0.3)" />
              <path d="M22,85 C28,75 32,60 33,48 C30,48 26,50 22,54 C25,50 29,46 34,46 C35,42 33,38 31,34 C34,37 36,41 36,45 C41,41 47,38 52,37 C47,39 42,43 38,47 C39,52 38,58 35,63 C36,68 35,76 25,85" fill="#0b1329" />
              <path d="M78,85 C72,75 68,60 67,48 C70,48 74,50 78,54 C75,50 71,46 66,46 C65,42 67,38 69,34 C66,37 64,41 64,45 C59,41 53,38 48,37 C53,39 58,43 62,47 C61,52 62,58 65,63 C64,68 65,76 75,85" fill="#0b1329" />
              <path d="M0,80 Q50,75 100,80 L100,100 L0,100 Z" fill="#0b1329" />
              <text x="50" y="93" fill="#ffffff" fontSize="9" fontWeight="800" textAnchor="middle">PTT</text>
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base sm:text-lg font-black text-[#0b1329] tracking-tight leading-none uppercase">
              <span className="text-[#d90429] font-black">P</span>OOJA <span className="text-[#f97316] font-extrabold">TRAVELS</span>
            </h1>
            <span className="text-[0.55rem] sm:text-[0.6rem] text-slate-400 tracking-[3px] font-black uppercase mt-0.5">Since 2018</span>
          </div>
        </div>

        {/* Desktop Menu Navigation links */}
        <nav className="hidden xl:flex items-center gap-6">
          <button onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`font-black text-[0.82rem] uppercase transition-colors ${currentPage === 'home' ? 'text-[#f97316]' : 'text-slate-700 hover:text-[#f97316]'}`}>Home</button>
          <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('fleet-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="font-black text-[0.82rem] uppercase text-slate-700 hover:text-[#f97316]">Our Fleet</button>
          <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="font-black text-[0.82rem] uppercase text-slate-700 hover:text-[#f97316]">Packages</button>
          <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('why-us-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="font-black text-[0.82rem] uppercase text-slate-700 hover:text-[#f97316]">Why Us</button>
          <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="font-black text-[0.82rem] uppercase text-slate-700 hover:text-[#f97316]">Reviews</button>
          <button onClick={() => { setCurrentPage('home'); setTimeout(() => document.getElementById('faqs-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="font-black text-[0.82rem] uppercase text-slate-700 hover:text-[#f97316]">FAQs</button>
          <button onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`font-black text-[0.82rem] uppercase transition-colors ${currentPage === 'contact' ? 'text-[#f97316]' : 'text-slate-700 hover:text-[#f97316]'}`}>Contact Us</button>
        </nav>

        {/* Right side interactions */}
        <div className="flex items-center gap-4">
          
          {/* Hotline block - hidden on mobile, visible on desktop */}
          <div className="hidden md:flex items-center gap-2 border-l border-slate-200 pl-4">
            <span className="text-xl">📞</span>
            <div className="flex flex-col">
              <span className="text-[0.82rem] font-extrabold text-[#0b1329]">+91 73871 29287</span>
              <span className="text-[0.62rem] text-slate-400 leading-none">Mon-Sun: 7AM - 10PM</span>
            </div>
          </div>

          {/* Desktop User Account Trigger */}
          <div className="hidden xl:flex items-center">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCurrentPage('dashboard')} 
                  className="px-4 py-2 bg-[#0b1329] text-white text-xs font-black rounded-xl flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
                >
                  <span>👤</span>
                  <span>{currentUser.name.split(' ')[0]}</span>
                </button>
                <button onClick={handleLogout} className="text-xs font-black text-rose-500 hover:text-rose-600">Logout</button>
              </div>
            ) : (
              <button 
                onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} 
                className="px-5 py-2 bg-[#0b1329] text-white text-xs font-black rounded-xl flex items-center gap-1.5 hover:bg-slate-800 transition-all active:scale-95 shadow-sm"
              >
                <span>👤</span>
                <span>Login / Sign Up</span>
              </button>
            )}
          </div>

          {/* Hamburger Menu Trigger (Mobile only) */}
          <button 
            onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
            className="xl:hidden p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#f97316] transition-colors"
            style={{ cursor: 'pointer' }}
          >
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              {isDrawerOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* Mobile Drawer Overlay Backdrop */}
      {isDrawerOpen && (
        <div 
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[90] xl:hidden"
        />
      )}

      {/* Sliding Mobile Navigation Side Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white border-l border-slate-200 shadow-2xl z-[100] p-6 flex flex-col justify-between transition-transform duration-300 transform xl:hidden ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Top Header */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
            <span className="text-[0.62rem] font-black text-slate-400 uppercase tracking-widest">Navigation</span>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 hover:text-slate-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <button onClick={() => { setCurrentPage('home'); setIsDrawerOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-black uppercase transition-colors ${currentPage === 'home' ? 'bg-[#f97316]/10 text-[#f97316]' : 'text-slate-700 hover:bg-slate-50'}`}>Home</button>
            <button onClick={() => { setCurrentPage('home'); setIsDrawerOpen(false); setTimeout(() => document.getElementById('fleet-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-black uppercase text-slate-700 hover:bg-slate-50">Our Fleet</button>
            <button onClick={() => { setCurrentPage('home'); setIsDrawerOpen(false); setTimeout(() => document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-black uppercase text-slate-700 hover:bg-slate-50">Packages</button>
            <button onClick={() => { setCurrentPage('home'); setIsDrawerOpen(false); setTimeout(() => document.getElementById('why-us-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-black uppercase text-slate-700 hover:bg-slate-50">Why Us</button>
            <button onClick={() => { setCurrentPage('home'); setIsDrawerOpen(false); setTimeout(() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-black uppercase text-slate-700 hover:bg-slate-50">Reviews</button>
            <button onClick={() => { setCurrentPage('home'); setIsDrawerOpen(false); setTimeout(() => document.getElementById('faqs-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-black uppercase text-slate-700 hover:bg-slate-50">FAQs</button>
            <button onClick={() => { setCurrentPage('contact'); setIsDrawerOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-black uppercase transition-colors ${currentPage === 'contact' ? 'bg-[#f97316]/10 text-[#f97316]' : 'text-slate-700 hover:bg-slate-50'}`}>Contact Us</button>
          </nav>
        </div>

        {/* Drawer Bottom Area */}
        <div className="border-t border-slate-100 pt-6">
          
          {/* Hotline info */}
          <div className="flex items-center gap-3 mb-6 bg-slate-50 border border-slate-200/50 p-3 rounded-2xl">
            <span className="text-xl">📞</span>
            <div className="flex flex-col">
              <span className="text-[0.8rem] font-black text-slate-800">+91 73871 29287</span>
              <span className="text-[0.6rem] text-slate-400 font-semibold leading-none mt-0.5">Mon-Sun: 7AM - 10PM</span>
            </div>
          </div>

          {/* Authentication Actions */}
          <div className="w-full">
            {currentUser ? (
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => { setCurrentPage('dashboard'); setIsDrawerOpen(false); }} 
                  className="w-full py-2.5 bg-[#0b1329] text-white text-xs font-black rounded-xl text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  👤 {currentUser.name}
                </button>
                <button 
                  onClick={() => { handleLogout(); setIsDrawerOpen(false); }} 
                  className="w-full py-2.5 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-black rounded-xl text-center hover:bg-rose-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setIsDrawerOpen(false); setAuthMode('login'); setShowAuthModal(true); }}
                className="w-full py-2.5 bg-[#0b1329] text-white text-xs font-black rounded-xl text-center flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm shadow-[#0b1329]/10"
              >
                <span>👤</span>
                <span>Login / Sign Up</span>
              </button>
            )}
          </div>

        </div>
      </div>

    </header>
  );
}
