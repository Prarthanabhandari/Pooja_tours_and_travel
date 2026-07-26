import React, { useState, useEffect } from 'react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [typingText, setTypingText] = useState({ from: '', to: '' });

  const steps = [
    { 
      step: '01', 
      title: 'Select Destination', 
      desc: 'Choose your pickup city, travel dates, and select whether you want a private cab or bus seats.',
      image: '/how-it-works-1.png'
    },
    { 
      step: '02', 
      title: 'Choose Vehicle', 
      desc: 'Select the perfect vehicle from our clean, sanitized fleet (WagonR, Brezza, Innovas, Carens, or Buses).',
      image: '/how-it-works-2.png'
    },
    { 
      step: '03', 
      title: 'Enter Trip Details', 
      desc: 'Provide pickup times, contact details, and any specific route stops or instructions for the driver.',
      image: '/how-it-works-3.png'
    },
    { 
      step: '04', 
      title: 'Confirm via WhatsApp', 
      desc: 'Receive immediate confirmation of pricing, vehicle allocation, and driver coordinates right on your chat.',
      image: '/how-it-works-4.png'
    }
  ];

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, steps.length]);

  // Typing animation for Step 1 Mockup
  useEffect(() => {
    if (activeStep !== 0) {
      setTypingText({ from: '', to: '' });
      return;
    }

    const sourceFrom = "Pune Junction";
    const sourceTo = "Mumbai Airport (T2)";
    let currentFrom = "";
    let currentTo = "";
    let fromIdx = 0;
    let toIdx = 0;

    let fromTimer = setInterval(() => {
      if (fromIdx < sourceFrom.length) {
        currentFrom += sourceFrom[fromIdx];
        setTypingText(prev => ({ ...prev, from: currentFrom }));
        fromIdx++;
      } else {
        clearInterval(fromTimer);
        // Start typing drop-off location after pickup is done
        let toTimer = setInterval(() => {
          if (toIdx < sourceTo.length) {
            currentTo += sourceTo[toIdx];
            setTypingText(prev => ({ ...prev, to: currentTo }));
            toIdx++;
          } else {
            clearInterval(toTimer);
          }
        }, 80);
      }
    }, 80);

    return () => {
      clearInterval(fromTimer);
    };
  }, [activeStep]);

  return (
    <section 
      id="how-it-works-section" 
      className="py-16 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#ffffff] w-full overflow-hidden relative"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Decorative background grid and light blobs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00b4d8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#ea580c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-widest mb-4 shadow-sm">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0f172a] tracking-tight mb-4 font-heading">
            How It Works
          </h2>
          <div className="w-24 h-1.5 bg-[#00b4d8] mx-auto rounded-full mb-5 shadow-sm" />
          <p className="text-slate-500 text-sm sm:text-base font-semibold leading-relaxed">
            Book your clean, comfortable outstation cab or bus in 4 quick and easy steps. Explore the interactive steps below.
          </p>
        </div>

        {/* Split Screen Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch font-body">
          
          {/* Left Column: Vertical Interactive Timeline */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            {steps.map((node, idx) => {
              const isActive = activeStep === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsAutoplay(false);
                  }}
                  className={`group relative flex items-start gap-4 p-5 rounded-2xl cursor-pointer border transition-all duration-500 ${
                    isActive 
                      ? 'bg-white border-[#00b4d8]/30 shadow-[0_10px_30px_rgba(0,180,216,0.08)] scale-[1.02]' 
                      : 'bg-transparent border-transparent hover:bg-white/50 hover:border-slate-200/60'
                  }`}
                >
                  {/* Left connector line (for desktop vertical flow) */}
                  {idx < steps.length - 1 && (
                    <div className="absolute left-[34px] top-[64px] bottom-[-24px] w-0.5 bg-slate-200 hidden lg:block pointer-events-none">
                      <div 
                        className={`w-full bg-[#00b4d8] transition-all duration-700 origin-top ${
                          activeStep > idx ? 'h-full scale-y-100' : 'h-0 scale-y-0'
                        }`} 
                      />
                    </div>
                  )}

                  {/* Step Number Circle */}
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#00b4d8] text-white border-[#00b4d8] shadow-lg shadow-[#00b4d8]/30 scale-110' 
                        : 'bg-slate-100 text-slate-400 border-slate-200 group-hover:border-slate-300 group-hover:text-slate-600'
                    }`}
                  >
                    {node.step}
                  </div>

                  {/* Text Details */}
                  <div className="flex-1">
                    <h3 
                      className={`text-base sm:text-lg font-black mb-1.5 transition-colors duration-300 ${
                        isActive ? 'text-[#00b4d8]' : 'text-slate-800 group-hover:text-[#00b4d8]'
                      }`}
                    >
                      {node.title}
                    </h3>
                    <p 
                      className={`text-xs sm:text-sm font-semibold leading-relaxed transition-colors duration-300 ${
                        isActive ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {node.desc}
                    </p>
                  </div>

                  {/* Hover indicator arrow */}
                  <div 
                    className={`w-5 h-5 flex items-center justify-center rounded-full text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-center hidden sm:flex`}
                  >
                    <svg className="w-4 h-4 text-[#00b4d8] transform translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Mockup Container */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col h-[420px] justify-between">
              
              {/* Top Window Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-800/40 px-3 py-1 rounded-full">
                  Step {steps[activeStep].step} Demonstration
                </div>
                <div className="w-14" /> {/* Spacer */}
              </div>

              {/* Dynamic Mockup Body */}
              <div className="flex-1 py-6 overflow-y-auto flex items-center justify-center">
                
                {/* MOCKUP 1: Select Destination */}
                {activeStep === 0 && (
                  <div className="w-full max-w-sm space-y-4 animate-fade-in">
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 space-y-3">
                      <div className="text-xs font-bold text-[#00b4d8] tracking-wider uppercase">Outstation Cab Booking</div>
                      
                      {/* Source Input */}
                      <div className="space-y-1 relative">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Pickup Location</label>
                        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs text-slate-200 min-h-[1.25rem]">
                            {typingText.from || <span className="text-slate-600">Enter pickup city...</span>}
                            <span className="w-0.5 h-3 bg-[#00b4d8] inline-block animate-pulse ml-0.5" />
                          </span>
                        </div>
                      </div>

                      {/* Destination Input */}
                      <div className="space-y-1 relative">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Drop Location</label>
                        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-xs text-slate-200 min-h-[1.25rem]">
                            {typingText.to || (typingText.from ? <span className="text-slate-600">Enter destination...</span> : "")}
                            {typingText.from && !typingText.to && <span className="w-0.5 h-3 bg-[#00b4d8] inline-block animate-pulse ml-0.5" />}
                          </span>
                        </div>
                      </div>

                      {/* Travel Date */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Travel Date</label>
                          <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300">
                            📅 27-07-2026
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Trip Type</label>
                          <div className="bg-[#00b4d8]/10 border border-[#00b4d8]/20 rounded-lg px-3 py-2 text-xs text-[#00b4d8] text-center font-bold">
                            One Way
                          </div>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-[#00b4d8] hover:bg-[#0083b0] text-slate-900 font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-[#00b4d8]/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 animate-bounce">
                      <span>Search Cab Fleet</span>
                      <span>🚀</span>
                    </button>
                  </div>
                )}

                {/* MOCKUP 2: Choose Vehicle */}
                {activeStep === 1 && (
                  <div className="w-full max-w-sm space-y-3 animate-fade-in relative">
                    <div className="text-xs font-bold text-slate-400 mb-1">Available Fleet (Pune to Mumbai)</div>
                    
                    {/* Vehicle 1: Hatchback */}
                    <div className="bg-slate-800/30 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between opacity-60">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🚗</span>
                        <div>
                          <div className="text-xs font-bold text-slate-200">Hatchback (WagonR)</div>
                          <div className="text-[10px] text-slate-500">4 Seats • 2 Bags • AC</div>
                        </div>
                      </div>
                      <div className="text-xs font-black text-[#00b4d8]">₹13/km</div>
                    </div>

                    {/* Vehicle 2: SUV (Selected) */}
                    <div className="bg-gradient-to-r from-slate-800 to-[#00b4d8]/10 border-2 border-[#00b4d8] rounded-xl p-3 flex items-center justify-between shadow-lg shadow-[#00b4d8]/5 scale-[1.03] transition-all">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🚘</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <div className="text-xs font-bold text-slate-200">SUV (Innova Crysta)</div>
                            <span className="bg-[#00b4d8] text-slate-950 font-bold text-[8px] px-1 py-0.2 rounded-full uppercase tracking-wider">
                              Popular
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-300">6 Seats • 4 Bags • Dual AC</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-black text-[#00b4d8]">₹16/km</div>
                        <div className="text-[8px] text-emerald-400 font-bold">✓ Selected</div>
                      </div>
                    </div>

                    {/* Vehicle 3: Luxury Bus */}
                    <div className="bg-slate-800/30 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between opacity-60">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🚌</span>
                        <div>
                          <div className="text-xs font-bold text-slate-200">Pooja Traveler Bus</div>
                          <div className="text-[10px] text-slate-500">17 Seats • Luggage Space • AC</div>
                        </div>
                      </div>
                      <div className="text-xs font-black text-[#00b4d8]">₹24/km</div>
                    </div>

                    {/* Virtual Hand Selector Pointer overlay */}
                    <div className="absolute right-12 bottom-6 w-8 h-8 pointer-events-none animate-pulse">
                      <svg className="w-8 h-8 text-white filter drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74l.22-.09c.46-.19.96-.25 1.45-.17L18.5 11.5a2.5 2.5 0 0 1 2 2.45v3.3a4.75 4.75 0 0 1-4.75 4.75h-3A5.75 5.75 0 0 1 7 16.25v-2.18a3 3 0 0 1 .59-1.8l1.41-1.41.09-.09L9 11.24z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* MOCKUP 3: Enter Trip Details */}
                {activeStep === 2 && (
                  <div className="w-full max-w-sm space-y-4 animate-fade-in">
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 space-y-3">
                      <div className="text-xs font-bold text-slate-400 mb-1 border-b border-slate-700/60 pb-1.5 flex justify-between items-center">
                        <span>Passenger & Trip Details</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full font-bold border border-emerald-800/30">
                          ✓ Auto-Filled
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1">
                          <span className="text-slate-500 block font-bold text-[9px] uppercase">Passenger Name</span>
                          <span className="text-slate-200 block font-semibold bg-slate-800 px-2.5 py-1.5 rounded-md">
                            Rajesh Patil
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-slate-500 block font-bold text-[9px] uppercase">Contact Number</span>
                          <span className="text-slate-200 block font-semibold bg-slate-800 px-2.5 py-1.5 rounded-md">
                            +91 98234 56789
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-slate-500 block font-bold text-[9px] uppercase">Pickup Time</span>
                          <span className="text-slate-200 block font-semibold bg-slate-800 px-2.5 py-1.5 rounded-md font-mono">
                            10:30 AM
                          </span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-slate-500 block font-bold text-[9px] uppercase">Luggage Count</span>
                          <span className="text-slate-200 block font-semibold bg-slate-800 px-2.5 py-1.5 rounded-md">
                            3 Suitcases
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-slate-500 block font-bold text-[9px] uppercase">Special Requests</span>
                        <span className="text-slate-200 block text-[11px] bg-slate-800 px-2.5 py-1.5 rounded-md italic">
                          "Clean car, quiet driver, need luggage carrier."
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/30 p-2 rounded-xl">
                      <span className="animate-spin text-sm">⌛</span>
                      <span>Generating booking summary...</span>
                    </div>
                  </div>
                )}

                {/* MOCKUP 4: Confirm via WhatsApp */}
                {activeStep === 3 && (
                  <div className="w-full max-w-sm h-full flex flex-col bg-[#efeae2] border border-slate-700/50 rounded-2xl overflow-hidden shadow-inner font-sans relative">
                    
                    {/* Simulated Phone WhatsApp Header */}
                    <div className="bg-[#075e54] text-white px-3 py-2 flex items-center justify-between shadow-md shrink-0 font-sans">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">←</span>
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-800 text-[10px] font-bold overflow-hidden">
                          <img src="/pooja-logo.jpg" alt="Pooja Logo" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                          PT
                        </div>
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1">
                            Pooja Tours & Travels
                            <span className="text-[10px] text-sky-400">✓</span>
                          </div>
                          <div className="text-[8px] text-slate-200 opacity-90">Online • Business Account</div>
                        </div>
                      </div>
                      <div className="flex gap-2.5 text-sm opacity-90">
                        <span>📞</span>
                        <span>⋮</span>
                      </div>
                    </div>

                    {/* Chat Bubble Scroll Window */}
                    <div className="flex-1 p-3 space-y-2 overflow-y-auto text-[11px] leading-relaxed flex flex-col justify-end">
                      
                      {/* Bubble 1 (Left) */}
                      <div className="bg-white text-slate-800 rounded-lg p-2 max-w-[85%] self-start shadow-sm border border-slate-200/50 animate-fade-in">
                        <p className="font-bold text-[#075e54] mb-0.5">Pooja Tours & Travels</p>
                        <p>Hi Rajesh! Thank you for booking with us. Your cab trip from **Pune** to **Mumbai Airport** on **27th July** is confirmed! ✅</p>
                        <span className="text-[8px] text-slate-400 float-right mt-1">10:31 AM</span>
                      </div>

                      {/* Bubble 2 (Left) */}
                      <div className="bg-white text-slate-800 rounded-lg p-2 max-w-[85%] self-start shadow-sm border border-slate-200/50 animate-fade-in delay-200">
                        <p className="font-bold text-slate-700 border-b border-slate-100 pb-1 mb-1">🚗 Assigned Ride</p>
                        <p>• **Model:** White Toyota Innova Crysta</p>
                        <p>• **Plate No:** MH-12-XX-8899</p>
                        <p>• **Driver:** Santosh Shinde (+91 98765 43210)</p>
                        <span className="text-[8px] text-slate-400 float-right mt-1">10:31 AM</span>
                      </div>

                      {/* Bubble 3 (Left) */}
                      <div className="bg-white text-slate-800 rounded-lg p-2 max-w-[85%] self-start shadow-sm border border-slate-200/50 animate-fade-in delay-500">
                        <p>• **Est. Fare:** ₹2,400 (All Inclusive)</p>
                        <p>• **Payment:** Pay directly to driver on completion.</p>
                        <span className="text-[8px] text-slate-400 float-right mt-1">10:32 AM</span>
                      </div>

                      {/* Bubble 4 (Right) */}
                      <div className="bg-[#d9fdd3] text-slate-800 rounded-lg p-2 max-w-[75%] self-end shadow-sm border border-emerald-100/50 animate-fade-in delay-700">
                        <p>Perfect, thank you! See you tomorrow. 👍</p>
                        <span className="text-[8px] text-slate-400 float-right mt-1">10:32 AM ✓✓</span>
                      </div>
                    </div>

                    {/* Chat Footer Bar */}
                    <div className="bg-[#f0f0f0] p-2 flex items-center gap-1.5 border-t border-slate-200 shrink-0">
                      <div className="flex-1 bg-white rounded-full px-3 py-1 flex items-center justify-between text-slate-400 text-[10px]">
                        <span>☺ Type a message...</span>
                        <span>📎 📷</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#075e54] flex items-center justify-center text-white text-[10px] shadow-sm">
                        🎤
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Progress Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                <button 
                  onClick={() => setActiveStep(prev => (prev - 1 + steps.length) % steps.length)}
                  className="hover:text-[#00b4d8] transition-colors"
                >
                  ← Prev Step
                </button>
                <div className="flex gap-1.5">
                  {steps.map((_, idx) => (
                    <span 
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                        activeStep === idx ? 'bg-[#00b4d8] w-4' : 'bg-slate-700 hover:bg-slate-500'
                      }`} 
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setActiveStep(prev => (prev + 1) % steps.length)}
                  className="hover:text-[#00b4d8] transition-colors"
                >
                  Next Step →
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Embedded Animations Styling */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </section>
  );
}
