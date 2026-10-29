"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FooterCTASection } from "@/components/FooterCTASection";
import { ROOM_TIERS } from "@/lib/contact-config";

export default function RoomPage() {
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  const twoSeater = ROOM_TIERS[0];
  const threeSeater = ROOM_TIERS[1];

  const galleryImages = [
    {
      src: "/resourcezod/2-seater-primary.jpeg",
      alt: "2-Seater Premium Ensuite Bedroom with teal geometric accent wall and wooden beds",
      title: "2-Seater Suite — Master Overview",
      tag: "2-Seater Room",
    },
    {
      src: "/resourcezod/2-seater-desk.jpeg",
      alt: "2-Seater Study Desk with warm under-shelf LED lighting and lockable wardrobes",
      title: "Dual Study Stations & Keyed Wardrobes",
      tag: "Study Space",
    },
    {
      src: "/resourcezod/3-seater-primary.jpeg",
      alt: "3-Seater Room with triple focus study desks and cantilever chairs",
      title: "3-Seater Focus Study Stations",
      tag: "3-Seater Room",
    },
    {
      src: "/resourcezod/2-seater-lifestyle.jpeg",
      alt: "Student room living perspective with study desk and ambient light",
      title: "Student Living Perspective",
      tag: "Living Space",
    },
    {
      src: "/resourcezod/washroom.jpeg",
      alt: "Attached ensuite washroom with western commode, washbasin, and shower",
      title: "Attached Ensuite Western Washroom",
      tag: "Ensuite Bath",
    },
    {
      src: "/resourcezod/corridor-1.jpeg",
      alt: "Well-lit residential corridor with room door 206",
      title: "Residential Corridor (Door 206)",
      tag: "Corridor",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#FAF9F5] text-slate-900">
      {/* 1. Shared Transparent Header */}
      <Header />

      {/* 2. Room Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-6 sm:px-12 lg:px-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-0.5 w-5 bg-[#D97706] rounded-full" />
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#D97706] font-semibold">
                  ACCOMMODATION & FEES
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A1128] leading-[1.1]">
                Find Your Space at ZOD.
              </h1>

              <p className="text-base sm:text-lg text-[#475569] font-normal leading-relaxed mt-6 max-w-2xl">
                Thoughtfully designed student accommodation with furnished rooms,
                dedicated study spaces, everyday comforts, and options to suit
                your budget.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#rooms-overview"
                  className="px-7 py-3.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-semibold text-xs font-mono uppercase tracking-widest transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Explore Rooms ↓
                </a>
                <Link
                  href="/contact"
                  className="px-7 py-3.5 rounded-full border border-slate-700 hover:border-slate-900 text-slate-800 hover:text-black font-semibold text-xs font-mono uppercase tracking-widest transition-all duration-200"
                >
                  Schedule a Visit →
                </Link>
                <a
                  href="#comparison"
                  className="text-xs font-mono text-slate-600 hover:text-[#D97706] underline ml-2 py-2"
                >
                  View Comparison Table
                </a>
              </div>

              {/* Price Guarantee Callout */}
              <div className="mt-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 max-w-xl flex items-start gap-3">
                <span className="text-[#D97706] text-lg font-bold">ℹ</span>
                <p className="text-xs text-amber-900/90 leading-relaxed font-mono">
                  <strong>Fee Structure Notice:</strong> All fees are stated per
                  college session as established in the official ZOD Living
                  brochure. No hidden monthly conversion charges.
                </p>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-96 lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100">
                <Image
                  src="/resourcezod/2-seater-primary.jpeg"
                  alt="ZOD Living 2-Seater Student Suite"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/70 backdrop-blur-md text-white border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono tracking-wider text-[#F59E0B] uppercase font-semibold">
                      Featured Residence
                    </span>
                    <span className="text-xs font-mono bg-white/20 px-2 py-0.5 rounded-full">
                      Knowledge Park 3
                    </span>
                  </div>
                  <p className="text-sm font-light text-slate-200 mt-1">
                    Attached ensuite washroom & private study stations in every room.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Room Options & Pricing Detail */}
      <section id="rooms-overview" className="py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-0.5 w-5 bg-[#D97706] rounded-full" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#D97706] font-semibold">
              OPTIONS & PRICING
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A1128]">
            Two Curated Room Formats.
          </h2>
          <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed mt-4">
            Available in both Air-Conditioned (AC) and Non-AC configurations,
            fully furnished with attached private washrooms.
          </p>
        </div>

        {/* Room 1: 2-Seater Room */}
        <div
          id="2-seater"
          className="mb-20 rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden scroll-mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Left (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[480px] bg-slate-100">
              <Image
                src={twoSeater.image}
                alt="2-Seater Room with wooden beds and study desk"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <span className="absolute top-5 left-5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-mono tracking-widest uppercase text-white font-semibold">
                {twoSeater.occupancyLabel}
              </span>
              <button
                onClick={() =>
                  setSelectedLightboxImage({
                    src: twoSeater.image,
                    alt: "2-Seater Suite Master Overview",
                    title: "2-Seater Suite — Master View",
                  })
                }
                className="absolute bottom-5 right-5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-mono font-semibold shadow hover:bg-white"
              >
                Expand Photo ↗
              </button>
            </div>

            {/* Content Right (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0A1128] tracking-tight">
                    {twoSeater.name}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-semibold">
                    Ensuite Western Bath Included
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#475569] mt-3 leading-relaxed">
                  {twoSeater.description}
                </p>

                {/* Exact Fees per College Session */}
                <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-3">
                    Official Fee Schedule (Per College Session)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-slate-600 uppercase">
                          2-Seater Non-AC
                        </span>
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          Session
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-[#0A1128] mt-2">
                        {twoSeater.nonAcPrice}
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                        Per college session
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/90 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-amber-900 uppercase">
                          2-Seater AC
                        </span>
                        <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">
                          Climate Controlled
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-[#D97706] mt-2">
                        {twoSeater.acPrice}
                      </div>
                      <span className="text-[11px] text-amber-800/80 font-mono mt-0.5 block">
                        Per college session
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Inclusions List */}
                <div className="mt-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold mb-3">
                    Included Amenities & Specifications
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 font-normal">
                    {twoSeater.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#D97706] font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact?room=2-seater-ac"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-semibold text-xs font-mono uppercase tracking-widest transition-all shadow-md text-center"
                >
                  Enquire for 2-Seater →
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-slate-300 text-slate-700 hover:text-black hover:border-slate-800 font-semibold text-xs font-mono uppercase tracking-widest text-center"
                >
                  Schedule Tour
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Room 2: 3-Seater Room */}
        <div
          id="3-seater"
          className="mb-20 rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden scroll-mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Left (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[480px] bg-slate-100">
              <Image
                src={threeSeater.image}
                alt="3-Seater Room with triple study stations and beds"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <span className="absolute top-5 left-5 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-mono tracking-widest uppercase text-white font-semibold">
                {threeSeater.occupancyLabel}
              </span>
              <button
                onClick={() =>
                  setSelectedLightboxImage({
                    src: threeSeater.image,
                    alt: "3-Seater Room Triple Study Desks",
                    title: "3-Seater Room — Study Pods & Beds",
                  })
                }
                className="absolute bottom-5 right-5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-mono font-semibold shadow hover:bg-white"
              >
                Expand Photo ↗
              </button>
            </div>

            {/* Content Right (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0A1128] tracking-tight">
                    {threeSeater.name}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-semibold">
                    Ensuite Western Bath Included
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#475569] mt-3 leading-relaxed">
                  {threeSeater.description}
                </p>

                {/* Exact Fees per College Session */}
                <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-3">
                    Official Fee Schedule (Per College Session)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-slate-600 uppercase">
                          3-Seater Non-AC
                        </span>
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          Session
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-[#0A1128] mt-2">
                        {threeSeater.nonAcPrice}
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                        Per college session
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/90 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-amber-900 uppercase">
                          3-Seater AC
                        </span>
                        <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">
                          Climate Controlled
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-[#D97706] mt-2">
                        {threeSeater.acPrice}
                      </div>
                      <span className="text-[11px] text-amber-800/80 font-mono mt-0.5 block">
                        Per college session
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Inclusions List */}
                <div className="mt-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-semibold mb-3">
                    Included Amenities & Specifications
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 font-normal">
                    {threeSeater.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#D97706] font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact?room=3-seater-ac"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-semibold text-xs font-mono uppercase tracking-widest transition-all shadow-md text-center"
                >
                  Enquire for 3-Seater →
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-slate-300 text-slate-700 hover:text-black hover:border-slate-800 font-semibold text-xs font-mono uppercase tracking-widest text-center"
                >
                  Schedule Tour
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Editorial Photographic Showcase Grid */}
        <div className="mt-28 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#D97706] font-semibold">
              GENUINE ROOM PHOTOGRAPHS
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1128] mt-2">
              Inside ZOD Living Residences
            </h3>
            <p className="text-sm text-[#475569] mt-2">
              Actual unedited photographs of our student rooms, study workstations,
              attached washrooms, and residential corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedLightboxImage(img)}
                className="group relative h-72 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono tracking-wider uppercase font-semibold">
                    {img.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-semibold tracking-tight">
                    {img.title}
                  </p>
                  <span className="text-[11px] text-[#F59E0B] font-mono tracking-wide mt-1 block">
                    Click to enlarge ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Complete Room Comparison Table */}
        <div id="comparison" className="pt-10 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#D97706] font-semibold">
              SPECIFICATION MATRIX
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1128] mt-2">
              Compare All Four Configurations
            </h3>
            <p className="text-sm text-[#475569] mt-2">
              All prices are per college session. Check the exact facilities
              provided with each tier.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-900 font-mono font-bold">
                  <th className="py-4 px-6">Specification</th>
                  <th className="py-4 px-4 text-[#D97706]">2-Seater AC</th>
                  <th className="py-4 px-4 text-slate-800">2-Seater Non-AC</th>
                  <th className="py-4 px-4 text-[#D97706]">3-Seater AC</th>
                  <th className="py-4 px-4 text-slate-800">3-Seater Non-AC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
                <tr className="bg-amber-50/30 font-semibold">
                  <td className="py-4 px-6 text-slate-900">Price per College Session</td>
                  <td className="py-4 px-4 text-lg font-bold text-[#D97706]">₹1,65,000</td>
                  <td className="py-4 px-4 text-lg font-bold text-[#0A1128]">₹1,50,000</td>
                  <td className="py-4 px-4 text-lg font-bold text-[#D97706]">₹1,50,000</td>
                  <td className="py-4 px-4 text-lg font-bold text-[#0A1128]">₹1,35,000</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-slate-900">Student Occupancy</td>
                  <td className="py-3.5 px-4">2 Students</td>
                  <td className="py-3.5 px-4">2 Students</td>
                  <td className="py-3.5 px-4">3 Students</td>
                  <td className="py-3.5 px-4">3 Students</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-3.5 px-6 font-medium text-slate-900">Air Conditioning</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">Split AC Included</td>
                  <td className="py-3.5 px-4 text-slate-500">Non-AC (Ceiling Fan)</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">Split AC Included</td>
                  <td className="py-3.5 px-4 text-slate-500">Non-AC (Ceiling Fan)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-slate-900">Attached Washroom</td>
                  <td className="py-3.5 px-4">Ensuite Western Bath</td>
                  <td className="py-3.5 px-4">Ensuite Western Bath</td>
                  <td className="py-3.5 px-4">Ensuite Western Bath</td>
                  <td className="py-3.5 px-4">Ensuite Western Bath</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-3.5 px-6 font-medium text-slate-900">Study Desks</td>
                  <td className="py-3.5 px-4">Dual Stations + Warm LED</td>
                  <td className="py-3.5 px-4">Dual Stations + Warm LED</td>
                  <td className="py-3.5 px-4">Triple Dedicated Stations</td>
                  <td className="py-3.5 px-4">Triple Dedicated Stations</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-slate-900">Individual Beds</td>
                  <td className="py-3.5 px-4">2 Single Wooden Beds</td>
                  <td className="py-3.5 px-4">2 Single Wooden Beds</td>
                  <td className="py-3.5 px-4">3 Single Wooden Beds</td>
                  <td className="py-3.5 px-4">3 Single Wooden Beds</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-3.5 px-6 font-medium text-slate-900">Personal Storage</td>
                  <td className="py-3.5 px-4">2 Keyed Wardrobes</td>
                  <td className="py-3.5 px-4">2 Keyed Wardrobes</td>
                  <td className="py-3.5 px-4">3 Lockable Wardrobes</td>
                  <td className="py-3.5 px-4">3 Lockable Wardrobes</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-slate-900">Meals Included</td>
                  <td className="py-3.5 px-4">4 Fresh Daily Meals</td>
                  <td className="py-3.5 px-4">4 Fresh Daily Meals</td>
                  <td className="py-3.5 px-4">4 Fresh Daily Meals</td>
                  <td className="py-3.5 px-4">4 Fresh Daily Meals</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-3.5 px-6 font-medium text-slate-900">High-Speed Wi-Fi</td>
                  <td className="py-3.5 px-4">Included (Dual-band)</td>
                  <td className="py-3.5 px-4">Included (Dual-band)</td>
                  <td className="py-3.5 px-4">Included (Dual-band)</td>
                  <td className="py-3.5 px-4">Included (Dual-band)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-medium text-slate-900">24/7 Security & Power Backup</td>
                  <td className="py-3.5 px-4">Included</td>
                  <td className="py-3.5 px-4">Included</td>
                  <td className="py-3.5 px-4">Included</td>
                  <td className="py-3.5 px-4">Included</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Important Advisory Note */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-mono">
            <p className="font-bold text-slate-800 mb-1">
              Important Room Booking & Session Duration Advisory:
            </p>
            <p>
              Fees are stated strictly per college session as outlined in the
              official ZOD Living brochure. Room allocations and AC / Non-AC preferences
              are subject to live availability. Prospective residents and parents
              should confirm current availability, session start/end timelines,
              inclusions, and applicable terms directly with the ZOD Living
              administration office prior to final enrollment.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Lightbox Modal */}
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
            className="absolute top-6 right-6 text-white text-3xl font-light hover:text-[#D97706]"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
      )}

      {/* 7. Shared Footer with Final CTA */}
      <FooterCTASection />
    </div>
  );
}
