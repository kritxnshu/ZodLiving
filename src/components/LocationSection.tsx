"use client";

import React from "react";
import { PROPERTY_CONFIG } from "@/lib/contact-config";

export const LocationSection: React.FC = () => {
  const destinations = [
    {
      name: "GL Bajaj Institute",
      time: "~ 5 MINS",
      desc: "Direct walk or quick auto-rickshaw connection from property.",
    },
    {
      name: "Galgotias University",
      time: "~ 8 MINS",
      desc: "Frequent student shuttles and direct transit connectivity.",
    },
    {
      name: "Sharda University",
      time: "~ 10 MINS",
      desc: "Conveniently accessible via Knowledge Park main arterial road.",
    },
    {
      name: "Knowledge Park II Metro",
      time: "~ 6 MINS",
      desc: "Aqua Line metro linking directly to Noida, Delhi, and botanical gardens.",
    },
    {
      name: "Bennett University",
      time: "~ 15 MINS",
      desc: "Smooth commute via express highway and campus shared cabs.",
    },
    {
      name: "Pharmacies & Marts",
      time: "~ 2 MINS WALK",
      desc: "Convenience stores, ATM, photocopy centers, and cafes immediately nearby.",
    },
  ];

  return (
    <section
      id="location"
      className="relative z-10 w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 bg-[#FAF9F5] border-t border-neutral-200/80"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px)
        `,
        backgroundSize: "44px 44px",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-0.5 w-4 bg-[#D97706] rounded-full" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#D97706] font-semibold">
              STRATEGIC PROXIMITY
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#0A1128] leading-tight">
            Close to Campus.
            <br />
            Connected to Everything.
          </h2>
          <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed mt-4">
            Situated in Knowledge Park, Greater Noida, ZOD LIVING sits within easy reach of top
            universities, metro stations, and student essentials.
          </p>
        </div>

        {/* 6 Cards Grid matching reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-base sm:text-[17px] font-bold text-[#0A1128]">
                    {item.name}
                  </h3>
                  <span className="shrink-0 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200/70 rounded-full text-[11px] font-mono font-semibold tracking-wide">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#64748B] font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Hostel Location & Contact Info Banner */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono font-semibold tracking-wider text-emerald-800 uppercase">
                  Verified Hostel Location • Open 24 Hours
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0A1128]">
                Visit ZOD Living in Person
              </h3>
              <p className="text-sm text-slate-700 font-medium mt-2 leading-relaxed max-w-2xl">
                {PROPERTY_CONFIG.fullAddress}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-slate-600">
                <span>
                  <strong className="text-slate-800">Phone:</strong>{" "}
                  <a
                    href={`tel:${PROPERTY_CONFIG.phoneRaw}`}
                    className="text-amber-700 font-bold hover:underline"
                  >
                    {PROPERTY_CONFIG.phone}
                  </a>
                </span>
                <span>
                  <strong className="text-slate-800">Email:</strong>{" "}
                  <a
                    href={`mailto:${PROPERTY_CONFIG.email}`}
                    className="text-slate-700 hover:text-amber-700 hover:underline"
                  >
                    {PROPERTY_CONFIG.email}
                  </a>
                </span>
                <span>
                  <strong className="text-slate-800">Instagram:</strong>{" "}
                  <a
                    href={PROPERTY_CONFIG.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 font-bold hover:underline"
                  >
                    {PROPERTY_CONFIG.instagram.handle}
                  </a>
                </span>
                <span>
                  <strong className="text-slate-800">Facebook:</strong>{" "}
                  <a
                    href={PROPERTY_CONFIG.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold hover:underline"
                  >
                    {PROPERTY_CONFIG.facebook.name}
                  </a>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href={PROPERTY_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-md text-center"
              >
                <span>Get Google Maps Directions ↗</span>
              </a>

              <a
                href={`https://wa.me/${PROPERTY_CONFIG.whatsappRaw}?text=${encodeURIComponent("Hi ZOD Living, I am planning a visit to the hostel and would like to know the best time to come.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-mono uppercase tracking-wider font-semibold transition-all text-center"
              >
                <span>WhatsApp Admissions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

