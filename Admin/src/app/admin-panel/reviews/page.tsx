
"use client";

import { useMemo, useState, useEffect, type ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Search,
  Star,
  Eye,
  Trash2,
  X,
  Check,
  Clock,
  MessageSquare,
  MapPin,
} from "lucide-react";

/* =========================
   Types
========================= */

type ReviewStatus = "Published" | "Pending";

interface Review {
  id: string;
  user: string;
  email: string;
  destination: string;
  rating: number;
  date: string;
  comment: string;
  status: ReviewStatus;
  avatar: string;
}

interface ApiReview {
  _id?: string;
  name?: string;
  user?: string;
  email?: string;
  destination?: string;
  rating?: number;
  date?: string;
  createdAt?: string;
  reviewText?: string;
  comment?: string;
  status?: string;
  avatar?: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

interface RatingStarsProps {
  rating: number;
}

interface StatusBadgeProps {
  status: ReviewStatus;
}

interface ActionButtonProps {
  icon: ReactNode;
  onClick: () => void;
  type: "green" | "blue" | "red";
}

interface ModalOverlayProps {
  children: ReactNode;
  onClose: () => void;
}

/* =========================
   Framer Motion Variants
========================= */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/* =========================
   Main Page
========================= */

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<"All" | ReviewStatus>("All");

  const [selectedReview, setSelectedReview] =
    useState<Review | null>(null);

  const [deleteReview, setDeleteReview] =
    useState<Review | null>(null);

  /* =========================
     Fetch Reviews
  ========================= */

