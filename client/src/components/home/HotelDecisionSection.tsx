"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BedDouble, Clock3, Star, WalletCards } from "lucide-react";

const decisionPoints = [
  {
    title: "Room-level details",
    description: "AC, hot water and backup power",
    icon: BedDouble,
  },
  {
    title: "Guest signals",
    description: "Cleanliness and staff scores",
    icon: Star,
  },
  {
    title: "True total",
    description: "VAT and discounts made clear",
    icon: WalletCards,
  },
  {
    title: "Flexible policy",
    description: "Cancellation terms made visible",
    icon: Clock3,
  },
];

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function HotelDecisionSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hotel-decision-heading"
      className="overflow-hidden bg-[#f6f3ed] py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1664px] items-stretch gap-10 px-5 sm:px-8 lg:grid-cols-[0.86fr_1.04fr] lg:gap-10 lg:px-12 xl:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: revealEase }}
          className="group relative min-h-[440px] overflow-hidden rounded-[32px] bg-[#123d34] motion-reduce:opacity-100! motion-reduce:transform-none! sm:min-h-[540px] lg:min-h-[580px]"
        >
          <Image
            src="/assets/Coxs/Resort/Ocean Haven Resort.jpg"
            alt="A hotel beside a swimming pool in Cox's Bazar"
            fill
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#07392f]/95 via-[#0a3c31]/18 to-transparent"
          />

          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9 lg:p-10">
            <span className="inline-flex rounded-full bg-[#f1a82c] px-4 py-2 text-[11px] font-extrabold text-[#173d34] shadow-[0_8px_28px_rgba(0,0,0,0.18)] sm:text-xs">
              Transparent total price
            </span>
            <h3 className="mt-5 max-w-xl font-serif text-[32px] font-normal leading-tight tracking-[-0.025em] sm:text-[38px]">
              Stay close to what matters.
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
              Check location, cleanliness, washroom, safety and hidden charges
              before you decide.
            </p>
          </div>
        </motion.div>

        <div className="flex min-w-0 flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: revealEase }}
            className="motion-reduce:opacity-100! motion-reduce:transform-none!"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#c86e05] sm:text-xs">
              Hotel decision assistant
            </p>
            <h2
              id="hotel-decision-heading"
              className="mt-4 max-w-3xl font-serif text-[38px] font-normal leading-[1.04] tracking-[-0.045em] text-[#123d34] sm:text-[48px] lg:text-[54px] xl:text-[60px]"
            >
              Not the cheapest room.<br /> The right room.
            </h2>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-9">
            {decisionPoints.map((point, index) => {
              const Icon = point.icon;

              return (
                <motion.article
                  key={point.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : index * 0.07,
                    ease: revealEase,
                  }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  className="rounded-[22px] border border-[#ddd5c8] bg-white px-6 py-7 shadow-[0_14px_36px_rgba(36,55,48,0.025)] motion-reduce:opacity-100! motion-reduce:transform-none! sm:min-h-[156px] sm:px-7 sm:py-6"
                >
                  <Icon size={25} strokeWidth={1.8} className="text-[#d57708]" aria-hidden="true" />
                  <h3 className="mt-6 text-[17px] font-semibold text-[#183f37] sm:text-lg">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#71817c]">
                    {point.description}
                  </p>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.28 }}
            className="mt-7 motion-reduce:opacity-100! motion-reduce:transform-none!"
          >
            <Link
              href="/hotels"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#0c4b3f] px-6 text-sm font-bold text-white shadow-[0_12px_26px_rgba(12,75,63,0.14)] transition-colors hover:bg-[#093d34] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d57708] motion-reduce:transition-none"
            >
              Find a smarter stay
              <ArrowRight
                size={17}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
