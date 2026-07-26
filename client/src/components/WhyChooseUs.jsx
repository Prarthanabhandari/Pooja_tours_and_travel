import React, { useState } from 'react';

export default function WhyChooseUs() {
  const [activeFeatureIdx, setActiveFeatureIdx] = useState(null);

  const features = [
    {
      title: 'Curated Tours',
      shortDesc: 'Curated tours, custom routes and experiences.',
      longDesc: 'We offer customized travel itineraries tailored precisely to your schedule. We design specific tour circuits including Ashtavinayak pilgrimage runs, Mahabaleshwar hill station packages, Goa beach tours, corporate employee commutes, and wedding event guest transits.',
      icon: (
        <svg className="w-9 h-9 text-slate-800 group-hover:text-teal-650 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      )
    },
    {
      title: 'Expert Guides',
      shortDesc: 'Experienced drivers with local expertise.',
      longDesc: 'Your peace of mind is our priority. Every cab in our fleet is fully integrated with live GPS tracking. We enforce strict vehicle cleanliness guidelines, and all of our professional chauffeurs are fully verified and locally experienced for a secure highway journey.',
      icon: (
        <svg className="w-9 h-9 text-slate-800 group-hover:text-teal-650 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
          <path d="M12 2v1" />
        </svg>
      )
    },
    {
      title: '24/7 Support',
      shortDesc: "We're here to help, anytime.",
      longDesc: 'Our dedicated customer service desk is operational round-the-clock (24/7). Whether you need to book a late-night cab, modify an existing booking, coordinate driver details, or require roadside assistance, our team is just a quick call or WhatsApp message away.',
      icon: (
        <svg className="w-9 h-9 text-slate-800 group-hover:text-teal-650 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      )
    },
    {
      title: 'Best Price Guarantee',
      shortDesc: 'Get the best rates or we match it.',
      longDesc: 'We are committed to providing premium travel services at the most competitive rates in Maharashtra. We offer completely transparent outstation packages, local tours, and airport drops with absolutely zero hidden charges, driver allowances included, and no surprise costs.',
      icon: (
        <svg className="w-9 h-9 text-slate-800 group-hover:text-teal-650 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M9.5 10h5a2.5 2.5 0 0 1 0 5H9" />
        </svg>
      )
    }
  ];

  return (
    <section id="why-us-section" className="py-12 bg-[#e8f6f6] w-full select-none relative overflow-visible">
      
      {/* Transparent Clickcatcher Backdrop to close active popovers when clicking outside */}
      {activeFeatureIdx !== null && (
        <div 
          className="fixed inset-0 z-[90] bg-transparent cursor-default" 
          onClick={() => setActiveFeatureIdx(null)}
        />
      )}

      <style>{`
        /* Popover Spring Animation */
        @keyframes popoverSpring {
          0% { transform: translate(-50%, 12px) scale(0.92); opacity: 0; }
          70% { transform: translate(-50%, -2px) scale(1.02); opacity: 0.9; }
          100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
        }

        .animate-popover {
          animation: popoverSpring 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Elegant Serif Header matching Wanderlust Journeys style */}
        <h2 className="text-2xl sm:text-3xl font-serif text-slate-800 tracking-wide mb-1 select-text">
          Why Choose Pooja Tours & Travels?
        </h2>
        <div className="w-12 h-[1px] bg-slate-400 mx-auto mt-3 mb-8 opacity-60" />

        {/* Minimal Flat Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 justify-center items-start">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              onClick={(e) => {
                e.stopPropagation();
                setActiveFeatureIdx(activeFeatureIdx === idx ? null : idx);
              }}
              className="group flex flex-col items-center text-center cursor-pointer transition-all active:scale-[0.98] w-full relative"
            >
              
              {/* Thin Line-Art Icon without frames or tiles */}
              <div className="w-14 h-14 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                {feat.icon}
              </div>

              {/* Text Alignment & Details */}
              <h3 className="font-bold text-slate-800 text-[0.8rem] mt-3 uppercase tracking-wider group-hover:text-teal-700 transition-colors duration-200">
                {feat.title}
              </h3>
              <p className="text-[0.7rem] text-slate-500/90 leading-relaxed mt-2 max-w-[210px] mx-auto font-medium">
                {feat.shortDesc}
              </p>

              {/* Popover Bubble floating directly above the specific clicked line-art icon */}
              {activeFeatureIdx === idx && (
                <div 
                  className="absolute bottom-[115%] left-1/2 -translate-x-1/2 w-[290px] sm:w-[330px] bg-white border border-slate-100 rounded-2xl shadow-[0_20px_45px_-10px_rgba(20,60,140,0.18),0_10px_20px_-10px_rgba(0,0,0,0.05),inset_0_1px_1px_#fff] p-5 z-[100] animate-popover text-left cursor-default"
                  style={{ transformOrigin: 'bottom center' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Pointing Caret Arrow */}
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45" />

                  {/* Header Row */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.58rem] font-black bg-blue-50 text-[#1a56db] uppercase tracking-wider">
                      ✨ Verified Promise
                    </span>
                    {/* Close button inside popover */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveFeatureIdx(null);
                      }}
                      className="text-slate-400 hover:text-slate-650 hover:bg-slate-50 p-1 rounded-full transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Popover content block */}
                  <h4 className="text-[0.74rem] font-black text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <span className="text-[0.8rem]">🛡️</span> {feat.title}
                  </h4>
                  <p className="text-[0.66rem] text-slate-500 font-semibold leading-relaxed mt-2 pl-5">
                    {feat.longDesc}
                  </p>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
