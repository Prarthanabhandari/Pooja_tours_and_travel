import React, { useState } from 'react';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';

const DEFAULT_ROUTE_DATA = {
  title: 'Pune to Mumbai Outstation Cab',
  from: 'Pune',
  to: 'Mumbai',
  faresTable: [
    { type: 'Sedan A/C (Dzire/Etios)', seating: '4 + 1 Chauffeur', oneway: '₹2,500', round: '₹5,000' },
    { type: 'Ertiga A/C (Family SUV)', seating: '6 + 1 Chauffeur', oneway: '₹3,500', round: '₹7,000' },
    { type: 'Kia Carens A/C (Premium)', seating: '6 + 1 Chauffeur', oneway: '₹3,800', round: '₹7,600' },
    { type: 'Tempo Traveller A/C', seating: '17 + 1 Chauffeur', oneway: '₹8,400', round: '₹16,800' }
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
      { type: 'Sedan A/C (Dzire/Etios)', seating: '4 + 1 Chauffeur', oneway: '₹2,500', round: '₹5,000' },
      { type: 'Ertiga A/C (Family SUV)', seating: '6 + 1 Chauffeur', oneway: '₹3,500', round: '₹7,000' },
      { type: 'Kia Carens A/C (Premium)', seating: '6 + 1 Chauffeur', oneway: '₹3,800', round: '₹7,600' },
      { type: 'Tempo Traveller A/C (17-Seater)', seating: '17 + 1 Chauffeur', oneway: '₹8,400', round: '₹16,800' }
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
  const routeData = ROUTES_SPECRAPHIC_FARES_lookup(routeName);
  
  function ROUTES_SPECRAPHIC_FARES_lookup(name) {
    return ROUTES_SPECIFIC_FARES[name] || {
      ...DEFAULT_ROUTE_DATA,
      title: name || DEFAULT_ROUTE_DATA.title
    };
  }

  const [activeTab, setActiveTab] = useState('1-4'); // '1-4', '1-7', '17-20', '32-50'
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);

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

  const handleManualBookingRedirect = (carName) => {
    const isBus = (activeTab === '17-20' || activeTab === '32-50');
    
    setSearchParams({
      ...searchParams,
      bookingType: 'cab', // All outstation packages are vehicle charter bookings (stored in cabs table)
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
      if (ln.includes('wagonr') || ln.includes('dzire') || ln.includes('etios') || ln.includes('brezza') || ln.includes('swift')) {
        kmRate = 13;
      } else if (ln.includes('ertiga') || ln.includes('carens')) {
        kmRate = 16;
      } else if (ln.includes('innova')) {
        kmRate = 20;
      } else if (ln.includes('17-seater') && ln.includes('non-ac')) {
        kmRate = 24;
      } else if (ln.includes('17-seater') || ln.includes('20-seater')) {
        kmRate = 28;
      } else if (ln.includes('32-seater')) {
        kmRate = 52;
      } else if (ln.includes('50-seater')) {
        kmRate = 60;
      }

      setSelectedItem({
        id: dbId,
        name: carName,
        image: isBus ? '🚌' : '🚗',
        price_per_seat: null,
        price_per_km: kmRate,
        exactPrice: null, // calculated in App.jsx outstation rules
        details: isBus ? 'AC Coach' : 'AC Cabin'
      });
      setBookingStep(3); // Go straight to passenger details
      setCurrentPage('booking-flow');
    } else {
      setCurrentPage('home');
    }
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
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(Math.round(sedanOneway - 100)),
          roundPrice: formatPrice(Math.round(sedanRound - 200)),
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
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(Math.round(sedanOneway + 100)),
          roundPrice: formatPrice(Math.round(sedanRound + 200)),
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
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(Math.round(carensOneway + 800)),
          roundPrice: formatPrice(Math.round(carensRound + 1500)),
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
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(Math.round(tempoOneway + 500)),
          roundPrice: formatPrice(Math.round(tempoRound + 1000)),
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
          image: '/white-swift-right.png', // Fallback standard coach placeholder
          seats: '17 Seats',
          bags: '12 Bags',
          ac: 'Blower System',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(Math.round(tempoOneway - 400)),
          roundPrice: formatPrice(Math.round(tempoRound - 800)),
          whatsappText: `Hello Pooja Tours & Travels, I would like to book a 17-Seater Standard Non-AC Tempo Traveller for ${routeData.title}.`
        },
        {
          name: '20-Seater Standard Non-AC Tempo Traveller',
          image: '/17-seat-tempo-traveller-right.png',
          seats: '20 Seats',
          bags: '15 Bags',
          ac: 'Blower System',
          onewayPrice: isOnewayNA ? 'N/A (Round Trip Only)' : formatPrice(Math.round(tempoOneway + 300)),
          roundPrice: formatPrice(Math.round(tempoRound + 600)),
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

  // DEDICATED FULL-PAGE DETAILS VIEW
  if (selectedVehicleDetails) {
    const name = selectedVehicleDetails.name;
    const lowerName = name.toLowerCase();
    
    let kmRate = 13;
    if (lowerName.includes('wagonr') || lowerName.includes('dzire') || lowerName.includes('etios') || lowerName.includes('brezza') || lowerName.includes('swift')) {
      kmRate = 13;
    } else if (lowerName.includes('ertiga') || lowerName.includes('carens')) {
      kmRate = 16;
    } else if (lowerName.includes('innova')) {
      kmRate = 20;
    } else if (lowerName.includes('17-seater') && lowerName.includes('non-ac')) {
      kmRate = 24;
    } else if (lowerName.includes('17-seater') || lowerName.includes('20-seater')) {
      kmRate = 28;
    } else if (lowerName.includes('32-seater')) {
      kmRate = 52;
    } else if (lowerName.includes('50-seater')) {
      kmRate = 60;
    }
    
    const isBusOrTempo = lowerName.includes('seater') || lowerName.includes('bus') || lowerName.includes('coach');
    const oneDayPkgRate = 300 * kmRate;
    const twoDayPkgRate = 600 * kmRate;
    
    return (
      <div className="relative bg-slate-50/30 overflow-hidden w-full flex-1 flex flex-col" style={{ minHeight: '80vh' }}>
        {/* Background Watermark Pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none"
          style={{ 
            backgroundImage: `url('/travel-watermark-clean.png')`,
            backgroundRepeat: 'repeat',
            backgroundSize: '400px 400px'
          }}
        />
        {/* Glowing Blurred Blobs */}
        <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-cyan-200/30 blur-3xl z-0 pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-yellow-100/30 blur-3xl z-0 pointer-events-none" />

        <HeaderBreadcrumbs title={`${name} Details`} setCurrentPage={setCurrentPage} />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1 text-left">
          {/* Back Button */}
          <div className="mb-8">
            <button 
              onClick={() => setSelectedVehicleDetails(null)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 rounded-full text-xs font-black transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm"
            >
              ← Back to Vehicles Comparison
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Vehicle Image & Specs */}
            <div className="md:col-span-5 bg-white/90 backdrop-blur-md border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 flex flex-col items-center">
              <div className="w-full relative group">
                <img 
                  src={selectedVehicleDetails.image} 
                  alt={name} 
                  className="w-auto h-44 object-contain mx-auto mb-6 transform group-hover:-translate-y-1 transition-transform duration-300"
                />
              </div>
              
              <h3 className="text-xs uppercase font-black text-slate-400 tracking-wider mb-3.5">{name} Specifications</h3>
              
              <div className="grid grid-cols-3 gap-3 w-full text-center text-[11px] text-slate-655 font-bold bg-slate-50/50 border border-slate-100 p-4 rounded-2xl">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">Seats</span>
                  <span>{selectedVehicleDetails.seats}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">Bags</span>
                  <span>{selectedVehicleDetails.bags}</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">AC</span>
                  <span>{selectedVehicleDetails.ac}</span>
                </div>
              </div>
              
              <div className="w-full mt-8 space-y-3.5">
                <a 
                  href={`https://wa.me/919623324139?text=${encodeURIComponent(selectedVehicleDetails.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-2xl text-xs font-black shadow-md shadow-emerald-500/10 text-center transition-all block"
                >
                  Book via WhatsApp
                </a>
                <button 
                  onClick={() => handleManualBookingRedirect(selectedVehicleDetails.name)}
                  className="w-full py-3.5 bg-gradient-to-r from-[#00b4d8] to-[#0083b0] hover:from-[#0083b0] hover:to-[#007799] text-white rounded-2xl text-xs font-black shadow-md shadow-[#00b4d8]/10 transition-all cursor-pointer"
                >
                  Book Online Now
                </button>
              </div>
            </div>

            {/* Right Column: Pricing Breakdown & Rules */}
            <div className="md:col-span-7 bg-white/90 backdrop-blur-md border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
              <div>
                <span className="inline-block text-[9px] uppercase font-black text-[#00b4d8] bg-cyan-50 px-2.5 py-1 rounded-md tracking-widest leading-none mb-2">Journey Packages &amp; Rates</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">{name}</h2>
                <p className="text-xs text-slate-500 mt-1.5 font-semibold flex items-center gap-1.5">
                  <span className="text-[#00b4d8] font-black">•</span> Route: <span className="font-bold text-slate-700">{routeData.title}</span>
                </p>
              </div>

              {/* Specific Route Price Table */}
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5">Specific Route Rates</h4>
                <div className="border border-slate-150 rounded-2xl overflow-hidden bg-white/70">
                  <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-150 text-[10px] font-black text-slate-500 uppercase tracking-wider p-3.5">
                    <span>Journey Type</span>
                    <span className="text-right">Rate</span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-slate-100 p-3.5 text-xs font-bold text-slate-855">
                    <span>One-Way Drop</span>
                    <span className="text-right text-emerald-600 font-black">{selectedVehicleDetails.onewayPrice}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5 text-xs font-bold text-slate-855">
                    <span>Round-Trip (1-Day Return)</span>
                    <span className="text-right text-cyan-600 font-black">{selectedVehicleDetails.roundPrice}</span>
                  </div>
                </div>
              </div>

              {/* General Outstation Packages */}
              <div>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5">General Outstation Packages</h4>
                <div className="border border-slate-150 rounded-2xl overflow-hidden bg-white/70">
                  <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-150 text-[10px] font-black text-slate-500 uppercase tracking-wider p-3.5">
                    <span>Package Type</span>
                    <span className="text-right">Estimated Fare</span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-slate-100 p-3.5 text-xs font-semibold text-slate-700">
                    <div>
                      <span className="block font-bold text-slate-800">Base KM Charge</span>
                      <span className="text-[10px] text-slate-400">Charged per actual KM run</span>
                    </div>
                    <span className="text-right font-black text-slate-800 mt-1">₹{kmRate}/km</span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-slate-100 p-3.5 text-xs font-semibold text-slate-700">
                    <div>
                      <span className="block font-bold text-slate-800">1-Day Package</span>
                      <span className="text-[10px] text-slate-400">Min 300 km limit return</span>
                    </div>
                    <span className="text-right font-black text-emerald-600 mt-1">₹{oneDayPkgRate.toLocaleString('en-IN')}/-</span>
                  </div>
                  <div className="grid grid-cols-2 p-3.5 text-xs font-semibold text-slate-700">
                    <div>
                      <span className="block font-bold text-slate-800">2-Day Package</span>
                      <span className="text-[10px] text-slate-400">Min 600 km limit return</span>
                    </div>
                    <span className="text-right font-black text-cyan-600 mt-1">₹{twoDayPkgRate.toLocaleString('en-IN')}/-</span>
                  </div>
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                <div className="bg-[#eefcfc]/40 border border-[#d2f4f7]/50 rounded-2xl p-4">
                  <h4 className="text-[0.65rem] font-black text-[#00b4d8] uppercase tracking-wider mb-2">Inclusion</h4>
                  <ul className="text-[0.62rem] font-semibold text-slate-500 space-y-1">
                    <li>✓ Fuel Charges</li>
                  </ul>
                </div>
                <div className="bg-rose-50/20 border border-rose-100/50 rounded-2xl p-4">
                  <h4 className="text-[0.65rem] font-black text-rose-500 uppercase tracking-wider mb-2">Exclusion</h4>
                  <ul className="text-[0.62rem] font-semibold text-slate-500 space-y-1">
                    <li>✗ Toll Charges</li>
                    <li>✗ Driver Allowance</li>
                    <li>✗ Parking Fees</li>
                    <li>✗ Extra Hours / KM</li>
                    {isBusOrTempo && <li>✗ State Permit</li>}
                  </ul>
                </div>
              </div>

              {/* Important Terms & Rules */}
              <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-5 text-[11px] font-semibold text-amber-900/90 space-y-3">
                <div className="flex gap-2 items-start">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <div>
                    <strong className="text-amber-950 font-black">Driver Allowance:</strong> Driver allowance of ₹300/- per day is charged extra.
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <div>
                    <strong className="text-amber-950 font-black">Tolls &amp; Parking:</strong> Toll taxes, border taxes, state permit (only for buses), and parking fees are paid extra at actuals.
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <div>
                    <strong className="text-amber-950 font-black">Average Limit:</strong> Minimum 300 km daily average running limit applies for all outstation bookings.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

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
                  : 'bg-white hover:bg-slate-50 text-slate-650'
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
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-slate-800">{card.name}</span>
                  <button 
                    onClick={() => setSelectedVehicleDetails(card)}
                    className="p-1 rounded-full text-[#00b4d8] hover:bg-cyan-50 transition-colors flex items-center justify-center cursor-pointer"
                    title="View Package Details & Rates"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
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
                  <span>Seats: {card.seats}</span>
                  <span>Bags: {card.bags}</span>
                  <span>A/C: {card.ac}</span>
                </div>

                {/* Inclusions / Exclusions */}
                <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 mb-6 text-left">
                  <div>
                    <h4 className="text-[0.65rem] font-black text-[#00b4d8] uppercase tracking-wider mb-2">Inclusion</h4>
                    <ul className="text-[0.62rem] font-semibold text-slate-500 space-y-1">
                      <li>✓ Fuel Charges</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[0.65rem] font-black text-rose-500 uppercase tracking-wider mb-2">Exclusion</h4>
                    <ul className="text-[0.62rem] font-semibold text-slate-500 space-y-1">
                      <li>✗ Toll Charges</li>
                      <li>✗ Driver Allowance</li>
                      <li>✗ Parking Fees</li>
                      <li>✗ Extra Hours / KM</li>
                      {(activeTab === '17-20' || activeTab === '32-50') && <li>✗ State Permit</li>}
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
