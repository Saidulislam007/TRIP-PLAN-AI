"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Bookmark,
  Camera,
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Grid2X2,
  Heart,
  Hotel,
  List,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Send,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  ThumbsUp,
  UserRound,
  Users,
  UsersRound,
  Utensils,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  getMyReviews,
  getReviews,
  getReviewStats,
  type ExperienceRatingItem,
  type ReviewItem,
} from "@/lib/api/reviews";
import { useSession } from "@/lib/auth-client";

/* ============================================================
   TYPES + DATA ICON MAP
============================================================ */

type Review = {
  id: string | number;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  title: string;
  text: string;
  destination: string;
  tripType: string;
  date: string;
  helpful: number;
  verified: boolean;
};

const experienceIconMap = {
  Sparkles,
  Utensils,
  UsersRound,
  Car,
  Hotel,
  CircleDollarSign,
  ShieldCheck,
};

function normalizeReview(review: ReviewItem, index: number): Review {
  return {
    id: review._id ?? review.id ?? index + 1,
    name: review.name ?? "Traveler",
    avatar: review.avatar ?? "https://ui-avatars.com/api/?name=Traveler",
    location: review.location ?? "Bangladesh",
    rating: Number(review.rating ?? 0),
    title: review.title ?? "Travel experience",
    text: review.text ?? review.reviewText ?? "",
    destination: review.destination ?? "Bangladesh",
    tripType: review.tripType ?? "Traveler",
    date: review.date ?? "",
    helpful: Number(review.helpful ?? 0),
    verified: review.verified ?? false,
  };
}

/* ============================================================
   ANIMATION
============================================================ */

const reviewCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },

  visible: (index: number) => ({
    opacity: 1,
    y: 0,

    transition: {
      delay: index * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ============================================================
   STAR RATING
============================================================ */

function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.round(rating);

        return (
          <Star
            key={star}
            size={size}
            className={filled ? "text-[#F4A62A]" : "text-[#D6DDD9]"}
            fill={filled ? "currentColor" : "transparent"}
          />
        );
      })}
    </div>
  );
}

/* ============================================================
   REVIEW TOOLBAR
============================================================ */

