"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ROOM_TIERS } from "@/lib/contact-config";

interface AccommodationSectionProps {
  onOpenBooking?: (roomType?: string) => void;
  onOpenCompare?: () => void;
}

export const AccommodationSection: React.FC<AccommodationSectionProps> = () => {
  const twoSeater = ROOM_TIERS[0];
  const threeSeater = ROOM_TIERS[1];

  return (
    <section
      id="room"
      data-alias="suites"
      className="relative z-10 w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 bg-[#FAF9F5] border-t border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Title on Left, Compare Button on Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6" data-reveal>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-0.5 w-4 bg-gold rounded-full" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-deep font-semibold">
                ACCOMMODATION
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A1128]">
              Find Your Space.
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-[#475569] font-normal leading-relaxed mt-4">
              Thoughtfully furnished student suites engineered for focused study,
              sound sleep, and generous personal storage. Transparent fees per college session.
            </p>
          </div>

          <Link
            href="/room#comparison"
            className="self-start md:self-end flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-700 hover:border-slate-900 text-slate-800 hover:text-black text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
          >
            Compare All Rooms
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Two Large Room Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10" data-reveal-stagger>
          {/* Card 1: 2-Seater Room */}
          <div
            id="homepage-2-seater"
            className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-72 sm:h-84 w-full overflow-hidden bg-slate-100">
              <Image
                src={twoSeater.image}
                alt="2-Seater Room at ZOD Living with wooden beds and study desk"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority={false}
              />

              {/* Occupancy Badge (Top Left) */}
              <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-mono tracking-widest uppercase text-white font-semibold">
                {twoSeater.occupancyLabel}
              </span>

              {/* Price Pill (Bottom Right) */}
              <div className="absolute bottom-4 right-4 px-3.5 py-1.5 bg-slate-900/90 backdrop-blur-md rounded-full text-xs font-semibold text-white shadow-md">
                From <span className="text-gold font-bold">{twoSeater.basePrice}</span>{" "}
                <span className="text-[10px] text-slate-300 font-normal">/ session</span>
              </div>
            </div>

            <div className="p-8 sm:p-10 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl sm:text-[26px] font-bold text-[#0A1128] tracking-tight">
                    {twoSeater.name}
                  </h3>
                  <span className="px-2.5 py-1 bg-gold/10 text-gold-deep border border-gold/30 rounded-full text-[11px] font-mono font-semibold">
                    AC & Non-AC
                  </span>
                </div>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  {twoSeater.description}
                </p>

                {/* Session Pricing Tier Breakdown */}
                <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Non-AC Session Fee</span>
                    <span className="text-sm font-bold text-[#0A1128]">{twoSeater.nonAcPrice}</span>
                  </div>
                  <div className="border-l border-slate-200 pl-3">
                    <span className="text-gold-deep block text-[10px] uppercase font-semibold">AC Session Fee</span>
                    <span className="text-sm font-bold text-gold-deep">{twoSeater.acPrice}</span>
                  </div>
                </div>

                {/* 4 Key Specs with Icons */}
                <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 mt-6 pt-6 border-t border-slate-100 text-xs sm:text-sm text-[#1E293B]">
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-gold-deep shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 10h18M3 14h18m-9-4v8m-9 0h18M3 6v12m18-12v12" />
                    </svg>
                    <span>2 Single Wooden Beds</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-gold-deep shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Dual Study Desks + Lamps</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-gold-deep shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14v8zM12 2v4m-4-2h8" />
                    </svg>
                    <span>Attached Western Bath</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-gold-deep shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7v10M16 7v10M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
                    </svg>
                    <span>Keyed Personal Wardrobes</span>
                  </div>
                </div>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {twoSeater.amenityChips.map((chip, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-100/80 rounded-full text-[11px] font-mono text-slate-600 tracking-wide"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button: Opens /room#2-seater directly */}
              <div className="mt-8 pt-4">
                <Link
                  href="/room#2-seater"
                  className="block w-full py-3.5 rounded-full bg-gold hover:bg-gold-light text-slate-900 font-semibold text-xs font-mono uppercase tracking-widest transition-all duration-200 shadow-md hover:shadow-lg text-center"
                >
                  Explore 2-Seater Details & Photos →
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: 3-Seater Room */}
          <div
            id="homepage-3-seater"
            className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-72 sm:h-84 w-full overflow-hidden bg-slate-100">
              <Image
                src={threeSeater.image}
                alt="3-Seater Room at ZOD Living with study desks and storage"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority={false}
              />

              {/* Occupancy Badge (Top Left) */}
              <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-mono tracking-widest uppercase text-white font-semibold">
                {threeSeater.occupancyLabel}
              </span>

              {/* Price Pill (Bottom Right) */}
              <div className="absolute bottom-4 right-4 px-3.5 py-1.5 bg-slate-900/90 backdrop-blur-md rounded-full text-xs font-semibold text-white shadow-md">
                From <span className="text-gold font-bold">{threeSeater.basePrice}</span>{" "}
                <span className="text-[10px] text-slate-300 font-normal">/ session</span>
              </div>
            </div>

            <div className="p-8 sm:p-10 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl sm:text-[26px] font-bold text-[#0A1128] tracking-tight">
                    {threeSeater.name}
                  </h3>
                  <span className="px-2.5 py-1 bg-gold/10 text-gold-deep border border-gold/30 rounded-full text-[11px] font-mono font-semibold">
                    AC & Non-AC
                  </span>
                </div>
                <p className="text-sm text-[#475569] mt-3 leading-relaxed">
                  {threeSeater.description}
                </p>

                {/* Session Pricing Tier Breakdown */}
                <div className="mt-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Non-AC Session Fee</span>
                    <span className="text-sm font-bold text-[#0A1128]">{threeSeater.nonAcPrice}</span>
                  </div>
                  <div className="border-l border-slate-200 pl-3">
                    <span className="text-gold-deep block text-[10px] uppercase font-semibold">AC Session Fee</span>
                    <span className="text-sm font-bold text-gold-deep">{threeSeater.acPrice}</span>
                  </div>
                </div>

                {/* 4 Key Specs with Icons */}
                <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 mt-6 pt-6 border-t border-slate-100 text-xs sm:text-sm text-[#1E293B]">
                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-gold-deep shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 10h18M3 14h18m-9-4v8m-9 0h18M3 6v12m18-12v12" />
                    </svg>
                    <span>3 Single Wooden Beds</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-gold-deep shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Triple Study Stations</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-gold-deep shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14v8zM12 2v4m-4-2h8" />
                    </svg>
                    <span>Attached Western Bath</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-gold-deep shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7v10M16 7v10M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
                    </svg>
                    <span>Triple Lockable Storage</span>
                  </div>
                </div>

                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {threeSeater.amenityChips.map((chip, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-100/80 rounded-full text-[11px] font-mono text-slate-600 tracking-wide"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button: Opens /room#3-seater directly */}
              <div className="mt-8 pt-4">
                <Link
                  href="/room#3-seater"
                  className="block w-full py-3.5 rounded-full bg-gold hover:bg-gold-light text-slate-900 font-semibold text-xs font-mono uppercase tracking-widest transition-all duration-200 shadow-md hover:shadow-lg text-center"
                >
                  Explore 3-Seater Details & Photos →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccommodationSection;
