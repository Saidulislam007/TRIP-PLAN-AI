import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

import PackageBooking from "@/components/tour-packages/PackageBooking";

/* ============================================================
   TOUR PACKAGES DATA
============================================================ */

const packages = [
  {
    id: 1,
    slug: "coxs-bazar-family-escape",
    title: "Cox’s Bazar Family Escape",
    destination: "Cox’s Bazar",
    subtitle: "Beach days, seafood nights & family comfort",

    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop",

    duration: "3 Days · 2 Nights",
    people: "2–5 People",

    price: 12500,
    oldPrice: 15000,

    company: "Travel Bangladesh",

    description:
      "Enjoy a relaxing Cox’s Bazar getaway with a comfortable hotel stay, beach time, local food and carefully planned sightseeing.",

    includes: [
      "Hotel accommodation",
      "Breakfast",
      "Local transport",
      "Beach sightseeing",
      "Tour assistance",
    ],
  },

  {
    id: 2,
    slug: "sajek-cloud-adventure",
    title: "Sajek Cloud Adventure",
    destination: "Sajek Valley",
    subtitle: "Clouds, sunrise & hillside stays",

    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",

    duration: "2 Days · 1 Night",
    people: "2–6 People",

    price: 8500,
    oldPrice: 10500,

    company: "Hill Track Tours",

    description:
      "A short Sajek escape designed for travellers who want hill views, sunrise, cloud-covered roads and a peaceful resort stay.",

    includes: [
      "Resort accommodation",
      "Transport",
      "Sajek sightseeing",
      "Sunrise experience",
      "Tour coordinator",
    ],
  },

  {
    id: 3,
    slug: "sylhet-tea-garden-journey",
    title: "Sylhet Tea Garden Journey",
    destination: "Sylhet",

    subtitle:
      "Tea estates, waterfalls & green valleys",

    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1400&auto=format&fit=crop",

    duration: "3 Days · 2 Nights",
    people: "2–4 People",

    price: 11000,

    company: "Green Valley Travel",

    description:
      "Discover the green landscapes of Sylhet with tea gardens, peaceful countryside, local food and selected attractions.",

    includes: [
      "Hotel stay",
      "Breakfast",
      "Transport",
      "Tea garden visit",
      "Selected sightseeing",
    ],
  },

  {
    id: 4,
    slug: "saint-martin-island-retreat",
    title: "Saint Martin Island Retreat",
    destination: "Saint Martin",

    subtitle:
      "Blue water, island evenings & fresh seafood",

    image:
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?q=80&w=1400&auto=format&fit=crop",

    duration: "4 Days · 3 Nights",
    people: "2–4 People",

    price: 17500,
    oldPrice: 20000,

    company: "Ocean Trip BD",

    description:
      "Spend a few peaceful days beside the sea with island exploration, comfortable accommodation and relaxed evenings.",

    includes: [
      "Hotel / resort stay",
      "Ship tickets",
      "Island sightseeing",
      "Selected meals",
      "Travel assistance",
    ],
  },

  {
    id: 5,
    slug: "bandarban-hill-journey",
    title: "Bandarban Hill Journey",
    destination: "Bandarban",

    subtitle:
      "Hill roads, viewpoints & local culture",

    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1400&auto=format&fit=crop",

    duration: "3 Days · 2 Nights",
    people: "3–6 People",

    price: 13500,

    company: "Explore Bangladesh",

    description:
      "Explore Bandarban’s hills, scenic roads and viewpoints through a carefully planned adventure package.",

    includes: [
      "Hotel accommodation",
      "Local transportation",
      "Hill sightseeing",
      "Guide assistance",
      "Selected meals",
    ],
  },

  {
    id: 6,
    slug: "sundarbans-wildlife-tour",
    title: "Sundarbans Wildlife Tour",
    destination: "Sundarbans",

    subtitle:
      "River cruise, forest trails & wildlife",

    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1400&auto=format&fit=crop",

    duration: "3 Days · 2 Nights",
    people: "4–8 People",

    price: 14500,

    company: "Nature Explorer BD",

    description:
      "Experience the Sundarbans with river journeys, mangrove landscapes and guided wildlife exploration.",

    includes: [
      "Boat accommodation",
      "Meals",
      "Forest permits",
      "Guide",
      "River sightseeing",
    ],
  },
];

/* ============================================================
   PRICE FORMATTER
============================================================ */

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD").format(price);
}

/* ============================================================
   PAGE PROPS
============================================================ */

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* ============================================================
   PAGE
============================================================ */

