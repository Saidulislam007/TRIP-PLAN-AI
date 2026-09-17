import type { TravelGuide } from "@/types/travelGuide";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

type TravelGuidesResponse = {
  success: boolean;
  data?: TravelGuide[];
  message?: string;
};

export async function fetchTravelGuides(): Promise<TravelGuide[]> {
  const response = await fetch(`${API_URL}/api/travel-guides`, {
    cache: "no-store",
  });

  const payload = (await response.json()) as TravelGuidesResponse;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Failed to fetch travel guides");
  }

  return Array.isArray(payload.data) ? payload.data : [];
}