function ReviewToolbar({ totalReviews, title = "Traveler Reviews" }: { totalReviews: number; title?: string }) {
  const [view, setView] = useState<"grid" | "list">("list");

  return (
    <div
      className="
        mb-4
        flex
        flex-col
        gap-3
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div>
        <h2 className="text-[16px] font-bold text-[#17211D]">
          {title}
        </h2>

        <p className="mt-1 text-[9px] text-[#89938F]">{totalReviews.toLocaleString()} reviews found</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Sort */}

        <button
          type="button"
          className="
            flex
            h-8
            items-center
            gap-2
            rounded-lg
            border
            border-[#DCE5E1]
            bg-white
            px-2.5
            text-[9px]
            text-[#4B5953]
            transition-all
            hover:border-[#087F5B]
          "
        >
          <span className="text-[#87928D]">Sort by:</span>

          <span className="font-semibold text-[#17211D]">Most Helpful</span>

          <ChevronDown size={11} />
        </button>

        {/* View */}

        <div
          className="
            flex
            h-8
            overflow-hidden
            rounded-lg
            border
            border-[#DCE5E1]
            bg-white
          "
        >
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`
              flex
              w-8
              items-center
              justify-center
              transition-colors
              ${
                view === "grid"
                  ? "bg-[#EAF5F0] text-[#087F5B]"
                  : "text-[#89938F] hover:bg-[#F7FAF8]"
              }
            `}
          >
            <Grid2X2 size={13} />
          </button>

          <button
            type="button"
            onClick={() => setView("list")}
            className={`
              flex
              w-8
              items-center
              justify-center
              transition-colors
              ${
                view === "list"
                  ? "bg-[#EAF5F0] text-[#087F5B]"
                  : "text-[#89938F] hover:bg-[#F7FAF8]"
              }
            `}
          >
            <List size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REVIEW CARD
============================================================ */

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [helpful, setHelpful] = useState(false);
  const [saved, setSaved] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      custom={index}
      variants={reviewCardVariants}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
            }
      }
      className="
        group
        rounded-[14px]
        border
        border-[#E0E7E4]
        bg-white
        p-4
        shadow-[0_3px_14px_rgba(11,37,34,0.035)]
        transition-[box-shadow,border-color]
        duration-300
        hover:border-[#C8D8D1]
        hover:shadow-[0_14px_32px_rgba(11,37,34,0.09)]
      "
    >
      <div className="flex gap-3">
        {/* Avatar */}

        <motion.div
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.08,
                }
          }
          className="
            relative
            h-9
            w-9
            shrink-0
            overflow-hidden
            rounded-full
            border
            border-[#DCE5E1]
          "
        >
          <Image
            src={review.avatar}
            alt={review.name}
            fill
            sizes="36px"
            className="object-cover"
          />
        </motion.div>

        {/* Main */}

        <div className="min-w-0 flex-1">
          {/* Name row */}

          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="text-[11px] font-bold text-[#17211D]">
              {review.name}
            </h3>

            {review.verified && (
              <span className="inline-flex items-center gap-1 text-[7px] font-semibold text-[#087F5B]">
                <CheckCircle2 size={9} />
                Verified Traveler
              </span>
            )}
          </div>

          <p className="mt-0.5 text-[8px] text-[#8A9590]">{review.location}</p>

          {/* Rating */}

          <div className="mt-2 flex items-center gap-2">
            <Stars rating={review.rating} size={11} />

            <span className="text-[9px] font-semibold text-[#17211D]">
              {review.rating.toFixed(1)}
            </span>
          </div>

          {/* Title */}

          <h4 className="mt-2 text-[12px] font-bold text-[#17211D]">
            {review.title}
          </h4>

          {/* Meta */}

          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[8px] text-[#87928D]">
            <span>{review.destination}</span>

            <span>•</span>

            <span>{review.tripType}</span>

            <span>•</span>

            <span>{review.date}</span>
          </div>

          {/* Text */}

          <p
            className="
              mt-2
              max-w-[620px]
              text-[9px]
              leading-[1.7]
              text-[#59665F]
            "
          >
            {review.text}
          </p>

          {/* Actions */}

          <div className="mt-3 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setHelpful(!helpful)}
              className={`
                group/action
                inline-flex
                items-center
                gap-1.5
                text-[8px]
                font-medium
                transition-colors
                ${
                  helpful
                    ? "text-[#087F5B]"
                    : "text-[#78847E] hover:text-[#087F5B]"
                }
              `}
            >
              <ThumbsUp
                size={11}
                fill={helpful ? "currentColor" : "transparent"}
              />
              Helpful {review.helpful + (helpful ? 1 : 0)}
            </button>

            <button
              type="button"
              onClick={() => setSaved(!saved)}
              className={`
                inline-flex
                items-center
                gap-1.5
                text-[8px]
                font-medium
                transition-colors
                ${
                  saved
                    ? "text-[#087F5B]"
                    : "text-[#78847E] hover:text-[#087F5B]"
                }
              `}
            >
              <Bookmark
                size={11}
                fill={saved ? "currentColor" : "transparent"}
              />
              Save
            </button>

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-1.5
                text-[8px]
                font-medium
                text-[#78847E]
                transition-colors
                hover:text-[#087F5B]
              "
            >
              <Share2 size={11} />
              Share
            </button>

            <button
              type="button"
              className="
                ml-auto
                text-[#9AA39F]
                transition-colors
                hover:text-[#17211D]
              "
            >
              <MoreHorizontal size={15} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================
   TRAVELER RATING CARD
============================================================ */

function TravelerRatingCard({
  average,
  totalLabel,
  ratingBars,
}: {
  average: number;
  totalLabel: string;
  ratingBars: Array<{ stars: number; percentage: number }>;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
            }
      }
      className="
        rounded-[14px]
        border
        border-[#DCE5E1]
        bg-white
        p-4
        shadow-[0_4px_18px_rgba(11,37,34,0.045)]
        transition-shadow
        duration-300
        hover:shadow-[0_14px_30px_rgba(11,37,34,0.09)]
      "
    >
      <h3 className="text-[12px] font-bold text-[#17211D]">Traveler Rating</h3>

      <div className="mt-3 flex items-center gap-3">
        <motion.div
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.05,
                }
          }
        >
          <div className="text-[27px] font-bold tracking-[-0.04em] text-[#17211D]">
            {average}
            <span className="text-[11px] font-medium text-[#7D8983]"> / 5</span>
          </div>
        </motion.div>

        <div>
          <Stars rating={average} size={12} />

          <p className="mt-1 text-[8px] text-[#8B9691]">{totalLabel}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {ratingBars.map((bar) => (
          <div key={bar.stars} className="flex items-center gap-2">
            <span className="w-[24px] text-[8px] font-medium text-[#68756F]">
              {bar.stars} ★
            </span>

            <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#EAF0ED]">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        width: 0,
                      }
                }
                whileInView={{
                  width: `${bar.percentage}%`,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                  delay: (5 - bar.stars) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-full bg-[#087F5B]"
              />
            </div>

            <span className="w-[25px] text-right text-[8px] text-[#7D8983]">
              {bar.percentage}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ============================================================
   EXPERIENCE RATINGS CARD
============================================================ */

function ExperienceRatingsCard({ ratings }: { ratings: ExperienceRatingItem[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
            }
      }
      className="
        rounded-[14px]
        border
        border-[#DCE5E1]
        bg-white
        p-4
        shadow-[0_4px_18px_rgba(11,37,34,0.045)]
        transition-shadow
        duration-300
        hover:shadow-[0_14px_30px_rgba(11,37,34,0.09)]
      "
    >
      <h3 className="text-[12px] font-bold text-[#17211D]">
        Experience Ratings
      </h3>

      <div className="mt-4 space-y-3">
        {ratings.map((item, index) => {
          const Icon = experienceIconMap[item.icon] ?? Sparkles;

          return (
          <motion.div
            key={item.label}
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    x: 3,
                  }
            }
            className="flex items-center gap-2"
          >
            <div className="flex w-[86px] items-center gap-1.5 text-[8px] text-[#68756F]">
              <span className="text-[#087F5B]"><Icon size={12} /></span>

              <span className="truncate">{item.label}</span>
            </div>

            <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#EAF0ED]">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        width: 0,
                      }
                }
                whileInView={{
                  width: `${(item.rating / 5) * 100}%`,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-full bg-[#087F5B]"
              />
            </div>

            <span className="w-[20px] text-right text-[8px] font-bold text-[#526058]">
              {item.rating}
            </span>
          </motion.div>
          );
        })}
      </div>

      <Link
        href="/reviews/categories"
        className="
          group
          mt-4
          flex
          items-center
          justify-center
          gap-1
          text-[9px]
          font-semibold
          text-[#087F5B]
          transition-colors
          hover:text-[#F4A62A]
        "
      >
        View All Categories
        <motion.span
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  x: 3,
                }
          }
        >
          <ArrowRight size={11} />
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ============================================================
   ASK AI CARD
============================================================ */

function AskAIReviewsCard() {
  const [question, setQuestion] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const suggestions = [
    "Is Cox's Bazar good for families?",
    "What do travelers love most?",
    "Any concerns about peak season?",
    "Which destination is best for couples?",
  ];

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -5,
            }
      }
      className="
        relative
        overflow-hidden
        rounded-[14px]
        border
        border-[#075143]
        bg-[#063A2F]
        p-4
        text-white
        shadow-[0_7px_22px_rgba(6,58,47,0.15)]
      "
    >
      {/* Background */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -right-14
          -top-14
          h-36
          w-36
          rounded-full
          bg-[#087F5B]/25
          blur-3xl
        "
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.12, 1],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: [0, 8, -8, 0],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <Sparkles
              size={15}
              className="text-[#F4B942]"
              fill="currentColor"
            />
          </motion.div>

          <h3 className="text-[12px] font-bold">Ask AI About Reviews</h3>
        </div>

        <p className="mt-2 text-[9px] leading-[1.55] text-white/65">
          Get AI-powered answers from thousands of traveler experiences.
        </p>

        {/* Suggestions */}

        <div className="mt-3 space-y-1.5">
          {suggestions.map((suggestion) => (
            <motion.button
              key={suggestion}
              type="button"
              onClick={() => setQuestion(suggestion)}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: 3,
                      borderColor: "rgba(244,185,66,0.5)",
                      backgroundColor: "rgba(244,166,42,0.08)",
                    }
              }
              className="
                block
                w-full
                rounded-full
                border
                border-white/15
                bg-white/[0.04]
                px-2.5
                py-1.5
                text-left
                text-[8px]
                text-white/75
                transition-colors
              "
            >
              {suggestion}
            </motion.button>
          ))}
        </div>

        {/* Input */}

        <div
          className="
            mt-4
            flex
            h-9
            items-center
            gap-2
            rounded-lg
            border
            border-white/15
            bg-white/[0.06]
            px-2
            focus-within:border-[#F4B942]/60
          "
        >
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything..."
            className="
              min-w-0
              flex-1
              bg-transparent
              text-[9px]
              text-white
              outline-none
              placeholder:text-white/35
            "
          />

          <motion.button
            type="button"
            whileHover={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 1.08,
                    rotate: -4,
                  }
            }
            whileTap={
              shouldReduceMotion
                ? undefined
                : {
                    scale: 0.95,
                  }
            }
            className="
              flex
              h-6
              w-6
              shrink-0
              items-center
              justify-center
              rounded-md
              bg-[#F4A62A]
              text-[#063A2F]
              transition-colors
              hover:bg-[#F8B94C]
            "
          >
            <Send size={11} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   PAGINATION
============================================================ */

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pageItems: Array<number | "ellipsis-left" | "ellipsis-right"> = [];

  if (totalPages <= 7) {
    for (let page = 1; page <= totalPages; page += 1) pageItems.push(page);
  } else {
    pageItems.push(1);

    if (currentPage > 4) pageItems.push("ellipsis-left");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let page = start; page <= end; page += 1) pageItems.push(page);

    if (currentPage < totalPages - 3) pageItems.push("ellipsis-right");

    pageItems.push(totalPages);
  }

  return (
    <div className="mt-5 flex items-center justify-center gap-1.5">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-7 w-7 items-center justify-center rounded-md text-[#89938F] transition-colors hover:bg-[#EAF3EF] hover:text-[#087F5B] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-[#89938F]"
        aria-label="Previous page"
      >
        <ChevronLeft size={13} />
      </button>

      {pageItems.map((item) =>
        typeof item === "number" ? (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            className={`
              flex h-7 min-w-7 items-center justify-center rounded-md px-1.5
              text-[9px] font-semibold transition-all
              ${
                item === currentPage
                  ? "bg-[#063A2F] text-white shadow-[0_4px_10px_rgba(6,58,47,0.15)]"
                  : "text-[#68756F] hover:bg-[#EAF3EF] hover:text-[#087F5B]"
              }
            `}
            aria-current={item === currentPage ? "page" : undefined}
          >
            {item}
          </button>
        ) : (
          <span key={item} className="px-1 text-[9px] text-[#9AA39F]">
            ...
          </span>
        ),
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="ml-1 flex h-7 items-center gap-1 rounded-md px-2 text-[9px] font-semibold text-[#087F5B] transition-colors hover:bg-[#EAF3EF] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent"
      >
        Next
        <ChevronRight size={13} />
      </button>
    </div>
  );
}

/* ============================================================
   MAIN SECTION
============================================================ */

export default function TravelerReviewsSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending: isSessionPending } = useSession();
  const showMyReviews = searchParams.get("mine") === "1";
  const sessionUserId = session?.user?.id;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [experienceRatings, setExperienceRatings] = useState<ExperienceRatingItem[]>([]);
  const [ratingOverview, setRatingOverview] = useState({
    average: 0,
    totalLabel: "0 reviews",
    ratingBars: [] as Array<{ stars: number; percentage: number }>,
  });
  const [totalReviews, setTotalReviews] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    if (showMyReviews && isSessionPending) return;

    if (showMyReviews && !sessionUserId) {
      const myReviewsPath = "/reviews?mine=1#traveler-reviews";
      router.replace(`/login?redirect=${encodeURIComponent(myReviewsPath)}`);
      return;
    }

    let active = true;
    setIsLoadingReviews(true);

    if (showMyReviews) {
      getMyReviews()
        .then((reviewData) => {
          if (!active) return;
          setReviews(reviewData.map(normalizeReview));
          setTotalReviews(reviewData.length);
        })
        .catch((error) => {
          if (!active) return;
          console.error("Failed to load your reviews:", error);
          setReviews([]);
          setTotalReviews(0);
        })
        .finally(() => {
          if (active) setIsLoadingReviews(false);
        });

      return () => {
        active = false;
      };
    }

    Promise.all([getReviews(currentPage, 10), getReviewStats()])
      .then(([reviewData, statsData]) => {
        if (!active) return;

        setReviews(reviewData.reviews.map(normalizeReview));
        setExperienceRatings(statsData.experienceRatings ?? []);
        setRatingOverview(statsData.ratingOverview);
        setTotalReviews(reviewData.total);
        setTotalPages(reviewData.totalPages);

        if (reviewData.page !== currentPage) {
          setCurrentPage(reviewData.page);
        }
      })
      .catch((error) => {
        if (!active) return;
        console.error("Failed to load traveler reviews:", error);
        setReviews([]);
        setTotalReviews(0);
      })
      .finally(() => {
        if (active) setIsLoadingReviews(false);
      });

    return () => {
      active = false;
    };
  }, [showMyReviews, isSessionPending, sessionUserId, router, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);

    requestAnimationFrame(() => {
      document.getElementById("traveler-reviews")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <section
      id="traveler-reviews"
      className="
        bg-[#F7F7F2]
        pb-12
        pt-4
        sm:pb-16
      "
    >
      <div
        className="
          mx-auto
          max-w-[1440px]
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* ==================================================
            MAIN 2 COLUMN LAYOUT
        =================================================== */}

        <div
          className={`
            grid
            grid-cols-1
            gap-5
            ${
              showMyReviews
                ? "lg:grid-cols-1"
                : "lg:grid-cols-[minmax(0,1fr)_235px] xl:grid-cols-[minmax(0,1fr)_250px]"
            }
          `}
        >
          {/* ================================================
              CENTER REVIEWS
          ================================================= */}

          <main className="min-w-0">
            <ReviewToolbar
              totalReviews={totalReviews}
              title={showMyReviews ? "My Reviews" : "Traveler Reviews"}
            />

            {isLoadingReviews ? (
              <div className="rounded-xl border border-[#DCE5E1] bg-white px-5 py-10 text-center text-[11px] text-[#6B7772]">
                Loading reviews...
              </div>
            ) : reviews.length > 0 ? (
              <>
                <div className="space-y-3">
                  {reviews.map((review, index) => (
                    <ReviewCard key={review.id} review={review} index={index} />
                  ))}
                </div>

                {!showMyReviews && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="rounded-xl border border-[#DCE5E1] bg-white px-5 py-10 text-center">
                <p className="text-[13px] font-semibold text-[#17211D]">
                  {showMyReviews ? "You have not submitted any reviews yet." : "No reviews found."}
                </p>
                {showMyReviews && (
                  <Link
                    href="/reviews/write-review"
                    className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#087F5B] hover:underline"
                  >
                    Write a Review
                    <ArrowRight size={12} />
                  </Link>
                )}
              </div>
            )}
          </main>

          {/* ================================================
              RIGHT SIDEBAR
          ================================================= */}

          {!showMyReviews && (
            <aside className="space-y-4 lg:sticky lg:top-5 lg:self-start">
              <TravelerRatingCard
                average={ratingOverview.average}
                totalLabel={ratingOverview.totalLabel}
                ratingBars={ratingOverview.ratingBars}
              />

              <ExperienceRatingsCard ratings={experienceRatings} />

              <AskAIReviewsCard />
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
