import React, { useState, useEffect } from 'react';

export default function AuthModal({ 
  authMode, 
  setAuthMode, 
  handleAuthSubmit, 
  setShowAuthModal 
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginRole, setLoginRole] = useState('customer'); // 'customer' or 'vendor' (Only for login)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (authMode === 'login' && loginRole === 'vendor') {
      setEmail('booking.poojatravel@gmail.com');
      setPassword('Pooja@1111');
    } else {
      setEmail('');
      setPassword('');
    }
  }, [loginRole, authMode]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade"
      style={{ zIndex: 1000 }}
    >
      {/* Modal Container Box - Increased max-width to max-w-4xl (960px) and set min-height for a larger display */}
      <div className="relative w-full max-w-4xl bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 md:min-h-[520px] max-h-[92vh]">
        
        {/* LEFT COLUMN: BRAND VISUAL PANEL */}
        <div 
          className="hidden md:flex flex-col justify-between p-8 relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.1) 40%, rgba(15, 23, 42, 0) 100%), url('/im.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Logo overlayed softly at top */}
          <div className="relative z-10 flex items-center gap-2 bg-slate-900/35 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 w-fit">
            <div className="w-6.5 h-6.5 rounded-full bg-white/15 flex items-center justify-center overflow-hidden border border-white/20">
              <span className="text-[0.62rem] font-black text-white tracking-tight">PT</span>
            </div>
            <span className="text-[0.68rem] font-black tracking-wider text-white uppercase">Pooja Travels</span>
          </div>

          {/* Simple floating info box at the bottom */}
          <div className="relative z-10 bg-white/85 backdrop-blur-md p-5 rounded-2xl border border-white/40 shadow-lg">
            <span className="text-[0.6rem] font-black text-[#00b4d8] uppercase tracking-wider">Premium Travels</span>
            <h4 className="text-xs sm:text-sm font-black text-slate-800 leading-tight mt-0.5">Outstation Cabs & Coaches</h4>
            <p className="text-[0.68rem] font-semibold text-slate-500 mt-1.5 leading-relaxed">
              Punctual airport drops, family vacation tours, and corporate minibus hires across Maharashtra.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: LOGIN/REGISTER FORMS */}
        <div className="flex flex-col p-8 sm:p-10 overflow-y-auto justify-center">
          
          {/* Close Modal X button */}
          <button 
            onClick={() => setShowAuthModal(false)}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors border border-slate-100 z-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Tab switcher capsule (Login vs Register) */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-5 w-fit gap-1">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`px-4.5 py-1.5 rounded-lg text-xs font-black transition-all ${
                authMode === 'login' 
                  ? 'bg-white text-[#00b4d8] shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`px-4.5 py-1.5 rounded-lg text-xs font-black transition-all ${
                authMode === 'register' 
                  ? 'bg-white text-[#00b4d8] shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register
            </button>
          </div>

          {/* Role switcher capsule - ONLY visible in Login mode, hidden in Register mode */}
          {authMode === 'login' && (
            <div className="flex bg-slate-50 border border-slate-200/60 p-1 rounded-lg mb-6 w-fit gap-1">
              <button
                type="button"
                onClick={() => setLoginRole('customer')}
                className={`px-4 py-1.5 rounded-md text-[0.68rem] font-black transition-all ${
                  loginRole === 'customer' 
                    ? 'bg-[#00b4d8] text-white shadow-sm shadow-[#00b4d8]/25' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                style={{ cursor: 'pointer' }}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setLoginRole('vendor')}
                className={`px-4 py-1.5 rounded-md text-[0.68rem] font-black transition-all ${
                  loginRole === 'vendor' 
                    ? 'bg-[#00b4d8] text-white shadow-sm shadow-[#00b4d8]/25' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                style={{ cursor: 'pointer' }}
              >
                Vendor
              </button>
            </div>
          )}

          {/* Form Header */}
          <div className="mb-6">
            <span className="text-[0.68rem] font-black text-slate-400 uppercase tracking-widest block mb-0.5">
              {authMode === 'login' 
                ? (loginRole === 'customer' ? 'Customer Portal' : 'Partner Network')
                : 'Customer Registration'}
            </span>
            <h3 className="text-xl font-black text-slate-850 tracking-tight leading-none">
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h3>
          </div>

          {/* Main Auth Form */}
          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
            
            {/* LOGIN MODE FIELDS (Simple Vertical Stack) */}
            {authMode === 'login' && (
              <>
                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.68rem] font-black text-slate-500 uppercase tracking-wider">Email Address *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </span>
                    <input 
                      type="email" 
                      name="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full border border-slate-200/80 bg-slate-50/20 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-750 focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.68rem] font-black text-slate-500 uppercase tracking-wider">Password *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border border-slate-200/80 bg-slate-50/20 rounded-xl pl-10 pr-10 py-2.5 text-xs font-semibold text-slate-750 focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8]/15 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                      style={{ cursor: 'pointer' }}
                    >
                      {showPassword ? (
                        <svg className="w-3.5 h-3.5 fill-none stroke-currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 fill-none stroke-currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* REGISTER MODE FIELDS (Double Column Grid to avoid height stretching) */}
            {authMode === 'register' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.68rem] font-black text-slate-500 uppercase tracking-wider">Full Name *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </span>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      placeholder="Rahul Patil"
                      className="w-full border border-slate-200/80 bg-slate-50/20 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-750 focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.68rem] font-black text-slate-500 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                      </svg>
                    </span>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="+91 98765 43210"
                      className="w-full border border-slate-200/80 bg-slate-50/20 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-750 focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.68rem] font-black text-slate-500 uppercase tracking-wider">Email Address *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </span>
                    <input 
                      type="email" 
                      name="email" 
                      required
                      placeholder="name@example.com"
                      className="w-full border border-slate-200/80 bg-slate-50/20 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-750 focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.68rem] font-black text-slate-500 uppercase tracking-wider">Password *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      required
                      placeholder="••••••••"
                      className="w-full border border-slate-200/80 bg-slate-50/20 rounded-xl pl-10 pr-10 py-2.5 text-xs font-semibold text-slate-750 focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8]/15 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-650"
                      style={{ cursor: 'pointer' }}
                    >
                      {showPassword ? (
                        <svg className="w-3.5 h-3.5 fill-none stroke-currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 fill-none stroke-currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* Hidden Input field to submit selected role for backend login */}
            <input type="hidden" name="role" value={authMode === 'login' ? loginRole : 'customer'} />

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-[#00b4d8] hover:bg-[#0083b0] text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-sm shadow-[#00b4d8]/15 flex items-center justify-center gap-1.5 hover:-translate-y-0.5 mt-2"
              style={{ cursor: 'pointer' }}
            >
              <span>
                {authMode === 'login' 
                  ? `Sign In as ${loginRole === 'customer' ? 'Customer' : 'Vendor'}` 
                  : 'Create Customer Account'}
              </span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>

          </form>

          {/* Footer toggle link */}
          <div className="text-center mt-6">
            <span className="text-[0.68rem] font-bold text-slate-500">
              {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button 
              type="button"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-[0.68rem] font-black text-[#00b4d8] hover:text-[#0083b0] hover:underline"
              style={{ cursor: 'pointer' }}
            >
              {authMode === 'login' ? 'Register Now' : 'Login Here'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
