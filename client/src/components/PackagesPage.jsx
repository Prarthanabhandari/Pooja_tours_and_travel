import React, { useState } from 'react';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';

const TOUR_PACKAGES_LIST = [
  {
    id: 1,
    title: 'Pune ⇄ Shirdi Darshan',
    desc: 'Complete round trip package for Sai Baba Darshan, includes flexible timing and premium driver support.',
    image: '/shirdi.jpg',
    to: 'Shirdi, Maharashtra, India',
    includes: 'Flexible Timing, Tolls, Driver Allowance',
    days: '1-2 Days Tour',
    badge: 'Sai Darshan',
    price: '₹2,400 onwards',
    category: 'spiritual',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Shirdi Darshan tour package.'
  },
  {
    id: 2,
    title: 'Pune ⇄ Mahabaleshwar Scenic Tour',
    desc: 'Enjoy scenic mountain viewpoints, strawberry farms, Venna Lake, and Mapro garden trip.',
    image: '/mahabaleshwar.jpg',
    to: 'Mahabaleshwar, Maharashtra, India',
    includes: 'Local Sightseeing, Tolls, Driver Allowance',
    days: '1-2 Days Trip',
    badge: 'Hill Station',
    price: '₹3,500 onwards',
    category: 'getaway',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Mahabaleshwar Scenic Tour package.'
  },
  {
    id: 3,
    title: 'Pune ⇄ Mumbai Airport Drops',
    desc: 'Punctual, clean sedan or SUV drops direct to T2 airport terminal. Reliable outstation transit.',
    image: '/airport-transit.jpg',
    to: 'Mumbai Airport, Maharashtra, India',
    includes: 'Expressway Tolls, Punctual Chauffeur Drop',
    days: 'One-Way Drop',
    badge: 'Assured Transit',
    price: '₹2,200 fixed',
    category: 'transit',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about Pune to Mumbai Airport Drop transit.'
  },
  {
    id: 4,
    title: 'Pune ⇄ Ashtavinayak Yatra',
    desc: '2-day custom bus/cab spiritual package covering all 8 holy Ganesha temples across Maharashtra.',
    image: '/ashtavinayak.jpg',
    to: 'Morgaon, Maharashtra, India',
    includes: '8 Temple Route, Permit, Tolls, Driver Support',
    days: '2 Days / 1 Night',
    badge: 'Spiritual Yatra',
    price: '₹8,500 total',
    category: 'spiritual',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Ashtavinayak Yatra package.'
  },
  {
    id: 5,
    title: 'Pune ⇄ Kokan Coast',
    desc: 'Discover beautiful coconut groves, pristine beaches, and delicious coastal cuisine in Konkan.',
    image: '/kokan.jpg',
    to: 'Konkan, Maharashtra, India',
    includes: 'Coastal Sightseeing, Tolls, Driver Allowance',
    days: '3-4 Days Tour',
    badge: 'Coastal Special',
    price: '₹7,500 onwards',
    category: 'beach',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Konkan Coast tour package.'
  },
  {
    id: 6,
    title: 'Pune ⇄ Diveagar Beach',
    desc: 'Enjoy the pristine sand beaches, coastal temples, and serene waters of Diveagar.',
    image: '/Diveghar.jpg',
    to: 'Diveagar, Maharashtra, India',
    includes: 'Local Sightseeing, Tolls, Driver Allowance',
    days: '2 Days / 1 Night',
    badge: 'Coastal Getaway',
    price: '₹4,800 onwards',
    category: 'beach',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Diveagar Beach package.'
  },
  {
    id: 7,
    title: 'Pune ⇄ Harihareshwar',
    desc: 'Visit the holy Shiva temple and pristine rocky beaches of Dakshin Kashi.',
    image: '/harihareshwar.jpg',
    to: 'Harihareshwar, Maharashtra, India',
    includes: 'Sightseeing Tour, Tolls, Driver Allowance',
    days: '2 Days Trip',
    badge: 'Pilgrimage & Beach',
    price: '₹4,900 onwards',
    category: 'beach',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Harihareshwar package.'
  },
  {
    id: 8,
    title: 'Pune ⇄ Ujjain Mahakal',
    desc: 'Spiritual trip to Ujjain Mahakaleshwar Jyotirlinga temple and holy sites in Madhya Pradesh.',
    image: '/ujjen.jpg',
    to: 'Ujjain, Madhya Pradesh, India',
    includes: 'Interstate Permit, Expressway Tolls, Driver Support',
    days: '3-4 Days Tour',
    badge: 'Mahakal Darshan',
    price: '₹12,500 onwards',
    category: 'spiritual',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Ujjain Mahakal package.'
  },
  {
    id: 9,
    title: 'Pune ⇄ Trimbakeshwar',
    desc: 'Spiritual Jyotirlinga Darshan tour near Nashik, includes route permit and driver support.',
    image: '/trmbkeshwr.jpg',
    to: 'Trimbakeshwar, Maharashtra, India',
    includes: 'Jyotirlinga Darshan, Tolls, Driver Allowance',
    days: '1-2 Days Tour',
    badge: 'Jyotirlinga',
    price: '₹3,800 onwards',
    category: 'spiritual',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Trimbakeshwar package.'
  },
  {
    id: 10,
    title: 'Pune ⇄ Nashik Tour',
    desc: 'Visit historical temples, Trimbakeshwar, Panchavati, and local vineyards in Nashik.',
    image: '/nashik.jpg',
    to: 'Nashik, Maharashtra, India',
    includes: 'Sightseeing Tour, Tolls, Driver Allowance',
    days: '2 Days Trip',
    badge: 'Temple & Winery',
    price: '₹4,200 onwards',
    category: 'getaway',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Nashik Tour package.'
  },
  {
    id: 11,
    title: 'Pune ⇄ Hampi Ruins',
    desc: 'Explore the UNESCO World Heritage site of Hampi historical monuments and stone temples.',
    image: '/happi.jpg',
    to: 'Hampi, Karnataka, India',
    includes: 'Heritage Tour, Interstate Permit, Tolls, Driver',
    days: '3-4 Days Tour',
    badge: 'Heritage Tour',
    price: '₹14,000 onwards',
    category: 'getaway',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Hampi package.'
  },
  {
    id: 12,
    title: 'Pune ⇄ Khatu Shyam Darshan',
    desc: 'Spiritual pilgrimage tour to the famous Khatu Shyam Ji temple in Rajasthan.',
    image: '/khatusham.jpg',
    to: 'Khatu, Rajasthan, India',
    includes: 'Long Distance Route, Permit, Tolls, Driver',
    days: '5-6 Days Tour',
    badge: 'Devotional',
    price: '₹24,000 onwards',
    category: 'spiritual',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Khatu Shyam Darshan package.'
  },
  {
    id: 13,
    title: 'Pune ⇄ Mumbai City Tour',
    desc: 'Assured outstation drops, business transfers, or sightseeing trips to Mumbai City.',
    image: '/mumbai.jpg',
    to: 'Mumbai, Maharashtra, India',
    includes: 'Expressway Tolls, Punctual Driver Drop',
    days: 'One-Way / Round-Trip',
    badge: 'Business & Travel',
    price: '₹2,600 onwards',
    category: 'transit',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Mumbai Tour package.'
  },
  {
    id: 14,
    title: 'Pune ⇄ Lonavala & Khandala',
    desc: 'Charming monsoon weekend tour to Tiger Point, Bhushi Dam, and Lonavala Wax Museum.',
    image: '/lonavala.jpg',
    to: 'Lonavala, Maharashtra, India',
    includes: 'Hill Sightseeing, Express Tolls, Driver support',
    days: '1 Day Trip',
    badge: 'Monsoon Getaway',
    price: '₹2,500 onwards',
    category: 'getaway',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Lonavala & Khandala package.'
  },
  {
    id: 15,
    title: 'Pune ⇄ Akkalkot Darshan',
    desc: 'Spiritual tour to Swami Samarth Maharaj temple in Akkalkot, Solapur. Complete outstation drop.',
    image: '/aakalkot.png',
    to: 'Akkalkot, Maharashtra, India',
    includes: 'Temple Darshan, Tolls, Driver Support',
    days: '1-2 Days Tour',
    badge: 'Devotional Yatra',
    price: '₹5,800 onwards',
    category: 'spiritual',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Akkalkot Swami Samarth package.'
  },
  {
    id: 16,
    title: 'Pune ⇄ Ganagapur Dattatreya',
    desc: 'Spiritual pilgrimage to Dattatreya temple, Sangam, and Nirguna Math in Ganagapur, Karnataka.',
    image: '/gangPUR.jpg',
    to: 'Ganagapur, Karnataka, India',
    includes: 'Interstate Permit, Tolls, Driver Support',
    days: '2-3 Days Tour',
    badge: 'Spiritual Math',
    price: '₹8,200 onwards',
    category: 'spiritual',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Ganagapur package.'
  },
  {
    id: 17,
    title: 'Pune ⇄ Kolhapur Ambabai',
    desc: 'Visit the holy Mahalakshmi Ambabai Temple, Jyotiba Temple, and historical sites in Kolhapur.',
    image: '/lohapur.jpg',
    to: 'Kolhapur, Maharashtra, India',
    includes: 'Ambabai Darshan, Tolls, Driver Allowance',
    days: '2 Days Trip',
    badge: 'Shakti Peeth',
    price: '₹6,500 onwards',
    category: 'spiritual',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Kolhapur Ambabai package.'
  },
  {
    id: 18,
    title: 'Pune ⇄ Hyderabad & Ramoji',
    desc: 'Premium group/family tour to Hyderabad Charminar, Golconda Fort, and Ramoji Film City.',
    image: '/hydrabad.jpg',
    to: 'Hyderabad, Telangana, India',
    includes: 'Interstate Permit, Highway Tolls, Ramoji Transfer',
    days: '4-5 Days Tour',
    badge: 'City & Film City',
    price: '₹18,500 onwards',
    category: 'getaway',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Hyderabad & Ramoji Film City package.'
  },
  {
    id: 19,
    title: 'Pune ⇄ Goa Beach Special',
    desc: 'Premium outstation tour package to Goa beaches (Calangute, Baga), forts, and historic churches.',
    image: '/goa.jpg',
    to: 'Panaji, Goa, India',
    includes: 'Interstate Permit, Highway Tolls, Coastal Sightseeing',
    days: '3-4 Days Tour',
    badge: 'Goa Special',
    price: '₹14,500 onwards',
    category: 'beach',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Goa tour package.'
  },
  {
    id: 20,
    title: 'Pune ⇄ Malvan & Tarkarli Beach',
    desc: 'Enjoy scuba diving, watersports, pristine white sands, and the historic Sindhudurg sea fort in Malvan.',
    image: '/malvan.jpg',
    to: 'Malvan, Maharashtra, India',
    includes: 'Scuba Diving Tour, Fort Permit, Tolls, Driver Allowance',
    days: '3 Days / 2 Nights',
    badge: 'Konkan Special',
    price: '₹9,500 onwards',
    category: 'beach',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Malvan & Tarkarli tour package.'
  },
  {
    id: 21,
    title: 'Pune ⇄ Maharashtra Forts Tour',
    desc: 'Explore the proud heritage of Chhatrapati Shivaji Maharaj visiting Raigad Fort, Pratapgad, and Sinhagad.',
    image: '/forts.jpg',
    to: 'Fort Raigad, Maharashtra, India',
    includes: 'Fort Entry Fees, Mountain Drive, Tolls, Guide Help',
    days: '2 Days / 1 Night',
    badge: 'Heritage & Forts',
    price: '₹5,600 onwards',
    category: 'getaway',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about the Pune to Maharashtra Forts Tour package.'
  },
  {
    id: 22,
    title: 'Pune ⇄ Local Pune Airport Drops',
    desc: 'Reliable, 24/7 door-to-door cab pickups and drops from Pune Lohegaon Airport terminal.',
    image: '/pune-airport.jpg',
    to: 'Pune Airport, Maharashtra, India',
    includes: 'Airport Entry Toll, Punctual Chauffeur Drop',
    days: 'One-Way Drop',
    badge: 'Local Transit',
    price: '₹800 fixed',
    category: 'transit',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about Pune Airport local drop/pickup transit.'
  },
  {
    id: 23,
    title: 'Pune ⇄ Navi Mumbai Airport Drops',
    desc: 'Punctual premium sedan and SUV transit to the new Navi Mumbai International Airport.',
    image: '/navimumbai-airport.jpg',
    to: 'Navi Mumbai International Airport, Maharashtra, India',
    includes: 'Expressway Tolls, Punctual Terminal Drop',
    days: 'One-Way Drop',
    badge: 'New Transit',
    price: '₹2,500 fixed',
    category: 'transit',
    whatsappText: 'Hello Pooja Tours & Travels, I would like to inquire about Pune to Navi Mumbai Airport drop transit.'
  }
];

