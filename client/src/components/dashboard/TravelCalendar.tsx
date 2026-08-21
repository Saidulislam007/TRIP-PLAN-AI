import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function TravelCalendar() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E7E3] bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-[18px] font-bold text-[#17211D]">My Travel Calendar</h2>
        <Link
          href="/dashboard/calendar"
          className="group flex items-center gap-1.5 text-[11px] font-bold text-[#087F5B] transition-colors hover:text-[#073D31]"
        >
          View Calendar <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-6 flex h-full gap-6">
        {/* Left: Upcoming List */}
        <div className="flex flex-1 flex-col justify-center border-r border-[#E2E7E3] pr-4">
          <div className="relative flex flex-col gap-6">
            {/* Vertical Line */}
            <div className="absolute bottom-0 left-[21px] top-2 w-[1px] bg-[#E2E7E3]" />
            
            {/* Item 1 */}
            <div className="relative flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#66736D]">August</span>
                <span className="text-[20px] font-bold text-[#17211D] leading-none">24</span>
              </div>
              <div className="z-10 mt-2 h-2 w-2 rounded-full bg-[#F4A934] ring-4 ring-white" />
              <div className="flex flex-col pt-1">
                <span className="text-[13px] font-bold text-[#17211D]">Cox's Bazar</span>
                <span className="text-[11px] text-[#66736D]">3 Days</span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative flex items-start gap-4">
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#66736D]">September</span>
                <span className="text-[20px] font-bold text-[#17211D] leading-none">18</span>
              </div>
              <div className="z-10 mt-2 h-2 w-2 rounded-full bg-[#E2E7E3] ring-4 ring-white" />
              <div className="flex flex-col pt-1">
                <span className="text-[13px] font-bold text-[#17211D]">Sajek Valley</span>
                <span className="text-[11px] text-[#66736D]">3 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Mini Calendar */}
        <div className="flex flex-col w-[160px] justify-center">
          <div className="flex items-center justify-between mb-3">
            <button className="text-[#66736D] hover:text-[#17211D]"><ChevronLeft size={16} /></button>
            <span className="text-[11px] font-bold text-[#17211D]">August 2026</span>
            <button className="text-[#66736D] hover:text-[#17211D]"><ChevronRight size={16} /></button>
          </div>
          
          <div className="grid grid-cols-7 gap-y-1.5 text-center">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
              <span key={day} className="text-[9px] font-bold text-[#66736D]">{day}</span>
            ))}
            
            {/* Empty days padding */}
            <span className="text-[10px] text-transparent">0</span>
            <span className="text-[10px] text-transparent">0</span>
            <span className="text-[10px] text-transparent">0</span>
            <span className="text-[10px] text-transparent">0</span>
            <span className="text-[10px] text-transparent">0</span>
            
            {/* Days 1-31 */}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
              const isTripDate = date >= 24 && date <= 26;
              const isStart = date === 24;
              return (
                <div key={date} className="relative flex h-6 w-full items-center justify-center">
                  {isTripDate && (
                    <div className={`absolute inset-y-0 w-full bg-[#087F5B]/10 ${isStart ? 'rounded-l-full' : ''} ${date === 26 ? 'rounded-r-full' : ''}`} />
                  )}
                  <span className={`relative z-10 flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    isStart ? "bg-[#087F5B] text-white font-bold" : isTripDate ? "text-[#087F5B] font-bold" : "text-[#17211D]"
                  }`}>
                    {date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
