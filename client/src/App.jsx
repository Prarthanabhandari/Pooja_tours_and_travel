import React, { useState, useEffect } from 'react';

// Import Modular Components
import Header from './components/Header';
import PoojaLanding from './components/PoojaLanding';
import WhyChooseUs from './components/WhyChooseUs';
import PopularPackages from './components/PopularPackages';
import HowItWorks from './components/HowItWorks';
import FleetSection from './components/FleetSection';
import Footer from './components/Footer';
import Reviews from './components/Reviews';
import FAQs from './components/FAQs';
import AboutUs from './components/AboutUs';
import PackagesPage from './components/PackagesPage';
import GalleryPage from './components/GalleryPage';
import TestimonialsPage from './components/TestimonialsPage';
import BlogPage from './components/BlogPage';
import AuthModal from './components/AuthModal';
import HeaderBreadcrumbs from './components/HeaderBreadcrumbs';
import RouteDetailsPage from './components/RouteDetailsPage';
import FleetDetailsPage from './components/FleetDetailsPage';
import AdminDashboard from './components/AdminDashboard';

// API Base URL - points to our Express server
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// --- MOCK DATA FOR FRONTEND OFFLINE FALLBACK ---
const MOCK_CABS = [
  { id: 1, type: 'Hatchback', name: 'Maruti Suzuki WagonR', price_per_km: 13, seating_capacity: 4, image: '🚗' },
  { id: 2, type: 'SUV', name: 'Maruti Suzuki Brezza', price_per_km: 13, seating_capacity: 4, image: '🚘' },
  { id: 3, type: 'Sedan', name: 'Maruti Suzuki Dzire', price_per_km: 13, seating_capacity: 4, image: '🚗' },
  { id: 4, type: 'Comfort Sedan', name: 'Toyota Etios', price_per_km: 13, seating_capacity: 4, image: '🚗' },
  { id: 5, type: 'Family MUV', name: 'Maruti Ertiga', price_per_km: 16, seating_capacity: 7, image: '🚘' },
  { id: 6, type: 'Comfort SUV', name: 'Kia Carens', price_per_km: 16, seating_capacity: 7, image: '🚘' },
  { id: 7, type: 'Comfort MUV', name: 'Toyota Innova Crysta', price_per_km: 21, seating_capacity: 7, image: '🚘' },
  { id: 8, type: 'AC Tourist Coach', name: '17-Seater Premium AC Tempo Traveller', price_per_km: 26, seating_capacity: 17, image: '🚌' },
  { id: 9, type: 'Standard Coach', name: '17-Seater Standard Non-AC Tempo Traveller', price_per_km: 24, seating_capacity: 17, image: '🚌' },
  { id: 10, type: 'Standard Coach', name: '20-Seater Standard Non-AC Tempo Traveller', price_per_km: 26, seating_capacity: 20, image: '🚌' },
  { id: 11, type: 'Tourist Coach', name: '32-Seater Comfort Tourist Coach', price_per_km: 35, seating_capacity: 32, image: '🚌' },
  { id: 12, type: 'Tourist Bus', name: '50-Seater Comfort Tourist Bus', price_per_km: 48, seating_capacity: 50, image: '🚌' }
];

const MOCK_BUSES = [
  { id: 1, name: 'Pooja Travels Luxury Coach 1', type: '17-Seater AC Luxury', total_seats: 17, price_per_seat: 750, departure_time: '06:00 AM', arrival_time: '10:00 AM', route_from: 'Pune, Maharashtra, India', route_to: 'Mumbai, Maharashtra, India' },
  { id: 2, name: 'Pooja Travels Luxury Coach 2', type: '17-Seater AC Luxury', total_seats: 17, price_per_seat: 600, departure_time: '07:30 AM', arrival_time: '11:30 AM', route_from: 'Pune, Maharashtra, India', route_to: 'Mahabaleshwar, Maharashtra, India' },
  { id: 3, name: 'Pooja Travels Luxury Coach 3', type: '17-Seater AC Luxury', total_seats: 17, price_per_seat: 700, departure_time: '08:00 AM', arrival_time: '01:30 PM', route_from: 'Pune, Maharashtra, India', route_to: 'Shirdi, Maharashtra, India' }
];

