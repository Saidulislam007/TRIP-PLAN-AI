"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Backpack,
  Compass,
  Heart,
  Leaf,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";

type TrustItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type TravelCategory = {
  title: string;
  description: string;
  slug: string;
  image: string;
  icon: React.ReactNode;
};

const trustItems: TrustItem[] = [
  {
    title: "AI-powered recommendations",
    description: "Personalized just for you",
    icon: <Sparkles size={20} strokeWidth={2} />,
  },
  {
    title: "Real traveler insights",
    description: "From thousands of reviews",
    icon: <Users size={20} strokeWidth={2} />,
  },
  {
    title: "Smart travel planning",
    description: "Plan better, travel better",
    icon: <Compass size={20} strokeWidth={2} />,
  },
];

const travelCategories: TravelCategory[] = [
  {
    title: "Adventure",
    description: "For thrill seekers",
    slug: "adventure",
    image: "/images/categories/adventure.jpg",
    icon: <Compass size={18} strokeWidth={2.2} />,
  },
  {
    title: "Beach",
    description: "Sun, sea & relaxation",
    slug: "beach",
    image: "/images/categories/beach.jpg",
    icon: <Waves size={18} strokeWidth={2.2} />,
  },
  {
    title: "Family",
    description: "Trips everyone can enjoy",
    slug: "family",
    image: "/images/categories/family.jpg",
    icon: <Users size={18} strokeWidth={2.2} />,
  },
  {
    title: "Romantic",
    description: "Beautiful escapes for two",
    slug: "romantic",
    image: "/images/categories/romantic.jpg",
    icon: <Heart size={18} strokeWidth={2.2} />,
  },
  {
    title: "Backpacking",
    description: "Travel freely & independently",
    slug: "backpacking",
    image: "/images/categories/backpacking.jpg",
    icon: <Backpack size={18} strokeWidth={2.2} />,
  },
  {
    title: "Nature",
    description: "Green landscapes & peaceful places",
    slug: "nature",
    image: "/images/categories/nature.jpg",
    icon: <Leaf size={18} strokeWidth={2.2} />,
  },
];

export default function TravelCategories() {
  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12 xl:px-16">
        {/* =====================================================
            TRUST / VALUE BAR
        ====================================================== */}

        <div className="relative -top-5 z-20 -mt-8 rounded-2xl border border-[#E7ECE9] bg-slate-100 px-5 py-4 shadow-[0_12px_35px_rgba(23,33,29,0.10)] backdrop-blur-md sm:px-7 lg:-mt-10 lg:px-8 lg:py-4">
          <div className="grid grid-cols-1 divide-y divide-[#E8ECEA] sm:grid-cols-3 sm:divide-x sm:divide-y-0 ">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 px-2 py-3 sm:px-5 lg:px-7"
              >
                {/* ICON */}

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F7F1] text-[#087F5B]">
                  {item.icon}
                </div>

                {/* TEXT */}

                <div className="min-w-0">
                  <h3 className="truncate text-[12px] font-bold text-[#17211D] sm:text-[13px]">
                    {item.title}
                  </h3>

                  <p className="mt-0.5 text-[10px] font-medium text-[#78857F] sm:text-[11px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            CATEGORY HEADER
        ====================================================== */}

        <div className="mt-8 flex items-end justify-between gap-4 sm:mt-9">
          <div>
            <h2 className="text-2xl font-extrabold tracking-[-0.025em] text-[#17211D] sm:text-[27px] lg:text-[29px]">
              Find Your Way to Travel
            </h2>

            <p className="mt-1.5 max-w-xl text-xs leading-5 text-[#78857F] sm:text-sm">
              Choose a travel style and discover experiences made for you.
            </p>
          </div>

          {/* VIEW ALL */}

          <Link
            href="/destinations"
            className="group hidden shrink-0 items-center gap-1.5 text-[11px] font-bold text-[#087F5B] transition-colors hover:text-[#065F46] sm:flex"
          >
            View All Categories
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* =====================================================
            CATEGORY CARDS
        ====================================================== */}

        <div
          className="
            mt-5
            flex
            gap-3
            overflow-x-auto
            pb-3
            scrollbar-none
            sm:grid
            sm:grid-cols-3
            sm:gap-4
            sm:overflow-visible
            sm:pb-0
            lg:grid-cols-6
          "
        >
          {travelCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/destinations?category=${category.slug}`}
              className="
                group
                relative
                block
                h-[190px]
                min-w-[205px]
                overflow-hidden
                rounded-xl
                border
                border-[#E4EBE7]
                bg-[#E8F7F1]
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_12px_25px_rgba(23,33,29,0.14)]
                sm:min-w-0
                lg:h-[180px]
              "
            >
              {/* =================================================
                  IMAGE
              ================================================== */}

              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="
                  (max-width: 640px) 205px,
                  (max-width: 1024px) 30vw,
                  16vw
                "
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* =================================================
                  IMAGE OVERLAYS
              ================================================== */}

              <div className="absolute inset-0 bg-gradient-to-t from-[#052F25]/95 via-[#063F31]/35 to-transparent" />

              <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/0" />

              {/* =================================================
                  ICON
              ================================================== */}

              <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/70 bg-white/95 text-[#087F5B] shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                {category.icon}
              </div>

              {/* =================================================
                  CARD CONTENT
              ================================================== */}

              <div className="absolute inset-x-0 bottom-0 p-3.5">
                <h3 className="text-[14px] font-extrabold tracking-[-0.01em] text-white">
                  {category.title}
                </h3>

                <p className="mt-0.5 max-w-[160px] text-[9px] font-medium leading-[1.4] text-white/85">
                  {category.description}
                </p>
              </div>

              {/* =================================================
                  HOVER ARROW
              ================================================== */}

              <div className="absolute bottom-3 right-3 flex h-7 w-7 translate-y-2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowRight size={13} />
              </div>
            </Link>
          ))}
        </div>

        {/* =====================================================
            MOBILE VIEW ALL
        ====================================================== */}

        <div className="mt-4 flex justify-center sm:hidden">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-1.5 rounded-full border border-[#DCE7E2] bg-[#F8FAF9] px-4 py-2 text-[11px] font-bold text-[#087F5B]"
          >
            View All Categories
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
