"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { Search, Bell, Heart, Menu } from "lucide-react";
import { dashboardData } from "@/data/dashboardData";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const pathname = usePathname();

  // Very basic breadcrumb generation based on route
  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    if (paths.length === 0 || paths[0] !== "dashboard") return "Dashboard / Overview";
    
    const pageName = paths[1] 
      ? paths[1].charAt(0).toUpperCase() + paths[1].slice(1) 
      : "Overview";
      
    return `Dashboard / ${pageName}`;
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-[#F7F7F2] px-6 lg:px-10">
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[#17211D] hover:bg-[#E2E7E3] lg:hidden"
        >
          <Menu size={24} />
        </button>
        <div className="hidden sm:flex text-[13px] font-medium text-[#17211D]">
          {getBreadcrumbs()}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3.5 text-[#66736D]" size={16} />
          <input
            type="text"
            placeholder="Search trips, destinations..."
            className="h-10 w-[240px] rounded-full border border-[#E2E7E3] bg-white pl-10 pr-4 text-[13px] text-[#17211D] placeholder:text-[#66736D] focus:border-[#F4A934] focus:outline-none focus:ring-1 focus:ring-[#F4A934] transition-all"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#17211D] transition-colors hover:bg-black/5">
            <Bell size={20} />
            {dashboardData.stats.upcomingTrips.count > 0 && (
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#F4A934] ring-2 ring-[#F7F7F2]" />
            )}
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#17211D] transition-colors hover:bg-black/5">
            <Heart size={20} />
          </button>
        </div>

        {/* User Avatar */}
        <div className="relative h-9 w-9 cursor-pointer overflow-hidden rounded-full ring-2 ring-transparent transition-all hover:ring-[#F4A934]">
          <img
            src={dashboardData.user.avatar}
            alt={dashboardData.user.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Rifat+Ahmed&background=073D31&color=fff";
            }}
          />
        </div>
      </div>
    </header>
  );
}
