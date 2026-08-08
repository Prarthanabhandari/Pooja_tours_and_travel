import React, { useState } from 'react';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';

export default function FleetDetailsPage({ setSearchParams, setCurrentPage, setSelectedItem, setBookingStep }) {
  const fleetVehicles = [
    {
      id: 'swift',
      title: 'Suzuki Swift',
      category: 'Hatchback',
      rate: 'From ₹13/km',
      seats: '4+1 Seats',
      bags: '2 Bags',
      ac: 'AC Cabin',
      image: '/white-swift-right.png',
      description: 'Simple, efficient, and highly reliable. Ideal for budget-conscious solo travelers or small families needing a quick, honest, and clean outstation ride.',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a Suzuki Swift (Hatchback).',
      inclusions: ['Fuel Charges'],
      exclusions: ['Toll Charges', 'Driver Allowance', 'Parking Fees', 'Extra Hours / KM']
    },
    {
      id: 'dzire',
      title: 'Suzuki Dzire',
      category: 'Sedan',
      rate: 'From ₹13/km',
      seats: '4+1 Seats',
      bags: '2 Bags',
      ac: 'AC Cabin',
      image: '/white-swift.png',
      description: 'A beloved family sedan known for comfort and dependability. Features a clean cabin and isolated trunk space. We ensure safe, punctual highway trips with transparent per-kilometer pricing.',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a Suzuki Dzire (Sedan).',
      inclusions: ['Fuel Charges'],
      exclusions: ['Toll Charges', 'Driver Allowance', 'Parking Fees', 'Extra Hours / KM']
    },
    {
      id: 'etios',
      title: 'Toyota Etios',
      category: 'Comfort Sedan',
      rate: 'From ₹13/km',
      seats: '4+1 Seats',
      bags: '3 Bags',
      ac: 'AC Cabin',
      image: '/white-swift-right.png',
      description: 'A highly trusted sedan built for durability and smooth highway cruising. Offers generous legroom and comfortable suspension. Perfect for travelers who value simplicity and reliable service.',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a Toyota Etios (Comfort Sedan).',
      inclusions: ['Fuel Charges'],
      exclusions: ['Toll Charges', 'Driver Allowance', 'Parking Fees', 'Extra Hours / KM']
    },
    {
      id: 'brezza',
      title: 'Maruti Brezza',
      category: 'Comfort SUV',
      rate: 'From ₹13/km',
      seats: '4+1 Seats',
      bags: '3 Bags',
      ac: 'AC Cabin',
      image: '/white-brezza-right.png',
      description: 'A sturdy, compact SUV offering high ground clearance and visibility. Safe and reliable for navigating both town roads and hill stations. Driven by polite drivers who know every route.',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a Maruti Brezza (Comfort SUV).',
      inclusions: ['Fuel Charges'],
      exclusions: ['Toll Charges', 'Driver Allowance', 'Parking Fees', 'Extra Hours / KM']
    },
    {
      id: 'ertiga',
      title: 'Maruti Ertiga',
      category: 'Family MUV',
      rate: 'From ₹16/km',
      seats: '6+1 Seats',
      bags: '4 Bags',
      ac: 'AC Cabin',
      image: '/white-ertiga-right.png',
      description: 'A spacious and value-packed 6-passenger family carrier. Designed with flexible seating and direct rear AC vents. Our top choice for honest, family-friendly traveling where everyone rides together.',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a Maruti Ertiga (Family MUV).',
      inclusions: ['Fuel Charges'],
      exclusions: ['Toll Charges', 'Driver Allowance', 'Parking Fees', 'Extra Hours / KM']
    },
    {
      id: 'carens',
      title: 'Kia Carens',
      category: 'Comfort SUV',
      rate: 'From ₹16/km',
      seats: '6+1 Seats',
      bags: '4 Bags',
      ac: 'Climate Control',
      image: '/white-carens-right.png',
      description: 'A refined and comfortable family SUV. Focuses on cabin silence, neat interiors, and reliable climate control. Excellent for corporate transits and families seeking a calm, peaceful journey.',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a Kia Carens (Comfort SUV).',
      inclusions: ['Fuel Charges'],
      exclusions: ['Toll Charges', 'Driver Allowance', 'Parking Fees', 'Extra Hours / KM']
    },
    {
      id: 'innova',
      title: 'Toyota Innova Crysta',
      category: 'Comfort MUV',
      rate: 'From ₹20/km',
      seats: '7+1 Seats',
      bags: '5 Bags',
      ac: 'Dual AC',
      image: '/white-innova-right.png',
      description: 'A premium, highly dependable MUV offering unmatched cabin comfort and captain seating. Features independent AC control and robust highway safety. Trusted by corporate travelers and families alike.',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a Toyota Innova Crysta (Comfort MUV).',
      inclusions: ['Fuel Charges'],
      exclusions: ['Toll Charges', 'Driver Allowance', 'Parking Fees', 'Extra Hours / KM']
    },
    {
      id: 'tempo-premium-ac',
      title: '17-Seater Premium AC Coach (Tempo Traveller)',
      category: 'AC Tourist Coach',
      rate: 'From ₹28/km',
      seats: '17 Seats',
      bags: '12 Bags',
      ac: 'Premium Dual AC',
      image: '/17-seat-tempo-traveller-right.png',
      description: 'Built for comfortable group journeys. Features clean push-back seats, reliable dual-AC cooling, and a spacious cabin. Backed by our commitment to safe driving and customer satisfaction.',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a 17-Seater Premium AC Coach for my journey.',
      inclusions: ['Fuel Charges', 'Push-Back Seats', 'Premium Audio'],
      exclusions: ['Toll Charges', 'Driver Allowance', 'State Permit', 'Parking Fees', 'Extra Hours / KM']
    },
    {
      id: 'tempo-executive-ac',
      title: '17-Seater Executive AC Coach (Tempo Traveller)',
      category: 'AC Tourist Coach',
      rate: 'From ₹28/km',
      seats: '17 Seats',
      bags: '12 Bags',
      ac: 'Standard AC',
      image: '/17-seat-tempo-traveller.png',
      description: 'A highly dependable AC coach perfect for family pilgrimages and weekend picnics. Kept thoroughly clean and serviced. Driven by local experts who prioritize your safety and transparent pricing.',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a 17-Seater Executive AC Coach for my journey.',
      inclusions: ['Fuel Charges', 'Standard AC'],
      exclusions: ['Toll Charges', 'Driver Allowance', 'State Permit', 'Parking Fees', 'Extra Hours / KM']
    },
    {
      id: 'tempo-standard-nonac',
      title: '17-Seater Standard Non-AC Coach (Tempo Traveller)',
      category: 'Standard Coach',
      rate: 'From ₹24/km',
      seats: '17 Seats',
      bags: '12 Bags',
      ac: 'Blower System',
      image: '/17-seat-tempo-traveller-right.jpg',
      description: 'An economical and robust non-AC coach for budget group travel. Features wide sliding windows for natural cooling, comfortable seats, and a sturdy roof carrier. A simple and honest choice.',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a 17-Seater Standard Non-AC Coach for my journey.',
      inclusions: ['Fuel Charges', 'Blower System'],
      exclusions: ['Toll Charges', 'Driver Allowance', 'State Permit', 'Parking Fees', 'Extra Hours / KM']
    },
    {
      id: 'tempo-20-nonac',
      title: '20-Seater Standard Non-AC Coach (Tempo Traveller)',
      category: 'Standard Coach',
      rate: 'From ₹25/km',
      seats: '20 Seats',
      bags: '15 Bags',
      ac: 'Blower System',
      image: '/17-seat-tempo-traveller-right.jpg',
      description: 'A high-capacity, sturdy non-AC coach for wedding guest transits and pilgrim groups. Kept clean and well-maintained. Backed by our signature business loyalty and straightforward rates.',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a 20-Seater Standard Non-AC Coach for my journey.',
      inclusions: ['Fuel Charges', 'Blower System'],
      exclusions: ['Toll Charges', 'Driver Allowance', 'State Permit', 'Parking Fees', 'Extra Hours / KM']
    },
    {
      id: 'bus-32',
      title: '32-Seater Comfort Tourist Coach',
      category: 'Tourist Coach',
      rate: 'From ₹52/km',
      seats: '32 Seats',
      bags: '25 Bags',
      ac: 'Climate Control',
      image: '/50-seat-bus-right.png',
      description: 'A spacious 32-seater coach designed for student tours and corporate outings. Offers excellent ventilation, smooth air-suspension, and clean seating. Driven by verified, polite drivers.',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a 32-Seater Comfort Tourist Coach for my journey.',
      inclusions: ['Fuel Charges', 'Standard Audio', 'Air Suspension'],
      exclusions: ['Toll Charges', 'Driver Allowance', 'State Permit', 'Parking Fees', 'Extra Hours / KM']
    },
    {
      id: 'bus',
      title: '50-Seater Comfort Tourist Bus',
      category: 'Tourist Bus',
      rate: 'From ₹60/km',
      seats: '50 Seats',
      bags: '40 Bags',
      ac: 'Climate Control',
      image: '/50-seat-bus-right.png',
      description: 'Our largest tourist bus, designed with a focus on safety and dependability. Features large windows, spacious luggage holds, and comfortable seating. A trusted choice for community events and school tours.',
      whatsappText: 'Hello Pooja Tours & Travels, I would like to book a 50-Seater Comfort Tourist Bus.',
      inclusions: ['Fuel Charges'],
      exclusions: ['Toll Charges', 'Driver Allowance', 'State Permit', 'Parking Fees', 'Extra Hours / KM']
    }
  ];

  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_URL}/cabs`);
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map(v => ({
            id: String(v.id),
            title: v.name,
            category: v.type,
            rate: `From ₹${Math.round(v.price_per_km)}/km`,
            seats: v.seats || `${v.seating_capacity} passengers`,
            bags: v.bags || '2 Bags',
            ac: v.ac || 'AC Cabin',
            image: v.image_url ? (v.image_url.startsWith('/') ? v.image_url : `/${v.image_url}`) : '/white-swift-right.png',
            description: v.description || '',
            whatsappText: `Hello Pooja Tours & Travels, I would like to book a ${v.name} (${v.type}) for my journey.`,
            inclusions: ['Fuel Charges'],
            exclusions: (v.type.toLowerCase().includes('coach') || v.type.toLowerCase().includes('bus') || v.seating_capacity >= 17)
              ? ['Toll Charges', 'Driver Allowance', 'State Permit', 'Parking Fees', 'Extra Hours / KM']
              : ['Toll Charges', 'Driver Allowance', 'Parking Fees', 'Extra Hours / KM']
          }));
          setVehicles(formatted);
          if (formatted.length > 0) {
            setSelectedVehicle(formatted[0]);
          }
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Failed to fetch from API, falling back to static fleet:', err);
      }
      setVehicles(fleetVehicles);
      setSelectedVehicle(fleetVehicles[0]);
      setLoading(false);
    };
    fetchVehicles();
  }, []);

  const [queryName, setQueryName] = useState('');
  const [queryPhone, setQueryPhone] = useState('');
  const [queryMessage, setQueryMessage] = useState('');
  const [querySuccess, setQuerySuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setQuerySuccess(false);
    setQueryMessage('');
  };

  const handleBookNow = (vehicle) => {
    const isBus = vehicle.category.includes('Coach') || vehicle.id.startsWith('tempo') || vehicle.id === 'bus';
    
    setSearchParams(prev => ({
      ...prev,
      bookingType: isBus ? 'bus' : 'cab',
      fromCity: prev.fromCity || 'Pune, Maharashtra, India',
      toCity: prev.toCity || 'Mumbai, Maharashtra, India'
    }));

    if (setSelectedItem && setBookingStep) {
      let dbId = 1;
      const ln = vehicle.title.toLowerCase();
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

      const rateMatch = vehicle.rate ? vehicle.rate.match(/\d+/) : null;
      const rateNum = rateMatch ? parseInt(rateMatch[0]) : 13;

      setSelectedItem({
        id: dbId,
        name: vehicle.title,
        image: isBus ? '🚌' : '🚗',
        price_per_seat: isBus ? 750 : null,
        price_per_km: !isBus ? rateNum : null,
        details: vehicle.seats + ' | ' + vehicle.ac
      });
      setBookingStep(3); // Go straight to passenger details
      setCurrentPage('booking-flow');
    } else {
      setCurrentPage('home');
    }
  };

  if (loading || !selectedVehicle) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00b4d8]"></div>
        <p className="text-sm font-bold text-slate-500 mt-4">Loading Pooja Fleet details...</p>
      </div>
    );
  }

  return (
    <div className="relative bg-slate-50/30 overflow-hidden w-full flex-1 flex flex-col" style={{ minHeight: '85vh' }}>
      
      {/* Background Watermark Pattern Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{ 
          backgroundImage: `url('/travel-watermark-clean.png')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px'
        }}
      />
      <div className="absolute top-[10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-cyan-200/20 blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[450px] h-[450px] rounded-full bg-amber-100/20 blur-3xl z-0 pointer-events-none" />

      {/* Breadcrumbs Header */}
      <HeaderBreadcrumbs title="Our Fleet Details" setCurrentPage={setCurrentPage} />

      {/* Intro */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center mt-8 sm:mt-12 mb-6 sm:mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-3">
          <svg className="w-3.5 h-3.5 text-[#00b4d8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.317-5.077a2.25 2.25 0 00-2.247-2.112h-9.61a2.25 2.25 0 00-2.203 1.874L2.25 13.5M16.5 19.5h-9m9 0a1.5 1.5 0 001.5-1.5V14.25M7.5 19.5a1.5 1.5 0 01-1.5-1.5V14.25m.75-9h13.5A1.5 1.5 0 0121.75 7v5.25m-20.25-3h20.25" />
          </svg>
          <span>Explore All Options</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
          Our Professional <span className="text-[#00b4d8]">Travel Fleet</span>
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-xl mx-auto leading-relaxed">
          Clean, sanitized, and certified vehicles driven by trusted local drivers. Compare specifications and pick the best carriage for your next tour.
        </p>
      </div>

      {/* Main Master-Detail Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Vehicle List Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Displaying all 11 vehicles fully (no scrollbar) */}
          <div className="flex flex-col gap-3">
            <span className="text-[0.68rem] font-black text-slate-400 uppercase tracking-widest px-2">Select Vehicle Type</span>
            {vehicles.map((vehicle) => {
              const isSelected = selectedVehicle.id === vehicle.id;
              return (
                <button
                  key={vehicle.id}
                  onClick={() => handleSelectVehicle(vehicle)}
                  className={`w-full flex items-center gap-4 p-3.5 rounded-2xl border text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#00b4d8]/5 border-[#00b4d8] shadow-sm shadow-[#00b4d8]/10'
                      : 'bg-white/70 backdrop-blur-sm border-slate-200/60 hover:bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  {/* Car Thumbnail */}
                  <div className="w-16 h-12 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-1 shrink-0">
                    <img src={vehicle.image} alt={vehicle.title} className="w-full h-full object-contain" />
                  </div>
                  
                  {/* Basic Text info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className={`text-xs font-black truncate ${isSelected ? 'text-[#0083b0]' : 'text-slate-800'}`}>
                        {vehicle.title}
                      </h3>
                      <span className="text-[0.62rem] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 uppercase tracking-wider shrink-0">
                        {vehicle.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-[0.68rem] font-bold text-slate-400">
                      <span className="flex items-center gap-0.5">👤 {vehicle.seats.split(' ')[0]}</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-extrabold">{vehicle.rate}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Left Stickers Container (All 4 Stickers in 2x2 Grid) */}
          <div className="grid grid-cols-2 gap-4 bg-white/70 backdrop-blur-sm border border-slate-200/60 p-4 rounded-2xl shadow-sm">
            
            {/* GPS Tracked */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#00b4d8] bg-white shadow-sm flex items-center justify-center p-1.5 overflow-hidden shrink-0">
                <img src="/Book%20car/We%20are%20here%20street%20map%20GPS%20simple%20icon_%20Road%20GPS%20map%20here%20sign%20pin%20design,%20we%20are%20here%20location%20icon%20design.jpg" alt="GPS Tracked" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-wider">Assurance</span>
                <span className="text-[0.7rem] font-black text-slate-750 leading-tight">GPS Tracked</span>
              </div>
            </div>

            {/* Clean Cars */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#00b4d8] bg-white shadow-sm flex items-center justify-center p-1.5 overflow-hidden shrink-0">
                <img src="/Book%20car/Red%20Car%20Washing%20Bubble%20Clean%20Clean%20Design%20Logo%20Vector,%20Car%20Wash%20Logo,%20Washing%20Car%20Logo,%20Cleaning%20Car%20Logo%20PNG%20and%20Vector%20with%20Transparent%20Background%20for%20Free%20Download.jpg" alt="Clean Cabs" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-wider">Sanitation</span>
                <span className="text-[0.7rem] font-black text-slate-755 leading-tight">Clean Cars</span>
              </div>
            </div>

            {/* Safety First */}
            <div className="flex items-center gap-3 border-t border-slate-100/50 pt-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#00b4d8] bg-white shadow-sm flex items-center justify-center p-1.5 overflow-hidden shrink-0">
                <img src="/Book%20car/Safety%20free%20icons%20designed%20by%20srip.jpg" alt="Safety First" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-wider">Safety</span>
                <span className="text-[0.7rem] font-black text-slate-700 leading-tight">Safe Drive</span>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="flex items-center gap-3 border-t border-slate-100/50 pt-3">
              <div className="w-12 h-12 rounded-full border-2 border-[#00b4d8] bg-white shadow-sm flex items-center justify-center p-1.5 overflow-hidden shrink-0">
                <img src="/Book%20car/24%20hours%20online%20customer%20support%20reliable%20icon%20isolated%20on%20white%20background_.jpg" alt="24/7 Support" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-wider">Support</span>
                <span className="text-[0.7rem] font-black text-slate-700 leading-tight">24/7 Support</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side Column wrapper */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Specifications Details Panel (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-28 self-start w-full bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            
            {/* Main Content Area */}
            <div>
              
              {/* Header info */}
              <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-4 mb-6">
                <div>
                  <span className="text-[0.65rem] font-black text-[#00b4d8] uppercase tracking-wider">
                    {selectedVehicle.category} specs
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
                    {selectedVehicle.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-wider block">Running Rate</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600">{selectedVehicle.rate}</span>
                </div>
              </div>

              {/* Vehicle Image View */}
              <div className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-6 flex justify-center items-center mb-6 relative overflow-hidden h-48 sm:h-64">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-50/10 to-transparent pointer-events-none" />
                <img 
                  src={selectedVehicle.image} 
                  alt={selectedVehicle.title} 
                  className="max-w-[85%] max-h-full object-contain transition-transform duration-500 hover:scale-103"
                />
              </div>

              {/* Description Text */}
              <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed mb-6">
                {selectedVehicle.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center flex flex-col justify-center">
                  <span className="text-[1.3rem] mb-1">👤</span>
                  <span className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-wider">Max Seating</span>
                  <span className="text-xs font-black text-slate-800 mt-0.5">{selectedVehicle.seats}</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center flex flex-col justify-center">
                  <span className="text-[1.3rem] mb-1">🧳</span>
                  <span className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-wider">Luggage Limit</span>
                  <span className="text-xs font-black text-slate-800 mt-0.5">{selectedVehicle.bags}</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center flex flex-col justify-center">
                  <span className="text-[1.3rem] mb-1">❄️</span>
                  <span className="text-[0.55rem] font-bold text-slate-400 uppercase tracking-wider">Air cooling</span>
                  <span className="text-xs font-black text-slate-800 mt-0.5">{selectedVehicle.ac}</span>
                </div>
              </div>

              {/* Inclusions and Exclusions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                <div>
                  <h4 className="text-[0.68rem] font-black text-[#00b4d8] uppercase tracking-wider mb-2.5 flex items-center gap-1">
                    <span>✓</span> Service Inclusions
                  </h4>
                  <ul className="text-[0.68rem] font-semibold text-slate-500 space-y-1.5">
                    {selectedVehicle.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-[#00b4d8] font-bold">✓</span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[0.68rem] font-black text-rose-500 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                    <span>✗</span> Exclusions (Extra Charges)
                  </h4>
                  <ul className="text-[0.68rem] font-semibold text-slate-500 space-y-1.5">
                    {selectedVehicle.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-rose-500 font-bold">✗</span>
                        {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* Action Row */}
            <div className="flex gap-3 border-t border-slate-100 pt-6 mt-8">
              <a 
                href={`https://wa.me/919623324139?text=${encodeURIComponent(selectedVehicle.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 2.025 14.12 1 11.516 1 6.082 1 1.658 5.371 1.654 9.8c-.001 1.674.437 3.307 1.272 4.742l-.992 3.626 3.715-.973v-.04z" />
                </svg>
                <span>WhatsApp Inquiry</span>
              </a>
              <button
                onClick={() => handleBookNow(selectedVehicle)}
                className="flex-1 py-3 bg-[#00b4d8] text-white hover:bg-[#0083b0] rounded-xl text-xs font-black shadow-sm shadow-[#00b4d8]/20 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Book this Ride</span>
                <span>➔</span>
              </button>
            </div>

            {/* Pooja Travels Trust Guarantee Promise */}
            <div className="mt-6 p-4 rounded-2xl bg-cyan-50/40 border border-cyan-100/50 flex gap-3.5 items-center">
              <span className="text-xl shrink-0">🤝</span>
              <div className="flex flex-col">
                <span className="text-[0.7rem] font-black text-slate-800 uppercase tracking-wider mb-0.5">Pooja Travels Guarantee</span>
                <p className="text-[0.68rem] font-semibold text-slate-500 leading-normal">
                  No hidden fees, no fancy claims. Just clean vehicles, honest pricing, and friendly local drivers who treat you like family.
                </p>
              </div>
            </div>

          </div>

          {/* Quick Fleet Query Form */}
          <div className="bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-3xl p-6 shadow-sm">
            <span className="text-[0.65rem] font-black text-[#00b4d8] uppercase tracking-wider block mb-1">Fleet Question?</span>
            <h4 className="text-sm font-black text-slate-800 tracking-tight mb-4">Have a query about our vehicles? Ask here!</h4>
            
            {querySuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 text-center flex flex-col items-center gap-2">
                <span className="text-2xl">✅</span>
                <h5 className="text-xs font-black text-emerald-800">Query Submitted!</h5>
                <p className="text-[0.68rem] font-semibold text-slate-500 leading-normal">
                  Thank you, <strong>{queryName}</strong>! We have received your query regarding <strong>{selectedVehicle.title}</strong> and will call you at <strong>{queryPhone}</strong> shortly.
                </p>
                <button 
                  onClick={() => setQuerySuccess(false)}
                  className="mt-2 text-[0.68rem] font-black text-[#00b4d8] hover:text-[#0083b0]"
                >
                  Send another query
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                setSubmitting(true);
                setTimeout(() => {
                  setSubmitting(false);
                  setQuerySuccess(true);
                }, 800);
              }} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[0.58rem] font-black text-slate-400 uppercase tracking-wider mb-1 block">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={queryName}
                      onChange={(e) => setQueryName(e.target.value)}
                      placeholder="e.g. Rahul Patil" 
                      className="w-full px-3 py-2 text-xs border border-slate-200 bg-white/50 rounded-xl focus:outline-none focus:border-[#00b4d8] transition-all font-bold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="text-[0.58rem] font-black text-slate-400 uppercase tracking-wider mb-1 block">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      pattern="[0-9]{10}"
                      value={queryPhone}
                      onChange={(e) => setQueryPhone(e.target.value)}
                      placeholder="10-digit number" 
                      className="w-full px-3 py-2 text-xs border border-slate-200 bg-white/50 rounded-xl focus:outline-none focus:border-[#00b4d8] transition-all font-bold text-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[0.58rem] font-black text-slate-400 uppercase tracking-wider mb-1 block">Vehicle of Interest</label>
                  <select 
                    value={selectedVehicle.id}
                    onChange={(e) => {
                      const veh = vehicles.find(v => v.id === e.target.value);
                      if (veh) handleSelectVehicle(veh);
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-200 bg-white/50 rounded-xl focus:outline-none focus:border-[#00b4d8] transition-all font-bold text-slate-700 font-sans"
                  >
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[0.58rem] font-black text-slate-400 uppercase tracking-wider mb-1 block">Your Query / Message</label>
                  <textarea 
                    rows="2"
                    required
                    value={queryMessage}
                    onChange={(e) => setQueryMessage(e.target.value)}
                    placeholder={`e.g. Ask about seating layout, luggage capacity, standard route charges for ${selectedVehicle.title}...`} 
                    className="w-full px-3 py-2 text-xs border border-slate-200 bg-white/50 rounded-xl focus:outline-none focus:border-[#00b4d8] transition-all font-bold text-slate-700 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full py-2.5 bg-[#00b4d8] hover:bg-[#0083b0] text-white rounded-xl text-xs font-black shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {submitting ? 'Submitting...' : 'Submit Query'}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
