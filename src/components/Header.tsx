"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROPERTY_CONFIG } from "@/lib/contact-config";

interface HeaderProps {
  onNavigate?: (sectionId: string) => void;
  onOpenBooking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Active section corresponds directly to current route
  const getActiveSection = () => {
    if (pathname === "/room") return "room";
    if (pathname === "/amenities") return "amenities";
    if (pathname === "/life-at-zod") return "life-at-zod";
    if (pathname === "/contact") return "contact";
    return "experience";
  };

  const activeSection = getActiveSection();

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Track if header is hovering over light-background sections on the homepage
  const [isLightSection, setIsLightSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const philosophyEl = document.getElementById("philosophy");
      const contactEl = document.getElementById("contact");

      if (philosophyEl && contactEl) {
        const philRect = philosophyEl.getBoundingClientRect();
        const contactRect = contactEl.getBoundingClientRect();

        // Header is ~64px tall; over light sections when between philosophy and contact
        const overLight = philRect.top <= 64 && contactRect.top > 64;
        setIsLightSection(overLight);
      } else {
        setIsLightSection(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-4 bg-transparent border-b border-transparent transition-all duration-300">
      {/* 1. Brand Logo */}
      <Link
        href="/"
        onClick={() => {
          setIsMobileMenuOpen(false);
          if (pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className={`flex items-center gap-2.5 text-lg font-light tracking-[0.2em] uppercase transition-colors duration-200 focus:outline-none ${
          isLightSection
            ? "text-[#0A1128] hover:text-[#D97706]"
            : "text-white hover:text-[#D4AF37]"
        }`}
        aria-label="ZOD Living home - Return to experience"
      >
        <span
          className={`h-2 w-2 rounded-full transition-colors ${
            isLightSection
              ? "bg-[#D97706] shadow-[0_0_8px_#D97706]"
              : "bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]"
          }`}
        />
        <span className="font-semibold tracking-[0.25em]">ZOD</span> LIVING
      </Link>

      {/* 2. Desktop Navigation */}
      <nav
        aria-label="Main navigation"
        className={`hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase transition-colors duration-200 ${
          isLightSection ? "text-[#334155]" : "text-neutral-300"
        }`}
      >
        <Link
          href="/"
          onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className={`cursor-pointer transition-colors duration-200 py-1 relative focus:outline-none ${
            activeSection === "experience"
              ? isLightSection
                ? "text-[#D97706] font-semibold"
                : "text-[#D4AF37]"
              : isLightSection
              ? "hover:text-[#D97706]"
              : "hover:text-[#D4AF37]"
          }`}
        >
          Experience
          {activeSection === "experience" && (
            <span
              className={`absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full ${
                isLightSection ? "bg-[#D97706]" : "bg-[#D4AF37]"
              }`}
            />
          )}
        </Link>

        <Link
          href="/room"
          className={`cursor-pointer transition-colors duration-200 py-1 relative focus:outline-none ${
            activeSection === "room"
              ? isLightSection
                ? "text-[#D97706] font-semibold"
                : "text-[#D4AF37]"
              : isLightSection
              ? "hover:text-[#D97706]"
              : "hover:text-[#D4AF37]"
          }`}
        >
          Room
          {activeSection === "room" && (
            <span
              className={`absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full ${
                isLightSection ? "bg-[#D97706]" : "bg-[#D4AF37]"
              }`}
            />
          )}
        </Link>

        <Link
          href="/amenities"
          className={`cursor-pointer transition-colors duration-200 py-1 relative focus:outline-none ${
            activeSection === "amenities"
              ? isLightSection
                ? "text-[#D97706] font-semibold"
                : "text-[#D4AF37]"
              : isLightSection
              ? "hover:text-[#D97706]"
              : "hover:text-[#D4AF37]"
          }`}
        >
          Amenities
          {activeSection === "amenities" && (
            <span
              className={`absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full ${
                isLightSection ? "bg-[#D97706]" : "bg-[#D4AF37]"
              }`}
            />
          )}
        </Link>

        <Link
          href="/life-at-zod"
          className={`cursor-pointer transition-colors duration-200 py-1 relative focus:outline-none ${
            activeSection === "life-at-zod"
              ? isLightSection
                ? "text-[#D97706] font-semibold"
                : "text-[#D4AF37]"
              : isLightSection
              ? "hover:text-[#D97706]"
              : "hover:text-[#D4AF37]"
          }`}
        >
          Life at ZOD
          {activeSection === "life-at-zod" && (
            <span
              className={`absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full ${
                isLightSection ? "bg-[#D97706]" : "bg-[#D4AF37]"
              }`}
            />
          )}
        </Link>

        <Link
          href="/contact"
          className={`cursor-pointer transition-colors duration-200 py-1 relative focus:outline-none ${
            activeSection === "contact"
              ? isLightSection
                ? "text-[#D97706] font-semibold"
                : "text-[#D4AF37]"
              : isLightSection
              ? "hover:text-[#D97706]"
              : "hover:text-[#D4AF37]"
          }`}
        >
          Contact
          {activeSection === "contact" && (
            <span
              className={`absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full ${
                isLightSection ? "bg-[#D97706]" : "bg-[#D4AF37]"
              }`}
            />
          )}
        </Link>
      </nav>

      {/* 3. Primary CTA Button (Desktop) */}
      <div className="hidden md:block">
        {onOpenBooking ? (
          <button
            onClick={onOpenBooking}
            className={`px-5 py-2 text-xs font-mono tracking-widest uppercase rounded-full transition-all duration-200 cursor-pointer focus:outline-none ${
              isLightSection
                ? "border border-[#0A1128] text-[#0A1128] hover:bg-[#0A1128] hover:text-white"
                : "border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black shadow-[0_0_15px_rgba(212,175,55,0.15)]"
            }`}
          >
            BOOK A VISIT
          </button>
        ) : (
          <Link
            href="/contact"
            className={`px-5 py-2 text-xs font-mono tracking-widest uppercase rounded-full transition-all duration-200 cursor-pointer focus:outline-none ${
              isLightSection
                ? "border border-[#0A1128] text-[#0A1128] hover:bg-[#0A1128] hover:text-white"
                : "border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black shadow-[0_0_15px_rgba(212,175,55,0.15)]"
            }`}
          >
            BOOK A VISIT
          </Link>
        )}
      </div>

      {/* 4. Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`md:hidden flex flex-col justify-center items-center w-9 h-9 transition-colors focus:outline-none cursor-pointer ${
          isLightSection
            ? "text-[#0A1128] hover:text-[#D97706]"
            : "text-neutral-300 hover:text-[#D4AF37]"
        }`}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
        aria-expanded={isMobileMenuOpen}
      >
        <span
          className={`block h-0.5 w-5 bg-current transition-all duration-200 ${
            isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-current my-1 transition-all duration-200 ${
            isMobileMenuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-5 bg-current transition-all duration-200 ${
            isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* 5. Mobile Navigation Overlay Drawer */}
      <div
        className={`md:hidden fixed inset-0 top-[65px] bg-black/95 backdrop-blur-2xl border-t border-white/10 z-40 flex flex-col justify-between px-8 py-10 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-6 text-sm font-mono tracking-widest uppercase"
        >
          <Link
            href="/"
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className={`text-left py-2 transition-colors duration-200 border-b border-neutral-900 ${
              activeSection === "experience"
                ? "text-[#D4AF37]"
                : "text-neutral-300 hover:text-[#D4AF37]"
            }`}
          >
            01 Experience
          </Link>

          <Link
            href="/room"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-left py-2 transition-colors duration-200 border-b border-neutral-900 ${
              activeSection === "room"
                ? "text-[#D4AF37]"
                : "text-neutral-300 hover:text-[#D4AF37]"
            }`}
          >
            02 Room
          </Link>

          <Link
            href="/amenities"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-left py-2 transition-colors duration-200 border-b border-neutral-900 ${
              activeSection === "amenities"
                ? "text-[#D4AF37]"
                : "text-neutral-300 hover:text-[#D4AF37]"
            }`}
          >
            03 Amenities
          </Link>

          <Link
            href="/life-at-zod"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-left py-2 transition-colors duration-200 border-b border-neutral-900 ${
              activeSection === "life-at-zod"
                ? "text-[#D4AF37]"
                : "text-neutral-300 hover:text-[#D4AF37]"
            }`}
          >
            04 Life at ZOD
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-left py-2 transition-colors duration-200 border-b border-neutral-900 ${
              activeSection === "contact"
                ? "text-[#D4AF37]"
                : "text-neutral-300 hover:text-[#D4AF37]"
            }`}
          >
            05 Contact
          </Link>
        </nav>

        <div className="pt-6 space-y-3">
          {onOpenBooking ? (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 text-center text-xs font-mono tracking-widest uppercase border border-[#D4AF37] rounded-full text-black bg-[#D4AF37] hover:bg-[#E5C378] font-semibold transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              BOOK A VISIT
            </button>
          ) : (
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-3.5 text-center text-xs font-mono tracking-widest uppercase border border-[#D4AF37] rounded-full text-black bg-[#D4AF37] hover:bg-[#E5C378] font-semibold transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              BOOK A VISIT
            </Link>
          )}

          {/* Quick Contact Actions for Mobile */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={`tel:${PROPERTY_CONFIG.phoneRaw}`}
              className="py-2.5 px-3 rounded-full border border-neutral-700 bg-neutral-900/60 text-white text-[11px] font-mono text-center hover:border-amber-400 transition-colors"
            >
              Call: {PROPERTY_CONFIG.phone}
            </a>
            <a
              href={`https://wa.me/${PROPERTY_CONFIG.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-full border border-emerald-600/60 bg-emerald-950/40 text-emerald-300 text-[11px] font-mono text-center hover:border-emerald-400 transition-colors"
            >
              WhatsApp →
            </a>
          </div>

          <div className="pt-3 flex justify-center items-center gap-4 text-xs font-mono text-neutral-400">
            <a
              href={PROPERTY_CONFIG.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              Instagram ({PROPERTY_CONFIG.instagram.handle})
            </a>
            <span>•</span>
            <a
              href={PROPERTY_CONFIG.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              Facebook
            </a>
          </div>

          <p className="text-[11px] text-center text-neutral-500 font-mono tracking-wider pt-2">
            Hostel • Open 24 Hours • Greater Noida
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