  useEffect(() => {
    const fetchReviews = async (): Promise<void> => {
      try {
        const baseUrl = (
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:5000"
        ).replace(/\/+$/, "");

        const response = await fetch(`${baseUrl}/api/reviews`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch reviews: ${response.status}`
          );
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const mappedData: Review[] = result.data.map(
            (item: ApiReview): Review => {
              const userName =
                item.name ||
                item.user ||
                "Anonymous User";

              const reviewDate =
                item.date ||
                item.createdAt ||
                new Date().toISOString();

              return {
                id:
                  item._id ||
                  crypto.randomUUID(),

                user: userName,

                email: item.email || "",

                destination:
                  item.destination ||
                  "Unknown Destination",

                rating:
                  Number(item.rating) || 5,

                date: new Date(
                  reviewDate
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),

                comment:
                  item.reviewText ||
                  item.comment ||
                  "No comment provided.",

                status:
                  item.status === "Published"
                    ? "Published"
                    : "Pending",

                avatar:
                  item.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    userName
                  )}&background=random`,
              };
            }
          );

          setReviews(mappedData);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error(
          "Failed to fetch reviews:",
          error
        );
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  /* =========================
     Search + Filter
  ========================= */

  const filteredReviews = useMemo<Review[]>(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return reviews.filter(
      (review: Review): boolean => {
        const matchesSearch =
          review.user
            .toLowerCase()
            .includes(searchValue) ||
          review.destination
            .toLowerCase()
            .includes(searchValue) ||
          review.comment
            .toLowerCase()
            .includes(searchValue);

        const matchesFilter =
          filter === "All" ||
          review.status === filter;

        return (
          matchesSearch &&
          matchesFilter
        );
      }
    );
  }, [reviews, search, filter]);

  /* =========================
     Statistics
  ========================= */

  const totalReviews: number =
    reviews.length;

  const publishedReviews: number =
    reviews.filter(
      (review: Review) =>
        review.status === "Published"
    ).length;

  const pendingReviews: number =
    reviews.filter(
      (review: Review) =>
        review.status === "Pending"
    ).length;

  const averageRating: string =
    reviews.length > 0
      ? (
          reviews.reduce(
            (
              sum: number,
              review: Review
            ) => sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  /* =========================
     Approve Review
  ========================= */

  const handleApprove = async (
    id: string
  ): Promise<void> => {
    try {
      const baseUrl = (
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000"
      ).replace(/\/+$/, "");

      const response = await fetch(
        `${baseUrl}/api/reviews/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status: "Published",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to approve review: ${response.status}`
        );
      }

      setReviews(
        (current: Review[]): Review[] =>
          current.map(
            (review: Review): Review =>
              review.id === id
                ? {
                    ...review,
                    status: "Published",
                  }
                : review
          )
      );
    } catch (error) {
      console.error(
        "Failed to approve review:",
        error
      );
    }
  };

  /* =========================
     Delete Review
  ========================= */

  const handleDelete = async (): Promise<void> => {
    if (!deleteReview) return;

    try {
      const baseUrl = (
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:5000"
      ).replace(/\/+$/, "");

      const response = await fetch(
        `${baseUrl}/api/reviews/${deleteReview.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete review: ${response.status}`
        );
      }

      setReviews(
        (current: Review[]): Review[] =>
          current.filter(
            (review: Review): boolean =>
              review.id !==
              deleteReview.id
          )
      );

      setDeleteReview(null);
    } catch (error) {
      console.error(
        "Failed to delete review:",
        error
      );
    }
  };

  /* =========================
     Loading
  ========================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 mt-[100px]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Reviews
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and moderate customer reviews.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              title="Total Reviews"
              value={totalReviews}
              icon={
                <MessageSquare
                  size={22}
                />
              }
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Published"
              value={publishedReviews}
              icon={
                <Check size={22} />
              }
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Pending"
              value={pendingReviews}
              icon={
                <Clock size={22} />
              }
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatCard
              title="Average Rating"
              value={averageRating}
              icon={
                <Star size={22} />
              }
            />
          </motion.div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between">

            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>
                ) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search by user, destination or comment..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              {(
                [
                  "All",
                  "Published",
                  "Pending",
                ] as const
              ).map(
                (
                  option:
                    | "All"
                    | ReviewStatus
                ) => (
                  <button
                    key={option}
                    onClick={() =>
                      setFilter(option)
                    }
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                      filter === option
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          </div>
        </motion.div>

        {/* Reviews Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    User
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Comment
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map(
                    (review: Review) => (
                      <motion.tr
                        key={review.id}
                        variants={itemVariants}
                        className="hover:bg-gray-50/70 transition"
                      >
                        {/* User */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <img
                              src={review.avatar}
                              alt={review.user}
                              className="w-10 h-10 rounded-full object-cover"
                            />

                            <div>
                              <p className="font-semibold text-gray-900">
                                {review.user}
                              </p>

                              <p className="text-xs text-gray-500">
                                {review.email ||
                                  "No email"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Destination */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin
                              size={16}
                              className="text-gray-400"
                            />

                            <span className="text-sm">
                              {
                                review.destination
                              }
                            </span>
                          </div>
                        </td>

                        {/* Rating */}
                        <td className="px-6 py-5">
                          <RatingStars
                            rating={
                              review.rating
                            }
                          />
                        </td>

                        {/* Comment */}
                        <td className="px-6 py-5 max-w-xs">
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {review.comment}
                          </p>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-5">
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">
                          <StatusBadge
                            status={
                              review.status
                            }
                          />
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <ActionButton
                              type="blue"
                              icon={
                                <Eye
                                  size={16}
                                />
                              }
                              onClick={() =>
                                setSelectedReview(
                                  review
                                )
                              }
                            />

                            {review.status ===
                              "Pending" && (
                              <ActionButton
                                type="green"
                                icon={
                                  <Check
                                    size={16}
                                  />
                                }
                                onClick={() =>
                                  handleApprove(
                                    review.id
                                  )
                                }
                              />
                            )}

                            <ActionButton
                              type="red"
                              icon={
                                <Trash2
                                  size={16}
                                />
                              }
                              onClick={() =>
                                setDeleteReview(
                                  review
                                )
                              }
                            />
                          </div>
                        </td>
                      </motion.tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-16 text-center"
                    >
                      <div className="flex flex-col items-center">
                        <MessageSquare
                          size={40}
                          className="text-gray-300 mb-3"
                        />

                        <p className="text-gray-500 font-medium">
                          No reviews found
                        </p>

                        <p className="text-sm text-gray-400 mt-1">
                          Try changing your search or filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="lg:hidden p-4 space-y-4">
            {filteredReviews.length > 0 ? (
              filteredReviews.map(
                (review: Review) => (
                  <motion.div
                    key={review.id}
                    variants={itemVariants}
                    className="border border-gray-100 rounded-xl p-4"
                  >
                    {/* User */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-11 h-11 rounded-full object-cover"
                        />

                        <div>
                          <p className="font-semibold text-gray-900">
                            {review.user}
                          </p>

                          <p className="text-xs text-gray-500">
                            {review.email ||
                              "No email"}
                          </p>
                        </div>
                      </div>

                      <StatusBadge
                        status={
                          review.status
                        }
                      />
                    </div>

                    {/* Destination */}
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin
                        size={16}
                        className="text-gray-400"
                      />

                      <span className="text-sm text-gray-700">
                        {
                          review.destination
                        }
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="mb-3">
                      <RatingStars
                        rating={
                          review.rating
                        }
                      />
                    </div>

                    {/* Comment */}
                    <p className="text-sm text-gray-600 leading-6 mb-3">
                      {review.comment}
                    </p>

                    {/* Date */}
                    <p className="text-xs text-gray-400 mb-4">
                      {review.date}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <ActionButton
                        type="blue"
                        icon={
                          <Eye size={16} />
                        }
                        onClick={() =>
                          setSelectedReview(
                            review
                          )
                        }
                      />

                      {review.status ===
                        "Pending" && (
                        <ActionButton
                          type="green"
                          icon={
                            <Check
                              size={16}
                            />
                          }
                          onClick={() =>
                            handleApprove(
                              review.id
                            )
                          }
                        />
                      )}

                      <ActionButton
                        type="red"
                        icon={
                          <Trash2
                            size={16}
                          />
                        }
                        onClick={() =>
                          setDeleteReview(
                            review
                          )
                        }
                      />
                    </div>
                  </motion.div>
                )
              )
            ) : (
              <div className="py-12 text-center">
                <MessageSquare
                  size={40}
                  className="text-gray-300 mx-auto mb-3"
                />

                <p className="text-gray-500 font-medium">
                  No reviews found
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Result Count */}
        <div className="mt-4 text-sm text-gray-400">
          Showing{" "}
          <span className="font-medium text-gray-600">
            {filteredReviews.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-600">
            {reviews.length}
          </span>{" "}
          reviews
        </div>
      </div>

      {/* =========================
          View Review Modal
      ========================= */}

      <AnimatePresence>
        {selectedReview && (
          <ModalOverlay
            onClose={() =>
              setSelectedReview(null)
            }
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 15,
              }}
              transition={{
                duration: 0.2,
              }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  Review Details
                </h2>

                <button
                  onClick={() =>
                    setSelectedReview(
                      null
                    )
                  }
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-500 transition"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={
                      selectedReview.avatar
                    }
                    alt={
                      selectedReview.user
                    }
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-bold text-gray-900">
                      {
                        selectedReview.user
                      }
                    </h3>

                    <p className="text-sm text-gray-500">
                      {
                        selectedReview.email ||
                        "No email"
                      }
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Destination
                    </p>

                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin
                        size={17}
                        className="text-gray-400"
                      />

                      <span>
                        {
                          selectedReview.destination
                        }
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Rating
                    </p>

                    <RatingStars
                      rating={
                        selectedReview.rating
                      }
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      Review
                    </p>

                    <p className="text-gray-600 leading-7">
                      {
                        selectedReview.comment
                      }
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Date
                      </p>

                      <p className="text-sm text-gray-600">
                        {
                          selectedReview.date
                        }
                      </p>
                    </div>

                    <StatusBadge
                      status={
                        selectedReview.status
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                {selectedReview.status ===
                  "Pending" && (
                  <button
                    onClick={() => {
                      handleApprove(
                        selectedReview.id
                      );
                      setSelectedReview(
                        null
                      );
                    }}
                    className="px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
                  >
                    Approve Review
                  </button>
                )}

                <button
                  onClick={() =>
                    setSelectedReview(
                      null
                    )
                  }
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* =========================
          Delete Confirmation Modal
      ========================= */}

      <AnimatePresence>
        {deleteReview && (
          <ModalOverlay
            onClose={() =>
              setDeleteReview(null)
            }
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              transition={{
                duration: 0.2,
              }}
              className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Trash2
                  size={22}
                  className="text-red-500"
                />
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Delete Review?
              </h2>

              <p className="text-gray-500 text-sm leading-6 mt-2">
                Are you sure you want to delete
                this review by{" "}
                <span className="font-semibold text-gray-700">
                  {deleteReview.user}
                </span>
                ? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() =>
                    setDeleteReview(null)
                  }
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================
   Stat Card
========================= */

function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p className="text-2xl font-bold text-gray-900 mt-2">
            {value}
          </p>
        </div>

        <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =========================
   Rating Stars
========================= */

function RatingStars({
  rating,
}: RatingStarsProps) {
  const safeRating = Math.max(
    0,
    Math.min(5, Math.round(rating))
  );

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(
        (star: number) => (
          <Star
            key={star}
            size={15}
            className={
              star <= safeRating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }
          />
        )
      )}

      <span className="text-xs text-gray-500 ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

/* =========================
   Status Badge
========================= */

function StatusBadge({
  status,
}: StatusBadgeProps) {
  const isPublished =
    status === "Published";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        isPublished
          ? "bg-green-50 text-green-600"
          : "bg-yellow-50 text-yellow-600"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isPublished
            ? "bg-green-500"
            : "bg-yellow-500"
        }`}
      />

      {status}
    </span>
  );
}

/* =========================
   Action Button
========================= */

function ActionButton({
  icon,
  onClick,
  type,
}: ActionButtonProps) {
  const colors: Record<
    ActionButtonProps["type"],
    string
  > = {
    green:
      "hover:bg-green-50 hover:text-green-600",
    blue:
      "hover:bg-blue-50 hover:text-blue-600",
    red:
      "hover:bg-red-50 hover:text-red-500",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 transition ${colors[type]}`}
    >
      {icon}
    </button>
  );
}

/* =========================
   Modal Overlay
========================= */

function ModalOverlay({
  children,
  onClose,
}: ModalOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {children}
    </motion.div>
  );
}
