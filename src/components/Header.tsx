"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROPERTY_CONFIG } from "@/lib/contact-config";
import { MobileActionBar } from "@/components/MobileActionBar";

const NAV_ITEMS = [
  { id: "experience", href: "/", label: "Experience" },
  { id: "room", href: "/room", label: "Room" },
  { id: "amenities", href: "/amenities", label: "Amenities" },
  { id: "life-at-zod", href: "/life-at-zod", label: "Life at ZOD" },
  { id: "contact", href: "/contact", label: "Contact" },
] as const;

// Long, soft settle used by the nav's entrance
const EASE_OUT_EXPO = "ease-[cubic-bezier(0.22,1,0.36,1)]";

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

  // Track if header is over a light background: everywhere except the homepage hero and the footer
  const [isLightSection, setIsLightSection] = useState(pathname !== "/");

  // On the homepage the desktop links stay hidden until the hero's scroll animation is over
  const [isNavShown, setIsNavShown] = useState(pathname !== "/");
  // The footer repeats the contact actions, so the mobile action bar steps aside for it
  const [isFooterInView, setIsFooterInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The animation ends when the hero's bottom edge reaches the bottom of the viewport
      const hero = document.getElementById("experience");
      const footer = document.getElementById("contact");
      setIsNavShown(!hero || hero.getBoundingClientRect().bottom <= window.innerHeight + 1);
      setIsFooterInView(!!footer && footer.getBoundingClientRect().top < window.innerHeight);

      // Header is ~64px tall; the dark areas are the hero (#experience) and the footer (#contact)
      const isUnderHeader = (el: HTMLElement | null) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 64 && rect.bottom > 64;
      };
      setIsLightSection(!isUnderHeader(hero) && !isUnderHeader(footer));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Highlight pill that slides behind the hovered link and rests on the current page's link.
  // Moved with direct style writes so hovering never re-renders the header.
  const navRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const activeIndex = NAV_ITEMS.findIndex((item) => item.id === activeSection);

  const moveHighlight = useCallback((index: number, animate = true) => {
    const link = linkRefs.current[index];
    const highlight = highlightRef.current;
    if (!link || !highlight) return;
    if (!animate) highlight.style.transition = "none";
    highlight.style.width = `${link.offsetWidth}px`;
    highlight.style.transform = `translateX(${link.offsetLeft}px)`;
    if (!animate) {
      highlight.getBoundingClientRect(); // apply the jump before transitions come back
      highlight.style.transition = "";
    }
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    moveHighlight(activeIndex, false);
    // Link widths change when the web font loads and when the layout resizes
    const observer = new ResizeObserver(() => moveHighlight(activeIndex, false));
    observer.observe(nav);
    return () => observer.disconnect();
  }, [activeIndex, moveHighlight]);

  // The open mobile drawer is always dark, so the header above it is too
  const lightTheme = isLightSection && !isMobileMenuOpen;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 py-4">
        {/* The header itself is transparent. This dark strip only shows while the mobile menu is
            open, joining the drawer below it. A separate layer because a backdrop-filter on
            <header> itself would trap the fixed drawer inside the header. */}
        <div
          aria-hidden="true"
          className={`md:hidden pointer-events-none absolute inset-0 -z-10 border-b border-white/10 bg-[#0A0F1D]/80 backdrop-blur-xl transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* 1. Brand Logo */}
        <Link
          href="/"
          onClick={() => {
            setIsMobileMenuOpen(false);
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className={`flex items-center gap-2.5 text-lg font-light tracking-[0.2em] uppercase transition-colors duration-200 ${
            lightTheme
              ? "text-[#0A1128] hover:text-gold-deep"
              : "text-white hover:text-gold"
          }`}
          aria-label="ZOD Living home - Return to experience"
        >
          <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_#D4AF37]" />
          <span className="font-semibold tracking-[0.25em]">ZOD</span> LIVING
        </Link>

        {/* 2. Desktop Navigation: frosted pill that floats in once the hero animation is over */}
        <nav
          ref={navRef}
          aria-label="Main navigation"
          inert={!isNavShown}
          onMouseLeave={() => moveHighlight(activeIndex)}
          className={`relative hidden md:flex items-center rounded-full border p-1.5 text-xs font-mono tracking-widest uppercase backdrop-blur-xl transition-[opacity,translate,scale,background-color,border-color,box-shadow,color] duration-700 ${EASE_OUT_EXPO} motion-reduce:transition-none ${
            lightTheme
              ? "bg-white/70 border-[#0A1128]/10 text-[#334155] shadow-[0_8px_30px_rgba(10,17,40,0.08)]"
              : "bg-black/30 border-white/10 text-neutral-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          } ${isNavShown ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95"}`}
        >
          <span
            ref={highlightRef}
            aria-hidden="true"
            className={`absolute left-0 inset-y-1.5 rounded-full ring-1 transition-[transform,width,background-color] duration-300 ease-out motion-reduce:transition-none ${
              lightTheme ? "bg-gold/10 ring-gold-deep/25" : "bg-gold/15 ring-gold/30"
            }`}
          />

          {NAV_ITEMS.map((item, i) => {
            const isActive = item.id === activeSection;
            return (
              <Link
                key={item.id}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                href={item.href}
                onClick={() => {
                  if (item.href === "/" && pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                onMouseEnter={() => moveHighlight(i)}
                onFocus={() => moveHighlight(i)}
                onBlur={() => moveHighlight(activeIndex)}
                aria-current={isActive ? "page" : undefined}
                className={`relative z-10 cursor-pointer rounded-full px-4 py-2 transition-colors duration-200 ${
                  isActive
                    ? lightTheme
                      ? "text-gold-deep font-semibold"
                      : "text-gold"
                    : lightTheme
                    ? "hover:text-gold-deep"
                    : "hover:text-white"
                }`}
              >
                {/* The staggered entrance lives on this wrapper so its delay never slows hover colours */}
                <span
                  className={`inline-block transition-[opacity,translate,filter] duration-700 ${EASE_OUT_EXPO} motion-reduce:transition-none ${
                    isNavShown ? "opacity-100 translate-y-0 blur-[0px]" : "opacity-0 -translate-y-2 blur-[3px]"
                  }`}
                  style={{ transitionDelay: isNavShown ? `${150 + i * 70}ms` : "0ms" }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* 3. Primary CTA Button (Desktop) */}
        <div className="hidden md:block">
          {onOpenBooking ? (
            <button
              onClick={onOpenBooking}
              className={`px-5 py-2 text-xs font-mono tracking-widest uppercase rounded-full transition-all duration-200 cursor-pointer ${
                lightTheme
                  ? "border border-[#0A1128] text-[#0A1128] hover:bg-[#0A1128] hover:text-white"
                  : "border border-gold/60 text-gold hover:bg-gold hover:text-black shadow-[0_0_15px_rgba(212,175,55,0.15)]"
              }`}
            >
              BOOK A VISIT
            </button>
          ) : (
            <Link
              href="/contact"
              className={`px-5 py-2 text-xs font-mono tracking-widest uppercase rounded-full transition-all duration-200 cursor-pointer ${
                lightTheme
                  ? "border border-[#0A1128] text-[#0A1128] hover:bg-[#0A1128] hover:text-white"
                  : "border border-gold/60 text-gold hover:bg-gold hover:text-black shadow-[0_0_15px_rgba(212,175,55,0.15)]"
              }`}
            >
              BOOK A VISIT
            </Link>
          )}
        </div>

        {/* 4. Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden flex flex-col justify-center items-center w-9 h-9 transition-colors cursor-pointer ${
            lightTheme
              ? "text-[#0A1128] hover:text-gold-deep"
              : "text-neutral-300 hover:text-gold"
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
                  ? "text-gold"
                  : "text-neutral-300 hover:text-gold"
              }`}
            >
              01 Experience
            </Link>

            <Link
              href="/room"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-left py-2 transition-colors duration-200 border-b border-neutral-900 ${
                activeSection === "room"
                  ? "text-gold"
                  : "text-neutral-300 hover:text-gold"
              }`}
            >
              02 Room
            </Link>

            <Link
              href="/amenities"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-left py-2 transition-colors duration-200 border-b border-neutral-900 ${
                activeSection === "amenities"
                  ? "text-gold"
                  : "text-neutral-300 hover:text-gold"
              }`}
            >
              03 Amenities
            </Link>

            <Link
              href="/life-at-zod"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-left py-2 transition-colors duration-200 border-b border-neutral-900 ${
                activeSection === "life-at-zod"
                  ? "text-gold"
                  : "text-neutral-300 hover:text-gold"
              }`}
            >
              04 Life at ZOD
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-left py-2 transition-colors duration-200 border-b border-neutral-900 ${
                activeSection === "contact"
                  ? "text-gold"
                  : "text-neutral-300 hover:text-gold"
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
                className="w-full py-3.5 text-center text-xs font-mono tracking-widest uppercase border border-gold rounded-full text-black bg-gold hover:bg-[#E5C378] font-semibold transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.25)]"
              >
                BOOK A VISIT
              </button>
            ) : (
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-3.5 text-center text-xs font-mono tracking-widest uppercase border border-gold rounded-full text-black bg-gold hover:bg-[#E5C378] font-semibold transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.25)]"
              >
                BOOK A VISIT
              </Link>
            )}

            {/* Quick Contact Actions for Mobile */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={`tel:${PROPERTY_CONFIG.phoneRaw}`}
                className="py-2.5 px-3 rounded-full border border-neutral-700 bg-neutral-900/60 text-white text-[11px] font-mono text-center hover:border-gold transition-colors"
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

      <MobileActionBar
        visible={isNavShown && !isFooterInView && !isMobileMenuOpen}
        onOpenBooking={onOpenBooking}
      />
    </>
  );
};

export default Header;
