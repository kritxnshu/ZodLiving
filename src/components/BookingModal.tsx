"use client";

import React, { useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomType?: string;
  isCompareMode?: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialRoomType = "2-Seater AC",
  isCompareMode = false,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    roomType: initialRoomType,
    preferredDate: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl p-8 sm:p-10 shadow-2xl my-8 text-slate-900 border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 hover:text-black transition-colors"
          aria-label="Close dialog"
        >
          ✕
        </button>

        {isCompareMode ? (
          /* Room Comparison Mode */
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-0.5 w-4 bg-gold rounded-full" />
              <span className="text-xs font-mono tracking-widest uppercase text-gold-deep font-semibold">
                ROOM COMPARISON
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0A1128]">
              Compare ZOD Living Suites
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Find the perfect balance of personal space, collaboration, and value.
            </p>

            <div className="mt-8 border border-slate-200 rounded-2xl overflow-hidden text-xs sm:text-sm">
              <div className="grid grid-cols-3 bg-slate-50 p-4 font-bold text-slate-900 border-b border-slate-200">
                <div>Feature</div>
                <div className="text-center text-gold-deep">2-Seater Premium</div>
                <div className="text-center text-[#0A1128]">3-Seater Classic</div>
              </div>

              {[
                { label: "Price (AC)", v1: "₹1,65,000 / session", v2: "₹1,50,000 / session" },
                { label: "Price (Non-AC)", v1: "₹1,50,000 / session", v2: "₹1,35,000 / session" },
                { label: "Pricing Basis", v1: "Per College Session", v2: "Per College Session" },
                { label: "Occupancy", v1: "2 Students", v2: "3 Students" },
                { label: "Bed Type", v1: "Single Wooden Beds", v2: "Single Wooden Beds" },
                { label: "Study Desk", v1: "Dual Stations + Task Lighting", v2: "Triple Focus Stations" },
                { label: "Washroom", v1: "Attached Ensuite Western", v2: "Attached Ensuite Western" },
                { label: "Meals Included", v1: "4 Fresh Daily Meals", v2: "4 Fresh Daily Meals" },
                { label: "Wi-Fi Access", v1: "High-Speed Wi-Fi", v2: "High-Speed Wi-Fi" },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 p-3.5 border-b border-slate-100 items-center ${
                    i % 2 === 1 ? "bg-slate-50/50" : ""
                  }`}
                >
                  <div className="font-medium text-slate-700">{row.label}</div>
                  <div className="text-center text-slate-900 font-semibold">{row.v1}</div>
                  <div className="text-center text-slate-900 font-semibold">{row.v2}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-gold text-slate-950 font-semibold text-xs font-mono uppercase tracking-wider hover:bg-gold-light"
              >
                Close Comparison
              </button>
            </div>
          </div>
        ) : formSubmitted ? (
          /* Confirmation Success State */
          <div className="text-center py-10">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 text-2xl font-bold mb-4">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Visit Request Confirmed
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
              Thank you, {formData.name || "Guest"}. Our admissions team will
              contact you on {formData.phone} shortly via WhatsApp / call to confirm
              your visiting schedule.
            </p>
            <div className="mt-8">
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full bg-gold text-slate-950 font-semibold text-xs font-mono uppercase tracking-wider hover:bg-gold-light"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking / Tour Reservation Form */
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-0.5 w-4 bg-gold rounded-full" />
              <span className="text-xs font-mono tracking-widest uppercase text-gold-deep font-semibold">
                SCHEDULE A TOUR
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0A1128]">
              Book Your Visit to ZOD Living
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Visit Knowledge Park III to experience our student suites, dining mess, and lounges in person.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-gold-deep focus:ring-4 focus:ring-gold/15"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 uppercase mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-gold-deep focus:ring-4 focus:ring-gold/15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 uppercase mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="aryan@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-gold-deep focus:ring-4 focus:ring-gold/15"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 uppercase mb-1.5">
                    Preferred Room
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-gold-deep focus:ring-4 focus:ring-gold/15 bg-white text-slate-900"
                  >
                    <option value="2-Seater AC">2-Seater AC — ₹1,65,000 / session</option>
                    <option value="2-Seater Non-AC">2-Seater Non-AC — ₹1,50,000 / session</option>
                    <option value="3-Seater AC">3-Seater AC — ₹1,50,000 / session</option>
                    <option value="3-Seater Non-AC">3-Seater Non-AC — ₹1,35,000 / session</option>
                    <option value="Flexible / Open to any option">Flexible / Open to any option</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 uppercase mb-1.5">
                  Preferred Visit Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-gold-deep focus:ring-4 focus:ring-gold/15"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 uppercase mb-1.5">
                  Questions or College Details
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Enquiring for B.Tech admission at GL Bajaj / Bennett..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-gold-deep focus:ring-4 focus:ring-gold/15 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 text-xs font-mono uppercase tracking-wider hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-gold hover:bg-gold-light text-slate-950 text-xs font-mono uppercase tracking-widest font-semibold transition-all shadow-md"
                >
                  Submit Booking Request →
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
