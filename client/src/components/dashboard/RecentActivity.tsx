import { Sparkles, Heart, User, CheckCircle2, FileText, ChevronRight } from "lucide-react";
import { dashboardData } from "@/data/dashboardData";

export default function RecentActivity() {
  const getIcon = (type: string) => {
    switch (type) {
      case "generated":
        return <Sparkles size={14} className="text-[#F4A934]" />;
      case "saved":
        return <Heart size={14} className="text-[#087F5B]" />;
      case "updated":
        return <User size={14} className="text-[#073D31]" />;
      case "completed":
        return <CheckCircle2 size={14} className="text-[#087F5B]" />;
      case "submitted":
        return <FileText size={14} className="text-[#66736D]" />;
      default:
        return <Sparkles size={14} />;
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E2E7E3] bg-white p-6 shadow-sm">
      <h2 className="font-serif text-[18px] font-bold text-[#17211D]">Recent Activity</h2>

      <div className="mt-6 flex flex-col gap-5">
        {dashboardData.recentActivity.map((activity) => (
          <div key={activity.id} className="group flex cursor-pointer items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F7F7F2]">
                {getIcon(activity.type)}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-[#66736D]">{activity.timeLabel}</span>
                <span className="text-[12px] font-medium text-[#17211D] transition-colors group-hover:text-[#087F5B]">
                  {activity.description}
                </span>
              </div>
            </div>
            <ChevronRight size={14} className="text-[#E2E7E3] transition-colors group-hover:text-[#087F5B]" />
          </div>
        ))}
      </div>
    </div>
  );
}
