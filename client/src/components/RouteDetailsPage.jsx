import React, { useState } from 'react';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';

const DEFAULT_ROUTE_DATA = {
  title: 'Pune to Mumbai Outstation Cab',
  from: 'Pune',
  to: 'Mumbai',
  faresTable: [
    { type: 'Sedan A/C (Dzire/Etios)', seating: '4 + 1 Chauffeur', oneway: '₹2,200', round: '₹4,400' },
    { type: 'Ertiga A/C (Family SUV)', seating: '6 + 1 Chauffeur', oneway: '₹3,000', round: '₹6,000' },
    { type: 'Kia Carens A/C (Premium)', seating: '6 + 1 Chauffeur', oneway: '₹3,500', round: '₹7,000' },
    { type: 'Tempo Traveller A/C', seating: '17 + 1 Chauffeur', oneway: '₹6,500', round: '₹12,500' }
  ]
};

const ROUTES_SPECIFIC_FARES = {
  'Pune ⇄ Shirdi Darshan': {
    title: 'Pune to Shirdi Darshan Tour',
    from: 'Pune',
    to: 'Shirdi',
    faresTable: [
      { type: 'Sedan A/C (Dzire/Etios)', seating: '4 + 1 Chauffeur', oneway: '₹2,400', round: '₹4,800' },
      { type: 'Ertiga A/C (Family SUV)', seating: '6 + 1 Chauffeur', oneway: '₹3,200', round: '₹6,400' },
      { type: 'Kia Carens A/C (Premium)', seating: '6 + 1 Chauffeur', oneway: '₹3,800', round: '₹7,600' },
      { type: 'Tempo Traveller A/C (17-Seater)', seating: '17 + 1 Chauffeur', oneway: '₹7,000', round: '₹14,000' }
    ]
  },
  'Pune ⇄ Mahabaleshwar Scenic Tour': {
    title: 'Pune to Mahabaleshwar Scenic Tour',
    from: 'Pune',
    to: 'Mahabaleshwar',
    faresTable: [
      { type: 'Sedan A/C (Dzire/Etios)', seating: '4 + 1 Chauffeur', oneway: '₹3,500', round: '₹6,800' },
      { type: 'Ertiga A/C (Family SUV)', seating: '6 + 1 Chauffeur', oneway: '₹4,500', round: '₹8,500' },
      { type: 'Kia Carens A/C (Premium)', seating: '6 + 1 Chauffeur', oneway: '₹5,000', round: '₹9,500' },
      { type: 'Tempo Traveller A/C (17-Seater)', seating: '17 + 1 Chauffeur', oneway: '₹8,500', round: '₹16,500' }
    ]
  },
  'Pune ⇄ Mumbai Airport Drops': {
    title: 'Pune to Mumbai Airport Drops',
    from: 'Pune',
    to: 'Mumbai Airport',
    faresTable: [
      { type: 'Sedan A/C (Dzire/Etios)', seating: '4 + 1 Chauffeur', oneway: '₹2,200', round: '₹4,400' },
      { type: 'Ertiga A/C (Family SUV)', seating: '6 + 1 Chauffeur', oneway: '₹3,000', round: '₹6,000' },
      { type: 'Kia Carens A/C (Premium)', seating: '6 + 1 Chauffeur', oneway: '₹3,500', round: '₹7,000' },
      { type: 'Tempo Traveller A/C (17-Seater)', seating: '17 + 1 Chauffeur', oneway: '₹6,500', round: '₹12,500' }
    ]
  },
  'Pune ⇄ Ashtavinayak Yatra': {
    title: 'Pune to Ashtavinayak Yatra',
    from: 'Pune',
    to: '8 Ganesha Temples',
    faresTable: [
      { type: 'Sedan A/C (Dzire/Etios)', seating: '4 + 1 Chauffeur', oneway: 'N/A (Round Trip Only)', round: '₹7,500' },
      { type: 'Ertiga A/C (Family SUV)', seating: '6 + 1 Chauffeur', oneway: 'N/A (Round Trip Only)', round: '₹9,800' },
      { type: 'Kia Carens A/C (Premium)', seating: '6 + 1 Chauffeur', oneway: 'N/A (Round Trip Only)', round: '₹11,000' },
      { type: 'Tempo Traveller A/C (17-Seater)', seating: '17 + 1 Chauffeur', oneway: 'N/A (Round Trip Only)', round: '₹19,000' }
    ]
  },
  'Pune ⇄ Goa Beach Special': {
    title: 'Pune to Goa Beach Special Tour',
    from: 'Pune',
    to: 'Goa',
    faresTable: [
      { type: 'Sedan A/C (Dzire/Etios)', seating: '4 + 1 Chauffeur', oneway: '₹9,000', round: '₹16,000' },
      { type: 'Ertiga A/C (Family SUV)', seating: '6 + 1 Chauffeur', oneway: '₹11,500', round: '₹21,000' },
      { type: 'Kia Carens A/C (Premium)', seating: '6 + 1 Chauffeur', oneway: '₹13,000', round: '₹24,000' },
      { type: 'Tempo Traveller A/C (17-Seater)', seating: '17 + 1 Chauffeur', oneway: '₹22,000', round: '₹38,500' }
    ]
  }
};

