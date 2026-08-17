"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
  Star,
  Wallet,
} from "lucide-react";

type Destination = {
  id: number;
  name: string;
  slug: string;
  image: string;
  match: number;
  rating: number;
  reviews: string;
  budget: string;
  bestSeason: string;
  tags: string[];
};

const destinations: Destination[] = [
  {
    id: 1,
    name: "Cox's Bazar",
    slug: "coxsbazar",
    image: "/images/destinations/coxs-bazar.jpg",
    match: 94,
    rating: 4.8,
    reviews: "1.2K reviews",
    budget: "৳8,500",
    bestSeason: "Nov–Feb",
    tags: ["Beach", "Family", "Relaxation"],
  },
  {
    id: 2,
    name: "Sajek Valley",
    slug: "sajek-valley",
    image: "/images/destinations/sajek.jpg",
    match: 92,
    rating: 4.7,
    reviews: "966 reviews",
    budget: "৳6,200",
    bestSeason: "Oct–Mar",
    tags: ["Nature", "Adventure", "Relaxation"],
  },
  {
    id: 3,
    name: "Saint Martin",
    slug: "saint-martin",
    image: "/images/destinations/saint-martin.jpg",
    match: 93,
    rating: 4.6,
    reviews: "743 reviews",
    budget: "৳11,000",
    bestSeason: "Nov–Feb",
    tags: ["Beach", "Island", "Relaxation"],
  },
  {
    id: 4,
    name: "Bandarban",
    slug: "bandarban",
    image: "/images/destinations/bandarban.jpg",
    match: 89,
    rating: 4.6,
    reviews: "682 reviews",
    budget: "৳6,800",
    bestSeason: "Oct–Mar",
    tags: ["Nature", "Adventure", "Culture"],
  },
  {
    id: 5,
    name: "Sreemangal",
    slug: "sreemangal",
    image: "/images/destinations/sreemangal.jpg",
    match: 87,
    rating: 4.5,
    reviews: "621 reviews",
    budget: "৳4,500",
    bestSeason: "Sep–Feb",
    tags: ["Tea Garden", "Nature", "Relaxation"],
  },
];

