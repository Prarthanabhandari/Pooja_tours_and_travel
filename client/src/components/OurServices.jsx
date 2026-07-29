import React, { useState } from 'react';

export default function OurServices() {
  // State to track which accordion section is expanded
  // Pre-expand 'airports' by default, matching the user's mockup
  const [activeSection, setActiveSection] = useState('airports');

  const servicesData = {
    airports: {
      title: 'Airports Transfer',
      links: [
        { name: 'Pune To Mumbai Airport Drop Cab', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Pune to Mumbai Airport Drop.' },
        { name: 'Mumbai Airport To Pune', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Mumbai Airport to Pune.' },
        { name: 'Mumbai Airport To Shirdi', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Mumbai Airport to Shirdi.' },
        { name: 'Mumbai To Pune', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Mumbai to Pune.' },
        { name: 'Pune To Navi Mumbai Airport', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Pune to Navi Mumbai Airport.' },
        { name: 'Navi Mumbai Airport To Pune', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Navi Mumbai Airport to Pune.' }
      ]
    },
    destinations: {
      title: 'Popular Destination',
      links: [
        { name: 'Pune To Mahabaleshwar Cab', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Pune to Mahabaleshwar.' },
        { name: 'Pune To Lonavala Cab', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Pune to Lonavala.' },
        { name: 'Pune To Shirdi Sai Darshan', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Pune to Shirdi Sai Darshan.' },
        { name: 'Pune To Nashik Trimbakeshwar', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Pune to Nashik Trimbakeshwar.' },
        { name: 'Pune To Ashtavinayak Darshan Tour', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Pune to Ashtavinayak Darshan Tour.' },
        { name: 'Pune To Lavasa Weekend Cab', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Pune to Lavasa.' },
        { name: 'Pune To Kolhapur Jyotiba Cab', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Pune to Kolhapur Jyotiba.' },
        { name: 'Pune To Goa Outstation Cab', whatsappText: 'Hello Pooja Tours & Travels, I want to book a cab for Pune to Goa.' }
      ]
    },
    localBooking: {
      title: 'Pune Local & Monthly Cab Booking',
      links: [
        { name: 'Pune Local Sightseeing Cab (8 Hrs / 80 Km)', whatsappText: 'Hello Pooja Tours & Travels, I want to book a local cab for Pune Sightseeing (8 Hours/80 Km).' },
        { name: 'Pune Local Sightseeing Cab (12 Hrs / 120 Km)', whatsappText: 'Hello Pooja Tours & Travels, I want to book a local cab for Pune Sightseeing (12 Hours/120 Km).' },
        { name: 'Corporate Monthly Car Rentals', whatsappText: 'Hello Pooja Tours & Travels, I want to inquire about Corporate Monthly Car Rentals.' },
        { name: 'Long-Term Employee Pick & Drop Cabs', whatsappText: 'Hello Pooja Tours & Travels, I want to inquire about Employee Pick & Drop services.' },
        { name: 'Pune To Mumbai Local Monthly Packages', whatsappText: 'Hello Pooja Tours & Travels, I want to inquire about Pune to Mumbai monthly packages.' }
      ]
    }
  };

  const toggleSection = (sectionKey) => {
    if (activeSection === sectionKey) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionKey);
    }
  };

  return (
    <section id="services-section" className="pt-4 pb-6 bg-slate-50/50 w-full overflow-hidden border-b border-slate-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Mockup Header */}
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight text-center mb-4">
          Our Services
        </h2>

        {/* Accordion List Wrapper - Clean horizontal lines matching mockup */}
        <div className="flex flex-col">
          {Object.keys(servicesData).map((key) => {
            const isExpanded = activeSection === key;
            const section = servicesData[key];

            return (
              <div key={key} className="w-full">
                
                {/* Accordion Trigger Header (All in cyan text #00b4d8 matching mockup) */}
                <button
                  type="button"
                  onClick={() => toggleSection(key)}
                  className="w-full flex justify-between items-center text-left py-2.5 focus:outline-none group"
                >
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#00b4d8] hover:text-[#0083b0] transition-colors duration-300">
                    {section.title}
                  </h3>
                  
                  {/* Chevron Toggle Icon */}
                  <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} text-[#00b4d8]`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>

                {/* Accordion Expandable Content (Grid of route links) */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-[500px] opacity-100 mt-2 mb-4' : 'max-h-0 opacity-0'
                }`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-8 pl-4 py-2">
                    {section.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={`https://wa.me/919623324139?text=${encodeURIComponent(link.whatsappText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm sm:text-base font-semibold text-slate-700 hover:text-[#ea580c] transition-colors duration-200"
                      >
                        {/* Cyan right angle icon > matching mockup */}
                        <svg className="w-3.5 h-3.5 text-[#00b4d8] flex-shrink-0 mr-1" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                        <span>{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Separator Divider Line matching mockup */}
                <div className="border-t border-slate-200 w-full" />

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
