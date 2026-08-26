"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { Search, Bell, Heart, Menu, ChevronDown } from "lucide-react";
import { dashboardData } from "@/data/dashboardData";
import { useSession } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const pathname = usePathname();
  const userdata = useSession();
  console.log(userdata);
  const user = userdata?.data?.user;
  console.log(user);

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
        <div className="hidden sm:flex items-center gap-1.5 text-[12px] font-medium">
          <span className="text-[#F4A934]">Dashboard</span>
          <span className="text-[#66736D]">/</span>
          <span className="text-[#17211D]">Overview</span>
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
        <div className="flex items-center gap-2">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#17211D] transition-colors hover:bg-black/5">
            <Bell size={20} />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F4A934] text-[9px] font-bold text-[#17211D] ring-2 ring-[#F7F7F2]">
              3
            </span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#17211D] transition-colors hover:bg-black/5">
            <Heart size={20} />
          </button>
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 cursor-pointer transition-all hover:opacity-80">
          <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-transparent">
            <Avatar className="h-9 w-9 shrink-0">
              <Avatar.Image
                alt={user?.name}
                src={user?.image ?? undefined}
              />
              <Avatar.Fallback>{user?.name ? user.name.charAt(0) : 'U'}</Avatar.Fallback>
            </Avatar>
          </div>
          <ChevronDown size={14} className="text-[#17211D]" />
        </div>
      </div>
    </header>
  );
}
