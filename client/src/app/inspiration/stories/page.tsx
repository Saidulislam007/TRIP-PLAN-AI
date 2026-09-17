import type { Metadata } from "next";
import TravelStoriesPage from "@/components/inspiration/stories/TravelStoriesPage";
import { fetchPublishedStories } from "@/lib/api/stories";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Travel Stories | TripPlan AI",
  description: "Published journeys across Bangladesh, thoughtfully summarised with original authors, dates and sources. Find inspiration and start your own travel journal.",
};

export default async function Page() {
  try {
    const stories = await fetchPublishedStories();
    return <TravelStoriesPage stories={stories} />;
  } catch (error) {
    console.error("Failed to load published travel stories:", error);

    return (
      <main className="min-h-[70vh] bg-[#F7F7F2] px-5 pb-16 pt-36 text-center text-[#17211D]">
        <h1 className="font-serif text-4xl">Travel stories are unavailable right now.</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6E7C70]">
          We could not load published stories from the server. Please try again later.
        </p>
      </main>
    );
  }
}
