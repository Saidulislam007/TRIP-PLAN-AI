"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Tags,
  X,
  Plane,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/moderator",
    icon: LayoutDashboard,
  },
  {
    name: "Travel Categories",
    href: "/moderator/travel-categories",
    icon: Tags,
  },
];

export default function ModeratorSidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}


<aside
  className={`fixed inset-y-5 left-0 z-40 flex h-screen w-64 shrink-0 flex-col bg-[#004D40] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>

        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link
            href="/moderator"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Plane size={22} />
            </div>

            <div>
              <h1 className="text-lg font-semibold">
                TripPlan AI
              </h1>

              <p className="text-xs text-white/60">
                Moderator Panel
              </p>
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">
            Management
          </p>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/moderator"
                  ? pathname === "/moderator"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-white text-[#004D40] shadow-sm"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={19} />

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 px-4 py-3">
            <p className="text-xs text-white/50">
              Moderator Access
            </p>

            <p className="mt-1 text-sm font-medium text-white">
              Content Management
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}