export default async function TourPackageDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const tour = packages.find(
    (item) => item.slug === slug
  );

  if (!tour) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f5f0]">
      {/* ========================================================
          HERO IMAGE
      ======================================================== */}

      <section className="relative h-[520px] overflow-hidden md:h-[620px]">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 md:pb-14 lg:px-8">
            <Link
              href="/tour-packages"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
            >
              <ArrowLeft size={17} />

              Back to packages
            </Link>

            <div className="flex items-center gap-2 text-sm text-white/75">
              <MapPin size={16} />

              {tour.destination}
            </div>

            <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
              {tour.title}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-white/75">
              {tour.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          CONTENT
      ======================================================== */}

      <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px]">
          {/* ====================================================
              LEFT SIDE
          ==================================================== */}

          <div>
            {/* QUICK INFORMATION */}

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {/* DURATION */}

              <div className="rounded-2xl bg-white p-5">
                <CalendarDays
                  size={20}
                  className="text-[#1b493d]"
                />

                <p className="mt-3 text-xs text-[#8a938f]">
                  Duration
                </p>

                <p className="mt-1 font-semibold text-[#20362f]">
                  {tour.duration}
                </p>
              </div>

              {/* TRAVELLERS */}

              <div className="rounded-2xl bg-white p-5">
                <Users
                  size={20}
                  className="text-[#1b493d]"
                />

                <p className="mt-3 text-xs text-[#8a938f]">
                  Travellers
                </p>

                <p className="mt-1 font-semibold text-[#20362f]">
                  {tour.people}
                </p>
              </div>

              {/* OPERATOR */}

              <div className="rounded-2xl bg-white p-5">
                <ShieldCheck
                  size={20}
                  className="text-[#1b493d]"
                />

                <p className="mt-3 text-xs text-[#8a938f]">
                  Operator
                </p>

                <p className="mt-1 font-semibold text-[#20362f]">
                  {tour.company}
                </p>
              </div>
            </div>

            {/* ==================================================
                ABOUT
            ================================================== */}

            <div className="mt-8 rounded-[28px] bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9a7640]">
                About this trip
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#213a32]">
                A complete travel experience
              </h2>

              <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[#69736f]">
                {tour.description}
              </p>
            </div>

            {/* ==================================================
                WHAT'S INCLUDED
            ================================================== */}

            <div className="mt-6 rounded-[28px] bg-white p-6 sm:p-8">
              <h2 className="font-serif text-2xl font-semibold text-[#213a32]">
                What&apos;s included
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#7c8782]">
                These services are included
                with your selected tour
                package.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {tour.includes.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-[#f5f7f4] p-4"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1b493d] text-white">
                        <Check size={14} />
                      </div>

                      <span className="text-sm font-medium text-[#52615b]">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* ====================================================
              BOOKING CARD
          ==================================================== */}

          <aside>
            <div className="sticky top-24 rounded-[28px] bg-[#173d32] p-6 text-white shadow-xl">
              {/* PRICE LABEL */}

              <p className="text-xs uppercase tracking-[0.14em] text-white/50">
                Package price
              </p>

              {/* PRICE */}

              <div className="mt-2 flex items-end gap-3">
                <p className="text-4xl font-bold">
                  ৳
                  {formatPrice(
                    tour.price
                  )}
                </p>

                {tour.oldPrice && (
                  <p className="pb-1 text-sm text-white/40 line-through">
                    ৳
                    {formatPrice(
                      tour.oldPrice
                    )}
                  </p>
                )}
              </div>

              <p className="mt-2 text-xs text-white/50">
                Starting price per package
              </p>

              <div className="my-6 h-px bg-white/10" />

              {/* PACKAGE SUMMARY */}

              <div className="space-y-3 text-sm text-white/70">
                {/* DESTINATION */}

                <p className="flex items-center justify-between gap-4">
                  <span>
                    Destination
                  </span>

                  <strong className="text-right text-white">
                    {tour.destination}
                  </strong>
                </p>

                {/* DURATION */}

                <p className="flex items-center justify-between gap-4">
                  <span>
                    Duration
                  </span>

                  <strong className="text-right text-white">
                    {tour.duration}
                  </strong>
                </p>

                {/* TRAVELLERS */}

                <p className="flex items-center justify-between gap-4">
                  <span>
                    Travellers
                  </span>

                  <strong className="text-right text-white">
                    {tour.people}
                  </strong>
                </p>

                {/* OPERATOR */}

                <p className="flex items-center justify-between gap-4">
                  <span>
                    Operator
                  </span>

                  <strong className="text-right text-white">
                    {tour.company}
                  </strong>
                </p>
              </div>

              {/* ==================================================
                  BOOKING + PAYMENT COMPONENT
              ================================================== */}

              <PackageBooking
                packageId={tour.id}
                packageSlug={tour.slug}
                packageTitle={tour.title}
                destination={tour.destination}
                duration={tour.duration}
                operator={tour.company}
                price={tour.price}
              />

              {/* INFO */}

              <p className="mt-4 text-center text-[11px] leading-5 text-white/40">
                Review availability and
                complete package details
                before confirming your trip.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}