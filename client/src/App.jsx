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
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsConditionsPage from './components/TermsConditionsPage';

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
  { id: 7, type: 'Comfort MUV', name: 'Toyota Innova Crysta', price_per_km: 20, seating_capacity: 7, image: '🚘' },
  { id: 8, type: 'AC Tourist Coach', name: '17-Seater Premium AC Tempo Traveller', price_per_km: 28, seating_capacity: 17, image: '🚌' },
  { id: 9, type: 'Standard Coach', name: '17-Seater Standard Non-AC Tempo Traveller', price_per_km: 24, seating_capacity: 17, image: '🚌' },
  { id: 10, type: 'Standard Coach', name: '20-Seater Standard Non-AC Tempo Traveller', price_per_km: 25, seating_capacity: 20, image: '🚌' },
  { id: 11, type: 'Tourist Coach', name: '32-Seater Comfort Tourist Coach', price_per_km: 52, seating_capacity: 32, image: '🚌' },
  { id: 12, type: 'Tourist Bus', name: '50-Seater Comfort Tourist Bus', price_per_km: 60, seating_capacity: 50, image: '🚌' }
];

const MOCK_BUSES = [
  { id: 1, name: 'Pooja Travels Luxury Coach 1', type: '17-Seater AC Luxury', total_seats: 17, price_per_seat: 750, departure_time: '06:00 AM', arrival_time: '10:00 AM', route_from: 'Pune, Maharashtra, India', route_to: 'Mumbai, Maharashtra, India' },
  { id: 2, name: 'Pooja Travels Luxury Coach 2', type: '17-Seater AC Luxury', total_seats: 17, price_per_seat: 600, departure_time: '07:30 AM', arrival_time: '11:30 AM', route_from: 'Pune, Maharashtra, India', route_to: 'Mahabaleshwar, Maharashtra, India' },
  { id: 3, name: 'Pooja Travels Luxury Coach 3', type: '17-Seater AC Luxury', total_seats: 17, price_per_seat: 700, departure_time: '08:00 AM', arrival_time: '01:30 PM', route_from: 'Pune, Maharashtra, India', route_to: 'Shirdi, Maharashtra, India' }
];

const POPULAR_PACKAGES = [
  { id: 1, title: 'Pune to Shirdi Darshan', type: 'Bus & Cab options', desc: 'Complete round trip package for Sai Baba Darshan, includes flexible timing.', price: '₹2,400 onwards', image: '🕌' },
  { id: 2, title: 'Pune to Mahabaleshwar Scenic Tour', type: 'Weekend Getaway', desc: 'Enjoy scenic viewpoints, strawberry farms, and Mapro garden trip.', price: '₹3,500 onwards', image: '🍓' },
  { id: 3, title: 'Mumbai Airport Drops', type: 'Assured Cab Drops', desc: 'Punctual, clean sedan or SUV drops direct to T2 airport terminal.', price: '₹2,500 fixed', image: '✈️' },
  { id: 4, title: 'Ashtavinayak Yatra Package', type: '8 Ganesha Temples', desc: '2-day custom bus/cab spiritual package covering all 8 holy sites.', price: '₹8,500 total', image: '🪔' }
];

