"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FooterCTASection } from "@/components/FooterCTASection";

interface LifestylePhoto {
  src: string;
  alt: string;
  title: string;
  category: "rooms" | "study" | "living" | "dining";
  caption: string;
  badge: string;
}

export default function LifeAtZodPage() {
  const [selectedImage, setSelectedImage] = useState<LifestylePhoto | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const photos: LifestylePhoto[] = [
    {
      src: "/resourcezod/2-seater-primary.jpeg",
      alt: "2-Seater Suite with teal geometric accent wall and wooden beds",
      title: "The Executive 2-Seater Suite",
      category: "rooms",
      caption: "Two wooden single beds, split AC, study workstations, and geometric feature wall.",
      badge: "The Rooms",
    },
    {
      src: "/resourcezod/3-seater-primary.jpeg",
      alt: "3-Seater Room with triple focus study desks and cantilever chairs",
      title: "The Collaborative 3-Seater Suite",
      category: "rooms",
      caption: "Triple focus workstations with warm under-shelf LED strip lighting and independent wardrobes.",
      badge: "The Rooms",
    },
    {
      src: "/resourcezod/2-seater-lifestyle.jpeg",
      alt: "Student bedroom living perspective with laptop on study desk",
      title: "Real Student Study Routine",
      category: "rooms",
      caption: "Spacious individual desks allowing students to work comfortably on laptops and coursework.",
      badge: "The Rooms",
    },
    {
      src: "/resourcezod/washroom.jpeg",
      alt: "Attached ensuite washroom with western commode, washbasin, and shower",
      title: "Attached Ensuite Western Washroom",
      category: "rooms",
      caption: "Private tiled ensuite bathroom in every room with mirror, washbasin, exhaust fan, and shower.",
      badge: "The Rooms",
    },
    {
      src: "/resourcezod/2-seater-desk.jpeg",
      alt: "Ergonomic study desk with overhead shelving and warm task lighting",
      title: "Focused Study Workstations",
      category: "study",
      caption: "Built-in wooden bookshelves, warm task lighting, and keyed wardrobes beside each desk.",
      badge: "Spaces to Study",
    },
    {
      src: "/resourcezod/executive-lounge.jpeg",
      alt: "Executive meeting lounge with fluted walls and leather conference seating",
      title: "Executive Conference & Meeting Lounge",
      category: "study",
      caption: "Professional environment for parent meetings, group study, and focused discussions.",
      badge: "Spaces to Study",
    },
    {
      src: "/resourcezod/building-exterior.jpeg",
      alt: "ZOD Living building exterior with balconies, AC units, and golden signage",
      title: "Building Exterior & Facade",
      category: "living",
      caption: "Modern residential building in Knowledge Park 3 with private balconies and glowing ZOD emblem.",
      badge: "Everyday Living",
    },
    {
      src: "/resourcezod/lobby-reception.jpeg",
      alt: "Lobby and reception with elevator, wood slatted accent wall, and 3D ZOD logo",
      title: "Reception & Elevator Lobby",
      category: "living",
      caption: "Modern arrival lounge featuring slatted wood paneling, elevator access, and reception desk.",
      badge: "Everyday Living",
    },
    {
      src: "/resourcezod/corridor-1.jpeg",
      alt: "Residential corridor with room door 206 and polished floor tiles",
      title: "Residential Hallways & Security",
      category: "living",
      caption: "Well-illuminated, CCTV-monitored residential corridors with polished tiles and solid wooden doors.",
      badge: "Everyday Living",
    },
    {
      src: "/resourcezod/corridor-2.jpeg",
      alt: "Long clean residential hallway with ceiling grid lights",
      title: "Quiet Living Floors",
      category: "living",
      caption: "Clean, acoustic-insulated floor corridors designed for minimal noise transfer.",
      badge: "Everyday Living",
    },
    {
      src: "/resourcezod/dining-mess.jpeg",
      alt: "Air-conditioned dining mess hall with group dining tables and chairs",
      title: "Air-Conditioned Dining Mess",
      category: "dining",
      caption: "Where students gather for 4 fresh meals daily in a clean, air-conditioned communal hall.",
      badge: "Dining & Recreation",
    },
    {
      src: "/resourcezod/table-tennis.jpeg",
      alt: "Table tennis room with tournament table, net, and paddle",
      title: "Table Tennis Recreation Room",
      category: "dining",
      caption: "Active recreational space with tournament-grade table tennis for downtime with friends.",
      badge: "Dining & Recreation",
    },
  ];

  const filteredPhotos =
    activeTab === "all" ? photos : photos.filter((p) => p.category === activeTab);

  return (
    <div className="relative min-h-screen w-full bg-[#FAF9F5] text-slate-900">
      {/* 1. Shared Transparent Header */}
      <Header />

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-6 sm:px-12 lg:px-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-0.5 w-5 bg-gold rounded-full" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-deep font-semibold">
                  COMMUNITY & LIFESTYLE
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A1128] leading-[1.1]">
                More Than a Place to Stay.
              </h1>

              <p className="text-base sm:text-lg text-[#475569] font-normal leading-relaxed mt-6 max-w-2xl">
                Discover the spaces, routines, and shared experiences that make
                everyday student living at ZOD different. Authentic photographs
                of our rooms, study spaces, dining hall, and community.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#gallery-grid"
                  className="px-7 py-3.5 rounded-full bg-gold hover:bg-gold-light text-slate-950 font-semibold text-xs font-mono uppercase tracking-widest transition-all shadow-md"
                >
                  Explore Showcase Gallery ↓
                </a>
                <Link
                  href="/contact"
                  className="px-7 py-3.5 rounded-full border border-slate-700 hover:border-slate-900 text-slate-800 hover:text-black font-semibold text-xs font-mono uppercase tracking-widest transition-all"
                >
                  Schedule an In-Person Tour →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-96 lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
                <Image
                  src="/resourcezod/building-exterior.jpeg"
                  alt="ZOD Living Building Exterior with illuminated signage"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/70 backdrop-blur-md text-white border border-white/10">
                  <span className="text-xs font-mono tracking-wider text-gold uppercase font-semibold block">
                    Knowledge Park 3, Greater Noida
                  </span>
                  <p className="text-sm font-light text-slate-200 mt-1">
                    Walking distance to major educational campuses & metro transit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Editorial Photo Gallery with 4 Thematic Categories */}
      <section id="gallery-grid" className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto scroll-mt-24">
        {/* Gallery Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {[
            { id: "all", label: "Full Showcase (12)" },
            { id: "rooms", label: "The Rooms" },
            { id: "study", label: "Spaces to Study" },
            { id: "living", label: "Everyday Living" },
            { id: "dining", label: "Dining & Recreation" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#0A1128] text-white shadow-md font-semibold"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" data-reveal-stagger>
          {filteredPhotos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(photo)}
              className="group rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative h-64 sm:h-72 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono tracking-widest uppercase font-semibold">
                  {photo.badge}
                </span>
                <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-white/90 text-slate-900 text-xs font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity shadow">
                  Expand Photo ↗
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0A1128] tracking-tight group-hover:text-gold-deep transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Authentic Photograph</span>
                  <span className="text-gold-deep">ZOD Living</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Pre-Footer Call to Action */}
        <div className="mt-20 sm:mt-28 p-7 sm:p-14 rounded-3xl bg-white border border-slate-200 shadow-sm text-center max-w-4xl mx-auto" data-reveal>
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-deep font-semibold">
            IN-PERSON EXPERIENCE
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold text-[#0A1128] mt-2">
            See It for Yourself.
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-3 leading-relaxed">
            Photographs tell part of the story. Walk through our student suites,
            meet our wardens, test the Wi-Fi, and check the dining mess in person.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-light text-slate-950 font-semibold text-xs font-mono uppercase tracking-widest transition-all shadow-md"
            >
              Schedule a Visit →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
        >
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-[640px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md text-white border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{selectedImage.title}</p>
                <p className="text-xs text-slate-300 font-mono mt-0.5">{selectedImage.caption}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs font-mono"
              >
                Close ✕
              </button>
            </div>
          </div>
          <button
            onClick={() => setSelectedImage(null)}
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
