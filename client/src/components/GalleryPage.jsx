import React, { useState, useEffect } from 'react';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';
import { galleryImages } from '../data/galleryImages';

export default function GalleryPage({ setCurrentPage }) {
  // Load liked items from local storage
  const [likedItems, setLikedItems] = useState(() => {
    return JSON.parse(localStorage.getItem('gallery_likes') || '{}');
  });

  // Load images, adjusting initial counts based on persistent likes state
  const [images, setImages] = useState(() => {
    const savedLikes = JSON.parse(localStorage.getItem('gallery_likes') || '{}');
    return galleryImages.map(item => {
      if (savedLikes[item.id]) {
        return { ...item, likes: item.likes + 1 };
      }
      return item;
    });
  });

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeImageIndex, setActiveImageIndex] = useState(null); // Lightbox index

  // Toggle favorite / like state
  const toggleLike = (id) => {
    setLikedItems(prev => {
      const isLiked = !!prev[id];
      const updated = { ...prev, [id]: !isLiked };
      localStorage.setItem('gallery_likes', JSON.stringify(updated));
      
      // Update local count
      setImages(curr => curr.map(item => {
        if (item.id === id) {
          return { ...item, likes: isLiked ? item.likes - 1 : item.likes + 1 };
        }
        return item;
      }));
      
      return updated;
    });
  };

  // Filter items
  const filteredImages = images.filter(img => {
    if (selectedFilter === 'all') return true;
    return img.category === selectedFilter;
  });

  // Handle keyboard inputs inside Lightbox slider
  useEffect(() => {
    if (activeImageIndex === null) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex(prev => (prev === 0 ? filteredImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex(prev => (prev === filteredImages.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        setActiveImageIndex(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, filteredImages.length]);

  return (
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
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-200/20 blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-yellow-100/20 blur-3xl z-0 pointer-events-none" />

      {/* Breadcrumbs Header */}
      <HeaderBreadcrumbs title="Gallery" setCurrentPage={setCurrentPage} />

      {/* Main Grid Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-3">
            <svg className="w-3.5 h-3.5 text-[#00b4d8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
            <span>Memories On The Road</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
            Our Travel <span className="text-[#00b4d8]">Moments &amp; Fleet</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-xl mx-auto leading-relaxed">
            A glimpse of our comfortable tempo travellers, outstation cabs, and happy groups across scenic spots in India.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex justify-center items-center gap-2 mb-8">
          {[
            { slug: 'all', label: 'All Photos' },
            { slug: 'fleet', label: 'Our Fleet' },
            { slug: 'tours', label: 'Outstation Tours' }
          ].map(tab => (
            <button
              key={tab.slug}
              onClick={() => setSelectedFilter(tab.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                selectedFilter === tab.slug
                  ? 'bg-[#00b4d8] text-white shadow-sm shadow-[#00b4d8]/40'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => setActiveImageIndex(idx)}
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col cursor-pointer"
            >
              
              {/* Card Header (Round avatar and name) */}
              <div className="flex items-center gap-2.5 p-3 border-b border-slate-100 bg-slate-50/30">
                <div className="w-8 h-8 rounded-full bg-[#00b4d8]/10 flex items-center justify-center border border-[#00b4d8]/15 overflow-hidden">
                  <span className="text-[0.65rem] font-black text-[#00b4d8] tracking-tight">PT</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-800 leading-tight">Pooja Travels</span>
                  <span className="text-[0.55rem] font-bold text-slate-400">
                    {item.category === 'fleet' ? 'Our Premium Fleet' : 'Outstation Tour'}
                  </span>
                </div>
              </div>

              {/* Card Image Wrapper with Favorite Icon overlay */}
              <div className="relative overflow-hidden aspect-square bg-slate-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentNode.classList.add('bg-gradient-to-br', 'from-cyan-50', 'to-sky-100', 'flex', 'items-center', 'justify-center');
                  }}
                />
                
                {/* Heart Like Floating Button */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-20"
                  style={{ cursor: 'pointer' }}
                >
                  <svg 
                    className={`w-4 h-4 transition-colors ${
                      likedItems[item.id] 
                        ? 'text-red-500 fill-current' 
                        : 'text-slate-400 fill-none hover:text-red-400'
                    }`} 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL WITH NAVIGATION */}
      {activeImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-slate-950/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm animate-fade select-none"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10 z-[10000]"
            style={{ cursor: 'pointer' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Arrow Button */}
          <button
            onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => (prev === 0 ? filteredImages.length - 1 : prev - 1)); }}
            className="absolute left-4 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10 hover:scale-105 active:scale-95"
            style={{ cursor: 'pointer' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Large Image Container */}
          <div className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={filteredImages[activeImageIndex].image} 
              alt={filteredImages[activeImageIndex].title} 
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            {/* Title / Description */}
            <p className="text-white text-xs sm:text-sm font-extrabold mt-4 text-center tracking-wide bg-slate-900/60 px-4 py-2.5 rounded-2xl border border-white/5 shadow-md">
              {filteredImages[activeImageIndex].title}
            </p>
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => (prev === filteredImages.length - 1 ? 0 : prev + 1)); }}
            className="absolute right-4 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10 hover:scale-105 active:scale-95"
            style={{ cursor: 'pointer' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}

    </div>
  );
}
