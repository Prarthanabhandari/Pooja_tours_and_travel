import React from 'react';

export default function FleetSection({ 
  searchParams, 
  setSearchParams,
  setCurrentPage,
  setSelectedRouteName
}) {
  const categories = [
    {
      title: 'Budget Outstation (Swift)',
      desc: 'Clean hatchback for budget outstation & city runs',
      rate: 'From ₹13/km',
      seats: '4+1 Seats',
      bags: '2 Bags',
      ac: 'AC Cabin',
      image: '/white-swift-right.jpg',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a Hatchback (Swift) for my journey.'
    },
    {
      title: 'Family MUV (Ertiga / Similar)',
      desc: 'Best value 6-passenger family tour vehicle',
      rate: 'From ₹16/km',
      seats: '6+1 Seats',
      bags: '4 Bags',
      ac: 'AC Cabin',
      image: '/white-ertiga-right.jpg',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a Family MUV (Ertiga) for my journey.'
    },
    {
      title: 'Premium MUV (Kia Carens)',
      desc: 'Luxury 6-seater MUV with premium cabin comfort',
      rate: 'From ₹16/km',
      seats: '6+1 Seats',
      bags: '4 Bags',
      ac: 'Climate Control',
      image: '/white-carens-right.jpg',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a Premium MUV (Kia Carens) for my journey.'
    },
    {
      title: 'Premium MUV (Innova Crysta)',
      desc: 'Ultimate luxury and absolute highway comfort',
      rate: 'From ₹21/km',
      seats: '7+1 Seats',
      bags: '5 Bags',
      ac: 'Dual AC',
      image: '/white-innova-right.jpg',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a Premium MUV (Innova Crysta) for my journey.'
    },
    {
      title: '17-Seater Luxury Chauffeur Coach',
      desc: 'Ideal for group outings, weddings & corporate tours',
      rate: 'From ₹24/km',
      seats: '17 Seats',
      bags: '12 Bags',
      ac: 'Blower AC',
      image: '/17-seat-tempo-traveller-right.jpg',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a 17-Seater Luxury Chauffeur Coach for my group journey.'
    },
    {
      title: '50-Seater Luxury Bus',
      desc: 'Premium tourist coach for large corporate & family groups',
      rate: 'From ₹48/km',
      seats: '50 Seats',
      bags: '40 Bags',
      ac: 'Climate Control',
      image: '/50-seat-bus-right.jpg',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a 50-Seater Luxury Bus for our group journey.'
    }
  ];

  // Responsive slider state: show 3 cards on desktop, 2 on tablet, 1 on mobile
  const [startIndex, setStartIndex] = React.useState(0);
  const [cardsToShow, setCardsToShow] = React.useState(3);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(3);
      } else if (window.innerWidth >= 768) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, categories.length - cardsToShow);
  const [isHovered, setIsHovered] = React.useState(false);

  // Autoplay carousel logic: advance index every 4.0s, loop back to start at end, pause on hover
  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex, isHovered]);

  // Clamp startIndex when cardsToShow changes
  React.useEffect(() => {
    if (startIndex > maxIndex) {
      setStartIndex(maxIndex);
    }
  }, [cardsToShow, maxIndex, startIndex]);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleCategories = categories.slice(startIndex, startIndex + cardsToShow);

  return (
    <div id="fleet-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
        <div className="text-left max-w-3xl">
          <h2 className="text-3xl font-extrabold text-[#0f172a] sm:text-4xl tracking-tight">
            Our Professional Fleet
          </h2>
          <div className="w-16 h-1 bg-[#00b4d8] mt-4 mb-4 rounded-full"></div>
          <p className="text-lg text-gray-500">
            Clean, fully sanitized cabs driven by experienced local drivers. Choose the perfect ride for your next trip.
          </p>
        </div>
        
        {/* Slider Navigation Arrows (No Emojis) */}
        <div className="flex gap-3 mt-6 md:mt-0">
          <button 
            type="button"
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${
              startIndex === 0 
                ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                : 'border-gray-200 text-[#0f172a] hover:border-[#00b4d8] hover:text-[#00b4d8] hover:scale-105 active:scale-95 shadow-sm'
            }`}
            title="Previous Fleet"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            type="button"
            onClick={handleNext}
            disabled={startIndex >= maxIndex}
            className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${
              startIndex >= maxIndex 
                ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                : 'border-gray-200 text-[#0f172a] hover:border-[#00b4d8] hover:text-[#00b4d8] hover:scale-105 active:scale-95 shadow-sm'
            }`}
            title="Next Fleet"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Cards Slider Wrapper - Smooth horizontal sliding without abrupt snaps */}
      <div className="overflow-hidden w-full mb-12">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ 
            transform: `translateX(-${startIndex * (100 / cardsToShow)}%)`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="w-full shrink-0 px-3"
              style={{ width: `${100 / cardsToShow}%` }}
            >
              <div className="bg-white border border-gray-150 rounded-2xl p-5 flex flex-col justify-between hover:border-[#00b4d8] hover:shadow-[0_12px_30px_rgba(0,180,216,0.08)] transition-all duration-300 group h-full">
                <div>
                  {/* Availability tag */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="flex items-center gap-1.5 text-[0.68rem] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Available
                    </span>
                    <span className="text-[0.68rem] font-bold text-gray-400">Pooja Travels</span>
                  </div>

                  {/* Image box */}
                  <div className="h-52 flex items-center justify-center overflow-hidden mb-6 rounded-xl bg-slate-50/50 p-3 transition-transform duration-500 group-hover:scale-[1.03]">
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="max-h-full max-w-full object-contain transition-all duration-500 scale-110 group-hover:scale-[1.22]"
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-extrabold text-sm text-[#0f172a] mb-1 group-hover:text-[#00b4d8] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[0.72rem] text-gray-400 mb-4 leading-relaxed min-h-[32px]">
                    {cat.desc}
                  </p>

                  {/* Specifications pills (Clean vector icons, no emojis) */}
                  <div className="flex flex-wrap gap-1.5 mb-4 border-t border-b border-slate-50 py-3">
                    <span className="text-[0.62rem] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {cat.seats}
                    </span>
                    <span className="text-[0.62rem] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14a1 1 0 011 1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9a1 1 0 011-1zm3 0V5a2 2 0 012-2h4a2 2 0 012 2v3" />
                      </svg>
                      {cat.bags}
                    </span>
                    <span className="text-[0.62rem] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3m15.5-6.5l-13 13m0-13l13 13" />
                      </svg>
                      {cat.ac}
                    </span>
                  </div>
                </div>

                <div>
                  {/* Rate */}
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-[0.65rem] uppercase tracking-wider text-gray-400 font-bold">Est. Rate</span>
                    <span className="text-sm font-extrabold text-[#ea580c]">{cat.rate}</span>
                  </div>

                  {/* Book Button (Clean vector arrow, no emojis) */}
                  {/* Book Button */}
                  <button 
                    onClick={() => {
                      if (setSelectedRouteName && setCurrentPage) {
                        setSelectedRouteName('Pune ⇄ Mumbai Airport Drops'); // Open default route
                        setCurrentPage('route-details');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="w-full py-2 bg-gradient-to-r from-[#00b4d8] to-[#0083b0] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 hover:from-[#ea580c] hover:to-[#d04a00] active:scale-95 transition-all shadow-sm shadow-[#00b4d8]/10"
                    style={{ cursor: 'pointer' }}
                  >
                    <span>Book Now</span>
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button 
          className="px-6 py-2.5 border border-slate-200 text-[#0f172a] hover:bg-[#00b4d8] hover:text-white hover:border-[#00b4d8] text-xs font-bold rounded-xl active:scale-95 transition-all shadow-sm"
          onClick={() => {
            setSearchParams({ ...searchParams, bookingType: 'bus' });
            document.getElementById('booking-console')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore Full Fleet Details
        </button>
      </div>
    </div>
  );
}
