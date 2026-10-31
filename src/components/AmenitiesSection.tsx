"use client";

import React from "react";

export const AmenitiesSection: React.FC = () => {
  const amenities = [
    {
      title: "High-Speed Wi-Fi",
      desc: "Dual-band fiber connectivity across bedrooms, study stations, and communal areas with uninterrupted bandwidth.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
    },
    {
      title: "Dedicated Study Space",
      desc: "Ergonomic desk in every room with focused warm under-shelf LED strip lighting and multi-socket charging ports.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "4 Wholesome Meals",
      desc: "Nutritionist-curated breakfast, lunch, evening snacks & tea, and dinner prepared fresh daily in our hygienic kitchen.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693l-1.57-.393m15.6 0l1.242 4.968A1.5 1.5 0 0119.586 22H4.414a1.5 1.5 0 01-1.456-1.732l1.242-4.968" />
        </svg>
      ),
    },
    {
      title: "Daily Housekeeping",
      desc: "Scheduled daily room sweeps, waste clearance, and periodic deep bathroom sanitization by trained staff.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "In-House Laundry",
      desc: "Heavy-duty commercial washing and ironing facility with timely garment turnaround for students.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Biometric & Security",
      desc: "24/7 security personnel, biometric door access, resident wardens, and continuous CCTV surveillance in common zones.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: "100% Power Backup",
      desc: "Dual industrial diesel generators guaranteeing uninterrupted electricity for fans, lights, Wi-Fi, and elevators.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "RO Drinking Water",
      desc: "Multi-stage commercial reverse-osmosis purifiers with water chillers and dispensers on every accommodation floor.",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="amenities"
      className="relative z-10 w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 bg-[#FAF9F5] border-t border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16" data-reveal>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-0.5 w-4 bg-gold rounded-full" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-deep font-semibold">
              EVERYDAY CONVENIENCES
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#0A1128] leading-tight">
            Everything You Need.
            <br />
            Nothing You Don&apos;t.
          </h2>
          <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed mt-4">
            Designed for convenience so you can dedicate your full energy to your university degree.
          </p>
        </div>

        {/* 8-Card Amenities Grid: two compact columns on phones so it isn't eight screens long */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6" data-reveal-stagger>
          {amenities.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-gold/60 transition-all duration-300 flex flex-col justify-start"
            >
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-3 sm:mb-5 shrink-0">
                {item.icon}
              </div>
              <h3 className="text-sm sm:text-[17px] font-bold text-[#0A1128] tracking-tight leading-snug">
                {item.title}
              </h3>
              <p className="text-[11.5px] sm:text-[13px] text-[#64748B] font-normal mt-1.5 sm:mt-2.5 leading-relaxed line-clamp-4 sm:line-clamp-none">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
