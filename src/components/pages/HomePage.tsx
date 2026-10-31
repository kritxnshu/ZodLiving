"use client";

import React, { useState } from "react";
import { CinematicScrollCanvas } from "@/components/CinematicScrollCanvas";
import { Header } from "@/components/Header";
import { PhilosophySection } from "@/components/PhilosophySection";
import { AccommodationSection } from "@/components/AccommodationSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { GallerySection } from "@/components/GallerySection";
import { LocationSection } from "@/components/LocationSection";
import { FooterCTASection } from "@/components/FooterCTASection";
import { FaqSection } from "@/components/FaqSection";
import { BookingModal } from "@/components/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("2-Seater Premium Ensuite");

  const openBooking = (roomType = "2-Seater Premium Ensuite") => {
    setSelectedRoom(roomType);
    setIsCompareOpen(false);
    setIsBookingOpen(true);
  };

  const openCompare = () => {
    setIsCompareOpen(true);
    setIsBookingOpen(true);
  };

  const scrollToSection = (id: string) => {
    if (id === "top" || id === "experience") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el =
      document.getElementById(id) ||
      (id === "room" ? document.getElementById("suites") : null) ||
      (id === "hospitality" ? document.getElementById("philosophy") : null) ||
      (id === "philosophy" ? document.getElementById("hospitality") : null);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#FAF9F5] text-slate-900">
      {/* 1. Global Navigation Bar */}
      <Header
        onNavigate={scrollToSection}
        onOpenBooking={() => openBooking()}
      />

      {/* 2. Hero: Cinematic Scroll-Controlled Canvas Experience (Preserved strictly) */}
      <CinematicScrollCanvas
        onExploreMore={() => scrollToSection("philosophy")}
      />

      {/* 3. Section 1 — Our Philosophy */}
      <PhilosophySection />

      {/* 4. Section 2 — Accommodation / Rooms */}
      <AccommodationSection
        onOpenBooking={openBooking}
        onOpenCompare={openCompare}
      />

      {/* 5. Section 3 — Amenities */}
      <AmenitiesSection />

      {/* 6. Section 4 — Property Gallery */}
      <GallerySection />

      {/* 7. Section 5 — Location and Connectivity */}
      <LocationSection />

      {/* Common questions from students and parents */}
      <FaqSection />

      {/* 8. Section 6 — Final Call to Action and Footer */}
      <FooterCTASection
        onOpenBooking={() => openBooking()}
        onNavigate={scrollToSection}
      />

      {/* 9. Interactive Booking and Comparison Dialog */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        isCompareMode={isCompareOpen}
        initialRoomType={selectedRoom}
      />
    </div>
  );
}
