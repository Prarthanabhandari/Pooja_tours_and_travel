import React from 'react';

export default function HeaderBreadcrumbs({ title, setCurrentPage }) {
  return (
    <div className="relative z-10 bg-white/70 backdrop-blur-md border-b border-slate-200/50 py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center border-l-4 border-[#00b4d8] pl-4">
        <h1 className="text-lg sm:text-xl font-extrabold text-[#0f172a] tracking-tight">
          {title}
        </h1>

        <div className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-1.5">
          <button 
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="hover:text-[#00b4d8] transition-colors"
          >
            Home
          </button>
          <span className="text-slate-350">»</span>
          <span className="text-[#00b4d8] font-bold">{title}</span>
        </div>
      </div>
    </div>
  );
}
