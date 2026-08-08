import React from 'react';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';

export default function TermsConditionsPage({ setCurrentPage }) {
  const sections = [
    { id: 'general', title: '1. General Rental Agreement' },
    { id: 'booking-cancellation', title: '2. Booking & Cancellation Policies' },
    { id: 'pricing-exclusions', title: '3. Pricing & Extra Charges (Exclusions)' },
    { id: 'daily-average', title: '4. Minimum Daily Distance Average' },
    { id: 'driver-allowance', title: '5. Driver Allowance & Rules' },
    { id: 'liability', title: '6. Vehicle Breakdowns & Liability' },
    { id: 'conduct', title: '7. Passenger Conduct & Laws' },
    { id: 'contact', title: '8. Support Contact Details' }
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
      <HeaderBreadcrumbs title="Terms &amp; Conditions" setCurrentPage={setCurrentPage} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1">
        
        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-black bg-[#00b4d8]/10 text-[#00b4d8] uppercase tracking-wider mb-3">
            <span>Customer Agreement</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Terms &amp; <span className="text-[#00b4d8]">Conditions</span>
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-xl mx-auto mt-2">
            Please read these terms and conditions carefully. They contain details about your rental outstation limits, pricing exclusions, and driver terms.
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

          {/* Right Detailed Terms Text (8 cols) */}
          <div className="md:col-span-8 bg-white/95 backdrop-blur-md border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 text-left space-y-8">
            
            <div id="general" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">1. General Rental Agreement</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                By booking any service with Pooja Tours &amp; Travels ("we", "us", or "our"), you agree to abide by these Terms and Conditions. This agreement covers all passenger vehicle rentals, outstation trips, airport drops, and coach chartering services.
              </p>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                The business operates from Bhugaon on Mulshi Road, Pune, Maharashtra 412115. All agreements and transactions are subject to the jurisdiction of courts in Pune, Maharashtra.
              </p>
            </div>

            <div id="booking-cancellation" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">2. Booking &amp; Cancellation Policies</h3>
              <ul className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold space-y-2 list-disc pl-4">
                <li><strong>Advance Bookings:</strong> Bookings can be made online via the web interface or directly over WhatsApp/telephone. Booking confirmations are only sent after verification of passenger identity and destination routing.</li>
                <li><strong>No Cancellation Fees:</strong> We do not charge cancellation fees if a reservation is cancelled up to 24 hours prior to the scheduled pick-up time.</li>
                <li><strong>Late Cancellation:</strong> If a booking is cancelled less than 24 hours before pick-up, we reserve the right to charge a minimal travel processing fee.</li>
              </ul>
            </div>

            <div id="pricing-exclusions" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">3. Pricing &amp; Extra Charges (Exclusions)</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                Our base outstation rates are calculated per kilometer (WagonR/Dzire/Swift/Etios at ₹13/km; Ertiga/Carens at ₹16/km; Innova Crysta at ₹20/km). To maintain transparency, please note our billing exclusions:
              </p>
              <div className="bg-rose-50/20 border border-rose-100/50 rounded-2xl p-4 text-xs font-semibold text-slate-650 space-y-1.5">
                <div>❌ <strong>Toll Charges:</strong> All national highway and state highway toll taxes are excluded from the base fare and must be paid by the customer at actuals.</div>
                <div>❌ <strong>Driver Allowance:</strong> Driver allowance is charged extra at a flat rate of ₹300/- per day.</div>
                <div>❌ <strong>State Entry Permits:</strong> Any state crossing entry permits (mandatory for buses crossing borders) are excluded. (Note: State permit charges do not apply for passenger cabs).</div>
                <div>❌ <strong>Parking &amp; Entry:</strong> Any local parking charges at airports, railway stations, tourist venues, or entry tickets are paid extra by the customer.</div>
              </div>
            </div>

            <div id="daily-average" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">4. Minimum Daily Distance Average</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                For all outstation round trips, a minimum running distance average of <strong>300 kilometers per calendar day</strong> is enforced.
              </p>
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 text-xs font-bold text-slate-700 leading-relaxed">
                ℹ️ <strong>Calculation Example:</strong> If you book a cab for a 2-day round trip, the minimum billable run will be 600 km (2 days × 300 km/day), even if the actual distance traveled is less. If the actual distance run exceeds 600 km, billing will be calculated based on the actual kilometers driven.
              </div>
            </div>

            <div id="driver-allowance" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">5. Driver Allowance &amp; Rules</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                Drivers are designated by Pooja Tours &amp; Travels and hold valid commercial driving licenses.
              </p>
              <ul className="text-xs sm:text-sm text-slate-600 font-semibold space-y-2 pl-4 list-disc">
                <li>Driver allowance of ₹300/- per day applies. A calendar day is measured from 12:00 AM (midnight) to 11:59 PM.</li>
                <li>Drivers are entitled to a rest period. For multi-day outstation trips, driving is restricted between 11:00 PM and 5:00 AM to prevent driver fatigue, unless there is an emergency or pre-planned flight pickup.</li>
              </ul>
            </div>

            <div id="liability" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">6. Vehicle Breakdowns &amp; Liability</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                We maintain our vehicle fleet to the highest safety and reliability standards.
              </p>
              <ul className="text-xs sm:text-sm text-slate-600 font-semibold space-y-2 pl-4 list-disc">
                <li>In the rare event of a mechanical breakdown during your journey, we will arrange a replacement vehicle as quickly as possible.</li>
                <li>We are not liable for travel delays caused by natural disasters, roadblocks, landslides, highway accidents, weather conditions, or political strikes.</li>
              </ul>
            </div>

            <div id="conduct" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">7. Passenger Conduct &amp; Laws</h3>
              <ul className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold space-y-2 list-disc pl-4">
                <li><strong>No Smoking or Alcohol:</strong> In compliance with transport guidelines, smoking, consumption of alcohol, or use of illegal substances inside Pooja vehicle fleets is strictly prohibited.</li>
                <li><strong>Baggage Liability:</strong> Passengers are responsible for their luggage. We are not liable for loss or damage to personal items left in the vehicle.</li>
                <li><strong>Passenger Limits:</strong> The total passenger count must not exceed the certified capacity of the booked vehicle (e.g. max 4 passengers for Sedan, max 6 for Ertiga, max 7 for Innova, max 17 for Tempo Traveller).</li>
              </ul>
            </div>

            <div id="contact" className="scroll-mt-28 space-y-3">
              <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-2">8. Support Contact Details</h3>
              <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                For questions regarding booking terms, please contact:
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