const renderItemImage = (imgStr) => {
  const isBus = imgStr === '🚌' || imgStr?.toLowerCase().includes('bus') || imgStr?.toLowerCase().includes('coach') || imgStr?.toLowerCase().includes('tempo');
  if (isBus) {
    return (
      <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.75a1.125 1.125 0 01-1.125-1.125V15h1.5a1.5 1.5 0 003 0h9.75a1.5 1.5 0 003 0h1.5v2.625c0 .621-.504 1.125-1.125 1.125H18.75m-9 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m3 0a1.5 1.5 0 003 0m-3 0a1.5 1.5 0 013 0m-3 0H18.75m0 0h-.75m-9-6h3.75m3 0h3m-9 3h12m-9-6a3 3 0 013-3h1.5a3 3 0 013 3m-7.5-3h4.5" />
      </svg>
    );
  }
  return (
    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.75a1.125 1.125 0 01-1.125-1.125V15h1.5a1.5 1.5 0 003 0h9.75a1.5 1.5 0 003 0h1.5v2.625c0 .621-.504 1.125-1.125 1.125H18.75m-9 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m3 0a1.5 1.5 0 003 0m-3 0a1.5 1.5 0 013 0m-3 0H18.75m0 0h-.75m-9-6h3.75m3 0h3m-9 3h12m-9-6a3 3 0 013-3h1.5a3 3 0 013 3m-7.5-3h4.5" />
    </svg>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname.replace(/^\/+/, '');
    const validPages = ['home', 'fleet', 'tours', 'gallery', 'about', 'blog', 'contact', 'admin', 'booking-flow', 'privacy', 'terms'];
    return validPages.includes(path) ? path : 'home';
  });
  const [selectedRouteName, setSelectedRouteName] = useState('');
  const [theme, setTheme] = useState('dark');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Auth & Booking States
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('pooja_user');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        if (user && (user.name === 'Pooja Admin' || user.email === 'booking.poojatravel@gmail.com' || user.email === 'admin@example.com')) {
          user.name = 'Ajay Bhandari';
          user.email = 'booking.poojatravel@gmail.com';
          user.phone = '9623324139';
          localStorage.setItem('pooja_user', JSON.stringify(user));
        }
        return user;
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('pooja_token') || '');
  const [bookings, setBookings] = useState([]);
  
  const [siteSettings, setSiteSettings] = useState({
    contact_email: 'booking.poojatravel@gmail.com',
    contact_phone: '+919623324139',
    contact_phone_alt: '+917387129287',
    hero_title: 'Travel Beyond Boundaries with Pooja Tours & Travels',
    hero_subtitle: 'Premium Chauffeur Cabs & AC Bus Rentals out of Pune. Low price guarantee, transparent pricing.',
    about_text: 'Pooja Tours and Travels is a leading travel operator based in Pune, offering outstation chauffeur cabs and luxury bus rental solutions. We pride ourselves on punctuality, safety, and excellent service quality.'
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+/, '');
      const validPages = ['home', 'fleet', 'tours', 'gallery', 'about', 'blog', 'contact', 'admin', 'booking-flow', 'privacy', 'terms'];
      if (validPages.includes(path)) {
        setCurrentPage(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!path) {
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname.replace(/^\/+/, '');
    const targetPath = currentPage === 'home' ? '' : currentPage;
    if (currentPage && targetPath !== currentPath) {
      window.history.pushState({ page: currentPage }, '', `/${targetPath}`);
    }
  }, [currentPage]);

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

  // Scroll to top automatically when the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

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

  const getTripDays = () => {
    if (searchParams.tripType !== 'roundtrip' || !searchParams.date || !searchParams.returnDate) {
      return 1;
    }
    try {
      const start = new Date(searchParams.date.split('T')[0]);
      const end = new Date(searchParams.returnDate.split('T')[0]);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays > 0 ? diffDays : 1;
    } catch (e) {
      return 1;
    }
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
      const days = getTripDays();
      const distance = searchParams.tripType === 'roundtrip' ? (300 * days) : 150;
      totalAmount = distance * basePrice;
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

        {/* PAGE: PRIVACY POLICY */}
        {currentPage === 'privacy-policy' && (
          <PrivacyPolicyPage setCurrentPage={setCurrentPage} />
        )}

        {/* PAGE: TERMS & CONDITIONS */}
        {currentPage === 'terms-conditions' && (
          <TermsConditionsPage setCurrentPage={setCurrentPage} />
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
                  <span className="text-[0.65rem] font-black text-[#00b4d8] uppercase tracking-wider">Pooja Travels Office &amp; Branch</span>
                  <h3 className="text-lg font-black text-slate-800 mt-1">Our Locations</h3>
                  
                  {/* Location 1: Bhugaon */}
                  <div className="flex gap-3.5 mt-4 items-start group">
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#00b4d8] shrink-0">
                      <svg className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div className="text-left leading-relaxed">
                      <span className="block text-[10px] font-black text-[#ea580c] uppercase tracking-wider">Main Office (Bhugaon)</span>
                      <a href="https://maps.google.com/?q=Bhugaon+Bavdhan+Pune+Maharashtra+412115" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b4d8] transition-colors duration-300 font-semibold text-slate-650 text-xs sm:text-sm">
                        BHUGAON ON MULSHI RD, Bhugaon, Bavdhan,<br />
                        Bhugaon, Maharashtra - 412115
                      </a>
                    </div>
                  </div>

                  {/* Location 2: Kolwan */}
                  <div className="flex gap-3.5 mt-4 items-start group border-t border-slate-100 pt-4">
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#00b4d8] shrink-0">
                      <svg className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div className="text-left leading-relaxed">
                      <span className="block text-[10px] font-black text-[#ea580c] uppercase tracking-wider">Branch Office (Kolwan)</span>
                      <a href="https://maps.google.com/?q=Kolwan+Mulshi+Pune+Maharashtra" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b4d8] transition-colors duration-300 font-semibold text-slate-650 text-xs sm:text-sm">
                        At Post Kolwan, Taluka Mulshi,<br />
                        District Pune, Maharashtra - 412108
                      </a>
                    </div>
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
          <div className="relative bg-slate-50/30 w-full flex-1 flex flex-col overflow-hidden" style={{ minHeight: '80vh' }}>
            {/* Background Watermark Pattern Layer */}
            <div 
              className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
              style={{ 
                backgroundImage: `url('/Booking/35391d4ec4071348ab4a67b69866bdbd.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
            {/* Glowing Blurred Blobs */}
            <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-cyan-200/20 blur-3xl z-0 pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-yellow-100/20 blur-3xl z-0 pointer-events-none" />

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
                      const isRoundTrip = searchParams.tripType === 'roundtrip';
                      const days = getTripDays();
                      const distance = isRoundTrip ? (300 * days) : 150;
                      const estFare = distance * basePrice;
                      priceText = `₹${estFare.toLocaleString('en-IN')}`;
                      detailsText = `${isRoundTrip ? `₹${basePrice}/km (Min 300 km/day × ${days} days)` : `₹${basePrice}/km (Approx 150 km)`} | Toll & Driver allowance extra`;
                    }

                    return (
                      <div 
                        key={item.id} 
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl gap-4 hover:border-[#00b4d8] hover:shadow-sm transition-all"
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span className="flex items-center justify-center bg-slate-100 p-2.5 rounded-xl">{renderItemImage(item.image)}</span>
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
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left animate-fade-in">
                
                {/* Left Column: Checkout Inputs Form (8 cols) */}
                <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50">
                  {/* Background Skyline Banner with Car */}
                  {selectedItem && (
                    <div 
                      className="w-full h-48 sm:h-56 relative overflow-hidden flex justify-center items-end pb-3 sm:pb-4 border-b border-slate-100 bg-[#eefcfc]"
                      style={{
                        backgroundImage: `url('/Booking/city-skyline-bus.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <img 
                        src={(() => {
                          const ln = selectedItem.name ? selectedItem.name.toLowerCase() : '';
                          if (ln.includes('wagonr')) return '/white-swift-right.png';
                          else if (ln.includes('brezza')) return '/white-brezza-right.png';
                          else if (ln.includes('dzire')) return '/white-swift.png';
                          else if (ln.includes('etios')) return '/white-swift-right.png';
                          else if (ln.includes('ertiga')) return '/white-ertiga-right.png';
                          else if (ln.includes('carens')) return '/white-carens-right.png';
                          else if (ln.includes('innova')) return '/white-innova-right.png';
                          else if (ln.includes('17-seater')) return '/17-seat-tempo-traveller-right.png';
                          return '/50-seat-bus-right.png';
                        })()} 
                        alt={selectedItem.name} 
                        className="h-28 sm:h-32 w-auto object-contain z-10 drop-shadow-lg"
                      />
                    </div>
                  )}

                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                      <h3 className="text-base sm:text-lg font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        Enter Booking Details
                      </h3>
                      {!currentUser ? (
                        <button 
                          type="button" 
                          onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                          className="px-3.5 py-1.5 bg-[#00b4d8] hover:bg-[#0083b0] text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Login
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-150">
                          Logged in as {currentUser.email}
                        </span>
                      )}
                    </div>
                    
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleCompleteBooking(e);
                    }} className="space-y-6">
                      
                      {/* Segment 1: Passengers list */}
                      <div className="space-y-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          Passenger Details
                        </h3>
                        {passengerDetails.map((passenger, idx) => (
                          <div key={idx} className="bg-slate-50/50 border border-slate-150 rounded-2xl p-5 space-y-4 relative">
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
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-black text-slate-700 uppercase tracking-wider">Name *</label>
                                <input 
                                  type="text" 
                                  placeholder="Full Name" 
                                  className="w-full border border-slate-250 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 bg-white outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-all shadow-sm placeholder:text-slate-400" 
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
                                <label className="text-[13px] font-black text-slate-700 uppercase tracking-wider">Age *</label>
                                <input 
                                  type="number" 
                                  placeholder="Age" 
                                  min="1"
                                  max="120"
                                  className="w-full border border-slate-250 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 bg-white outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-all shadow-sm placeholder:text-slate-400" 
                                  value={passenger.age}
                                  onChange={(e) => {
                                    let val = e.target.value;
                                    // Strip non-digit characters (including negative minus sign)
                                    val = val.replace(/[^0-9]/g, '');
                                    const newDetails = [...passengerDetails];
                                    newDetails[idx].age = val;
                                    setPassengerDetails(newDetails);
                                  }}
                                  required
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-black text-slate-700 uppercase tracking-wider">Gender *</label>
                                <select 
                                  className="w-full border border-slate-250 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 bg-white outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-all shadow-sm cursor-pointer" 
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
                          className="w-full py-3 border border-dashed border-[#00b4d8]/40 hover:border-[#00b4d8] text-[#00b4d8] font-black text-xs rounded-xl transition-all hover:bg-cyan-50/20 flex items-center justify-center gap-1.5"
                        >
                          Add Passenger
                        </button>
                      </div>

                      {/* Segment 2: Contact Details */}
                      <div className="space-y-4 border-t border-slate-100 pt-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          Contact Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-wider">Mobile Number *</label>
                            <input 
                              type="tel" 
                              placeholder="10-digit primary mobile" 
                              pattern="[0-9]{10}"
                              title="Please enter a valid 10-digit mobile number."
                              className="w-full border border-slate-250 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 bg-white outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-all shadow-sm placeholder:text-slate-400" 
                              value={contactPhone}
                              onChange={(e) => setContactPhone(e.target.value)}
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-wider">Alt Mobile (Safety) *</label>
                            <input 
                              type="tel" 
                              placeholder="10-digit alternate mobile" 
                              pattern="[0-9]{10}"
                              title="Please enter a valid 10-digit alternate mobile number."
                              className="w-full border border-slate-250 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 bg-white outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-all shadow-sm placeholder:text-slate-400" 
                              value={altPhone}
                              onChange={(e) => setAltPhone(e.target.value)}
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-wider">Email Address *</label>
                            <input 
                              type="email" 
                              placeholder="name@example.com" 
                              className="w-full border border-slate-250 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 bg-white outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-all shadow-sm placeholder:text-slate-400" 
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Segment 3: Pickup & Travel details */}
                      <div className="space-y-4 border-t border-slate-100 pt-4">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          Pickup &amp; Journey Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2 flex flex-col gap-1.5">
                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-wider">Exact Pickup Address *</label>
                            <input 
                              type="text" 
                              placeholder="Hotel name, station, airport terminal, or home address..." 
                              className="w-full border border-slate-250 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 bg-white outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-all shadow-sm placeholder:text-slate-400" 
                              value={pickupAddress}
                              onChange={(e) => setPickupAddress(e.target.value)}
                              required
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-wider">Preferred Pickup Time *</label>
                            <input 
                              type="time" 
                              className="w-full border border-slate-250 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 bg-white outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-all shadow-sm cursor-pointer" 
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
                          <label className="text-[13px] font-black text-slate-700 uppercase tracking-wider">Special Instructions (Optional)</label>
                          <textarea 
                            rows="2"
                            placeholder="E.g., excessive luggage size, child seats needed, preferred routes, or medical requirements..." 
                            className="w-full border border-slate-250 rounded-xl px-4 py-2 text-sm font-bold text-slate-800 bg-white outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-all shadow-sm resize-none placeholder:text-slate-400" 
                            value={specialNotes}
                            onChange={(e) => setSpecialNotes(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Action Submit */}
                      <button 
                        type="submit" 
                        className="w-full py-4 bg-[#00b4d8] hover:bg-[#0083b0] text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-[#00b4d8]/10 flex items-center justify-center gap-1.5 hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer"
                      >
                        <span>Confirm Booking</span>
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right Column: Pick-up & Summary Cards (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Pick-up / Drop Destinations Route Card */}
                  <div className="bg-white border border-slate-200/85 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-100/50 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-slate-400 mt-0.5 text-base">📍</span>
                      <div className="flex-1 text-left">
                        <span className="block text-xs uppercase font-extrabold text-[#00b4d8] tracking-wider">Pick-Up</span>
                        <span className="block text-sm font-extrabold text-slate-800 mt-0.5 leading-snug">{searchParams.fromCity || 'Pune, Maharashtra, India'}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                      <span className="text-slate-400 mt-0.5 text-base">🏁</span>
                      <div className="flex-1 text-left">
                        <span className="block text-xs uppercase font-extrabold text-[#00b4d8] tracking-wider">Trip Destination</span>
                        <span className="block text-sm font-extrabold text-slate-800 mt-0.5 leading-snug">
                          {(() => {
                            const from = searchParams.fromCity?.split(',')[0] || 'Pune';
                            const to = searchParams.toCity?.split(',')[0] || 'Destination';
                            return searchParams.tripType === 'roundtrip' ? `${from} -> ${to} -> ${from}` : `${from} -> ${to}`;
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Trip Summary Details Card */}
                  {selectedItem && (
                    <div className="bg-white border border-slate-200/85 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-100/50 space-y-4 text-left">
                      <h3 className="text-sm font-black uppercase text-center tracking-widest text-slate-800 border-b border-slate-100 pb-3.5 mb-2">
                        Trip Summary
                      </h3>
                      
                      <div className="space-y-1.5 text-xs text-slate-700 font-semibold">
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                          <span className="text-slate-500 font-extrabold text-xs uppercase tracking-wide">Journey Type</span>
                          <span className="font-extrabold text-slate-800 text-sm">: {searchParams.tripType === 'roundtrip' ? 'Round-Trip' : 'One-Way'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                          <span className="text-slate-500 font-extrabold text-xs uppercase tracking-wide">Pick-Up City</span>
                          <span className="font-extrabold text-slate-800 text-sm">: {searchParams.fromCity?.split(',')[0] || 'Pune'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                          <span className="text-slate-500 font-extrabold text-xs uppercase tracking-wide">Trip Destination</span>
                          <span className="font-extrabold text-slate-800 text-sm text-right max-w-[150px] truncate">: {searchParams.toCity?.split(',')[0] || 'Destination'}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                          <span className="text-slate-500 font-extrabold text-xs uppercase tracking-wide">Base Fare</span>
                          <span className="font-black text-slate-800 text-sm">
                            : ₹{(() => {
                              if (selectedItem.exactPrice) return selectedItem.exactPrice.toLocaleString('en-IN');
                              const basePrice = selectedItem.price_per_km || 13;
                              const isRoundTrip = searchParams.tripType === 'roundtrip';
                              const days = getTripDays();
                              const distance = isRoundTrip ? Math.max(300 * days, searchParams.distance || 0) : 150;
                              return (distance * basePrice).toLocaleString('en-IN');
                            })()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                          <span className="text-slate-500 font-extrabold text-xs uppercase tracking-wide">Inter-State Tax</span>
                          <span className="font-extrabold text-slate-800 text-sm">: Excluded</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                          <span className="text-slate-500 font-extrabold text-xs uppercase tracking-wide">Toll &amp; Parking</span>
                          <span className="font-extrabold text-slate-800 text-sm">: Excluded</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-slate-500 font-extrabold text-xs uppercase tracking-wide">Driver Allowance</span>
                          <span className="font-extrabold text-slate-800 text-sm">: Excluded (Rs. 300/day)</span>
                        </div>

                        {/* Gross Total Strip */}
                        <div className="mt-5 bg-gradient-to-r from-[#00b4d8] to-[#0083b0] text-white py-3.5 px-5 rounded-2xl text-center font-black text-sm sm:text-base uppercase tracking-wider shadow-md shadow-[#00b4d8]/20">
                          Gross Total: ₹{(() => {
                            if (selectedItem.exactPrice) return selectedItem.exactPrice.toLocaleString('en-IN');
                            const basePrice = selectedItem.price_per_km || 13;
                            const isRoundTrip = searchParams.tripType === 'roundtrip';
                            const days = getTripDays();
                            const distance = isRoundTrip ? Math.max(300 * days, searchParams.distance || 0) : 150;
                            return (distance * basePrice).toLocaleString('en-IN');
                          })()}/-
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Seating & Luggage Guide Card */}
                  {selectedItem && (
                    <div className="bg-white border border-slate-200/85 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-100/50 space-y-4 text-left">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                        <span>🎒</span> Luggage &amp; Seating Guide
                      </h4>
                      <div className="space-y-3 text-xs text-slate-600 font-bold">
                        <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
                          <span>Seating Capacity</span>
                          <span className="font-extrabold text-[#00b4d8]">{selectedItem.seating_capacity} Passengers Max</span>
                        </div>
                        <div className="flex justify-between items-start py-1.5">
                          <span>Luggage Limit</span>
                          <span className="font-extrabold text-slate-800 text-right max-w-[160px] leading-relaxed">
                            {(() => {
                              const cap = selectedItem.seating_capacity || 4;
                              if (cap <= 4) return "2 Large Bags + 2 Handbags";
                              if (cap <= 7) return "4 Large Bags + 3 Handbags";
                              if (cap <= 20) return "Ample Roof Carrier Storage";
                              return "Under-Bus Luggage Hold";
                            })()}
                          </span>
                        </div>
                        <div className="bg-[#f0fdfa] border border-[#ccfbf1] text-[#0f766e] p-3 rounded-xl text-[11px] leading-relaxed font-semibold">
                          💡 <strong>Need more space?</strong> Mention excess baggage details in the Special Instructions form on the left.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Why Choose Pooja Travels Trust Card */}
                  <div className="bg-white border border-slate-200/85 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-100/50 space-y-4 text-left">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
                      <span>🛡️</span> Pooja Travels Guarantees
                    </h4>
                    <ul className="space-y-3.5 text-xs text-slate-600 font-semibold">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#059669] font-bold">✓</span>
                        <div>
                          <strong className="text-slate-800 block">Professional Drivers</strong>
                          <span className="text-[10px] text-slate-450 block mt-0.5">Vetted, licensed, and highly experienced drivers.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#059669] font-bold">✓</span>
                        <div>
                          <strong className="text-slate-800 block">Clean &amp; Sanitized Fleet</strong>
                          <span className="text-[10px] text-slate-450 block mt-0.5">Vehicles are fully washed and sanitized before dispatch.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#059669] font-bold">✓</span>
                        <div>
                          <strong className="text-slate-800 block">No Hidden Charges</strong>
                          <span className="text-[10px] text-slate-450 block mt-0.5">Transparent billing. Rates match listed fares exactly.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5 border-t border-slate-100 pt-3">
                        <span className="text-[#ea580c] font-bold">📞</span>
                        <div>
                          <strong className="text-slate-800 block">Need Urgent Help?</strong>
                          <span className="text-[10px] text-slate-400 block mt-0.5">Call Owner (Ajay Bhandari): +91 9623324139</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Have A Question Card */}
                  <div className="bg-white border border-slate-200/85 rounded-3xl p-5 sm:p-6 shadow-xl shadow-slate-100/50 space-y-4 text-center">
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                      Have A Question?
                    </h4>
                    <div className="grid grid-cols-3 gap-2 py-2">
                      {/* Go To FAQ / Support */}
                      <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => setCurrentPage('home')}>
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-md shadow-slate-100/80 flex items-center justify-center text-[#00b4d8] text-lg font-black group-hover:scale-110 transition-transform duration-300">
                          ?
                        </div>
                        <span className="text-[10px] sm:text-xs font-black text-slate-650 tracking-tight group-hover:text-[#00b4d8] transition-colors leading-tight">Go To FAQ</span>
                      </div>

                      {/* Give Us A Call */}
                      <a href={`tel:${siteSettings.contact_phone}`} className="flex flex-col items-center gap-2 group text-decoration-none">
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-md shadow-slate-100/80 flex items-center justify-center text-[#00b4d8] group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                          </svg>
                        </div>
                        <span className="text-[10px] sm:text-xs font-black text-slate-650 tracking-tight group-hover:text-[#00b4d8] transition-colors leading-tight">Give Us A Call</span>
                      </a>

                      {/* Message Us */}
                      <a 
                        href={`https://wa.me/${(siteSettings.contact_phone || '919623324139').replace(/[^0-9]/g, '')}?text=Hi%20Pooja%20Travels,%20I%20have%20a%20question%20about%20my%20booking.`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex flex-col items-center gap-2 group text-decoration-none"
                      >
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-md shadow-slate-100/80 flex items-center justify-center text-[#00b4d8] group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-3.658C3.02 15.908 2 14.07 2 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                          </svg>
                        </div>
                        <span className="text-[10px] sm:text-xs font-black text-slate-650 tracking-tight group-hover:text-[#00b4d8] transition-colors leading-tight">Message Us</span>
                      </a>
                    </div>
                  </div>

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
                  {activeTicket.passenger_details && activeTicket.passenger_details.length > 0 && (
                    <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', marginTop: '5px' }}>
                      <span style={{ fontWeight: 750, display: 'block', marginBottom: '8px', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>Travelers:</span>
                      <div className="space-y-1.5">
                        {activeTicket.passenger_details.map((p, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-slate-50/50 p-2 px-3 rounded-xl border border-slate-100">
                            <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.8rem' }}>{idx + 1}. {p.name}</span>
                            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>({p.age} Yrs, {p.gender})</span>
                          </div>
                        ))}
                      </div>
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

