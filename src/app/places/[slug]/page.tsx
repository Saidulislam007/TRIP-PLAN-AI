import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, MapPin, CheckCircle2 } from "lucide-react";
import { coxsBazarData } from "@/data/coxsBazar";
import { notFound } from "next/navigation";
import { Button } from "@heroui/react";

// Mock function to find the place
function getPlaceBySlug(slug: string) {
  // @ts-ignore - slug is added dynamically in the data file
  return coxsBazarData.placesToExplore.find((p) => p.slug === slug);
}

export default async function PlaceDetailsPage({ params }: { params: { slug: string } }) {
  const place = getPlaceBySlug(params.slug);

  if (!place) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FDFDFB] pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full bg-[#17211D]">
        <Image 
          src={place.image} 
          alt={place.title} 
          fill 
          className="object-cover"
          priority
        />
        {/* Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091C1A] via-[#091C1A]/40 to-black/20" />
        
        {/* Top Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-20">
          <Link href="/destinations/coxs-bazar">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white font-medium transition-colors text-sm border border-white/20 shadow-lg">
              <ArrowLeft className="w-4 h-4" /> Back to Guide
            </button>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20 z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2 mb-4">
                {place.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-white font-bold mb-4 drop-shadow-md">
                {place.title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl drop-shadow">
                {place.description}
              </p>
            </div>
            
            {/* Quick Rating Badge */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl shadow-xl">
               <div className="w-12 h-12 bg-[#F4A62A]/20 rounded-full flex items-center justify-center">
                 <Star className="w-6 h-6 text-[#F4A62A] fill-[#F4A62A]" />
               </div>
               <div>
                 <div className="text-2xl font-bold text-white leading-none">{place.rating}</div>
                 <div className="text-[11px] text-white/70 uppercase tracking-wider font-bold mt-1">Traveler Rating</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 -mt-10 relative z-20">
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-[#17211D]/5 border border-[#E2E7E3]/60">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: About */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif text-[#17211D] font-bold mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#087F5B]" />
                About {place.title}
              </h2>
              <div className="prose prose-lg prose-p:text-[#52615A] prose-p:leading-loose">
                {/* @ts-ignore - added longDescription in data */}
                <p>{place.longDescription || place.description}</p>
                <p>
                  Whether you are looking for an adventure or just a quiet place to unwind, this location offers an unforgettable experience. Plan your visit during the early morning hours or late afternoon to catch the best natural lighting and avoid peak crowds.
                </p>
              </div>
            </div>
            
            {/* Right Column: AI Insights */}
            <div className="lg:col-span-1">
              <div className="bg-[#E8F3EF] rounded-3xl p-8 border border-[#087F5B]/15">
                <h3 className="font-bold text-[#17211D] text-lg mb-6">Why Visit?</h3>
                <ul className="flex flex-col gap-5">
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                     <span className="text-[14px] text-[#17211D] font-medium leading-relaxed">Perfectly matches your interest in {place.tags[0]}</span>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                     <span className="text-[14px] text-[#17211D] font-medium leading-relaxed">Highly rated ({place.rating}/5) by previous travelers</span>
                  </li>
                  <li className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-[#087F5B] shrink-0 mt-0.5" />
                     <span className="text-[14px] text-[#17211D] font-medium leading-relaxed">Great for photography and scenic views</span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Link href="/destinations/coxs-bazar">
                    <Button className="w-full bg-[#163D36] hover:bg-[#0B2522] text-white font-bold rounded-xl py-6 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                      Add to Itinerary
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

