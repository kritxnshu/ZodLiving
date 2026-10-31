import React from "react";
import { FAQS } from "@/lib/faqs";

/** Accordion of common questions. Built on <details>, so it works without JavaScript. */
export const FaqSection: React.FC = () => (
  <section
    id="faq"
    className="relative z-10 w-full py-20 sm:py-28 px-6 sm:px-12 lg:px-20 bg-white border-t border-neutral-200/80"
  >
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10 sm:mb-14" data-reveal>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="h-0.5 w-4 bg-gold rounded-full" />
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-gold-deep font-semibold">
            COMMON QUESTIONS
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0A1128] leading-tight">
          Questions, Answered.
        </h2>
        <p className="text-sm sm:text-base text-[#475569] leading-relaxed mt-4">
          What students and parents ask us most about fees, rooms, food and visits.
        </p>
      </div>

      <div className="divide-y divide-slate-200 border-y border-slate-200" data-reveal-stagger>
        {FAQS.map((faq) => (
          <details key={faq.question} className="group py-5 sm:py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base sm:text-lg font-semibold text-[#0A1128] transition-colors hover:text-gold-deep [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 text-lg leading-none text-gold-deep transition-transform duration-300 group-open:rotate-45 group-open:border-gold"
              >
                +
              </span>
            </summary>
            <p className="mt-3 pr-10 sm:pr-14 text-sm sm:text-[15px] leading-relaxed text-slate-600">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FaqSection;
