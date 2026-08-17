"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { MapPin, Search, Sparkles } from "lucide-react";

const popularDestinations = [
  "Cox's Bazar",
  "Sajek Valley",
  "Bandarban",
  "Saint Martin",
  "Sylhet",
];

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden rounded-b-[24px] bg-[#EAF3EF]">
      {/* =====================================================
          HERO BACKGROUND IMAGE
      ====================================================== */}

      <div className="absolute inset-0">
        <Image
          src="/images/travel-hero.jpg"
          alt="Beautiful mountain travel destination"
          fill
          priority
          sizes="100vw"
          className="object-100% object-center"
        />
      </div>

      {/* =====================================================
          LEFT LIGHT OVERLAY
          Keeps text readable while preserving image
      ====================================================== */}

      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 via-[48%] to-white/0" />

      {/* Bottom subtle overlay */}

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto min-h-[430px] max-w-[1440px] px-6 sm:px-10 lg:min-h-[500px] lg:px-16 xl:px-20">
        <div className="flex min-h-[430px] items-center lg:min-h-[500px]">
          <div className="w-full max-w-[650px] py-14 lg:py-16">
            {/* =================================================
                AI BADGE
            ================================================== */}

            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#087F5B]/20 bg-[#F8FAF9]/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
              <Sparkles
                size={12}
                strokeWidth={2.5}
                className="text-[#F4B942]"
              />

              <span className="text-[9px] font-bold uppercase tracking-[0.04em] text-[#087F5B] sm:text-[10px]">
                AI-POWERED TRAVEL PLATFORM
              </span>
            </div>

            {/* =================================================
                HERO HEADING
            ================================================== */}

            <h1 className="max-w-[650px] text-[38px] font-extrabold leading-[0.98] tracking-[-0.035em] text-[#17211D] sm:text-[48px] lg:text-[58px]">
              Discover Your Next
              <br />
              <span className="text-[#087F5B] block py-3">Adventure.</span>
              <span className="text-[#17211D]">Plan It Smarter With AI.</span>
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p className="mt-4 max-w-[520px] text-[13px] font-medium leading-[1.6] text-[#3F4D47] sm:text-[14px]">
              Discover destinations, understand real traveler experiences,
              <br className="hidden sm:block" />
              and get personalized recommendations for the way you love to
              travel.
            </p>

            {/* =================================================
                DESTINATION SEARCH CARD
            ================================================== */}

            <div className="mt-6 mb-20 w-full max-w-[580px] rounded-xl border border-white/70 bg-white/95 p-2 shadow-[0_12px_35px_rgba(23,33,29,0.14)] backdrop-blur-md sm:p-2.5">
              <div className="flex w-full items-center gap-2">
                {/* SEARCH INPUT */}
                <div className="min-w-0 flex-1">
                  <Input
                    aria-label="Search destination"
                    placeholder="Where do you want to explore?"
                    fullWidth
                    startContent={
                      <Search
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 text-[#78857F]"
                      />
                    }
                    endContent={
                      <button
                        type="button"
                        aria-label="Use current location"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#78857F] transition-colors hover:bg-[#E8F7F1] hover:text-[#087F5B]"
                      >
                        <MapPin size={16} strokeWidth={2} />
                      </button>
                    }
                    classNames={{
                      base: "w-full",
                      mainWrapper: "w-full",
                      inputWrapper:
                        "!h-[46px] !w-full rounded-lg border border-[#E4EBE7] bg-white px-3 shadow-none",
                      innerWrapper: "w-full gap-2",
                      input:
                        "w-full text-[13px] font-medium text-[#17211D] placeholder:text-[#8A9690]",
                    }}
                  />
                </div>

                {/* EXPLORE BUTTON */}
                <Button
                  as={Link}
                  href="/destinations"
                  className="!h-[46px] min-w-[82px] shrink-0 rounded-lg bg-[#087F5B] px-5 text-[12px] font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#065F46]"
                >
                  Explore
                </Button>
              </div>

              {/* =================================================
                  POPULAR DESTINATION CHIPS
              ================================================== */}

              <div className="mt-2 flex flex-wrap items-center gap-1.5 px-1 pb-0.5">
                {popularDestinations.map((destination) => (
                  <Link
                    key={destination}
                    href={`/destinations?search=${encodeURIComponent(
                      destination,
                    )}`}
                    className="rounded-full border border-[#E4EBE7] bg-[#F8FAF9] px-2.5 py-1 text-[12px]  font-bold text-[#52615A] transition-all duration-200 hover:border-[#087F5B]/30 hover:bg-[#E8F7F1] hover:text-[#087F5B]"
                  >
                    {destination}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE IMAGE OVERLAY
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-transparent sm:hidden" />
    </section>
  );
}
