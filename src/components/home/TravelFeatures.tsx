"use client";

import {
  BrainCircuit,
  ClipboardCheck,
  Handshake,
  MessageCircleMore,
  WalletCards,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "AI Trip Planning",
    description: "Build personalized multi-day itineraries.",
    icon: <ClipboardCheck size={23} strokeWidth={1.8} />,
  },
  {
    title: "Smart Recommendations",
    description: "Discover destinations that match you.",
    icon: <BrainCircuit size={23} strokeWidth={1.8} />,
  },
  {
    title: "Review Intelligence",
    description: "Understand thousands of reviews instantly.",
    icon: <MessageCircleMore size={23} strokeWidth={1.8} />,
  },
  {
    title: "Smart Budgeting",
    description: "Make better travel decisions within your budget.",
    icon: <WalletCards size={23} strokeWidth={1.8} />,
  },
  {
    title: "Collaborative Planning",
    description: "Plan together with your travel companions.",
    icon: <Handshake size={23} strokeWidth={1.8} />,
  },
];

export default function TravelFeatures() {
  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        {/* =====================================================
            SECTION TITLE
        ====================================================== */}

        <div className="text-center">
          <h2 className="text-[22px] font-extrabold tracking-[-0.025em] text-[#17211D] sm:text-[25px] lg:text-[27px]">
            Everything You Need to Travel Smarter
          </h2>
        </div>

        {/* =====================================================
            FEATURES
        ====================================================== */}

        <div
          className="
            mt-7
            grid
            grid-cols-1
            gap-7
            sm:grid-cols-2
            lg:grid-cols-5
            lg:gap-4
          "
        >
          {features.map((feature) => (
            <FeatureItem key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FEATURE ITEM
================================================================ */

function FeatureItem({ feature }: { feature: Feature }) {
  return (
    <div className="group flex flex-col items-center text-center">
      {/* =====================================================
          ICON
      ====================================================== */}

      <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#E2EEE8] bg-[#F0F7F3] text-[#087F5B] transition-all duration-300 group-hover:border-[#B9DCCD] group-hover:bg-[#E5F4ED] group-hover:shadow-[0_6px_18px_rgba(8,127,91,0.10)]">
        {feature.icon}
      </div>

      {/* =====================================================
          TITLE
      ====================================================== */}

      <h3 className="mt-3 text-[11px] font-extrabold text-[#17211D] sm:text-[12px]">
        {feature.title}
      </h3>

      {/* =====================================================
          DESCRIPTION
      ====================================================== */}

      <p className="mt-1.5 max-w-[150px] text-[9px] font-medium leading-[1.55] text-[#68756F] sm:text-[10px]">
        {feature.description}
      </p>
    </div>
  );
}
