"use client";

import React from "react";
import Link from "next/link";
import { PROPERTY_CONFIG } from "@/lib/contact-config";

const WHATSAPP_TEXT = "Hi ZOD Living, I'd like to know about room availability and book a visit.";

const ACTION_CLASS =
  "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors";

const Icon: React.FC<{ d: string }> = ({ d }) => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

// Heroicons (MIT): chat bubble, phone, calendar
const CHAT_ICON =
  "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z";
const PHONE_ICON =
  "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z";
const CALENDAR_ICON =
  "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5";

interface MobileActionBarProps {
  visible: boolean;
  /** Opens the booking dialog where the page has one; otherwise "Book Visit" links to /contact. */
  onOpenBooking?: () => void;
}

/** Phone-only bar pinned to the bottom of the screen with the three ways to get in touch. */
export const MobileActionBar: React.FC<MobileActionBarProps> = ({ visible, onOpenBooking }) => {
  const bookClass = `${ACTION_CLASS} bg-gold text-[#0A1128] hover:bg-gold-light`;

  return (
    <div
      inert={!visible}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <nav
        aria-label="Quick contact"
        className="flex gap-1.5 rounded-3xl border border-white/10 bg-[#0A0F1D]/90 p-1.5 shadow-[0_-8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
      >
        <a
          href={`https://wa.me/${PROPERTY_CONFIG.whatsappRaw}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${ACTION_CLASS} text-emerald-300 hover:bg-white/5`}
        >
          <Icon d={CHAT_ICON} />
          WhatsApp
        </a>
        <a href={`tel:${PROPERTY_CONFIG.phoneRaw}`} className={`${ACTION_CLASS} text-white hover:bg-white/5`}>
          <Icon d={PHONE_ICON} />
          Call
        </a>
        {onOpenBooking ? (
          <button type="button" onClick={onOpenBooking} className={bookClass}>
            <Icon d={CALENDAR_ICON} />
            Book Visit
          </button>
        ) : (
          <Link href="/contact" className={bookClass}>
            <Icon d={CALENDAR_ICON} />
            Book Visit
          </Link>
        )}
      </nav>
    </div>
  );
};

export default MobileActionBar;
