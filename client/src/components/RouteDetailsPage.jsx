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

export default function RouteDetailsPage({ routeName, setCurrentPage, setSearchParams, searchParams }) {
  const routeData = ROUTES_SPECIFIC_FARES[routeName] || {
    ...DEFAULT_ROUTE_DATA,
    title: routeName || DEFAULT_ROUTE_DATA.title
  };

  const [activeTab, setActiveTab] = useState('1-4'); // '1-4', '1-6', '17'

  // Tabs structure matching pawartravels style
  const categoryTabs = [
    { slug: '1-4', label: '1-4 Passengers (Sedan)' },
    { slug: '1-6', label: '1-6 Passengers (Ertiga/Carens)' },
    { slug: '17', label: '17 Seater (Tempo Traveller)' }
  ];

  // Helper to retrieve prices for current active tab
  const getFaresForTab = () => {
    const table = routeData.faresTable;
    if (activeTab === '1-4') {
      return {
        card1: {
          name: 'Sedan (Suzuki Dzire / Similar)',
          image: '/white-swift-right.png',
          seats: '4 Seats',
          bags: '2 Bags',
          ac: 'AC Cabin',
          onewayPrice: table[0].oneway,
          roundPrice: table[0].round,
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a Sedan (Dzire) for ${routeData.title}.`
        },
        card2: {
          name: 'Premium Sedan (Toyota Etios / Similar)',
          image: '/white-swift.png',
          seats: '4 Seats',
          bags: '3 Bags',
          ac: 'AC Cabin',
          onewayPrice: table[0].oneway !== 'N/A (Round Trip Only)' ? `₹${parseInt(table[0].oneway.replace(/[^\d]/g, '')) + 200}` : 'N/A',
          roundPrice: `₹${parseInt(table[0].round.replace(/[^\d]/g, '')) + 400}`,
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a Premium Sedan (Etios) for ${routeData.title}.`
        }
      };
    } else if (activeTab === '1-6') {
      return {
        card1: {
          name: 'Family SUV (Maruti Ertiga / Similar)',
          image: '/white-ertiga-right.png',
          seats: '6 Seats',
          bags: '4 Bags',
          ac: 'AC Cabin',
          onewayPrice: table[1].oneway,
          roundPrice: table[1].round,
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a Family SUV (Ertiga) for ${routeData.title}.`
        },
        card2: {
          name: 'Premium SUV (Kia Carens)',
          image: '/white-carens-right.jpg',
          seats: '6 Seats',
          bags: '4 Bags',
          ac: 'Climate Control',
          onewayPrice: table[2].oneway,
          roundPrice: table[2].round,
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a Premium SUV (Kia Carens) for ${routeData.title}.`
        }
      };
    } else {
      return {
        card1: {
          name: 'Tempo Traveller (17-Seater AC)',
          image: '/17-seat-tempo-traveller-right.png',
          seats: '17 Seats',
          bags: '10 Bags',
          ac: 'AC Coach',
          onewayPrice: table[3].oneway,
          roundPrice: table[3].round,
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a 17-Seater AC Tempo Traveller for ${routeData.title}.`
        },
        card2: {
          name: 'Tempo Traveller (17-Seater Non-AC)',
          image: '/17-seat-tempo-traveller.png',
          seats: '17 Seats',
          bags: '10 Bags',
          ac: 'Blower System',
          onewayPrice: table[3].oneway !== 'N/A (Round Trip Only)' ? `₹${parseInt(table[3].oneway.replace(/[^\d]/g, '')) - 1000}` : 'N/A',
          roundPrice: `₹${parseInt(table[3].round.replace(/[^\d]/g, '')) - 2000}`,
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a 17-Seater Non-AC Tempo Traveller for ${routeData.title}.`
        }
      };
    }
  };

  const activeFares = getFaresForTab();

  const handleManualBookingRedirect = (carName) => {
    setSearchParams({
      ...searchParams,
      bookingType: activeTab === '17' ? 'bus' : 'cab',
      fromCity: 'Pune, Maharashtra, India',
      toCity: routeData.to
    });
    setCurrentPage('home');
    setTimeout(() => {
      const searchEl = document.getElementById('search-panel');
      if (searchEl) searchEl.scrollIntoView({ behavior: 'smooth' });
    }, 200);
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

        {/* Seating category tabs matching reference style */}
        <div className="flex justify-center items-center flex-wrap gap-2 mb-8 bg-white border border-slate-200/50 p-2 rounded-2xl max-w-2xl mx-auto shadow-sm">
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

        {/* Comparison Cards (Two columns side by side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          
          {/* Card 1 */}
          <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="p-3 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <span className="text-xs font-black text-slate-800">{activeFares.card1.name}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[0.62rem] font-bold uppercase tracking-wider">Available</span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col items-center">
              <img 
                src={activeFares.card1.image} 
                alt={activeFares.card1.name} 
                className="w-auto h-32 object-contain mb-4 transition-transform hover:scale-103"
              />
              
              {/* Vehicle parameters strip */}
              <div className="flex justify-center gap-4 text-slate-500 text-[0.65rem] font-bold mb-6">
                <span className="flex items-center gap-1"><span className="text-slate-400">👤</span> {activeFares.card1.seats}</span>
                <span className="flex items-center gap-1"><span className="text-slate-400">🧳</span> {activeFares.card1.bags}</span>
                <span className="flex items-center gap-1"><span className="text-slate-400">❄️</span> {activeFares.card1.ac}</span>
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
              <div className="w-full flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-wider">Estimated Fare</span>
                  <span className="text-sm font-black text-slate-800">{activeFares.card1.onewayPrice}</span>
                </div>
                <div className="flex gap-2">
                  <a 
                    href={`https://wa.me/919623324139?text=${encodeURIComponent(activeFares.card1.whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black shadow-sm shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
                  >
                    WhatsApp Book
                  </a>
                  <button 
                    onClick={() => handleManualBookingRedirect(activeFares.card1.name)}
                    className="px-4 py-2 bg-[#00b4d8] text-white rounded-xl text-xs font-black shadow-sm shadow-[#00b4d8]/20 hover:bg-[#0083b0] transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="p-3 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <span className="text-xs font-black text-slate-800">{activeFares.card2.name}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[0.62rem] font-bold uppercase tracking-wider">Available</span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col items-center">
              <img 
                src={activeFares.card2.image} 
                alt={activeFares.card2.name} 
                className="w-auto h-32 object-contain mb-4 transition-transform hover:scale-103"
              />
              
              {/* Vehicle parameters strip */}
              <div className="flex justify-center gap-4 text-slate-500 text-[0.65rem] font-bold mb-6">
                <span className="flex items-center gap-1"><span className="text-slate-400">👤</span> {activeFares.card2.seats}</span>
                <span className="flex items-center gap-1"><span className="text-slate-400">🧳</span> {activeFares.card2.bags}</span>
                <span className="flex items-center gap-1"><span className="text-slate-400">❄️</span> {activeFares.card2.ac}</span>
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
              <div className="w-full flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                <div className="flex flex-col">
                  <span className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-wider">Estimated Fare</span>
                  <span className="text-sm font-black text-slate-800">{activeFares.card2.onewayPrice}</span>
                </div>
                <div className="flex gap-2">
                  <a 
                    href={`https://wa.me/919623324139?text=${encodeURIComponent(activeFares.card2.whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black shadow-sm shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
                  >
                    WhatsApp Book
                  </a>
                  <button 
                    onClick={() => handleManualBookingRedirect(activeFares.card2.name)}
                    className="px-4 py-2 bg-[#00b4d8] text-white rounded-xl text-xs font-black shadow-sm shadow-[#00b4d8]/20 hover:bg-[#0083b0] transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>

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
