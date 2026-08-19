import { Star, MessageSquare, Calendar, Wallet, CloudSun } from "lucide-react";

interface StatsProps {
  rating: number;
  reviews: string;
  recommendedStay: string;
  estimatedBudget: number;
  popularSeason: string;
}

export default function DestinationStatsStrip({
  rating,
  reviews,
  recommendedStay,
  estimatedBudget,
  popularSeason
}: StatsProps) {
  
  const stats = [
    {
      icon: Star,
      value: rating.toString(),
      label: "Rating",
      iconColor: "text-[#F4A62A]",
      bgColor: "bg-[#F4A62A]/10"
    },
    {
      icon: MessageSquare,
      value: `${reviews}+`,
      label: "Reviews",
      iconColor: "text-[#087F5B]",
      bgColor: "bg-[#087F5B]/10"
    },
    {
      icon: Calendar,
      value: recommendedStay,
      label: "Recommended Stay",
      iconColor: "text-[#3B82F6]",
      bgColor: "bg-[#3B82F6]/10"
    },
    {
      icon: Wallet,
      value: `৳${estimatedBudget.toLocaleString()}+`,
      label: "Estimated Budget",
      iconColor: "text-[#10B981]",
      bgColor: "bg-[#10B981]/10"
    },
    {
      icon: CloudSun,
      value: popularSeason,
      label: "Popular Season",
      iconColor: "text-[#F43F5E]",
      bgColor: "bg-[#F43F5E]/10"
    }
  ];

  return (
    <div className="w-full bg-white shadow-sm relative z-20 border-b border-[#E2E7E3]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-8">
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-6 md:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-4 w-full md:w-auto group">
              <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#17211D] text-xl leading-tight mb-0.5">{stat.value}</span>
                <span className="text-[#66736D] text-sm font-medium">{stat.label}</span>
              </div>
              {/* Divider for desktop */}
              {i < stats.length - 1 && (
                <div className="hidden md:block w-[1px] h-12 bg-gradient-to-b from-transparent via-[#E2E7E3] to-transparent ml-auto lg:ml-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