const CATEGORIES = [
  { slug: 'all', label: 'All Packages' },
  { slug: 'spiritual', label: 'Spiritual Tours' },
  { slug: 'beach', label: 'Beach & Nature' },
  { slug: 'getaway', label: 'Weekend Getaways' },
  { slug: 'transit', label: 'Airport Drops & Transits' }
];

export default function PackagesPage({ 
  setCurrentPage, 
  searchParams, 
  setSearchParams,
  setSelectedRouteName
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPackages = TOUR_PACKAGES_LIST.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.badge.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-vh-100 flex flex-col bg-slate-50/30 overflow-hidden" style={{ minHeight: '100vh' }}>
      
      {/* Background Watermark Pattern Layer (Repeating transparent travel collage image) */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{ 
          backgroundImage: `url('/travel-watermark-clean.png')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px'
        }}
      />

      {/* Custom Landmarks Skyline Watermark ( Subtly repeating / absolute watermark at bottom ) */}
      <div 
        className="absolute bottom-0 right-0 left-0 h-[240px] z-0 opacity-[0.05] pointer-events-none bg-bottom bg-repeat-x"
        style={{ 
          backgroundImage: `url('/landmarks-watermark.png')`,
          backgroundSize: 'auto 180px'
        }}
      />

      {/* Decorative Floating Blur Orbs */}
      <div className="absolute top-[15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-200/20 blur-3xl z-0 pointer-events-none" />
      <div className="absolute top-[45%] right-[-10%] w-[500px] h-[500px] rounded-full bg-yellow-100/25 blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-[5%] left-[5%] w-[400px] h-[400px] rounded-full bg-teal-200/15 blur-3xl z-0 pointer-events-none" />

      {/* Standard Header Breadcrumbs Bar */}
      <HeaderBreadcrumbs title="Our Tour Packages" setCurrentPage={setCurrentPage} />

      {/* MAIN CONTENT AREA */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-3">
            <svg className="w-3.5 h-3.5 text-[#00b4d8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
            </svg>
            <span>Signature Outstation Trips</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
            Popular Outstation <span className="text-[#00b4d8]">Tour Packages</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-xl mx-auto leading-relaxed">
            Select from our highly requested fixed itineraries. Flat owner-direct pricing with professional drivers and zero hidden commissions.
          </p>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl p-4 sm:p-5 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-stretch gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text"
              placeholder="Search packages by destination..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00b4d8] font-semibold text-slate-700 text-xs sm:text-sm bg-white/50 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  selectedCategory === cat.slug 
                    ? 'bg-[#00b4d8] text-white shadow-sm shadow-[#00b4d8]/40 scale-102' 
                    : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* PACKAGES GRID */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-2xl p-8 max-w-xl mx-auto shadow-sm">
            <svg className="w-12 h-12 text-slate-350 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.197 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c1.31 0 2.375-1.065 2.375-2.375S16.31 5 15 5s-2.375 1.065-2.375 2.375S13.69 9.75 15 9.75zm.375 0h.008v.015h-.008V9.75z" />
            </svg>
            <h3 className="text-base font-extrabold text-slate-800 mb-1">No Packages Found</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed">
              We couldn't find any tour packages matching your search criteria. Try using different keywords or selecting a different category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredPackages.map(pkg => (
              <div 
                key={pkg.id} 
                className="group bg-white/65 backdrop-blur-md border border-white/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100/50">
                  
                  {/* Package Image with zoom on hover */}
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // fallback to simple gradient backdrop if image fails to load
                      e.target.onerror = null; 
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('bg-gradient-to-br', 'from-cyan-50', 'to-sky-100', 'flex', 'items-center', 'justify-center');
                    }}
                  />

                  {/* Fallback overlay (rendered if image path is not found) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

                  {/* Category Badge overlay */}
                  <span className="absolute top-3 left-3 bg-[#00b4d8]/90 text-white backdrop-blur-sm text-[0.62rem] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                    {pkg.badge}
                  </span>

                  {/* Duration Badge overlay */}
                  <span className="absolute top-3 right-3 bg-slate-900/75 text-white backdrop-blur-sm text-[0.62rem] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                    {pkg.days}
                  </span>

                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  
                  {/* Text Description */}
                  <div>
                    <h3 className="text-base font-extrabold text-slate-800 leading-snug group-hover:text-[#00b4d8] transition-colors mb-2">
                      {pkg.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 leading-relaxed text-justify mb-3">
                      {pkg.desc}
                    </p>
                    
                    {/* Inclusions details block */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-2.5 flex items-start gap-1.5 text-[0.68rem] font-bold text-slate-600">
                      <span className="text-[#00b4d8]">✓</span>
                      <span>Includes: <span className="font-semibold text-slate-500">{pkg.includes}</span></span>
                    </div>
                  </div>

                  {/* Booking Actions */}
                  <div className="pt-3.5 border-t border-slate-200/50 flex justify-end">
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-2 w-full justify-between sm:justify-end">
                      
                      {/* WhatsApp Inquiry Button */}
                      <a 
                        href={`https://wa.me/919623324139?text=${encodeURIComponent(pkg.whatsappText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none border border-green-200 hover:border-green-300 bg-green-50/50 hover:bg-green-50 text-green-600 px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                        title="Inquire on WhatsApp"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.458L0 24zm6.06-4.225c1.679.996 3.42 1.547 5.922 1.548 5.275 0 9.56-4.28 9.564-9.551a9.49 9.49 0 00-2.802-6.756 9.485 9.485 0 00-6.772-2.798C6.757 3.22 2.47 7.5 2.467 12.77c-.001 2.235.586 4.417 1.7 6.3l-.998 3.642 3.82-.997zM18.17 14.9c-.334-.167-1.977-.975-2.28-1.084-.303-.11-.523-.167-.743.167-.22.334-.852 1.084-1.044 1.303-.193.22-.387.247-.72.08-1.554-.78-2.697-1.34-3.66-2.997-.247-.424.247-.393.707-1.314.08-.167.04-.313-.02-.48-.06-.167-.523-1.26-.718-1.728-.19-.457-.384-.395-.523-.402-.134-.007-.287-.008-.44-.008-.153 0-.4.057-.61.287-.21.23-.8.78-.8 1.9s.815 2.2 1.025 2.48c.21.28 1.605 2.45 3.89 3.435.545.234.97.374 1.3.48.547.174 1.045.15 1.44.09.44-.066 1.977-.81 2.253-1.55.277-.74.277-1.37.193-1.503-.083-.133-.303-.217-.637-.384z"/>
                        </svg>
                        Inquire
                      </a>

                      {/* Book Now Button */}
                      <button 
                        onClick={() => {
                          setSelectedRouteName(pkg.title);
                          setCurrentPage('route-details');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }} 
                        className="bg-[#00b4d8] hover:bg-[#0083b0] text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-colors shadow-sm shadow-[#00b4d8]/20 flex items-center justify-center gap-1.5"
                      >
                        Book Now
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
