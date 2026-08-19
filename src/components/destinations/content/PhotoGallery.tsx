"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@heroui/react";

interface GalleryProps {
  data: string[];
  destinationName?: string;
}

export default function PhotoGallery({ data, destinationName }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const displayImages = data.slice(0, 5);

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-serif text-[#17211D] font-bold">Explore {destinationName || "Cox's Bazar"} Through Photos</h3>
        <Button 
          variant="ghost"
          className="text-[#087F5B] font-bold hover:bg-[#087F5B]/10 hidden md:flex border-none"
          onClick={() => openLightbox(0)}
        >
          View All {data.length} Photos
        </Button>
      </div>
      
      {/* Masonry-like Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 h-[400px] md:h-[500px]">
        {/* Large Featured Image */}
        <div 
          className="col-span-2 row-span-2 relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
           <Image 
             src={displayImages[0]} 
             alt="Gallery image" 
             fill 
             className="object-cover group-hover:scale-105 transition-transform duration-700"
           />
           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
             <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>
        </div>
        
        {/* Smaller Images */}
        {displayImages.slice(1, 5).map((img, idx) => (
          <div 
            key={idx} 
            className="relative rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(idx + 1)}
          >
             <Image 
               src={img} 
               alt={`Gallery image ${idx + 2}`} 
               fill 
               className="object-cover group-hover:scale-105 transition-transform duration-500"
             />
             
             {/* Show "+X more" on the last image if there are more */}
             {idx === 3 && data.length > 5 && (
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">+{data.length - 5}</span>
               </div>
             )}
          </div>
        ))}
      </div>

      <Button 
        className="w-full mt-4 bg-white border border-[#E2E7E3] text-[#17211D] font-bold md:hidden"
        onClick={() => openLightbox(0)}
      >
        View All Photos
      </Button>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 text-white z-10">
            <span className="text-sm font-medium">{currentIndex + 1} / {data.length}</span>
            <button 
              onClick={closeLightbox}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Main Image Area */}
          <div className="flex-1 relative flex items-center justify-center p-4 md:p-12" onClick={closeLightbox}>
            <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <div className="relative w-full h-full max-h-[85vh]">
                <Image 
                  src={data[currentIndex]}
                  alt={`Photo ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Controls - Moved inside the stopPropagation container to guarantee click capture */}
              <button 
                className="absolute left-0 -ml-4 md:-ml-12 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors z-50"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <button 
                className="absolute right-0 -mr-4 md:-mr-12 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors z-50"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
