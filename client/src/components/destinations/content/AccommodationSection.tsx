"use client";

import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@heroui/react";

interface AccommodationProps {
  data: {
    id: number;
    name: string;
    category: string;
    rating: number;
    location: string;
    priceFrom: number;
    image: string;
    amenities: string[];
  }[];
}

export default function AccommodationSection({ data }: AccommodationProps) {
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
        <h3 className="text-2xl font-serif text-[#17211D] font-bold">Where to Stay</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-xl border border-[#E2E7E3] overflow-hidden group flex flex-col sm:flex-row">
            <div className="relative h-48 sm:h-auto sm:w-2/5 shrink-0 overflow-hidden">
              <Image 
                src={hotel.image} 
                alt={hotel.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                onClick={() => toggleWishlist(hotel.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors z-10"
              >
                <Heart 
                  className={`w-4 h-4 ${wishlist[hotel.id] ? "fill-red-500 text-red-500" : "text-white"}`} 
                />
              </button>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between gap-2 mb-1">
                 <h4 className="font-bold text-[#17211D] leading-tight">{hotel.name}</h4>
                 <div className="flex items-center gap-1 text-sm font-bold shrink-0">
                   <Star className="w-3.5 h-3.5 fill-[#F4A62A] text-[#F4A62A]" />
                   {hotel.rating}
                 </div>
              </div>
              <p className="text-xs text-[#66736D] mb-3">{hotel.location} • {hotel.category}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                 {hotel.amenities.map((amenity, i) => (
                   <span key={i} className="px-2 py-0.5 bg-[#F7F7F2] text-[#66736D] rounded text-[10px] font-medium border border-[#E2E7E3]">
                     {amenity}
                   </span>
                 ))}
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-2 border-t border-[#E2E7E3]">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#66736D] uppercase font-bold tracking-wider">From</span>
                  <span className="font-bold text-[#17211D]">৳{hotel.priceFrom.toLocaleString()} <span className="font-normal text-xs text-[#66736D]">/night</span></span>
                </div>
                <Button 
                  className="bg-[#087F5B] hover:bg-[#065F46] text-white font-bold h-9 text-xs px-4"
                >
                  View Stay
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
