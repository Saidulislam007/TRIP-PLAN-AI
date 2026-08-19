"use client";

import { ArrowRight, Compass, ClipboardCheck, Map, Users } from "lucide-react";

type JourneyStep = {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const journeySteps: JourneyStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Explore destinations based on your interests, budget and travel style.",
    icon: <Compass size={23} strokeWidth={1.8} />,
  },
  {
    number: "02",
    title: "Evaluate",
    description: "Understand ratings, traveler reviews and AI insights.",
    icon: <Map size={23} strokeWidth={1.8} />,
  },
  {
    number: "03",
    title: "Plan",
    description: "Create your personalized trip using AI.",
    icon: <ClipboardCheck size={23} strokeWidth={1.8} />,
  },
  {
    number: "04",
    title: "Travel Better",
    description: "Optimize your budget, collaborate and manage your journey.",
    icon: <Users size={23} strokeWidth={1.8} />,
  },
];

export default function TravelJourney() {
  return (
    <section className="w-full bg-white pb-12 pt-3 sm:pb-14 sm:pt-4">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            TITLE
        ====================================================== */}

        <div className="relative flex items-center justify-center">
          {/* TOP LINE */}

          <div className="absolute left-0 right-0 top-1/2 h-px bg-[#E9EFEC]" />

          <h2 className="relative z-10 bg-white px-5 text-[20px] font-extrabold tracking-[-0.025em] text-[#17211D] sm:px-7 sm:text-[23px]">
            From Inspiration to Itinerary
          </h2>
        </div>

        {/* =====================================================
            JOURNEY STEPS
        ====================================================== */}

        <div className="relative mt-7">
          {/* DESKTOP CONNECTING LINE */}

          <div className="absolute left-[8%] right-[8%] top-[30px] hidden h-px border-t border-dashed border-[#B9D8CC] lg:block" />

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {journeySteps.map((step, index) => (
              <JourneyStep
                key={step.number}
                step={step}
                isLast={index === journeySteps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   JOURNEY STEP
================================================================ */

function JourneyStep({ step, isLast }: { step: JourneyStep; isLast: boolean }) {
  return (
    <div className="relative flex items-start gap-3 lg:gap-3">
      {/* =====================================================
          ICON
      ====================================================== */}

      <div className="relative z-10 flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border border-[#DDEBE5] bg-[#F1F7F4] text-[#087F5B] shadow-[0_3px_12px_rgba(23,33,29,0.04)]">
        {/* Inner circle */}

        <div className="flex h-[43px] w-[43px] items-center justify-center rounded-full bg-[#E7F2EC]">
          {step.icon}
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="min-w-0 flex-1 pt-0.5">
        {/* NUMBER */}

        <span className="text-[9px] font-bold text-[#8CA099]">
          {step.number}
        </span>

        {/* TITLE */}

        <h3 className="mt-0.5 text-[12px] font-extrabold text-[#17211D] sm:text-[13px]">
          {step.title}
        </h3>

        {/* DESCRIPTION */}

        <p className="mt-1 max-w-[180px] text-[9px] font-medium leading-[1.55] text-[#68756F] sm:text-[10px]">
          {step.description}
        </p>
      </div>

      {/* =====================================================
          MOBILE ARROW
      ====================================================== */}

      {!isLast && (
        <div className="absolute -bottom-5 left-[25px] text-[#7CB5A0] sm:hidden">
          <ArrowRight size={16} className="rotate-90" />
        </div>
      )}

      {/* =====================================================
          DESKTOP ARROW
      ====================================================== */}

      {!isLast && (
        <div className="absolute right-[-10px] top-[24px] z-20 hidden lg:block">
          <ArrowRight size={17} strokeWidth={1.8} className="text-[#73AE97]" />
        </div>
      )}
    </div>
  );
}
