import React, { useState } from 'react';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';
import { blogData } from '../data/blogData';

export default function BlogPage({ setCurrentPage }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activePost, setActivePost] = useState(null); // For Read More Modal

  // Filter posts
  const filteredPosts = blogData.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedFilter === 'all' ? true : post.category === selectedFilter;
    
    return matchesSearch && matchesCategory;
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
      <HeaderBreadcrumbs title="Travel Blog" setCurrentPage={setCurrentPage} />

      {/* Main Grid Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-3">
            <svg className="w-3.5 h-3.5 text-[#00b4d8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <span>Travel Stories &amp; Guides</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
            Pooja Travels <span className="text-[#00b4d8]">Travel Blog</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-xl mx-auto leading-relaxed">
            Guides, spiritual destination paths, safety tips, and travel inspirations written directly for your next tour.
          </p>
        </div>
        
        {/* Filters and Search Bar Container */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { slug: 'all', label: 'All Articles' },
              { slug: 'travel', label: 'Travel Tips' },
              { slug: 'pilgrimage', label: 'Pilgrimage' },
              { slug: 'fleet', label: 'Fleet Guide' },
              { slug: 'roadtrips', label: 'Road Trips' }
            ].map(tab => (
              <button
                key={tab.slug}
                onClick={() => setSelectedFilter(tab.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedFilter === tab.slug
                    ? 'bg-[#00b4d8] text-white shadow-sm shadow-[#00b4d8]/40'
                    : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/65'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-xs w-full">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text"
              placeholder="Search guides..."
              className="w-full border border-slate-200/80 bg-white rounded-xl pl-9 pr-4 py-2 text-xs font-semibold text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#00b4d8]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

        </div>

        {/* Articles Cards Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white/60 backdrop-blur-md border border-slate-200/50 rounded-2xl p-6 shadow-sm">
            <p className="text-xs sm:text-sm font-semibold text-slate-500">No blog posts found matching your search. Try adjusting filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <div 
                key={post.id}
                className="bg-white border border-slate-200/85 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                
                {/* Image Wrap with Category badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('bg-gradient-to-br', 'from-cyan-50', 'to-sky-100', 'flex', 'items-center', 'justify-center');
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-[#00b4d8] text-white text-[0.6rem] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                    {post.categoryLabel}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Date and Read time */}
                    <div className="flex items-center gap-3 text-[0.62rem] font-bold text-slate-400 mb-2">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-slate-350" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug mb-2 hover:text-[#00b4d8] transition-colors cursor-pointer" onClick={() => setActivePost(post)}>
                      {post.title}
                    </h3>
                    
                    <p className="text-xs font-semibold text-slate-500 leading-relaxed text-justify mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <button
                    onClick={() => setActivePost(post)}
                    className="text-[0.68rem] font-black text-[#00b4d8] hover:text-[#0083b0] transition-colors flex items-center gap-1 w-fit group"
                  >
                    <span>Read Full Article</span>
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* IMMERSIVE READ MORE MODAL */}
      {activePost && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade" style={{ zIndex: 1000 }}>
          <div className="relative w-full max-w-2xl bg-white border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Image Header */}
            <div className="relative aspect-[21/9] overflow-hidden bg-slate-100">
              <img 
                src={activePost.image} 
                alt={activePost.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.parentNode.classList.add('bg-gradient-to-br', 'from-cyan-50', 'to-sky-100');
                }}
              />
              <span className="absolute top-4 left-4 bg-[#00b4d8] text-white text-[0.65rem] font-black uppercase tracking-wider px-3 py-1 rounded-lg shadow-md">
                {activePost.categoryLabel}
              </span>
              {/* Close Button */}
              <button 
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900/40 hover:bg-slate-900/60 text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body Scroll area */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Date & Read time */}
              <div className="flex items-center gap-3 text-[0.65rem] font-bold text-slate-400 mb-3">
                <span>Published on {activePost.date}</span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-slate-350" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {activePost.readTime}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight leading-snug mb-4">
                {activePost.title}
              </h2>

              {/* Parsed paragraphs content */}
              <div className="text-xs sm:text-sm font-semibold text-slate-650 leading-relaxed text-justify space-y-4 whitespace-pre-line">
                {activePost.content}
              </div>
            </div>

            {/* Modal Footer actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button 
                onClick={() => {
                  setActivePost(null);
                  setCurrentPage('contact');
                }}
                className="bg-[#00b4d8] hover:bg-[#0083b0] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-[#00b4d8]/15"
              >
                Inquire For This Trip
              </button>
              <button 
                onClick={() => setActivePost(null)}
                className="bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
