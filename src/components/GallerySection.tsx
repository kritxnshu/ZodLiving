"use client";

import React, { useState } from "react";
import Image from "next/image";

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryItems = [
    {
      src: "/frames/frame4/ezgif-frame-017.png",
      alt: "2-Seater Premium Ensuite Bedroom",
      title: "Double Sharing Suite",
      aspect: "large", // spans 2 cols / large on desktop
    },
    {
      src: "/frames/frame1/ezgif-frame-235.png",
      alt: "ZOD Living Lobby and Elevator",
      title: "Lobby & Reception",
      aspect: "wide",
    },
    {
      src: "/frames/frame4/ezgif-frame-237.png",
      alt: "3-Seater Classic Ensuite Study Stations",
      title: "Triple Study Pods",
      aspect: "standard",
    },
    {
      src: "/frames/frame2/ezgif-frame-199.png",
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

  return (
    <section
      id="gallery"
      className="relative z-10 w-full py-24 sm:py-28 px-6 sm:px-12 lg:px-20 bg-[#FAF9F5] border-t border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Title on Left, View Full Gallery Button on Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-0.5 w-4 bg-[#D97706] rounded-full" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#D97706] font-semibold">
                PROPERTY SHOWCASE
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0A1128]">
              Take a Look Around.
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-[#475569] font-normal leading-relaxed mt-4">
              Authentic photographs of our building, bedrooms, executive lounge,
              and dining mess.
            </p>
          </div>

          <button
            onClick={() => setSelectedImage(galleryItems[0].src)}
            className="self-start md:self-end px-6 py-2.5 rounded-full border border-slate-700 hover:border-slate-900 text-slate-800 hover:text-black text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
          >
            View Full Gallery & Tour
          </button>
        </div>

        {/* Asymmetric 5-Image Gallery Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* 1. Large Top-Left Feature Image (Double Room) */}
          <div
            onClick={() => setSelectedImage(galleryItems[0].src)}
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
            onClick={() => setSelectedImage(galleryItems[1].src)}
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
            onClick={() => setSelectedImage(galleryItems[2].src)}
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
            onClick={() => setSelectedImage(galleryItems[3].src)}
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
            onClick={() => setSelectedImage(galleryItems[4].src)}
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
        >
          <div className="relative max-w-5xl max-h-[85vh] w-full h-[600px]">
            <Image
              src={selectedImage}
              alt="Expanded gallery view"
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-3xl font-light hover:text-[#D97706] transition-colors"
            aria-label="Close lightbox"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
