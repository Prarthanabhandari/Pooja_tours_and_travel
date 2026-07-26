import React, { useState } from 'react';

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      title: 'Best Price Guarantee',
      shortDesc: 'Get the best deals or we match it.',
      longDesc: 'We are committed to providing premium travel services at the most competitive rates in Maharashtra. We offer completely transparent outstation packages, local tours, and airport drops with absolutely zero hidden charges, driver allowances included, and no surprise costs.',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13"></path>
          <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
        </svg>
      )
    },
    {
      title: 'Secure Booking',
      shortDesc: 'Your data is safe with us.',
      longDesc: 'Your peace of mind is our priority. Every cab in our fleet is fully integrated with live GPS tracking. We enforce strict vehicle cleanliness guidelines, and all of our professional chauffeurs are fully verified and locally experienced for a secure highway journey.',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M9 12l2 2 4-4"></path>
        </svg>
      )
    },
    {
      title: '24/7 Customer Support',
      shortDesc: "We're here to help, anytime.",
      longDesc: 'Our dedicated customer service desk is operational round-the-clock (24/7). Whether you need to book a late-night cab, modify an existing booking, coordinate driver details, or require roadside assistance, our team is just a quick call or WhatsApp message away.',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      )
    },
    {
      title: 'Custom Travel Packages',
      shortDesc: 'Tailored experiences just for you.',
      longDesc: 'Get customized travel itineraries tailored precisely to your schedule. We design specific tour circuits including Ashtavinayak pilgrimage runs, Mahabaleshwar hill station packages, Goa beach tours, corporate employee commutes, and wedding event guest transits.',
      icon: (
        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-10 bg-white w-full overflow-hidden select-none">
      <style>{`
        /* Container section styling */
        .features-bar {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 24px;
          background: #f0f5fd;
          padding: 30px;
          border-radius: 24px;
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.01);
        }

        @media (min-width: 640px) {
          .features-bar {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .features-bar {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
        }

        /* Base 3D Paper Tile */
        .origami-tile {
          position: relative;
          width: 68px;
          height: 68px;
          min-width: 68px;
          background: linear-gradient(135deg, #ffffff 0%, #e6efff 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          /* Dual Floating Shadow + Soft Glow */
          box-shadow: 
            0 12px 24px -6px rgba(20, 60, 140, 0.15),
            0 4px 10px rgba(0, 0, 0, 0.03),
            inset 0 1px 1px rgba(255, 255, 255, 0.9);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .feature-item:hover .origami-tile {
          transform: translateY(-4px) scale(1.04);
        }

        /* 3D Folded Corners */
        .fold {
          position: absolute;
          width: 14px;
          height: 14px;
          background: linear-gradient(135deg, #dbe8fc, #ffffff);
          box-shadow: 
            inset 1px 1px 2px rgba(255, 255, 255, 0.8),
            1px 2px 3px rgba(10, 30, 80, 0.15);
          z-index: 2;
          transition: transform 0.3s ease;
        }

        /* Subtle folds expansion on hover */
        .feature-item:hover .fold-tl { transform: translate(-1px, -1px); }
        .feature-item:hover .fold-tr { transform: translate(1px, -1px); }
        .feature-item:hover .fold-bl { transform: translate(-1px, 1px); }
        .feature-item:hover .fold-br { transform: translate(1px, 1px); }

        /* Top-Left Fold */
        .fold-tl {
          top: 0;
          left: 0;
          border-bottom-right-radius: 6px;
          clip-path: polygon(0 0, 100% 0, 0 100%);
        }

        /* Top-Right Fold */
        .fold-tr {
          top: 0;
          right: 0;
          border-bottom-left-radius: 6px;
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }

        /* Bottom-Left Fold */
        .fold-bl {
          bottom: 0;
          left: 0;
          border-top-right-radius: 6px;
          clip-path: polygon(0 0, 0 100%, 100% 100%);
        }

        /* Bottom-Right Fold */
        .fold-br {
          bottom: 0;
          right: 0;
          border-top-left-radius: 6px;
          clip-path: polygon(100% 0, 0 100%, 100% 100%);
        }

        /* Blue Vector Icon */
        .origami-tile .icon {
          width: 30px;
          height: 30px;
          color: #1a56db;
          position: relative;
          z-index: 3;
          filter: drop-shadow(0 2px 4px rgba(26, 86, 219, 0.2));
        }

        /* Text Content */
        .feature-info h4 {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 800;
          color: #1e293b;
          line-height: 1.25;
          transition: color 0.2s ease;
        }

        .feature-item:hover .feature-info h4 {
          color: #1a56db;
        }

        .feature-info p {
          margin: 4px 0 0 0;
          font-size: 0.76rem;
          font-weight: 600;
          color: #64748b;
          line-height: 1.35;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Features bar layout using user's specific classes */}
        <div className="features-bar">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedFeature(feat)}
              className="feature-item cursor-pointer group active:scale-[0.98] transition-transform duration-200"
            >
              
              {/* Origami/Crumpled Paper Tile */}
              <div className="origami-tile">
                <div className="fold fold-tl"></div>
                <div className="fold fold-tr"></div>
                <div className="fold fold-bl"></div>
                <div className="fold fold-br"></div>
                {feat.icon}
              </div>

              {/* Text Layout */}
              <div className="feature-info">
                <h4>{feat.title}</h4>
                <p>{feat.shortDesc}</p>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Feature Detailed Info Popup Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[200] flex items-center justify-center p-4">
          
          {/* Backdrop clickcatcher */}
          <div 
            onClick={() => setSelectedFeature(null)}
            className="absolute inset-0"
          />

          {/* Modal content box */}
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6 border border-slate-100 flex flex-col items-center text-center relative z-10 animate-fade-in">
            
            {/* Modal Icon Header */}
            <div className="origami-tile mb-6">
              <div className="fold fold-tl"></div>
              <div className="fold fold-tr"></div>
              <div className="fold fold-bl"></div>
              <div className="fold fold-br"></div>
              {selectedFeature.icon}
            </div>

            {/* Title & Long Description */}
            <h3 className="text-base font-black text-slate-800 uppercase tracking-tight">
              {selectedFeature.title}
            </h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-3 px-1">
              {selectedFeature.longDesc}
            </p>

            {/* Close Button */}
            <button
              onClick={() => setSelectedFeature(null)}
              className="mt-6 w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-black shadow-md shadow-orange-500/10 active:scale-95 transition-all"
            >
              Got It, Thanks
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
