
"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import ModeratorSidebar from "@/components/moderators/ModeratorSidebar";

export default function ModeratorLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F8F6] pt-[80px] lg:pt-0">
      {/* Sidebar */}
      <ModeratorSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        
        {/* Mobile Header */}
        <div className="sticky top-0 z-30 flex h-16 items-center border-b border-[#DCE9E3]  px-4 shadow-sm backdrop-blur lg:hidden bg-green-900">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition hover:bg-gray-500 cursor-pointer"
            aria-label="Open moderator menu"
          >
            <Menu size={22} />
          </button>

          <div className="ml-3">
            <h1 className="text-sm font-semibold text-white">
              Moderator Panel
            </h1>

            <p className="text-[11px] text-gray-300">
              TripPlan AI
            </p>
          </div>
        </div>

        {/* Page Content */}
        <main className="pt-0">
          {children}
        </main>

      </div>
    </div>
  );
}
