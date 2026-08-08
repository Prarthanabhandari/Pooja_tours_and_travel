import React from 'react';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';

export default function PrivacyPolicyPage({ setCurrentPage }) {
  const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'info-collection', title: '2. Information We Collect' },
    { id: 'info-usage', title: '3. How We Use Your Information' },
    { id: 'data-protection', title: '4. Data Protection & Security' },
    { id: 'third-party', title: '5. Third-Party Sharing' },
    { id: 'cookies', title: '6. Cookies & Site Tracking' },
    { id: 'updates', title: '7. Policy Updates' },
    { id: 'contact', title: '8. Contact Information' }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="relative bg-slate-50/30 overflow-hidden w-full flex-1 flex flex-col" style={{ minHeight: '80vh' }}>
      {/* Background Watermark Pattern Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none"
        style={{ 
          backgroundImage: `url('/travel-watermark-clean.png')`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px'
        }}
      />
      <div className="absolute top-[10%] left-[-15%] w-[450px] h-[450px] rounded-full bg-cyan-200/20 blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-15%] w-[450px] h-[450px] rounded-full bg-yellow-100/20 blur-3xl z-0 pointer-events-none" />

      {/* Breadcrumbs Header */}
      <HeaderBreadcrumbs title="Privacy Policy" setCurrentPage={setCurrentPage} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        
        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-3">
            <span>Security &amp; Safety</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Privacy <span className="text-[#00b4d8]">Policy</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-xl mx-auto mt-2">
            Pooja Tours &amp; Travels committed to protecting your privacy. This policy outlines how we handle and protect your personal data.
          </p>
        </div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Sticky Sidebar (4 cols) */}
          <div className="md:col-span-4 bg-white/80 backdrop-blur-md border border-slate-100 rounded-3xl p-5 shadow-lg shadow-slate-100/50 sticky top-24 hidden md:block text-left">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Table of Contents</h3>
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full text-left py-2 px-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-[#00b4d8] transition-all cursor-pointer block"
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right Detailed Privacy Text (8 cols) */}
          <div className="md:col-span-8 bg-white/95 backdrop-blur-md border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 text-left space-y-8">
            
            <div id="introduction" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">1. Introduction</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                Welcome to Pooja Tours &amp; Travels ("we", "us", or "our"). We operate chauffeur cab rentals, group tour packages, and private bus services. We value the trust you place in us when sharing your personal information. This Privacy Policy details how we collect, process, utilize, and secure your personal details during your bookings and web interactions.
              </p>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                By booking a trip or accessing our website at Bhugaon, Bavdhan, Pune, you consent to the data collection and usage practices described in this policy statement.
              </p>
            </div>

            <div id="info-collection" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">2. Information We Collect</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                To complete your travel reservations, we require and gather the following details:
              </p>
              <ul className="text-xs sm:text-sm text-slate-600 font-semibold space-y-2 pl-4 list-disc">
                <li><strong>Identity Data:</strong> Full name, telephone/mobile number, email address, and billing address.</li>
                <li><strong>Booking Parameters:</strong> Selected vehicle type, pick-up location, drop-off destination, trip dates, duration, and seat/passenger counts.</li>
                <li><strong>Payment Information:</strong> Financial transactions, billing addresses, and receipt references (we do not store your complete card credentials; processing is handled by compliant gateways).</li>
                <li><strong>Communication Log:</strong> Records of support inquiries, email logs, and messages exchanged over WhatsApp chat channels.</li>
              </ul>
            </div>

            <div id="info-usage" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">3. How We Use Your Information</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                We strictly use your details to facilitate travel operations. Mandatory use-cases include:
              </p>
              <ul className="text-xs sm:text-sm text-slate-600 font-semibold space-y-2 pl-4 list-disc">
                <li>Processing bookings, scheduling cabs, and assigning drivers.</li>
                <li>Sharing trip details, driver contact numbers, and vehicle registration numbers via SMS or WhatsApp messages.</li>
                <li>Performing distance calculations and generating transparent outstation fare structures.</li>
                <li>Answering support requests and resolving service complaints.</li>
                <li>Complying with regional transport regulations and state authority laws in Maharashtra.</li>
              </ul>
            </div>

            <div id="data-protection" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">4. Data Protection &amp; Security</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                We employ standard firewall architectures, security controls, and encryption techniques to safeguard your personal details against unauthorized access, disclosure, altering, or deletion.
              </p>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold text-slate-500">
                Please note that while we follow best industry standards, no internet transmission channel or electronic storage system is 100% secure. We cannot guarantee complete absolute security of information.
              </p>
            </div>

            <div id="third-party" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">5. Third-Party Sharing</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                We do not sell, rent, trade, or distribute your personal details to advertising agencies. We only share information with partners involved in completing your journey:
              </p>
              <ul className="text-xs sm:text-sm text-slate-600 font-semibold space-y-2 pl-4 list-disc">
                <li>Chauffeurs and transport partners who need pick-up locations and contact numbers to complete your transit.</li>
                <li>State authorities, toll booths, and border security checkpoints when necessary to secure local permits.</li>
                <li>Payment gateway providers to process booking transactions securely.</li>
              </ul>
            </div>

            <div id="cookies" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">6. Cookies &amp; Site Tracking</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                Our site uses cookies to remember search parameters (from and to cities, travel dates) and save user dashboard preferences. You can configure your web browser to reject cookies, though some features might not function optimally without them.
              </p>
            </div>

            <div id="updates" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">7. Policy Updates</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                We may periodically update this Privacy Policy. The "Last Updated" text at the bottom reflects the latest revision date. Continued use of our booking services indicates acceptance of the revised conditions.
              </p>
              <p className="text-xs text-slate-400 font-bold">
                Last Updated: August 2026
              </p>
            </div>

            <div id="contact" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">8. Contact Information</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                If you have questions about this Privacy Policy or wish to modify/delete your registered user profile, please contact our data team:
              </p>
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 text-xs font-bold text-slate-700 space-y-1.5">
                <div>🏢 <strong>Business Name:</strong> Pooja Tours &amp; Travels</div>
                <div>👤 <strong>Owner Name:</strong> Ajay Bhandari</div>
                <div>📍 <strong>Address:</strong> Bhugaon on Mulshi Rd, Bhugaon, Bavdhan, Pune, Maharashtra 412115</div>
                <div>📞 <strong>Phone:</strong> <a href="tel:+919623324139" className="hover:underline text-[#00b4d8]">+91 9623324139</a></div>
                <div>✉️ <strong>Email:</strong> <a href="mailto:booking.poojatravel@gmail.com" className="hover:underline text-[#00b4d8]">booking.poojatravel@gmail.com</a></div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
