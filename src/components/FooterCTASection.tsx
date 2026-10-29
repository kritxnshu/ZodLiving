"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PROPERTY_CONFIG } from "@/lib/contact-config";

interface FooterCTASectionProps {
  onOpenBooking?: () => void;
  onNavigate?: (sectionId: string) => void;
  hideCTA?: boolean;
}

export const FooterCTASection: React.FC<FooterCTASectionProps> = ({
  onOpenBooking,
  hideCTA = false,
}) => {
  return (
    <footer id="contact" className="relative z-10 w-full bg-[#0A0F1D] text-slate-300">
      {/* 1. Final Call-to-Action Section with Building Exterior Background */}
      {!hideCTA && (
        <div className="relative w-full py-28 sm:py-36 px-6 sm:px-12 lg:px-20 overflow-hidden border-t border-slate-800/80">
          <Image
            src="/resourcezod/building-exterior.jpeg"
            alt="ZOD Living Building Exterior with balconies and golden signage"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          {/* Restrained dark overlay for high contrast */}
          <div className="absolute inset-0 bg-[#0A0F1D]/85 backdrop-blur-[2px]" />

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-0.5 w-4 bg-[#F59E0B] rounded-full" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#F59E0B] font-semibold">
                ACADEMIC SESSION {PROPERTY_CONFIG.academicYear}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Your Next Chapter Starts Here.
            </h2>

            <p className="max-w-xl text-sm sm:text-base text-slate-300 font-normal leading-relaxed mt-5">
              Experience the spaces, meet the community, and reserve your room for
              the upcoming semester. Scheduled tours available daily.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              {onOpenBooking ? (
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-200 cursor-pointer shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-lg"
                >
                  Book a Visit
                </button>
              ) : (
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-200 cursor-pointer shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-lg text-center"
                >
                  Book a Visit
                </Link>
              )}

              <a
                href={`https://wa.me/${PROPERTY_CONFIG.whatsappRaw}?text=Hi%20ZOD%20Living,%20I%20would%20like%20to%20enquire%20about%20room%20availability%20and%20schedule%20a%20visit.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-emerald-500/60 hover:border-emerald-400 bg-emerald-950/20 text-emerald-300 hover:text-white text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-200 text-center flex items-center justify-center gap-2"
              >
                <span>WhatsApp: {PROPERTY_CONFIG.whatsapp}</span>
              </a>

              <a
                href={`tel:${PROPERTY_CONFIG.phoneRaw}`}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-slate-700 hover:border-white text-slate-300 hover:text-white text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-200 text-center"
              >
                Call: {PROPERTY_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. Deep Navy Multi-Column Footer matching reference layout */}
      <div className="w-full py-16 sm:py-20 px-6 sm:px-12 lg:px-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-lg font-light tracking-[0.2em] uppercase text-white hover:text-[#F59E0B] transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
              <span className="font-semibold tracking-[0.25em]">ZOD</span> LIVING
            </Link>

            <p className="text-xs sm:text-[13px] text-slate-400 font-normal leading-relaxed mt-4 max-w-sm">
              {PROPERTY_CONFIG.tagline}. Premium student hostel residences in Knowledge
              Park III, Greater Noida. Built for focused study, sound rest, and
              wholesome dining.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Hostel • Open 24 Hours</span>
            </div>

            {/* Social Channels */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={PROPERTY_CONFIG.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/60 hover:border-pink-500/50 hover:bg-slate-900 text-slate-300 hover:text-pink-400 text-xs font-mono transition-all"
                title="Instagram @zodliving.in"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>

              <a
                href={PROPERTY_CONFIG.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/60 hover:border-blue-500/50 hover:bg-slate-900 text-slate-300 hover:text-blue-400 text-xs font-mono transition-all"
                title="Facebook Zod Living Hostels"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-mono tracking-wider">
              <li>
                <Link href="/" className="hover:text-[#F59E0B] transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/room" className="hover:text-[#F59E0B] transition-colors">
                  Rooms & Fees
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-[#F59E0B] transition-colors">
                  Amenities
                </Link>
              </li>
              <li>
                <Link href="/life-at-zod" className="hover:text-[#F59E0B] transition-colors">
                  Life at ZOD
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F59E0B] transition-colors">
                  Contact & Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Accommodation Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold mb-4">
              Accommodation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-mono tracking-wider">
              <li>
                <Link href="/room#2-seater" className="hover:text-[#F59E0B] transition-colors">
                  2-Seater AC (₹1,65,000)
                </Link>
              </li>
              <li>
                <Link href="/room#2-seater" className="hover:text-[#F59E0B] transition-colors">
                  2-Seater Non-AC (₹1,50,000)
                </Link>
              </li>
              <li>
                <Link href="/room#3-seater" className="hover:text-[#F59E0B] transition-colors">
                  3-Seater AC (₹1,50,000)
                </Link>
              </li>
              <li>
                <Link href="/room#3-seater" className="hover:text-[#F59E0B] transition-colors">
                  3-Seater Non-AC (₹1,35,000)
                </Link>
              </li>
              <li>
                <Link href="/room#comparison" className="hover:text-[#F59E0B] transition-colors">
                  Compare All Configurations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Property Office (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white font-semibold mb-4">
              Hostel Office
            </h4>
            <div className="space-y-3 text-xs text-slate-400 font-mono leading-relaxed">
              <p className="text-slate-300 font-medium">{PROPERTY_CONFIG.fullAddress}</p>
              <p>
                <a
                  href={PROPERTY_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F59E0B] hover:underline inline-flex items-center gap-1"
                >
                  Get Directions on Google Maps ↗
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href={`tel:${PROPERTY_CONFIG.phoneRaw}`}
                  className="text-white font-bold hover:text-[#F59E0B] transition-colors"
                >
                  {PROPERTY_CONFIG.phone}
                </a>
              </p>
              <p>
                WhatsApp:{" "}
                <a
                  href={`https://wa.me/${PROPERTY_CONFIG.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
                >
                  {PROPERTY_CONFIG.whatsapp}
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${PROPERTY_CONFIG.email}`}
                  className="text-slate-300 hover:text-[#F59E0B] transition-colors"
                >
                  {PROPERTY_CONFIG.email}
                </a>
              </p>
              <div className="pt-1 flex flex-col gap-1 text-[11px] text-slate-400 border-t border-slate-800">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {PROPERTY_CONFIG.openStatus}
                </span>
                <span>Admissions: 9:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance Links */}
        <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>© 2026 ZOD Living. All rights reserved. Fees per college session.</div>
          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Schedule Tour
            </Link>
            <span className="text-slate-700">•</span>
            <span className="text-slate-500">Knowledge Park 3, Greater Noida</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCTASection;
