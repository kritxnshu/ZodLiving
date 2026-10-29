"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { FooterCTASection } from "@/components/FooterCTASection";
import { PROPERTY_CONFIG } from "@/lib/contact-config";

interface FormDataState {
  name: string;
  phone: string;
  email: string;
  college: string;
  roomType: string;
  acPreference: string;
  preferredDate: string;
  message: string;
}

function ContactContent() {
  const searchParams = useSearchParams();
  const roomParam = searchParams.get("room");

  // Determine initial room selection from query parameter if present
  const getInitialRoom = () => {
    if (roomParam === "2-seater-ac") return "2-Seater AC";
    if (roomParam === "2-seater-non-ac") return "2-Seater Non-AC";
    if (roomParam === "3-seater-ac") return "3-Seater AC";
    if (roomParam === "3-seater-non-ac") return "3-Seater Non-AC";
    if (roomParam === "2-seater") return "2-Seater AC";
    if (roomParam === "3-seater") return "3-Seater AC";
    return "2-Seater AC";
  };

  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    phone: "",
    email: "",
    college: "",
    roomType: getInitialRoom(),
    acPreference: "AC",
    preferredDate: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const roomOptions = [
    {
      id: "2-Seater AC",
      label: "2-Seater AC — ₹1,65,000 / college session",
      tier: "2-Seater",
      ac: "AC",
      price: "₹1,65,000",
    },
    {
      id: "2-Seater Non-AC",
      label: "2-Seater Non-AC — ₹1,50,000 / college session",
      tier: "2-Seater",
      ac: "Non-AC",
      price: "₹1,50,000",
    },
    {
      id: "3-Seater AC",
      label: "3-Seater AC — ₹1,50,000 / college session",
      tier: "3-Seater",
      ac: "AC",
      price: "₹1,50,000",
    },
    {
      id: "3-Seater Non-AC",
      label: "3-Seater Non-AC — ₹1,35,000 / college session",
      tier: "3-Seater",
      ac: "Non-AC",
      price: "₹1,35,000",
    },
    {
      id: "General Enquiry",
      label: "General Enquiry / Open to Both Options",
      tier: "Flexible",
      ac: "Flexible",
      price: "From ₹1,35,000",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!formData.name.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    // Simulate honest frontend processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      college: "",
      roomType: "2-Seater AC",
      acPreference: "AC",
      preferredDate: "",
      message: "",
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAF9F5] text-slate-900">
      {/* 1. Header */}
      <Header />

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 px-6 sm:px-12 lg:px-20 border-b border-neutral-200/80 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-0.5 w-5 bg-[#D97706] rounded-full" />
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#D97706] font-semibold">
              CONTACT & VISIT ENQUIRY
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A1128] leading-[1.1] max-w-4xl">
            Your Next Chapter Starts Here.
          </h1>

          <p className="text-base sm:text-lg text-[#475569] font-normal leading-relaxed mt-6 max-w-2xl">
            Have questions about rooms, fees, facilities, or availability? Get
            in touch with the ZOD Living team.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              Knowledge Park 3, Greater Noida
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-900 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Visiting Hours: 9:00 AM – 7:30 PM Daily
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              Session 2026–2027 Admissions Open
            </span>
          </div>
        </div>
      </section>

      {/* 3. Main Split Section: Property Details & Contact Form */}
      <section className="relative py-16 sm:py-24 px-6 sm:px-12 lg:px-20 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 cols): Verified Property Information */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Address & Navigation Card */}
            <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-0.5 w-4 bg-[#D97706] rounded-full" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#D97706] font-semibold">
                  OFFICIAL PROPERTY ADDRESS
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0A1128] flex items-center justify-between">
                <span>ZOD Living Hostel</span>
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-semibold">
                  Open 24 Hours
                </span>
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed mt-3 font-medium">
                {PROPERTY_CONFIG.fullAddress}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-600 font-bold mt-0.5">📍</span>
                  <div>
                    <strong className="text-slate-800">Landmarks:</strong> Opposite to Dronacharya College, Namoli, Knowledge Park III.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-amber-600 font-bold mt-0.5">🚇</span>
                  <div>
                    <strong className="text-slate-800">Metro Transit:</strong> 5 mins to Knowledge Park II Metro Station (Aqua Line).
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold mt-0.5">🕒</span>
                  <div>
                    <strong className="text-slate-800">Hostel Reception:</strong> Open 24 hours daily. (Admissions visits: 9:00 AM – 8:00 PM).
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4">
                <a
                  href={PROPERTY_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
                >
                  <svg
                    className="w-4 h-4 text-[#F59E0B]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Get Directions on Google Maps ↗
                </a>
              </div>
            </div>

            {/* Direct Contact Channels Card */}
            <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-0.5 w-4 bg-[#D97706] rounded-full" />
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#D97706] font-semibold">
                  DIRECT CHANNELS
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#0A1128]">
                Admissions & Front Desk
              </h3>

              <div className="mt-4 space-y-3">
                <a
                  href={`tel:${PROPERTY_CONFIG.phoneRaw}`}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/40 transition-colors"
                >
                  <div>
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Phone Enquiries</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{PROPERTY_CONFIG.phone}</p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-amber-700">Call Now →</span>
                </a>

                <a
                  href={`https://wa.me/${PROPERTY_CONFIG.whatsappRaw}?text=${encodeURIComponent("Hello ZOD Living, I am interested in knowing more about room availability and scheduling a visit.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-200 hover:border-emerald-400 bg-emerald-50/50 hover:bg-emerald-50 transition-colors"
                >
                  <div>
                    <p className="text-[10px] text-emerald-800 font-mono uppercase tracking-wider font-semibold">WhatsApp Chat</p>
                    <p className="text-sm font-bold text-emerald-950 mt-0.5">{PROPERTY_CONFIG.whatsapp}</p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-emerald-700">Chat →</span>
                </a>

                <a
                  href={`mailto:${PROPERTY_CONFIG.email}`}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-blue-50/20 hover:bg-blue-50/50 transition-colors"
                >
                  <div>
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Email Us</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{PROPERTY_CONFIG.email}</p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-blue-700">Email →</span>
                </a>

                {/* Social Channels Row */}
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <a
                    href={PROPERTY_CONFIG.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-pink-300 bg-pink-50/20 hover:bg-pink-50/50 transition-colors"
                  >
                    <svg className="w-4 h-4 text-pink-600 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-500 font-mono uppercase">Instagram</p>
                      <p className="text-xs font-bold text-slate-900 truncate">{PROPERTY_CONFIG.instagram.handle}</p>
                    </div>
                  </a>

                  <a
                    href={PROPERTY_CONFIG.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 hover:border-blue-300 bg-blue-50/20 hover:bg-blue-50/50 transition-colors"
                  >
                    <svg className="w-4 h-4 text-blue-600 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-500 font-mono uppercase">Facebook</p>
                      <p className="text-xs font-bold text-slate-900 truncate">Zod Living Hostels</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Verified Pricing Reminder */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                  Session Fees (Brochure Rates)
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-slate-200/80">
                    <p className="text-slate-500">2-Seater AC</p>
                    <p className="font-bold text-slate-900">₹1,65,000 / sess.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-slate-200/80">
                    <p className="text-slate-500">2-Seater Non-AC</p>
                    <p className="font-bold text-slate-900">₹1,50,000 / sess.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-slate-200/80">
                    <p className="text-slate-500">3-Seater AC</p>
                    <p className="font-bold text-slate-900">₹1,50,000 / sess.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-slate-200/80">
                    <p className="text-slate-500">3-Seater Non-AC</p>
                    <p className="font-bold text-slate-900">₹1,35,000 / sess.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Thumbnail of Property */}
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200/80 h-52 group">
              <Image
                src="/resourcezod/building-exterior.jpeg"
                alt="ZOD Living Building Exterior in Greater Noida"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <p className="text-xs font-mono text-[#F59E0B] tracking-wider uppercase">
                  Plot 90, Knowledge Park 3
                </p>
                <p className="text-sm font-semibold mt-0.5">
                  Modern campus-adjacent student living with full security & backup
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Enquiry & Visit Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/90 shadow-lg">
              
              {isSubmitted ? (
                /* Honest Success State */
                <div className="py-10 text-center animate-fadeIn">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 text-3xl font-bold mb-5">
                    ✓
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="h-0.5 w-4 bg-[#D97706] rounded-full" />
                    <span className="text-xs font-mono tracking-widest uppercase text-[#D97706] font-semibold">
                      ENQUIRY RECORDED
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0A1128]">
                    Thank You, {formData.name || "Student"}!
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-lg mx-auto leading-relaxed">
                    Your visit and accommodation enquiry for{" "}
                    <strong className="text-slate-900">{formData.roomType}</strong> has been received by the ZOD Living front desk.
                  </p>

                  {/* Summary Box */}
                  <div className="mt-8 max-w-md mx-auto p-5 rounded-2xl bg-[#FAF9F5] border border-slate-200 text-left text-xs space-y-2">
                    <p className="font-mono text-slate-500 uppercase tracking-wider mb-1">
                      Enquiry Summary
                    </p>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Resident / Guardian:</span>
                      <span className="font-semibold text-slate-800">{formData.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Contact Number:</span>
                      <span className="font-semibold text-slate-800">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/60">
                      <span className="text-slate-500">Selected Room:</span>
                      <span className="font-semibold text-slate-800">{formData.roomType}</span>
                    </div>
                    {formData.preferredDate && (
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">Preferred Visit Date:</span>
                        <span className="font-semibold text-slate-800">{formData.preferredDate}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 pt-2">
                      <span className="text-slate-500">Next Step:</span>
                      <span className="font-semibold text-amber-700">Team callback within visiting hours</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-6 max-w-md mx-auto">
                    Our team reviews all requests daily during visiting hours (9:00 AM – 7:30 PM). Prospective residents and parents can also visit the property directly.
                  </p>

                  <div className="mt-8 flex justify-center gap-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-mono uppercase tracking-wider transition-colors"
                    >
                      Submit Another Enquiry
                    </button>
                    <Link
                      href="/room"
                      className="px-6 py-2.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-semibold text-xs font-mono uppercase tracking-wider transition-colors"
                    >
                      Explore Room Details →
                    </Link>
                  </div>
                </div>
              ) : (
                /* The Contact & Visit Form */
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-0.5 w-4 bg-[#D97706] rounded-full" />
                    <span className="text-xs font-mono tracking-widest uppercase text-[#D97706] font-semibold">
                      SCHEDULE A VISIT & ADMISSIONS FORM
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1128]">
                    Send an Enquiry
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Reserve a time to tour our furnished suites, study spaces, and dining hall. We welcome both students and parents.
                  </p>

                  {formError && (
                    <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <span>⚠️</span>
                      <span>{formError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    
                    {/* Row 1: Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-700 uppercase mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Aryan Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#D97706] bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-700 uppercase mb-1.5">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#D97706] bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & College */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-700 uppercase mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="student@university.edu"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#D97706] bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-semibold text-slate-700 uppercase mb-1.5">
                          College / University (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Sharda / Galgotias / GL Bajaj"
                          value={formData.college}
                          onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#D97706] bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 3: Room Selection Dropdown */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-mono font-semibold text-slate-700 uppercase">
                          Room Selection & Pricing *
                        </label>
                        <span className="text-[11px] font-mono text-[#D97706] font-semibold">
                          Per College Session
                        </span>
                      </div>
                      <select
                        value={formData.roomType}
                        onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#D97706] bg-white text-slate-900 transition-colors"
                      >
                        {roomOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-slate-500 mt-1 font-mono">
                        Includes 4 fresh daily meals, attached washroom, high-speed Wi-Fi, laundry 2x/week, and electricity backup.
                      </p>
                    </div>

                    {/* Row 4: Preferred Visit Date */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-700 uppercase mb-1.5">
                        Preferred Visit Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#D97706] bg-white transition-colors text-slate-800"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        Visiting hours are daily from 9:00 AM to 7:30 PM.
                      </p>
                    </div>

                    {/* Row 5: Message / Questions */}
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-700 uppercase mb-1.5">
                        Questions, Requirements, or Moving Date
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your joining date, dietary preferences, or specific queries..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#D97706] bg-white resize-none transition-colors"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-[11px] text-slate-500 font-mono">
                        🔒 No booking fee required to schedule a visit.
                      </p>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-slate-950 font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                      >
                        {isSubmitting ? "Recording Enquiry..." : "Submit Enquiry & Request Tour →"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions Section */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 bg-white border-t border-b border-neutral-200/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-0.5 w-4 bg-[#D97706] rounded-full" />
              <span className="text-xs font-mono tracking-widest uppercase text-[#D97706] font-semibold">
                COMMON QUERIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1128]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything prospective residents and parents need to know about admissions, fees, and visits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-neutral-200/80">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Are fees charged monthly or per college session?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Fees at ZOD Living are billed <strong>per college session</strong> for the academic year as stated in the official brochure. Session fees cover furnished room accommodation, 4 fresh daily meals, high-speed Wi-Fi, 2x weekly laundry, power backup, and CCTV security.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-neutral-200/80">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Can parents accompany students during property visits?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Absolutely. We encourage parents and guardians to visit in person, inspect room configurations, examine the dining mess hygiene, and discuss security protocols directly with our management.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-neutral-200/80">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                What are the property visiting hours?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Visiting hours are <strong>9:00 AM to 7:30 PM daily</strong>, Monday through Sunday. You can drop in directly at Plot 90, Knowledge Park 3, or reserve a preferred slot using the form above.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-neutral-200/80">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Are both AC and Non-AC configurations available?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Yes, both 2-Seater and 3-Seater rooms offer AC and Non-AC options. Because AC rooms are high in demand during peak college admissions, allocations are processed on a first-come, first-served basis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Shared Footer */}
      <FooterCTASection hideCTA={true} />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Loading Contact Page...
          </p>
        </div>
      }
    >
      <ContactContent />
    </Suspense>
  );
}