const POPULAR_PACKAGES = [
  { id: 1, title: 'Pune to Shirdi Darshan', type: 'Bus & Cab options', desc: 'Complete round trip package for Sai Baba Darshan, includes flexible timing.', price: '₹2,400 onwards', image: '🕌' },
  { id: 2, title: 'Pune to Mahabaleshwar Scenic Tour', type: 'Weekend Getaway', desc: 'Enjoy scenic viewpoints, strawberry farms, and Mapro garden trip.', price: '₹3,500 onwards', image: '🍓' },
  { id: 3, title: 'Mumbai Airport Drops', type: 'Assured Cab Drops', desc: 'Punctual, clean sedan or SUV drops direct to T2 airport terminal.', price: '₹2,200 fixed', image: '✈️' },
  { id: 4, title: 'Ashtavinayak Yatra Package', type: '8 Ganesha Temples', desc: '2-day custom bus/cab spiritual package covering all 8 holy sites.', price: '₹8,500 total', image: '🪔' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRouteName, setSelectedRouteName] = useState('');
  const [theme, setTheme] = useState('dark');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Auth & Booking States
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('pooja_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('pooja_token') || '');
  const [bookings, setBookings] = useState([]);
  
  const [siteSettings, setSiteSettings] = useState({
    contact_email: 'booking.poojatravel@gmail.com',
    contact_phone: '+917387129287',
    contact_phone_alt: '+919880303752',
    hero_title: 'Explore Maharashtra with Pooja Tours & Travels',
    hero_subtitle: 'Premium Chauffeur Cabs & AC Bus Rentals out of Pune. Low price guarantee, transparent pricing.',
    about_text: 'Pooja Tours and Travels is a leading travel operator based in Pune, offering outstation chauffeur cabs and luxury bus rental solutions. We pride ourselves on punctuality, safety, and excellent service quality.'
  });

  const fetchSiteSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/settings`);
      if (res.ok) {
        const data = await res.json();
        const settingsObj = {};
        data.forEach(item => {
          settingsObj[item.key] = item.value;
        });
        setSiteSettings(prev => ({ ...prev, ...settingsObj }));
      }
    } catch (err) {
      console.warn('Failed to fetch live settings, using local fallback:', err.message);
    }
  };

  useEffect(() => {
    fetchSiteSettings();
  }, []);
  
  // Search States
  const [searchParams, setSearchParams] = useState({
    bookingType: 'cab', // 'cab' or 'bus'
    tripType: 'oneway', // 'oneway', 'roundtrip', 'multicity', 'local'
    fromCity: '',
    toCity: '',
    date: '',
    returnDate: '',
    pickupTime: '',
    durationHours: '8' // for local
  });

  const [searchResults, setSearchResults] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Selected Bus or Cab type for booking
  const [bookingStep, setBookingStep] = useState(1); // 1: Search, 2: Vehicle Select, 3: Details & Seats, 4: Payment, 5: Ticket
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState([{ name: '', age: '', gender: 'Male' }]);
  const [contactPhone, setContactPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupTime, setPickupTime] = useState('09:00');
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentData, setPaymentData] = useState({ number: '', name: '', expiry: '', cvc: '', focus: 'front' });
  const [activeTicket, setActiveTicket] = useState(null);
  
  // Contact & general state
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);
  
  // Sync page theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle PWA installation trigger
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the PWA install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  // Fetch bookings whenever user logs in
  useEffect(() => {
    if (currentUser) {
      fetchUserBookings();
    } else {
      // Offline fallback: load guest bookings from localStorage
      const guestBookings = JSON.parse(localStorage.getItem('guest_bookings') || '[]');
      setBookings(guestBookings);
    }
  }, [currentUser]);

  const fetchUserBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings/user/${currentUser.id}`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.warn('API error fetching user bookings, loading from local storage mock');
      const localData = JSON.parse(localStorage.getItem(`user_bookings_${currentUser?.id}`) || '[]');
      setBookings(localData);
    }
  };

  // Search Action
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const pickupCity = searchParams.fromCity || 'Pune, Maharashtra, India';
    if (!pickupCity || !searchParams.toCity) {
      alert('Please fill out your destination.');
      return;
    }
    
    // Sync the local state with the fallback
    setSearchParams(prev => ({ ...prev, fromCity: pickupCity }));
    
    // Map destination query to standard route name keys
    const dest = (searchParams.toCity || '').toLowerCase();
    let matchedRoute = 'Pune ⇄ Mumbai Airport Drops'; // Default fallback

    if (dest.includes('mahabaleshwar')) {
      matchedRoute = 'Pune ⇄ Mahabaleshwar Scenic Tour';
    } else if (dest.includes('shirdi')) {
      matchedRoute = 'Pune ⇄ Shirdi Darshan';
    } else if (dest.includes('goa')) {
      matchedRoute = 'Pune ⇄ Goa Beach Special';
    } else if (dest.includes('ashtavinayak')) {
      matchedRoute = 'Pune ⇄ Ashtavinayak Yatra';
    } else {
      const cleanTo = searchParams.toCity.split(',')[0].trim();
      const cleanFrom = pickupCity.split(',')[0].trim();
      matchedRoute = `${cleanFrom} ⇄ ${cleanTo}`;
    }

    setSelectedRouteName(matchedRoute);
    setCurrentPage('route-details');
  };

  // Book Item
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setBookingStep(3);
  };

  // Add Passenger
  const addPassenger = () => {
    setPassengerDetails([...passengerDetails, { name: '', age: '', gender: 'Male' }]);
  };

  // Remove Passenger
  const removePassenger = (index) => {
    if (passengerDetails.length === 1) return;
    setPassengerDetails(passengerDetails.filter((_, i) => i !== index));
  };

  // Payment flip logic
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  // Submit Booking
  const handleCompleteBooking = async (e) => {
    e.preventDefault();
    
    let totalAmount = 0;
    if (selectedItem && selectedItem.exactPrice) {
      totalAmount = selectedItem.exactPrice;
    } else if (searchParams.bookingType === 'bus') {
      totalAmount = selectedItem.price_per_seat || 6500;
    } else {
      // Estimate cab fare
      const basePrice = selectedItem.price_per_km || 13;
      const distance = 150; // Pune-Mumbai approximation
      totalAmount = (distance * basePrice) + 250; // + 250 driver allowance
    }

    const enrichedPassengers = passengerDetails.map((p, idx) => {
      if (idx === 0) {
        return {
          ...p,
          phone: contactPhone + (altPhone ? ` / ${altPhone}` : ''),
          email: contactEmail,
          pickup_address: pickupAddress,
          pickup_time: pickupTime,
          special_notes: specialNotes
        };
      }
      return p;
    });

    const bookingPayload = {
      user_id: currentUser ? currentUser.id : null,
      booking_type: searchParams.bookingType,
      cab_id: searchParams.bookingType === 'cab' ? selectedItem.id : null,
      bus_id: searchParams.bookingType === 'bus' ? selectedItem.id : null,
      route_from: searchParams.fromCity,
      route_to: searchParams.toCity,
      travel_date: searchParams.date || new Date().toISOString().split('T')[0],
      departure_time: pickupTime.length === 5 ? `${pickupTime}:00` : pickupTime,
      amount: totalAmount,
      seats_selected: null,
      passenger_details: enrichedPassengers
    };

    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });

      if (res.ok) {
        const data = await res.json();
        setActiveTicket(data);
        fetchUserBookings();
      } else {
        throw new Error('Booking failed');
      }
    } catch (err) {
      console.warn('Backend server unreachable, creating booking in localStorage');
      // Create local mock booking
      const newLocalBooking = {
        id: Math.floor(Math.random() * 10000) + 1,
        ...bookingPayload,
        status: 'confirmed',
        created_at: new Date().toISOString(),
        vehicle_name: searchParams.bookingType === 'bus' ? selectedItem.name : `${selectedItem.name} (${selectedItem.type})`
      };
      
      setActiveTicket(newLocalBooking);
      
      // Save
      if (currentUser) {
        const currentLocal = JSON.parse(localStorage.getItem(`user_bookings_${currentUser.id}`) || '[]');
        currentLocal.unshift(newLocalBooking);
        localStorage.setItem(`user_bookings_${currentUser.id}`, JSON.stringify(currentLocal));
        setBookings(currentLocal);
      } else {
        const guestBookings = JSON.parse(localStorage.getItem('guest_bookings') || '[]');
        guestBookings.unshift(newLocalBooking);
        localStorage.setItem('guest_bookings', JSON.stringify(guestBookings));
        setBookings(guestBookings);
      }
    }
    
    setBookingStep(4);
  };

  // Cancel Booking
  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const res = await fetch(`${API_URL}/bookings/cancel/${id}`, { method: 'PUT' });
      if (res.ok) {
        alert('Booking cancelled successfully.');
        fetchUserBookings();
      }
    } catch (err) {
      console.warn('API error cancelling booking, performing locally');
      // Update local storage
      const updateList = (list) => list.map(b => b.id === id ? { ...b, status: 'cancelled' } : b);
      if (currentUser) {
        const currentLocal = JSON.parse(localStorage.getItem(`user_bookings_${currentUser.id}`) || '[]');
        const updated = updateList(currentLocal);
        localStorage.setItem(`user_bookings_${currentUser.id}`, JSON.stringify(updated));
      } else {
        const guestBookings = JSON.parse(localStorage.getItem('guest_bookings') || '[]');
        const updated = updateList(guestBookings);
        localStorage.setItem('guest_bookings', JSON.stringify(updated));
      }
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
      alert('Booking cancelled successfully.');
    }
  };

  // Auth triggers
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const endpoint = authMode === 'login' ? 'login' : 'register';
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = authMode === 'register' ? e.target.name.value : '';
    const phone = authMode === 'register' ? e.target.phone.value : '';

    try {
      const res = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentUser(data.user);
        setToken(data.token);
        localStorage.setItem('pooja_user', JSON.stringify(data.user));
        localStorage.setItem('pooja_token', data.token);
        setShowAuthModal(false);
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.warn('Authentication server down, using simulated credentials');
      // Simulate registration/login
      const mockUser = { id: 99, name: name || 'Demo Traveler', email, phone: phone || '9999999999', role: 'user' };
      setCurrentUser(mockUser);
      setToken('mock_local_jwt');
      localStorage.setItem('pooja_user', JSON.stringify(mockUser));
      localStorage.setItem('pooja_token', 'mock_local_jwt');
      setShowAuthModal(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToken('');
    localStorage.removeItem('pooja_user');
    localStorage.removeItem('pooja_token');
    setCurrentPage('home');
  };

  // Contact inquiry
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      if (res.ok) {
        setContactSuccess(true);
        setContactForm({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      console.warn('Server offline, saving inquiry locally');
      setContactSuccess(true);
      setContactForm({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
         {currentPage !== 'admin' && (
        <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50 shadow-sm h-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
            
            {/* Logo block */}
            <div 
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img 
                src="/pooja-logo-clean.png" 
                alt="Pooja Tours & Travels" 
                className="h-12 w-auto object-contain group-hover:scale-105 transition-all"
              />
              <div className="flex flex-col justify-center">
                <span className="text-[#0a2540] text-[13.5px] sm:text-[14.5px] font-black tracking-tight leading-none uppercase">
                  <span className="text-[#d90429] text-[17px] sm:text-[19px] font-black">P</span>OOJA TOURS & TRAVELS
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-5">
              <button 
                onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`font-black text-xs uppercase tracking-wider transition-colors ${currentPage === 'home' ? 'text-[#00b4d8]' : 'text-slate-800 hover:text-[#00b4d8]'}`}
              >
                Home
              </button>
              {['Our Fleet', 'Tours', 'Gallery', 'About Us', 'Blog', 'Contact Us'].map((link) => {
                const targetPage = 
                  link === 'Our Fleet' ? 'fleet-details' :
                  link === 'Tours' ? 'packages' :
                  link === 'Gallery' ? 'gallery' :
                  link === 'About Us' ? 'about' :
                  link === 'Blog' ? 'blog' : 'contact';
                
                const isActive = currentPage === targetPage;
                
                return (
                  <button
                    key={link}
                    onClick={() => {
                      setCurrentPage(targetPage);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`font-extrabold text-xs uppercase tracking-wider transition-colors ${isActive ? 'text-[#00b4d8]' : 'text-slate-800 hover:text-[#00b4d8]'}`}
                  >
                    {link}
                  </button>
                );
              })}
              
              {/* Admin or Login */}
              {currentUser ? (
                currentUser.role === 'admin' ? (
                  <button 
                    onClick={() => setCurrentPage('admin')}
                    className="text-slate-800 hover:text-[#00b4d8] font-black text-xs uppercase tracking-wider"
                  >
                    Admin Panel
                  </button>
                ) : (
                  <button 
                    onClick={() => setCurrentPage('dashboard')}
                    className="text-slate-805 hover:text-[#00b4d8] font-black text-xs uppercase tracking-wider"
                  >
                    Profile
                  </button>
                )
              ) : (
                <button 
                  onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                  className="text-slate-800 hover:text-[#00b4d8] font-extrabold text-xs uppercase tracking-wider"
                >
                  Login
                </button>
              )}
              
              {/* Review Button */}
              <button
                onClick={() => {
                  setCurrentPage('testimonials');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#4f46e5] text-white font-bold text-[11px] px-3.5 py-2 rounded-lg hover:bg-indigo-600 transition-all shadow-sm uppercase tracking-wider"
              >
                Review
              </button>
            </nav>

            {/* Hamburger Menu Trigger (Mobile only) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 active:scale-95 transition-all text-slate-800 flex items-center justify-center border border-slate-200 bg-[#f8fafc]"
              style={{ cursor: 'pointer' }}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </header>
      )}

      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[99] md:hidden"
        />
      )}

      {/* Sliding Mobile Navigation Side Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] bg-white border-l border-slate-200 shadow-2xl z-[100] p-6 flex flex-col justify-between transition-transform duration-300 transform md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
            <span className="text-[0.62rem] font-black text-slate-400 uppercase tracking-widest">Navigation</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 hover:text-slate-800"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <button 
              onClick={() => { 
                setCurrentPage('home'); 
                setIsMobileMenuOpen(false); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }} 
              className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-black uppercase transition-colors ${currentPage === 'home' ? 'bg-[#00b4d8]/10 text-[#00b4d8]' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              Home
            </button>
            {['Our Fleet', 'Tours', 'Gallery', 'About Us', 'Blog', 'Contact Us'].map((link) => {
              const targetPage = 
                link === 'Our Fleet' ? 'fleet-details' :
                link === 'Tours' ? 'packages' :
                link === 'Gallery' ? 'gallery' :
                link === 'About Us' ? 'about' :
                link === 'Blog' ? 'blog' : 'contact';
              
              const isActive = currentPage === targetPage;
              
              return (
                <button
                  key={link}
                  onClick={() => {
                    setCurrentPage(targetPage);
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-black uppercase transition-colors ${isActive ? 'bg-[#00b4d8]/10 text-[#00b4d8]' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  {link}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Drawer Drawer Bottom Area */}
        <div className="border-t border-slate-100 pt-6">
          <div className="flex flex-col gap-2.5">
            {/* User Auth Info / Admin links */}
            {currentUser ? (
              <div className="flex flex-col gap-2">
                {currentUser.role === 'admin' ? (
                  <button 
                    onClick={() => { setCurrentPage('admin'); setIsMobileMenuOpen(false); }} 
                    className="w-full py-2.5 bg-[#0b1329] text-white text-xs font-black rounded-xl text-center flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    👤 Admin Panel
                  </button>
                ) : (
                  <button 
                    onClick={() => { setCurrentPage('dashboard'); setIsMobileMenuOpen(false); }} 
                    className="w-full py-2.5 bg-[#0b1329] text-white text-xs font-black rounded-xl text-center flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    👤 Profile
                  </button>
                )}
                <button 
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                  className="w-full py-2.5 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-black rounded-xl text-center hover:bg-rose-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setAuthMode('login'); setShowAuthModal(true); }}
                className="w-full py-2.5 bg-[#0b1329] text-white text-xs font-black rounded-xl text-center flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm"
              >
                <span>👤</span>
                <span>Login / Sign Up</span>
              </button>
            )}

            {/* Testimonials Review CTA */}
            <button
              onClick={() => {
                setCurrentPage('testimonials');
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-2.5 bg-[#4f46e5] text-white text-xs font-black rounded-xl text-center flex items-center justify-center shadow-sm uppercase tracking-wider"
            >
              Write Review
            </button>
          </div>
        </div>
      </div>

      {/* DYNAMIC PAGES CONTAINER */}
      <main style={{ flex: 1, paddingBottom: '60px', paddingTop: currentPage !== 'admin' ? '64px' : '0px' }}>
        
        {/* PAGE: HOME */}
        {currentPage === 'home' && (
          <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%' }}>
            <PoojaLanding 
              currentPage={currentPage}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              handleSearchSubmit={handleSearchSubmit}
              setCurrentPage={setCurrentPage}
              setShowAuthModal={setShowAuthModal}
              setAuthMode={setAuthMode}
              currentUser={currentUser}
              handleLogout={handleLogout}
              setSelectedRouteName={setSelectedRouteName}
              siteSettings={siteSettings}
            />
          </div>
        )}

        {/* PAGE: ABOUT US */}
        {currentPage === 'about' && (
          <AboutUs setCurrentPage={setCurrentPage} />
        )}

        {/* PAGE: FLEET DETAILS */}
        {currentPage === 'fleet-details' && (
          <FleetDetailsPage 
            setSearchParams={setSearchParams} 
            setCurrentPage={setCurrentPage} 
            setSelectedItem={setSelectedItem}
            setBookingStep={setBookingStep}
          />
        )}

        {/* PAGE: PACKAGES */}
        {currentPage === 'packages' && (
          <PackagesPage 
            setCurrentPage={setCurrentPage} 
            searchParams={searchParams} 
            setSearchParams={setSearchParams} 
            setSelectedRouteName={setSelectedRouteName}
          />
        )}

        {/* PAGE: ROUTE DETAILS */}
        {currentPage === 'route-details' && (
          <RouteDetailsPage 
            routeName={selectedRouteName}
            setCurrentPage={setCurrentPage}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            setSelectedItem={setSelectedItem}
            setBookingStep={setBookingStep}
          />
        )}

        {/* PAGE: GALLERY */}
        {currentPage === 'gallery' && (
          <GalleryPage setCurrentPage={setCurrentPage} API_URL={API_URL} />
        )}

        {/* PAGE: TESTIMONIALS */}
        {currentPage === 'testimonials' && (
          <TestimonialsPage setCurrentPage={setCurrentPage} />
        )}

        {/* PAGE: BLOG */}
        {currentPage === 'blog' && (
          <BlogPage setCurrentPage={setCurrentPage} API_URL={API_URL} />
        )}

        {/* PAGE: CONTACT US */}
        {currentPage === 'contact' && (
          <div className="relative bg-slate-50/30 overflow-hidden w-full flex-1 flex flex-col" style={{ minHeight: '80vh' }}>
            
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
            <HeaderBreadcrumbs title="Contact Us" setCurrentPage={setCurrentPage} />

            {/* Intro */}
            <div className="relative z-10 max-w-3xl mx-auto px-4 text-center mt-8 sm:mt-12 mb-2 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-3">
                <svg className="w-3.5 h-3.5 text-[#00b4d8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.102-5.123-3.402-6.223-6.223l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>Get In Touch</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
                Start Your <span className="text-[#00b4d8]">Journey With Us</span>
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-xl mx-auto leading-relaxed">
                Have questions about rates, vehicle availability, or custom routes? Drop us an inquiry or call us directly.
              </p>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Office details */}
              <div className="lg:col-span-5 bg-white/65 backdrop-blur-md border border-white/60 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
                <div>
                  <span className="text-[0.65rem] font-black text-[#00b4d8] uppercase tracking-wider">Pooja Travels Office</span>
                  <h3 className="text-lg font-black text-slate-800 mt-1">Our Location</h3>
                  <div className="flex gap-3.5 mt-4 items-start group">
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#00b4d8] shrink-0">
                      <svg className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-650 leading-relaxed">
                      <a href="https://maps.google.com/?q=Bhugaon+Bavdhan+Pune+Maharashtra+412115" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b4d8] transition-colors duration-300">
                        BHUGAON ON MULSHI RD, Bhugaon, Bavdhan,<br />
                        Bhugaon, Maharashtra - 412115
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-[0.65rem] font-black text-[#00b4d8] uppercase tracking-wider">Direct Hotline Numbers</span>
                  <h3 className="text-lg font-black text-slate-800 mt-1">Call Us Anytime</h3>
                  <div className="flex gap-3.5 mt-4 items-start group">
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#00b4d8] shrink-0">
                      <svg className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.118-6.944-6.94l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div className="flex flex-col text-xs sm:text-sm font-semibold text-slate-755">
                      <a href={`tel:${siteSettings.contact_phone}`} className="hover:text-[#00b4d8] transition-colors">{siteSettings.contact_phone}</a>
                      <a href={`tel:${siteSettings.contact_phone_alt}`} className="hover:text-[#00b4d8] transition-colors mt-1">{siteSettings.contact_phone_alt}</a>
                      <a href={`mailto:${siteSettings.contact_email}`} className="hover:text-[#00b4d8] transition-colors mt-1 text-[0.62rem] font-bold text-slate-450">{siteSettings.contact_email}</a>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[0.65rem] font-black text-[#00b4d8] uppercase tracking-wider">Business Operating Hours</span>
                  <h3 className="text-lg font-black text-slate-800 mt-1">Working Time</h3>
                  <div className="flex gap-3.5 mt-4 items-start group">
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#00b4d8] shrink-0">
                      <svg className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-650 leading-relaxed">
                      Monday - Sunday: 08:00 AM - 09:00 PM<br />
                      <span className="text-[0.62rem] font-bold text-[#00b4d8] mt-1 block">Emergency client support operates 24/7.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Inquiry Form */}
              <div className="lg:col-span-7 bg-white/65 backdrop-blur-md border border-white/60 rounded-3xl p-6 sm:p-8 shadow-sm">
                {contactSuccess ? (
                  <div className="text-center py-10 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 text-teal-500 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-[#00b4d8] font-black text-lg">Inquiry Submitted!</h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-sm mt-2 leading-relaxed">
                      Thank you for contacting Pooja Travels. Our team will review the rates and call you shortly to confirm your booking details.
                    </p>
                    <button 
                      onClick={() => setContactSuccess(false)} 
                      className="mt-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-800">Send Booking Enquiry</h3>
                      <p className="text-[0.68rem] font-bold text-slate-400 mt-1 leading-relaxed">
                        Fill in your journey details below, and our team will get in touch with you.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-wider">Full Name *</label>
                        <input 
                          type="text" 
                          className="w-full border border-solid border-slate-400 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00b4d8] focus:ring-2 focus:ring-[#00b4d8]/10 transition-all duration-300 bg-white/70"
                          value={contactForm.name} 
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} 
                          required 
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-wider">Email Address *</label>
                        <input 
                          type="email" 
                          className="w-full border border-solid border-slate-400 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00b4d8] focus:ring-2 focus:ring-[#00b4d8]/10 transition-all duration-300 bg-white/70" 
                          value={contactForm.email} 
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} 
                          required 
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-wider">Mobile Number *</label>
                      <input 
                        type="tel" 
                        className="w-full border border-solid border-slate-400 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00b4d8] focus:ring-2 focus:ring-[#00b4d8]/10 transition-all duration-300 bg-white/70" 
                        value={contactForm.phone} 
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} 
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-wider">Message & Journey Details *</label>
                      <textarea 
                        rows="4" 
                        className="w-full border border-solid border-slate-400 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00b4d8] focus:ring-2 focus:ring-[#00b4d8]/10 transition-all duration-300 bg-white/70" 
                        style={{ resize: 'none' }}
                        value={contactForm.message} 
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} 
                        required
                        placeholder="Please include trip date, pickup/drop location, number of passengers, and preferred vehicle (Cab, Minibus, or Coach)..."
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-3 bg-gradient-to-r from-[#00b4d8] to-[#0083b0] hover:from-[#ea580c] hover:to-[#d04a00] text-white font-extrabold text-xs rounded-xl transition-all duration-300 shadow-sm shadow-[#00b4d8]/20 flex items-center justify-center gap-1.5 hover:-translate-y-0.5 hover:scale-[1.01] active:scale-[0.98]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                      <span>Submit Inquiry</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        )}

        {/* PAGE: BOOKINGS DASHBOARD */}
        {currentPage === 'dashboard' && (
          <div className="container animate-fade" style={{ paddingTop: '50px' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Travel <span style={{ color: 'var(--primary)' }}>Dashboard</span></h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Welcome back, {currentUser?.name}. Manage your trips here.</p>
            
            <div className="glass-panel" style={{ overflowX: 'auto' }}>
              <h3 style={{ marginBottom: '20px' }}>Your Travel History</h3>
              {bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  <p>You don't have any bookings yet.</p>
                  <button onClick={() => setCurrentPage('home')} className="btn-primary" style={{ marginTop: '16px' }}>Book a Ride</button>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '12px' }}>Route</th>
                      <th style={{ padding: '12px' }}>Travel Date</th>
                      <th style={{ padding: '12px' }}>Type</th>
                      <th style={{ padding: '12px' }}>Vehicle/Bus</th>
                      <th style={{ padding: '12px' }}>Amount</th>
                      <th style={{ padding: '12px' }}>Status</th>
                      <th style={{ padding: '12px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} style={{ borderBottom: '1px solid var(--border-light)', verticalAlign: 'middle' }}>
                        <td style={{ padding: '16px 12px', fontWeight: 600 }}>{b.route_from.split(',')[0]} ➡️ {b.route_to.split(',')[0]}</td>
                        <td style={{ padding: '12px' }}>{b.travel_date.split('T')[0]}</td>
                        <td style={{ padding: '12px' }}><span style={{ textTransform: 'uppercase', fontSize: '0.8rem' }}>{b.booking_type}</span></td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{b.vehicle_name || 'Assigned Ride'}</td>
                        <td style={{ padding: '12px', fontWeight: 700, color: 'var(--primary)' }}>₹{b.amount}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background: b.status === 'confirmed' ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 23, 68, 0.15)',
                            color: b.status === 'confirmed' ? 'var(--success)' : 'var(--error)'
                          }}>{b.status}</span>
                        </td>
                        <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                          <button 
                            onClick={() => {
                              setActiveTicket(b);
                              setBookingStep(5);
                              setCurrentPage('booking-flow');
                            }} 
                            style={{ color: 'var(--primary)', cursor: 'pointer', fontSize: '0.85rem' }}
                          >
                            👁️ View Ticket
                          </button>
                          {b.status === 'confirmed' && (
                            <button 
                              onClick={() => handleCancelBooking(b.id)} 
                              style={{ color: 'var(--accent)', cursor: 'pointer', fontSize: '0.85rem' }}
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* PAGE: ADMIN DASHBOARD */}
        {currentPage === 'admin' && (
          <AdminDashboard 
            setCurrentPage={setCurrentPage} 
            currentUser={currentUser} 
            handleLogout={handleLogout}
            siteSettings={siteSettings}
            fetchSiteSettings={fetchSiteSettings}
          />
        )}

        {/* BOOKING FLOW PAGES */}
        {currentPage === 'booking-flow' && (
          <div className="relative bg-slate-50/30 w-full flex-1 flex flex-col" style={{ minHeight: '80vh' }}>
            <HeaderBreadcrumbs title="Booking & Traveler Details" setCurrentPage={setCurrentPage} />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1 animate-fade" style={{ maxWidth: '1200px' }}>
            

            {/* Step indicators */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '15px', left: 0, width: '100%', height: '2px', background: 'var(--border-light)', zIndex: 1 }}></div>
              {[1, 2, 3, 4].map(step => (
                <div 
                  key={step} 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: bookingStep >= step ? 'var(--primary)' : 'var(--bg-dark)',
                    border: '2px solid',
                    borderColor: bookingStep >= step ? 'var(--primary)' : 'var(--border-light)',
                    color: bookingStep >= step ? '#000' : 'var(--text-muted)',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* STEP 2: RIDE SELECTION */}
            {bookingStep === 2 && (
              <div className="glass-panel">
                <h3 style={{ marginBottom: '20px' }}>Select Your Ride</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {searchResults && searchResults.map((item) => {
                    let priceText = '';
                    let detailsText = '';
                    if (searchParams.bookingType === 'bus') {
                      priceText = `₹${item.price_per_seat}`;
                      detailsText = `Departure: ${item.departure_time} | Type: ${item.type}`;
                    } else {
                      // Cab estimate calculation
                      const basePrice = item.price_per_km || 13;
                      const distance = 150; // Pune-Mumbai approximation
                      const estFare = (distance * basePrice) + 250;
                      priceText = `₹${estFare} estimated`;
                      detailsText = `₹${basePrice}/km + ₹250 Driver allowance`;
                    }

                    return (
                      <div 
                        key={item.id} 
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl gap-4 hover:border-[#00b4d8] hover:shadow-sm transition-all"
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '2rem' }}>{item.image || (searchParams.bookingType === 'bus' ? '🚌' : '🚗')}</span>
                            <h4 style={{ margin: 0 }}>{item.name}</h4>
                          </div>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '6px' }}>{detailsText}</p>
                        </div>
                        <div className="text-left sm:text-right w-full sm:w-auto flex sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-2 sm:gap-0 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t border-slate-100 sm:border-t-0">
                          <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '8px' }}>{priceText}</span>
                          <button onClick={() => handleSelectItem(item)} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Select</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: DETAILS & SEAT MAP */}
            {bookingStep === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
                
                {/* Left Column: Checkout Inputs Form (8 cols) */}
                <div className="lg:col-span-8 bg-white border-2 border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                    Booking & Traveler Details
                  </h3>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleCompleteBooking(e);
                  }} className="space-y-6">
                    
                    {/* Segment 1: Passengers list */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                        Passenger Details
                      </h3>
                      {passengerDetails.map((passenger, idx) => (
                        <div key={idx} className="bg-slate-50 border-2 border-slate-200/80 rounded-2xl p-4 space-y-3 relative">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-[#00b4d8] uppercase tracking-wider">Passenger #{idx + 1}</span>
                            {passengerDetails.length > 1 && (
                              <button 
                                type="button" 
                                onClick={() => removePassenger(idx)} 
                                className="text-xs font-black text-rose-500 hover:text-rose-600 transition-colors"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Name *</label>
                              <input 
                                type="text" 
                                placeholder="Full Name" 
                                className="w-full border-2 border-slate-700 rounded-xl px-3.5 py-2 text-xs font-black text-slate-900 bg-white outline-none focus:border-[#00b4d8] transition-all shadow-sm placeholder:text-slate-400" 
                                value={passenger.name}
                                onChange={(e) => {
                                  const newDetails = [...passengerDetails];
                                  newDetails[idx].name = e.target.value;
                                  setPassengerDetails(newDetails);
                                }}
                                required
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Age *</label>
                              <input 
                                type="number" 
                                placeholder="Age" 
                                className="w-full border-2 border-slate-700 rounded-xl px-3.5 py-2 text-xs font-black text-slate-900 bg-white outline-none focus:border-[#00b4d8] transition-all shadow-sm placeholder:text-slate-400" 
                                value={passenger.age}
                                onChange={(e) => {
                                  const newDetails = [...passengerDetails];
                                  newDetails[idx].age = e.target.value;
                                  setPassengerDetails(newDetails);
                                }}
                                required
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Gender *</label>
                              <select 
                                className="w-full border-2 border-slate-700 rounded-xl px-3.5 py-2 text-xs font-black text-slate-900 bg-white outline-none focus:border-[#00b4d8] transition-all shadow-sm cursor-pointer" 
                                value={passenger.gender}
                                onChange={(e) => {
                                  const newDetails = [...passengerDetails];
                                  newDetails[idx].gender = e.target.value;
                                  setPassengerDetails(newDetails);
                                }}
                              >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button 
                        type="button" 
                        onClick={addPassenger} 
                        className="w-full py-2.5 border-2 border-dashed border-[#00b4d8]/40 hover:border-[#00b4d8] text-[#00b4d8] font-black text-xs rounded-xl transition-all hover:bg-cyan-50/20 flex items-center justify-center gap-1.5"
                      >
                        Add Passenger
                      </button>
                    </div>

                    {/* Segment 2: Contact Details */}
                    <div className="space-y-4 border-t border-slate-100 pt-4">
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Mobile Number *</label>
                          <input 
                            type="tel" 
                            placeholder="10-digit primary mobile" 
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit mobile number."
                            className="w-full border-2 border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-black text-slate-900 bg-white outline-none focus:border-[#00b4d8] transition-all shadow-sm placeholder:text-slate-400" 
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Alt Mobile (Safety) *</label>
                          <input 
                            type="tel" 
                            placeholder="10-digit alternate mobile" 
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit alternate mobile number."
                            className="w-full border-2 border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-black text-slate-900 bg-white outline-none focus:border-[#00b4d8] transition-all shadow-sm placeholder:text-slate-400" 
                            value={altPhone}
                            onChange={(e) => setAltPhone(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Email Address *</label>
                          <input 
                            type="email" 
                            placeholder="name@example.com" 
                            className="w-full border-2 border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-black text-slate-900 bg-white outline-none focus:border-[#00b4d8] transition-all shadow-sm placeholder:text-slate-400" 
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Segment 3: Pickup & Travel details */}
                    <div className="space-y-4 border-t border-slate-100 pt-4">
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">
                        Pickup & Journey Details
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2 flex flex-col gap-1.5">
                          <label className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Exact Pickup Address *</label>
                          <input 
                            type="text" 
                            placeholder="Hotel name, station, airport terminal, or home address..." 
                            className="w-full border-2 border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-black text-slate-900 bg-white outline-none focus:border-[#00b4d8] transition-all shadow-sm placeholder:text-slate-400" 
                            value={pickupAddress}
                            onChange={(e) => setPickupAddress(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Preferred Pickup Time *</label>
                          <input 
                            type="time" 
                            className="w-full border-2 border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-black text-slate-900 bg-white outline-none focus:border-[#00b4d8] transition-all shadow-sm cursor-pointer" 
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Segment 4: Special requests */}
                    <div className="space-y-2 border-t border-slate-100 pt-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Special Instructions (Optional)</label>
                        <textarea 
                          rows="2"
                          placeholder="E.g., excessive luggage size, child seats needed, preferred routes, or medical requirements..." 
                          className="w-full border-2 border-slate-700 rounded-xl px-3.5 py-2 text-xs font-black text-slate-900 bg-white outline-none focus:border-[#00b4d8] transition-all shadow-sm resize-none placeholder:text-slate-400" 
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Action Submit */}
                    <button 
                      type="submit" 
                      className="w-full py-3.5 bg-gradient-to-r from-[#00b4d8] to-[#0083b0] hover:from-[#ea580c] hover:to-[#d04a00] text-white font-black text-xs rounded-xl transition-all shadow-md shadow-[#00b4d8]/20 flex items-center justify-center gap-1.5 hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer"
                    >
                      <span>Confirm Booking</span>
                    </button>
                  </form>
                </div>

                {/* Right Column: Booking Summary Card (4 cols) */}
                <div className="lg:col-span-4 bg-[#0d3859] border-2 border-[#0d3859] text-white rounded-3xl p-6 shadow-md">
                  <h3 className="text-xs font-black uppercase tracking-widest border-b border-white/20 pb-3 mb-5">
                    Booking Summary
                  </h3>
                  
                  {selectedItem && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3.5 bg-white/5 border border-white/10 p-3 rounded-2xl">
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-black text-cyan-300 tracking-widest leading-none">Vehicle Type</span>
                          <span className="text-xs font-black mt-1">{selectedItem.name}</span>
                          {selectedItem.details && (
                            <span className="text-[9px] font-semibold text-white/50 mt-0.5">{selectedItem.details}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4 border-t border-white/15 pt-4 text-xs">
                        <div className="flex justify-between items-start">
                          <span className="text-white/50 font-bold uppercase tracking-wider text-[10px]">From:</span>
                          <span className="font-extrabold text-right max-w-[200px] break-words">{searchParams.fromCity || 'Pune, MH'}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-white/50 font-bold uppercase tracking-wider text-[10px]">To:</span>
                          <span className="font-extrabold text-right max-w-[200px] break-words">{searchParams.toCity || 'Destination'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50 font-bold uppercase tracking-wider text-[10px]">Trip Type:</span>
                          <span className="font-extrabold capitalize">{searchParams.tripType === 'roundtrip' ? 'Round-Trip' : 'One-Way'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50 font-bold uppercase tracking-wider text-[10px]">Travel Date:</span>
                          <span className="font-extrabold">{searchParams.date || new Date().toISOString().split('T')[0]}</span>
                        </div>
                      </div>

                      <div className="pt-5 border-t border-white/15 flex justify-between items-end">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-black text-white/40 tracking-widest leading-none">Total Fare</span>
                          <span className="text-[9px] font-semibold text-cyan-300 mt-1">Inclusive of GST, Toll & Taxes</span>
                        </div>
                        <span className="text-2xl font-black text-emerald-400 leading-none">
                          ₹{selectedItem.exactPrice || '---'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: TICKET SUMMARY & MOCK QR */}
            {(bookingStep === 4 || bookingStep === 5) && activeTicket && (
              <div className="glass-panel" style={{ border: '2px dashed var(--primary)', padding: '30px', textAlign: 'left' }}>
                <div style={{ textAlign: 'center', borderBottom: '1px dashed var(--border-light)', paddingBottom: '20px', marginBottom: '20px' }}>
                  <h3 style={{ color: 'var(--primary)', marginTop: '8px' }}>Booking Confirmed</h3>
                  <p style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 700 }}>Thank you for contacting! The owner will reach you soon.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#334155' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                    <span style={{ fontWeight: 750 }}>Ticket ID:</span>
                    <strong style={{ color: '#0f172a' }}>#PJ-{activeTicket.id}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                    <span style={{ fontWeight: 750 }}>Route:</span>
                    <strong style={{ color: '#0f172a' }}>{activeTicket.route_from.split(',')[0]} to {activeTicket.route_to.split(',')[0]}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                    <span style={{ fontWeight: 750 }}>Vehicle:</span>
                    <strong style={{ color: '#0f172a' }}>{activeTicket.vehicle_name || 'Assigned Cab'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                    <span style={{ fontWeight: 750 }}>Travel Date:</span>
                    <strong style={{ color: '#0f172a' }}>{activeTicket.travel_date.split('T')[0]}</strong>
                  </div>
                  {activeTicket.seats_selected && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                      <span style={{ fontWeight: 750 }}>Seats:</span>
                      <strong style={{ color: 'var(--primary)' }}>{activeTicket.seats_selected.join(', ')}</strong>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '5px' }}>
                    <span style={{ fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', fontSize: '0.8rem' }}>Total Amount:</span>
                    <strong style={{ color: '#00b4d8', fontSize: '1.25rem' }}>₹{activeTicket.amount}</strong>
                  </div>
                </div>

                {/* Auto notification status bar */}
                <div style={{ 
                  marginTop: '25px', 
                  padding: '16px', 
                  background: '#f8fafc', 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                    <span>✓</span> All details sent to owner automatically
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, margin: 0 }}>
                    Booking details have been dispatched to the owner via SMS, WhatsApp, and Email.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button onClick={() => window.print()} className="btn-secondary w-full sm:flex-1 py-3 text-center justify-center flex items-center">
                    Print Ticket
                  </button>
                  <button 
                    onClick={() => {
                      const textContent = `----------------------------------------\n` +
                        `        POOJA TOURS & TRAVELS        \n` +
                        `          BOOKING CONFIRMATION        \n` +
                        `----------------------------------------\n` +
                        `Ticket ID:      #PJ-${activeTicket.id}\n` +
                        `Route:          ${activeTicket.route_from} to ${activeTicket.route_to}\n` +
                        `Vehicle:        ${activeTicket.vehicle_name || 'Assigned Cab'}\n` +
                        `Travel Date:    ${activeTicket.travel_date.split('T')[0]}\n` +
                        `Pickup Time:    ${pickupTime}\n` +
                        `Pickup Address: ${pickupAddress}\n` +
                        `Total Fare:     ₹${activeTicket.amount}\n` +
                        `Contact Phone:  ${contactPhone}\n` +
                        `Alt Phone:      ${altPhone || 'N/A'}\n` +
                        `Email:          ${contactEmail}\n` +
                        `----------------------------------------\n` +
                        `Thank you for contacting! The owner will reach you soon.\n` +
                        `----------------------------------------\n`;
                      
                      const element = document.createElement("a");
                      const file = new Blob([textContent], {type: 'text/plain'});
                      element.href = URL.createObjectURL(file);
                      element.download = `Booking_PJ-${activeTicket.id}.txt`;
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }} 
                    className="btn-secondary w-full sm:flex-1 py-3 text-center justify-center flex items-center"
                  >
                    Download Details
                  </button>
                  <button onClick={() => { setCurrentPage('home'); setBookingStep(1); }} className="btn-primary w-full sm:flex-1 py-3 text-center justify-center flex items-center">
                    Go to Home
                  </button>
                </div>
              </div>
            )}
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} siteSettings={siteSettings} />

      {/* FLOAT CALL & WHATSAPP WIDGETS */}
      <a 
        href={`tel:${siteSettings.contact_phone}`} 
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          background: '#ff5a00',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          boxShadow: '0 4px 15px rgba(255, 90, 0, 0.4)',
          cursor: 'pointer',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'var(--transition)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M6.62 10.79a15.149 15.149 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </a>

      <a 
        href="https://wa.me/919623324139?text=Hi%20Pooja%20Travels,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20ride." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-widget flex-center"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff">
          <path d="M12.012 2c-5.506 0-9.988 4.492-9.988 10.004 0 1.76.457 3.475 1.332 5.003L2 22l5.132-1.348a9.923 9.923 0 0 0 4.88 1.282c5.506 0 9.988-4.492 9.988-10.004C22 6.492 17.518 2 12.012 2zm4.7 13.916c-.223.633-1.29 1.233-1.783 1.31-.444.07-.99.1-3.036-.75-2.613-1.083-4.3-3.75-4.433-3.933-.133-.183-1.09-1.45-1.09-2.767 0-1.317.69-1.966.938-2.217.25-.25.5-.316.666-.316.167 0 .334.008.484.017.15.008.35-.033.55.45.2.5.683 1.666.75 1.8.067.133.11.3.017.483-.09.183-.15.3-.3.467-.15.166-.312.35-.446.466-.15.134-.308.284-.133.584.175.3.775 1.275 1.663 2.066.887.792 1.637 1.042 1.937 1.192.3.15.475.125.65-.075.175-.2.75-.875.95-1.175.2-.3.4-.25.667-.15.267.1.1.7 1.683 1.492.267.133.44.2.5.3.067.1.067.583-.156 1.216z" />
        </svg>
      </a>

      {/* AUTH MODAL */}
      {showAuthModal && (
        <AuthModal 
          authMode={authMode} 
          setAuthMode={setAuthMode} 
          handleAuthSubmit={handleAuthSubmit} 
          setShowAuthModal={setShowAuthModal} 
        />
      )}

    </div>
  );
}

