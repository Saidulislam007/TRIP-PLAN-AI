"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Map,
  Compass,
  Heart,
  Wallet,
  CalendarDays,
  UserCircle,
  BookOpen,
  Bell,
  HelpCircle,
  Settings,
  Plus,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { dashboardData } from "@/data/dashboardData";
import { useSession } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";

const navigation = [
  {
    section: "OVERVIEW",
    items: [
      { name: "Overview", href: "/dashboard", icon: Home },
    ],
  },
  {
    section: "TRAVEL",
    items: [
      { name: "My Trips", href: "/dashboard/trips", icon: Map },
      { name: "Plan a Trip", href: "/plan-trip", icon: Compass },
      { name: "Saved", href: "/dashboard/saved", icon: Heart },
      { name: "Budget Tracker", href: "/dashboard/budget", icon: Wallet },
      { name: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
    ],
  },
  {
    section: "PERSONAL",
    items: [
      { name: "Travel Profile", href: "/dashboard/profile", icon: UserCircle },
      { name: "My Stories", href: "/dashboard/stories", icon: BookOpen },
      { name: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: 3 },
    ],
  },
  {
    section: "MORE",
    items: [
      { name: "Help Center", href: "/dashboard/help", icon: HelpCircle },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const userdata = useSession();
  console.log(userdata);
  const user = userdata?.data?.user;
  console.log(user);

  return (
    <div className="flex h-full w-full flex-col bg-[#04271C] text-white">
      {/* Logo & Brand */}
      <div className="p-6 pb-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
            <Sparkles size={18} className="text-[#04271C]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-serif tracking-wide leading-tight">
              TripPlan <span className="text-[#F4A934]">AI</span>
            </span>
            <span className="text-[10px] text-white/60 tracking-wider">
              Plan Smarter. Travel Better.
            </span>
          </div>
        </Link>
      </div>

      {/* Main CTA */}
      <div className="px-5 mb-6">
        <Link
          href="/plan-trip"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4A934] py-3 text-[13px] font-bold text-[#17211D] transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={16} />
          Plan a New Trip ✨
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
        {navigation.map((group, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="mb-2 px-3 text-[10px] font-bold tracking-widest text-white/50 uppercase">
              {group.section}
            </h3>
            <nav className="flex flex-col gap-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${isActive
                      ? "bg-[#0B3D2E] text-white"
                      : "text-white/70 hover:bg-[#0A382A]/50 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        size={18}
                        className={`${isActive ? "text-white" : "text-white/50 group-hover:text-white/80"
                          }`}
                      />
                      {item.name}
                    </div>
                    {item.badge && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F4A934] text-[10px] font-bold text-[#17211D]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* User Footer */}
      <div className="p-4">
        <div className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-[#0B3D2E] p-3 transition-colors hover:bg-[#0A382A]">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#04271C]">
              <Avatar className="h-9 w-9 shrink-0">
                <Avatar.Image
                  alt={user?.name}
                  src={user?.image ?? undefined}
                />
                <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
              </Avatar>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-white">
                {dashboardData.user.name}
              </span>
              <span className="text-[11px] text-white/60">
                {dashboardData.user.role}
              </span>
            </div>
          </div>
          <ChevronDown size={16} className="text-white/60" />
        </div>
      </div>
    </div>
  );
}
