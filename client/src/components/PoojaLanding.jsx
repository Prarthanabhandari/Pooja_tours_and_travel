import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import FleetSection from './FleetSection';
import WhyChooseUs from './WhyChooseUs';
import PopularPackages from './PopularPackages';
import HowItWorks from './HowItWorks';
import Reviews from './Reviews';
import FAQs from './FAQs';
import OurServices from './OurServices';

export default function PoojaLanding({ 
  currentPage,
  searchParams, 
  setSearchParams, 
  handleSearchSubmit,
  setCurrentPage,
  setShowAuthModal,
  setAuthMode,
  currentUser,
  handleLogout,
  setSelectedRouteName,
  siteSettings = {}
}) {
  const [isDestDropdownOpen, setIsDestDropdownOpen] = useState(false);
  const [customDestText, setCustomDestText] = useState(searchParams.toCity ? searchParams.toCity.split(',')[0] : '');
  const [showMap, setShowMap] = useState(false);
  const [selectedMapAddress, setSelectedMapAddress] = useState('');
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [searchingMap, setSearchingMap] = useState(false);
  const [estimatedKm, setEstimatedKm] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);

  const mapRef = React.useRef(null);
  const markerRef = React.useRef(null);

  const calculateEstimates = (lat, lng) => {
    const PUNE_LAT = 18.5204;
    const PUNE_LNG = 73.8567;
    
    // Haversine distance formula
    const R = 6371;
    const dLat = (lat - PUNE_LAT) * Math.PI / 180;
    const dLng = (lng - PUNE_LNG) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(PUNE_LAT * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const straightDist = R * c;
    const roadDist = Math.round(straightDist * 1.35); // road distance factor

    if (roadDist < 5) {
      setEstimatedKm(0);
      setEstimatedTime("Local Trip");
      return;
    }
    
    setEstimatedKm(roadDist);
    
    // Est. time at average 55 km/h
    const totalMinutes = Math.round((roadDist / 55) * 60);
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    
    let timeStr = "";
    if (hrs > 0) timeStr += `${hrs} hr `;
    if (mins > 0) timeStr += `${mins} min`;
    setEstimatedTime(timeStr.trim());
  };

  useEffect(() => {
    setCustomDestText(searchParams.toCity ? searchParams.toCity.split(',')[0] : '');
  }, [searchParams.toCity]);

  // Handle leaflet map display and reverse geocoding
  useEffect(() => {
    let mapInstance = null;
    if (showMap) {
      const timer = setTimeout(() => {
        if (window.L) {
          // Initialize map centered around Pune/Maharashtra region
          mapInstance = window.L.map('map-container').setView([18.5204, 73.8567], 10);
          mapRef.current = mapInstance;
          
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
          }).addTo(mapInstance);

          let marker = window.L.marker([18.5204, 73.8567], { draggable: true }).addTo(mapInstance);
          markerRef.current = marker;
          
          setSelectedMapAddress('Pune, Maharashtra, India');
          calculateEstimates(18.5204, 73.8567);

          const reverseGeocode = async (lat, lng) => {
            try {
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en`);
              const data = await res.json();
              if (data && data.display_name) {
                // Shorten location address for text input displays
                const parts = data.display_name.split(',');
                const shortened = parts.slice(0, 3).join(',').trim();
                setSelectedMapAddress(shortened || data.display_name);
              }
            } catch (err) {
              console.warn("Reverse geocode failed: ", err);
            }
          };

          mapInstance.on('click', (e) => {
            const { lat, lng } = e.latlng;
            marker.setLatLng([lat, lng]);
            reverseGeocode(lat, lng);
            calculateEstimates(lat, lng);
          });

          marker.on('dragend', () => {
            const { lat, lng } = marker.getLatLng();
            reverseGeocode(lat, lng);
            calculateEstimates(lat, lng);
          });
        }
      }, 300);

      return () => {
        clearTimeout(timer);
        if (mapInstance) {
          mapInstance.remove();
        }
      };
    }
  }, [showMap]);

  // Search address coordinates via OSM Nominatim API
  const handleMapSearchSubmit = async () => {
    if (!mapSearchQuery.trim()) return;
    setSearchingMap(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mapSearchQuery)}&limit=1&accept-language=en`);
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lon);

        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 12);
        }
        if (markerRef.current) {
          markerRef.current.setLatLng([latitude, longitude]);
        }

        const parts = display_name.split(',');
        const shortened = parts.slice(0, 3).join(',').trim();
        setSelectedMapAddress(shortened || display_name);
        calculateEstimates(latitude, longitude);
      } else {
        alert("Location not found. Please try a different query.");
      }
    } catch (err) {
      console.warn("Geocoding search failed: ", err);
    } finally {
      setSearchingMap(false);
    }
  };

  return (
    <div className="min-h-screen font-sans relative selection:bg-[#c69b3f] selection:text-white bg-white lg:bg-gradient-to-r lg:from-white lg:from-[50%] lg:to-[#f4f3ed] lg:to-[50%]">
      
      {/* 2. SPLIT-SCREEN EDITORIAL LAYOUT HERO & BOOKING CONSOLE */}
      {/* Background arches collage set as a background image stretching 100% height */}
      <section 
        className={`relative min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] flex items-stretch overflow-hidden bg-white lg:bg-[length:100%_100%] lg:bg-no-repeat lg:bg-center transition-all ${
          showMap ? 'lg:bg-none bg-slate-50/50' : 'lg:bg-[url(\'/hero-bg-collage.png\')]'
        }`}
      >
        {/* Inner container that aligns perfectly with the Logo margin (max-w-7xl mx-auto px-4 sm:px-6 lg:px-8) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full grid grid-cols-1 lg:grid-cols-12 items-stretch z-10">
          
          {/* Left Column: Shifted to the left, justify-start (aligned to top) to use the top empty space */}
          <div className="lg:col-span-5 py-4 sm:py-6 lg:py-8 flex flex-col justify-start h-full bg-transparent">
            
            {/* Content Wrapper */}
            <div className="w-full max-w-[400px] mx-auto lg:mx-0 flex flex-col gap-6 bg-transparent text-left pt-3 lg:pt-10">
              
              {/* Editorial Heading */}
              <div className="text-left select-none">
                <h1 className="text-[#0a2540] text-3xl sm:text-4.5xl font-black tracking-tight leading-tight">
                  {siteSettings.hero_title || 'Every Journey Has a Story. Start Yours Here.'}
                </h1>
                <p className="text-slate-500 text-[0.68rem] sm:text-xs font-bold mt-2.5 uppercase tracking-wider leading-relaxed">
                  {siteSettings.hero_subtitle || 'Discover Maharashtra with Pooja Travels'}
                </p>
              </div>

              {/* Custom PLAN YOUR TRIP Form Widget */}
              <div className="border border-[#0d3859]/80 rounded-xl shadow-lg bg-white relative z-20">
                
                {/* Form Title bar */}
                <div className="bg-[#0d3859] text-white text-center py-3 text-xs font-bold uppercase tracking-widest rounded-t-xl">
                  Plan Your Trip
                </div>

                {/* Form Body Inputs */}
                <form onSubmit={handleSearchSubmit} className="p-3.5 flex flex-col gap-2.5 bg-white rounded-b-xl">
                  
                  {/* Row 1: Destination */}
                  <div className="border border-slate-200 rounded-lg flex items-stretch h-10 bg-white relative z-30">
                    
                    {/* Left Label block with outline location pin SVG */}
                    <div className="w-[42%] bg-white border-r border-slate-200 flex items-center gap-2 px-3 text-slate-800 font-semibold text-[13px] select-none rounded-l-lg">
                      <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      Destination
                    </div>

                    {/* Right Input selection */}
                    <div className="w-[58%] relative flex items-center">
                      <input
                        type="text"
                        placeholder="Where to go?"
                        value={customDestText}
                        onClick={() => setIsDestDropdownOpen(true)}
                        readOnly
                        className="w-full h-full text-slate-700 px-3 outline-none bg-transparent cursor-pointer text-[13px] font-bold"
                        required
                      />
                      <div className="absolute right-3 pointer-events-none text-slate-400 text-[0.6rem]">▼</div>

                      {/* Dropdown Menu Overlay */}
                      {isDestDropdownOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsDestDropdownOpen(false);
                            }} 
                          />
                          <div className="absolute top-11 -right-2 w-[240px] xs:w-[280px] bg-white border border-slate-200 rounded-xl shadow-2xl z-50 p-2.5 flex flex-col gap-2 max-h-72 overflow-y-auto">
                            
                            {/* Custom Search/Type Input */}
                            <div className="relative">
                              <input 
                                type="text"
                                placeholder="🔍 Enter any destination..."
                                value={customDestText}
                                onChange={(e) => {
                                  setCustomDestText(e.target.value);
                                  setSearchParams({ ...searchParams, toCity: e.target.value });
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold outline-none focus:border-[#00b4d8] text-slate-800 bg-slate-50"
                              />
                            </div>

                            {/* Tour Packages Shortcut Link */}
                            <button
                              type="button"
                              onClick={() => {
                                setIsDestDropdownOpen(false);
                                setCurrentPage('packages');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="w-full text-left px-3 py-2 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-orange-600 text-xs font-black flex items-center justify-between border border-orange-200 transition-colors"
                            >
                              <span>📦 View Tour Packages</span>
                              <span>➔</span>
                            </button>

                            {/* Choose Location on Map Shortcut Link */}
                            <button
                              type="button"
                              onClick={() => {
                                setIsDestDropdownOpen(false);
                                setShowMap(true);
                              }}
                              className="w-full text-left px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 text-cyan-650 text-xs font-black flex items-center justify-between border border-cyan-200 transition-colors"
                            >
                              <span>🗺️ Choose Location on Map</span>
                              <span>➔</span>
                            </button>

                            <div className="text-[0.58rem] font-black text-slate-400 uppercase tracking-widest px-2.5 pt-1.5 border-t border-slate-100">
                              Direct Destinations
                            </div>

                            {/* Popular Selection options */}
                            <div className="flex flex-col gap-0.5">
                              {[
                                { label: 'Mahabaleshwar', value: 'Mahabaleshwar, Maharashtra, India' },
                                { label: 'Mumbai City', value: 'Mumbai, Maharashtra, India' },
                                { label: 'Shirdi Temple', value: 'Shirdi, Maharashtra, India' },
                                { label: 'Pune City', value: 'Pune, Maharashtra, India' }
                              ].map(dest => (
                                <button
                                  key={dest.value}
                                  type="button"
                                  onClick={() => {
                                    setSearchParams({ ...searchParams, toCity: dest.value });
                                    setCustomDestText(dest.label);
                                    setIsDestDropdownOpen(false);
                                  }}
                                  className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#00b4d8] transition-colors"
                                >
                                  📍 {dest.label}
                                </button>
                              ))}
                            </div>

                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Departure Date */}
                  <div className="grid grid-cols-2 gap-3.5">
                    {/* Left box */}
                    <div className="border border-slate-200 rounded-lg bg-white flex items-center gap-2 px-3 h-10 text-slate-800 font-semibold text-[13px] select-none">
                      <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                      Departure
                    </div>

                    {/* Right box */}
                    <div className="border border-slate-200 rounded-lg bg-white flex items-center px-3 h-10">
                      <input 
                        type="date"
                        value={searchParams.date}
                        onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full h-full text-slate-500 outline-none bg-transparent cursor-pointer text-[13px]"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 3: Return Date */}
                  <div className="grid grid-cols-2 gap-3.5">
                    {/* Left box */}
                    <div className="border border-slate-200 rounded-lg bg-white flex items-center gap-2 px-3 h-10 text-slate-800 font-semibold text-[13px] select-none">
                      <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                      Return
                    </div>

                    {/* Right box */}
                    <div className="border border-slate-200 rounded-lg bg-white flex items-center px-3 h-10">
                      <input 
                        type="date"
                        value={searchParams.returnDate || ''}
                        onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
                        min={searchParams.date || new Date().toISOString().split('T')[0]}
                        className="w-full h-full text-slate-500 outline-none bg-transparent cursor-pointer text-[13px]"
                        placeholder="Select Date"
                      />
                    </div>
                  </div>

                  {/* Row 4: Travelers */}
                  <div className="grid grid-cols-2 gap-3.5">
                    {/* Left box */}
                    <div className="border border-slate-200 rounded-lg bg-white flex items-center gap-2 px-3 h-10 text-slate-800 font-semibold text-[13px] select-none">
                      <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                      Travelers
                    </div>

                    {/* Right box */}
                    <div className="border border-slate-200 rounded-lg bg-white flex items-center px-3 h-10 relative">
                      <select
                        value={searchParams.travelers || '2'}
                        onChange={(e) => setSearchParams({ ...searchParams, travelers: e.target.value })}
                        className="w-full h-full text-slate-850 font-medium outline-none bg-transparent appearance-none cursor-pointer text-[13px]"
                      >
                        <option value="2">2 Adults</option>
                        <option value="4">4 Adults</option>
                        <option value="7">7 Pax</option>
                        <option value="12">12+ Pax</option>
                      </select>
                      <div className="absolute right-3 pointer-events-none text-slate-400 text-[0.6rem]">▼</div>
                    </div>
                  </div>

                  {/* Row 5: Vehicle Type */}
                  <div className="grid grid-cols-2 gap-3.5">
                    {/* Left box */}
                    <div className="border border-slate-200 rounded-lg bg-white flex items-center gap-2 px-3 h-10 text-slate-800 font-semibold text-[13px] select-none">
                      <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.75a1.125 1.125 0 0 1-1.125-1.125V15h1.5a1.5 1.5 0 0 0 0-3h-1.5V6.75A2.25 2.25 0 0 1 4.875 4.5h14.25a2.25 2.25 0 0 1 2.25 2.25v5.25H21a1.5 1.5 0 0 0 0 3h1.5v2.625a1.125 1.125 0 0 1-1.125 1.125H18.75a1.5 1.5 0 0 1-3 0m0 0a1.5 1.5 0 0 0-3 0m3 0h-1.5" />
                      </svg>
                      Vehicle Type
                    </div>

                    {/* Right box */}
                    <div className="border border-slate-200 rounded-lg bg-white flex items-center px-3 h-10 relative">
                      <select
                        value={searchParams.tripType || 'oneway'}
                        onChange={(e) => setSearchParams({ ...searchParams, tripType: e.target.value })}
                        className="w-full h-full text-slate-855 font-semibold outline-none bg-transparent appearance-none cursor-pointer text-[13px]"
                      >
                        <option value="oneway">Luxury Minibus</option>
                        <option value="roundtrip">SUV / Innova</option>
                        <option value="local">Sedan / Swift</option>
                      </select>
                      <div className="absolute right-3 pointer-events-none text-slate-400 text-[0.6rem]">▼</div>
                    </div>
                  </div>

                  {/* Gold Search Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#c69b3f] hover:bg-[#b08732] text-white text-xs font-bold rounded-lg transition-colors shadow-sm uppercase tracking-widest mt-1 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    Search Tours
                  </button>

                </form>

              </div>

            </div>
          </div>
          
          {/* Right Column */}
          <div className={`lg:col-span-7 flex flex-col justify-center items-center py-4 px-4 sm:px-6 lg:px-8 select-none transition-all ${
            showMap ? 'flex w-full min-h-[400px] lg:min-h-auto pointer-events-auto' : 'hidden lg:flex pointer-events-none'
          }`}>
            {showMap ? (
              <div className="bg-white border border-[#0d3859]/30 rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col pointer-events-auto animate-fade">
                {/* Header */}
                <div className="px-5 py-3.5 bg-gradient-to-r from-[#0d3859] to-[#0a2540] text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🗺️</span>
                    <span className="text-xs font-black uppercase tracking-wider">Choose Location on Map</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowMap(false)}
                    className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col gap-4">
                  <p className="text-[0.68rem] text-slate-500 font-bold leading-normal">
                    Click anywhere on the map or drag the location pin to select your target tour destination.
                  </p>

                  {/* Search bar overlay */}
                  <div className="flex gap-2 w-full">
                    <input 
                      type="text"
                      placeholder="🔍 Search location (e.g. Mahabaleshwar, Mumbai)..."
                      value={mapSearchQuery}
                      onChange={(e) => setMapSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleMapSearchSubmit();
                        }
                      }}
                      className="flex-1 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold outline-none text-slate-850 bg-slate-50 focus:bg-white focus:border-[#00b4d8] transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={handleMapSearchSubmit}
                      disabled={searchingMap}
                      className="px-4 py-2 bg-[#0d3859] hover:bg-[#00b4d8] disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl text-xs font-black transition-colors shadow-md shadow-[#0d3859]/10"
                    >
                      {searchingMap ? 'Searching...' : 'Search'}
                    </button>
                  </div>

                  {/* Map Container */}
                  <div 
                    id="map-container" 
                    className="w-full h-64 sm:h-72 rounded-xl border border-slate-200 shadow-inner overflow-hidden z-0"
                  />

                  {/* Selected Location Address block & estimates */}
                  <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl flex flex-col gap-3">
                    {/* Address row */}
                    <div className="flex items-start gap-2.5">
                      <span className="text-base shrink-0 mt-0.5">📍</span>
                      <div className="flex flex-col">
                        <span className="text-[0.55rem] font-black text-slate-400 uppercase tracking-widest leading-none">Selected Address</span>
                        <span className="text-xs font-black text-slate-850 leading-normal mt-1 break-words">
                          {selectedMapAddress || 'Resolving location pin...'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Estimates row */}
                    {estimatedKm !== null && (
                      <div className="flex border-t border-slate-200/60 pt-3 justify-between items-center px-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">🛣️</span>
                          <div className="flex flex-col">
                            <span className="text-[0.52rem] font-bold text-slate-400 uppercase tracking-wider leading-none">Distance</span>
                            <span className="text-xs font-black text-[#00b4d8] mt-1">{estimatedKm > 0 ? `${estimatedKm} km` : 'Local Area'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-xs">⏱️</span>
                          <div className="flex flex-col">
                            <span className="text-[0.52rem] font-bold text-slate-400 uppercase tracking-wider leading-none">Est. Duration</span>
                            <span className="text-xs font-black text-[#00b4d8] mt-1">{estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowMap(false)}
                    className="px-4 py-2 border border-slate-200 bg-white rounded-xl text-xs font-black text-slate-505 hover:bg-slate-50 active:scale-95 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchParams({ ...searchParams, toCity: selectedMapAddress });
                      setCustomDestText(selectedMapAddress.split(',')[0]);
                      setShowMap(false);
                    }}
                    disabled={!selectedMapAddress}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-black shadow-md shadow-orange-500/10 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Location
                  </button>
                </div>
              </div>
            ) : (
              // 4 separate features grid drawn directly on the background
              <div className="w-full max-w-[530px] grid grid-cols-4 gap-4 z-20 pointer-events-auto mt-auto pb-2">
                
                {/* Feature 1: Comfortable Seating */}
                <div className="flex flex-col items-center text-center">
                  <svg className="w-6 h-6 text-slate-700 mb-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 18H8.5a3.5 3.5 0 0 1-3.5-3.5V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6.5a1.5 1.5 0 0 0 1.5 1.5H19a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 18v2m-6-2v2" />
                  </svg>
                  <span className="text-[10px] xl:text-[10.5px] font-extrabold text-slate-800 tracking-tight leading-tight uppercase mt-1.5">
                    Comfortable Seating
                  </span>
                </div>

                {/* Feature 2: AC & WiFi */}
                <div className="flex flex-col items-center text-center">
                  <svg className="w-6 h-6 text-slate-700 mb-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v.008H12V19.5zm-3.75-3.75a5.303 5.303 0 0 1 7.5 0M5.25 12a10.607 10.607 0 0 1 13.5 0M3 8.25a15.91 15.91 0 0 1 18 0" />
                  </svg>
                  <span className="text-[10px] xl:text-[10.5px] font-extrabold text-slate-800 tracking-tight leading-tight uppercase mt-1.5">
                    AC & WiFi
                  </span>
                </div>

                {/* Feature 3: Professional Drivers */}
                <div className="flex flex-col items-center text-center">
                  <svg className="w-6 h-6 text-slate-700 mb-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <span className="text-[10px] xl:text-[10.5px] font-extrabold text-slate-800 tracking-tight leading-tight uppercase mt-1.5">
                    Professional Drivers
                  </span>
                </div>

                {/* Feature 4: On-Time Service */}
                <div className="flex flex-col items-center text-center">
                  <svg className="w-6 h-6 text-slate-700 mb-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                  </svg>
                  <span className="text-[10px] xl:text-[10.5px] font-extrabold text-slate-800 tracking-tight leading-tight uppercase mt-1.5">
                    On-Time Service
                  </span>
                </div>

              </div>
            )}
          </div>

        </div>

      </section>

      {/* Fallback collage column layout for mobile/smaller screens where absolute background stretching is inactive */}
      <div className="lg:hidden bg-[#f4f3ed] p-6 flex flex-col items-center gap-6 select-none w-full">
        {/* Mobile arches with menu text cropped out */}
        <div className="w-full overflow-hidden relative">
          <div className="relative overflow-hidden" style={{ maxHeight: '420px' }}>
            <img 
              src="/hero-right-collage.png" 
              alt="Pooja Travels Maharashtra Tours" 
              className="w-full h-auto object-contain pointer-events-none"
              style={{
                marginTop: '-9.2%',
                clipPath: 'inset(9.2% 0 0 0)'
              }}
            />
          </div>
        </div>
        
        {/* Mobile features row directly on background */}
        <div className="w-full max-w-[500px] grid grid-cols-4 gap-2 bg-transparent">
          
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <svg className="w-5.5 h-5.5 text-slate-700 mb-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 18H8.5a3.5 3.5 0 0 1-3.5-3.5V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6.5a1.5 1.5 0 0 0 1.5 1.5H19a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18v2m-6-2v2" />
            </svg>
            <span className="text-[9px] font-black text-slate-800 tracking-tight leading-tight uppercase mt-1.5">
              Comfortable Seating
            </span>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <svg className="w-5.5 h-5.5 text-slate-700 mb-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v.008H12V19.5zm-3.75-3.75a5.303 5.303 0 0 1 7.5 0M5.25 12a10.607 10.607 0 0 1 13.5 0M3 8.25a15.91 15.91 0 0 1 18 0" />
            </svg>
            <span className="text-[9px] font-black text-slate-800 tracking-tight leading-tight uppercase mt-1.5">
              AC & WiFi
            </span>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center">
            <svg className="w-5.5 h-5.5 text-slate-700 mb-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span className="text-[9px] font-black text-slate-800 tracking-tight leading-tight uppercase mt-1.5">
              Professional Drivers
            </span>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center">
            <svg className="w-5.5 h-5.5 text-slate-700 mb-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            <span className="text-[9px] font-black text-slate-800 tracking-tight leading-tight uppercase mt-1.5">
              On-Time Service
            </span>
          </div>

        </div>

      </div>

      {/* 3. HOMEPAGE SUB-SECTIONS (Enables sticky header behavior over the entire scroll view) */}
      <div className="w-full bg-white select-none pointer-events-auto relative z-10">
        <FleetSection 
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setCurrentPage={setCurrentPage}
          setSelectedRouteName={setSelectedRouteName}
        />
        <WhyChooseUs />
        <PopularPackages 
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setCurrentPage={setCurrentPage}
          setSelectedRouteName={setSelectedRouteName}
        />
        <HowItWorks />
        <Reviews setCurrentPage={setCurrentPage} />
        <OurServices />
      </div>



    </div>
  );
}
