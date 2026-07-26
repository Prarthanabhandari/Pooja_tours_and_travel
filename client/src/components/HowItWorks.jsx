import React, { useState } from 'react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(3); // Default highlighted step matches step 04 from screenshot

  const steps = [
    { 
      step: '01', 
      title: 'Select Destination', 
      desc: 'Choose your pickup city, travel dates, and select whether you want a private cab or bus seats.',
    },
    { 
      step: '02', 
      title: 'Choose Vehicle', 
      desc: 'Select the perfect vehicle from our clean, sanitized fleet (WagonR, Brezza, Innovas, Carens, or Buses).',
    },
    { 
      step: '03', 
      title: 'Enter Trip Details', 
      desc: 'Provide pickup times, contact details, and any specific route stops or instructions for the driver.',
    },
    { 
      step: '04', 
      title: 'Confirm via WhatsApp', 
      desc: 'Receive immediate confirmation of pricing, vehicle allocation, and driver coordinates right on your chat.',
    }
  ];

  return (
    <section 
      id="how-it-works-section" 
      className="py-16 bg-white w-full overflow-hidden relative"
    >
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:16px_24px] pointer-events-none" />

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
            Book your clean, comfortable outstation cab or bus in 4 quick and easy steps.
          </p>
        </div>

        {/* Split Screen Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center font-body">
          
          {/* Left Column: Vertical Stepper Timeline */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            {steps.map((node, idx) => {
              const isActive = activeStep === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative flex items-start gap-4 p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${
                    isActive 
                      ? 'bg-white border-[#00b4d8]/30 shadow-[0_10px_35px_rgba(0,180,216,0.06)] scale-[1.02]' 
                      : 'bg-transparent border-transparent hover:bg-slate-50/50'
                  }`}
                >
                  {/* Left timeline connection line */}
                  {idx < steps.length - 1 && (
                    <div className="absolute left-[34px] top-[64px] bottom-[-24px] w-0.5 bg-slate-200 hidden lg:block pointer-events-none" />
                  )}

                  {/* Step Number Circle */}
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#00b4d8] text-white border-[#00b4d8] shadow-md shadow-[#00b4d8]/20 scale-105' 
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
                        isActive ? 'text-slate-500 font-medium' : 'text-slate-400'
                      }`}
                    >
                      {node.desc}
                    </p>
                  </div>

                  {/* Highlight Right Arrow icon (visible when active) */}
                  {isActive && (
                    <div className="w-5 h-5 flex items-center justify-center text-[#00b4d8] self-center">
                      <svg className="w-4 h-4 transform translate-x-0 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Sticker Collage (Circles separated) */}
          <div className="lg:col-span-7 flex items-center justify-center select-none">
            <div className="w-full relative aspect-[4/3] flex items-center justify-center bg-transparent">
              
              {/* Soft warm circular backdrop accent behind the circles */}
              <div className="absolute right-[10%] top-[15%] w-[65%] h-[65%] bg-amber-100/40 rounded-full blur-xl pointer-events-none" />

              {/* 1. Main Traveler Cutout (Left) - Points up, blends with solid white page background */}
              <img 
                src="/how%20it%20works/Turista%20perdido.jpg" 
                alt="Tourist pointing up" 
                className="absolute left-[5%] bottom-0 h-[95%] w-[42%] object-contain mix-blend-multiply" 
              />

              {/* 2. Small Top Circle (Hiker / Cliff View) - Shifted left to right-[38%] to separate */}
              <div className="absolute top-[12%] right-[38%] w-[24%] aspect-square rounded-full overflow-hidden border-4 border-white shadow-md z-10">
                <img 
                  src="/how%20it%20works/How%20to%20Transform%20You%20Car%20for%20Your%20Road%20Trip_%20The%20Best%20Equipment%20Revealed.jpg" 
                  alt="Scenic cliff view" 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* 3. Large Bottom Circle (Globe & Girl on Suitcase) - Shifted right to right-[2%] to separate */}
              <div className="absolute bottom-[8%] right-[2%] w-[44%] aspect-square rounded-full overflow-hidden border-4 border-white shadow-xl z-20">
                <img 
                  src="/how%20it%20works/10%20Best%20New%20Year%20Getaways%20To%20Begin%20This%20Wonderful%20New%20Year!.jpg" 
                  alt="Girl on suitcase and globe" 
                  className="w-full h-full object-cover object-top scale-[1.08] translate-y-[-4%]" 
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
