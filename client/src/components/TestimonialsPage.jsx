import React, { useState } from 'react';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';
import { testimonialsData } from '../data/testimonialsData';

export default function TestimonialsPage({ setCurrentPage }) {
  const [reviews, setReviews] = useState(testimonialsData);
  const [filter, setFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(null); // For detailed card pop-up

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('outstation');
  const [hoverRating, setHoverRating] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle Submit Review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !text) return;

    const newReview = {
      id: Date.now(),
      name,
      role: role || 'Traveler',
      text,
      rating,
      category,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    setReviews([newReview, ...reviews]);
    
    // Reset Form
    setName('');
    setRole('');
    setText('');
    setRating(5);
    setShowSuccess(true);
    
    // Auto-close modal after success showing
    setTimeout(() => {
      setShowSuccess(false);
      setIsFormOpen(false);
    }, 1500);
  };

  // Filtered list
  const filteredReviews = reviews.filter(r => {
    if (filter === 'all') return true;
    return r.category === filter;
  });

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
      <HeaderBreadcrumbs title="Traveler Reviews" setCurrentPage={setCurrentPage} />

      {/* Main Grid Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-3">
            <svg className="w-3.5 h-3.5 text-[#00b4d8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.196-.641 1.01-.641 1.206 0l2.062 6.643a1 1 0 00.95.69h6.905c.675 0 .954.869.408 1.289l-5.586 4.06a1 1 0 00-.364 1.118l2.062 6.642c.196.64-.563 1.185-1.107.785l-5.585-4.06a1 1 0 00-1.18 0l-5.585 4.06c-.543.4-.131-.145-.131-.785l2.062-6.642a1 1 0 00-.364-1.118L2.05 12.122c-.547-.42-.267-1.289.408-1.289h6.905a1 1 0 00.95-.69l2.062-6.643z" />
            </svg>
            <span>Client Testimonials</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
            What Our <span className="text-[#00b4d8]">Travelers Say</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-xl mx-auto leading-relaxed">
            Verified stories and feedback from customers who booked our Force Travellers and outstation cabs.
          </p>
        </div>
        
        {/* Navigation & Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { slug: 'all', label: 'All Reviews' },
              { slug: 'outstation', label: 'Outstation Tours' },
              { slug: 'airport', label: 'Airport Drops' },
              { slug: 'minibus', label: 'Minibus Rental' }
            ].map(tab => (
              <button
                key={tab.slug}
                onClick={() => setFilter(tab.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  filter === tab.slug
                    ? 'bg-[#00b4d8] text-white shadow-sm shadow-[#00b4d8]/40'
                    : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/65'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Write a Review CTA Button */}
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-1.5 bg-[#00b4d8] hover:bg-[#0083b0] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-[#00b4d8]/20 self-start sm:self-auto hover:-translate-y-0.5 active:translate-y-0"
            style={{ cursor: 'pointer' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <span>Write a Review</span>
          </button>

        </div>

        {/* Reviews Cards List (2-column responsive layout) */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-2xl p-6 shadow-sm">
            <p className="text-xs sm:text-sm font-semibold text-slate-500">No reviews found in this category. Be the first to share one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map(r => (
              <div 
                key={r.id}
                onClick={() => setActiveReview(r)}
                className="relative bg-white/65 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <span style={{ fontSize: '4rem', color: 'rgba(0, 180, 216, 0.07)', position: 'absolute', top: '-10px', left: '15px', pointerEvents: 'none' }}>“</span>
                
                <p className="text-xs sm:text-sm font-semibold text-slate-650 leading-relaxed text-justify mb-4 relative z-10 pl-6 line-clamp-3">
                  {r.text}
                </p>

                <div className="flex justify-between items-center pl-6">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-800 leading-none">{r.name}</span>
                    <span className="text-[0.58rem] font-bold text-slate-400 mt-1">{r.role} • {r.date}</span>
                  </div>
                  
                  {/* Star Rating Display */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < r.rating ? 'text-amber-400 fill-current' : 'text-slate-200'}`} 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"/>
                      </svg>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* DYNAMIC REVIEW DETAIL POPUP MODAL */}
      {activeReview && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade"
          style={{ zIndex: 1000 }}
        >
          <div className="relative w-full max-w-lg bg-white border border-slate-250 rounded-2xl shadow-xl p-6 flex flex-col">
            <span style={{ fontSize: '6rem', color: 'rgba(0, 180, 216, 0.08)', position: 'absolute', top: '10px', left: '20px', pointerEvents: 'none' }}>“</span>
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveReview(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Review text */}
            <p className="text-xs sm:text-sm font-semibold text-slate-650 leading-relaxed text-justify mb-6 mt-8 pl-6 relative z-10">
              {activeReview.text}
            </p>

            {/* Review Chauffeur Details */}
            <div className="flex justify-between items-center border-t border-slate-100 pt-4 pl-6">
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-800">{activeReview.name}</span>
                <span className="text-[0.6rem] font-bold text-slate-400 mt-0.5">{activeReview.role} • {activeReview.date}</span>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < activeReview.rating ? 'text-amber-400 fill-current' : 'text-slate-200'}`} 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"/>
                  </svg>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* DYNAMIC WRITE A REVIEW FORM MODAL */}
      {isFormOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade"
          style={{ zIndex: 1000 }}
        >
          <div className="relative w-full max-w-md bg-white border border-slate-250 rounded-2xl shadow-xl p-5 flex flex-col">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-sm font-black text-slate-800 mb-1">Share Your Experience</h3>
            <p className="text-[0.68rem] font-bold text-slate-400 mb-4 leading-relaxed">
              Your feedback helps us maintain our premium standards of chauffeur driven vehicle comfort and safety.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              
              {/* Name field */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-wider">Your Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Patil"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00b4d8]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Role/Category field */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-wider">Trip Type / Role</label>
                <input 
                  type="text" 
                  placeholder="e.g. Outstation Traveler"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00b4d8]"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              {/* Category dropdown */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-wider">Select Category</label>
                <select 
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#00b4d8]"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="outstation">Outstation Tour</option>
                  <option value="airport">Airport Drop/Pickup</option>
                  <option value="minibus">Minibus Booking</option>
                </select>
              </div>

              {/* Star Rating selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-wider">Your Rating *</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="transition-transform hover:scale-110"
                      style={{ cursor: 'pointer' }}
                    >
                      <svg 
                        className={`w-5 h-5 ${
                          star <= (hoverRating || rating) 
                            ? 'text-amber-400 fill-current' 
                            : 'text-slate-200 fill-none'
                        }`} 
                        stroke="currentColor" 
                        strokeWidth={star <= (hoverRating || rating) ? "0" : "2"}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"/>
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-wider">Review Message *</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="Share details of your travel experience, driver service, and vehicle comfort..."
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00b4d8]"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              {/* Success Alert */}
              {showSuccess && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-3 py-2 rounded-xl text-[0.68rem] font-bold text-center animate-pulse">
                  ✓ Review submitted successfully!
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-[#00b4d8] hover:bg-[#0083b0] text-white font-extrabold text-xs py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 mt-2"
              >
                Submit Review
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