export default function RouteDetailsPage({ 
  routeName, 
  setCurrentPage, 
  setSearchParams, 
  searchParams,
  setSelectedItem,
  setBookingStep
}) {
  const routeData = ROUTES_SPECIFIC_FARES[routeName] || {
    ...DEFAULT_ROUTE_DATA,
    title: routeName || DEFAULT_ROUTE_DATA.title
  };

  const [activeTab, setActiveTab] = useState('1-4'); // '1-4', '1-7', '17-20', '32-50'

  // Tabs structure matching updated 13 fleets
  const categoryTabs = [
    { slug: '1-4', label: '1-4 Passengers (Hatchback/Sedan/SUV)' },
    { slug: '1-7', label: '1-7 Passengers (Ertiga/Carens/Innova)' },
    { slug: '17-20', label: '17-20 Seater (Tempo Traveller)' },
    { slug: '32-50', label: '32-50 Seater (Tourist Bus)' }
  ];

  const parsePrice = (priceStr) => {
    if (!priceStr || priceStr.includes('N/A')) return 0;
    return parseInt(priceStr.replace(/[^\d]/g, ''));
  };

  const formatPrice = (priceVal) => {
    if (!priceVal || priceVal <= 0) return 'N/A';
    return `₹${priceVal.toLocaleString('en-IN')}`;
  };

  // Helper to retrieve prices for current active tab (handles all 13 vehicles dynamically)
  const getFaresForTab = () => {
    const table = routeData.faresTable;
    
    // Base prices
    const sedanOneway = parsePrice(table[0]?.oneway);
    const sedanRound = parsePrice(table[0]?.round);
    
    const ertigaOneway = parsePrice(table[1]?.oneway);
    const ertigaRound = parsePrice(table[1]?.round);
    
    const carensOneway = parsePrice(table[2]?.oneway);
    const carensRound = parsePrice(table[2]?.round);
    
    const tempoOneway = parsePrice(table[3]?.oneway);
    const tempoRound = parsePrice(table[3]?.round);

    const isOnewayNA = table[0]?.oneway && table[0].oneway.includes('N/A');

    if (activeTab === '1-4') {
      return [
        {
          name: 'Suzuki Swift (Hatchback)',
          image: '/white-swift-right.png',
          seats: '4 Seats',
          bags: '2 Bags',
          ac: 'AC Cabin',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(sedanOneway - 100),
          roundPrice: formatPrice(sedanRound - 200),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a Suzuki Swift for ${routeData.title}.`
        },
        {
          name: 'Suzuki Dzire (Sedan)',
          image: '/white-swift.png',
          seats: '4 Seats',
          bags: '2 Bags',
          ac: 'AC Cabin',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(sedanOneway),
          roundPrice: formatPrice(sedanRound),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a Suzuki Dzire for ${routeData.title}.`
        },
        {
          name: 'Toyota Etios (Comfort Sedan)',
          image: '/white-swift-right.png',
          seats: '4 Seats',
          bags: '3 Bags',
          ac: 'AC Cabin',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(sedanOneway),
          roundPrice: formatPrice(sedanRound),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a Toyota Etios for ${routeData.title}.`
        },
        {
          name: 'Maruti Brezza (Comfort SUV)',
          image: '/white-brezza-right.png',
          seats: '4 Seats',
          bags: '3 Bags',
          ac: 'AC Cabin',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(sedanOneway + 100),
          roundPrice: formatPrice(sedanRound + 200),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a Maruti Brezza for ${routeData.title}.`
        }
      ];
    } else if (activeTab === '1-7') {
      return [
        {
          name: 'Maruti Ertiga (Family MUV)',
          image: '/white-ertiga-right.png',
          seats: '6 Seats',
          bags: '4 Bags',
          ac: 'AC Cabin',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(ertigaOneway),
          roundPrice: formatPrice(ertigaRound),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a Maruti Ertiga for ${routeData.title}.`
        },
        {
          name: 'Kia Carens (Comfort SUV)',
          image: '/white-carens-right.png',
          seats: '6 Seats',
          bags: '4 Bags',
          ac: 'Climate Control',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(carensOneway),
          roundPrice: formatPrice(carensRound),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a Kia Carens for ${routeData.title}.`
        },
        {
          name: 'Toyota Innova Crysta (Comfort MUV)',
          image: '/white-innova-right.png',
          seats: '7 Seats',
          bags: '5 Bags',
          ac: 'Dual AC',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(carensOneway + 800),
          roundPrice: formatPrice(carensRound + 1500),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a Toyota Innova Crysta for ${routeData.title}.`
        }
      ];
    } else if (activeTab === '17-20') {
      return [
        {
          name: '17-Seater Premium AC Tempo Traveller',
          image: '/17-seat-tempo-traveller-right.png',
          seats: '17 Seats',
          bags: '12 Bags',
          ac: 'Premium Dual AC',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(tempoOneway + 500),
          roundPrice: formatPrice(tempoRound + 1000),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a 17-Seater Premium AC Tempo Traveller for ${routeData.title}.`
        },
        {
          name: '17-Seater Executive AC Tempo Traveller',
          image: '/17-seat-tempo-traveller.png',
          seats: '17 Seats',
          bags: '12 Bags',
          ac: 'Standard AC',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(tempoOneway),
          roundPrice: formatPrice(tempoRound),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a 17-Seater Executive AC Tempo Traveller for ${routeData.title}.`
        },
        {
          name: '17-Seater Standard Non-AC Tempo Traveller',
          image: '/17-seat-tempo-traveller-right.jpg',
          seats: '17 Seats',
          bags: '12 Bags',
          ac: 'Blower System',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(tempoOneway - 1000),
          roundPrice: formatPrice(tempoRound - 2000),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a 17-Seater Standard Non-AC Tempo Traveller for ${routeData.title}.`
        },
        {
          name: '20-Seater Standard Non-AC Tempo Traveller',
          image: '/17-seat-tempo-traveller-right.jpg',
          seats: '20 Seats',
          bags: '15 Bags',
          ac: 'Blower System',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(tempoOneway - 500),
          roundPrice: formatPrice(tempoRound - 1000),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a 20-Seater Standard Non-AC Tempo Traveller for ${routeData.title}.`
        }
      ];
    } else {
      return [
        {
          name: '32-Seater Comfort Tourist Coach',
          image: '/50-seat-bus-right.png',
          seats: '32 Seats',
          bags: '25 Bags',
          ac: 'Air Suspension',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(Math.round(tempoOneway * 1.5)),
          roundPrice: formatPrice(Math.round(tempoRound * 1.5)),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a 32-Seater Comfort Tourist Coach for ${routeData.title}.`
        },
        {
          name: '50-Seater Comfort Tourist Bus',
          image: '/50-seat-bus-right.png',
          seats: '50 Seats',
          bags: '40 Bags',
          ac: 'Climate Control',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(Math.round(tempoOneway * 2.0)),
          roundPrice: formatPrice(Math.round(tempoRound * 2.0)),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a 50-Seater Comfort Tourist Bus for ${routeData.title}.`
        }
      ];
    }
  };

  const activeFares = getFaresForTab();

  const handleManualBookingRedirect = (carName) => {
    const isBus = (activeTab === '17-20' || activeTab === '32-50');
    const card = activeFares.find(f => f.name === carName) || {};
    
    // Choose one-way or round-trip price based on trip type selection
    const priceStr = (searchParams.tripType === 'roundtrip') ? card.roundPrice : card.onewayPrice;
    const finalPrice = parsePrice(priceStr) || parsePrice(card.onewayPrice) || parsePrice(card.roundPrice);

    setSearchParams({
      ...searchParams,
      bookingType: isBus ? 'bus' : 'cab',
      fromCity: searchParams.fromCity || 'Pune, Maharashtra, India',
      toCity: routeData.to + ', Maharashtra, India'
    });

    if (setSelectedItem && setBookingStep) {
      let dbId = 1;
      const ln = carName.toLowerCase();
      if (ln.includes('wagonr')) dbId = 1;
      else if (ln.includes('brezza')) dbId = 2;
      else if (ln.includes('dzire')) dbId = 3;
      else if (ln.includes('etios')) dbId = 4;
      else if (ln.includes('ertiga')) dbId = 5;
      else if (ln.includes('carens')) dbId = 6;
      else if (ln.includes('innova')) dbId = 7;
      else if (ln.includes('17-seater') && (ln.includes('premium') || ln.includes('executive'))) dbId = 8;
      else if (ln.includes('17-seater') && ln.includes('non-ac')) dbId = 9;
      else if (ln.includes('20-seater')) dbId = 10;
      else if (ln.includes('32-seater')) dbId = 11;
      else if (ln.includes('50-seater')) dbId = 12;

      let kmRate = 13;
      const lowerName = carName.toLowerCase();
      if (lowerName.includes('wagonr') || lowerName.includes('dzire') || lowerName.includes('etios') || lowerName.includes('brezza') || lowerName.includes('swift')) {
        kmRate = 13;
      } else if (lowerName.includes('ertiga') || lowerName.includes('carens')) {
        kmRate = 16;
      } else if (lowerName.includes('innova')) {
        kmRate = 21;
      } else if (lowerName.includes('17-seater') && lowerName.includes('non-ac')) {
        kmRate = 24;
      } else if (lowerName.includes('17-seater') || lowerName.includes('20-seater')) {
        kmRate = 26;
      } else if (lowerName.includes('32-seater')) {
        kmRate = 35;
      } else if (lowerName.includes('50-seater')) {
        kmRate = 48;
      }

      setSelectedItem({
        id: dbId,
        name: carName,
        image: isBus ? '🚌' : '🚗',
        price_per_seat: isBus ? finalPrice : null,
        price_per_km: !isBus ? kmRate : null,
        exactPrice: finalPrice,
        details: (card.seats || '') + ' | ' + (card.bags || '') + ' | ' + (card.ac || '')
      });
      setBookingStep(3); // Go straight to passenger details
      setCurrentPage('booking-flow');
    } else {
      setCurrentPage('home');
    }
  };

  return (
    <div className="relative bg-slate-50/30 overflow-hidden w-full flex-1 flex flex-col" style={{ minHeight: '80vh' }}>
      
      {/* Background Watermark Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{ 
          backgroundImage: `url('/travel-watermark-clean.png')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px'
        }}
      />
      <div className="absolute top-[10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-cyan-200/20 blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-yellow-100/20 blur-3xl z-0 pointer-events-none" />

      {/* Breadcrumbs Header */}
      <HeaderBreadcrumbs title={routeData.title} setCurrentPage={setCurrentPage} />

      {/* Main Grid Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-3">
            <svg className="w-3.5 h-3.5 text-[#00b4d8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span>Fares &amp; Fleet Selection</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
            Compare Cabs for <span className="text-[#00b4d8]">{routeData.title}</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-xl mx-auto leading-relaxed">
            Choose your vehicle type, compare pricing, check inclusions, and book directly.
          </p>
        </div>

        {/* Seating category tabs in one horizontal row */}
        <div className="flex justify-center items-center flex-wrap md:flex-nowrap gap-2 mb-8 bg-white border border-slate-200/50 p-2 rounded-2xl max-w-5xl mx-auto shadow-sm">
          {categoryTabs.map(tab => (
            <button
              key={tab.slug}
              onClick={() => setActiveTab(tab.slug)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === tab.slug
                  ? 'bg-[#00b4d8] text-white shadow-sm shadow-[#00b4d8]/40'
                  : 'bg-white hover:bg-slate-50 text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12 justify-center">
          {activeFares.map((card, idx) => (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="p-3 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <span className="text-xs font-black text-slate-800">{card.name}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[0.62rem] font-bold uppercase tracking-wider">Available</span>
              </div>
              
              <div className="p-6 flex-1 flex flex-col items-center">
                <img 
                  src={card.image} 
                  alt={card.name} 
                  className="w-auto h-32 object-contain mb-4 transition-transform hover:scale-103"
                />
                
                {/* Vehicle parameters strip */}
                <div className="flex justify-center gap-4 text-slate-500 text-[0.65rem] font-bold mb-6">
                  <span className="flex items-center gap-1"><span className="text-slate-400">👤</span> {card.seats}</span>
                  <span className="flex items-center gap-1"><span className="text-slate-400">🧳</span> {card.bags}</span>
                  <span className="flex items-center gap-1"><span className="text-slate-400">❄️</span> {card.ac}</span>
                </div>

                {/* Inclusions / Exclusions */}
                <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 mb-6">
                  <div>
                    <h4 className="text-[0.65rem] font-black text-[#00b4d8] uppercase tracking-wider mb-2">Inclusion</h4>
                    <ul className="text-[0.62rem] font-semibold text-slate-500 space-y-1">
                      <li>✓ Fuel Charges</li>
                      <li>✓ Toll Charges</li>
                      <li>✓ Driver Allowance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[0.65rem] font-black text-rose-500 uppercase tracking-wider mb-2">Exclusion</h4>
                    <ul className="text-[0.62rem] font-semibold text-slate-500 space-y-1">
                      <li>✗ State Permit (if any)</li>
                      <li>✗ Parking Fees</li>
                      <li>✗ Extra Hours / KM</li>
                    </ul>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-t border-slate-100 pt-4 mt-auto gap-3">
                  <div className="flex flex-col text-left">
                    <span className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-wider">Estimated Fare</span>
                    <span className="text-sm font-black text-slate-800">{card.onewayPrice}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <a 
                      href={`https://wa.me/919623324139?text=${encodeURIComponent(card.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black shadow-sm shadow-emerald-500/20 hover:bg-emerald-600 transition-colors text-center"
                    >
                      WhatsApp Book
                    </a>
                    <button 
                      onClick={() => handleManualBookingRedirect(card.name)}
                      className="px-4 py-2 bg-[#00b4d8] text-white rounded-xl text-xs font-black shadow-sm shadow-[#00b4d8]/20 hover:bg-[#0083b0] transition-colors text-center"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fares comparison table matching reference layout */}
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 text-center mb-6">
            {routeData.title} Cab Charges
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-3 px-4 text-xs font-black text-[#00b4d8] uppercase tracking-wider">Car Type</th>
                  <th className="py-3 px-4 text-xs font-black text-[#00b4d8] uppercase tracking-wider">Seating</th>
                  <th className="py-3 px-4 text-xs font-black text-[#00b4d8] uppercase tracking-wider">One-Way Fare</th>
                  <th className="py-3 px-4 text-xs font-black text-[#00b4d8] uppercase tracking-wider">Round-Trip Fare</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-semibold text-slate-650">
                {routeData.faresTable.map((fare, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-bold text-slate-800">{fare.type}</td>
                    <td className="py-3.5 px-4">{fare.seating}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">{fare.oneway}</td>
                    <td className="py-3.5 px-4 font-bold text-cyan-600">{fare.round}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className="text-[0.68rem] text-slate-400 font-semibold mt-6 text-center">
            * Note: Tolls and driver allowance are included. Local state tax and parking fees are charged extra where applicable.
          </p>
        </div>

      </div>

    </div>
  );
}
