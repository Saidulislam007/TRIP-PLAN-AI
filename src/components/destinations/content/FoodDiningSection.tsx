import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface FoodProps {
  data: {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    type: string;
  }[];
  destinationName?: string;
}

export default function FoodDiningSection({ data, destinationName }: FoodProps) {
  return (
    <div className="pt-4 relative">
      <h3 className="text-2xl font-serif text-[#17211D] font-bold mb-6">Taste of {destinationName || "Cox's Bazar"}</h3>
      
      <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {data.map((item) => (
          <div key={item.id} className="min-w-[220px] max-w-[240px] bg-white rounded-xl border border-[#E2E7E3] overflow-hidden shrink-0 group hover:shadow-lg transition-shadow">
            <div className="relative h-40 w-full overflow-hidden">
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-[#0B2522]">
                {item.type}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-[#17211D] mb-1">{item.title}</h4>
              <p className="text-xs text-[#66736D] mb-4 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="text-[11px] font-bold text-[#087F5B]">
                  {item.price}
                </div>
                <button className="w-6 h-6 rounded-full bg-[#F7F7F2] flex items-center justify-center text-[#17211D] group-hover:bg-[#F4A62A] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
