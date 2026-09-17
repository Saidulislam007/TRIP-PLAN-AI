export type ReviewItem = {
  _id?: string;
  id?: number;
  displayOrder?: number;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  title: string;
  text?: string;
  reviewText?: string;
  destination: string;
  tripType: string;
  date: string;
  helpful?: number;
  verified?: boolean;
  status?: string;
};


export type PaginatedReviewsData = {
  reviews: ReviewItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ReviewStat = {
  id: number;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  description: string;
  icon: "Star" | "Users" | "MapPin" | "BadgeCheck";
  accent: "gold" | "emerald";
};

export type ExperienceRatingItem = {
  label: string;
  rating: number;
  icon:
    | "Sparkles"
    | "Utensils"
    | "UsersRound"
    | "Car"
    | "Hotel"
    | "CircleDollarSign"
    | "ShieldCheck";
};

export type ReviewStatsData = {
  stats: ReviewStat[];
  experienceRatings: ExperienceRatingItem[];
  ratingOverview: {
    average: number;
    totalLabel: string;
    ratingBars: Array<{ stars: number; percentage: number }>;
  };
};

export type ReviewInsightListItem = {
  icon: string;
  label: string;
  percentage: number;
};

export type ReviewRecommendation = {
  id: number;
  title: string;
  location: string;
  match: number;
  rating: number;
  description: string;
  type: string;
  date: string;
  image: string;
};

export type ReviewInsightsData = {
  reviewsAnalyzed: string;
  summary: string;
  confidence: string;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  lovedThings: ReviewInsightListItem[];
  concerns: ReviewInsightListItem[];
  recommendationTags: Array<{ label: string; icon: string }>;
  recommendations: ReviewRecommendation[];
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  const result: ApiResponse<T> = await response.json();
  return result.data;
}

export function getReviews(page = 1, limit = 10) {
  return request<PaginatedReviewsData>(`/api/reviews?page=${page}&limit=${limit}`);
}

export async function getMyReviews() {
  const response = await fetch(`${API_URL}/api/reviews/my`, {
    cache: "no-store",
    credentials: "include",
  });

  const result: ApiResponse<ReviewItem[]> = await response.json().catch(() => ({
    success: false,
    data: [],
    message: "Failed to fetch your reviews.",
  }));

  if (!response.ok || !result.success) {
    throw new Error(result.message || `Failed to fetch your reviews: ${response.status}`);
  }

  return result.data;
}

export function getReviewStats() {
  return request<ReviewStatsData>("/api/reviews/stats");
}

export function getReviewInsights() {
  return request<ReviewInsightsData>("/api/reviews/insights");
}

export async function submitReview(formData: FormData) {
  const response = await fetch(`${API_URL}/api/reviews`, {
    method: "POST",
    body: formData,
  });

  const result: ApiResponse<ReviewItem> = await response.json().catch(() => ({
    success: false,
    data: {} as ReviewItem,
    message: "Failed to submit review.",
  }));

  if (!response.ok || !result.success) {
    throw new Error(result.message || `Failed to submit review: ${response.status}`);
  }

  return result.data;
}
