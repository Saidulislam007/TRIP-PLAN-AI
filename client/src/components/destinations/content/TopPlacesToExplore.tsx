"use client";

import Image from "next/image";
import { Star, Heart, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

interface TopPlacesProps {
  data: {
    id: number;
    slug?: string;
    title: string;
    description: string;
    image: string;
    rating: number;
    tags: string[];
  }[];
}

export default function TopPlacesToExplore({ data }: TopPlacesProps) {
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});

  const toggleWishlist = (id: number) => {
    setWishlist(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-serif text-[#17211D] font-bold">Top Places to Explore</h3>
        <Link href="#" className="text-sm font-bold text-[#087F5B] hover:underline flex items-center gap-1">
          View All Places <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((place) => (
          <div key={place.id} className="bg-white rounded-3xl border border-[#E2E7E3]/60 overflow-hidden group shadow-lg shadow-[#17211D]/5 hover:shadow-xl hover:shadow-[#087F5B]/10 hover:-translate-y-1 transition-all duration-300">
            <Link href={place.slug ? `/places/${place.slug}` : "#"} className="block relative h-52 w-full overflow-hidden bg-[#F7F7F2]">
              <Image 
                src={place.image} 
                alt={place.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(place.id);
              }}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/90 transition-all shadow-sm z-10"
            >
              <Heart 
                className={`w-4 h-4 transition-colors ${wishlist[place.id] ? "fill-red-500 text-red-500" : "text-white hover:text-red-500"}`} 
              />
            </button>
            
            <div className="p-6">
              <Link href={place.slug ? `/places/${place.slug}` : "#"} className="block">
                <h4 className="font-bold text-[#17211D] text-lg mb-1.5 group-hover:text-[#087F5B] transition-colors">{place.title}</h4>
                <p className="text-[14px] text-[#66736D] mb-5 line-clamp-1 leading-relaxed">{place.description}</p>
                
                <div className="flex items-center gap-1.5 text-[14px] text-[#17211D] font-bold mb-5">
                  <Star className="w-4 h-4 fill-[#F4A62A] text-[#F4A62A]" />
                  {place.rating}
                </div>
              </Link>
              
              <div className="flex items-center justify-between pt-4 border-t border-[#E2E7E3]/60">
                <div className="text-[12px] text-[#66736D] flex flex-wrap gap-1 items-center">
                  <span className="mr-1">Best for:</span>
                  {place.tags.map((tag, i) => (
                    <span key={i} className="bg-[#F7F7F2] px-2 py-0.5 rounded-full text-[#17211D] font-medium border border-[#E2E7E3]">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={place.slug ? `/places/${place.slug}` : "#"}>
                  <Button 
                    variant="ghost" 
                    className="font-bold bg-[#087F5B]/10 text-[#087F5B] hover:bg-[#087F5B] hover:text-white rounded-full min-w-0 px-4 h-8 text-[12px] border-none transition-all shadow-none hover:shadow-md"
                  >
                    Explore <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
