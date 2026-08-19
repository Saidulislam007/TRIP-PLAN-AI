"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Map,
  MapPin,
  FolderKanban,
  Star,
  BarChart3,
  ShieldCheck,
  Settings,
  LogOut,
  Globe2,
  Bell,
  Rocket,
  ChevronRight,
} from "lucide-react";

const mainMenuItems = [
  {
    name: "Dashboard",
    href: "/admin-panel",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    href: "/admin-panel/users",
    icon: Users,
  },
  {
    name: "Destinations",
    href: "/admin-panel/destinations",
    icon: MapPin,
  },
  {
    name: "Categories",
    href: "/admin-panel/categories",
    icon: FolderKanban,
  },
  {
    name: "Reviews",
    href: "/admin-panel/reviews",
    icon: Star,
  },
  {
    name: "Trips",
    href: "/admin-panel/trips",
    icon: Map,
  },
  {
    name: "Analytics",
    href: "/admin-panel/analytics",
    icon: BarChart3,
  },
  {
    name: "Moderation",
    href: "/admin-panel/moderation",
    icon: ShieldCheck,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  // Check active menu
  const isActive = (href) => {
    if (href === "/admin-panel") {
      return pathname === "/admin-panel";
    }

    return pathname.startsWith(href);
  };

  return (
    <aside
      className="
        fixed left-0 top-0 z-50
        flex h-screen w-[236px] flex-col
        overflow-hidden
        bg-[#004D40]
        text-white
      "
    >
      {/* ========================================= */}
      {/* ADMIN PROFILE */}
      {/* ========================================= */}

      <div className="px-5 pt-6 pb-5">
        <div className="flex flex-col items-center text-center">

          {/* Avatar */}
          <div
            className="
              relative flex h-[66px] w-[66px]
              items-center justify-center
              overflow-hidden rounded-full
              border-[3px] border-[#27B889]
              bg-[#0B2522]
              shadow-md
            "
          >
            {/* Later you can use actual image here */}
            <span className="text-xl font-bold text-white">
              A
            </span>

            {/* Online indicator */}
            <span
              className="
                absolute bottom-0 right-0
                h-4 w-4 rounded-full
                border-[3px] border-[#004D40]
                bg-[#20C878]
              "
            />
          </div>

          <h2 className="mt-3 text-[15px] font-bold text-white">
            Admin
          </h2>

          <p className="mt-0.5 text-[12px] text-[#B8D5CC]">
            Super Admin
          </p>

          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#20C878]" />

            <span className="text-[11px] text-[#A9CFC3]">
              Online
            </span>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* NAVIGATION */}
      {/* ========================================= */}

      <nav className="flex-1 overflow-y-auto px-3 pb-4">

        {/* ================= MAIN MENU ================= */}

        <div>
          <p
            className="
              mb-2 px-3
              text-[10px] font-semibold
              uppercase tracking-[0.14em]
              text-[#91B9AE]
            "
          >
            Main Menu
          </p>

          <div className="space-y-1">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group relative
                    flex items-center gap-3
                    rounded-[10px]
                    px-3 py-[9px]
                    text-[13px] font-medium
                    transition-all duration-200

                    ${
                      active
                        ? "bg-[#16A875] text-white shadow-sm"
                        : "text-[#D0E2DD] hover:bg-[#0A6254] hover:text-white"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    strokeWidth={active ? 2.2 : 1.8}
                    className={`
                      shrink-0 transition-all duration-200
                      ${
                        active
                          ? "text-white"
                          : "text-[#A9C9C0] group-hover:text-white"
                      }
                    `}
                  />

                  <span>{item.name}</span>

                  {/* Active indicator */}
                  {active && (
                    <span
                      className="
                        absolute right-3
                        h-1.5 w-1.5
                        rounded-full
                        bg-white
                      "
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ================= QUICK LINKS ================= */}

        <div className="mt-7">
          <p
            className="
              mb-2 px-3
              text-[10px] font-semibold
              uppercase tracking-[0.14em]
              text-[#91B9AE]
            "
          >
            Quick Links
          </p>

          <div className="space-y-1">

            {/* Visit Website */}

            <Link
              href="/"
              className="
                group flex items-center gap-3
                rounded-[10px]
                px-3 py-[9px]
                text-[13px] font-medium
                text-[#D0E2DD]
                transition-all duration-200
                hover:bg-[#0A6254]
                hover:text-white
              "
            >
              <Globe2
                size={18}
                strokeWidth={1.8}
                className="
                  text-[#A9C9C0]
                  transition-colors
                  group-hover:text-white
                "
              />

              <span>Visit Website</span>
            </Link>

            {/* Notifications */}

            <Link
              href="/admin-panel/notifications"
              className="
                group flex items-center gap-3
                rounded-[10px]
                px-3 py-[9px]
                text-[13px] font-medium
                text-[#D0E2DD]
                transition-all duration-200
                hover:bg-[#0A6254]
                hover:text-white
              "
            >
              <Bell
                size={18}
                strokeWidth={1.8}
                className="
                  text-[#A9C9C0]
                  transition-colors
                  group-hover:text-white
                "
              />

              <span>Notifications</span>

              {/* Notification badge */}
              <span
                className="
                  ml-auto
                  flex h-5 min-w-5
                  items-center justify-center
                  rounded-full
                  bg-[#F4A62A]
                  px-1
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                5
              </span>
            </Link>
          </div>
        </div>

        {/* ================= ACCOUNT ================= */}

        <div className="mt-7">
          <p
            className="
              mb-2 px-3
              text-[10px] font-semibold
              uppercase tracking-[0.14em]
              text-[#91B9AE]
            "
          >
            Account
          </p>

          <div className="space-y-1">

            {/* Profile */}

            <Link
              href="/admin-panel/profile"
              className={`
                group flex items-center gap-3
                rounded-[10px]
                px-3 py-[9px]
                text-[13px] font-medium
                transition-all duration-200

                ${
                  isActive("/admin-panel/profile")
                    ? "bg-[#16A875] text-white"
                    : "text-[#D0E2DD] hover:bg-[#0A6254] hover:text-white"
                }
              `}
            >
              <Users
                size={18}
                strokeWidth={1.8}
                className={
                  isActive("/admin-panel/profile")
                    ? "text-white"
                    : "text-[#A9C9C0] group-hover:text-white"
                }
              />

              <span>Profile</span>
            </Link>

            {/* Settings */}

            <Link
              href="/admin-panel/settings"
              className={`
                group flex items-center gap-3
                rounded-[10px]
                px-3 py-[9px]
                text-[13px] font-medium
                transition-all duration-200

                ${
                  isActive("/admin-panel/settings")
                    ? "bg-[#16A875] text-white"
                    : "text-[#D0E2DD] hover:bg-[#0A6254] hover:text-white"
                }
              `}
            >
              <Settings
                size={18}
                strokeWidth={1.8}
                className={
                  isActive("/admin-panel/settings")
                    ? "text-white"
                    : "text-[#A9C9C0] group-hover:text-white"
                }
              />

              <span>Settings</span>
            </Link>

            {/* Logout */}

            <button
              type="button"
              className="
                group flex w-full
                items-center gap-3
                rounded-[10px]
                px-3 py-[9px]
                text-[13px] font-medium
                text-[#D0E2DD]
                transition-all duration-200
                hover:bg-red-500/15
                hover:text-red-300
              "
            >
              <LogOut
                size={18}
                strokeWidth={1.8}
                className="
                  text-[#A9C9C0]
                  transition-all duration-200
                  group-hover:-translate-x-0.5
                  group-hover:text-red-300
                "
              />

              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================= */}
      {/* UPGRADE CARD */}
      {/* ========================================= */}

      <div className="px-3 pb-3">
        <div
          className="
            relative overflow-hidden
            rounded-[15px]
            border border-[#36B994]/30
            bg-gradient-to-br
            from-[#087F5B]
            to-[#00695C]
            p-4
            shadow-lg
          "
        >
          {/* Decorative circle */}
          <div
            className="
              absolute -right-7 -top-7
              h-20 w-20
              rounded-full
              bg-white/10
            "
          />

          <div className="relative">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[12px] font-bold text-white">
                Upgrade to Pro Plan
              </p>

              <Rocket
                size={21}
                strokeWidth={1.8}
                className="text-[#C8F2E5]"
              />
            </div>

            <p className="mb-3 text-[10px] leading-4 text-[#C7E8DE]">
              Get advanced analytics and priority support.
            </p>

            <button
              type="button"
              className="
                flex w-full
                items-center justify-center
                gap-1.5
                rounded-lg
                bg-white
                px-3 py-2
                text-[11px]
                font-bold
                text-[#087F5B]
                transition-all duration-200
                hover:bg-[#EAF8F3]
                hover:shadow-md
              "
            >
              Upgrade Now
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* BRAND FOOTER */}
      {/* ========================================= */}

      <div className="border-t border-white/10 px-5 py-3">
        <p className="text-[11px] font-bold text-white">
          TRIP PLAN AI
        </p>

        <p className="text-[9px] text-[#8EB8AC]">
          Plan Smarter. Travel Better.
        </p>
      </div>
    </aside>
  );
}