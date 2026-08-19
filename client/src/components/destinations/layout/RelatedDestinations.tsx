import Image from "next/image";
import { Star, Sparkles } from "lucide-react";
import Link from "next/link";

interface RelatedProps {
  data: {
    slug: string;
    name: string;
    rating: number;
    aiMatch: number;
    budget: string;
    image: string;
  }[];
}

export default function RelatedDestinations({ data }: RelatedProps) {
  return (
    <div className="pt-10 border-t border-[#E2E7E3]/60">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h3 className="text-3xl font-serif text-[#17211D] font-bold mb-2">You Might Also Like</h3>
          <p className="text-[14px] text-[#66736D]">AI-recommended destinations based on your preferences</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5">
        {data.map((dest, i) => (
          <Link key={i} href={`/destinations/${dest.slug}`} className="group bg-white rounded-2xl border border-[#E2E7E3]/60 overflow-hidden shadow-lg shadow-[#17211D]/5 hover:shadow-xl hover:shadow-[#087F5B]/10 hover:-translate-y-1 hover:border-[#087F5B]/40 transition-all duration-300 flex flex-col">
            <div className="relative h-44 w-full overflow-hidden bg-[#F7F7F2]">
              <Image 
                src={dest.image} 
                alt={dest.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-[#F4A62A] to-[#F4B942] rounded-md text-[11px] font-bold text-[#17211D] flex items-center gap-1.5 shadow-md shadow-[#F4A62A]/20">
                <Sparkles className="w-3 h-3" />
                {dest.aiMatch}% Match
              </div>
            </div>
            
            <div className="p-4 flex flex-col flex-1">
              <h4 className="font-bold text-[#17211D] text-[15px] mb-2 line-clamp-1 group-hover:text-[#087F5B] transition-colors">{dest.name}</h4>
              
              <div className="flex items-center justify-between mt-auto pt-1">
                 <div className="flex items-center gap-1.5 text-[13px] text-[#17211D] font-bold">
                   <Star className="w-3.5 h-3.5 fill-[#F4A62A] text-[#F4A62A]" />
                   {dest.rating}
                 </div>
                 <span className="text-[11px] font-medium text-[#66736D]">From {dest.budget}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
