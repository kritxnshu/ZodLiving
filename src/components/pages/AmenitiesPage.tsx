"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FooterCTASection } from "@/components/FooterCTASection";
import { VERIFIED_AMENITIES } from "@/lib/contact-config";

export default function AmenitiesPage() {
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  // Facility category tabs
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Amenities (12)" },
    { id: "Living Spaces", label: "Living & Rooms" },
    { id: "Dining & Nutrition", label: "Dining" },
    { id: "Housekeeping", label: "Laundry & Care" },
    { id: "Safety", label: "Safety & Power" },
    { id: "Recreation", label: "Recreation & Tech" },
  ];

  const filteredAmenities =
    activeCategory === "all"
      ? VERIFIED_AMENITIES
      : VERIFIED_AMENITIES.filter((a) => a.category.includes(activeCategory));

  return (
    <div className="relative min-h-screen w-full bg-[#FAF9F5] text-slate-900">
      {/* 1. Shared Transparent Header */}
      <Header />

      {/* 2. Amenities Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-6 sm:px-12 lg:px-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-0.5 w-5 bg-gold rounded-full" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-deep font-semibold">
                  RESIDENCE FACILITIES
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A1128] leading-[1.1]">
                Everything You Need for Everyday Living.
              </h1>

              <p className="text-base sm:text-lg text-[#475569] font-normal leading-relaxed mt-6 max-w-2xl">
                A thoughtfully equipped student residence designed around comfort,
                convenience, security, and study. 12 essential facilities verified
                from the official ZOD Living brochure.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#all-amenities"
                  className="px-7 py-3.5 rounded-full bg-gold hover:bg-gold-light text-slate-950 font-semibold text-xs font-mono uppercase tracking-widest transition-all shadow-md"
                >
                  View All Facilities ↓
                </a>
                <Link
                  href="/room"
                  className="px-7 py-3.5 rounded-full border border-slate-700 hover:border-slate-900 text-slate-800 hover:text-black font-semibold text-xs font-mono uppercase tracking-widest transition-all"
                >
                  Explore Rooms & Fees →
                </Link>
              </div>

              {/* Verified Badge */}
              <div className="mt-8 flex items-center gap-3 text-xs font-mono text-slate-600 bg-white border border-slate-200/80 px-4 py-2.5 rounded-xl w-fit shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>12 Confirmed Property Facilities • No Unverified Claims</span>
              </div>
            </div>

            {/* Right Asymmetric Collage */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-sm">
                <Image
                  src="/resourcezod/dining-mess.jpeg"
                  alt="Air-Conditioned Dining Mess"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                  AC Dining Mess
                </span>
              </div>

              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-sm">
                <Image
                  src="/resourcezod/lobby-reception.jpeg"
                  alt="ZOD Living Reception Lobby"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                  Lobby & Elevator
                </span>
              </div>

              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-sm">
                <Image
                  src="/resourcezod/2-seater-desk.jpeg"
                  alt="Ergonomic Study Desks"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                  Study Workstations
                </span>
              </div>

              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-sm">
                <Image
                  src="/resourcezod/table-tennis.jpeg"
                  alt="Table Tennis Recreation Room"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                  Table Tennis
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 12 Brochure Amenities Grid */}
      <section id="all-amenities" className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto scroll-mt-24">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#0A1128] text-white shadow-md font-semibold"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of Amenity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" data-reveal-stagger>
          {filteredAmenities.map((amenity, idx) => (
            <div
              key={amenity.id}
              className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Real & AI Photo Header */}
              {amenity.image ? (
                <div
                  onClick={() =>
                    setSelectedLightboxImage({
                      src: amenity.image!,
                      alt: amenity.title,
                      title: amenity.title,
                    })
                  }
                  data-cursor="view"
                  className="relative h-48 w-full bg-slate-100 overflow-hidden cursor-pointer group"
                >
                  <Image
                    src={amenity.image}
                    alt={amenity.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-mono tracking-wide font-semibold backdrop-blur-md">
                    {amenity.badge}
                  </span>
                  <span className="absolute bottom-3 left-3 text-white text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    View photo ↗
                  </span>
                </div>
              ) : null}

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono tracking-widest text-gold-deep uppercase font-semibold">
                    0{idx + 1} • {amenity.category}
                  </div>
                  <h3 className="text-xl font-bold text-[#0A1128] mt-2 tracking-tight">
                    {amenity.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">
                    {amenity.fullDesc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Dining Spotlight Section */}
        <div className="mt-20 sm:mt-28 p-6 sm:p-14 rounded-3xl bg-white border border-slate-200 shadow-sm" data-reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src="/resourcezod/dining-mess.jpeg"
                alt="Dining Hall at ZOD Living"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-6">
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-deep font-semibold">
                NUTRITION & HYGIENE
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#0A1128] mt-2">
                4 Wholesome Meals Every Day in Air-Conditioned Comfort.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed font-normal">
                Studying for higher education in Greater Noida requires nutritious,
                balanced food. Our in-house kitchen prepares breakfast, lunch, evening
                snacks with tea, and fresh dinner daily.
              </p>
              <ul className="mt-6 space-y-2 text-xs sm:text-sm text-slate-700 font-mono">
                <li className="flex items-center gap-2">
                  <span className="text-gold-deep">✓</span> Fully Air-Conditioned Student Dining Mess
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-deep">✓</span> 4 Fresh & Hygienic Meals Daily
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-deep">✓</span> Hot Tea & Coffee Vending Machine
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-deep">✓</span> Table Tennis Recreation Room nearby
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Lightbox Modal */}
      {selectedLightboxImage && (
        <div
          onClick={() => setSelectedLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
        >
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-[640px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedLightboxImage.src}
              alt={selectedLightboxImage.alt}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md text-white border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{selectedLightboxImage.title}</p>
                <p className="text-xs text-slate-300 font-mono mt-0.5">{selectedLightboxImage.alt}</p>
              </div>
              <button
                onClick={() => setSelectedLightboxImage(null)}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs font-mono"
              >
                Close ✕
              </button>
            </div>
          </div>
          <button
            onClick={() => setSelectedLightboxImage(null)}
            className="absolute top-6 right-6 text-white text-3xl font-light hover:text-gold-deep"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
      )}

      {/* 6. Shared Footer */}
      <FooterCTASection />
    </div>
  );
}
