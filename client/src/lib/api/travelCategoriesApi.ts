export type TravelCategory = {
  _id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
  destinations: number;
  href: string;
  sortOrder: number;
  isActive: boolean;
};

type TravelCategoriesApiResponse = {
  success: boolean;
  message: string;
  data: TravelCategory[];
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getTravelCategories(): Promise<TravelCategory[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/travel-categories`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch travel categories");
  }

  const result: TravelCategoriesApiResponse = await response.json();

  if (!result.success) {
    throw new Error(
      result.message || "Failed to fetch travel categories",
    );
  }

  return result.data;
}