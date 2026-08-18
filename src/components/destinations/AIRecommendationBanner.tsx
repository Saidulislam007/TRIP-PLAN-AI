"use client";

import { Sparkles, Umbrella, Mountain, Users, Wallet, Leaf, Heart } from "lucide-react";

export default function AIRecommendationBanner() {
  const preferences = [
    { label: "Beach", icon: <Umbrella size={14} /> },
    { label: "Adventure", icon: <Mountain size={14} /> },
    { label: "Family", icon: <Users size={14} /> },
    { label: "Budget", icon: <Wallet size={14} /> },
    { label: "Nature", icon: <Leaf size={14} /> },
    { label: "Romantic", icon: <Heart size={14} /> },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pt-8">
      <div className="bg-[#F8FAF9] border border-[#E4EBE7] rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_4px_20px_rgba(23,33,29,0.02)]">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-xl sm:text-2xl lg:text-[22px] font-bold text-[#17211D] mb-1">
            Not Sure Where to Go?
          </h2>
          <p className="text-[13px] text-[#52615A] font-medium max-w-2xl">
            Tell us what you love, and <span className="font-bold text-[#17211D]">TRIP PLAN AI</span> will find destinations that fit you.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
          {preferences.map((pref) => (
            <button
              key={pref.label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E4EBE7] bg-white text-[#52615A] text-[13px] font-bold hover:border-[#087F5B] hover:text-[#087F5B] transition-colors shadow-sm"
            >
              {pref.icon}
              {pref.label}
            </button>
          ))}

          <button
            type="button"
            className="flex items-center gap-2 bg-[#087F5B] hover:bg-[#065F46] text-white px-5 py-2.5 rounded-lg font-bold text-[13px] shadow-sm transition-colors ml-2"
          >
            <Sparkles size={16} className="text-[#F4A62A]" />
            Find My Perfect Destination
          </button>
        </div>
      </div>
    </div>
  );
}
