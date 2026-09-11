"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, Bell, Heart, Menu, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUnreadCount } from "@/lib/api/notifications";

import { useSession } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const pathname = usePathname();
  const userdata = useSession();
  const user = userdata?.data?.user;

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user?.id) {
      // Initial fetch
      fetchUnreadCount(user.id)
        .then(count => setUnreadCount(count))
        .catch(err => console.error("Failed to fetch unread count:", err));
      
      // Poll every 30 seconds for new notifications
      const interval = setInterval(() => {
        fetchUnreadCount(user.id)
          .then(count => setUnreadCount(count))
          .catch(err => console.error("Failed to fetch unread count:", err));
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [user?.id, pathname]); // Re-fetch on pathname change (e.g. going back from notifications page)

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-[#F7F7F2] px-6 lg:px-10 border-b border-gray-200/50">
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center gap-4 flex-1">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-[#17211D] hover:bg-[#E2E7E3] lg:hidden"
        >
          <Menu size={24} />
        </button>
        <div className="hidden sm:flex items-center gap-2 text-[15px] font-bold tracking-wide">
          <span className="text-[#F4A934]">Dashboard</span>
          <span className="text-[#66736D] font-medium">/</span>
          <span className="text-[#17211D]">Overview</span>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex justify-center flex-1">
        <div className="relative flex items-center w-full max-w-[360px]">
          <Search className="absolute left-3.5 text-[#66736D]" size={16} />
          <input
            type="text"
            placeholder="Search trips, destinations..."
            className="h-10 w-full rounded-full border border-[#E2E7E3] bg-white pl-10 pr-4 text-[13px] text-[#17211D] placeholder:text-[#66736D] focus:border-[#F4A934] focus:outline-none focus:ring-1 focus:ring-[#F4A934] transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center justify-end gap-3 sm:gap-4 flex-1">
        {/* Action Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/dashboard/notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#17211D] transition-colors hover:bg-black/5">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F4A934] text-[9px] font-bold text-[#17211D] ring-2 ring-[#F7F7F2] animate-pulse">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Link>
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-[#17211D] transition-colors hover:bg-black/5">
            <Heart size={20} />
          </button>
        </div>

        {/* User Avatar Pill */}
        <div className="flex items-center gap-2.5 cursor-pointer transition-all hover:bg-[#D5DBD8] bg-[#E2E7E3] px-1.5 py-1.5 rounded-full border border-gray-200/50 shadow-sm ml-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white">
            <Avatar className="h-full w-full shrink-0">
              <Avatar.Image
                alt={user?.name}
                src={user?.image ?? undefined}
              />
              <Avatar.Fallback className="bg-white text-[#17211D] font-bold text-sm w-full h-full flex items-center justify-center">
                {user?.name ? user.name.charAt(0) : 'U'}
              </Avatar.Fallback>
            </Avatar>
          </div>
          <span className="text-[14px] font-bold text-[#17211D] hidden lg:block pr-1">
            {user?.name || "User"}
          </span>
          <ChevronDown size={16} className="text-[#66736D] mr-2 hidden lg:block" />
        </div>
      </div>
    </header>
  );
}
