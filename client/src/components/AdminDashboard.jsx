import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export default function AdminDashboard({ 
  setCurrentPage, 
  currentUser, 
  handleLogout, 
  siteSettings, 
  fetchSiteSettings 
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [cabs, setCabs] = useState([]);
  const [buses, setBuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // CMS States
  const [blogsList, setBlogsList] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [editingSettings, setEditingSettings] = useState({});

  // Blog creation form state
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('travel');
  const [newBlogImage, setNewBlogImage] = useState('/mahabaleshwar.jpg');
  const [newBlogImage2, setNewBlogImage2] = useState('');
  const [newBlogImage3, setNewBlogImage3] = useState('');

  // Gallery creation form state
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryImage, setNewGalleryImage] = useState('/Gallery/WhatsApp Image 2026-07-06 at 9.06.50 PM.jpeg');
  const [newGalleryCategory, setNewGalleryCategory] = useState('tours');

  useEffect(() => {
    if (siteSettings) {
      setEditingSettings(siteSettings);
    }
  }, [siteSettings]);

  // New Chauffeur/Bus Form States
  const [cabName, setCabName] = useState('');
  const [cabType, setCabType] = useState('SUV');
  const [cabPrice, setCabPrice] = useState('');
  const [cabCapacity, setCabCapacity] = useState('4');
  const [cabBags, setCabBags] = useState('2 Bags');
  const [cabAc, setCabAc] = useState('AC Cabin');
  const [cabImageUrl, setCabImageUrl] = useState('white-swift-right.png');
  const [cabDescription, setCabDescription] = useState('');
  const [cabInclusions, setCabInclusions] = useState('Fuel Charges, Toll Charges, Driver Allowance');
  const [cabExclusions, setCabExclusions] = useState('State Permit (if any), Parking Fees, Extra Hours / KM');

  const [busName, setBusName] = useState('');
  const [busType, setBusType] = useState('17-Seater AC Luxury');
  const [busSeats, setBusSeats] = useState('17');
  const [busPrice, setBusPrice] = useState('');
  const [busFrom, setBusFrom] = useState('');
  const [busTo, setBusTo] = useState('');
  const [busDep, setBusDep] = useState('08:00:00');
  const [busArr, setBusArr] = useState('12:00:00');

  // New Chauffeur Form States
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');
  const [vendorPass, setVendorPass] = useState('password123');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Core fetch function for live dynamic updates
  const fetchAdminData = async () => {
    try {
      const [bookingsRes, cabsRes, busesRes, usersRes, inquiriesRes] = await Promise.all([
        fetch(`${API_URL}/bookings`),
        fetch(`${API_URL}/cabs`),
        fetch(`${API_URL}/buses`),
        fetch(`${API_URL}/auth/users`),
        fetch(`${API_URL}/contact`)
      ]);

      const [bookingsData, cabsData, busesData, usersData, inquiriesData] = await Promise.all([
        bookingsRes.json(),
        cabsRes.json(),
        busesRes.json(),
        usersRes.json(),
        inquiriesRes.json()
      ]);

      setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      setCabs(Array.isArray(cabsData) ? cabsData : []);
      setBuses(Array.isArray(busesData) ? busesData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
      setInquiries(Array.isArray(inquiriesData) ? inquiriesData : []);
    } catch (err) {
      console.error('Failed to fetch live admin data.', err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/blogs`);
      if (res.ok) {
        const data = await res.json();
        setBlogsList(data);
      }
    } catch (err) {
      console.error('Failed to fetch blogs for CMS', err);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_URL}/gallery`);
      if (res.ok) {
        const data = await res.json();
        setGalleryList(data);
      }
    } catch (err) {
      console.error('Failed to fetch gallery for CMS', err);
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      setLoading(true);
      await Promise.all([fetchAdminData(), fetchBlogs(), fetchGallery()]);
      setLoading(false);
    };
    initFetch();
  }, []);

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSettings)
      });
      if (res.ok) {
        alert('Settings updated successfully!');
        if (fetchSiteSettings) await fetchSiteSettings();
      } else {
        alert('Failed to update settings.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating settings.');
    }
  };

  const handleImageUpload = (file, imageNumber) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result;
      try {
        const res = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data })
        });
        if (res.ok) {
          const data = await res.json();
          if (imageNumber === 1) {
            setNewBlogImage(data.url);
          } else if (imageNumber === 2) {
            setNewBlogImage2(data.url);
          } else if (imageNumber === 3) {
            setNewBlogImage3(data.url);
          }
        } else {
          alert('Upload failed.');
        }
      } catch (err) {
        console.error(err);
        alert('Upload error.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newBlogTitle,
          excerpt: newBlogExcerpt,
          content: newBlogContent,
          category: newBlogCategory,
          image: newBlogImage,
          image2: newBlogImage2 || null,
          image3: newBlogImage3 || null
        })
      });
      if (res.ok) {
        alert('Blog post created successfully!');
        setNewBlogTitle('');
        setNewBlogExcerpt('');
        setNewBlogContent('');
        setNewBlogImage('/mahabaleshwar.jpg');
        setNewBlogImage2('');
        setNewBlogImage3('');
        await fetchBlogs();
      } else {
        alert('Failed to create blog post.');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating blog post.');
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert('Blog post deleted successfully.');
        await fetchBlogs();
      } else {
        alert('Failed to delete blog post.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting blog post.');
    }
  };

  const handleAddGallery = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/gallery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newGalleryTitle,
          image: newGalleryImage,
          category: newGalleryCategory
        })
      });
      if (res.ok) {
        alert('Image added to gallery successfully!');
        setNewGalleryTitle('');
        setNewGalleryImage('/Gallery/WhatsApp Image 2026-07-06 at 9.06.50 PM.jpeg');
        await fetchGallery();
      } else {
        alert('Failed to add gallery image.');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding gallery image.');
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert('Image deleted from gallery successfully.');
        await fetchGallery();
      } else {
        alert('Failed to delete gallery image.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting gallery image.');
    }
  };

  const handleDeleteCab = async (id) => {
    if (!window.confirm('Are you sure you want to delete this cab?')) return;
    try {
      const res = await fetch(`${API_URL}/cabs/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert('Cab deleted from fleet successfully.');
        await fetchAdminData();
      } else {
        alert('Failed to delete cab.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting cab.');
    }
  };

  const handleDeleteBus = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bus route?')) return;
    try {
      const res = await fetch(`${API_URL}/buses/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert('Bus route deleted successfully.');
        await fetchAdminData();
      } else {
        alert('Failed to delete bus route.');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting bus route.');
    }
  };

  // Modify Booking Status (Live dispatch)
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/bookings/status/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        await fetchAdminData(); // Live dynamic reload of metrics and lists
      } else {
        alert('Failed to update status on server.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend.');
    }
  };

  // Update Cab Price per KM
  const handleUpdateCabPrice = async (id, price) => {
    try {
      const res = await fetch(`${API_URL}/cabs/price/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price_per_km: parseFloat(price) })
      });
      if (res.ok) {
        await fetchAdminData(); // Live dynamic update
        alert('Cab pricing updated successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating pricing on live server.');
    }
  };

  // Update Bus Price per Seat
  const handleUpdateBusPrice = async (id, price) => {
    try {
      const res = await fetch(`${API_URL}/buses/price/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price_per_seat: parseFloat(price) })
      });
      if (res.ok) {
        await fetchAdminData(); // Live dynamic update
        alert('Bus pricing updated successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating pricing on live server.');
    }
  };

  // Add Cab
  const handleAddCab = async (e) => {
    e.preventDefault();
    if (!cabName || !cabPrice) return;
    
    // Split comma-separated inclusions/exclusions into trimmed string arrays
    const inclusionsArr = cabInclusions.split(',').map(s => s.trim()).filter(Boolean);
    const exclusionsArr = cabExclusions.split(',').map(s => s.trim()).filter(Boolean);

    const newCab = {
      type: cabType,
      name: cabName,
      price_per_km: parseFloat(cabPrice),
      seating_capacity: parseInt(cabCapacity),
      image_url: cabImageUrl || 'white-swift-right.png',
      bags: cabBags,
      ac: cabAc,
      description: cabDescription,
      inclusions: inclusionsArr,
      exclusions: exclusionsArr
    };

    try {
      const res = await fetch(`${API_URL}/cabs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCab)
      });
      if (res.ok) {
        await fetchAdminData(); // Live dynamic update
        setCabName('');
        setCabPrice('');
        setCabDescription('');
        setCabBags('2 Bags');
        setCabAc('AC Cabin');
        setCabImageUrl('white-swift-right.png');
        setCabInclusions('Fuel Charges, Toll Charges, Driver Allowance');
        setCabExclusions('State Permit (if any), Parking Fees, Extra Hours / KM');
        alert('Cab added to fleet successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding vehicle to live server.');
    }
  };

  // Add Bus
  const handleAddBus = async (e) => {
    e.preventDefault();
    if (!busName || !busPrice || !busFrom || !busTo) return;
    const newBus = {
      name: busName,
      type: busType,
      total_seats: parseInt(busSeats),
      price_per_seat: parseFloat(busPrice),
      departure_time: busDep,
      arrival_time: busArr,
      route_from: busFrom,
      route_to: busTo
    };

    try {
      const res = await fetch(`${API_URL}/buses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBus)
      });
      if (res.ok) {
        await fetchAdminData(); // Live dynamic update
        setBusName('');
        setBusPrice('');
        setBusFrom('');
        setBusTo('');
        alert('Bus route added to fleet successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding bus route to live server.');
    }
  };

  // Add Vendor User
  const handleAddVendor = async (e) => {
    e.preventDefault();
    if (!vendorName || !vendorEmail || !vendorPhone) return;
    const newVendor = {
      name: vendorName,
      email: vendorEmail,
      phone: vendorPhone,
      password: vendorPass,
      role: 'vendor'
    };

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVendor)
      });
      if (res.ok) {
        await fetchAdminData(); // Live dynamic update
        setVendorName('');
        setVendorEmail('');
        setVendorPhone('');
        alert('Vendor / Partner registered successfully!');
      }
    } catch (err) {
      console.error(err);
      alert('Error registering partner on live server.');
    }
  };

  // Calculations
  const totalBookings = bookings.length;
  const activeConfirmed = bookings.filter(b => b.status === 'confirmed').length;
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + parseFloat(b.amount || 0), 0);
  const totalRegistered = users.length;
  const totalCabs = cabs.length;
  const totalInquiries = inquiries.length;

  // Counts for donut chart
  const busCount = bookings.filter(b => b.booking_type === 'bus').length;
  const cabCount = bookings.filter(b => b.booking_type === 'cab').length;
  const busPercent = totalBookings > 0 ? Math.round((busCount / totalBookings) * 100) : 50;
  const cabPercent = totalBookings > 0 ? Math.round((cabCount / totalBookings) * 100) : 50;

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00b4d8]"></div>
        <p className="text-sm font-bold text-slate-500 mt-4">Loading operational dashboard control center...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] w-full overflow-hidden text-slate-750 font-sans relative">
      
      {/* Sidebar Backdrop Overlay on Mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 lg:hidden animate-fade"
        />
      )}

      {/* 1. LEFT SIDEBAR PANEL (Premium Cosmos Cadet Navy Blue & Electric Cyan Accents) */}
      <div 
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-[#0b0f19] text-[#94a3b8] flex flex-col justify-between border-r border-[#1e293b] z-50 select-none transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          
          {/* Logo Section */}
          <div className="p-6 border-b border-[#1e293b] flex items-center gap-3 bg-[#070a12]">
            <Logo className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="text-sm font-black text-white uppercase tracking-wider leading-none">Pooja Travels</span>
              <span className="text-[0.62rem] font-bold text-[#00b4d8] mt-1.5 uppercase tracking-widest">Admin Center</span>
            </div>
          </div>

          {/* Menu items */}
          <nav className="p-4 flex flex-col gap-1.5">
            {[
              { 
                id: 'overview', 
                label: 'Dashboard', 
                icon: (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                ) 
              },
              { 
                id: 'bookings', 
                label: 'Bookings List', 
                icon: (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h5.25M7.5 9h5.25M4.5 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                ) 
              },
              { 
                id: 'fleet', 
                label: 'Fleet Manager', 
                icon: (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5m-3-12h13.5m-13.5 6h13.5m3.75-6h-3.75m3.75 6h-3.75m3.75 6h-3.75M3 18.75h18M3.75 4.5h16.5A1.5 1.5 0 0121.75 6v12a1.5 1.5 0 01-1.5 1.5H3.75A1.5 1.5 0 012.25 18V6A1.5 1.5 0 013.75 4.5z" />
                  </svg>
                ) 
              },
              { 
                id: 'users', 
                label: 'Directory List', 
                icon: (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 21c-2.243 0-4.32-.647-6.079-1.758 1.15-1.353 2.82-2.22 4.673-2.22 1.287 0 2.473.425 3.43 1.139a11.302 11.302 0 004.48-1.03M0 8c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zm8 0c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4z" />
                  </svg>
                ) 
              },
              { 
                id: 'inquiries', 
                label: 'Inquiries Inbox', 
                icon: (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                ) 
              },
              { 
                id: 'cms_content', 
                label: 'Content Editor', 
                icon: (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                ) 
              },
              { 
                id: 'cms_blogs', 
                label: 'Blog Manager', 
                icon: (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                ) 
              },
              { 
                id: 'cms_gallery', 
                label: 'Gallery Manager', 
                icon: (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  </svg>
                ) 
              }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-3.5 px-4.5 py-3.5 rounded-lg text-sm font-black transition-all w-full text-left ${
                  activeTab === item.id
                    ? 'bg-[#131c2e] text-white border-l-[3px] border-[#00b4d8]'
                    : 'text-[#64748b] hover:text-white hover:bg-[#070a12]'
                }`}
                style={{ cursor: 'pointer' }}
              >
                <span className={activeTab === item.id ? 'text-[#00b4d8]' : ''}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

        </div>

        {/* User Info bottom capsule */}
        <div className="p-4 border-t border-[#1e293b] bg-[#070a12] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#00b4d8]/10 border border-[#00b4d8]/35 flex items-center justify-center text-[#00b4d8] font-bold text-sm">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-black text-white truncate">{currentUser?.name || 'Ajay Basawraj Bhandari'}</span>
              <span className="text-[0.6rem] font-bold text-[#00b4d8] tracking-widest uppercase">Admin Role</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-bold border border-[#1e293b] hover:bg-[#131c2e] text-[#94a3b8] hover:text-white transition-all"
              style={{ cursor: 'pointer' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span>Back to Site</span>
            </button>
            <button
              onClick={() => handleLogout ? handleLogout() : setCurrentPage('home')}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-bold bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 hover:border-rose-500 transition-all"
              style={{ cursor: 'pointer' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. RIGHT CONTENT PANEL */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header Bar (Bright White matching the official site Header) */}
        <header className="h-[70px] bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between text-slate-500 z-10 select-none">
          <div className="flex items-center gap-1.5 text-xs font-bold">
            
            {/* Sidebar toggle button on Mobile */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#00b4d8] mr-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <span>Logged in as</span>
            <span className="text-[#00b4d8] font-black uppercase">Admin</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>➔ View Site</span>
            </button>
            <div className="w-[1px] h-4 bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#00b4d8] flex items-center justify-center text-white font-black text-xs shadow-sm shadow-[#00b4d8]/20">
                {currentUser?.name?.charAt(0) || 'P'}
              </div>
              <span className="text-xs font-black text-slate-800 hidden sm:inline">{currentUser?.name || 'Ajay Basawraj Bhandari'}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Page Content - SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#f8fafc]">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-8 max-w-6xl">
              
              {/* Header Title */}
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Dashboard</h2>
                <p className="text-sm font-semibold text-slate-450 mt-1.5">
                  Welcome back, <span className="text-[#00b4d8] font-black">{currentUser?.name || 'Prarthana'}</span> — here's your platform overview.
                </p>
              </div>

              {/* Stats Cards grid with color tops & link bottoms (Cyan, Indigo, Teal, Amber, Rose, Purple) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                
                {/* Stat 1: Total Revenue (Cyan Top) */}
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm border-t-[3px] border-t-cyan-500 flex flex-col justify-between h-[155px]">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-black text-slate-800">₹{totalRevenue.toLocaleString('en-IN')}</span>
                    <span className="text-cyan-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider">Total Sales</h5>
                    <span className="text-[0.68rem] font-bold text-slate-400 block mt-1">Across confirmed trips</span>
                  </div>
                  <button onClick={() => setActiveTab('bookings')} className="text-cyan-600 hover:text-cyan-800 text-[0.7rem] font-black text-left mt-3">
                    View Details ➔
                  </button>
                </div>

                {/* Stat 2: Total Bookings (Indigo Top) */}
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm border-t-[3px] border-t-indigo-500 flex flex-col justify-between h-[155px]">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-black text-slate-800">{totalBookings}</span>
                    <span className="text-indigo-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h5.25M7.5 9h5.25M4.5 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider">Total Bookings</h5>
                    <span className="text-[0.68rem] font-bold text-slate-400 block mt-1">Cab & Bus requests</span>
                  </div>
                  <button onClick={() => setActiveTab('bookings')} className="text-indigo-650 hover:text-indigo-800 text-[0.7rem] font-black text-left mt-3">
                    View Details ➔
                  </button>
                </div>

                {/* Stat 3: Confirmed (Teal Top) */}
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm border-t-[3px] border-t-teal-500 flex flex-col justify-between h-[155px]">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-black text-slate-800">{activeConfirmed}</span>
                    <span className="text-teal-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider">Active Confirmed</h5>
                    <span className="text-[0.68rem] font-bold text-slate-400 block mt-1">Pending dispatch</span>
                  </div>
                  <button onClick={() => setActiveTab('bookings')} className="text-teal-600 hover:text-teal-800 text-[0.7rem] font-black text-left mt-3">
                    View Details ➔
                  </button>
                </div>

                {/* Stat 4: Fleet Size (Amber Top) */}
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm border-t-[3px] border-t-amber-500 flex flex-col justify-between h-[155px]">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-black text-slate-800">{totalCabs + buses.length}</span>
                    <span className="text-amber-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l3-3m-3 3l3 3m12 3h-12a1.5 1.5 0 01-1.5-1.5V7.5A1.5 1.5 0 014.5 6h12a1.5 1.5 0 011.5 1.5V15a1.5 1.5 0 01-1.5 1.5z" />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider">Vehicles & Routes</h5>
                    <span className="text-[0.68rem] font-bold text-slate-400 block mt-1">Cabs & Bus lines</span>
                  </div>
                  <button onClick={() => setActiveTab('fleet')} className="text-amber-600 hover:text-amber-800 text-[0.7rem] font-black text-left mt-3">
                    View Details ➔
                  </button>
                </div>

                {/* Stat 5: Customers (Rose Top) */}
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm border-t-[3px] border-t-rose-500 flex flex-col justify-between h-[155px]">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-black text-slate-800">{totalRegistered}</span>
                    <span className="text-rose-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider">Total Members</h5>
                    <span className="text-[0.68rem] font-bold text-slate-400 block mt-1">Directory list</span>
                  </div>
                  <button onClick={() => setActiveTab('users')} className="text-rose-600 hover:text-rose-800 text-[0.7rem] font-black text-left mt-3">
                    View Details ➔
                  </button>
                </div>

                {/* Stat 6: Messages (Purple Top) */}
                <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm border-t-[3px] border-t-purple-500 flex flex-col justify-between h-[155px]">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-black text-slate-800">{totalInquiries}</span>
                    <span className="text-purple-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742a3.75 3.75 0 110-7.5 3.75 3.75 0 010 7.5zM2 19.5a5 5 0 0110 0v.75H2v-.75zM18 6.75a3 3 0 110-6 3 3 0 010 6zM13 15.5a4 4 0 018 0v.5h-8v-.5z" />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-3">
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider">Inquiries Inbox</h5>
                    <span className="text-[0.68rem] font-bold text-slate-400 block mt-1">Pending followups</span>
                  </div>
                  <button onClick={() => setActiveTab('inquiries')} className="text-purple-600 hover:text-purple-800 text-[0.7rem] font-black text-left mt-3">
                    View Details ➔
                  </button>
                </div>

              </div>

              {/* Advanced Analytics Grid (Chart on Left, Recent Activity on Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Left Card: CSS Donut Chart */}
                <div className="lg:col-span-6 bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm flex flex-col gap-4 justify-between">
                  <div>
                    <h4 className="text-base font-black text-slate-850">Advanced Fleet & Route Analytics</h4>
                    <p className="text-xs font-bold text-slate-400 mt-1">Proportion of booked services (Bus vs Cab bookings)</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-8 py-4 justify-center">
                    
                    {/* CSS Donut Chart (Cyan & Indigo) */}
                    <div 
                      className="w-32 h-32 rounded-full flex items-center justify-center relative shadow-inner"
                      style={{
                        background: `conic-gradient(#00b4d8 0% ${busPercent}%, #4f46e5 ${busPercent}% 100%)`
                      }}
                    >
                      <div className="absolute w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-slate-800">{totalBookings}</span>
                        <span className="text-[0.58rem] font-black text-slate-400 uppercase">Bookings</span>
                      </div>
                    </div>

                    {/* Chart Legend */}
                    <div className="flex flex-col gap-3 min-w-[150px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#00b4d8]" />
                          <span className="text-sm font-semibold text-slate-600">Bus Routes</span>
                        </div>
                        <span className="text-sm font-bold text-slate-850">{busCount} ({busPercent}%)</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#4f46e5]" />
                          <span className="text-sm font-semibold text-slate-600">Cabs / Taxis</span>
                        </div>
                        <span className="text-sm font-bold text-slate-850">{cabCount} ({cabPercent}%)</span>
                      </div>
                    </div>

                  </div>

                  <div className="border-t border-slate-100 pt-4 flex justify-between text-xs font-black uppercase tracking-wider text-slate-405">
                    <div>
                      <span>Revenue: </span>
                      <span className="text-slate-800 font-extrabold">₹{totalRevenue.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span>Dispatched: </span>
                      <span className="text-slate-800 font-extrabold">{bookings.filter(b => b.status === 'completed').length} / {totalBookings}</span>
                    </div>
                  </div>
                </div>

                {/* Right Card: Recent Activity Feed */}
                <div className="lg:col-span-6 bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm flex flex-col gap-4 justify-between">
                  <div>
                    <h4 className="text-base font-black text-slate-850">Recent Platform Activity</h4>
                    <p className="text-xs font-bold text-slate-400 mt-1">Live dispatch logs, reservations, and updates.</p>
                  </div>

                  <div className="flex flex-col gap-4 overflow-y-auto max-h-[190px] pr-2">
                    {bookings.slice(0, 3).map(b => (
                      <div key={b.id} className="flex justify-between items-start border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-800">
                            {b.route_from.split(',')[0]} ➔ {b.route_to.split(',')[0]}
                          </span>
                          <span className="text-xs text-slate-450 mt-1">
                            by {b.passenger_details && b.passenger_details[0] ? b.passenger_details[0].name : 'Traveler'}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-[#00b4d8] block">₹{b.amount}</span>
                          <span className="text-[0.62rem] font-bold text-slate-400 block mt-0.5 capitalize">{b.booking_type} • {b.status}</span>
                        </div>
                      </div>
                    ))}
                    {bookings.length === 0 && (
                      <span className="text-sm text-slate-405 italic text-center py-6">No recent customer activities.</span>
                    )}
                  </div>

                  <button onClick={() => setActiveTab('bookings')} className="w-full text-center border border-slate-100 hover:border-slate-300 py-2 rounded-xl text-xs font-bold transition-all text-slate-500 hover:text-slate-700 mt-2">
                    Open Dispatch Bookings List
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* Bookings List Tab */}
          {activeTab === 'bookings' && (
            <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden flex flex-col max-w-6xl">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-800">Bookings Control Console</h3>
                <p className="text-xs font-bold text-slate-400 mt-1">Review traveler schedules and update trip status logs.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-[#e2e8f0] font-black text-slate-500 text-xs uppercase tracking-wider">
                      <th className="py-4.5 px-6">Ride Thumbnail</th>
                      <th className="py-4.5 px-6">Route Details</th>
                      <th className="py-4.5 px-6">Traveler Name</th>
                      <th className="py-4.5 px-6">Schedule Date</th>
                      <th className="py-4.5 px-6">Amount</th>
                      <th className="py-4.5 px-6">Status</th>
                      <th className="py-4.5 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-slate-50/50">
                        
                        <td className="py-4 px-6">
                          <div className="w-12 h-12 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-center text-slate-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25M3 14.25h15m0 0L15.75 9.75M3 14.25V11.25m15 3V11.25m0 0L15.75 9.75M15.75 9.75H8.25L6 11.25m9.75-1.5L13.5 6H8.25L6 11.25M8.25 6H6" />
                            </svg>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-black text-slate-800 text-sm leading-snug">
                              {b.route_from.split(',')[0]} ➔ {b.route_to.split(',')[0]}
                            </span>
                            <span className="text-xs font-bold text-slate-400 block mt-1 uppercase tracking-wide">
                              {b.booking_type === 'bus' ? 'Bus Route' : `Cab: ${b.vehicle_name || 'Taxi'}`}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            {b.passenger_details && b.passenger_details[0] ? (
                              <>
                                <span className="font-bold text-slate-700">{b.passenger_details[0].name}</span>
                                <span className="text-xs text-slate-400 mt-0.5">{b.passenger_details[0].phone || '—'}</span>
                              </>
                            ) : (
                              <span className="text-slate-400 italic text-xs">No name details</span>
                            )}
                          </div>
                        </td>

                        <td className="py-4 px-6 font-bold text-slate-500">
                          {new Date(b.travel_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>

                        <td className="py-4 px-6 font-black text-slate-800">
                          ₹{parseFloat(b.amount).toLocaleString('en-IN')}
                        </td>

                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-[0.68rem] font-black uppercase ${
                            b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' :
                            b.status === 'completed' ? 'bg-cyan-50 text-cyan-600' :
                            'bg-rose-50 text-rose-600'
                          }`}>
                            {b.status}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {b.status !== 'completed' && b.status !== 'cancelled' && (
                              <>
                                <button
                                  onClick={() => handleUpdateStatus(b.id, 'completed')}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-extrabold text-xs transition-colors"
                                >
                                  Complete
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(b.id, 'cancelled')}
                                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-xs transition-colors"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {(b.status === 'cancelled' || b.status === 'completed') && (
                              <span className="text-slate-400 font-bold text-xs italic">Finished</span>
                            )}
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Fleet Tab */}
          {activeTab === 'fleet' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl">
              
              {/* Fleet Pricing items */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* Cab section */}
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-base font-black text-slate-800 mb-4">Cab Rates Control</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cabs.map(c => (
                      <div key={c.id} className="border border-[#e2e8f0] rounded-xl p-5 bg-slate-50/20 flex flex-col justify-between h-[210px]">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-xs font-black text-[#00b4d8] uppercase tracking-wider">{c.type}</span>
                            <h4 className="text-sm font-black text-slate-800 mt-1">{c.name}</h4>
                            <span className="text-xs font-bold text-slate-450 block mt-1">Seats: {c.seating_capacity} passengers</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteCab(c.id)}
                            className="text-rose-500 hover:text-rose-700 text-xs font-black px-2 py-1 rounded border border-rose-100 bg-rose-50/50 hover:bg-rose-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                        <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
                          <label className="text-[0.68rem] font-black text-slate-450 uppercase tracking-wider">Per-KM Price (₹)</label>
                          <div className="flex gap-2">
                            <input 
                              type="number" 
                              defaultValue={c.price_per_km} 
                              id={`cab-price-${c.id}`}
                              className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-[#00b4d8]"
                            />
                            <button
                              onClick={() => {
                                const val = document.getElementById(`cab-price-${c.id}`).value;
                                handleUpdateCabPrice(c.id, val);
                              }}
                              className="bg-[#00b4d8] hover:bg-[#0083b0] text-white text-xs font-black px-4 rounded-lg shadow-sm transition-colors"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bus section */}
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-base font-black text-slate-800 mb-4">Bus Route Control</h3>
                  <div className="flex flex-col gap-4 divide-y divide-slate-100">
                    {buses.map(b => (
                      <div key={b.id} className="flex flex-col sm:flex-row justify-between sm:items-center pt-4 first:pt-0 gap-4">
                        <div>
                          <h4 className="text-sm font-black text-slate-800 leading-tight">{b.name}</h4>
                          <span className="text-xs font-black text-[#00b4d8] block mt-1.5 uppercase tracking-wide">
                            {b.route_from.split(',')[0]} ➔ {b.route_to.split(',')[0]}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[0.62rem] font-black text-slate-450 uppercase">Route Price (₹)</label>
                            <div className="flex gap-2">
                              <input 
                                type="number" 
                                defaultValue={b.price_per_seat} 
                                id={`bus-price-${b.id}`}
                                className="w-24 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold focus:outline-none focus:border-[#00b4d8]"
                              />
                              <button
                                onClick={() => {
                                  const val = document.getElementById(`bus-price-${b.id}`).value;
                                  handleUpdateBusPrice(b.id, val);
                                }}
                                className="bg-[#00b4d8] hover:bg-[#0083b0] text-white text-xs font-black px-3.5 rounded-lg shadow-sm transition-colors"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteBus(b.id)}
                                className="text-rose-500 hover:text-rose-700 text-xs font-black px-2.5 py-1.5 rounded border border-rose-100 bg-rose-50/50 hover:bg-rose-50 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Add vehicles forms */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Add Cab */}
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">Add New Fleet Cab</h4>
                  <form onSubmit={handleAddCab} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase">Cab Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Innova Crysta"
                        value={cabName}
                        onChange={(e) => setCabName(e.target.value)}
                        className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase">Vehicle Type *</label>
                      <select
                        value={cabType}
                        onChange={(e) => setCabType(e.target.value)}
                        className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold bg-white focus:outline-none"
                      >
                        <option value="Hatchback">Hatchback</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Bus">Luxury Coach</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase">Rate/KM *</label>
                        <input 
                          type="number" 
                          required
                          placeholder="₹13"
                          value={cabPrice}
                          onChange={(e) => setCabPrice(e.target.value)}
                          className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase">Capacity</label>
                        <input 
                          type="number" 
                          required
                          value={cabCapacity}
                          onChange={(e) => setCabCapacity(e.target.value)}
                          className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase">Bags Capacity</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 2 Bags"
                          value={cabBags}
                          onChange={(e) => setCabBags(e.target.value)}
                          className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase">AC System</label>
                        <input 
                          type="text" 
                          placeholder="e.g. AC Cabin"
                          value={cabAc}
                          onChange={(e) => setCabAc(e.target.value)}
                          className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase">Image Filename</label>
                      <input 
                        type="text" 
                        placeholder="e.g. white-swift-right.png"
                        value={cabImageUrl}
                        onChange={(e) => setCabImageUrl(e.target.value)}
                        className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase">Description</label>
                      <textarea 
                        rows="2"
                        placeholder="Vehicle description details..."
                        value={cabDescription}
                        onChange={(e) => setCabDescription(e.target.value)}
                        className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8] resize-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase">Inclusions (Comma separated)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Fuel Charges, Toll Charges"
                        value={cabInclusions}
                        onChange={(e) => setCabInclusions(e.target.value)}
                        className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase">Exclusions (Comma separated)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Parking Fees, State Permit"
                        value={cabExclusions}
                        onChange={(e) => setCabExclusions(e.target.value)}
                        className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                      />
                    </div>
                    <button type="submit" className="bg-[#00b4d8] hover:bg-[#0083b0] text-white text-xs font-bold py-2.5 rounded-lg mt-2 transition-colors">
                      Add to Fleet List
                    </button>
                  </form>
                </div>

                {/* Add Bus */}
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">Add Bus Route</h4>
                  <form onSubmit={handleAddBus} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase">Bus Service Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Shirdi Super AC Coach"
                        value={busName}
                        onChange={(e) => setBusName(e.target.value)}
                        className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase">From Location</label>
                        <input 
                          type="text" 
                          required
                          value={busFrom}
                          onChange={(e) => setBusFrom(e.target.value)}
                          placeholder="Pune"
                          className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase">To Location</label>
                        <input 
                          type="text" 
                          required
                          value={busTo}
                          onChange={(e) => setBusTo(e.target.value)}
                          placeholder="Mumbai"
                          className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase">Hire Price *</label>
                        <input 
                          type="number" 
                          required
                          value={busPrice}
                          onChange={(e) => setBusPrice(e.target.value)}
                          placeholder="₹600"
                          className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase">Capacity</label>
                        <input 
                          type="number" 
                          required
                          value={busSeats}
                          onChange={(e) => setBusSeats(e.target.value)}
                          className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold"
                        />
                      </div>
                    </div>
                    <button type="submit" className="bg-[#00b4d8] hover:bg-[#0083b0] text-white text-xs font-bold py-2.5 rounded-lg mt-2 transition-colors">
                      Add Bus Line
                    </button>
                  </form>
                </div>

              </div>

            </div>
          )}

          {/* Directory List Tab */}
          {activeTab === 'users' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl">
              
              {/* Directory table */}
              <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-105">
                  <h3 className="text-lg font-black text-slate-800">Operational Accounts Directory</h3>
                  <p className="text-xs font-bold text-slate-400 mt-1">Review active clients, drivers, and vendor accounts.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-[#e2e8f0] font-black text-slate-500 text-xs uppercase tracking-wider">
                        <th className="py-4 px-6">Account Name</th>
                        <th className="py-4 px-6">Email Address</th>
                        <th className="py-4 px-6">Phone Number</th>
                        <th className="py-4 px-6 text-center">Privilege Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map(u => (
                        <tr key={u.id} className="hover:bg-slate-50/50">
                          <td className="py-4 px-6 font-black text-slate-800">{u.name}</td>
                          <td className="py-4 px-6 text-slate-600 font-semibold">{u.email}</td>
                          <td className="py-4 px-6 text-slate-500 font-bold">{u.phone || '—'}</td>
                          <td className="py-4 px-6 text-center">
                            <span className={`px-2.5 py-1 rounded-full text-[0.68rem] font-black uppercase ${
                              u.role === 'admin' ? 'bg-indigo-50 text-indigo-600' :
                              u.role === 'vendor' ? 'bg-amber-50 text-amber-600' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Vendor register sidebar form */}
              <div className="lg:col-span-4 bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm self-start">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-1">Add Driver / Partner</h4>
                <p className="text-[0.68rem] text-slate-400 mb-4 leading-normal">Register a transport vendor to dispatch private minibus bookings.</p>
                <form onSubmit={handleAddVendor} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase">Vendor Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Swaran Travels"
                      value={vendorName}
                      onChange={(e) => setVendorName(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="partner@example.com"
                      value={vendorEmail}
                      onChange={(e) => setVendorEmail(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase">Mobile Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="9876543210"
                      value={vendorPhone}
                      onChange={(e) => setVendorPhone(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase">Password *</label>
                    <input 
                      type="text" 
                      value={vendorPass}
                      onChange={(e) => setVendorPass(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none bg-slate-50 focus:border-[#00b4d8]"
                    />
                  </div>
                  <button type="submit" className="bg-[#00b4d8] hover:bg-[#0083b0] text-white text-xs font-bold py-2.5 rounded-lg mt-2 transition-colors">
                    Register Vendor Account
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* Inquiries inbox tab */}
          {activeTab === 'inquiries' && (
            <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm overflow-hidden flex flex-col max-w-6xl">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-800">Customer Inquiries Inbox</h3>
                <p className="text-xs font-bold text-slate-450 mt-1">Review contact form submissions and requests.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-[#e2e8f0] font-black text-slate-500 text-xs uppercase tracking-wider">
                      <th className="py-4.5 px-6">Sender Name</th>
                      <th className="py-4.5 px-6">Contact Email / Phone</th>
                      <th className="py-4.5 px-6">Message Body</th>
                      <th className="py-4.5 px-6">Received Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inquiries.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="py-4.5 px-6 font-black text-slate-850">{item.name}</td>
                        <td className="py-4.5 px-6">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-700">{item.email}</span>
                            <span className="text-xs text-slate-400 mt-0.5">{item.phone || 'No phone'}</span>
                          </div>
                        </td>
                        <td className="py-4.5 px-6 text-slate-600 font-medium max-w-md leading-relaxed text-justify">
                          {item.message}
                        </td>
                        <td className="py-4.5 px-6 text-slate-400 font-bold">
                          {new Date(item.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                      </tr>
                    ))}
                    {inquiries.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center py-8 px-6 text-slate-400 italic">Inbound inbox is empty.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Content Editor Tab */}
          {activeTab === 'cms_content' && (
            <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-sm max-w-4xl p-6">
              <h3 className="text-lg font-black text-slate-800 mb-2">Website Content Editor</h3>
              <p className="text-xs font-bold text-slate-400 mb-6 pb-2 border-b border-slate-100">Update contacts, phone numbers, and page content dynamically.</p>
              
              <form onSubmit={handleUpdateSettings} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-600 uppercase">Primary Contact Email *</label>
                    <input 
                      type="email" 
                      required
                      value={editingSettings.contact_email || ''}
                      onChange={(e) => setEditingSettings({ ...editingSettings, contact_email: e.target.value })}
                      className="border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-600 uppercase">Primary Phone Number *</label>
                    <input 
                      type="text" 
                      required
                      value={editingSettings.contact_phone || ''}
                      onChange={(e) => setEditingSettings({ ...editingSettings, contact_phone: e.target.value })}
                      className="border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-600 uppercase">Alternate Phone Number (WhatsApp) *</label>
                    <input 
                      type="text" 
                      required
                      value={editingSettings.contact_phone_alt || ''}
                      onChange={(e) => setEditingSettings({ ...editingSettings, contact_phone_alt: e.target.value })}
                      className="border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-600 uppercase">Home Hero Title *</label>
                    <input 
                      type="text" 
                      required
                      value={editingSettings.hero_title || ''}
                      onChange={(e) => setEditingSettings({ ...editingSettings, hero_title: e.target.value })}
                      className="border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-slate-600 uppercase">Home Hero Subtitle / Description *</label>
                  <textarea 
                    rows="2"
                    required
                    value={editingSettings.hero_subtitle || ''}
                    onChange={(e) => setEditingSettings({ ...editingSettings, hero_subtitle: e.target.value })}
                    className="border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-black text-slate-600 uppercase">About Us Paragraph / Footer Text *</label>
                  <textarea 
                    rows="3"
                    required
                    value={editingSettings.about_text || ''}
                    onChange={(e) => setEditingSettings({ ...editingSettings, about_text: e.target.value })}
                    className="border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                  />
                </div>

                <button 
                  type="submit" 
                  className="bg-[#00b4d8] hover:bg-[#0083b0] text-white text-xs font-black py-2.5 rounded-lg transition-colors shadow-sm uppercase tracking-wider"
                >
                  Save Settings Content
                </button>
              </form>
            </div>
          )}

          {/* Blog Manager Tab */}
          {activeTab === 'cms_blogs' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl">
              
              {/* Blogs List */}
              <div className="lg:col-span-7 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">Active Blog Posts</h3>
                
                {blogsList.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 italic text-xs">No blogs found in database.</div>
                ) : (
                  <div className="flex flex-col gap-4 divide-y divide-slate-100">
                    {blogsList.map(blog => (
                      <div key={blog.id} className="pt-4 first:pt-0 flex justify-between items-start gap-4">
                        <div className="flex gap-3">
                          <img 
                            src={blog.image || '/mahabaleshwar.jpg'} 
                            alt={blog.title} 
                            className="w-16 h-12 rounded-lg object-cover bg-slate-50 shrink-0" 
                          />
                          <div>
                            <span className="text-[0.62rem] font-black text-[#00b4d8] uppercase tracking-wider">{blog.category}</span>
                            <h4 className="text-xs font-black text-slate-800 leading-tight mt-0.5 line-clamp-1">{blog.title}</h4>
                            <p className="text-[0.68rem] text-slate-455 mt-1 line-clamp-1 font-semibold">{blog.excerpt}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="text-rose-500 hover:text-rose-700 text-xs font-black px-2.5 py-1 rounded bg-rose-50 border border-rose-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Blog Post Form */}
              <div className="lg:col-span-5 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm p-6 flex flex-col gap-4">
                <h3 className="text-base font-black text-slate-800 pb-2 border-b border-slate-100">Write New Blog Post</h3>
                
                <form onSubmit={handleCreateBlog} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase">Post Title *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Monsoon travels in Lonavala"
                      value={newBlogTitle}
                      onChange={(e) => setNewBlogTitle(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase">Short Excerpt (Intro) *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. A quick guide to scenic spots..."
                      value={newBlogExcerpt}
                      onChange={(e) => setNewBlogExcerpt(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase">Category *</label>
                    <select
                      value={newBlogCategory}
                      onChange={(e) => setNewBlogCategory(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold bg-white focus:outline-none"
                    >
                      <option value="travel">Travel Tips</option>
                      <option value="pilgrimage">Pilgrimage</option>
                      <option value="fleet">Fleet Guide</option>
                      <option value="roadtrips">Road Trips</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-xs font-black text-slate-500 uppercase">Blog Images (Upload up to 3 images)</label>
                    
                    {/* Image 1 (Featured) */}
                    <div className="flex flex-col gap-1 border border-slate-100 p-2.5 rounded-xl bg-slate-50/50">
                      <span className="text-[10px] font-black text-[#00b4d8] uppercase">Featured Image (Required) *</span>
                      <div className="flex gap-2 items-center">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e.target.files[0], 1)}
                          className="text-[10px] text-slate-550 w-1/2 cursor-pointer"
                        />
                        <input 
                          type="text" 
                          required
                          placeholder="Image URL"
                          value={newBlogImage}
                          onChange={(e) => setNewBlogImage(e.target.value)}
                          className="border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold w-1/2 focus:outline-none focus:border-[#00b4d8]"
                        />
                      </div>
                    </div>

                    {/* Image 2 */}
                    <div className="flex flex-col gap-1 border border-slate-100 p-2.5 rounded-xl bg-slate-50/50">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Additional Image 2 (Optional)</span>
                      <div className="flex gap-2 items-center">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e.target.files[0], 2)}
                          className="text-[10px] text-slate-555 w-1/2 cursor-pointer"
                        />
                        <input 
                          type="text" 
                          placeholder="Image URL"
                          value={newBlogImage2}
                          onChange={(e) => setNewBlogImage2(e.target.value)}
                          className="border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold w-1/2 focus:outline-none focus:border-[#00b4d8]"
                        />
                      </div>
                    </div>

                    {/* Image 3 */}
                    <div className="flex flex-col gap-1 border border-slate-100 p-2.5 rounded-xl bg-slate-50/50">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Additional Image 3 (Optional)</span>
                      <div className="flex gap-2 items-center">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e.target.files[0], 3)}
                          className="text-[10px] text-slate-555 w-1/2 cursor-pointer"
                        />
                        <input 
                          type="text" 
                          placeholder="Image URL"
                          value={newBlogImage3}
                          onChange={(e) => setNewBlogImage3(e.target.value)}
                          className="border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold w-1/2 focus:outline-none focus:border-[#00b4d8]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase">Body Content *</label>
                    <textarea 
                      rows="5"
                      required
                      placeholder="Write your blog post content details here..."
                      value={newBlogContent}
                      onChange={(e) => setNewBlogContent(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                  <button type="submit" className="bg-[#00b4d8] hover:bg-[#0083b0] text-white text-xs font-black py-2.5 rounded-lg transition-colors uppercase tracking-wider">
                    Publish Blog Post
                  </button>
                </form>
              </div>

            </div>
          )}

          {/* Gallery Manager Tab */}
          {activeTab === 'cms_gallery' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl">
              
              {/* Gallery Items Grid */}
              <div className="lg:col-span-7 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm p-6">
                <h3 className="text-base font-black text-slate-800 mb-4 pb-2 border-b border-slate-100">Gallery Media Library</h3>
                
                {galleryList.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 italic text-xs">No gallery images found in database.</div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
                    {galleryList.map(item => (
                      <div key={item.id} className="border border-slate-100 rounded-xl overflow-hidden bg-slate-50 relative group flex flex-col">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full aspect-[4/3] object-cover bg-slate-100" 
                        />
                        <div className="p-2 flex flex-col justify-between flex-1 gap-1">
                          <span className="text-[0.58rem] font-black text-[#00b4d8] uppercase tracking-wider">{item.category}</span>
                          <span className="text-[0.68rem] font-bold text-slate-700 leading-tight block truncate">{item.title}</span>
                          <button
                            onClick={() => handleDeleteGallery(item.id)}
                            className="w-full text-center text-rose-500 hover:text-white bg-rose-50 hover:bg-rose-500 py-1 rounded text-[0.68rem] font-black transition-all border border-rose-100 mt-1"
                          >
                            Delete Image
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Gallery Image Form */}
              <div className="lg:col-span-5 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm p-6 flex flex-col gap-4">
                <h3 className="text-base font-black text-slate-800 pb-2 border-b border-slate-100">Add New Gallery Image</h3>
                
                <form onSubmit={handleAddGallery} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase">Image Title *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Pune to Mahabaleshwar tour trip pose"
                      value={newGalleryTitle}
                      onChange={(e) => setNewGalleryTitle(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase">Image URL *</label>
                    <input 
                      type="text" 
                      required
                      value={newGalleryImage}
                      onChange={(e) => setNewGalleryImage(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#00b4d8]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase">Category *</label>
                    <select
                      value={newGalleryCategory}
                      onChange={(e) => setNewGalleryCategory(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold bg-white focus:outline-none"
                    >
                      <option value="fleet">Our Fleet</option>
                      <option value="tours">Outstation Tours</option>
                    </select>
                  </div>
                  <button type="submit" className="bg-[#00b4d8] hover:bg-[#0083b0] text-white text-xs font-black py-2.5 rounded-lg transition-colors uppercase tracking-wider">
                    Add Media Image
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
