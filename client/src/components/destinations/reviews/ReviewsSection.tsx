"use client";

import Image from "next/image";
import { Star, ThumbsUp, Quote } from "lucide-react";
import { useState } from "react";
import AIReviewSummary from '@/components/destinations/reviews/AIReviewSummary';

interface ReviewsProps {
  data: {
    overall: number;
    count: number;
    breakdown: Record<number, number>;
    list: {
      id: number;
      name: string;
      avatar: string;
      rating: number;
      date: string;
      tripType: string;
      text: string;
    }[];
    aiSummary: {
      loved: string[];
      concerns: string[];
      verdict: string;
    };
  };
}

export default function ReviewsSection({ data }: ReviewsProps) {
  const [helpful, setHelpful] = useState<Record<number, boolean>>({});

  const toggleHelpful = (id: number) => {
    setHelpful(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="pt-4">
      <h3 className="text-2xl font-serif text-[#17211D] font-bold mb-8">What Travelers Say</h3>
      
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Rating Breakdown */}
        <div className="lg:w-1/3 flex flex-col justify-center">
          <div className="flex items-end gap-4 mb-8">
            <h4 className="text-7xl font-serif font-bold text-[#0B2522] leading-none tracking-tighter">{data.overall}</h4>
            <div className="flex flex-col pb-1.5">
               <div className="flex text-[#F4A62A] mb-1.5 drop-shadow-sm">
                 {[1,2,3,4,5].map(star => (
                   <Star key={star} className="w-5 h-5 fill-current" />
                 ))}
               </div>
               <span className="text-[13px] font-bold tracking-wide uppercase text-[#66736D]">{data.count.toLocaleString()}+ Reviews</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 pr-8">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center gap-3 text-sm group cursor-pointer">
                <span className="w-2.5 text-[#17211D] font-bold text-[13px]">{rating}</span>
                <Star className="w-3.5 h-3.5 text-[#F4A62A] fill-[#F4A62A]" />
                <div className="flex-1 h-2.5 bg-[#F7F7F2] border border-[#E2E7E3]/60 rounded-full overflow-hidden shadow-inner relative">
                   <div 
                     className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#087F5B] to-[#163D36] rounded-full transition-all duration-1000 group-hover:opacity-80"
                     style={{ width: `${data.breakdown[rating]}%` }}
                   />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Summary Card */}
        <div className="lg:w-2/3">
          <AIReviewSummary data={data.aiSummary} />
        </div>
      </div>

      {/* Review List */}
      <div>
        <h4 className="text-xl font-serif text-[#17211D] font-bold mb-6">Top Traveler Experiences</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.list.map(review => (
            <div key={review.id} className="bg-white p-7 rounded-3xl border border-[#E2E7E3]/60 shadow-lg shadow-[#17211D]/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
              {/* Decorative Quote Mark */}
              <div className="absolute top-4 right-4 text-[#F7F7F2] group-hover:text-[#E8F3EF] transition-colors pointer-events-none">
                <Quote className="w-16 h-16" fill="currentColor" strokeWidth={0} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full overflow-hidden relative bg-[#F7F7F2] shadow-sm border border-[#E2E7E3]">
                       <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                    </div>
                    <div>
                       <h5 className="font-bold text-[#17211D] text-[15px]">{review.name}</h5>
                       <span className="text-[12px] font-medium text-[#66736D]">{review.date} • {review.tripType}</span>
                    </div>
                  </div>
                  <div className="flex text-[#F4A62A] drop-shadow-sm mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-current" : "text-[#E2E7E3]"}`} />
                    ))}
                  </div>
                </div>
                
                <p className="text-[14px] text-[#52615A] font-medium leading-relaxed mb-6 pr-4">
                  &quot;{review.text}&quot;
                </p>
                
                <button 
                  onClick={() => toggleHelpful(review.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    helpful[review.id] 
                      ? "bg-[#087F5B] border-[#087F5B] text-white shadow-md shadow-[#087F5B]/20" 
                      : "bg-[#FDFDFB] border-[#E2E7E3] text-[#66736D] hover:border-[#087F5B]/30 hover:bg-[#E8F3EF] hover:text-[#087F5B]"
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${helpful[review.id] ? "fill-current" : ""}`} />
                  {helpful[review.id] ? "Helpful" : "Helpful?"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
