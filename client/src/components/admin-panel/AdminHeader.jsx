
"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  Menu,
  X,
  Command,
  ChevronDown,
} from "lucide-react";

const backgroundImage =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=80";

export default function AdminHeader({ onMenuClick }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="relative z-30 h-[76px] overflow-hidden border-b border-[#DCE9E5] bg-[#0B2522] lg:hidden">
      {/* Background Image */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={backgroundImage}
          alt=""
          className="h-full w-full scale-110 object-cover blur-[7px]"
        />
      </div>

      {/* Dark Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[#071815]/80 lg:hidden" />

      {/* Green Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#071815_0%,rgba(7,24,21,0.88)_45%,rgba(8,127,91,0.28)_100%)] lg:hidden" />

      {/* Glow */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-[#087F5B]/20 blur-3xl lg:hidden" />

      {/* Header Content */}
      <div className="relative z-10 flex h-full items-center justify-between px-4 sm:px-6 lg:hidden">

        {/* LEFT - Mobile Menu Only */}
        <div className="flex items-center ">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:border-[#F4B942]/50 hover:bg-white/15 hover:text-[#F4B942] lg:hidden"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <div className="flex h-11 w-[250px] items-center rounded-xl border border-white/15 bg-white/10 px-3 shadow-lg backdrop-blur-md transition-all duration-200 focus-within:border-[#F4B942]/50 focus-within:bg-white/15 lg:w-[290px]">

              <Search
                size={17}
                strokeWidth={2}
                className="shrink-0 text-[#F4B942]"
              />

              <input
                type="text"
                placeholder="Search anything..."
                className="min-w-0 flex-1 bg-transparent px-2.5 text-sm text-white outline-none placeholder:text-white/45"
              />

              <div className="hidden items-center gap-1 rounded-md border border-white/15 bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white/45 lg:flex">
                <Command size={10} />
                <span>K</span>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:border-[#F4B942]/50 hover:bg-white/15 hover:text-[#F4B942] md:hidden"
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all duration-200 hover:border-[#F4B942]/50 hover:bg-white/15 hover:text-[#F4B942]"
          >
            <Bell
              size={19}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:-rotate-6"
            />

            <span className="absolute right-[7px] top-[6px] h-2 w-2 rounded-full bg-[#F4B942] ring-2 ring-[#17352F]" />
          </button>

          {/* Divider */}
          <div className="mx-1 hidden h-8 w-px bg-white/15 sm:block" />

          {/* Admin Profile */}
          <button
            type="button"
            className="group flex items-center gap-2 rounded-xl px-1.5 py-1.5 transition-all duration-200 hover:bg-white/10 sm:gap-3"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#087F5B] text-sm font-bold text-white shadow-lg">
                A
              </div>

              {/* Online Status */}
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#17352F] bg-[#4ADE80]" />
            </div>

            {/* Admin Info - Desktop/Tablet */}
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold leading-4 text-white">
                Admin
              </p>

              <p className="mt-1 text-[11px] font-medium text-white/50">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={15}
              className="hidden text-white/45 transition-colors duration-200 group-hover:text-[#F4B942] sm:block"
            />
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {searchOpen && (
        <div className="absolute left-0 right-0 top-[76px] z-50 border-b border-white/10 bg-[#071815]/95 px-4 py-3 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="flex h-11 items-center rounded-xl border border-white/15 bg-white/10 px-3 focus-within:border-[#F4B942]/50">
            <Search
              size={17}
              className="shrink-0 text-[#F4B942]"
            />

            <input
              autoFocus
              type="text"
              placeholder="Search anything..."
              className="w-full bg-transparent px-2.5 text-sm text-white outline-none placeholder:text-white/40"
            />
          </div>
        </div>
      )}
    </header>
  );
}