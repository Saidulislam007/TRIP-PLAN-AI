import { Star, MapPin, Sparkles, Heart, Share2, ChevronRight } from "lucide-react";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

interface DestinationHeroProps {
  data: {
    name: string;
    country: string;
    subtitle: string;
    description: string;
    heroImage: string;
    rating: number;
    reviewCount: string;
    aiMatch: number;
    tags: string[];
  };
}

export default function DestinationHeroDetails({ data }: DestinationHeroProps) {
  return (
    <div className="relative w-full h-[85vh] min-h-[600px] flex flex-col justify-end">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.heroImage}
          alt={data.name}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2522]/90 via-[#0B2522]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2522]/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-12 md:pb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        
        {/* Left Content */}
        <div className="max-w-2xl w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-white/50" />
            <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
            <ChevronRight className="w-4 h-4 text-white/50" />
            <span className="text-white">{data.name}</span>
          </nav>

          {/* Country Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-3 bg-green-600 rounded-[2px] relative overflow-hidden">
               {/* Simple BD flag representation */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
               </div>
            </div>
            <span className="text-white font-bold tracking-wider text-xs uppercase">{data.country}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 leading-tight">
            {data.name}
          </h1>
          <p className="text-xl md:text-2xl text-[#F4A62A] font-serif italic mb-6">
            {data.subtitle}
          </p>
          <p className="text-white/90 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
            {data.description}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/90 font-medium mb-8">
            <div className="flex items-center gap-1 text-[#F4A62A]">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-white ml-1">{data.rating}</span>
              <span className="text-white/70 font-normal">({data.reviewCount} Reviews)</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-[#087F5B]" />
              <span>{data.country}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <span>{data.tags[0]}</span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/plan-trip">
              <Button
                className="bg-[#F4A62A] hover:bg-[#F4B942] text-[#17211D] font-bold px-8 py-6 rounded-lg text-base"
              >
                <Sparkles className="w-5 h-5 mr-2" /> Plan My Trip
              </Button>
            </Link>
            
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-bold px-6 py-6 rounded-lg backdrop-blur-sm"
            >
              <Heart className="w-5 h-5 mr-2" /> Save Destination
            </Button>

            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 font-bold px-4 py-6 rounded-lg"
            >
              <Share2 className="w-5 h-5 mr-2" /> Share
            </Button>
          </div>
        </div>

        {/* Right Content - AI Match Card */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="bg-[#163D36]/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-white shadow-2xl">
            <div className="flex items-center gap-2 text-[#F4A62A] font-bold text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              AI Match
            </div>
            <div className="text-5xl font-bold font-serif mb-2">{data.aiMatch}%</div>
            <p className="text-sm text-white/70 mb-6">Matched to your preferences</p>
            
            <div className="space-y-3">
              {["Beach", "Relaxation", "Family-friendly", "Nature", "Food experiences"].map((pref, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-[#087F5B] flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/90">{pref}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
