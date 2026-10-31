"use client";

import React from "react";

export const PhilosophySection: React.FC = () => {
  return (
    <section
      id="philosophy"
      data-alias="hospitality"
      // Rises over the end of the hero as a rounded sheet (the hero leaves a strip of black for it)
      className="relative z-10 -mt-10 w-full rounded-t-[2.5rem] py-24 sm:py-28 px-6 sm:px-12 lg:px-20 bg-[#FAF9F5] shadow-[0_-24px_60px_rgba(0,0,0,0.45)]"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px)
        `,
        backgroundSize: "44px 44px",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Eyebrow + Main Heading */}
          <div className="lg:col-span-5" data-reveal>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-0.5 w-4 bg-gold rounded-full" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-deep font-semibold">
                OUR PHILOSOPHY
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#0A1128] leading-[1.12]">
              A Better Kind of Everyday.
            </h2>
          </div>

          {/* Right Column: Narrative + Key Metrics */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-5 text-base sm:text-[17px] text-[#475569] leading-relaxed font-normal" data-reveal>
              <p>
                Moving away for university shouldn&apos;t mean compromising on comfort,
                focus, or peace of mind. ZOD LIVING is built on an architectural
                philosophy: intentional spaces with natural light, ergonomic personal
                study desks, wholesome food, and genuine respect for your privacy.
              </p>
              <p className="text-sm sm:text-base text-[#64748B]">
                Whether you are preparing for exams in quiet comfort, connecting with peers in the
                lounge, or coming back to a clean, air-conditioned room with an attached bath,
                everything here is built to help you thrive.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200/80 my-10" />

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-6 pt-1" data-reveal-stagger>
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1128] tracking-tight">
                  100%
                </div>
                <div className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-[#64748B] uppercase mt-2">
                  Attached Ensuite Baths
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gold-deep tracking-tight">
                  4 Meals
                </div>
                <div className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-[#64748B] uppercase mt-2">
                  Fresh Daily Dining
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1128] tracking-tight">
                  24/7
                </div>
                <div className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-[#64748B] uppercase mt-2">
                  Power & Biometric Security
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
