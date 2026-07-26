import React from 'react';

export default function Reviews() {
  const customerReviews = [
    {
      name: 'Rajesh M.',
      location: 'Kothrud, Pune',
      text: '"Booked an Innova Crysta for our family trip to Shirdi Sai Darshan. The car was spotless, driver was extremely polite and arrived 10 minutes early. Excellent experience!"',
      rating: 5,
      initials: 'RM',
      colorClass: 'from-rose-400 to-orange-400 text-white'
    },
    {
      name: 'Sneha P.',
      location: 'Andheri, Mumbai',
      text: '"Rented a 17-seat Tempo Traveller for Lonavala corporate outing. The seats were very comfortable, AC worked perfectly, and the driver knew the route like back of his hand."',
      rating: 5,
      initials: 'SP',
      colorClass: 'from-blue-500 to-indigo-600 text-white'
    },
    {
      name: 'Aditya K.',
      location: 'Thane, West',
      text: '"Regularly book their Swift and Ertiga for Mumbai Airport drops. They have fixed pricing, no hidden tolls, and absolute punctuality. Best cab service in Pune-Mumbai route."',
      rating: 5,
      initials: 'AK',
      colorClass: 'from-amber-400 to-orange-500 text-white'
    },
    {
      name: 'Priyanka G.',
      location: 'Pimple, Pune',
      text: '"Organized a family yatra for Ashtavinayak Darshan. The 50-seater luxury bus was in top condition, pushing seats were comfortable for elders. Highly recommended!"',
      rating: 5,
      initials: 'PG',
      colorClass: 'from-emerald-400 to-teal-600 text-white'
    }
  ];

  return (
    <section id="reviews-section" className="py-16 bg-[#fafcff] w-full overflow-hidden select-none relative">
      
      {/* Delicate dashed flight path trail winding behind the cards */}
      <svg className="absolute inset-x-0 top-[40%] w-full h-24 opacity-[0.25] pointer-events-none text-slate-300 z-0" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 100">
        <path d="M 0 50 Q 360 100 720 50 T 1440 50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
      </svg>

      {/* Floating Delicate paper plane in top-right */}
      <div className="absolute top-12 right-[8%] opacity-[0.22] pointer-events-none animate-pulse">
        <svg className="w-8 h-8 text-slate-400 rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </div>

      {/* Floating Delicate compass in bottom-left */}
      <div className="absolute bottom-12 left-[6%] opacity-[0.22] pointer-events-none">
        <svg className="w-8 h-8 text-slate-400 animate-spin" style={{ animationDuration: '30s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88" />
        </svg>
      </div>
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-50/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-amber-50/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.62rem] font-black bg-blue-50 border border-blue-100 text-[#0055ff] uppercase tracking-widest mb-3">
            ⭐ Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-slate-800 tracking-tight uppercase">
            What Our Customers Say
          </h2>
          <div className="w-12 h-[1px] bg-slate-400 mx-auto mt-3 mb-4 opacity-60" />
          <p className="text-slate-400 text-xs font-semibold">
            Real feedback from our happy travelers across Maharashtra.
          </p>
        </div>

        {/* 4-Column Row of Custom Oval Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 justify-center items-stretch">
          {customerReviews.map((rev, idx) => (
            <div 
              key={idx}
              className="group relative bg-white border border-slate-200/50 rounded-[100px] sm:rounded-[120px] aspect-[2.6/4] p-8 flex flex-col justify-between items-center text-center shadow-[0_12px_24px_-6px_rgba(15,23,42,0.015),0_4px_10px_rgba(0,0,0,0.01)] hover:shadow-xl hover:border-[#0055ff]/20 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              
              {/* Background quotes mark */}
              <span className="absolute top-8 text-slate-100 font-serif text-8xl leading-none select-none pointer-events-none group-hover:text-blue-50/50 transition-colors duration-300">
                “
              </span>

              {/* Top rating stars */}
              <div className="relative z-10 flex gap-0.5 justify-center mt-4">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

              {/* Middle review text */}
              <div className="relative z-10 my-4 flex-1 flex items-center justify-center">
                <p className="text-[0.72rem] sm:text-[0.74rem] text-slate-500 font-semibold leading-relaxed italic px-2 select-text">
                  {rev.text}
                </p>
              </div>

              {/* Bottom profile info block */}
              <div className="relative z-10 flex flex-col items-center gap-2 mb-6">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${rev.colorClass} flex items-center justify-center font-bold text-[0.72rem] tracking-wider shadow-sm`}>
                  {rev.initials}
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[0.74rem] font-black text-slate-800 leading-none mb-1 flex items-center gap-1">
                    {rev.name}
                    <span className="text-[0.62rem] text-emerald-500 font-black" title="Verified Customer">✓</span>
                  </span>
                  <span className="text-[0.58rem] font-bold text-slate-400 truncate max-w-[120px]">
                    {rev.location}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
