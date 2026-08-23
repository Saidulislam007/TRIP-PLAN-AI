import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FoodDetailsPage } from "@/components/food/FoodDetailsPage";
import { restaurantSpotlights } from "@/data/food";

type RestaurantPageProps = {
  params: Promise<{ restaurantSlug: string }>;
};

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  const { restaurantSlug } = await params;
  const restaurant = restaurantSpotlights.find((item) => item.slug === restaurantSlug);

  return {
    title: restaurant
      ? `${restaurant.name} | TripPlan AI Food`
      : "Restaurant Not Found | TripPlan AI",
    description: restaurant?.shortDescription ?? "Explore restaurant details with TripPlan AI.",
  };
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantSlug } = await params;
  const restaurant = restaurantSpotlights.find((item) => item.slug === restaurantSlug);

  if (!restaurant) notFound();

  return <FoodDetailsPage restaurant={restaurant} />;
}