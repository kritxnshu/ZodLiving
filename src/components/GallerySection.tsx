"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export const GallerySection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const galleryItems = [
    {
      src: "/images/gallery/double-sharing.jpg",
      alt: "2-Seater Premium Ensuite Bedroom",
      title: "Double Sharing Suite",
      aspect: "large", // spans 2 cols / large on desktop
    },
    {
      src: "/images/gallery/lobby.jpg",
      alt: "ZOD Living Lobby and Elevator",
      title: "Lobby & Reception",
      aspect: "wide",
    },
    {
      src: "/images/gallery/triple-study.jpg",
      alt: "3-Seater Classic Ensuite Study Stations",
      title: "Triple Study Pods",
      aspect: "standard",
    },
    {
      src: "/images/gallery/conference-lounge.jpg",
      alt: "Executive Conference & Meeting Lounge",
      title: "Conference Lounge",
      aspect: "standard",
    },
    {
      src: "/images/dining-hall.png",
      alt: "Dining Hall and Student Mess",
      title: "Dining Mess Hall",
      aspect: "standard",
    },
  ];

  const current = selectedIndex === null ? null : galleryItems[selectedIndex];
  const count = galleryItems.length;
  const isOpen = selectedIndex !== null;

  const step = (delta: number) =>
    setSelectedIndex((index) => (index === null ? index : (index + delta + count) % count));

  // Esc closes, arrow keys browse; the page behind doesn't scroll while the lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") setSelectedIndex((index) => (index === null ? index : (index + 1) % count));
      if (e.key === "ArrowLeft") setSelectedIndex((index) => (index === null ? index : (index - 1 + count) % count));
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, count]);

  return (
    <section
      id="gallery"
      className="relative z-10 w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 bg-[#FAF9F5] border-t border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Title on Left, View Full Gallery Button on Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6" data-reveal>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-0.5 w-4 bg-gold rounded-full" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-deep font-semibold">
                PROPERTY SHOWCASE
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A1128]">
              Take a Look Around.
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-[#475569] font-normal leading-relaxed mt-4">
              A look inside our building: the bedrooms, lobby, executive lounge
              and dining mess.
            </p>
          </div>

          <button
            onClick={() => setSelectedIndex(0)}
            className="self-start md:self-end px-6 py-2.5 rounded-full border border-slate-700 hover:border-slate-900 text-slate-800 hover:text-black text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
          >
            View Gallery
          </button>
        </div>

        {/* Asymmetric 5-Image Gallery Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6" data-reveal-stagger>
          {/* 1. Large Top-Left Feature Image (Double Room) */}
          <div
            onClick={() => setSelectedIndex(0)}
            data-cursor="view"
            className="md:col-span-7 relative h-72 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden bg-slate-200 shadow-sm hover:shadow-lg cursor-pointer group"
          >
            <Image
              src={galleryItems[0].src}
              alt={galleryItems[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-4 left-4 text-xs font-mono tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              {galleryItems[0].title}
            </span>
          </div>

          {/* 2. Top-Right Image (Lobby) */}
          <div
            onClick={() => setSelectedIndex(1)}
            data-cursor="view"
            className="md:col-span-5 relative h-72 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden bg-slate-200 shadow-sm hover:shadow-lg cursor-pointer group"
          >
            <Image
              src={galleryItems[1].src}
              alt={galleryItems[1].alt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-4 left-4 text-xs font-mono tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              {galleryItems[1].title}
            </span>
          </div>

          {/* 3. Bottom-Left (Triple Room) */}
          <div
            onClick={() => setSelectedIndex(2)}
            data-cursor="view"
            className="md:col-span-4 relative h-60 sm:h-72 rounded-2xl overflow-hidden bg-slate-200 shadow-sm hover:shadow-lg cursor-pointer group"
          >
            <Image
              src={galleryItems[2].src}
              alt={galleryItems[2].alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-4 left-4 text-xs font-mono tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              {galleryItems[2].title}
            </span>
          </div>

          {/* 4. Bottom-Middle (Executive Lounge) */}
          <div
            onClick={() => setSelectedIndex(3)}
            data-cursor="view"
            className="md:col-span-4 relative h-60 sm:h-72 rounded-2xl overflow-hidden bg-slate-200 shadow-sm hover:shadow-lg cursor-pointer group"
          >
            <Image
              src={galleryItems[3].src}
              alt={galleryItems[3].alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-4 left-4 text-xs font-mono tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              {galleryItems[3].title}
            </span>
          </div>

          {/* 5. Bottom-Right (Dining Hall) */}
          <div
            onClick={() => setSelectedIndex(4)}
            data-cursor="view"
            className="md:col-span-4 relative h-60 sm:h-72 rounded-2xl overflow-hidden bg-slate-200 shadow-sm hover:shadow-lg cursor-pointer group"
          >
            <Image
              src={galleryItems[4].src}
              alt={galleryItems[4].alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-4 left-4 text-xs font-mono tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              {galleryItems[4].title}
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox: rendered into <body> so it sits above the fixed header */}
      {current &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Photo gallery"
            onClick={() => setSelectedIndex(null)}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md"
          >
            <div className="relative h-[68vh] sm:h-[78vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain animate-[lightbox-in_350ms_cubic-bezier(0.22,1,0.36,1)]"
              />
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm" onClick={(e) => e.stopPropagation()}>
              <span className="font-medium text-white">{current.title}</span>
              <span className="font-mono text-xs text-neutral-400">
                {selectedIndex! + 1} / {galleryItems.length}
              </span>
            </div>

            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-2xl text-white transition-colors hover:border-gold hover:text-gold"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-2xl text-white transition-colors hover:border-gold hover:text-gold"
            >
              ›
            </button>
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-lg text-white transition-colors hover:border-gold hover:text-gold"
              aria-label="Close gallery"
            >
              ✕
            </button>
          </div>,
          document.body
        )}
    </section>
  );
};

export default GallerySection;
