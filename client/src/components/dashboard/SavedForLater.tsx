"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { dashboardData } from "@/data/dashboardData";

const tabs = ["Destinations", "Hotels", "Travel Styles", "Trips"];

export default function SavedForLater() {
  const [activeTab, setActiveTab] = useState("Destinations");
  const { savedForLater } = dashboardData;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E7E3] bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-[18px] font-bold text-[#17211D]">Saved for Later</h2>
        <Link
          href="/dashboard/saved"
          className="group flex items-center gap-1.5 text-[11px] font-bold text-[#087F5B] transition-colors hover:text-[#073D31]"
        >
          View All Saved <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex items-center gap-4 border-b border-[#E2E7E3]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-[11px] font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-[#087F5B] text-[#087F5B]"
                : "border-b-2 border-transparent text-[#66736D] hover:text-[#17211D]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        {activeTab === "Destinations" ? (
          savedForLater.slice(0, 4).map((item) => (
            <div key={item.id} className="group relative flex flex-col gap-1.5 cursor-pointer">
              <div className="relative h-24 w-full overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button className="absolute right-2 top-2 rounded-full p-1 text-white transition-colors hover:bg-white/20">
                  <Heart size={14} fill="currentColor" />
                </button>
              </div>
              <div>
                <p className="text-[12px] font-bold text-[#17211D] truncate">{item.name}</p>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-[#66736D] truncate">{item.region}</p>
                  <span className="text-[10px] font-bold text-[#F4A934]">{item.match}%</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-[12px] text-[#66736D]">
            No saved {activeTab.toLowerCase()} found.
          </div>
        )}
      </div>
    </div>
  );
}
