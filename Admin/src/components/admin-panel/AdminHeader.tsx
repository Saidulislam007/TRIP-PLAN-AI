"use client";

import {
  Bell,
  Search,
  Menu,
} from "lucide-react";

export default function AdminHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-green-100 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">

      {/* Left Side */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-gray-600 transition-colors hover:bg-green-50 hover:text-green-600 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Page Title */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Dashboard
          </h2>

          <p className="hidden text-sm text-gray-500 sm:block">
            Manage your TripPlan AI platform
          </p>
        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Search */}
        <div className="hidden items-center rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 md:flex">
          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-36 bg-transparent px-2 text-sm text-gray-700 outline-none placeholder:text-gray-400 lg:w-48"
          />
        </div>

        {/* Notification */}
        <button
          className="relative rounded-xl p-2.5 text-gray-500 transition-colors hover:bg-green-50 hover:text-green-600"
        >
          <Bell size={20} />

          {/* Notification Dot */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-green-600 ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

        {/* Profile */}
        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}