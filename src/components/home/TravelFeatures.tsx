"use client";

import { motion } from "framer-motion";
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

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function TravelFeatures() {
  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="relative overflow-hidden rounded-[28px] border border-[#183B32]/70 bg-[#071A16] px-5 py-10 shadow-[0_24px_70px_rgba(7,26,22,0.16)] sm:rounded-[32px] sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-12">
          {/* DECORATIVE LIGHT */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#087F5B]/25 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 right-[8%] h-72 w-72 rounded-full bg-[#F4B942]/15 blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-[#FFD078]/60 to-transparent"
          />

          {/* SECTION TITLE */}

          <motion.div
            initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: revealEase }}
            className="relative z-10 mx-auto max-w-[780px] text-center"
          >
            <div className="mx-auto mb-4 flex items-center justify-center gap-2.5">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#F4B942]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFD078] shadow-[0_0_14px_rgba(255,208,120,0.75)]" />
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#F4B942]" />
            </div>

            <h2 className="[font-family:Georgia,'Times_New_Roman',serif] text-[30px] font-normal leading-[1.08] tracking-[-0.035em] text-white sm:text-[38px] lg:text-[44px]">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-[#FFD078] via-[#F4AD3F] to-[#D98B26] bg-clip-text italic text-transparent">
                Travel Smarter
              </span>
            </h2>
          </motion.div>

          {/* FEATURES */}

          <div className="relative z-10 mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5">
            {features.map((feature, index) => (
              <FeatureItem
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FEATURE ITEM
================================================================ */

function FeatureItem({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.92, filter: "blur(9px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: revealEase }}
      className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-[22px] border border-white/[0.11] bg-white/[0.055] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#FFD078]/35 hover:bg-white/[0.085] hover:shadow-[0_18px_38px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.10)] sm:min-h-[235px] sm:p-6 xl:min-h-[255px] xl:p-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#F4B942]/0 blur-[35px] transition-colors duration-500 group-hover:bg-[#F4B942]/15"
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#8FD8BF]/20 bg-[#0C3228]/80 text-[#8FE0C2] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[border-color,background-color,color,box-shadow,transform] duration-300 group-hover:rotate-[-4deg] group-hover:scale-105 group-hover:border-[#FFD078]/35 group-hover:bg-[#F4A934] group-hover:text-[#17211D] group-hover:shadow-[0_10px_24px_rgba(217,134,31,0.24)]">
          {feature.icon}
        </div>

        <span className="[font-family:Georgia,'Times_New_Roman',serif] text-[11px] italic tracking-[0.08em] text-white/30 transition-colors duration-300 group-hover:text-[#FFD078]/75">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10 mt-auto pt-8 xl:pt-10">
        <h3 className="[font-family:Georgia,'Times_New_Roman',serif] text-[19px] font-normal leading-tight tracking-[-0.025em] text-white sm:text-[20px] xl:text-[18px]">
          {feature.title}
        </h3>

        <p className="mt-2 max-w-[230px] text-[11px] font-medium leading-[1.65] text-white/58 sm:text-[12px] xl:text-[11px]">
          {feature.description}
        </p>
      </div>

      <div className="absolute inset-x-5 bottom-0 h-px overflow-hidden bg-white/10 sm:inset-x-6 xl:inset-x-5">
        <div className="h-full w-0 bg-gradient-to-r from-[#087F5B] via-[#8FE0C2] to-[#F4B942] transition-[width] duration-500 ease-out group-hover:w-full" />
      </div>
    </motion.article>
  );
}