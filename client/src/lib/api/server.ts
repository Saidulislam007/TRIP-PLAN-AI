const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export const getFeatReviews = async () => {
  try {
    const response = await fetch(`${url}/api/featured-reviews`);
    if (!response.ok) {
      throw new Error("Failed to fetch featured reviews");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching featured reviews:", error);
    throw error;
  }
};