"use client";

import { useState } from "react";
import DestinationHero from "@/components/destinations/hero/DestinationHero";
import AIRecommendationBanner from "@/components/destinations/ai/AIRecommendationBanner";
import DestinationToolbar from "@/components/destinations/layout/DestinationToolbar";
import DestinationSidebar from "@/components/destinations/layout/DestinationSidebar";
import FeaturedDestinations from "@/components/destinations/listings/FeaturedDestinations";
import AllDestinations from "@/components/destinations/listings/AllDestinations";
import TrendingDestinations from "@/components/destinations/listings/TrendingDestinations";
import ReviewIntelligence from "@/components/destinations/reviews/ReviewIntelligence";
import { destinationsData } from "@/data/destinations";

export default function DestinationsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-[#F7F7F2] min-h-screen">
      {/* 01. Hero Section & Search */}
      <DestinationHero />

      {/* 02. AI Recommendation Banner */}
      <AIRecommendationBanner />

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-12">
        {/* 03. Destination Toolbar */}
        <DestinationToolbar 
          resultCount={destinationsData.length} 
          viewMode={viewMode} 
          setViewMode={setViewMode}
          onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
        />

        <div className="flex items-start gap-10">
          {/* 04. Filter Sidebar */}
          <DestinationSidebar 
            isOpen={isMobileFiltersOpen} 
            onClose={() => setIsMobileFiltersOpen(false)} 
          />

          {/* 05. Main Destination Listing */}
          <div className="flex-1 min-w-0">
            {/* Featured Destinations */}
            <FeaturedDestinations destinations={destinationsData} />

            {/* All Destinations Grid/List/Map */}
            <AllDestinations destinations={destinationsData} viewMode={viewMode} />

            {/* Trending Destinations */}
            <TrendingDestinations destinations={destinationsData} />

            {/* AI Review Intelligence */}
            <ReviewIntelligence />
          </div>
        </div>
      </div>
    </div>
  );
}
