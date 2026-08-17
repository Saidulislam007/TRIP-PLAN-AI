"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
  destinations: number;
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
    image: "/images/travel-hero.jpg",
    icon: <Compass size={18} strokeWidth={2.2} />,
    destinations: 24,
  },
  {
    title: "Beach",
    description: "Sun, sea & relaxation",
    slug: "beach",
    image: "/images/travel-hero.jpg",
    icon: <Waves size={18} strokeWidth={2.2} />,
    destinations: 18,
  },
  {
    title: "Family",
    description: "Trips everyone can enjoy",
    slug: "family",
    image: "/images/travel-hero.jpg",
    icon: <Users size={18} strokeWidth={2.2} />,
    destinations: 15,
  },
  {
    title: "Romantic",
    description: "Beautiful escapes for two",
    slug: "romantic",
    image: "/images/travel-hero.jpg",
    icon: <Heart size={18} strokeWidth={2.2} />,
    destinations: 12,
  },
  {
    title: "Backpacking",
    description: "Travel freely & independently",
    slug: "backpacking",
    image: "/images/travel-hero.jpg",
    icon: <Backpack size={18} strokeWidth={2.2} />,
    destinations: 20,
  },
  {
    title: "Nature",
    description: "Green landscapes & peaceful places",
    slug: "nature",
    image: "/images/travel-hero.jpg",
    icon: <Leaf size={18} strokeWidth={2.2} />,
    destinations: 16,
  },
];