export default function PopularDestinations() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -360,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 360,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-[-0.025em] text-[#17211D] sm:text-[27px] lg:text-[29px]">
              Explore Popular Destinations
            </h2>

            <p className="mt-1 text-xs font-medium text-[#78857F] sm:text-sm">
              Discover places travelers are loving right now.
            </p>
          </div>

          {/* VIEW ALL */}

          <Link
            href="/destinations"
            className="group hidden shrink-0 items-center gap-1.5 text-[11px] font-bold text-[#087F5B] transition-colors hover:text-[#065F46] sm:flex"
          >
            View All Destinations
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* =====================================================
            DESTINATION SLIDER
        ====================================================== */}

        <div className="relative">
          {/* LEFT ARROW */}

          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Previous destinations"
            className="absolute -left-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#E4EBE7] bg-white text-[#52615A] shadow-md transition-all hover:border-[#087F5B] hover:bg-[#E8F7F1] hover:text-[#087F5B] lg:flex"
          >
            <ArrowLeft size={15} />
          </button>

          {/* RIGHT ARROW */}

          <button
            type="button"
            onClick={scrollRight}
            aria-label="Next destinations"
            className="absolute -right-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#E4EBE7] bg-white text-[#52615A] shadow-md transition-all hover:border-[#087F5B] hover:bg-[#E8F7F1] hover:text-[#087F5B] lg:flex"
          >
            <ArrowRight size={15} />
          </button>

          {/* =================================================
              SCROLL CONTAINER
          ================================================== */}

          <div
            ref={sliderRef}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-2 scrollbar-none sm:gap-4 lg:overflow-hidden"
          >
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>

        {/* =====================================================
            MOBILE VIEW ALL
        ====================================================== */}

        <div className="mt-4 flex justify-center sm:hidden">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-1.5 rounded-full border border-[#DCE7E2] bg-[#F8FAF9] px-4 py-2 text-[11px] font-bold text-[#087F5B]"
          >
            View All Destinations
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESTINATION CARD
============================================================ */

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article
      className="
        group
        min-w-[250px]
        flex-1
        overflow-hidden
        rounded-xl
        border
        border-[#E4EBE7]
        bg-white
        shadow-[0_2px_10px_rgba(23,33,29,0.06)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#D5E5DE]
        hover:shadow-[0_12px_28px_rgba(23,33,29,0.12)]
        sm:min-w-[270px]
        lg:min-w-0
      "
    >
      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div className="relative h-[120px] overflow-hidden sm:h-[125px] lg:h-[120px]">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 640px) 270px, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* IMAGE OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        {/* =================================================
            AI MATCH
        ================================================== */}

        <div className="absolute bottom-2 left-2 overflow-hidden rounded-lg bg-white shadow-md">
          <div className="px-2 py-1">
            <p className="text-[8px] font-bold leading-none text-[#17211D]">
              AI Match
            </p>

            <p className="mt-0.5 text-[13px] font-extrabold leading-none text-[#F4A900]">
              {destination.match}%
            </p>
          </div>
        </div>

        {/* =================================================
            WISHLIST
        ================================================== */}

        <button
          type="button"
          aria-label={`Add ${destination.name} to wishlist`}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#087F5B]"
        >
          <Heart size={14} strokeWidth={2} />
        </button>
      </div>

      {/* =====================================================
          CARD CONTENT
      ====================================================== */}

      <div className="p-2.5 sm:p-3">
        {/* NAME */}

        <h3 className="truncate text-[13px] font-extrabold text-[#17211D]">
          {destination.name}
        </h3>

        {/* LOCATION */}

        <div className="mt-1 flex items-center gap-1 text-[9px] font-medium text-[#78857F]">
          <MapPin size={10} className="text-[#087F5B]" />
          Bangladesh
        </div>

        {/* RATING */}

        <div className="mt-2 flex items-center gap-1.5">
          <Star size={11} className="fill-[#F4B942] text-[#F4B942]" />

          <span className="text-[10px] font-bold text-[#F0A900]">
            {destination.rating}
          </span>

          <span className="text-[9px] text-[#8A9690]">
            ({destination.reviews})
          </span>
        </div>

        {/* =================================================
            BUDGET + SEASON
        ================================================== */}

        <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#EEF2F0] pt-2">
          {/* BUDGET */}

          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <Wallet size={10} className="shrink-0 text-[#087F5B]" />

              <span className="text-[8px] font-medium text-[#8A9690]">
                From
              </span>
            </div>

            <p className="mt-0.5 truncate text-[10px] font-bold text-[#3F4D47]">
              {destination.budget}
            </p>
          </div>

          {/* SEASON */}

          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <CalendarDays size={10} className="shrink-0 text-[#087F5B]" />

              <span className="text-[8px] font-medium text-[#8A9690]">
                Best
              </span>
            </div>

            <p className="mt-0.5 truncate text-[10px] font-bold text-[#3F4D47]">
              {destination.bestSeason}
            </p>
          </div>
        </div>

        {/* =================================================
            TAGS
        ================================================== */}

        <div className="mt-2 flex min-h-[22px] gap-1 overflow-hidden">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="shrink-0 rounded-full border border-[#E4EBE7] bg-[#F8FAF9] px-1.5 py-1 text-[7px] font-semibold text-[#66736D]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* =================================================
            CTA
        ================================================== */}

        <Link
          href={`/destinations/${destination.slug}`}
          className="mt-2.5 flex h-7 w-full items-center justify-center gap-1 rounded-md border border-[#A9D4C5] bg-white text-[9px] font-bold text-[#087F5B] transition-all duration-200 hover:border-[#087F5B] hover:bg-[#E8F7F1]"
        >
          Explore Destination
          <ArrowRight size={11} />
        </Link>
      </div>
    </article>
  );
}