const categoryLayoutClasses = [
  "md:col-span-2 lg:col-span-2 lg:row-span-2",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-1 lg:row-start-3",
  "lg:col-start-2 lg:row-start-3",
  "md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-3",
];

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function TravelCategories() {
  return (
    <section className="relative bg-gradient-to-b from-white via-[#FBFCFA] to-[#F4F8F5]">
      <div className="pointer-events-none absolute -left-28 top-36 h-72 w-72 rounded-full bg-[#087F5B]/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 top-64 h-72 w-72 rounded-full bg-[#F4B942]/[0.08] blur-[110px]" />

      <div className="mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-12 xl:px-16">
        {/* TRUST / VALUE BAR */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: revealEase }}
          className="relative -top-5 z-20 -mt-8 overflow-hidden rounded-[22px] border border-[#DCE9E3]/80 bg-gradient-to-r from-[#F2FAF6]/95 via-white/95 to-[#FFF7E8]/95 px-4 py-3 shadow-[0_18px_48px_rgba(23,33,29,0.12),inset_0_1px_0_rgba(255,255,255,0.90)] backdrop-blur-xl sm:px-5 lg:-mt-10 lg:px-6 lg:py-3.5"
        >
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.45, 1, 0.45], scaleX: [0.75, 1, 0.75] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-8 top-0 h-px origin-center bg-gradient-to-r from-transparent via-[#F4B942] to-transparent"
          />

          <div className="grid grid-cols-1 divide-y divide-[#DCE9E3]/80 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {trustItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.55,
                  delay: 0.12 + index * 0.1,
                  ease: revealEase,
                }}
                className="group relative flex items-center gap-3 rounded-xl px-2 py-3 transition-colors duration-300 hover:bg-white/65 sm:px-5 lg:px-7"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#BFE4D5]/70 bg-gradient-to-br from-[#E3F6EE] to-[#FFF0D0] text-[#087F5B] shadow-[0_6px_18px_rgba(8,127,91,0.09)] transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:border-[#F4B942]/60 group-hover:text-[#C87920]">
                  {item.icon}
                </div>

                <div className="min-w-0">
                  <h3 className="[font-family:Georgia,'Times_New_Roman',serif] text-[14px] font-normal leading-[1.15] tracking-[-0.015em] text-[#17211D] transition-colors duration-300 group-hover:text-[#087F5B] sm:text-[15px]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.09em] text-[#708078] sm:text-[10px]">
                    {item.description}
                  </p>
                </div>

                <span className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#087F5B] via-[#F4B942] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CATEGORY HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.08, ease: revealEase }}
          className="mt-8 flex items-end justify-between gap-4 sm:mt-9"
        >
          <div>
            <h2 className="[font-family:Georgia,'Times_New_Roman',serif] text-[30px] font-normal leading-tight tracking-[-0.035em] text-[#17211D] sm:text-[36px] lg:text-[42px]">
              Find Your Way to{" "}
              <span className="bg-gradient-to-r from-[#D98B26] via-[#F4AD3F] to-[#B9691B] bg-clip-text italic text-transparent">
                Travel
              </span>
            </h2>

            <p className="mt-2 max-w-xl text-xs font-medium leading-5 text-[#607169] sm:text-sm">
              Choose a travel style and discover experiences made for you.
            </p>
          </div>

          <Link
            href="/destinations"
            className="group hidden shrink-0 items-center gap-1.5 text-[11px] font-bold text-[#B86D1B] transition-colors hover:text-[#087F5B] sm:flex"
          >
            View All Categories
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* ASYMMETRIC BENTO CATEGORY GRID */}

        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: revealEase }}
          className="mt-5 flex items-center justify-end lg:hidden"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE7E2] bg-white/85 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#087F5B] shadow-[0_8px_22px_rgba(23,33,29,0.08)] backdrop-blur-md sm:text-[11px]">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <motion.span
                animate={{ scale: [1, 2, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute h-2 w-2 rounded-full bg-[#F4B942]"
              />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#D98B26]" />
            </span>

            <span>Swipe to explore</span>

            <motion.span
              animate={{ x: [-2, 6, -2] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowRight size={15} strokeWidth={2.2} />
            </motion.span>
          </div>
        </motion.div>

        <div className="mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 touch-pan-x overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-5 lg:grid lg:grid-cols-3 lg:grid-rows-[230px_230px_250px] lg:gap-5 lg:overflow-visible lg:pb-0">
          {travelCategories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: revealEase,
              }}
              className={[
                "w-full min-w-full shrink-0 snap-start lg:w-auto lg:min-w-0",
                categoryLayoutClasses[index],
              ].join(" ")}
            >
              <Link
                href={`/destinations?category=${category.slug}`}
                className="group relative block h-full min-h-[270px] overflow-hidden rounded-xl bg-[#DDE9E3] shadow-[0_8px_24px_rgba(14,23,19,0.09)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(14,23,19,0.20)] md:min-h-[310px] lg:min-h-0"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes={index === 0 ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                  className="object-cover saturate-[1.08] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.65] via-black/[0.08] to-transparent transition-colors duration-500 group-hover:from-black/[0.55]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#087F5B]/[0.04] via-transparent to-[#F4B942]/[0.07] opacity-80 transition-opacity duration-500 group-hover:opacity-40" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div className="min-w-0 text-left text-white">
                    <h3 className={index === 0 ? "truncate [font-family:Georgia,'Times_New_Roman',serif] text-[24px] font-normal leading-tight tracking-[-0.025em] [text-shadow:0_3px_20px_rgba(0,0,0,0.35)] sm:text-[30px]" : "truncate [font-family:Georgia,'Times_New_Roman',serif] text-[20px] font-normal leading-tight tracking-[-0.02em] [text-shadow:0_3px_18px_rgba(0,0,0,0.35)] sm:text-[24px]"}>
                      {category.title}
                    </h3>

                    <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#FFE0A2] sm:text-[11px]">
                      {category.destinations} destinations
                    </p>
                  </div>

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/55 bg-black/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md transition-all duration-300 group-hover:rotate-[-12deg] group-hover:border-[#FFD078] group-hover:bg-[#F4B942] group-hover:text-[#17211D] sm:h-14 sm:w-14">
                    <ArrowRight size={22} strokeWidth={1.5} className="-rotate-45" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* MOBILE VIEW ALL */}

        <div className="mt-4 flex justify-center sm:hidden">
          <Link
            href="/destinations"
            className="group inline-flex items-center gap-1.5 rounded-full border border-[#DCE7E2] bg-[#F8FAF9] px-4 py-2 text-[11px] font-bold text-[#087F5B]"
          >
            View All Categories
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}